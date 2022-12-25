import React from "react";
import ResponsiveDrawer from "../Components/Drawer/Darwer";
import { Box, CircularProgress, Container, Grid, Stack } from "@mui/material";
import CustomCard from "../Components/Card/Card";
import { useEffect } from "react";
import { FetchContext } from "../Contexts/FeatchContext";

export default function Home() {
  const [products, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  useEffect(() => {}, [products]);
  return (
    <>
      <FetchContext.Provider
        value={{
          setProduct,
          loading,
          setLoading,
          error,
          setError,
        }}
      >
        {loading ? (
          <Stack direction="row" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
          <Box>
            <ResponsiveDrawer />
            <Box sx={{ marginLeft: { sm: "240px" }, marginTop: "50px", display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
              <Grid container spacing={5} direction="row">
                {products &&
                  products.map((product, index) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <CustomCard item={product} key={product._id} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
        )}
      </FetchContext.Provider>
    </>
  );
}

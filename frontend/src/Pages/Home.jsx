import React from "react";
import ResponsiveDrawer from "../Components/Drawer/Darwer";
import { Box, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import CustomCard from "../Components/Card/Card";
import { useEffect } from "react";
import { FetchContext } from "../Contexts/FeatchContext";

function ShowError() {
  return (
    <Stack direction="row" width="100vw" height="50vh" justifyContent="center" alignItems="center" spacing={2}>
      <Typography>No Products match</Typography>
    </Stack>
  );
}

function MiddleArea({ products }) {
  return (
    <Grid container spacing={5} direction="row">
      {products?.length !== 0 ? (
        products.map((product, index) => (
          <Grid key={product._id + index} item xs={12} sm={12} md={6} lg={4} xl={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CustomCard item={product} key={product._id} />
          </Grid>
        ))
      ) : (
        <ShowError />
      )}
    </Grid>
  );
}

function Spinner() {
  return (
    <Box sx={{ display: "flex", height: "50vh", justifyContent: "center", alignItems: "center", p: 2 }}>
      <CircularProgress size={50} />
    </Box>
  );
}

export default function Home() {
  const [products, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  useEffect(() => {}, [products]);
  return (
    <>
      <FetchContext.Provider
        value={{
          setProduct,
          setLoading,
          setError,
        }}
      >
        <ResponsiveDrawer />
        <Box sx={{ marginLeft: { sm: "240px" }, marginTop: "50px", display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
          {loading ? <Spinner /> : <MiddleArea products={products} />}
        </Box>
      </FetchContext.Provider>
    </>
  );
}

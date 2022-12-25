import React from "react";
import ResponsiveDrawer from "../Components/Drawer/Darwer";
import { Box, Container, Grid, Stack } from "@mui/material";
import CustomCard from "../Components/Card/Card";

export default function Home() {
  const [products, setProduct] = React.useState([]);

  return (
    <>
      <ResponsiveDrawer setProduct={setProduct} />

      <Box sx={{ marginLeft: { sm: "240px" }, marginTop: "50px", display: "flex", justifyContent: "center", alignItems: "center", p: 5 }}>
        <Grid container spacing={5} direction="row">
          {products &&
            products.map((product, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <CustomCard item={product} key={product._id} />
              </Grid>
            ))}
        </Grid>
        \
      </Box>
    </>
  );
}

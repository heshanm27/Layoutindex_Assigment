import React from "react";
import ResponsiveDrawer from "../Components/Drawer/Darwer";
import { Box, Container } from "@mui/material";
import CustomCard from "../Components/Card/Card";

export default function Home() {
  const [products, setProduct] = React.useState([]);

  return (
    <>
      <ResponsiveDrawer setProduct={setProduct} />
      <Container sx={{ marginLeft: { sm: "240px" }, marginTop: "50px", padding: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "start" } }}>
          {products && products.map((product, index) => <CustomCard item={product} key={product._id} />)}
        </Box>
      </Container>
    </>
  );
}

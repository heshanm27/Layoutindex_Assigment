import React from "react";
import ResponsiveDrawer from "../Components/Drawer/Darwer";
import { Box, Container } from "@mui/material";

export default function Home() {
  const [products, setProduct] = React.useState([]);

  return (
    <>
      <ResponsiveDrawer setProduct={setProduct} />
      <Container sx={{ margin: { sm: "240px" }, padding: "10px" }}>
        <h1>Hellow</h1>
        {products &&
          products.map((product, index) => (
            <div key={index}>
              <h1>{product.productName}</h1>
              <p>{product.productDescription}</p>
              <p>{product.productPrice}</p>
            </div>
          ))}
      </Container>
    </>
  );
}

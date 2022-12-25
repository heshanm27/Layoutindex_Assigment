import React from "react";
import ResponsiveDrawer from "../Components/Drawer/Darwer";

export default function Home() {
  const [products, setProduct] = React.useState([]);

  return (
    <>
      <ResponsiveDrawer setProduct={setProduct} />
    </>
  );
}

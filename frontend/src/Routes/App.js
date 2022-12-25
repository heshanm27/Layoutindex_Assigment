import { Route, Router, Routes } from "react-router";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import ResponsiveDrawer from "../Components/Drawer/Darwer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Products />} />
    </Routes>
  );
}

export default App;

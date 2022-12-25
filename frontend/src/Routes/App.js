import { Route, Router, Routes } from "react-router";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import ResponsiveDrawer from "../Components/Darwer";

function App() {
  return (
    <Routes>
      <Route element={<ResponsiveDrawer />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/:id" element={<Products />} />
    </Routes>
  );
}

export default App;

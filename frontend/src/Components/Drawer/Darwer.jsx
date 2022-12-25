import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Button, useTheme } from "@mui/material";
import DrawerContent from "./DrawerContent";
import CustomeDialog from "../Dialog/CustomDialog";
import CategoryForm from "../Form/SubCategoryForm";
import ProductFrom from "../Form/ProductFrom";
import CustomTabs from "../Tabs/Tabs";

const drawerWidth = 240;

export default function ResponsiveDrawer({ setProduct }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const [openproductDialog, setOpenProductDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ ...theme.mixins.toolbar, justifyContent: "space-between" }}>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Layout Index
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Button sx={{ color: "white" }} onClick={() => setOpenCategoryDialog(true)}>
              Manage Category
            </Button>
            <Button sx={{ color: "white" }} onClick={() => setOpenProductDialog(true)}>
              Manage Product
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, mt: 5 }} aria-label="mailbox folders">
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <DrawerContent setProduct={setProduct} />
            <div>
              <Button onClick={() => setOpenCategoryDialog(true)}>Manage Category</Button>
              <Button onClick={() => setOpenProductDialog(true)}>Manage Product</Button>
            </div>
          </Box>
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          elevation={0}
          sx={{
            display: { xs: "none", sm: "block" },

            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          <DrawerContent setProduct={setProduct} />
        </Drawer>
      </Box>

      <CustomeDialog title={"Add New Categorey"} open={openCategoryDialog} setOpen={setOpenCategoryDialog}>
        <CustomTabs />
      </CustomeDialog>
      <CustomeDialog title={"Add New Product"} open={openproductDialog} setOpen={setOpenProductDialog}>
        <ProductFrom setOpen={setOpenProductDialog} />
      </CustomeDialog>
    </Box>
  );
}

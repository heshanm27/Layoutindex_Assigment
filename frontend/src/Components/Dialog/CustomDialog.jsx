import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomeDialog({ open, setOpen, children, title, maxWidth }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //style objects
  const displaywraper = {
    position: "absolute",
    top: 2,
  };

  const iconbtn = {
    "&.MuiIconButton-colorPrimary": {
      color: theme.palette.error.light,
    },
    "&:hover": {
      backgroundColor: "#ffcdd2",
    },
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      sx={displaywraper}
      maxWidth={maxWidth ? maxWidth : "sm"}
      fullScreen={fullScreen}
      data-testid="dialog"
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography varient="h3">{title}</Typography>
          <IconButton color="primary" sx={iconbtn} onClick={() => setOpen(false)} size="large">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

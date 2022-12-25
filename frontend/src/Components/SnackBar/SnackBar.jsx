import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import { Snackbar } from "@mui/material";

export default function CustomSnackBar({ notify, setNotify }) {
  const handleClose = () => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar open={notify.isOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert severity={notify ? notify.type : "info"} onClose={handleClose}>
        <AlertTitle>{notify.title}</AlertTitle>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

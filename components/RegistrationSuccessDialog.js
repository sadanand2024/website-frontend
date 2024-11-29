import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";

const SuccessDialog = ({ open, onClose, type, message }) => {
  // Dynamically adjust styles and icons based on the dialog type
  const isSuccess = type === "success";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{
          textAlign: "center",
          p: 4,
        }}
      >
        {/* Close Button */}
        {/* <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton> */}
        {/* Dynamic Icon */}
        {isSuccess ? (
          <CheckCircleIcon
            sx={{
              fontSize: 60,
              color: "green",
              mb: 2,
            }}
          />
        ) : (
          <ErrorIcon
            sx={{
              fontSize: 60,
              color: "red",
              mb: 2,
            }}
          />
        )}
        {/* Dynamic Title */}
        <Typography variant="h6" fontWeight="bold">
          {isSuccess ? "Registration Successful!" : "Something Went Wrong!"}
        </Typography>
        {/* Dynamic Message */}
        <Typography variant="body2" color="text.secondary" mt={1}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color={isSuccess ? "primary" : "error"}
          onClick={onClose}
          sx={{ px: 4, py: 1 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;

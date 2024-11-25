import { TextField } from "@mui/material";

const CustomDateInput = ({ id, placeholder, touched, errors, ...props }) => {
  return (
    <TextField
      id={id}
      placeholder={placeholder}
      type="date"
      fullWidth
      variant="outlined"
      size="small"
      InputLabelProps={{
        shrink: true, // This makes the label float above the input
      }}
      error={!!(touched && errors)} // Set error state if touched and errors exist
      helperText={
        touched && errors ? (
          <span style={{ color: "red" }}>{errors}</span>
        ) : null
      } // Custom red error text
      sx={{
        // Ensure the width is 100% and handles layout properly
        "& .MuiInputBase-root": {
          width: "100%", // Ensure the input width is 100% of the parent container
        },
      }}
      {...props} // Pass all props, including onChange
    />
  );
};

export default CustomDateInput;

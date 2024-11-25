import { TextField } from "@mui/material";

const CustomInput = ({
  id,
  placeholder,
  type = "text",
  touched,
  errors,
  ...props
}) => {
  return (
    <TextField
      id={id}
      placeholder={placeholder}
      type={type}
      fullWidth
      variant="outlined"
      size="small"
      error={false} // Prevent red border
      helperText={
        touched && errors ? (
          <span style={{ color: "red" }}>{errors}</span>
        ) : null
      } // Custom red error text
      {...props} // Pass all props, including onChange
    />
  );
};

export default CustomInput;
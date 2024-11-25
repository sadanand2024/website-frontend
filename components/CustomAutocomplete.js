import { Autocomplete, TextField } from "@mui/material";

const CustomAutocomplete = ({
  id,
  options,
  placeholder,
  touched,
  errors,
  value,
  onChange,
  ...props
}) => {
  return (
    <Autocomplete
      id={id}
      value={value}
      fullWidth
      onChange={(_, newValue) => onChange(newValue)}
      options={options}
      getOptionLabel={(option) => option} // Ensure the options are displayed correctly
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="outlined"
          size="small"
          fullWidth
          error={touched && errors} // Show error styling if touched and errors exist
          helperText={touched && errors ? errors : ""} // Display error message below input
        />
      )}
      {...props} // Pass all additional props
    />
  );
};

export default CustomAutocomplete;

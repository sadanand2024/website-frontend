import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const CustomDatePicker = ({
  label = "Select Date",
  value,
  onChange,
  disableFuture = false,
  disablePast = false,
  minDate,
  maxDate,
  error = false,
  helperText = "",
  size = "small", // Default size is medium
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        disableFuture={disableFuture}
        disablePast={disablePast}
        minDate={minDate}
        maxDate={maxDate}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            fullWidth
            size={size} // Pass the size prop to match other TextFields
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;

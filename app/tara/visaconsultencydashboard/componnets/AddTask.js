"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Factory from "@/app/utils/Factory"; // Import custom Factory function for API calls
import CustomInput from "@/components/CustomInput"; // Import custom input component
import CloseIcon from "@mui/icons-material/Close";
import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Radio,
  Card,
  RadioGroup,
  FormControlLabel,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Autocomplete,
  Checkbox,
  TextField,
} from "@mui/material";
const AddTask = ({
  addTaskDialogOpen,
  setAddTaskDialogOpen,
  handleQuantityChange,
  handleCommentChange,
  selectedServices,
  setSelectedServices,
  ServicesCards,
  quantityMap,
  commentMap,
  setQuantityMap,
  setCommentMap,
  servicesSubmit,
}) => {
  return (
    <Dialog
      open={addTaskDialogOpen}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "24px",
        },
      }}
      sx={{
        "& .MuiDialogTitle-root": {
          textAlign: "center",
          paddingBottom: "16px",
        },
      }}
    >
      <Button
        variant="outlined"
        type="button"
        onClick={() => {
          setAddTaskDialogOpen(false);
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 30,
        }}
      >
        <CloseIcon />
      </Button>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 0",
          }}
        >
          <h5>Service List</h5>
          <Autocomplete
            multiple
            renderTags={() => null}
            size="small"
            sx={{ minWidth: 250, maxWidth: 250 }}
            id="service-checkbox"
            options={ServicesCards}
            value={
              ServicesCards &&
              ServicesCards?.filter((service) =>
                selectedServices.includes(service.service_name)
              )
            }
            onChange={(event, newValue, value2, value3) => {
              setSelectedServices(newValue.map((item) => item.service_name));
            }}
            getOptionLabel={(option) => option.service_name}
            renderInput={(params) => (
              <TextField {...params} label="Update Services" />
            )}
            isOptionEqualToValue={(option, value) =>
              option.service_name === value.service_name
            }
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox checked={selected} />
                {option.service_name}
              </li>
            )}
            disableCloseOnSelect
          />
        </Box>
      </DialogTitle>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: "8px 0",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "12px", overflow: "hidden" }}
        >
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="service table"
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "rgb(13, 81, 82)",
                  "& th": {
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                  },
                }}
              >
                <TableCell>Services</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Comments / Instructions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedServices &&
                selectedServices.map((service, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:hover": { backgroundColor: "#f5f5f5" },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{service}</TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{ padding: "4px 8px", minWidth: "30px", mr: 2 }}
                        variant="outlined"
                        onClick={() => handleQuantityChange(service, -1)}
                        // disabled={selectedClientData.services.some(
                        //   (item) => item.service_name === service
                        // )}
                      >
                        -
                      </Button>
                      {quantityMap[service] || 0}
                      <Button
                        sx={{ padding: "4px 8px", minWidth: "30px", ml: 2 }}
                        variant="outlined"
                        onClick={() => handleQuantityChange(service, 1)}
                        // disabled={selectedClientData.services.some(
                        //   (item) => item.service_name === service
                        // )}
                      >
                        +
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <CustomInput
                        value={commentMap[service] || ""}
                        onChange={(e) =>
                          handleCommentChange(service, e.target.value)
                        }
                        multiline
                        rows={2}
                        // disabled={selectedClientData.services.some(
                        //   (item) => item.service_name === service
                        // )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <DialogActions sx={{ justifyContent: "center", paddingTop: "16px" }}>
          <Button
            variant="contained"
            type="button"
            sx={{ padding: "8px 32px", textTransform: "none" }}
            onClick={servicesSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddTask;

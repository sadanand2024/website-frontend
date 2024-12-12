"use client";
import {
  Box,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "@/components/CustomInput";
import CustomAutocomplete from "@/components/CustomAutocomplete";
const FormPage = ({ selectedClientData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedService, setEditedService] = useState({}); // Track form data

  const handleEditClick = (service) => {
    console.log(service);
    setEditedService({ ...service });
    setDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log("Updated Service:", editedService);
    // const url = "/user_management/service-details/{id}/";
    // try {
    //   const { res, error } = await Factory("put", url, {});
    //   console.log(res)
    //   if (res.status_cd === 0) {
    //     setDialogOpen(false);
    //   }
    // } catch (error) {
    //   console.error("Error fetching services:", error);
    //   alert("Something went wrong. Please try again.");
    // }
  };

  return (
    <Box style={{ marginTop: "20px" }}>
      <h3> Service History</h3>
      <Box sx={{ mt: 1 }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "12px", overflow: "hidden" }}
        >
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "rgb(13, 81, 82)",
                  "& th": {
                    textAlign: "center",
                    color: "white",
                  },
                }}
              >
                <TableCell>Task ID</TableCell>
                <TableCell align="center">Service</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Comments</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedClientData?.services.map((service) => (
                <TableRow
                  key={service.id}
                  sx={{
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{service.id}</TableCell>
                  <TableCell align="center">{service.service_name}</TableCell>
                  <TableCell align="center">{service.date}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:
                        service.status === "Pending"
                          ? "orange"
                          : service.status === "In - Progress"
                            ? "#f58d42"
                            : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {service.status}
                  </TableCell>
                  <TableCell align="center">{service.comments}</TableCell>
                  <TableCell align="center">
                    <Box>
                      <Button onClick={() => handleEditClick(service)}>
                        <EditIcon />
                      </Button>
                      <Button>
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog for editing service details */}
      <Dialog
        open={dialogOpen}
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
          "& .MuiTypography-body2": {
            color: "#666",
            fontSize: "0.9rem",
          },
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setDialogOpen(false)}
          sx={{
            position: "absolute",
            top: 8,
            right: 30,
          }}
        >
          <CloseIcon />
        </Button>
        <DialogTitle>
          <h3>Service Details</h3>
        </DialogTitle>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: "8px 0",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomInput
                id="id"
                label="Task ID"
                name="id"
                value={editedService.id || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id="service_name"
                label="Service Name"
                name="service_name"
                value={editedService.service_name || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id="date"
                label="Date"
                name="date"
                value={editedService.date || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomAutocomplete
                id="status"
                label="Status"
                value={editedService.status || ""}
                options={["Created", "Pending", "In - Progress", "Completed"]}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id="comments"
                label="Comments"
                name="comments"
                value={editedService.comments || ""}
                onChange={handleInputChange}
              />
            </Grid>
            {/* Add more fields as necessary */}
          </Grid>

          <DialogActions sx={{ justifyContent: "center", paddingTop: "16px" }}>
            <Button variant="contained" type="submit">
              Update
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default FormPage;

"use client";

import {
  Typography,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "@/components/CustomInput";
import CustomAutocomplete from "@/components/CustomAutocomplete";
import Factory from "@/app/utils/Factory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
let visaTypes = ["Student Visa", "Visit", "Work Visa", "Business"];

const TaskList = ({
  dialogOpen,
  setDialogOpen,
  taskList,
  handleDelete,
  handleEditClick,
  handleSubmit,
  editedService,
  setEditedService,
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleInputChange,
  destinationCountries,
}) => {
  return (
    <div style={{ padding: "20px" }}>
      <Box sx={{ mt: 1 }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "12px", overflow: "hidden" }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "rgb(13, 81, 82)",
                  "& th": {
                    // textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                  },
                }}
              >
                <TableCell sx={{ whiteSpace: "nowrap" }}>Task ID</TableCell>
                <TableCell align="center">Service</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  Passport Number
                </TableCell>
                <TableCell align="center">Purpose</TableCell>
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  Visa Type
                </TableCell>
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  Destination Country
                </TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Comments</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList &&
                taskList?.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell align="center">
                      {service.id || service.service_id}
                    </TableCell>
                    <TableCell align="left">{service.service_name}</TableCell>
                    <TableCell align="center">{service.date}</TableCell>
                    <TableCell align="center">
                      {service.passport_number}
                    </TableCell>
                    <TableCell align="center">{service.purpose}</TableCell>
                    <TableCell align="left">{service.visa_type}</TableCell>
                    <TableCell align="left">
                      {service.destination_country}
                    </TableCell>
                    <TableCell align="left">{service.quantity}</TableCell>
                    <TableCell
                      align="left"
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
                    <TableCell align="left">{service.comments}</TableCell>

                    <TableCell align="center">
                      <Box>
                        <Button onClick={() => handleEditClick(service)}>
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            setDeleteDialogOpen(true);
                            setEditedService({ ...service });
                            // handleDelete(service);
                          }}
                        >
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
      {/* edit ialogue */}
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
                disabled
                value={editedService.id || ""}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomAutocomplete
                id="status"
                label="Status"
                name="status"
                value={
                  editedService?.status?.[0]?.toUpperCase() +
                    editedService?.status?.slice(1) || ""
                }
                options={["pending", "completed", "in progress"]}
                onChange={(e, val) => {
                  handleInputChange("status", val);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id="comments"
                label="Comments"
                name="comments"
                value={editedService.comments || ""}
                onChange={(e, val) => {
                  handleInputChange("comments", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomInput
                id="passport_number"
                label="passport number"
                name="passport_number"
                value={editedService.passport_number || ""}
                onChange={(e, val) => {
                  handleInputChange("passport_number", e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomAutocomplete
                id="destination_country"
                label="destination country"
                name="destination_country" // Make sure the name is passed
                value={
                  editedService?.destination_country?.[0]?.toUpperCase() +
                    editedService?.destination_country?.slice(1) || ""
                }
                options={destinationCountries} // Display labels (e.g., 'In Progress')
                onChange={(e, val) => {
                  // Find the value corresponding to the selected label

                  handleInputChange("destination_country", val);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomAutocomplete
                id="visa_type"
                label="Visa Type"
                name="visa_type" // Make sure the name is passed
                value={
                  editedService?.visa_type?.[0]?.toUpperCase() +
                    editedService?.visa_type?.slice(1) || ""
                }
                options={visaTypes} // Display labels (e.g., 'In Progress')
                onChange={(e, val) => {
                  // Find the value corresponding to the selected label

                  handleInputChange("visa_type", val);
                }}
              />
            </Grid>
          </Grid>

          <DialogActions sx={{ justifyContent: "center", paddingTop: "16px" }}>
            <Button variant="contained" type="submit">
              Update
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      {/* delete dialogue */}
      <Dialog open={deleteDialogOpen}>
        <DialogTitle>Are you sure you want to delete the Task?</DialogTitle>

        <DialogActions sx={{ textAlign: "center" }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleDelete(editedService);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>{" "}
    </div>
  );
};

export default TaskList;

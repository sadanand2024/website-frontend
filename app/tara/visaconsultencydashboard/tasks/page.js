"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
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

const destinationCountries = [
  "France",
  "United States",
  "Australia",
  "Canada",
  "Germany",
];

const FormPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [editedService, setEditedService] = useState({}); // Track form data
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEditClick = (service) => {
    console.log(service);
    setEditedService({ ...service });
    setDialogOpen(true);
  };

  const handleInputChange = (name, val) => {
    console.log("Field Name:", name, "Value:", val);
    setEditedService((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let putData = {
      visa_application: {
        user: editedService.user,
        passport_number: editedService.passport_number,
        purpose: editedService.purpose,
        visa_type: editedService.visa_type,
        destination_country: editedService.destination_country,
      },
      service: {
        id: editedService.id,
        service_type_id: editedService.service_type,
        status: editedService.status,
        comments: editedService.comments,
        quantity: editedService.quantity,
      },
    };
    const url = `/user_management/service-details/${editedService.id}/`;
    try {
      const { res, error } = await Factory("put", url, putData);
      console.log(res);
      if (res.status_cd === 0) {
        getTasksList();
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const getTasksList = async () => {
    const url = "/user_management/visa-applicants/all-tasks-data/";
    try {
      const { res, error } = await Factory("get", url, {});

      if (res.status_cd === 0) {
        setDialogOpen(false);
        setTaskList(res.data);
      }
    } catch (error) {
      // Catch any errors during the request
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const handleDelete = async (service) => {
    const url = `/user_management/service-details/${service.id}/`;
    const { res, error } = await Factory("delete", url, {});
    if (res.status === 204) {
      getTasksList();
      setDeleteDialogOpen(false);
    } else {
      alert("Failed to delete the service. Please try again.");
    }
  };
  useEffect(() => {
    getTasksList(); // Load client list on component mount
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            style={{ marginBottom: 20, textAlign: "left", fontWeight: "bold" }}
          >
            Tasks List
          </Typography>
        </Grid>
      </Grid>
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
                <TableCell>Task ID</TableCell>
                <TableCell align="center">Service</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Passport Number</TableCell>
                <TableCell align="center">Purpose</TableCell>
                <TableCell align="center">Visa Type</TableCell>
                <TableCell align="center">Destination Country</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Comments</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList?.map((service) => (
                <TableRow key={service.id}>
                  <TableCell align="center">{service.id}</TableCell>
                  <TableCell align="left">{service.service_name}</TableCell>
                  <TableCell align="center">{service.date}</TableCell>
                  <TableCell align="left">{service.passport_number}</TableCell>
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

            <Grid item xs={12}></Grid>
            {/* Add more fields as necessary */}
          </Grid>

          <DialogActions sx={{ justifyContent: "center", paddingTop: "16px" }}>
            <Button variant="contained" type="submit">
              Update
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      {/* delete dialogue */}
      <Dialog
        open={deleteDialogOpen}
        // onClose={() => setDeleteDialogOpen(false)}
      >
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

export default FormPage;

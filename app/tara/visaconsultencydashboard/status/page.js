"use client";
import { useSearchParams } from "next/navigation";
import CustomAutocomplete from "@/components/CustomAutocomplete";
import CustomInput from "@/components/CustomInput";
import AdditionalDetails from "../componnets/AdditionalDetails";
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
  Checkbox,
  RadioGroup,
  FormControlLabel,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ServicesSuccessMessage from "../componnets/ServicesSuccessMessage";
import Serviceselection from "../componnets/Serviceselection";
import ServiceHistory from "../componnets/ServiceHistory";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import Factory from "@/app/utils/Factory";
import DeleteIcon from "@mui/icons-material/Delete";

const FormPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // Retrieve 'name' from query params
  const title = searchParams.get("title"); // Retrieve 'name' from query params
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editedService, setEditedService] = useState({}); // Track form data
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  let visaTypes = ["Student Visa", "Visit", "Work Visa", "Business"];
  const destinationCountries = [
    "France",
    "United States",
    "Australia",
    "Canada",
    "Germany",
  ];

  const handleEditClick = (service) => {
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
        user: editedService.id,
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
    console.log(putData);
    console.log(editedService);
    const url = `/user_management/service-details/${editedService.id}/`;
    const { res, error } = await Factory("put", url, putData);
    console.log(res);
    if (res.status_cd === 0) {
      fetchClientData();
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (service) => {
    const url = `/user_management/service-details/${service.id}/`;
    const { res, error } = await Factory("delete", url, {});
    if (res.status === 204) {
      fetchClientData();
      setDeleteDialogOpen(false);
    } else {
      alert("Failed to delete the service. Please try again.");
    }
  };
  const fetchClientData = async () => {
    const clientData = searchParams.get("id");

    if (!clientData) return;

    const decodedData = decodeURIComponent(clientData);
    const parsedID = JSON.parse(decodedData);

    const url = `/user_management/visa-applicants/${parsedID}/`;

    const { res, error } = await Factory("get", url, {});

    if (res.status_cd === 0) {
      setSelectedClient(res.data);
    } else {
      console.error("Failed to fetch client data");
    }
  };

  useEffect(() => {
    fetchClientData();
  }, [searchParams]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>Client Status</h3>
      <h3 style={{ marginBottom: 20 }}>
        Client Name :{" "}
        {selectedClient?.first_name + " " + selectedClient?.last_name}
      </h3>
      <Typography
        variant="h6"
        style={{ marginBottom: 20, textAlign: "left", fontWeight: "bold" }}
      >
        Personal Info
      </Typography>
      {selectedClient && (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Row 1 */}
          <Grid item xs={12} sm={6}>
            <CustomInput
              id="first_name"
              label="First Name"
              value={selectedClient?.first_name && selectedClient.first_name}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              id="last_name"
              label="Last Name"
              value={selectedClient?.last_name}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              id="email"
              label="Email"
              value={selectedClient?.email}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              id="mobile_number"
              label="Mobile Number"
              value={selectedClient?.mobile_number}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              id="purpose"
              label="Purpose"
              // options={visaPurposes}
              value={
                selectedClient.services.length === 0
                  ? selectedClient.purpose
                  : selectedClient.services[selectedClient.services.length - 1]
                      ?.purpose
              }
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              id="visa_type"
              label="Visa Type"
              options={visaTypes}
              value={
                selectedClient.services.length === 0
                  ? selectedClient.visa_type
                  : selectedClient.services[selectedClient.services.length - 1]
                      ?.visa_type
              }
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              id="destinationcountry"
              label="Destination Country"
              options={destinationCountries}
              value={
                selectedClient.services.length === 0
                  ? selectedClient.destination_country
                  : selectedClient.services[selectedClient.services.length - 1]
                      ?.destination_country
              }
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              id="passportnumber"
              label="Passport Number"
              value={
                selectedClient.services.length === 0
                  ? selectedClient.passport_number
                  : selectedClient.services[selectedClient.services.length - 1]
                      ?.passport_number
              }
              disabled={true}
            />
          </Grid>
        </Grid>
      )}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 5, mb: 2 }}
      >
        <Typography variant="h6" sx={{ textAlign: "left", fontWeight: "bold" }}>
          Task List
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          maxHeight: "400px", // Max height of the table container
          minHeight: "200px", // Min height of the table container
          overflowY: "auto", // Enables vertical scrolling
        }}
      >
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead
            sx={{
              position: "sticky",
              top: 0, // Keeps the header stuck to the top of the container
              zIndex: 1, // Ensures the header stays above the table rows while scrolling
              backgroundColor: "rgb(13, 81, 82)", // Keep the header's background color
            }}
          >
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
            {selectedClient &&
              selectedClient?.services?.map((task) => (
                <TableRow key={task.id}>
                  <TableCell align="center">{task.id}</TableCell>
                  <TableCell align="left">{task.service_name}</TableCell>
                  <TableCell align="center">{task.date}</TableCell>
                  <TableCell align="left">{task.passport_number}</TableCell>
                  <TableCell align="center">{task.purpose}</TableCell>
                  <TableCell align="left">{task.visa_type}</TableCell>
                  <TableCell align="left">{task.destination_country}</TableCell>
                  <TableCell align="left">{task.quantity}</TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      color:
                        task.status === "Pending"
                          ? "orange"
                          : task.status === "In - Progress"
                            ? "#f58d42"
                            : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {task.status}
                  </TableCell>
                  <TableCell align="left">{task.comments}</TableCell>

                  <TableCell align="center">
                    <Box>
                      <Button
                        type="button"
                        onClick={() => handleEditClick(task)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setDeleteDialogOpen(true);
                          setEditedService({ ...task });
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

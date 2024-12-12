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

let clientList = ["Anand", "Krishna", "Sai Kiran"];
let visaTypes = ["Student Visa", "Visit", "Work Visa", "Business"];
const visaPurposes = [
  "Tourism",
  "Business",
  "Study",
  "Work",
  "Medical Treatment",
];
const destinationCountries = [
  "France",
  "United States",
  "Australia",
  "Canada",
  "Germany",
];
const STATUS_CHOICES = [
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];
const FormPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // Retrieve 'name' from query params
  const title = searchParams.get("title"); // Retrieve 'title' from query params
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const [editedService, setEditedService] = useState({}); // Track form data

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
    const url = `/user_management/service-details/${editedService.id}/`;
    try {
      const { res, error } = await Factory("put", url, editedService);
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
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            maxHeight: "400px", // Max height of the table container
            minHeight: "200px", // Min height of the table container
            overflowY: "auto", // Enables vertical scrolling
          }}
        >
          <div style={{ overflowY: "auto", maxHeight: "400px" }}>
            <Table
              sx={{ minWidth: 650 }}
              size="medium"
              aria-label="a dense table"
            >
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
                      //   textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <TableCell>Task ID</TableCell>
                  <TableCell align="left">Service</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Comments</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </div>
          <div style={{ overflowY: "auto", maxHeight: "400px" }}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                {taskList?.map((service) => (
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
                    <TableCell align="center">{service.quantity}</TableCell>
                    <TableCell align="center">{service.comments}</TableCell>
                    <TableCell align="center">
                      <Box>
                        <Button onClick={() => handleEditClick(service)}>
                          <EditIcon />
                        </Button>
                        <Button onClick={() => handleDelete(service)}>
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
          <h3>Task Details</h3>
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
              <CustomInput
                id="service_name"
                label="Service Name"
                name="service_name"
                disabled
                value={editedService.service_name || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id="date"
                label="Date"
                name="date"
                disabled
                value={editedService.date || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomAutocomplete
                id="status"
                label="Status"
                name="status" // Make sure the name is passed
                value={editedService.status || ""} // Display the selected status label
                options={STATUS_CHOICES.map((choice) => choice.label)} // Display labels (e.g., 'In Progress')
                onChange={(e, val) => {
                  // Find the value corresponding to the selected label
                  const selectedStatus = STATUS_CHOICES.find(
                    (choice) => choice.label === val
                  );
                  handleInputChange(
                    "status",
                    selectedStatus ? selectedStatus.value : ""
                  );
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
            {/* Add more fields as necessary */}
          </Grid>

          <DialogActions sx={{ justifyContent: "center", paddingTop: "16px" }}>
            <Button variant="contained" type="submit">
              Update
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default FormPage;

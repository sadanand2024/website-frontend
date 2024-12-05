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
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ServicesSuccessMessage from "../componnets/ServicesSuccessMessage";
import Serviceselection from "../componnets/Serviceselection";
import ServiceHistory from "../componnets/ServiceHistory";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
const FormPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // Retrieve 'name' from query params
  const title = searchParams.get("title"); // Retrieve 'name' from query params
  const [dialogOpen, setDialogOpen] = useState(false);
  const [servicelistDialogue, setServicelistDialogue] = useState(false);
  const [selectedClient, setSelectedClient] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
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

  // Dummy data for tasks
  const taskData = [
    {
      taskId: "T001",
      service: "Visa Application",
      date: "2024-12-01",
      status: "Pending",
      lastUpdate: "2024-12-03",
    },
    {
      taskId: "T002",
      service: "Medical Insurance",
      date: "2024-11-15",
      status: "Completed",
      lastUpdate: "2024-11-20",
    },
    {
      taskId: "T003",
      service: "Flight Booking",
      date: "2024-11-25",
      status: "In Progress",
      lastUpdate: "2024-12-02",
    },
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3 style={{ marginBottom: 20 }}>Client Name : Anand</h3>
      <Typography
        variant="h6"
        style={{ marginBottom: 20, textAlign: "left", fontWeight: "bold" }}
      >
        Personal Info
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Row 1 */}
        <Grid item xs={12} sm={6}>
          <CustomInput
            id="firstname"
            label="First Name"
            value="Anand"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomInput
            id="lastname"
            label="Last Name"
            value="Garikapati"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomInput
            id="email"
            label="Email"
            value="anand@gmail.com"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomInput
            id="mobilenumber"
            label="Mobile Number"
            value="888611561"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomAutocomplete
            id="purpose"
            label="Purpose"
            options={visaPurposes}
            value="Education"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomAutocomplete
            id="visatype"
            label="Visa Type"
            options={visaTypes}
            value="Tourism"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomAutocomplete
            id="destinationcountry"
            label="Destination Country"
            options={destinationCountries}
            value="USA"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomInput
            id="passportnumber"
            label="Passport Number"
            value="JUHT"
            disabled={true}
          />
        </Grid>
      </Grid>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 5, mb: 2 }}
      >
        <Typography variant="h6" sx={{ textAlign: "left", fontWeight: "bold" }}>
          Task List
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small" // Keeps the button size small
          sx={{ fontSize: "0.875rem", height: "32px", fontWeight: "bold" }} // Adjusts button padding, font size, and height
        >
          <AddIcon sx={{ fontSize: 18, mr: 1, fontWeight: "bold" }} /> Add
          Service
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
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
              <TableCell>Task ID</TableCell>
              <TableCell align="center">Service</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Last Update</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskData.map((task) => (
              <TableRow key={task.taskId}>
                <TableCell align="center">{task.taskId}</TableCell>
                <TableCell align="center">{task.service}</TableCell>
                <TableCell align="center">{task.date}</TableCell>
                <TableCell align="center">{task.status}</TableCell>
                <TableCell align="center">{task.lastUpdate}</TableCell>
                <TableCell align="center">
                  <EditIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FormPage;

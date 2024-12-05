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
const FormPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // Retrieve 'name' from query params
  const title = searchParams.get("title"); // Retrieve 'name' from query params
  const [dialogOpen, setDialogOpen] = useState(false);
  const [servicelistDialogue, setServicelistDialogue] = useState(false);
  const [selectedClient, setSelectedClient] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

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

  const formik = useFormik({
    initialValues: {
      firstname: "", // Set 'firstname' as the name from query params
      lastname: "",
      email: "",
      mobilenumber: "",
      purpose: "Visa",
      visatype: "",
      destinationcountry: "",
      passportnumber: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      mobilenumber: Yup.string().required("Mobile number is required"),
      //   purpose: Yup.string().required("Purpose is required"),
      //   visatype: Yup.string().required("Visa type is required"),
      //   destinationcountry: Yup.string().required(
      //     "Destination country is required"
      //   ),
      //   passportnumber: Yup.string().required("Passport number is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const ServicesCards = [
    {
      name: "ITR Filing",
      title: "ITR Services Request",
    },
    {
      name: "Networth Assessment",
      title: "Networth Certificate",
    },
    {
      name: "Business Proof",
      title: "Business Proof",
    },
    {
      name: "Loans",
      title: "Loan",
    },
    {
      name: "Visa Fund",
      title: "Visa Fund",
    },
    {
      name: "Forex Payment",
      title: "Forex Payment",
    },
    {
      name: "Insurance",
      title: "Insurance",
    },
    {
      name: "Travel Booking",
      title: "Travel Booking",
    },
    {
      name: "Visa Slot",
      title: "Visa Slot",
    },
    {
      name: "Passport Application",
      title: "Passport Application",
    },
  ];
  let rows = [
    {
      serviceTitle: "ITR",
      quantity: 5,
      comments: "",
    },
    {
      serviceTitle: "Loans",
      quantity: 2,
      comments: "",
    },
  ];
  let serviceHistoryData = [
    {
      serviceId: 121,
      serviceTitle: "ITR",
      date: "16-02-2021",
      status: "Success",
      comments: "Done",
    },
    {
      serviceId: 253,
      serviceTitle: "Loans",
      date: "15-12-2021",
      status: "Pending",
      comments: "Under Process",
    },
    {
      serviceId: 322,
      serviceTitle: "Networth",
      date: "22-02-2021",
      status: "Pending",
      comments: "Processing",
    },
  ];
  const handleServiceSelection = (event, serviceName) => {
    const updatedServices = {
      ...selectedServices,
      [serviceName]: event.target.value,
    };
    setSelectedServices(updatedServices);
  };
  const servicesSubmit = () => {
    // Handle form submission logic here
    console.log("Selected Services: ", selectedServices);
    setServicelistDialogue(true);
  };
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3 style={{ marginBottom: 20 }}>{title}</h3>

      {showSuccessMessage ? (
        <ServicesSuccessMessage />
      ) : (
        <>
          {" "}
          <Grid container spacing={2}>
            {/* <label>Existing Clients</label> */}
            <Grid item xs={12} md={6}>
              <CustomAutocomplete
                id="state"
                label="Select Client"
                options={clientList}
                onChange={(event, newValue) => {
                  setSelectedClient(true);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" onClick={() => setDialogOpen(true)}>
                Add Client
              </Button>
            </Grid>
          </Grid>
          {selectedClient && (
            <>
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
              {title === "Create New Request" ? (
                <Serviceselection
                  setShowSuccessMessage={setShowSuccessMessage}
                />
              ) : (
                <AdditionalDetails
                  selectedService={title}
                  setShowSuccessMessage={setShowSuccessMessage}
                />
              )}

              <ServiceHistory serviceHistoryData={serviceHistoryData} />
            </>
          )}
        </>
      )}
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
          color="error"
          type="button"
          disabled={formik.isSubmitting}
          onClick={() => {
            setDialogOpen(false);
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 30,
          }}
        >
          Close
        </Button>
        <DialogTitle>
          <h3>{name} Registration</h3>
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
            {/* Row 1 */}
            <Grid item xs={12} sm={6}>
              <CustomInput
                id="firstname"
                label="First Name"
                {...getFieldProps("firstname")}
                touched={touched.firstname}
                errors={errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                id="lastname"
                label="Last Name"
                {...getFieldProps("lastname")}
                touched={touched.lastname}
                errors={errors.lastname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                id="email"
                label="Email"
                {...getFieldProps("email")}
                touched={touched.email}
                errors={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                id="mobilenumber"
                label="Mobile Number"
                {...getFieldProps("mobilenumber")}
                touched={touched.mobilenumber}
                errors={errors.mobilenumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                id="purpose"
                label="Purpose"
                value="Visa"
                options={visaPurposes}
                disabled={true}
                {...getFieldProps("purpose")}
                error={touched.purpose && Boolean(errors.purpose)} // Check if the field was touched and has an error
                helperText={touched.purpose && errors.purpose} // Display the error message
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                id="visatype"
                label="Visa Type"
                options={visaTypes}
                {...getFieldProps("visatype")}
                error={touched.visatype && Boolean(errors.visatype)} // Check if the field was touched and has an error
                helperText={touched.visatype && errors.visatype} // Display the error message
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                id="destinationcountry"
                label="Destination Country"
                options={destinationCountries}
                {...getFieldProps("destinationcountry")}
                error={
                  touched.destinationcountry &&
                  Boolean(errors.destinationcountry)
                } // Check if the field was touched and has an error
                helperText={
                  touched.destinationcountry && errors.destinationcountry
                } // Display the error message
                onChange={(event, newValue) => {
                  formik.setFieldValue("destinationcountry", newValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                id="passportnumber"
                label="Passport Number"
                {...getFieldProps("passportnumber")}
                touched={touched.passportnumber}
                errors={errors.passportnumber}
              />
            </Grid>
          </Grid>

          <DialogActions
            sx={{
              justifyContent: "center",
              paddingTop: "16px",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={formik.isSubmitting}
              sx={{
                padding: "8px 32px",
                textTransform: "none",
              }}
            >
              {formik.isSubmitting ? "Processing..." : "Submit"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* servicelist Dialogue */}
      <Dialog
        open={servicelistDialogue}
        onClose={() => setServicelistDialogue(false)}
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
        <DialogTitle>
          <h3> Service List</h3>
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
          <TableContainer
            component={Paper}
            sx={{ borderRadius: "12px", overflow: "hidden" }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "rgb(13, 81, 82)", // Add a light background for the header
                    "& th": {
                      //   fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    },
                  }}
                >
                  <TableCell>Service</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Comments/ Instructions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:hover": { backgroundColor: "#f5f5f5" }, // Hover effect for rows
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{row.serviceTitle}</TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{ padding: "4px 8px", minWidth: "30px", mr: 2 }}
                        variant="outlined"
                      >
                        -
                      </Button>
                      {row.quantity}
                      <Button
                        sx={{ padding: "4px 8px", minWidth: "30px", ml: 2 }}
                        variant="outlined"
                      >
                        +
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <CustomInput vaalue={row.quantity} />{" "}
                      {/* Ensure the prop is spelled correctly */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <DialogActions
            sx={{
              justifyContent: "center",
              paddingTop: "16px",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                padding: "8px 32px",
                textTransform: "none",
              }}
              onClick={() => {
                setServicelistDialogue(false);
                setShowSuccessMessage(true);
              }}
            >
              {"Submit"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default FormPage;

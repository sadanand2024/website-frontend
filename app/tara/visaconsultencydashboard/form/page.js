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
import Factory from "@/app/utils/Factory";
// import { useRouter } from "next/dist/client/router";
import { useAuth } from "@/app/context/AuthContext";

import { useRouter } from "next/navigation";
const FormPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // Retrieve 'name' from query params
  const title = searchParams.get("title"); // Retrieve 'name' from query params
  const service_id = searchParams.get("id"); // Retrieve 'name' from query params
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [clientList, setClientList] = useState([]);
  const { user, tokens, logout } = useAuth();

  let visaTypes = ["Student Visa", "Visit", "Work Visa", "Business"];
  const visaPurposes = [
    "Tourism",
    "Business",
    "Study",
    "Work",
    "Medical Treatment",
  ];

  const destinationCountries = [
    "FRANCE",
    "USA",
    "Australia",
    "Canada",
    "Germany",
    "INDIA",
  ];

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      purpose: "Visa",
      visa_type: "",
      destination_country: "",
      passport_number: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      mobile_number: Yup.string().required("Mobile number is required"),
      purpose: Yup.string().required("Purpose is required"),
      visa_type: Yup.string().required("Visa type is required"),
      destination_country: Yup.string().required(
        "Destination country is required"
      ),
      passport_number: Yup.string().required("Passport number is required"),
    }),
    onSubmit: async (values) => {
      const postData = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        mobile_number: values.mobile_number,
        purpose: values.purpose,
        visa_type: values.visa_type,
        destination_country: values.destination_country,
        passport_number: values.passport_number,
      };
      console.log(postData);
      const url = `/user_management/visa-users/`;
      const { res, error } = await Factory("post", url, postData);

      if (res.status_cd === 0) {
        getClientList();
        setDialogOpen(false);
      } else {
        alert("Something went wrong");
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, values, setValues } =
    formik;

  const getClientList = async () => {
    const url = "/user_management/visa-clients/";

    const { res, error } = await Factory("get", url, {});

    if (res.status_cd === 0) {
      setClientList(res.data);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };
  useEffect(() => {
    getClientList();
  }, [refresh]);

  useEffect(() => {
    if (Object.keys(selectedClient).length !== 0) {
      let selectedClientData = clientList.find(
        (client) =>
          client.first_name + " " + client.last_name ===
          selectedClient.first_name + " " + selectedClient.last_name
      );
      setSelectedClient(selectedClientData);
      setValues({
        first_name: selectedClient.first_name,
        last_name: selectedClient.last_name,
        email: selectedClient.email,
        mobile_number: selectedClient.mobile_number,

        purpose:
          selectedClient.services.length === 0
            ? selectedClient.purpose
            : selectedClient.services[selectedClient.services.length - 1]
                ?.purpose,

        visa_type:
          selectedClient.services.length === 0
            ? selectedClient.visa_type
            : selectedClient.services[selectedClient.services.length - 1]
                ?.visa_type,
        destination_country:
          selectedClient.services.length === 0
            ? selectedClient.destination_country
            : selectedClient.services[selectedClient.services.length - 1]
                ?.destination_country,

        passport_number:
          selectedClient.services.length === 0
            ? selectedClient.passport_number
            : selectedClient.services[selectedClient.services.length - 1]
                ?.passport_number,
      });
    }
  }, [clientList, selectedClient]);
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3 style={{ marginBottom: 20 }}>{title}</h3>

      {showSuccessMessage ? (
        <ServicesSuccessMessage
          visadetails={values}
          selectedClientData={selectedClient}
        />
      ) : (
        <>
          <Grid container spacing={2}>
            {/* <label>Existing Clients</label> */}
            <Grid item xs={12} md={6}>
              <CustomAutocomplete
                id="Client"
                label="Select Client"
                options={clientList.map(
                  (client) => client.first_name + " " + client.last_name
                )}
                onChange={(event, newValue) => {
                  // Find the client object corresponding to the selected name
                  let selectedClientData = clientList.find(
                    (client) =>
                      client.first_name + " " + client.last_name === newValue
                  );
                  setSelectedClient(selectedClientData); // Set the actual client object
                }}
              />
            </Grid>
            {user.user_role === "ServiceProvider_Admin" && (
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setValues({
                      first_name: "",
                      last_name: "",
                      email: "",
                      mobile_number: "",
                      purpose: "Visa",
                      visa_type: "",
                      destination_country: "",
                      passport_number: "",
                    });
                    setDialogOpen(true);
                  }}
                >
                  Add Client
                </Button>
              </Grid>
            )}
          </Grid>
          {Object.keys(selectedClient).length !== 0 && (
            <>
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
                  mt: 3,
                }}
              >
                <Grid container spacing={3}>
                  {/* Row 1 */}
                  <Grid item xs={12} sm={6}>
                    <CustomInput
                      id="first_name"
                      label="First Name"
                      {...getFieldProps("first_name")}
                      touched={touched.first_name}
                      errors={errors.first_name}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomInput
                      id="last_name"
                      label="Last Name"
                      {...getFieldProps("last_name")}
                      touched={touched.last_name}
                      errors={errors.last_name}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomInput
                      id="email"
                      label="Email"
                      {...getFieldProps("email")}
                      touched={touched.email}
                      errors={errors.email}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomInput
                      id="mobile_number"
                      label="Mobile Number"
                      {...getFieldProps("mobile_number")}
                      touched={touched.mobile_number}
                      errors={errors.mobile_number}
                      disabled
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
                      id="visa_type"
                      label="Visa Type"
                      options={visaTypes}
                      {...getFieldProps("visa_type")}
                      error={touched.visa_type && Boolean(errors.visa_type)} // Check if the field was touched and has an error
                      helperText={touched.visa_type && errors.visa_type} // Display the error message
                      onChange={(event, newValue) => {
                        formik.setFieldValue("visa_type", newValue);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomAutocomplete
                      id="destination_country"
                      label="Destination Country"
                      options={destinationCountries}
                      {...getFieldProps("destination_country")}
                      error={
                        touched.destination_country &&
                        Boolean(errors.destination_country)
                      } // Check if the field was touched and has an error
                      helperText={
                        touched.destination_country &&
                        errors.destination_country
                      } // Display the error message
                      onChange={(event, newValue) => {
                        formik.setFieldValue("destination_country", newValue);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomInput
                      id="passport_number"
                      label="Passport Number"
                      {...getFieldProps("passport_number")}
                      touched={touched.passport_number}
                      errors={errors.passport_number}
                    />
                  </Grid>
                </Grid>
              </Box>
              {title === "Create New Request" ? (
                <Serviceselection
                  visadetails={values}
                  selectedClientData={selectedClient}
                  setShowSuccessMessage={setShowSuccessMessage}
                  setRefresh={setRefresh}
                />
              ) : (
                <AdditionalDetails
                  visadetails={values}
                  selectedClientData={selectedClient}
                  selectedTitle={title}
                  service_id={service_id}
                  setShowSuccessMessage={setShowSuccessMessage}
                />
              )}

              <ServiceHistory
                setSelectedClient={setSelectedClient}
                selectedClientData={selectedClient}
                setRefresh={setRefresh}
              />
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
          //   color="error"
          type="button"
          disabled={formik.isSubmitting}
          onClick={() => {
            setValues({
              first_name: selectedClient.first_name,
              last_name: selectedClient.last_name,
              email: selectedClient.email,
              mobile_number: selectedClient.mobile_number,
              purpose: selectedClient.purpose,
              visa_type: selectedClient.visa_type,
              destination_country: selectedClient.destination_country,
              passport_number: selectedClient.passport_number,
            });
            setDialogOpen(false);
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
                id="first_name"
                label="First Name"
                {...getFieldProps("first_name")}
                touched={touched.first_name}
                errors={errors.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                id="last_name"
                label="Last Name"
                {...getFieldProps("last_name")}
                touched={touched.last_name}
                errors={errors.last_name}
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
                id="mobile_number"
                label="Mobile Number"
                {...getFieldProps("mobile_number")}
                touched={touched.mobile_number}
                errors={errors.mobile_number}
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
                id="visa_type"
                label="Visa Type"
                options={visaTypes}
                {...getFieldProps("visa_type")}
                error={touched.visa_type && Boolean(errors.visa_type)} // Check if the field was touched and has an error
                helperText={touched.visa_type && errors.visa_type} // Display the error message
                onChange={(event, newValue) => {
                  formik.setFieldValue("visa_type", newValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                id="destination_country"
                label="Destination Country"
                options={destinationCountries}
                {...getFieldProps("destination_country")}
                error={
                  touched.destination_country &&
                  Boolean(errors.destination_country)
                } // Check if the field was touched and has an error
                helperText={
                  touched.destination_country && errors.destination_country
                } // Display the error message
                onChange={(event, newValue) => {
                  formik.setFieldValue("destination_country", newValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                id="passport_number"
                label="Passport Number"
                {...getFieldProps("passport_number")}
                touched={touched.passport_number}
                errors={errors.passport_number}
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
    </div>
  );
};

export default FormPage;

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
import { useAuth } from "@/app/context/AuthContext";
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
const FormPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // Retrieve 'name' from query params
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clientList, setClientList] = useState([]);
  const { user, tokens, logout } = useAuth();

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
        ...values,
      };
      console.log(postData);
      const url = `/user_management/visa-users/`;
      const { res } = await Factory("post", url, postData);
      if (res.status_cd === 0) {
        getClientList(); // Refresh client list after successful submission
        setDialogOpen(false);
      } else {
        alert("Something went wrong");
      }
    },
  });

  const getClientList = async () => {
    const url = "/user_management/visa-clients/";
    const { res, error } = await Factory("get", url, {});

    if (res.status_cd === 0) {
      let arr = res?.data?.map((item) => {
        return {
          user: item.user,
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          mobile_number: item.mobile_number,

          purpose:
            item.services.length === 0
              ? item.purpose
              : item.services[item.services.length - 1]?.purpose,
          visa_type:
            item.services.length === 0
              ? item.visa_type
              : item.services[item.services.length - 1].visa_type,
          destination_country:
            item.services.length === 0
              ? item.destination_country
              : item.services[item.services.length - 1].destination_country,
          passport_number:
            item.services.length === 0
              ? item.passport_number
              : item.services[item.services.length - 1].passport_number,
        };
      });

      setClientList(arr);
    }
  };

  useEffect(() => {
    getClientList();
  }, []);
  const { errors, touched, handleSubmit, getFieldProps, values, setValues } =
    formik;
  console.log(clientList);
  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            style={{ marginBottom: 20, textAlign: "left", fontWeight: "bold" }}
          >
            Clients List
          </Typography>
        </Grid>
        {user.user_role === "ServiceProvider_Admin" && (
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Clients Table */}
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
              <TableCell>First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Mobile Number</TableCell>
              <TableCell align="center">Purpose</TableCell>
              <TableCell align="center">Visa Type</TableCell>
              <TableCell align="center">Destination Country</TableCell>
              <TableCell align="center">Passport Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientList.map((client, index) => (
              <TableRow
                key={index}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(
                    `/tara/visaconsultencydashboard/status?id=${client?.user}`
                  );
                }}
              >
                <TableCell>{client.first_name}</TableCell>
                <TableCell align="center">{client.last_name}</TableCell>
                <TableCell align="center">{client.email}</TableCell>
                <TableCell align="center">{client.mobile_number}</TableCell>
                <TableCell align="center">{client.purpose}</TableCell>
                <TableCell align="center">{client.visa_type}</TableCell>
                <TableCell align="center">
                  {client.destination_country}
                </TableCell>
                <TableCell align="center">{client.passport_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Client Dialog */}
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
          <h3>{name} Registration</h3>
        </DialogTitle>

        {/* Form for Client Registration */}
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
                options={visaPurposes} // Assuming options for autocomplete
                disabled={true}
                {...getFieldProps("purpose")}
                error={touched.purpose && Boolean(errors.purpose)}
                helperText={touched.purpose && errors.purpose}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                id="visa_type"
                label="Visa Type"
                options={visaTypes} // Example visa types
                {...getFieldProps("visa_type")}
                error={touched.visa_type && Boolean(errors.visa_type)}
                helperText={touched.visa_type && errors.visa_type}
                onChange={(event, newValue) => {
                  formik.setFieldValue("visa_type", newValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                id="destination_country"
                label="Destination Country"
                options={destinationCountries} // Example countries
                {...getFieldProps("destination_country")}
                error={
                  touched.destination_country &&
                  Boolean(errors.destination_country)
                }
                helperText={
                  touched.destination_country && errors.destination_country
                }
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

          <DialogActions sx={{ justifyContent: "center", paddingTop: "16px" }}>
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

"use client";

import CustomInput from "@/components/CustomInput";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  Typography,
  Button,
  Box,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import CustomDateInput from "@/components/CustomDateInput";

export default function IndividualForm() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(true); // For the first dialog
  const [kycDialogOpen, setKycDialogOpen] = useState(false); // For the second KYC dialog

  const [userData, setUserData] = useState(null); // This will store the user data for auto-population

  // Fetch user data (this would be from your server or context)

  const formik = useFormik({
    initialValues: {
      pancardnumber: "",
      aadharcardnumber: "",
    },
    validationSchema: Yup.object({
      pancardnumber: Yup.string().required("PAN Card number is required"),
      // .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Card format")
      aadharcardnumber: Yup.string().required("Aadhar card number is required"),
      // .matches(/^\d{12}$/, "Aadhar Card must be 12 digits"),
    }),
    onSubmit: async (values) => {
      console.log("Form values:", values);

      // Close the registration dialog
      setDialogOpen(false);

      // Open the KYC dialog
      setKycDialogOpen(true);
    },
  });

  const kycFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      dob: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      state: "",
      zip: "",
      aadharcardnumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      dob: Yup.date().nullable().notRequired(),
      addressLine1: Yup.string().required("Address Line 1 is required"),
      addressLine2: Yup.string().optional(),
      addressLine3: Yup.string().optional(),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.string()
        .matches(/^\d{6}$/, "Zip code must be 6 digits")
        .required("Zip code is required"),
      aadharcardnumber: Yup.string()
        .required("Aadhar Card number is required")
        .matches(/^\d{12}$/, "Aadhar Card must be 12 digits"),
    }),
    onSubmit: async (values) => {
      console.log("KYC Form values:", values);
      router.push("/tara");
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const {
    errors: kycErrors,
    touched: kycTouched,
    handleSubmit: kycHandleSubmit,
    getFieldProps: getKycFieldProps,
  } = kycFormik;

  return (
    <Box>
      {/* First Dialog: Registration */}
      <Dialog
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "20px",
          },
        }}
        open={dialogOpen}
        sx={{
          "& .MuiDialogTitle-root": {
            textAlign: "center",
          },
          "& .MuiTypography-body2": {
            color: "#666",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" gutterBottom>
            Individual Registration
          </Typography>
          <Typography variant="body2">
            Please provide your PAN Card and Aadhar Card details to complete the
            registration.
          </Typography>
        </DialogTitle>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* Pan Card Input */}
          <CustomInput
            size="small"
            label="PAN Card"
            {...getFieldProps("pancardnumber")}
            touched={touched.pancardnumber}
            errors={errors.pancardnumber}
          />

          {/* Aadhar Card Input */}
          <CustomInput
            size="small"
            label="Aadhar Card"
            {...getFieldProps("aadharcardnumber")}
            touched={touched.aadharcardnumber}
            errors={errors.aadharcardnumber}
          />

          {/* Submit Button */}
          <DialogActions
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Processing..." : "Complete Registration"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: "20px",
          },
        }}
        open={kycDialogOpen}
        sx={{
          "& .MuiDialogTitle-root": {
            textAlign: "center",
          },
          "& .MuiTypography-body2": {
            color: "#666",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" gutterBottom>
            Complete Your KYC
          </Typography>
          <Typography variant="body2">
            Please fill in your KYC details to complete the registration.
          </Typography>
        </DialogTitle>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={kycHandleSubmit}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          <Box style={{ display: "flex", gap: 5 }}>
            <CustomInput
              size="small"
              label="Name"
              {...getKycFieldProps("name")}
              touched={kycTouched.name}
              errors={kycErrors.name}
            />
            <CustomInput
              size="small"
              label="Email"
              value={kycFormik.values.email}
              {...getKycFieldProps("email")}
              touched={kycTouched.email}
              errors={kycErrors.email}
            />
          </Box>
          <Box style={{ display: "flex", gap: 5 }}>
            <CustomInput
              size="small"
              label="Mobile"
              value={kycFormik.values.mobile}
              {...getKycFieldProps("mobile")}
              touched={kycTouched.mobile}
              errors={kycErrors.mobile}
            />
            <CustomInput
              size="small"
              label="D O B"
              value={kycFormik.values.mobile}
              {...getKycFieldProps("mobile")}
              touched={kycTouched.mobile}
              errors={kycErrors.mobile}
            />
            {/* <CustomDateInput
              id="dob"
              label="Date of Birth"
              {...getFieldProps("dob")}
              touched={kycTouched.dob}
              errors={kycErrors.dob}
            /> */}
          </Box>

          <CustomInput
            size="small"
            label="Address Line 1"
            {...getKycFieldProps("addressLine1")}
            touched={kycTouched.addressLine1}
            errors={kycErrors.addressLine1}
          />
          <Box style={{ display: "flex", gap: 5 }}>
            <CustomInput
              size="small"
              label="Address Line 2"
              {...getKycFieldProps("addressLine2")}
              touched={kycTouched.addressLine2}
              errors={kycErrors.addressLine2}
            />

            <CustomInput
              size="small"
              label="Address Line 3"
              {...getKycFieldProps("addressLine3")}
              touched={kycTouched.addressLine3}
              errors={kycErrors.addressLine3}
            />
          </Box>

          <Box style={{ display: "flex", gap: 5 }}>
            <CustomInput
              size="small"
              label="City"
              {...getKycFieldProps("city")}
              touched={kycTouched.city}
              errors={kycErrors.city}
            />
            <CustomInput
              size="small"
              label="State"
              {...getKycFieldProps("state")}
              touched={kycTouched.state}
              errors={kycErrors.state}
            />
          </Box>
          <Box style={{ display: "flex", gap: 5 }}>
            <CustomInput
              size="small"
              label="Zip Code"
              {...getKycFieldProps("zip")}
              touched={kycTouched.zip}
              errors={kycErrors.zip}
            />

            <CustomInput
              size="small"
              label="Aadhar Card"
              {...getKycFieldProps("aadharcardnumber")}
              touched={kycTouched.aadharcardnumber}
              errors={kycErrors.aadharcardnumber}
            />
          </Box>

          <DialogActions
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={kycFormik.isSubmitting}
            >
              {kycFormik.isSubmitting ? "Processing..." : "Complete KYC"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

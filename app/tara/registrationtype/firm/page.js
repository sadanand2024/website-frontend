"use client";

import CustomInput from "@/components/CustomInput";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  Box,
  Typography,
  Button,
  DialogTitle,
  DialogActions,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { statesAndUTs } from "../../../utils/statesAndUTs";
import CustomAutocomplete from "@/components/CustomAutocomplete";

export default function FirmForm() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [firmkycDialogOpen, setFirmkycDialogOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      icaiNumber: "",
      aadharcardnumber: "",
      pannumber: "",
      registeredaddresslane1: "",
      registeredaddresslane2: "",
      city: "",
      state: "",
      zip: "",
      phoneNumber: "",
      havefirm: "false",
    },
    validationSchema: Yup.object({
      icaiNumber: Yup.string().required("ICAI number is required"),
      pannumber: Yup.string().required("PAN Card number is required"),
      aadharcardnumber: Yup.string().required("Aadhar Card number is required"),
      registeredaddresslane1: Yup.string().required(
        "Address Line 1 is required"
      ),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.string().required("Zip code is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      havefirm: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      console.log("Form values:", values);
      if (values.havefirm === "true") {
        setDialogOpen(false);
        setFirmkycDialogOpen(true);
      } else {
        router.push("/tara");
      }
    },
  });
  const firmkycFormik = useFormik({
    initialValues: {
      firmname: "",
      firmregistrationnumber: "",
      firmemail: "",
      firmmobilenumber: "",
      noofpartnersinfirm: "",
      firmaddress: "",
    },
    validationSchema: Yup.object({
      firmname: Yup.string().required("Firm Name is required"),
      firmregistrationnumber: Yup.string().required(
        "Firm Registration Number is required"
      ),
      firmemail: Yup.string()
        .email("Invalid email address")
        .required("Firm Email is required"),
      firmmobilenumber: Yup.string().required("Firm Mobile Number is required"),
      noofpartnersinfirm: Yup.string().required("No of Partners is required"),
      firmaddress: Yup.string().required("Firm Address  is required"),
    }),
    onSubmit: async (values) => {
      console.log("Firm KYC Form values:", values);
      router.push("/tara"); // Navigate to the next page
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const {
    errors: kycErrors,
    touched: kycTouched,
    handleSubmit: kycHandleSubmit,
    getFieldProps: getKycFieldProps,
  } = firmkycFormik;

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
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
        <DialogTitle>
          <h3>Chartered Accountant KYC</h3>
          <Typography variant="body2">
            Please provide the necessary details to complete the registration.
          </Typography>
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
          <CustomInput
            id="icaiNumber"
            label="ICAI Number"
            {...getFieldProps("icaiNumber")}
            touched={touched.icaiNumber}
            errors={errors.icaiNumber}
          />
          <Box style={{ display: "flex", gap: 16 }}>
            <CustomInput
              id="pannumber"
              label="PAN Card Number"
              {...getFieldProps("pannumber")}
              touched={touched.pannumber}
              errors={errors.pannumber}
            />
            <CustomInput
              id="aadharcardnumber"
              label="Aadhar Card Number"
              {...getFieldProps("aadharcardnumber")}
              touched={touched.aadharcardnumber}
              errors={errors.aadharcardnumber}
            />
          </Box>

          <CustomInput
            id="registeredaddresslane1"
            label="Address Line 1"
            {...getFieldProps("registeredaddresslane1")}
            touched={touched.registeredaddresslane1}
            errors={errors.registeredaddresslane1}
          />
          <CustomInput
            id="registeredaddresslane2"
            label="Address Line 2 (optional)"
            {...getFieldProps("registeredaddresslane2")}
            touched={touched.registeredaddresslane2}
            errors={errors.registeredaddresslane2}
          />
          <Box style={{ display: "flex", gap: 16 }}>
            <CustomAutocomplete
              id="state"
              options={statesAndUTs}
              placeholder="Select state"
              touched={touched.state}
              errors={errors.state}
              value={formik.values.state}
              onChange={(newValue) => formik.setFieldValue("state", newValue)}
            />

            <CustomInput
              id="city"
              label="City"
              {...getFieldProps("city")}
              touched={touched.city}
              errors={errors.city}
            />
          </Box>
          <Box style={{ display: "flex", gap: 16 }}>
            <CustomInput
              id="zip"
              label="Zip Code"
              {...getFieldProps("zip")}
              touched={touched.zip}
              errors={errors.zip}
            />
            <CustomInput
              id="phoneNumber"
              label="Phone Number"
              {...getFieldProps("phoneNumber")}
              touched={touched.phoneNumber}
              errors={errors.phoneNumber}
            />
          </Box>

          <RadioGroup
            name="havefirm"
            value={formik.values.havefirm}
            onChange={(e) => formik.setFieldValue("havefirm", e.target.value)}
            sx={{
              display: "flex",
              flexDirection: "row", // Align items horizontally
              gap: "16px", // Add space between the radio buttons
              alignItems: "center", // Vertically align the radio buttons with the label
            }}
          >
            <Typography variant="body1" sx={{ marginRight: "8px" }}>
              Do you have a firm?
            </Typography>
            <FormControlLabel value="true" label="Yes" control={<Radio />} />
            <FormControlLabel value="false" label="No" control={<Radio />} />
          </RadioGroup>

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
              }}
            >
              {formik.isSubmitting ? "Processing..." : "Complete Registration"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={firmkycDialogOpen}
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
          <h3>Firm KYC</h3>
          <Typography variant="body2">
            Please provide the necessary details to complete the firm
            registration.
          </Typography>
        </DialogTitle>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={firmkycFormik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: "8px 0",
          }}
        >
          <CustomInput
            id="firmname"
            label="Firm Name"
            {...firmkycFormik.getFieldProps("firmname")}
            touched={kycTouched.firmname}
            errors={kycErrors.firmname}
          />
          <CustomInput
            id="firmregistrationnumber"
            label="Firm Registration Number"
            {...firmkycFormik.getFieldProps("firmregistrationnumber")}
            touched={kycTouched.firmregistrationnumber}
            errors={kycErrors.firmregistrationnumber}
          />
          <CustomInput
            id="firmemail"
            label="Firm Email"
            {...firmkycFormik.getFieldProps("firmemail")}
            touched={kycTouched.firmemail}
            errors={kycErrors.firmemail}
          />
          <CustomInput
            id="firmmobilenumber"
            label="Firm Mobile Number"
            {...firmkycFormik.getFieldProps("firmmobilenumber")}
            touched={kycTouched.firmmobilenumber}
            errors={kycErrors.firmmobilenumber}
          />
          <CustomInput
            id="noofpartnersinfirm"
            label="Number of Partners in Firm"
            {...firmkycFormik.getFieldProps("noofpartnersinfirm")}
            touched={kycTouched.noofpartnersinfirm}
            errors={kycErrors.noofpartnersinfirm}
          />
          <CustomInput
            id="firmaddress"
            label="Firm Address"
            {...firmkycFormik.getFieldProps("firmaddress")}
            touched={kycTouched.firmaddress}
            errors={kycErrors.firmaddress}
          />

          <DialogActions
            sx={{
              justifyContent: "center",
              paddingTop: "16px",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={firmkycFormik.isSubmitting}
              sx={{
                padding: "8px 32px",
              }}
            >
              {firmkycFormik.isSubmitting
                ? "Processing..."
                : "Complete Firm KYC"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

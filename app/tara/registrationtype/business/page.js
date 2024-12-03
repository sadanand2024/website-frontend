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

export default function BusinessKYC() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(true);

  const formik = useFormik({
    initialValues: {
      icai_number: "",
      aadhaar_number: "",
      pan_number: "",
      address_line1: "",
      address_line2: "",
      address_line3: "",
      city: "",
      state: "",
      zip: "",
      phoneNumber: "",
      havefirm: "false",
    },
    validationSchema: Yup.object({
      icai_number: Yup.string().required("ICAI number is required"),
      pan_number: Yup.string().required("PAN Card number is required"),
      aadhaar_number: Yup.string().required("Aadhar Card number is required"),
      address_line1: Yup.string().required("Address Line 1 is required"),
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
        router.push("/tara"); // Navigate to the next page
      } else {
        router.push("/tara");
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

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
          <h3>Business KYC</h3>
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
            id="icai_number"
            label="ICAI Number"
            {...getFieldProps("icai_number")}
            touched={touched.icai_number}
            errors={errors.icai_number}
          />
          <Box style={{ display: "flex", gap: 16 }}>
            <CustomInput
              id="pan_number"
              label="PAN Card Number"
              {...getFieldProps("pan_number")}
              touched={touched.pan_number}
              errors={errors.pan_number}
            />
            <CustomInput
              id="aadhaar_number"
              label="Aadhar Card Number"
              {...getFieldProps("aadhaar_number")}
              touched={touched.aadhaar_number}
              errors={errors.aadhaar_number}
            />
          </Box>

          <CustomInput
            id="address_line1"
            label="Address Line 1"
            {...getFieldProps("address_line1")}
            touched={touched.address_line1}
            errors={errors.address_line1}
          />
          <CustomInput
            id="address_line2"
            label="Address Line 2 (optional)"
            {...getFieldProps("address_line2")}
            touched={touched.address_line2}
            errors={errors.address_line2}
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
                textTransform: "none",
              }}
            >
              {formik.isSubmitting ? "Processing..." : "Next"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

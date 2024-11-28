"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/CustomInput";
import {
  Grid,
  Card,
  Typography,
  Button,
  Divider,
  Link,
  Container,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useRouter } from "next/navigation";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

import useRecaptchaV3 from "@/components/useRecaptchaV3";
const RegistrationPage = () => {
  const {
    token,
    error: captchaError,
    isReady: isRecaptchaReady,
  } = useRecaptchaV3(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  const router = useRouter();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email_or_phonenumber: "",
      password: "",
      termsAndPrivacy: false,
    },
    validationSchema: Yup.object({
      email_or_phonenumber: Yup.string().required(
        "Email or phone number is required"
      ),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      termsAndPrivacy: Yup.bool().oneOf(
        [true],
        "Please read and agree to the following policies "
      ),
    }),

    onSubmit: async (values) => {
      try {
        // Simulate API call here (Replace with your actual API route later)
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email_or_phonenumber,
            password: values.password,
            // You can add CAPTCHA logic here later
          }),
        });

        const result = await response.json();
        if (response.ok) {
          localStorage.setItem("auth_token", response.token);
          router.push("/tara/registrationtype/selection"); // Redirect to the selection page after login
        } else {
          // Handle errors
          alert(result.error || "Registration failed.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Something went wrong during registration.");
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    // <GoogleReCaptchaProvider
    //   reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    // >
    <Grid
      container
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        background: "linear-gradient(to bottom, #f9fafa, #ffffff)",
      }}
    >
      {/* Left Section */}
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2} className="logoLeft">
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={"img/L2.png"} alt="Tara" height={42} />
          </Link>
        </Typography>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Manage the job
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          More effectively with optimized workflows.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            maxWidth: "80%",
            marginBottom: "20px",
          }}
        >
          <img
            src="img/registrationimage.jpg"
            alt="Registration"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid
        item
        xs={12}
        sm={7}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Container maxWidth="xs">
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Get started absolutely free
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Already have an account?&nbsp;
            <Link href="/login" underline="hover">
              Login
            </Link>
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Form Fields */}
            <CustomInput
              label="Email or Phone Number"
              id="email_or_phonenumber"
              {...getFieldProps("email_or_phonenumber")}
              touched={touched.email_or_phonenumber}
              errors={errors.email_or_phonenumber}
            />
            <CustomInput
              id="password"
              label="Password"
              type="password"
              {...getFieldProps("password")}
              touched={touched.password}
              errors={errors.password}
            />

            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps("termsAndPrivacy")}
                  checked={formik.values.termsAndPrivacy}
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link href="#" underline="hover">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" underline="hover">
                    Privacy Policy
                  </Link>
                  .
                </Typography>
              }
            />
            {touched.termsAndPrivacy && errors.termsAndPrivacy && (
              <Typography variant="body2" color="error">
                {errors.termsAndPrivacy}
              </Typography>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </Button>
            {/* {captchaError && (
              <Typography color="error">{captchaError}</Typography>
            )} */}

            {/* <Divider>
              <Typography sx={{ color: "text.secondary" }}>or</Typography>
            </Divider>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </Box> */}
          </Box>
        </Container>
      </Grid>
    </Grid>
    // </GoogleReCaptchaProvider>
  );
};

export default RegistrationPage;

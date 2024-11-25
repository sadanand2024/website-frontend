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
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [captcha, setCaptcha] = useState("");

  const formik = useFormik({
    initialValues: {
      email_or_phonenumber: "",
      password: "",
      captchaInput: "",
    },
    validationSchema: Yup.object({
      email_or_phonenumber: Yup.string().required(
        "Email or phone number is required"
      ),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log("Login success:", data);
        localStorage.setItem("auth_token", data.token);
        // router.push("/registration/selection"); // Redirect to the selection page after login
        router.push("/tara/registrationtype/selection"); // Redirect to the selection page after login
      } else {
        // Handle error (show error message to the user)
        console.error("Login failed:", data.error);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Grid container sx={{ minHeight: "100vh", alignItems: "center" }}>
      {/* Left Section */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          background: "linear-gradient(to bottom, #f9fafa, #ffffff)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Tara
          </Link>
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Hi, Welcome back .
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
            src="img/loginimage.jpg"
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
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Container maxWidth="xs">
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Sign in to your account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Don’t have an account?{" "}
            <Link href="/register" underline="hover">
              Get started
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

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? "..." : "Sign In"}
            </Button>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

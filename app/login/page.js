"use client";
import { useFormik, Formik, Field, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/CustomInput";
import {
  Grid,
  Typography,
  Button,
  Link,
  Container,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../constants";

const LoginPage = () => {
  const router = useRouter();
  const { user, tokens, logout, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email_or_phonenumber: user?.email_or_phonenumber || "", // Dynamically set the value
      password: "",
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
      try {
        const url = `/token_auth/`;
        const postData = {
          email_or_mobile: values.email_or_phonenumber,
          password: values.password,
        };

        const res = await axios.post(BASE_URL + url, postData);

        if (res.status === 200) {
          const {
            id,
            email,
            mobile_number,
            access,
            refresh,
            user_kyc,
            user_type,
            created_on,
            user_role,
            name,
          } = res.data;

          login(
            {
              id,
              email,
              mobile_number,
              user_kyc,
              user_type,
              created_on,
              name,
              user_role,
            },
            { access, refresh }
          );

          if (user_kyc === "false") {
            // router.push("/tara/registrationtype/selection");
            router.push("/tara");
          } else {
            router.push("/tara");
          }
        } else {
          alert("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Login error:", error.response.data.detail);
        alert(error.response.data.detail);
      }
    },
  });

  // Automatically redirect to another page if the user is already logged in
  useEffect(() => {
    if (tokens?.access) {
      // router.push("/tara/registrationtype/selection");
    }
  }, [tokens, router]);

  // Reset form on logout
  const handleLogout = () => {
    logout();
    formik.resetForm(); // Reset the Formik form
    router.push("/login"); // Navigate to login page
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9fafa, #ffffff)",
      }}
    >
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
          pt: 10,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2} className="logoLeft">
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={"img/L2.png"} alt="Tara" height={42} />
          </Link>
        </Typography>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Hi, Welcome back
        </Typography>
        <Typography variant="body1" color="text.primary" mb={4}>
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
        <Typography
          variant="body1"
          fontWeight="bold"
          mb={2}
          className="logoRight"
        >
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Need help?
          </Link>
        </Typography>

        <Container maxWidth="xs">
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Sign in to your account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Don’t have an account?&nbsp;
            <Link href="/register" underline="hover">
              Get started
            </Link>
          </Typography>

          <FormikProvider value={formik}>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <CustomInput
                  label="Email or Phone Number"
                  id="email_or_phonenumber"
                  name="email_or_phonenumber"
                  autoComplete={"email_or_phonenumber"}
                  value={formik.values.email_or_phonenumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.email_or_phonenumber}
                  errors={formik.errors.email_or_phonenumber}
                />
                <Typography
                  align="right"
                  variant="body2"
                  color="text.secondary"
                  mb={-1}
                >
                  <Link href="/forgot-password" underline="hover">
                    Forgot password?
                  </Link>
                </Typography>

                <CustomInput
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password" // autofill enabled for password
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.password}
                  errors={formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={formik.isSubmitting}
                  sx={{ mt: 2 }}
                >
                  {formik.isSubmitting ? "..." : "Sign In"}
                </Button>
              </Box>
            </Form>
          </FormikProvider>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

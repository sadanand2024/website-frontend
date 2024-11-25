"use client";
import { CallToAction2 } from "@/components/CallToAction";
import PlaxLayout from "@/layouts/PlaxLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import CustomInput from "@/components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";

const page = () => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phonenumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form values:", values);
      alert("Thank you! Your message has been sent.");
      resetForm();
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <PlaxLayout bg={false}>
      <Box sx={{ pt: 20, px: 2 }}>
        {/* Page Title */}
        <h1 align="center">We Are Here to Help You</h1>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          We'd love to hear from you! Please fill out the form below.
        </Typography>

        {/* Form Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 5,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "600px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="firstname"
                  label="First Name"
                  aria-label="First Name"
                  {...getFieldProps("firstname")}
                  touched={touched.firstname}
                  errors={errors.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  id="lastname"
                  label="Last Name"
                  aria-label="Last Name"
                  {...getFieldProps("lastname")}
                  touched={touched.lastname}
                  errors={errors.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  id="email"
                  label="Email"
                  type="email"
                  aria-label="Email"
                  {...getFieldProps("email")}
                  touched={touched.email}
                  errors={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  id="phonenumber"
                  label="Phone Number"
                  type="tel"
                  aria-label="Phone Number"
                  {...getFieldProps("phonenumber")}
                  touched={touched.phonenumber}
                  errors={errors.phonenumber}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  id="message"
                  label="Message"
                  multiline
                  rows={5}
                  aria-label="Message"
                  {...getFieldProps("message")}
                  touched={touched.message}
                  errors={errors.message}
                />
              </Grid>
              <Grid item xs={12}>
                <button
                  className="mil-btn mil-md mil-add-arrow"
                  type="submit"
                  fullWidth
                  style={{ width: "100%" }}
                >
                  Submit
                </button>
              </Grid>
            </Grid>
          </form>
        </Box>

        {/* Contact Information */}
        <Box textAlign="center" sx={{ pb: 2 }}>
          <h5>We are also available on the following channel</h5>
          <Typography variant="body2" color="textSecondary">
            Address: Madhapur, Hyderabad
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Telephone: 1234567897
          </Typography>

          <Typography variant="body2" color="textSecondary">
            Email: admin@tarafirst.com
          </Typography>
        </Box>

        {/* Call to Action Section */}
        <CallToAction2 />
      </Box>
    </PlaxLayout>
  );
};

export default page;

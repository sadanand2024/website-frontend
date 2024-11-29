"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Link } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { BASE_URL } from "../constants";
const AccountVerification = () => {
  //   useEffect(async() => {
  //     let url = ''
  //     postData ={}
  //     const response = await axios.post(BASE_URL + Url, postData);

  //         console.log(response.data);
  //   }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          boxShadow: 3,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <h2>Tara</h2>

          <img src="/img/L2.png" />

          <h3>Your Account has been verified</h3>
          <CheckCircleIcon sx={{ fontSize: 50, color: "green", mb: 2 }} />

          <br />
          <Typography variant="body1">
            Please{" "}
            <Link href="/" style={{ color: "blue" }} underline="hover">
              click here
            </Link>{" "}
            to login.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountVerification;

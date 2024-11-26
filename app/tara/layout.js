"use client";

import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar /> {/* Include Navbar here */}
      <Box
        sx={{
          p: "100px 0px 0px 250px",
        }}
      >
        {children} {/* This will render the content dynamically */}
      </Box>
    </div>
  );
}

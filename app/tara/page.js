"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

export default function DashboardPage() {
  const router = useRouter();

  // useEffect(() => {
  //   // Check if the user has submitted the form, otherwise show a modal
  //   const formSubmitted = localStorage.getItem("formSubmitted");
  //   if (!formSubmitted) {
  //     router.push("/dashboard"); // If not, redirect back to dashboard page to show the modal
  //   }
  // }, [router]);

  return (
    <Box sx={{ m: 3 }}>
      <h3>Welcome to Tara</h3>
    </Box>
  );
}

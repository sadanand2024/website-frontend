"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import VisaconsultencDashboard from "./visaconsultencydashboard";
// import CAfirmDashboard from "./cafirmDashboard";
import IndividualDashboard from "./individualDashboard";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user, logout, setUser, setTokens } = useAuth();
  const userTypes = ["individual", "cafirm", "business", "service_provider"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {user.user_type === "Individual" &&
      user.user_role === "Individual_User" ? (
        <IndividualDashboard />
      ) : (
        ["ServiceProvider_Admin", "ServiceProvider"].includes(
          user.user_type
        ) && <VisaconsultencDashboard />
      )}
    </Box>
  );
}

export default DashboardPage;

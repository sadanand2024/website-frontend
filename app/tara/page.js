"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import VisaconsultencDashboard from "./visaconsultencydashboard";
// import CAfirmDashboard from "./cafirmDashboard";
// import IndividualDashboard from "./individualDashboard";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user, logout, setUser, setTokens } = useAuth();
  const userTypes = ["individual", "cafirm", "business", "service_provider"];
  const [userType, setUserType] = useState(null);
  console.log(user);
  useEffect(() => {
    // const fetchedUserType = "service_provider";

    setUserType(user.user_type);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <VisaconsultencDashboard />
      {/* {userType === "service_provider" && <VisaconsultencDashboard />}
      {userType === "cafirm" && <CAfirmDashboard />}
      {userType === "individual" && <IndividualDashboard />} */}
    </Box>
  );
}

export default DashboardPage;

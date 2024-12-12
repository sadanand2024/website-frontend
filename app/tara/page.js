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
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    setUserType(user.user_role);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <VisaconsultencDashboard /> */}
      {/* user_role
: 
"Individual_User"
user_type
: 
"ServiceProvider"  */}
      {user.user_type === "Individual" &&
      user.user_role === "Individual_User" ? (
        <IndividualDashboard />
      ) : (
        ["ServiceProvider_Admin", "ServiceProvider"].includes(
          user.user_type
        ) && <VisaconsultencDashboard />
      )}

      {/* {userType === "ServiceProvider_Admin" ||
        userType === "ServiceProvider" ||
        (user.user_role === "Individual_User" && <VisaconsultencDashboard />)}
      {userType === "cafirm" && <CAfirmDashboard />} */}
    </Box>
  );
}

export default DashboardPage;

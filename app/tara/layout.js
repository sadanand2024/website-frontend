"use client";
import React, { useState, useEffect } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import AppBarComponent from "./components/Appbar";
import Sidebar from "./components/SideNavbar";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const router = useRouter();
  const toggleDrawer = () => setOpen(!open);
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const { user, logout, setUser, setTokens } = useAuth();

  useEffect(() => {
    const authenticateUser = () => {
      try {
        const tokensData = JSON.parse(localStorage.getItem("tokens"));
        const userDetails = JSON.parse(localStorage.getItem("user"));

        if (!tokensData?.access) {
          router.push("/login");
        } else {
          setUser(userDetails); // Set user details if available
          setTokens(tokensData); // Set tokens
        }
      } catch (error) {
        console.error("Error reading localStorage:", error);
        router.push("/login");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    authenticateUser();
  }, [router, setUser, setTokens]);



  const handleLogout = () => {
    logout(); // Ensure the logout function clears tokens/context
    router.push("/login"); // Redirect to login page after logout
    handleMenuClose();
  };
  return (
    <Box sx={{ display: "flex" }}>
      {!loading && (
        <>
          <CssBaseline />
          <AppBarComponent
            handleAvatarClick={handleAvatarClick}
            handleMenuClose={handleMenuClose}
            handleLogout={handleLogout}
            anchorEl={anchorEl}
            toggleDrawer={toggleDrawer}
          />
          <Sidebar
            open={open}
            toggleDrawer={toggleDrawer}
            isSmallScreen={isSmallScreen}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 5,
              transition: "margin 0.3s",
              marginTop: "64px",
            }}
          >
            {children}
          </Box>
        </>
      )}
    </Box>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import AppBarComponent from "./components/Appbar";
import Sidebar from "./components/SideNavbar";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const router = useRouter();
  const toggleDrawer = () => setOpen(!open);
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const { user, tokens, logout } = useAuth();
  useEffect(() => {
    // Check if token is available. If not, redirect to login page.
    if (!tokens?.access) {
      // If no access token, redirect to login page
      router.push("/login");
    }
  }, [tokens, router]);
  const handleLogout = () => {
    logout(); // Ensure the logout function clears tokens/context
    router.push("/login"); // Redirect to login page after logout
    handleMenuClose();
  };
  return (
    <Box sx={{ display: "flex" }}>
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
    </Box>
  );
}

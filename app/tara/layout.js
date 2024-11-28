"use client";
import React, { useState } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import AppBarComponent from "./Appbar";
import Sidebar from "./SideNavbar";
import { useRouter } from "next/navigation";
export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const router = useRouter();
  const toggleDrawer = () => setOpen(!open);
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    router.push("/login"), handleMenuClose();
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

"use client";
import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Navbar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  // Open the avatar menu
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the avatar menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle logout logic
  const handleLogout = async () => {
    // Clear authentication token or session data from localStorage
    localStorage.removeItem("auth_token"); // Clear from localStorage

    // Call the logout API to clear server-side session or cookies
    const response = await fetch("/api/auth/logout", { method: "GET" });

    if (response.ok) {
      console.log("Logout successful");
      router.push("/login"); // Redirect to the login page after successful logout
    } else {
      console.error("Logout failed");
    }

    // Optionally, close the menu after logout (if you're using a menu component)
    handleClose();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white", // Set the background color to white
      }}
    >
      <Toolbar>
        {/* Left Side: Logo or Name */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Link href="/">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Tara
            </Typography>
          </Link>
        </Box>

        {/* Center: Empty to center-align logo */}
        <Box sx={{ display: "flex", justifyContent: "center", flex: 2 }}></Box>

        {/* Right Side: Avatar for user profile */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ cursor: "pointer" }} onClick={handleAvatarClick}>
            <AccountCircleIcon />
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={() => router.push("/dashboard/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => router.push("/dashboard/settings")}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

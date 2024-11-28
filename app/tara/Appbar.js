"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link for client-side navigation

export default function AppBarComponent({
  handleAvatarClick,
  handleMenuClose,
  handleLogout,
  anchorEl,
  toggleDrawer,
}) {
  const router = useRouter();

  // Menu items for the profile actions
  const menuItems = [
    {
      title: "Profile",
      onClick: () => router.push("/profile"),
      color: "#333", // Default text color
      fontSize: "16px",
    },
    {
      title: "Logout",
      onClick: handleLogout,
      color: "#e53935", // Red color for logout
      fontSize: "16px",
      hoverColor: "#f8d7da", // Light red background on hover
    },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)", // Stronger shadow for depth
        backgroundColor:
          "linear-gradient(90deg, rgba(0, 121, 211, 1) 0%, rgba(0, 84, 142, 1) 100%)", // Gradient background
        transition: "background-color 0.3s ease, box-shadow 0.3s ease", // Smooth transition for background and shadow
      }}
    >
      <Toolbar
        sx={{ padding: "0 16px", display: "flex", alignItems: "center" }}
      >
        {/* Hamburger Icon (For mobile screens) */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{
            mr: 2,
            display: { sm: "none" },
            transition: "transform 0.3s ease",
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo and Title */}

        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "24px",
            color: "#fff", // White color for text
          }}
        >
          <Link href="/tara" passHref>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "white",
                fontSize: "2rem",
              }}
            >
              <Avatar
                src="/img/L2.png"
                alt="Tara Logo"
                sx={{
                  mr: 1,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  transition: "transform 0.3s ease", // Smooth hover animation
                  "&:hover": {
                    transform: "scale(1.1)", // Scale effect on hover
                  },
                }}
              />
              Tara
            </div>
          </Link>
        </Typography>

        {/* Profile Avatar */}
        <IconButton onClick={handleAvatarClick}>
          <Avatar
            alt="User"
            src="/profile.jpg"
            sx={{
              width: 40,
              height: 40,
              border: "2px solid #fff", // White border around the avatar
              transition: "transform 0.3s ease, border-color 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)", // Hover effect for scaling
                borderColor: "#00c4cc", // Light blue border on hover
              },
            }}
          />
        </IconButton>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiMenu-paper": {
              backgroundColor: "#fff", // Menu background
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for the menu
              borderRadius: "8px", // Rounded corners for the menu
              padding: "8px 0",
            },
          }}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={item.onClick}
              sx={{
                fontSize: item.fontSize,
                color: item.color,
                "&:hover": {
                  backgroundColor: item.hoverColor || "inherit", // Apply hover color if defined
                },
              }}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

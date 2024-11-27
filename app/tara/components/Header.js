// components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ onMenuClick }) {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/* Logo */}
        <Box
          component="img"
          src="/logo.png"
          alt="Logo"
          sx={{ height: 40, mr: 2 }}
        />

        {/* Website Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Website
        </Typography>

        {/* Menu Button (for Mobile Sidebar Toggle) */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

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
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function AppBarComponent({
  handleAvatarClick,
  handleMenuClose,
  handleLogout,
  anchorEl,
  toggleDrawer,
}) {
  const router = useRouter();
  const { user, tokens, logout } = useAuth();
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          edge="start"
          onClick={toggleDrawer}
          sx={{
            mr: 2,
            display: { sm: "none" },
          }}
        >
          <MenuIcon sx={{ color: "white !important" }} />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "24px",
            color: "#fff",
          }}
        >
          <Link href="/tara" passHref>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Avatar
                src="/img/L2.png"
                alt="Tara Logo"
                sx={{ mr: 1, width: 36, height: 36 }}
              />
              Tara
            </Box>
          </Link>
        </Typography>

        <IconButton onClick={handleAvatarClick}>
          <Avatar
            alt="User"
            src="/profile.jpg"
            sx={{
              width: 40,
              height: 40,
              border: "2px solid #fff",
              "&:hover": {
                borderColor: "#00c4cc",
              },
            }}
          />
        </IconButton>

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
              borderRadius: "12px",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
              padding: "8px 16px",
              minWidth: "200px",
            },
          }}
        >
          {/* User Info Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              padding: "8px 0",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Tara Finance
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#666", fontSize: "14px" }}
            >
              {user.email}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />

          {/* Menu Items */}
          {/* <MenuItem
            onClick={() => router.push("/profile")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "16px",
              color: "#333",
              "&:hover": { backgroundColor: "#f1f1f1" },
            }}
          >
            <SettingsIcon fontSize="small" />
            Profile Settings
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/support")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "16px",
              color: "#333",
              "&:hover": { backgroundColor: "#f1f1f1" },
            }}
          >
            <ExitToAppIcon fontSize="small" />
            Support
          </MenuItem> */}
          <Divider sx={{ my: 1 }} />
          <MenuItem
            onClick={handleLogout}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "16px",
              color: "#e53935",
              "&:hover": { backgroundColor: "#f8d7da" },
            }}
          >
            <ExitToAppIcon fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

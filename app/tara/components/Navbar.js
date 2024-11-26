"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import for current path
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import Link from "next/link";
import {
  Avatar,
  Container,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

export default function Navbar() {
  const pathname = usePathname(); // Get the current route
  const router = useRouter();

  const [openSubmenu, setOpenSubmenu] = useState({});
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const settings = [
    {
      route: "/profile",
      title: "Profile",
    },
    {
      route: "/login",
      title: "Logout",
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleMenuItemClick = (route) => {
    router.push(route); // Navigate based on route

    if (isMobile) {
      toggleDrawer(); // Close the drawer on mobile after navigation
    }

    handleCloseUserMenu(); // Close the user menu after navigation
  };
  const NAVIGATION = [
    {
      route: "/tara",
      title: "Home",
      icon: <DashboardIcon />,
    },
    {
      route: "/tara/gst",
      title: "GST",
      icon: <ShoppingCartIcon />,
    },
    {
      segment: "reports",
      title: "Tax Services",
      icon: <BarChartIcon />,
      children: [
        {
          route: "/tara/tds",
          title: "TDS",
          icon: <DescriptionIcon />,
        },
      ],
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                // display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TARA
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.route} // Unique key for each menu item
                    onClick={() => handleMenuItemClick(setting.route)} // Navigate when clicked
                  >
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isMobile ? drawerOpen : true} // Always open on desktop
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box role="presentation" sx={{ overflow: "auto" }}>
          <List>
            {NAVIGATION.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;

              // Check if the parent itself is active
              const isParentActive = pathname === item.route;

              // Check if any child is active
              const isChildActive =
                hasChildren &&
                item.children.some((child) => pathname === child.route);

              const isActive = isParentActive; // Only highlight the parent when its route matches

              return (
                <React.Fragment key={index}>
                  <ListItem
                    disablePadding
                    onClick={() => {
                      if (hasChildren) {
                        toggleSubmenu(index);
                      } else {
                        handleMenuItemClick(item.route); // Handle click and close drawer
                      }
                    }}
                  >
                    <ListItemButton
                      onClick={() => hasChildren && toggleSubmenu(index)}
                      component={!hasChildren ? Link : "div"}
                      href={!hasChildren ? item.route : undefined}
                      sx={{
                        backgroundColor: isActive ? "#1981691a" : "inherit",
                        color: isActive ? "white" : "inherit",
                      }}
                    >
                      {item.icon && <Box sx={{ mr: 2 }}>{item.icon}</Box>}
                      <ListItemText primary={item.title} />
                      {hasChildren &&
                        (openSubmenu[index] ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                  </ListItem>
                  {hasChildren && (
                    <Collapse
                      in={openSubmenu[index]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.children.map((child, childIndex) => (
                          <ListItem
                            key={`${index}-${childIndex}`}
                            disablePadding
                          >
                            <ListItemButton
                              component={Link}
                              href={child.route}
                              sx={{
                                pl: 4,
                                backgroundColor:
                                  pathname === child.route
                                    ? "#1981691a"
                                    : "inherit",
                                color:
                                  pathname === child.route
                                    ? "white"
                                    : "inherit",
                              }}
                            >
                              {child.icon && (
                                <Box sx={{ mr: 2 }}>{child.icon}</Box>
                              )}
                              <ListItemText primary={child.title} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

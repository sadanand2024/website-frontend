"use client";

import { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Avatar,
  Collapse,
  MenuItem,
  Button,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LockIcon from "@mui/icons-material/Lock";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const drawerWidth = 240;

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
        icon: <PeopleIcon />,
      },
    ],
  },
];

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

export default function ResponsiveSidebar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState({}); // For nested items (like Tax Services)
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null); // Avatar dropdown menu state
  const openMenu = Boolean(anchorEl);
  const [selectedRoute, setSelectedRoute] = useState("");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (segment) => {
    setOpen((prevState) => ({
      ...prevState,
      [segment]: !prevState[segment],
    }));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleNavItemClick = (route) => {
    setSelectedRoute(route); // Set the selected route
    router.push(route); // Navigate to the selected route
  };
  const handleLogout = () => {
    // Add your logout logic here
    router.push("/login");
  };

  const renderNavItems = (navItems) => {
    return navItems.map((item, index) => (
      <div key={index}>
        <ListItem
          button
          onClick={
            item.children
              ? () => handleClick(item.segment)
              : () => handleNavItemClick(item.route) // Use handleNavItemClick here
          }
          sx={{
            backgroundColor:
              selectedRoute === item.route ? "#86A8A8" : "transparent", // Highlight selected item
            "&:hover": {
              backgroundColor:
                selectedRoute === item.route
                  ? "rgba(0, 0, 0, 0.08)"
                  : "rgba(0, 0, 0, 0.12)", // Hover effect
              cursor: "pointer",
            },
            borderRadius: "8px", // Rounded corners
            padding: "2px 10px", // Less padding
            margin: "2px 0", // Reduced margin for compactness
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 28, // Reduce icon size
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            sx={{
              fontSize: "0.75rem", // Smaller font size
              fontWeight: 500, // Slightly bolder text
              paddingLeft: "8px", // Less padding on the left
            }}
          />
          {item.children && (
            <IconButton
              sx={{
                minWidth: "auto", // Reduce size of the button
                padding: "4px", // Reduce padding on the button
              }}
            >
              <ExpandMoreIcon
                sx={{
                  transform: open[item.segment]
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s",
                  fontSize: "1rem", // Smaller icon
                }}
              />
            </IconButton>
          )}
        </ListItem>
        {item.children && (
          <Collapse in={open[item.segment]} timeout="auto" unmountOnExit>
            <List sx={{ pl: 3 }}>
              {item.children.map((child, idx) => (
                <ListItem
                  button
                  key={idx}
                  onClick={() => handleNavItemClick(child.route)} // Handle click for child items
                  sx={{
                    backgroundColor:
                      selectedRoute === item.route ? "#86A8A8" : "transparent", // Highlight selected item
                    "&:hover": {
                      backgroundColor:
                        selectedRoute === item.route
                          ? "rgba(0, 0, 0, 0.08)"
                          : "rgba(0, 0, 0, 0.12)", // Hover effect
                      cursor: "pointer",
                    },
                    borderRadius: "8px", // Rounded corners
                    padding: "2px 10px", // Less padding
                    margin: "2px 0", // Reduced margin for compactness
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 28, // Smaller icon for child items
                    }}
                  >
                    {child.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={child.title}
                    sx={{
                      fontSize: "0.75rem", // Smaller font size for child items
                      fontWeight: 500, // Slightly bolder text
                      paddingLeft: "8px", // Less padding on the left
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </div>
    ));
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      {/* Logo and Team */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Link
          href="/tara"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image src={"img/L2.png"} width={50} height={50} alt="logo" />

          <Typography variant="h6" noWrap>
            Tara
          </Typography>
        </Link>
      </Box>

      {/* Navigation Links */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Overview
      </Typography>
      <List>{renderNavItems(NAVIGATION)}</List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          border: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <h6>Dashboard</h6>
          <Box sx={{ flexGrow: 1 }} />

          <Avatar alt="User" onClick={handleOpenUserMenu} />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Avatar Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {settings.map((setting, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              if (setting.route === "/login") {
                handleLogout();
              } else {
                router.push(setting.route);
              }
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <Avatar alt="User" />
            </ListItemIcon>
            <ListItemText primary={setting.title} />
          </MenuItem>
        ))}
      </Menu>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar /> {/* Add spacing for AppBar */}
        {children}
      </Box>
    </Box>
  );
}

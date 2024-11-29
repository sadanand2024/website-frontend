"use client";
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";

export default function Sidebar({ open, toggleDrawer, isSmallScreen }) {
  const [openNested, setOpenNested] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("");
  const router = useRouter();

  const toggleNestedMenu = () => setOpenNested(!openNested);

  const handleNavigation = (path) => {
    setSelectedRoute(path);
    router.push(path);
    if (isSmallScreen) {
      toggleDrawer(); // Close the drawer when in responsive mode
    }
  };

  const navigationItems = [
    {
      title: "Home",
      icon: <HomeIcon />,
      path: "/tara",
    },
    {
      title: "GST",
      icon: <WorkIcon />,
      path: "/tara/gst",
    },
    {
      title: "Analytics",
      icon: <BusinessIcon />,
      nestedItems: [
        {
          title: "TDS",
          icon: <DashboardIcon />,
          path: "/tara/tds",
        },
      ],
    },
  ];

  return (
    <Drawer
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          paddingTop: 2,
          marginTop: "64px",
          backgroundColor: "#ffffff",
          boxShadow: "2px 0px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 8px 8px 0", // Rounded corners for a premium feel
        },
      }}
      variant={isSmallScreen ? "temporary" : "persistent"}
      anchor="left"
      open={open || !isSmallScreen}
      onClose={toggleDrawer}
    >
      <List>
        {navigationItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              onClick={() =>
                item.nestedItems
                  ? toggleNestedMenu()
                  : handleNavigation(item.path)
              }
              sx={{
                backgroundColor:
                  selectedRoute === item.path
                    ? "rgb(160, 205, 205)"
                    : "inherit",
                borderRadius: 2,
                margin: "8px 16px",
                "&:hover": {
                  backgroundColor: "rgba(160, 205, 205, 0.7)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: 14, // Reduced font size
                  fontWeight: selectedRoute === item.path ? "bold" : "normal",
                  color: selectedRoute === item.path ? "#333" : "#666",
                }}
              />
              {item.nestedItems &&
                (openNested ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {item.nestedItems && (
              <Collapse in={openNested} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.nestedItems.map((nestedItem, nestedIndex) => (
                    <ListItemButton
                      key={nestedIndex}
                      onClick={() => handleNavigation(nestedItem.path)}
                      sx={{
                        pl: 6,
                        backgroundColor:
                          selectedRoute === nestedItem.path
                            ? "rgb(160, 205, 205)"
                            : "inherit",
                        "&:hover": {
                          backgroundColor: "rgba(160, 205, 205, 0.5)",
                        },
                        borderRadius: 1,
                        margin: "4px 16px",
                      }}
                    >
                      <ListItemIcon sx={{ color: "black" }}>
                        {nestedItem.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={nestedItem.title}
                        primaryTypographyProps={{
                          fontSize: 13, // Reduced font size for nested items
                          fontWeight:
                            selectedRoute === nestedItem.path
                              ? "bold"
                              : "normal",
                          color:
                            selectedRoute === nestedItem.path ? "#333" : "#666",
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "#ddd", margin: "16px 0" }} />
    </Drawer>
  );
}

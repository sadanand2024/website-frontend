"use client";
import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";

const sidebarItems = [
  { text: "Home", href: "/tara" },
  { text: "GST", href: "/tara/gst" },
  { text: "TDS", href: "/tara/tds" },
  { text: "Compliance Manager", href: "/tara/compliance-manager" },
];

const LeftSidebar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  const list = () => (
    <List>
      {sidebarItems.map((item, index) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton component={Link} href={item.href}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      {isMobile ? (
        <>
          {/* <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
            {list()}
          </Drawer>
          <button
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              zIndex: 999,
            }}
            onClick={() => toggleDrawer(true)}
          >
            Menu
          </button> */}
          <div
            style={{
              position: "fixed",
              width: "200px",
              height: "100%",
              backgroundColor: "#f4f4f4",
              paddingTop: "20px",
            }}
          >
            {list()}
          </div>
        </>
      ) : (
        <div
          style={{
            position: "fixed",
            width: "200px",
            height: "100%",
            backgroundColor: "#f4f4f4",
            paddingTop: "20px",
          }}
        >
          {list()}
        </div>
      )}
    </>
  );
};

export default LeftSidebar;

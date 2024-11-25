"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Dialog, Tabs, Tab } from "@mui/material";
import { useRouter } from "next/navigation";

const MovingCardTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Track selected tab index
  const [selectedType, setSelectedType] = useState(null); // Selected type for navigation
  const [dialogOpen, setDialogOpen] = useState(true); // Dialog open state
  const router = useRouter(); // Next.js router

  const handleTabChange = (event, newValue) => {
    setSelectedIndex(newValue); // Set the selected tab index
  };

  const handleNext = () => {
    if (selectedType) {
      sessionStorage.setItem("userType", selectedType);
      setDialogOpen(false);
      router.push(`/tara/registrationtype/${selectedType}`);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "16px",
        },
      }}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <h4 style={{ mb: 2, textAlign: "center" }}>
        Welcome aboard, let's get started!
      </h4>
      <Typography
        variant="body1"
        sx={{ mb: 4, textAlign: "center", color: "#666" }}
        id="dialog-description"
      >
        Pick your account type to proceed.
      </Typography>

      <Tabs
        value={selectedIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{
          p: 0.5,
          position: "relative",
          transition: "transform 0.1s ease-in-out",
          "& .MuiTabs-indicator": {
            backgroundColor: "#d7d9db",
          },
          backgroundColor: "#d7d9db",
          borderRadius: 2,
          display: "flex",
          flexWrap: "wrap", // Allow tabs to wrap when screen shrinks
          justifyContent: "center", // Center-align content
        }}
      >
        <Tab
          label={
            <h6 style={{ margin: 0, textAlign: "center" }}>
              Individual or Corporate Entity
            </h6>
          }
          sx={{
            padding: "30px 20px", // Reduce padding for smaller screens
            minWidth: "150px", // Set a minimum width
            flex: "1 1 auto", // Flex-grow for responsiveness
            borderRadius: 2,
            boxShadow:
              selectedIndex === 0 ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none",
            backgroundColor: selectedIndex === 0 ? "white" : "#d7d9db",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => setSelectedType("individual")}
        />
        <Tab
          label={
            <h6 style={{ margin: 0, textAlign: "center" }}>
              Chartered Accountant Practitioner
            </h6>
          }
          sx={{
            padding: "30px 20px", // Reduce padding for smaller screens
            minWidth: "150px", // Set a minimum width
            flex: "1 1 auto", // Flex-grow for responsiveness
            borderRadius: 2,
            boxShadow:
              selectedIndex === 1 ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none",
            backgroundColor: selectedIndex === 1 ? "white" : "#d7d9db",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => setSelectedType("firm")}
        />
      </Tabs>

      {/* Next Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 5 }}
          onClick={handleNext}
          disabled={!selectedType} // Disable the button if no type is selected
        >
          Next
        </Button>
      </Box>
    </Dialog>
  );
};

export default MovingCardTabs;

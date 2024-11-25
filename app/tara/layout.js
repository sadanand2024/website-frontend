"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";

export default function DashboardLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    // Check for auth token to determine if user is authenticated
    const token = localStorage.getItem("authToken");
    if (true) {
      setIsAuthenticated(true);
    } else {
      // Redirect to login if not authenticated
      window.location.href = "/login";
    }
  }, []);

  // Handle form submission logic
  const handleFormSubmit = () => {
    localStorage.setItem("formSubmitted", "true"); // Mark the form as submitted
    setIsFormSubmitted(true); // Hide modal
    setShowModal(false); // Close the modal
  };
  console.log(isAuthenticated);
  return (
    <div>
      {isAuthenticated && <Navbar />}

      {isAuthenticated && <LeftSidebar />}

      <main style={{ marginLeft: isAuthenticated ? "200px" : "0" }}>
        {children}
      </main>
    </div>
  );
}

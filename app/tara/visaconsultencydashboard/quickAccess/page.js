"use client";
import { useSearchParams } from "next/navigation";
import {
  Box,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import Factory from "@/app/utils/Factory";
import TaskList from "../componnets/TaskList";
const FormPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // Retrieve 'name' from query params
  const title = searchParams.get("title"); // Retrieve 'title' from query params
  const [mappingData, setMappingData] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [editedService, setEditedService] = useState({}); // Track form data
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const destinationCountries = [
    "France",
    "United States",
    "Australia",
    "Canada",
    "Germany",
  ];

  const handleEditClick = (service) => {
    console.log(service);
    setEditedService({ ...service });
    setDialogOpen(true);
  };

  const handleInputChange = (name, val) => {
    console.log("Field Name:", name, "Value:", val);
    setEditedService((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let putData = {
      visa_application: {
        user: editedService.user,
        passport_number: editedService.passport_number,
        purpose: editedService.purpose,
        visa_type: editedService.visa_type,
        destination_country: editedService.destination_country,
      },
      service: {
        id: editedService.service_id,
        service_type_id: editedService.service_type,
        status: editedService.status,
        comments: editedService.comments,
        quantity: editedService.quantity,
      },
    };
    console.log(editedService);
    console.log(putData);
    const url = `/user_management/service-details/${editedService.service_id}/`;
    const { res, error } = await Factory("put", url, putData);
    if (res.status_cd === 0) {
      getClientsData();
      setDialogOpen(false);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (service) => {
    const url = `/user_management/service-details/${service.service_id}/`;
    const { res, error } = await Factory("delete", url, {});
    if (res.status === 204) {
      getClientsData(); // Load client list on component mount
      setDeleteDialogOpen(false);
    } else {
      alert("Failed to delete the service. Please try again.");
    }
  };
  const getClientsData = async () => {
    const url = "/user_management/visa-clients/dashboard-status/";
    const { res, error } = await Factory("get", url, {});

    if (res.status_cd === 0) {
      title === "Pending"
        ? setMappingData(res.data.pending_data)
        : title === "In - Progress"
          ? setMappingData(res.data.in_progress_data)
          : setMappingData(res.data.completed_data);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    getClientsData(); // Load client list on component mount
  }, []);
  console.log(mappingData);
  return (
    <Box style={{ marginTop: "20px" }}>
      <h5 style={{ marginBottom: 20, textAlign: "center" }}>{title}</h5>
      <TaskList
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        taskList={mappingData}
        handleDelete={handleDelete}
        handleEditClick={handleEditClick}
        handleSubmit={handleSubmit}
        editedService={editedService}
        setEditedService={setEditedService}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleInputChange={handleInputChange}
        destinationCountries={destinationCountries}
      />
    </Box>
  );
};

export default FormPage;

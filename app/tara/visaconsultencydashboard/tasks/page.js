"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Typography,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "@/components/CustomInput";
import CustomAutocomplete from "@/components/CustomAutocomplete";
import Factory from "@/app/utils/Factory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskList from "../componnets/TaskList";
let visaTypes = ["Student Visa", "Visit", "Work Visa", "Business"];

const destinationCountries = [
  "France",
  "United States",
  "Australia",
  "Canada",
  "Germany",
];

const FormPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [editedService, setEditedService] = useState({}); // Track form data
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
        id: editedService.id,
        service_type_id: editedService.service_type,
        status: editedService.status,
        comments: editedService.comments,
        quantity: editedService.quantity,
      },
    };
    const url = `/user_management/service-details/${editedService.id}/`;
    try {
      const { res, error } = await Factory("put", url, putData);
      console.log(res);
      if (res.status_cd === 0) {
        getTasksList();
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const getTasksList = async () => {
    const url = "/user_management/visa-applicants/all-tasks-data/";
    try {
      const { res, error } = await Factory("get", url, {});

      if (res.status_cd === 0) {
        setDialogOpen(false);
        setTaskList(res.data);
      }
    } catch (error) {
      // Catch any errors during the request
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const handleDelete = async (service) => {
    const url = `/user_management/service-details/${service.id}/`;
    const { res, error } = await Factory("delete", url, {});
    if (res.status === 204) {
      getTasksList();
      setDeleteDialogOpen(false);
    } else {
      alert("Failed to delete the service. Please try again.");
    }
  };
  useEffect(() => {
    getTasksList(); // Load client list on component mount
  }, []);
  console.log(taskList);
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
          }}
        >
          Tasks List
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <TaskList
          from="tasklist"
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          taskList={taskList}
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
      </Grid>
    </Grid>
  );
};

export default FormPage;

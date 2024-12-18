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
import AddTask from "../componnets/AddTask";
import { useAuth } from "@/app/context/AuthContext";

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
  const { user, tokens, logout } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [taskList, setTaskList] = useState([]);
  const [editedService, setEditedService] = useState({}); // Track form data
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [commentMap, setCommentMap] = useState({});
  const [ServicesCards, setServicesCards] = useState([]);

  const handleEditClick = (service) => {
    setEditedService({ ...service });
    setEditDialogOpen(true);
  };
  const handleServiceSelection = (serviceName, service) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(serviceName)) {
        return prevSelectedServices.filter(
          (service) => service !== serviceName
        );
      } else {
        return [...prevSelectedServices, serviceName];
      }
    });
  };

  // Handle quantity change (increment or decrement)
  const handleQuantityChange = (service, operation) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [service]: (prevQuantityMap[service] || 0) + operation,
    }));
  };

  // Handle comment change
  const handleCommentChange = (service, comment) => {
    setCommentMap((prevCommentMap) => ({
      ...prevCommentMap,
      [service]: comment,
    }));
  };
  const servicesSubmit = async () => {
    let services = [
      {
        id: 1,
        service_name: "ITR",
      },
      {
        id: 2,
        service_name: "Networth",
      },
      {
        id: 3,
        service_name: "Business Proof",
      },
      {
        id: 4,
        service_name: "Loans",
      },
      {
        id: 5,
        service_name: "Visa Fund",
      },
      {
        id: 6,
        service_name: "Forex Payments",
      },
      {
        id: 7,
        service_name: "Insurance",
      },
      {
        id: 8,
        service_name: "Travel Booking",
      },
      {
        id: 9,
        service_name: "Visa Slot",
      },
      {
        id: 10,
        service_name: "Passport Application",
      },
    ];
    const serviceData = selectedServices.map((service) => {
      const serviceObj = services.find((obj) => obj.service_name === service);

      return {
        id: serviceObj ? serviceObj.id : null,
        service: service,
        quantity: quantityMap[service] || 0,
        comments: commentMap[service] || "",
      };
    });

    const filteredServices = serviceData.map((service) => ({
      quantity: service.quantity,
      comments: service.comments,
      service_type: service.id,
    }));
    // console.log(filteredServices);
    // console.log(serviceData);
    // console.log(visadetails);
    console.log(taskList);
    let postData = {
      user_id: user.id,
      passport_number:
        typeof taskList === "object"
          ? taskList.passport_number
          : taskList[taskList.length - 1]?.passport_number,

      purpose:
        typeof taskList === "object"
          ? taskList.purpose
          : taskList[taskList.length - 1]?.purpose,
      visa_type:
        typeof taskList === "object"
          ? taskList.visa_type
          : taskList[taskList.length - 1]?.visa_type,
      destination_country:
        typeof taskList === "object"
          ? taskList.destination_country
          : taskList[taskList.length - 1]?.destination_country,
      services: filteredServices,
    };
    console.log(postData);

    const url = "/user_management/visa-servicetasks/";

    const { res, error } = await Factory("post", url, postData);
    if (res.status_cd === 0) {
      getTasksList();
      setSelectedServices([]);
      setAddTaskDialogOpen(false);
      // setShowSuccessMessage(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleInputChange = (name, val) => {
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
      if (res.status_cd === 0) {
        getTasksList();
      }
    } catch (error) {
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

  const getServicesList = async () => {
    const url = "/user_management/services/";
    try {
      const { res, error } = await Factory("get", url, {});
      if (res.status_cd === 0) {
        setServicesCards(res.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const getTasksList = async () => {
    const url = "/user_management/visa-applicants/all-tasks-data/";
    const { res, error } = await Factory("get", url, {});

    if (res.status_cd === 0) {
      setEditDialogOpen(false);
      setTaskList(res.data);
    } else {
      // Catch any errors during the request
      alert("Something went wrong. Please try again.");
    }
  };
  useEffect(() => {
    getTasksList();
    getServicesList();
  }, []);
  console.log(taskList);
  return (
    <div style={{ padding: "20px" }}>
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={6} style={{ textAlign: "left" }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Tasks List
          </Typography>
        </Grid>
        {user.user_role === "Individual_User" &&
          user.user_type === "ServiceProvider" && (
            <Grid item xs={12} sm={6} md={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={() => setAddTaskDialogOpen(true)}
                >
                  Add Task
                </Button>
              </Box>
            </Grid>
          )}
      </Grid>

      <TaskList
        from="tasklist"
        dialogOpen={editDialogOpen}
        setDialogOpen={setEditDialogOpen}
        taskList={Array.isArray(taskList) ? taskList : []}
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
      <AddTask
        addTaskDialogOpen={addTaskDialogOpen}
        setAddTaskDialogOpen={setAddTaskDialogOpen}
        handleQuantityChange={handleQuantityChange}
        handleCommentChange={handleCommentChange}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        ServicesCards={ServicesCards}
        setServicesCards={setServicesCards}
        quantityMap={quantityMap}
        commentMap={commentMap}
        setQuantityMap={setQuantityMap}
        setCommentMap={setCommentMap}
        servicesSubmit={servicesSubmit}
      />
    </div>
  );
};

export default FormPage;

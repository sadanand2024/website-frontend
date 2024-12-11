"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Factory from "@/app/utils/Factory"; // Import custom Factory function for API calls
import CustomInput from "@/components/CustomInput"; // Import custom input component

// MUI components
import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Radio,
  Card,
  RadioGroup,
  FormControlLabel,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Autocomplete,
  Checkbox,
  TextField,
} from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";

const FormPage = ({ selectedClientData, setShowSuccessMessage }) => {
  const searchParams = useSearchParams();
  const [servicelistDialogue, setServicelistDialogue] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [newSelectedOptions, setNewSelectedOptions] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [commentMap, setCommentMap] = useState({});
  const [ServicesCards, setServicesCards] = useState([]);
  // Handle service selection
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

    let newOptions = [...newSelectedOptions];
    newOptions.push(service);
    setNewSelectedOptions(newOptions); ///
    // setNewSelectedOptions((prevSelectedServices) => {
    //   if (prevSelectedServices.includes(serviceName)) {
    //     return prevSelectedServices.filter(
    //       (service) => service !== serviceName
    //     );
    //   } else {
    //     return [...prevSelectedServices, serviceName];
    //   }
    // });
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

  // Submit selected services
  const servicesSubmit = async () => {
    console.log(newSelectedOptions);
    const serviceData = selectedServices.map((service) => ({
      service,
      quantity: quantityMap[service] || 0,
      comments: commentMap[service] || "",
    }));

    console.log("Final Selected Services:", serviceData);

    // Remove the services from serviceData that are present in newSelectedOptions based on service_name
    const filteredServices = serviceData
      .filter((service) =>
        newSelectedOptions.some(
          (option) => option.service_name === service.service
        )
      )
      .map((service) => ({
        service_type: service.service, // Rename the key to service_type
        quantity: service.quantity,
        comments: service.comments,
      }));
    // Prepare the post data with filtered services (remaining services)
    const postData = {
      visaapplication_id: selectedClientData.id,
      services: filteredServices, // Only the remaining services after filtering
    };

    console.log(postData);
    // setServicelistDialogue(false);
    // setShowSuccessMessage(true);

    const url = "/user_management/visa-applicants/";

    try {
      const { res, error } = await Factory("post", url, postData);
      cosnoile.log(res);
      if (res.status_cd === 0) {
        // setServicesCards(res.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Fetch services list from API
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

  // Fetch and update services list on component mount
  useEffect(() => {
    getServicesList();
  }, []);

  // Sync selected services, quantity, and comments with selectedClientData
  useEffect(() => {
    if (selectedClientData.services.length > 0) {
      const selectedServiceTypes = selectedClientData.services.map(
        (client) => client.service_type
      );

      // Pre-select services based on service_type matching in ServicesCards
      const preSelectedServices = ServicesCards.filter((service) =>
        selectedServiceTypes.includes(service.id)
      ).map((service) => service.service_name);

      setSelectedServices(preSelectedServices);

      // Set quantity and comments for the pre-selected services
      const newQuantityMap = {};
      const newCommentMap = {};
      selectedClientData.services.forEach((service) => {
        const serviceInCard = ServicesCards.find(
          (cardService) => cardService.id === service.service_type
        );
        if (serviceInCard) {
          newQuantityMap[serviceInCard.service_name] = service.quantity;
          newCommentMap[serviceInCard.service_name] = service.comments;
        }
      });

      setQuantityMap(newQuantityMap);
      setCommentMap(newCommentMap);
    }
  }, [selectedClientData, ServicesCards]);

  return (
    <>
      <Box style={{ padding: "20px", textAlign: "center", marginTop: 20 }}>
        <Typography variant="h5">Select Services</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {ServicesCards.map((service, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  borderRadius: "10px",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                  width: "100%",
                  margin: "1px",
                }}
                onClick={() => {
                  if (
                    !selectedClientData.services.some(
                      (clientService) =>
                        clientService.service_name === service.service_name
                    )
                  ) {
                    handleServiceSelection(service.service_name, service); // Toggle on card click
                  }
                }}
                disabled={selectedClientData.services.some(
                  (clientService) =>
                    clientService.service_name === service.service_name
                )} // Disable entire card
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label={service.service_name}
                    disabled={selectedClientData.services.some(
                      (clientService) =>
                        clientService.service_name === service.service_name
                    )} // Disable radio if already selected in client data
                    checked={selectedServices.includes(service.service_name)}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ marginTop: "30px" }}>
        <Button
          variant="contained"
          type="button"
          onClick={() => setServicelistDialogue(true)}
          sx={{
            padding: "10px 30px",
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          Next
        </Button>
      </Box>

      <Dialog
        open={servicelistDialogue}
        onClose={() => setServicelistDialogue(false)}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: "24px",
          },
        }}
        sx={{
          "& .MuiDialogTitle-root": {
            textAlign: "center",
            paddingBottom: "16px",
          },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Service List</Typography>
            <Autocomplete
              multiple
              renderTags={() => null}
              size="small"
              sx={{ minWidth: 250, maxWidth: 250 }}
              id="service-checkbox"
              options={ServicesCards}
              value={ServicesCards.filter((service) =>
                selectedServices.includes(service.service_name)
              )}
              onChange={(event, newValue, value2, value3) => {
                let newOptions = [...newSelectedOptions];
                if (value2 === "removeOption") {
                  newOptions = newOptions.filter(
                    (item) => item.id !== value3.option.id
                  );
                } else newOptions.push(value3.option);
                console.log(newOptions);
                setNewSelectedOptions(newOptions);
                setSelectedServices(newValue.map((item) => item.service_name));
              }}
              getOptionLabel={(option) => option.service_name}
              getOptionDisabled={(option) =>
                selectedClientData.services.some(
                  (item) => item.service_type === option.id
                )
              }
              renderInput={(params) => (
                <TextField {...params} label="Update Services" />
              )}
              isOptionEqualToValue={(option, value) =>
                option.service_name === value.service_name
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} />
                  {option.service_name}
                </li>
              )}
              disableCloseOnSelect
            />
          </Box>
        </DialogTitle>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: "8px 0",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ borderRadius: "12px", overflow: "hidden" }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="medium"
              aria-label="service table"
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "rgb(13, 81, 82)",
                    "& th": {
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <TableCell>Services</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Comments / Instructions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedServices.map((service, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:hover": { backgroundColor: "#f5f5f5" },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{service}</TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{ padding: "4px 8px", minWidth: "30px", mr: 2 }}
                        variant="outlined"
                        onClick={() => handleQuantityChange(service, -1)}
                      >
                        -
                      </Button>
                      {quantityMap[service] || 0}
                      <Button
                        sx={{ padding: "4px 8px", minWidth: "30px", ml: 2 }}
                        variant="outlined"
                        onClick={() => handleQuantityChange(service, 1)}
                      >
                        +
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <CustomInput
                        value={commentMap[service] || ""}
                        onChange={(e) =>
                          handleCommentChange(service, e.target.value)
                        }
                        multiline
                        rows={2}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <DialogActions sx={{ justifyContent: "center", paddingTop: "16px" }}>
            <Button
              variant="contained"
              type="button"
              sx={{ padding: "8px 32px", textTransform: "none" }}
              onClick={servicesSubmit}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default FormPage;

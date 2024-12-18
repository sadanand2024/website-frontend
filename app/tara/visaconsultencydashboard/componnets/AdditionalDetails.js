"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Factory from "@/app/utils/Factory";
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
import CustomInput from "@/components/CustomInput";
const FormPage = ({
  visadetails,
  selectedClientData,
  selectedTitle,
  setShowSuccessMessage,
  service_id,
}) => {
  const searchParams = useSearchParams();
  let name = searchParams.get("name"); // Retrieve 'name' from query params
  const [serviceListDialog, setServiceListDialog] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    setSelectedServices([
      {
        id: service_id,
        servicename: selectedTitle,
        quantity: 0,
        comments: "",
      },
    ]);
  }, []);

  const handleQuantityChange = (service, change) => {
    setSelectedServices((prevServices) =>
      prevServices.map((s) =>
        s.servicename === service.servicename
          ? { ...s, quantity: Math.max(0, s.quantity + change) }
          : s
      )
    );
  };

  const handleCommentChange = (service, newComment) => {
    setSelectedServices((prevServices) =>
      prevServices.map((s) =>
        s.servicename === service.servicename
          ? { ...s, comments: newComment }
          : s
      )
    );
  };

  const submitDetails = async () => {
    const filteredServices = selectedServices.map((service) => ({
      quantity: service.quantity,
      comments: service.comments,
      service_type: service.id,
    }));
    let postData = {
      user_id: selectedClientData.user,
      passport_number: visadetails.passport_number,
      purpose: visadetails.purpose,
      visa_type: visadetails.visa_type,
      destination_country: visadetails.destination_country,
      services: filteredServices,
    };

    const url = "/user_management/visa-servicetasks/";
    const { res, error } = await Factory("post", url, postData);
    if (res.status_cd === 0) {
      setShowSuccessMessage(true);
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <Box style={{ padding: "20px", textAlign: "center", marginTop: 20 }}>
        <h3>Additional Details</h3>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "12px", overflow: "hidden" }}
        >
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="service details table"
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
                  <TableCell align="center">{service.servicename}</TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{ padding: "4px 8px", minWidth: "30px", mr: 2 }}
                      variant="outlined"
                      onClick={() => handleQuantityChange(service, -1)}
                      disabled={service.quantity <= 0}
                    >
                      -
                    </Button>
                    {service.quantity || 0}
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
                      value={service.comments || ""}
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
      </Box>

      <Box sx={{ marginTop: "30px" }}>
        <Button
          variant="contained"
          onClick={submitDetails}
          sx={{
            padding: "10px 30px",
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default FormPage;

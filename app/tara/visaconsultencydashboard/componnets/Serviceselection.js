"use client";
import { useSearchParams } from "next/navigation";
import CustomInput from "@/components/CustomInput";
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
import { useState } from "react";

const FormPage = ({ setShowSuccessMessage }) => {
  const searchParams = useSearchParams();
  const [servicelistDialogue, setServicelistDialogue] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [commentMap, setCommentMap] = useState({});

  const ServicesCards = [
    { name: "ITR Filing", title: "ITR Services Request" },
    { name: "Networth Assessment", title: "Networth Certificate" },
    { name: "Business Proof", title: "Business Proof" },
    { name: "Loans", title: "Loan" },
    { name: "Visa Fund", title: "Visa Fund" },
    { name: "Forex Payment", title: "Forex Payment" },
    { name: "Insurance", title: "Insurance" },
    { name: "Travel Booking", title: "Travel Booking" },
    { name: "Visa Slot", title: "Visa Slot" },
    { name: "Passport Application", title: "Passport Application" },
  ];

  const handleServiceSelection = (serviceName) => {
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

  const handleQuantityChange = (service, operation) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [service]: (prevQuantityMap[service] || 0) + operation,
    }));
  };

  const handleCommentChange = (service, comment) => {
    setCommentMap((prevCommentMap) => ({
      ...prevCommentMap,
      [service]: comment,
    }));
  };

  const servicesSubmit = () => {
    const serviceData = selectedServices.map((service) => ({
      service,
      quantity: quantityMap[service] || 0,
      comments: commentMap[service] || "",
    }));
    console.log("Final Selected Services:", serviceData);
    setServicelistDialogue(false);
    setShowSuccessMessage(true);
  };

  return (
    <>
      <Box style={{ padding: "20px", textAlign: "center", marginTop: 20 }}>
        <h3>Select Services</h3>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {ServicesCards.map((card, idx) => (
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
                onClick={() => handleServiceSelection(card.name)}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label={card.name}
                    checked={selectedServices.includes(card.name)}
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
          onClick={() => setServicelistDialogue(true)}
          sx={{
            padding: "10px 30px",
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          Submit
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
            <h3>Service List</h3>
            <Autocomplete
              multiple
              renderTags={() => null}
              size="small"
              sx={{ minWidth: 250, maxWidth: 250 }}
              id="service-checkbox"
              options={ServicesCards}
              value={ServicesCards.filter((service) =>
                selectedServices.includes(service.name)
              )}
              onChange={(event, newValue) => {
                setSelectedServices(newValue.map((item) => item.name));
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Update Services" />
              )}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} />
                  {option.name}
                </li>
              )}
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
              aria-label="a dense table"
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
              sx={{
                padding: "8px 32px",
                textTransform: "none",
              }}
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

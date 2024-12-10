"use client";
import { useSearchParams } from "next/navigation";
import {
  Typography,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
const FormPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // Retrieve 'name' from query params
  const title = searchParams.get("title"); // Retrieve 'title' from query params
  const router = useRouter();
  const dummyData = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      mobileNumber: "8886115361",
      purpose: "Visa",
      visaType: "Tourist Visa",
      destinationCountry: "Australia",
      passportNumber: "A1234567",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      mobileNumber: "9876543221",
      purpose: "Visa",
      visaType: "Business Visa",
      destinationCountry: "United States",
      passportNumber: "B7654321",
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      mobileNumber: "912233445",
      purpose: "Visa",
      visaType: "Student Visa",
      destinationCountry: "Canada",
      passportNumber: "C9876543",
    },
    {
      firstName: "Bob",
      lastName: "Brown",
      email: "bob.brown@example.com",
      mobileNumber: "9230987654",
      purpose: "Visa",
      visaType: "Tourist Visa",
      destinationCountry: "New Zealand",
      passportNumber: "D1234567",
    },
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Typography
        variant="h6"
        style={{ marginBottom: 20, textAlign: "left", fontWeight: "bold" }}
      >
        Clients List
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
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
              <TableCell>First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Mobile Number</TableCell>
              <TableCell align="center">Purpose</TableCell>
              <TableCell align="center">Visa Type</TableCell>
              <TableCell align="center">Destination Country</TableCell>
              <TableCell align="center">Passport Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((client, index) => (
              <TableRow
                key={index}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(
                    `/tara/visaconsultencydashboard/status?clientname=${encodeURIComponent("Anand")}&title=${encodeURIComponent("Networth")}`
                  );
                }}
              >
                <TableCell>{client.firstName}</TableCell>
                <TableCell align="center">{client.lastName}</TableCell>
                <TableCell align="center">{client.email}</TableCell>
                <TableCell align="center">{client.mobileNumber}</TableCell>
                <TableCell align="center">{client.purpose}</TableCell>
                <TableCell align="center">{client.visaType}</TableCell>
                <TableCell align="center">
                  {client.destinationCountry}
                </TableCell>
                <TableCell align="center">{client.passportNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FormPage;

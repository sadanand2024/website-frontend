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

const FormPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // Retrieve 'name' from query params
  const title = searchParams.get("title"); // Retrieve 'title' from query params

  let PendingData = [
    {
      serviceId: 121,
      clientname: "Anand",
      serviceTitle: "ITR",
      date: "16-02-2021",
      status: "Pending",
      comments: "Under Process",
    },
    {
      serviceId: 253,
      clientname: "Krishna",
      serviceTitle: "Loans",
      date: "15-12-2021",
      status: "Pending",
      comments: "Under Process",
    },
    {
      serviceId: 322,
      clientname: "Sai",
      serviceTitle: "Networth",
      date: "22-02-2021",
      status: "Pending",
      comments: "Under Process",
    },
  ];

  let inprogressData = [
    {
      serviceId: 121,
      clientname: "Anand",
      serviceTitle: "ITR",
      date: "16-02-2021",
      status: "In - Progress",
      comments: "Processing",
    },
    {
      serviceId: 253,
      clientname: "Krishna",
      serviceTitle: "Loans",
      date: "15-12-2021",
      status: "In - Progress",
      comments: "Processing",
    },
    {
      serviceId: 322,
      clientname: "Sai",
      serviceTitle: "Networth",
      date: "22-02-2021",
      status: "In - Progress",
      comments: "Processing",
    },
  ];

  let completedData = [
    {
      serviceId: 121,
      clientname: "Anand",
      serviceTitle: "ITR",
      date: "16-02-2021",
      status: "Success",
      comments: "Done",
    },
    {
      serviceId: 253,
      clientname: "Krishna",
      serviceTitle: "Loans",
      date: "15-12-2021",
      status: "Success",
      comments: "Done",
    },
    {
      serviceId: 322,
      clientname: "Sai",
      serviceTitle: "Networth",
      date: "22-02-2021",
      status: "Success",
      comments: "Done",
    },
  ];

  let mappingData =
    title === "Pending"
      ? PendingData
      : title === "In - Progress"
        ? inprogressData
        : completedData;

  return (
    <Box style={{ marginTop: "20px" }}>
      <h5 style={{ marginBottom: 20, textAlign: "center" }}>{title}</h5>

      <Box sx={{ mt: 1 }}>
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
                  backgroundColor: "rgb(13, 81, 82)", // Add a light background for the header
                  "& th": {
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                  },
                }}
              >
                <TableCell>Task ID</TableCell>
                <TableCell align="center">Client Name</TableCell>
                <TableCell align="center">Service</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mappingData.map((row) => (
                <TableRow
                  key={row.serviceTitle}
                  sx={{
                    "&:hover": { backgroundColor: "#f5f5f5" }, // Hover effect for rows
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{row.serviceId}</TableCell>
                  <TableCell align="center">{row.clientname}</TableCell>
                  <TableCell align="center">{row.serviceTitle}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:
                        row.status === "Pending"
                          ? "orange"
                          : row.status === "In - Progress"
                            ? "#f58d42"
                            : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell align="center">{row.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default FormPage;

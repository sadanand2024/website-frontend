"use client";
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

const FormPage = ({ serviceHistoryData }) => {
  return (
    <Box style={{ marginTop: "20px" }}>
      <h3> Service History</h3>
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
                    //   fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                  },
                }}
              >
                <TableCell>Task ID</TableCell>
                <TableCell align="center">Service</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Coments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceHistoryData.map((row) => (
                <TableRow
                  key={row.serviceTitle}
                  sx={{
                    "&:hover": { backgroundColor: "#f5f5f5" }, // Hover effect for rows
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{row.serviceId}</TableCell>
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

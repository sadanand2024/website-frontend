import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Typography,
} from "@mui/material";

const styles = {
  active: {
    color: "rgb(13, 81, 82)",
    backgroundColor: "#b5efc6",
    fontWeight: 600,
    padding: 5,
    fontSize: "12px",
    borderRadius: "5px",
  },
  inActive: {
    color: "#B71D18",
    backgroundColor: "#fdcacd",
    fontWeight: 600,
    padding: 5,
    fontSize: "12px",
    borderRadius: "5px",
  },
};
function CustomTable({ heading, headers, rows, sx, ...props }) {
  return (
    <TableContainer component={Card} sx={sx}>
      <Table>
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} key={heading}>
              <Typography color="primary" sx={{ fontWeight: 600 }}>
                {heading}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: "#f2f2f2" }}>
            {headers.map((header, index) => (
              <TableCell key={index}>
                <Typography color="disabled" variant="body2">
                  {header}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {Object.values(rows).map((cell, i) => (
            <TableRow key={i}>
              {/* {row.map((cell, cellIndex) => ( */}
              <TableCell>
                <Typography variant="body2" color="black">
                  {cell.firmName}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="black">
                  {cell.creationDate}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="black">
                  {cell.partners}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="black">
                  {cell.status === 0 ? (
                    <span style={styles.active}>Active</span>
                  ) : (
                    <span style={styles.inActive}>In Active</span>
                  )}
                </Typography>
              </TableCell>
              <TableCell style={{ cursor: "pointer" }} key={"Action"}>
                <i
                  onClick={() => {
                    console.log("Clicked");
                  }}
                  class="fi fi-br-menu-dots-vertical"
                ></i>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;

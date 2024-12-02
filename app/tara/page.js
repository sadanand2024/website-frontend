"use client";
import * as React from "react";
import {
  Box,
  Paper,
  Grid,
  Container,
  Button,
  Card,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  IconButton,
  ListItemAvatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Chart from "react-apexcharts";
import mainCardBg from "../../public/img/MainCard.jpg";
import bg from "../../public/img/cardBg.jpg";
import Welcome from "../../public/img/Welcome.png";
import Image from "next/image";
import CustomTable from "../../components/CustomTable";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

const styles = {
  card: {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    // background:
    //   "radial-gradient(circle, rgba(255, 255, 255, 0.3) 20%, transparent 70%)",
    // backgroundImage:
    //   "",
    height: "200px",
    padding: "20px",
    color: "#333",
  },

  iconImage: {
    width: "40px",
    height: "40px",
    opacity: 0.8,
  },
  stats: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    height: "70%",
  },
  title: {
    fontSize: "15px",
    color: "#4F4F4F",
  },
  value: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  trend: {
    fontSize: "14px",
    color: "#2E7D32",
    display: "flex",
    justifyContent: "end",
  },
  trendIcon: {
    width: "16px",
    height: "16px",
    marginRight: "4px",
  },
  trendText: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  chart: {
    marginTop: "10px",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    minHeight: "280px",
    maxHeight: "280px",
    padding: "10px 20px",
    // "&:hover": {
    //   backgroundColor: theme.palette.primary.dark,
    // },
  },
  entryCard: {
    position: "relative",
    color: theme.palette.common.white,
    backgroundImage: `url(${mainCardBg.src})`,
    backgroundColor: theme.palette.primary.main,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "280px",
    maxHeight: "280px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow:
    "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.6)" /* Shadow effect */,
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(6, 44, 44, 0.8)",
      zIndex: 1,
    },
    "& > *": {
      position: "relative",
      zIndex: 2,
    },
  },
  grid: {
    minHeight: "200px",
    minHeight: "200px",
    boxShadow:
      "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)" /* Shadow effect */,
  },
}));

const chartData = [
  {
    name: "Monthly Revenue",
    count: "714",
    color: "#0d5152",
    icon: "fi fi-ts-revenue-alt",
    trend: "-2.8",
    gradient: "linear-gradient(135deg, #B5EFC6, #DFF8E1)",
    chartSeries: [
      {
        name: "Revenue",
        data: [50, 70, 90, 60, 130, 150, 170], // Dummy data for the line chart
      },
    ],
  },
  {
    name: "Total Transactions",
    count: "897",
    color: "#4f1c87",
    icon: "fi fi-ts-money-bill-transfer",
    trend: "-2.6",
    gradient: "linear-gradient(135deg, #D6BAF5, #F3DDFE)",
    chartSeries: [
      {
        name: "Transactions",
        data: [100, 150, 90, 200, 130, 180, 120], // Dummy data for the line chart
      },
    ],
  },
  {
    name: "Total Loans",
    count: "563",
    color: "#7c6214",
    icon: "fi fi-tr-loan",
    trend: "-3.8",
    gradient: "linear-gradient(135deg, #FEE6A0, #FDD58B)",
    chartSeries: [
      {
        name: "Loans",
        data: [30, 40, 50, 200, 180, 100, 90], // Dummy data for the line chart
      },
    ],
  },
  {
    name: "Enquiries Recieved",
    count: "651",
    color: "#7a151b",
    icon: "fi fi-tr-analyse",
    trend: "+8.4",
    gradient: "linear-gradient(135deg, #FDCACD, #FEE4D5)",
    chartSeries: [
      {
        name: "Enquiries",
        data: [70, 120, 50, 180, 90, 200, 40], // Dummy data for the line chart
      },
    ],
  },
];

const headers = ["Firm Name", "Creation Date", "No. of Partners", "Status", ""];

const rows = [
  {
    firmName: "John Doe",
    creationDate: "12 Nov 2018",
    partners: 28,
    status: 1,
  },
  {
    firmName: "Jane Smith",
    creationDate: "18 Dec 2018",
    partners: 34,
    status: 0,
  },
  {
    firmName: "Alice Brown",
    creationDate: "11 Jul 1997",
    partners: 23,
    status: 1,
  },
];

const partnersData = [
  { name: "Krishna" },
  { name: "Krishna" },
  { name: "Krishna" },
];

function DashboardPage() {
  const classes = useStyles();

  const options = {
    series: [75], // Percentage progress
    chart: {
      height: 250,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: "75%",
          background: "transparent",
          position: "front",
        },
        track: {
          background: "#F3F3F3", // Light gray background for the track
          strokeWidth: "50%",
          margin: 0, // No margin between the track and progress
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -20, // Adjusted to center align with text above
            show: true,
            color: "#6C757D", // Muted gray text for "Tours"
            fontSize: "16px",
            formatter: function () {
              return "Percent"; // Center text
            },
          },
          value: {
            offsetY: 10, // Value displayed below "Tours"
            color: "rgb(13, 81, 82)",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#10B981"],
    },
    stroke: {
      lineCap: "round", // Rounded edges for smooth appearance
    },
    states: {
      hover: {
        filter: {
          type: "darken", // Apply a darkening filter on hover
          value: 0.1, // Adjust the intensity (0 is no change, 1 is full darkening)
        },
      },
    },
    labels: ["Percent"],
  };

  const getOptions = (color) => {
    return {
      chart: {
        type: "line",
        toolbar: { show: false },
        sparkline: { enabled: true }, // Mini chart without gridlines
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: [color], // Line color
      },
      xaxis: {
        labels: { show: false },
      },
      yaxis: {
        labels: { show: false },
      },
      grid: { show: false },
      tooltip: {
        enabled: true, // Enable tooltips
        theme: "light", // Optional: Choose 'dark', 'light', or leave empty
        x: {
          show: true, // Display the x-axis value
        },
        y: {
          formatter: (value) => `${value}`, // Customize the display value
        },
        marker: {
          show: true,
          fillColors: ["#00E396"], // Change this to your desired color
        },
      },

      markers: {
        size: 0, // Size of the marker (dot)
        hover: {
          size: 0, // Keep the same size on hover (do not change size)
        },
      },
    };
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={8}>
          <Grid container className={classes.entryCard}>
            <Grid item xs={7} sx={{ pt: 6, pl: 6 }}>
              <Typography sx={{ color: "#fff" }} variant="h5">
                Hello Krishna Sai,
              </Typography>
              <Typography sx={{ color: "#fff" }} variant="h6">
                Welcom Back
                </Typography>
              <Typography sx={{ color: "#c9c9c9", mt: 2 }} variant="subtitle1">
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
              </Typography>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={Welcome}
                alt="Welcome Image"
                width={280} // Fixed width
                height={280} // Fixed height
                style={{ borderRadius: "16px" }} // Optional styling
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Box
            className={classes.root}
            sx={{ borderLeft: "1px solid #eef7ee" }}
          >
            <div id="chart">
              <Typography sx={{ fontWeight: "bold" }} color="primary">
                Profile Compltion
              </Typography>

              <Chart
                options={options}
                series={options.series}
                type="radialBar"
                height={250}
              />
            </div>
          </Box>
        </Grid>
        {chartData.map((row, idx) => (
          <Grid item xs={12} md={6} lg={3} className={classes.card}>
            <Card
              className={classes.grid}
              sx={{
                borderRadius: "16px",
              }}
            >
              <Grid
                container
                style={{
                  ...styles.card,
                  backgroundImage: `${row.gradient}, url(${bg.src})`,
                }}
              >
                <Grid item xs={6}>
                  <div>
                    {/* <img
                      src="https://cdn-icons-png.flaticon.com/512/833/833524.png"
                      alt="Bag Icon"
                      style={styles.iconImage}
                    /> */}
                    <i
                      style={{ fontSize: "40px", color: row.color }}
                      class={row.icon}
                    ></i>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={styles.trend}>
                    {/* <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828665.png"
                      alt="Arrow Icon"
                      style={styles.trendIcon}
                    /> */}
                    <span style={{ ...styles.trendText, color: row.color }}>
                      {row.trend}%
                    </span>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={styles.stats}>
                    <div style={styles.title}>{row.name}</div>
                    <div style={{ ...styles.value, color: row.color }}>
                      {row.count}K
                    </div>
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div style={styles.chart}>
                    <Chart
                      options={getOptions(row.color)}
                      series={row.chartSeries}
                      type="line"
                      height={100}
                    />
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      <CustomTable
        heading={"List of Firms"}
        headers={headers}
        rows={rows}
        sx={{ mt: 4, borderRadius: "16px", width: "75%" }}
      />
      <div style={{ display: "flex" }}>
        <Card
          sx={{ width: "35%", mt: 4, mr: 8 }}
          style={{ borderRadius: "16px" }}
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem
              style={styles.trendText}
              secondaryAction={<div>View all &gt;</div>}
            >
              <Typography>List Of Partners</Typography>
              {/* <ListItemText primary="Photos" secondary="Jan 9, 2014" /> */}
            </ListItem>
            {partnersData.map((item, idx) => (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <i
                      style={{ color: "#757575c2" }}
                      class="fa-solid fa-right-left"
                    ></i>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
            ))}
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
          </List>
        </Card>
        <Card sx={{ width: "35%", mt: 4 }} style={{ borderRadius: "16px" }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem
              style={styles.trendText}
              secondaryAction={<div>View all &gt;</div>}
            >
              <Typography>List Of Partners</Typography>
              {/* <ListItemText primary="Photos" secondary="Jan 9, 2014" /> */}
            </ListItem>
            {partnersData.map((item, idx) => (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <i
                      style={{ color: "#757575c2" }}
                      class="fa-solid fa-right-left"
                    ></i>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
            ))}
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
          </List>
        </Card>
      </div>
    </Box>
  );
}

export default DashboardPage;

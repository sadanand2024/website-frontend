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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Chart from "react-apexcharts";

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
  },
  title: {
    fontSize: "15px",
    color: "#4F4F4F",
  },
  value: {
    fontSize: "30px",
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
  grid: {
    minHeight: "200px",
    minHeight: "200px",
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
        name: "Sales",
        data: [50, 70, 90, 110, 130, 150, 170], // Dummy data for the line chart
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
        name: "Sales",
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
        name: "Sales",
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
        name: "Sales",
        data: [70, 120, 50, 180, 90, 200, 40], // Dummy data for the line chart
      },
    ],
  },
];
function Gstcompoennet() {
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
      tooltip: { enabled: false },
    };
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={7}>
              <Card className={classes.root}>
                <Button>Styled Button</Button>
              </Card>
            </Grid>
            <Grid item xs={5}>
              <Card className={classes.root}>
                <Button>Styled Button</Button>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
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
          <Grid item xs={3}>
            <Card className={classes.grid}>
              <Grid
                container
                style={{
                  ...styles.card,
                  backgroundImage: `${row.gradient},
                  url('img/L1.png')
                `,
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
    </Box>
  );
}

export default Gstcompoennet;

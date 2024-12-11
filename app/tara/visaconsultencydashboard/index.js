"use client";
import { useContext, useEffect, useState } from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import mainCardBg from "../../../public/img/MainCard.jpg";
import bg from "../../../public/img/cardBg.jpg";
import man from "../../../public/img/man.png";
import Welcome from "../../../public/img/Welcome.png";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FolderIcon from "@mui/icons-material/Folder";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import BookIcon from "@mui/icons-material/Book";
import { Description } from "@mui/icons-material";
import Factory from "@/app/utils/Factory";
import { useAuth } from "@/app/context/AuthContext";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { IconCoins, IconArrowUpRight } from "@tabler/icons-react";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    minHeight: "280px",
    maxHeight: "280px",
    padding: "10px 20px",
  },
  entryCard: {
    position: "relative",
    color: theme.palette.common.white,
    backgroundImage: `url(${mainCardBg.src})`,
    backgroundColor: theme.palette.primary.main,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "230px",
    maxHeight: "230px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.6)",
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
  servicesCardgrid: {
    minHeight: "120px",
    maxHeight: "120px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)",
  },
  grid: {
    minHeight: "120px",
    maxHeight: "120px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)",
  },
  infoMainCard: {
    maxHeight: "230px",
    minHeight: "230px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "2px 30px",
  },

  infoCard: {
    padding: 20,
    borderRadius: "16px",
    // minHeight: "230px",
    maxHeight: "230px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)",
  },
}));

const quickaccessCards = [
  {
    name: "Create New Request",
    title: "Create New Request",
    count: "",

    icon: <NoteAddIcon style={{ fontSize: 30 }} />,
  },
  {
    name: "Pending",
    title: "Pending",

    icon: <HourglassEmptyIcon style={{ fontSize: 30 }} />,
    count: 0,
  },
  {
    name: "In - Progress",
    title: "In - Progress",
    icon: <AccountBalanceIcon style={{ fontSize: 30 }} />,
    count: 0,
  },
  {
    name: "Completed",
    title: "Completed",

    icon: <CheckCircleIcon style={{ fontSize: 30 }} />,
    count: 0,
  },
];

const ServicesCards = [
  {
    name: "ITR Filing",
    title: "ITR Services Request",
    icon: <NoteAddIcon style={{ fontSize: 30 }} />,
  },
  {
    name: "Networth Assessment",
    title: "Networth Certificate",

    icon: <AttachMoneyIcon style={{ fontSize: 30 }} />,
  },
  {
    name: "Business Proof",
    title: "Business Proof",

    icon: <BusinessCenterIcon style={{ fontSize: 30 }} />,
  },
  {
    name: "Loans",
    title: "Loan",

    icon: <ImportExportIcon style={{ fontSize: 30 }} />,
  },
  {
    name: "Visa Fund",
    title: "Visa Fund",
    icon: <AirlineSeatReclineExtraIcon style={{ fontSize: 30 }} />,
  },
  {
    name: "Forex Payment",
    title: "Forex Payment",
    icon: <AttachMoneyIcon style={{ fontSize: 30 }} />,
  },
  {
    name: "Insurance",
    title: "Insurance",
    icon: <FolderIcon style={{ fontSize: 30 }} />,
  },
  {
    name: "Travel Booking",
    title: "Travel Booking",
    icon: <FlightTakeoffIcon style={{ fontSize: 30 }} />,
  },
  {
    name: "Visa Slot",
    title: "Visa Slot",
    icon: <FlightTakeoffIcon style={{ fontSize: 30 }} />,
  },
  {
    name: "Passport Application",
    title: "Passport Application",
    icon: <BookIcon style={{ fontSize: 30 }} />,
  },
];
function VisaconsultencDashboard() {
  const { user } = useAuth();
  const chipDefaultProps = { color: "black", variant: "text", size: "small" };
  console.log(user);
  const classes = useStyles();
  const [clientListData, setClientListData] = useState({});
  const router = useRouter();
  const handleCardClick = (card) => {
    if (card.name === "Create New Request") {
      router.push(
        `/tara/visaconsultencydashboard/form?name=${encodeURIComponent(card.name)}&title=${encodeURIComponent(card.title)}`
      );
    } else {
      router.push(
        `/tara/visaconsultencydashboard/quickAccess?name=${encodeURIComponent(card.name)}&title=${encodeURIComponent(card.title)}`
      );
    }
  };
  const handleServicesCardClick = (card) => {
    router.push(
      `/tara/visaconsultencydashboard/form?name=${encodeURIComponent(card.name)}&title=${encodeURIComponent(card.title)}`
    );
  };
  const getClientsData = async () => {
    const url = "/user_management/visa-clients/dashboard-status/";
    try {
      const { res, error } = await Factory("get", url, {});
      console.log(res.data);
      if (res.status_cd === 0) {
        setClientListData(res.data);
      }
    } catch (error) {
      // Catch any errors during the request
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    getClientsData(); // Load client list on component mount
  }, []);
  return (
    <Box sx={{ flexGrow: 1, padding: 0 }}>
      <Grid container spacing={2} sx={{ marginTop: 0, paddingTop: 0 }}>
        {/* Main Content Section */}
        <Grid item xs={12} md={8}>
          <Grid
            container
            className={classes.entryCard}
            sx={{ marginBottom: 2 }}
          >
            <Grid item xs={7} sx={{ pt: 2, pl: 6 }}>
              <Typography sx={{ color: "#fff" }} variant="h5">
                Hello User,
              </Typography>
              <Typography sx={{ color: "#fff" }} variant="h6">
                Welcome Back
              </Typography>
              <Typography sx={{ color: "#c9c9c9", mt: 2 }} variant="subtitle1">
                Simply dummy text of the printing and typesetting industry.
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
                width={280}
                height={280}
                style={{ borderRadius: "16px", marginTop: "-25px" }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Sidebar or Additional Content Section */}
        <Grid item xs={12} md={4} sx={{ marginTop: 0 }}>
          <div className={classes.infoMainCard}>
            <Card className={classes.infoCard} style={{ padding: "10px 30px" }}>
              <Stack
                direction="row"
                sx={{ gap: 1 }}
              >
                {/* <svg stroke-width="1"></svg> */}

                <Image
                  src={man}
                  alt="Welcome Image"
                  width={60}
                  height={60}
                  style={{ borderRadius: "0" }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    User Since&nbsp;
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    July, 2024
                  </Typography>
                </div>
              </Stack>
            </Card>
            <Card className={classes.infoCard}>
              <Stack sx={{ gap: 0.5 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Credits Earned
                </Typography>
                <Stack direction="row" sx={{ gap: 0.5 }}>
                  <Typography variant="h5">7000</Typography>
                  <Typography style={{ display: "flex", alignItems: "center" }}>
                    <IconCoins />
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ gap: 0.6, alignItems: "center" }}>
                  <Chip
                    {...{
                      ...chipDefaultProps,
                      label: "20.5%",
                      icon: <IconArrowUpRight />,
                    }}
                    style={{ backgroundColor: "#ffebcd00" }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    vs last month
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </div>
        </Grid>

        <Grid item xs={12}>
          <h5>Quick Access</h5>
        </Grid>
        {quickaccessCards.map((card, idx) => (
          <Grid item xs={12} md={6} lg={3} key={idx}>
            <Card
              className={classes.grid}
              sx={{
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                padding: "20px",
                cursor: "pointer",
                textDecoration: "none", // Prevents underlining the text
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Adding transition for smooth hover effect
                "&:hover": {
                  transform: "scale(1.05)", // Slightly enlarge the card on hover
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Add shadow on hover for depth effect
                },
              }}
              onClick={() => handleCardClick(card)}
            >
              {card.icon}
              <Typography sx={{ mt: 2 }} variant="h6">
                {card.name}
              </Typography>
              <h6>
                {card.title === "Pending"
                  ? clientListData.pending
                  : card.title === "In - Progress"
                    ? clientListData.in_progress
                    : card.title === "Create New Request"
                      ? ""
                      : clientListData.completed}
              </h6>
            </Card>
          </Grid>
        ))}
        <Grid sx={{ mb: 1, mt: 5 }} item xs={12}>
          <h5>Select Services</h5>
        </Grid>
        {ServicesCards.map((card, idx) => (
          <Grid item xs={12} md={6} lg={3} key={idx}>
            <Card
              className={classes.servicesCardgrid}
              sx={{
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                padding: "20px",
                cursor: "pointer",
                textDecoration: "none", // Prevents underlining the text
              }}
              onClick={() => handleServicesCardClick(card)}
            >
              {card.icon}
              <Typography sx={{ mt: 2 }} variant="h6">
                {card.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default VisaconsultencDashboard;

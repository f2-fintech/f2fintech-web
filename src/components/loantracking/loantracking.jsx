import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import PublishTwoToneIcon from "@mui/icons-material/PublishTwoTone";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import MoneyIcon from "@mui/icons-material/Money";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HighlightIcon from "@mui/icons-material/Highlight";
import InfoIcon from "@mui/icons-material/Info";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PreviewIcon from "@mui/icons-material/Preview";
import FastForwardIcon from "@mui/icons-material/FastForward";
import LoginIcon from "@mui/icons-material/Login";

import API from "../../apis";
import stepsData from "../stepsData";
import { Utility } from "../utility";
import { Helmet } from "react-helmet-async";

const initialSteps = [
  { label: "Submitted", icon: <PublishTwoToneIcon /> },
  { label: "Under Credit Review", icon: <RemoveRedEyeIcon /> },
  { label: "Login", icon: <LoginIcon /> },
  { label: "Carry forward", icon: <FastForwardIcon /> },
  { label: "Drop", icon: <ArrowDropDownIcon /> },
  { label: "Relook", icon: <PreviewIcon /> },
  { label: "Approved", icon: <DoneIcon /> },
  { label: "Rejected", icon: <CancelIcon /> },
];

const colorMap = {
  Submitted: "green",
  "Under Credit review": "blue",
  Login: "#ffd700",
  "Carry forward": "darkblue",
  Drop: "olive",
  Relook: "pink",
  Approved: "green",
  Rejected: "red",
};

const statusImageMap = {
  Submitted: "https://online.sbimf.com/assets/images/mandate-success-icon.svg",
  "Under review":
    "https://st3.depositphotos.com/2274151/36576/v/450/depositphotos_365760986-stock-illustration-review-stamp-review-vintage-blue.jpg",
  Rejected: "https://cdn-icons-png.flaticon.com/512/3712/3712858.png",
  Approved:
    "https://img.freepik.com/free-vector/approved-sign-with-shield-gradient_78370-1025.jpg",
  Disbursed: "disbursed.png",
  "Carry forward": "carryforward.jpg",
  Drop: "drop.png",
  Relook: "relook.png",
  Login: "Login.png",
};

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "red",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 7,
    borderRadius: 1,
    [theme.breakpoints.down("sm")]: {
      borderTopWidth: 4,
    },
  },
}));

const ResponsiveStepIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "4vw",
  height: "9vh",
  marginTop: -1,
  borderRadius: "100%",
  zIndex: 100,
  transition: "background-color 0.3s ease, color 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    width: "8vw",
    height: "6vh",
    "& svg": {
      fontSize: "1rem",
    },
  },
  [theme.breakpoints.down("md")]: {
    width: "6vw",
    height: "7vh",
    "& svg": {
      fontSize: "1.2rem",
    },
  },
}));

const Loan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(initialSteps);
  const [applicationData, setApplicationData] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { getLocalStorage } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;

  const convertToYear = (months) => {
    return Math.floor(months / 12);
  };

  useEffect(() => {
    const fetchLoanTracking = async () => {
      try {
        const { data: resp } =
          await API.CustomerApplicationAPI.getApplicationById(customerId);
        if (resp.status === "Success") {
          setApplicationData(resp.data);
          const { data: response } =
            await API.LoanTrackingAPI.getLoanTrackingById(resp.data.id);

          if (response.status === "Success") {
            const { status } = response.data;
            const normalizedStatus = status.replace(/_/g, " ").toLowerCase();
            const statusIndex = initialSteps.findIndex(
              (step) => step.label.toLowerCase() === normalizedStatus
            );
            if (statusIndex !== -1) {
              setActiveStep(statusIndex);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching loan tracking data:", error);
      }
    };

    fetchLoanTracking();
  }, [customerId]);

  const getStepColor = (index) => {
    if (index <= activeStep) {
      const status = steps[index].label;
      return colorMap[status] || "white";
    } else {
      return "#000000";
    }
  };

  const currentStepData = stepsData[activeStep];
  const currentStatusImage = statusImageMap[steps[activeStep].label];

  return (
    <>
      <Helmet>
        <title></title>
        <meta name="Name" content=" " />
        <link rel="canonical" href="http://localhost:5173/loan-tracker" />
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "100vh",
          padding: {
            xs: "1rem",
            sm: "1.5rem",
            md: "2.8rem",
          },
          boxSizing: "border-box",
          backgroundImage: "url(/caltheme5.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            borderRadius: "18px",
            boxShadow: 3,
            padding: { xs: "1rem", sm: "1.5rem", md: "2rem" },
            width: "100%",
            // maxWidth: "1200px",
            maxWidth: {
              xs: "300px",
              sm: "550",
              md: "1200px",
            },
            margin: "0 auto",
            overflowX: { xs: "auto", sm: "inherit", md: "auto" },
            border: "1px solid white",
          }}
        >
          <Stepper
            activeStep={activeStep}
            orientation={isMobile || isTablet ? "vertical" : "horizontal"}
            alternativeLabel={!isMobile}
            connector={
              isMobile ? (
                <Box
                  sx={{
                    width: "2px",
                    backgroundColor: "#fff",
                    height: "40px",
                    margin: "0 auto",
                    marginLeft: "24px",
                  }}
                />
              ) : (
                <CustomConnector />
              )
            }
            sx={{
              minWidth: { xs: "100%", sm: "600px" },
              "& .MuiStepConnector-line": {
                borderColor: "#fff",
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <ResponsiveStepIcon
                      sx={{
                        border: "1px solid #fff",
                        backgroundColor: getStepColor(index),
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: {
                          xs: "2rem",
                          sm: "3rem",
                          md: "3rem",
                        },
                        width: {
                          xs: "2rem",
                          sm: "3rem",
                          md: "3rem",
                        },
                      }}
                    >
                      {React.cloneElement(step.icon, {
                        style: { color: "white" },
                        fontSize: isMobile ? "small" : "medium",
                      })}
                    </ResponsiveStepIcon>
                  )}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isMobile ? "flex-start" : "center",
                      gap: "4px",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.9rem",
                          md: "1rem",
                        },
                        whiteSpace: "nowrap",
                      }}
                      color="#fff"
                    >
                      {`STEP ${index + 1}`}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.8rem",
                          md: "0.9rem",
                        },
                        whiteSpace: "nowrap",
                      }}
                      color="#fff"
                    >
                      {step.label}
                    </Typography>
                  </Box>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {currentStepData ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: {
                xs: 1,
                sm: 2,
                md: 3,
              },
              width: {
                xs: "95%",
                sm: "90%",
                md: "90%",
              },
              marginTop: 1,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: {
                  xs: 1,
                  sm: 2,
                  md: 3,
                },
                background: "black",
                borderRadius: "18px",
                width: "100%",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2}>
                  <Box
                    sx={{
                      width: "100%",
                      padding: "0.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: {
                        xs: "20vh",
                        sm: "25vh",
                        md: "30vh",
                      },
                    }}
                  >
                    <img
                      alt={currentStepData.name}
                      src={currentStepData.logo}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "12px",
                        transition: "transform 0.3s ease",
                      }}
                      className="image-hover"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "550",
                      background: "linear-gradient(to right, #ffffff, #333333)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 2,
                      fontFamily: "Poppins",
                      textTransform: "uppercase",
                      marginLeft: {
                        xs: "1rem",
                        sm: "1.5rem",
                        md: "2.5rem",
                      },
                      fontSize: {
                        xs: "1rem",
                        sm: "1.2rem",
                        md: "1.3rem",
                      },
                    }}
                  >
                    {currentStepData.name}
                    <hr
                      style={{
                        backgroundColor: "#333333",
                        height: "0.2rem",
                        width: isMobile ? "40vw" : isTablet ? "30vw" : "22vw",
                        border: "none",
                        opacity: 0.3,
                        margin: "0.5rem 0",
                      }}
                    />
                  </Typography>

                  {/* Application Details */}
                  <Box sx={{ marginLeft: { xs: "1rem", sm: "1.5rem" } }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        fontSize: {
                          xs: "0.9rem",
                          sm: "1rem",
                        },
                      }}
                    >
                      <MoneyIcon sx={{ marginRight: 1 }} />
                      <strong style={{ marginRight: 8, fontWeight: "400" }}>
                        Amount(INR):
                      </strong>
                      <Box
                        component="span"
                        sx={{ color: theme.palette.secondary.main }}
                      >
                        {applicationData?.amount ?? "N/A"}
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        fontSize: {
                          xs: "0.9rem",
                          sm: "1rem",
                        },
                      }}
                    >
                      <AccessTimeIcon sx={{ marginRight: 1 }} />
                      <strong style={{ marginRight: 8, fontWeight: "400" }}>
                        Tenure:
                      </strong>
                      <Box
                        component="span"
                        sx={{ color: theme.palette.secondary.main }}
                      >
                        {applicationData
                          ? `${convertToYear(applicationData.tenure)} ${
                              convertToYear(applicationData.tenure) === 1
                                ? "year"
                                : "years"
                            }`
                          : "N/A"}
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        fontSize: {
                          xs: "0.9rem",
                          sm: "1rem",
                        },
                      }}
                    >
                      <HighlightIcon sx={{ marginRight: 1 }} />
                      <strong style={{ marginRight: 8, fontWeight: "400" }}>
                        Highlight:
                      </strong>
                      <Box
                        component="span"
                        sx={{ color: theme.palette.secondary.main }}
                      >
                        {currentStepData.highlight}
                      </Box>
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#1e3a8a",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <InfoIcon sx={{ ml: 3, mr: 2, color: "white" }} />
                    <Box
                      component="span"
                      sx={{
                        fontWeight: "500",
                        fontSize: "1rem",
                        borderRadius: "12px",
                        fontFamily: "Poppins",
                        padding: "0.2rem 0.7rem",
                        backgroundColor: theme.palette.whitetext.white,
                        color: theme.palette.secondary.main,
                      }}
                    >
                      {currentStepData.additionalInfo}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      width: "55%",
                      padding: "0.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#2c3ce3",
                      height: "40vh",
                      marginLeft: "auto",
                      marginRight: "5rem ",
                    }}
                  >
                    <img
                      alt={steps[activeStep].label}
                      src={currentStatusImage}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "15px",
                        transition: "transform 0.3s ease",
                        margin: "0 auto",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ) : (
          <Typography variant="h6" sx={{ color: "#fff", marginTop: 4 }}>
            Loading...
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Loan;

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
            md: "2rem",
            lg: "2.8rem",
          },
          boxSizing: "border-box",
          backgroundImage: "url(/caltheme5.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          overflow: "hidden",
          gap: { xs: 2, sm: 3, md: 4 }, // Added gap for better spacing
        }}
      >
        <Box
          sx={{
            borderRadius: "18px",
            boxShadow: 3,
            padding: {
              xs: "1rem",
              sm: "1.5rem",
              md: "2rem",
            },
            width: "100%",
            maxWidth: {
              xs: "320px",
              sm: "500px",
              md: "800px",
              lg: "1200px",
            },
            margin: "0 auto",
            overflowX: "auto",
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
              width: "100%",
              minWidth: { xs: "280px", sm: "100%" },
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
                          sm: "2.5rem",
                          md: "3rem",
                          lg: "3.5rem",
                        },
                        width: {
                          xs: "2rem",
                          sm: "2.5rem",
                          md: "3rem",
                          lg: "3.5rem",
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
                      gap: { xs: "2px", sm: "4px", md: "6px" },
                      textAlign: isMobile ? "left" : "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.8rem",
                          md: "0.9rem",
                          lg: "1rem",
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
                          xs: "0.6rem",
                          sm: "0.7rem",
                          md: "0.8rem",
                          lg: "0.9rem",
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
              justifyContent: "center",
              padding: {
                xs: 1,
                sm: 1.5,
                md: 2,
                lg: 3,
              },
              width: {
                xs: "100%",
                sm: "95%",
                md: "90%",
                lg: "85%",
              },
              marginTop: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: {
                  xs: 1.5,
                  sm: 2,
                  md: 2.5,
                  lg: 3,
                },
                background: "white",
                borderRadius: "18px",
                width: "100%",
                maxWidth: "1400px",
              }}
            >
              <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                {/* Logo Image */}
                <Grid item xs={12} sm={6} md={2}>
                  <Box
                    sx={{
                      width: "100%",
                      padding: { xs: "0.5rem", sm: "0.75rem", md: "1rem" },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: {
                        xs: "120px",
                        sm: "150px",
                        md: "180px",
                        lg: "200px",
                      },
                    }}
                  >
                    <img
                      alt={currentStepData.name}
                      src={currentStepData.logo}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        height: "auto",
                        borderRadius: "12px",
                        transition: "transform 0.3s ease",
                        objectFit: "contain",
                      }}
                      className="image-hover"
                    />
                  </Box>
                </Grid>

                {/* Content Section */}
                <Grid item xs={12} sm={6} md={6}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "550",
                      background: "#3244e6",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: { xs: 1, sm: 1.5, md: 2 },
                      fontFamily: "Poppins",
                      textTransform: "uppercase",
                      marginLeft: {
                        xs: "0.5rem",
                        sm: "1rem",
                        md: "1.5rem",
                        lg: "2.5rem",
                      },
                      fontSize: {
                        xs: "1.1rem",
                        sm: "1.3rem",
                        md: "1.4rem",
                        lg: "1.5rem",
                      },
                    }}
                  >
                    {currentStepData.name}
                    <hr
                      style={{
                        backgroundColor: "#333333",
                        height: "0.2rem",
                        width: "100%",
                        maxWidth: {
                          xs: "200px",
                          sm: "250px",
                          md: "300px",
                          lg: "350px",
                        },
                        border: "none",
                        opacity: 0.3,
                        margin: "0.5rem 0",
                      }}
                    />
                  </Typography>

                  {/* Application Details */}
                  <Box
                    sx={{
                      marginLeft: {
                        xs: "0.5rem",
                        sm: "1rem",
                        md: "1.5rem",
                        lg: "2rem",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        mb: { xs: 1.5, sm: 2 },
                        display: "flex",
                        alignItems: "center",
                        color: "black",
                        fontWeight: "600",
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.9rem",
                          md: "1rem",
                          lg: "1rem",
                        },
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <MoneyIcon
                        sx={{
                          marginRight: 1,
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                        }}
                      />
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
                        mb: { xs: 1.5, sm: 2 },
                        display: "flex",
                        alignItems: "center",
                        color: "black",
                        fontWeight: "600",
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.9rem",
                          md: "1rem",
                          lg: "1rem",
                        },
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{
                          marginRight: 1,
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                        }}
                      />
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
                        mb: { xs: 1.5, sm: 2 },
                        display: "flex",
                        alignItems: "center",
                        color: "black",
                        fontWeight: "600",
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.9rem",
                          md: "1rem",
                          lg: "1rem",
                        },
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <HighlightIcon
                        sx={{
                          marginRight: 1,
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                        }}
                      />
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
                      marginTop: { xs: 1, sm: 2 },
                    }}
                  >
                    <InfoIcon
                      sx={{
                        ml: { xs: 1, sm: 2, md: 3 },
                        mr: { xs: 1, sm: 2 },
                        color: "white",
                        fontSize: { xs: "1rem", sm: "1.2rem" },
                      }}
                    />
                    <Box
                      component="span"
                      sx={{
                        fontWeight: "500",
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.9rem",
                          md: "1rem",
                        },
                        borderRadius: "12px",
                        fontFamily: "Poppins",
                        padding: { xs: "0.2rem 0.5rem", sm: "0.2rem 0.7rem" },
                        backgroundColor: theme.palette.whitetext.white,
                        color: theme.palette.secondary.main,
                      }}
                    >
                      {currentStepData.additionalInfo}
                    </Box>
                  </Typography>
                </Grid>

                {/* Status Image */}
                <Grid item xs={12} sm={12} md={4}>
                  <Box
                    sx={{
                      width: {
                        xs: "80%",
                        sm: "60%",
                        md: "100%",
                      },
                      padding: { xs: "0.5rem", sm: "0.75rem", md: "1rem" },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#2c3ce3",
                      height: {
                        xs: "150px",
                        sm: "180px",
                        md: "200px",
                        lg: "250px",
                      },
                      marginLeft: { xs: "auto", sm: "auto", md: "auto" },
                      marginRight: { xs: "auto", sm: "auto", md: "2rem" },
                      marginTop: { xs: 1, sm: 0 },
                    }}
                  >
                    <img
                      alt={steps[activeStep].label}
                      src={currentStatusImage}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        height: "auto",
                        borderRadius: "15px",
                        transition: "transform 0.3s ease",
                        margin: "0 auto",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              marginTop: 4,
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            Loading...
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Loan;

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
  Paper,
} from "@mui/material";

import Step1Form from "./Step1Form";
import Step3Form from "./Step3Form";
import Step4Form from "./Step4Form";
import Step7Form from "./Step7Form";

import API from "../../apis";
import { Utility } from "../utility";

const steps_form = [
  {
    label: "Basic Details",
    icon: "/basic1.png",
  },
  {
    label: "Statement Upload",
    icon: "/statement2.png",
  },
  {
    label: "Proﬁle Details and Proof",
    icon: "/profile.png",
  },
  {
    label: "Additional Details",
    icon: "/additional.png",
  },
];

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [getStarted, setGetStarted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const [allUploadsSuccess, setAllUploadsSuccess] = useState(null);
  const [aadharUploadsSuccess, setAadharUploadsSuccess] = useState(null);
  const [salarySuccess, setSalarySuccess] = useState(null);
  const [isStepCompleted, setIsStepCompleted] = useState({
    step2: false,
    step3: false,
    step4: false,
  });
  const { getLocalStorage, setLocalStorage } = Utility();
  const storedCustomerId = useMemo(
    () => getLocalStorage("customerInfo")?.id,
    []
  );
  const theme = useTheme();

  // Restore active step from localStorage on mount
  useEffect(() => {
    const savedActiveStep = getLocalStorage("activeStep");
    if (savedActiveStep) {
      setActiveStep(parseInt(savedActiveStep, 10));
    }
  }, []);

  // // Save active step and progress to localStorage
  useEffect(() => {
    setLocalStorage("activeStep", activeStep);
  }, [activeStep]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, 3)); // Prevent going beyond last step
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  }, []);

  // Handle form submission to allow progressing
  const handleFormSubmit = () => {
    if (activeStep === 0)
      setIsStepCompleted((prev) => ({ ...prev, step2: true }));
    if (activeStep === 1)
      setIsStepCompleted((prev) => ({ ...prev, step3: true }));
    if (activeStep === 2)
      setIsStepCompleted((prev) => ({ ...prev, step4: true }));
    handleNext();
  };

  // Fetch customer data with proper error handling and loading states
  useEffect(() => {
    let isCancelled = false;

    const fetchCustomerData = async () => {
      if (!storedCustomerId) return;

      try {
        const { data: response } = await API.CustomerInfoAPI.getCustomerInfo(
          storedCustomerId
        );

        // Only update state if component is still mounted
        if (!isCancelled && response.status === "Success") {
          setApplicationData(response.data);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Error fetching customer data:", err);
        }
      }
    };

    fetchCustomerData();

    // Cleanup function to prevent memory leaks
    return () => {
      isCancelled = true;
    };
  }, [storedCustomerId]);

  // Render form content for each step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Step1Form
            applicationNumber={applicationNumber}
            setApplicationNumber={setApplicationNumber}
            onSubmit={handleFormSubmit}
            getStarted={getStarted}
            setGetStarted={setGetStarted}
            salary={applicationData?.salary}
          />
        );

      case 1:
        return (
          <Step3Form
            handleNext={handleNext}
            allUploadsSuccess={allUploadsSuccess}
            setAllUploadsSuccess={setAllUploadsSuccess}
          />
        );
      case 2:
        return (
          <Step4Form
            handleNext={handleNext}
            handleBack={handleBack}
            allUploadsSuccess={allUploadsSuccess}
            aadharUploadsSuccess={aadharUploadsSuccess}
            setAadharUploadsSuccess={setAadharUploadsSuccess}
          />
        );
      case 3:
        return (
          <Step7Form
            aadharUploadsSuccess={aadharUploadsSuccess}
            setSalarySuccess={setSalarySuccess}
            handleBack={handleBack}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Background Blobs inside a wrapper to prevent horizontal scroll without breaking sticky */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: { xs: "200px", md: "400px" },
            height: { xs: "200px", md: "400px" },
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            top: { xs: "-100px", md: "-150px" },
            left: { xs: "-100px", md: "-150px" },
            filter: "blur(80px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: { xs: "300px", md: "500px" },
            height: { xs: "300px", md: "500px" },
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            bottom: { xs: "-150px", md: "-200px" },
            right: { xs: "-150px", md: "-250px" },
            filter: "blur(100px)",
          }}
        />
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          p: 0,
        }}
      >
        <Paper
          elevation={24}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: "24px",
            width: "100%",
            position: "relative",
            backgroundColor: "white",
          }}
        >
          {/* Absolute Background for Right Panel on Desktop */}
          {!applicationData?.salary && (
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "40%",
                background: "linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)",
                borderTopRightRadius: "24px",
                borderBottomRightRadius: "24px",
                overflow: "hidden",
                zIndex: 0,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "35%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "120%",
                  height: "120%",
                  backgroundImage: "url(/f2Fintechlogo-old.png)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: "blur(4px) opacity(0.2)",
                  zIndex: 0,
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              width: { xs: "100%", md: applicationData?.salary ? "100%" : "60%" },
              p: { xs: 2, sm: 3, md: 5 },
              backgroundColor: "transparent",
              minHeight: "600px",
              boxSizing: "border-box",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box>
                {getStepContent(activeStep)}
                {activeStep === 0 &&
                  !applicationData?.salary &&
                  !getStarted &&
                  applicationNumber && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        pt: 4,
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={handleNext}
                        variant="contained"
                        sx={{
                          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                          color: "white",
                          fontWeight: 600,
                          borderRadius: "12px",
                          textTransform: "none",
                          fontSize: "1.1rem",
                          px: 6,
                          py: 1.5,
                          boxShadow: "0px 8px 24px rgba(30, 60, 114, 0.3)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0px 12px 32px rgba(30, 60, 114, 0.4)",
                          },
                        }}
                      >
                        Proceed to Next Step
                      </Button>
                    </Box>
                  )}
              </Box>

              {!applicationData?.salary && (
                <Box sx={{ mt: 4, width: "100%" }}>
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{
                      "& .MuiStepIcon-root": {
                        fontSize: "1.5rem",
                        color: "rgba(0, 0, 0, 0.1)",
                      },
                      "& .MuiStepIcon-root.Mui-active": {
                        color: "#1e3c72",
                      },
                      "& .MuiStepIcon-root.Mui-completed": {
                        color: "#2a5298",
                      },
                    }}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              )}
            </Box>
          </Box>

          {!applicationData?.salary && (
            // Right side box
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: { xs: "100%", md: "40%" },
                p: { xs: 2, sm: 4, md: 6 },
                boxSizing: "border-box",
                color: "white",
                position: { xs: "relative", md: "sticky" },
                top: { md: "40px" },
                alignSelf: { md: "flex-start" },
                zIndex: 1,
                background: {
                  xs: "linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)",
                  md: "transparent",
                },
                borderBottomRightRadius: { xs: "24px", md: 0 },
                borderBottomLeftRadius: { xs: "24px", md: 0 },
                overflow: { xs: "hidden", md: "visible" },
              }}
            >
              {/* Mobile Blurred Logo Background */}
              <Box
                sx={{
                  display: { xs: "block", md: "none" },
                  position: "absolute",
                  top: "25%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "120%",
                  height: "120%",
                  backgroundImage: "url(/f2Fintechlogo-old.png)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: "blur(4px) opacity(0.2)",
                  zIndex: 0,
                }}
              />
              <Typography
                variant="h4"
                align="center"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  marginBottom: "20px",
                  fontFamily: "Poppins",
                  fontSize: { xs: "5vw", sm: "4vw", md: "1.9vw" },
                  marginTop: {
                    xs: "15px",
                    sm: "16px",
                    md: "0px",
                  },
                  color: "white",
                }}
              >
                Steps Ahead
              </Typography>
              <Typography
                variant="body1"
                align="center"
                sx={{
                  position: "relative",
                  zIndex: 3,
                  marginBottom: "20px",
                  color: "white",
                  fontFamily: "Poppins",
                  fontSize: { xs: "3.1vw", md: "1.3vw" },
                }}
              >
                In order to receive the loan amount, <br /> you will need to{" "}
                <span style={{ color: "#fff" }}> successfully complete </span>{" "}
                these steps.
              </Typography>
              {steps_form.map((step, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                    display: "flex",
                    width: "100%",
                    maxWidth: "320px",
                    alignItems: "center",
                    borderRadius: "16px",
                    p: 2,
                    mb: 3,
                    transition: "all 0.3s ease",
                    position: "relative",
                    zIndex: 3,
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.2)",
                      transform: "translateX(10px)",
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={step.icon}
                    alt={`${step.label} icon`}
                    sx={{
                      width: {
                        xs: "30px",
                        sm: "40px",
                        md: "40px",
                      },
                      height: {
                        xs: "30px",
                        sm: "40px",
                        md: "40px",
                      },

                      marginRight: "10px",
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "430",
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: { xs: "3.3vw", md: "1.1vw", sm: "2.5vw" },
                    }}
                  >
                    {step.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default MultiStepForm;

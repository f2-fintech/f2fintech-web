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
  useMediaQuery,
} from "@mui/material";

import Step1Form from "./Step1Form";
import Step3Form from "./Step3Form";
import Step4Form from "./Step4Form";
import Step7Form from "./Step7Form";

import API from "../../apis";
import { Utility } from "../utility";

const steps_form = [
  {
    label: "Loan Details",
    icon: "/basic1.webp",
  },
  {
    label: "Statement Upload",
    icon: "/statement2.webp",
  },
  {
    label: "Profile & Proofs",
    icon: "/profile.webp",
  },
  {
    label: "Additional Details",
    icon: "/additional.webp",
  },
];

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
  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px)"
  );

  // Restore active step from localStorage on mount
  useEffect(() => {
    const savedActiveStep = getLocalStorage("activeStep");
    if (savedActiveStep) {
      setActiveStep(parseInt(savedActiveStep, 10));
    }
  }, []);

  // Save active step and progress to localStorage
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
        minHeight: isIpadPro ? "auto" : "100vh",
        width: "100%",
        background: "#F1F5F9",
        display: "flex",
        justifyContent: "center",
        alignItems: isIpadPro ? "flex-start" : "center",
        position: "relative",
        py: isIpadPro ? 8 : { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          p: 0,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "24px",
            width: "100%",
            position: "relative",
            backgroundColor: "white",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
          }}
        >
          {/* Horizontal Tabs Header at the Top */}
          {!applicationData?.salary && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                borderBottom: "1px solid #E2E8F0",
                backgroundColor: "white",
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
              }}
            >
              {steps_form.map((step, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    if (activeStep > index) {
                      setActiveStep(index);
                    }
                  }}
                  sx={{
                    flex: 1,
                    py: 3,
                    textAlign: "center",
                    cursor: activeStep > index ? "pointer" : "default",
                    borderBottom: activeStep === index ? "3px solid #3244e6" : "3px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: { xs: "12px", sm: "14px", md: "15px" },
                      fontWeight: activeStep === index ? 700 : 500,
                      color: activeStep === index ? "#3244e6" : "#94A3B8",
                    }}
                  >
                    {step.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Main Layout Area */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              width: "100%",
            }}
          >
            {/* Left Side Branding Box */}
            {!applicationData?.salary && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: { xs: "100%", md: "40%" },
                  p: { xs: 4, sm: 5, md: 6 },
                  pt: { xs: 6, md: 4 },
                  boxSizing: "border-box",
                  backgroundColor: "#FFFFFF",
                  borderRight: { md: "1px solid #E2E8F0" },
                  borderBottom: { xs: "1px solid #E2E8F0", md: "none" },
                  minHeight: "auto",
                  position: { md: "sticky" },
                  top: { md: "96px" },
                  alignSelf: { md: "flex-start" },
                  borderBottomLeftRadius: { md: "24px" },
                }}
              >
                <Box
                  component="img"
                  src="/f2Fintechlogo-old.webp"
                  alt="Fintech Logo"
                  sx={{
                    height: { xs: "120px", md: "160px" },
                    mb: 2,
                    objectFit: "contain",
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: { xs: "28px", md: "38px" },
                    fontWeight: 800,
                    textAlign: "center",
                    color: "#1E293B",
                    lineHeight: 1.2,
                    mb: 2,
                  }}
                >
                  Application <br />
                  <span style={{ color: "#3244e6" }}>Intake Console</span>
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    color: "#64748B",
                    textAlign: "center",
                    lineHeight: 1.6,
                    maxWidth: "320px",
                  }}
                >
                  Internal operations module to initialize new customer financing profiles, structure loan parameters, and track multi-provider approval lifecycles.
                </Typography>
              </Box>
            )}

            {/* Right Side Content Box */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", md: applicationData?.salary ? "100%" : "60%" },
                p: { xs: 3, sm: 4, md: 6 },
                backgroundColor: "white",
                minHeight: "600px",
                boxSizing: "border-box",
                borderBottomRightRadius: { xs: "24px", md: "24px" },
                borderBottomLeftRadius: { xs: "24px", md: "0px" },
              }}
            >
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
                        background: "linear-gradient(135deg, #4E9FE5 0%, #3244e6 100%)",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        px: 6,
                        py: 1.5,
                        boxShadow: "0px 8px 24px rgba(50, 68, 230, 0.3)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          background: "linear-gradient(135deg, #3244e6 0%, #1a2bbd 100%)",
                          boxShadow: "0px 12px 32px rgba(50, 68, 230, 0.4)",
                        },
                      }}
                    >
                      Proceed to Next Step
                    </Button>
                  </Box>
                )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MultiStepForm;

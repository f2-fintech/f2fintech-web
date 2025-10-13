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
  const [activeStep, setActiveStep] = useState(0); // Current step in the form
  const [getStarted, setGetStarted] = useState(false); // Toggle form fields display
  const [applicationNumber, setApplicationNumber] = useState(null); // for step form 1
  const [applicationData, setApplicationData] = useState(null); // for step form 1
  const [allUploadsSuccess, setAllUploadsSuccess] = useState(null); // Track if all uploads were successful for step form 3
  const [aadharUploadsSuccess, setAadharUploadsSuccess] = useState(null); // Track if all uploads were successful for step form 4
  const [salarySuccess, setSalarySuccess] = useState(null); // Track if all uploads were successful for step form 4
  const [isStepCompleted, setIsStepCompleted] = useState({
    step2: false,
    step3: false,
    step4: false,
  }); // Track step completion status
  const { getLocalStorage, setLocalStorage } = Utility();
  const storedCustomerId = useMemo(() => getLocalStorage("customerInfo")?.id, []);
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
    handleNext(); // Proceed to the next step upon successful form submission
  };

  // Fetch customer data with proper error handling and loading states
  useEffect(() => {
    let isCancelled = false; // Prevent state updates if component unmounts

    const fetchCustomerData = async () => {
      if (!storedCustomerId) return;

      try {
        const { data: response } = await API.CustomerInfoAPI.getCustomerInfo(storedCustomerId);

        // Only update state if component is still mounted
        if (!isCancelled && response.status === "Success") {
          console.log("Fetched application data:", response.data);
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
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        minHeight: "80vh",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginBottom: "1.3rem",
          marginTop: "1.3rem",
          justifyContent: applicationData?.salary ? "center" : "flex-start",
          boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
          borderRadius: "15px",
          flexDirection: { xs: "column", sm: "column", md: "row" }, // Column for mobile, row for desktop\
        }}
      >
        {/* Left side box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: { xs: "100%", md: "50%" }, // Full width on small screens
            overflowY: "auto",
            maxHeight: "260vh",
            p: 2,
            backgroundColor: "#fff",
            // backgroundImage: "url(caltheme5.png)",
            ...(applicationData?.salary
              ? {
                borderRadius: "15px", // All corners if salary exists
              }
              : {
                borderTopLeftRadius: { xs: "15px", md: "15px" },
                borderBottomLeftRadius: { xs: "0", md: "15px" },
              }),
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
                  sx={ {
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    justifyContent: "flex-end",
                  } }
                >
                  <Button
                    onClick={ handleNext }
                    variant="contained"
                    sx={ {
                      mr: 10,
                      backgroundColor: "#3244e6",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: "12px",
                      textTransform: "none",
                      px: 4,
                      py: 1.2,
                      boxShadow: "0px 4px 12px rgba(50, 68, 230, 0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#2c3ed4",
                        boxShadow: "0px 6px 16px rgba(50, 68, 230, 0.6)",
                        transform: "scale(1.11)",
                      },
                    } }
                  >
                    Next
                  </Button>
                </Box>

                )}
            </Box>

            {!applicationData?.salary && (
              <Stepper activeStep={activeStep} sx={{ margin: "20px 20px" }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
          </Box>
        </Box>

        {!applicationData?.salary && (
          // Right side box
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", md: "50%" }, // Full width on small screens
              position: { xs: "relative", md: "sticky" }, // Ensure it's visible on small screens
              top: 0,
              height: { xs: "auto", md: "100vh" }, // Set auto height for mobile
              overflowY: "auto",
              borderTopRightRadius: { xs: "0", md: "15px" },
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: {
                xs: "15%",
              },
              borderTopLeftRadius: {
                xs: "15%",
              },
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                marginBottom: "20px",
                fontFamily: "Poppins",
                fontSize: { xs: "5vw", sm: "4vw", md: "1.9vw" }, // Larger font for mobile
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
                  // backgroundColor: "#100d0d",
                  border: "1px solid white",
                  display: "flex",
                  width: { xs: "70%", md: "20vw" },
                  height: {
                    xs: "3.5vh",
                    sm: "6vh",
                    // md:'inherit',
                  },
                  alignItems: "center",
                  borderRadius: "10px",
                  padding: "10px",
                  marginBottom: "20px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  component="img"
                  src={step.icon}
                  alt={`${step.label} icon`}
                  sx={{
                    // width: "40px", height: "40px",
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
      </Box>
    </Container>
  );
};

export default MultiStepForm;

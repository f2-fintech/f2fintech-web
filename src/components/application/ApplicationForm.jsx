import { useState, useEffect } from "react";
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
    label: "Statement upload",
    icon: "/statement2.png",
  },
  {
    label: "Proﬁle details and proof",
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
  const [getStarted, setGetStarted] = useState(false); // To toggle form fields display
  const [applicationNumber, setApplicationNumber] = useState(null); // for step form 1
  const [applicationData, setApplicationData] = useState(null); // for step form 1
  const [allUploadsSuccess, setAllUploadsSuccess] = useState(null); // Track if all uploads were successful for step form 3
  const [aadharUploadsSuccess, setAadharUploadsSuccess] = useState(null); // Track if all uploads were successful for step form 4
  const [salarySuccess, setSalarySuccess] = useState(null); // Track if all uploads were successful for step form 4

  const [isStepCompleted, setIsStepCompleted] = useState({
    step2: false,
    step3: false,
    step4: false,
  });
  const { getLocalStorage, setLocalStorage } = Utility();
  const storedCustomerId = getLocalStorage("customerInfo")?.id;

  // Restore step and progress from localStorage on mount
  useEffect(() => {
    const savedActiveStep = getLocalStorage("activeStep");
    if (savedActiveStep) {
      setActiveStep(parseInt(savedActiveStep, 10));
    }
  }, [applicationData?.salary]);

  // // Save active step and progress to localStorage
  useEffect(() => {
    setLocalStorage("activeStep", activeStep);
  }, [activeStep, applicationData?.salary]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

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

  useEffect(() => {
    console.log("Scroll To Top");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch application number and loan status using stored customer ID
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (storedCustomerId) {
        try {
          const { data: response } = await API.CustomerInfoAPI.getCustomerInfo(
            storedCustomerId
          );
          if (response.status === "Success") {
            console.log(response.data, "data");
            setApplicationData(response.data);
            const { data: resp } =
              await API.LoanTrackingAPI.getLoanTrackingById(response.data.id);
            if (resp.status === "Success") {
              setLoanStatus(resp.data.status);
            }
          }
        } catch (err) {
          console.log("Error fetching customer data:", err);
        }
      }
    };
    fetchCustomerData();
  }, [storedCustomerId]);

  // Render form content for each step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Step1Form
            handleNext={handleNext}
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
  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        // marginBottom: "15px",
        minHeight: "80vh",
        backgroundColor: "#000000",
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
            backgroundColor: "white",
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
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      pt: 2,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={handleNext}
                      sx={{ mr: 10, color: "black" }}
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
              backgroundColor: "#000000",
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
                color: theme.palette.secondary.main,
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
              <span style={{ color: theme.palette.secondary.main }}>
                {" "}
                successfully complete{" "}
              </span>{" "}
              these steps.
            </Typography>
            {steps_form.map((step, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#100d0d",
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

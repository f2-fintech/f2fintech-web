import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
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
    icon: "https://open-frontend-bucket.s3.amazonaws.com/open-capital/onboarding/register/icons/basic-details.svg",
  },
  {
    label: "Statement upload",
    icon: "https://open-frontend-bucket.s3.amazonaws.com/open-capital/onboarding/register/icons/statement.svg",
  },
  {
    label: "Proﬁle details and proof",
    icon: "https://open-frontend-bucket.s3.amazonaws.com/open-capital/onboarding/register/icons/profile-details.svg",
  },
  {
    label: "Additional Details",
    icon: "https://open-frontend-bucket.s3.amazonaws.com/open-capital/onboarding/register/icons/business-details.svg",
  },
];

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [applicationNumber, setApplicationNumber] = useState(null); // for step form 1
  const [applicationData, setApplicationData] = useState(null); // for step form 1

  const { getLocalStorage } = Utility();
  const storedCustomerId = getLocalStorage("customerInfo")?.id;

  // Handle Next button
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Handle form submission to allow progressing
  const handleFormSubmit = () => {
    // Update step completion state based on the current step
    if (activeStep === 0)
      setIsStepCompleted((prev) => ({ ...prev, step2: true }));
    if (activeStep === 1)
      setIsStepCompleted((prev) => ({ ...prev, step3: true }));
    if (activeStep === 2)
      setIsStepCompleted((prev) => ({ ...prev, step4: true }));

    handleNext(); // Proceed to the next step upon successful form submission
  };

  // Fetch application number and loan status using stored customer ID
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (storedCustomerId) {
        try {
          const { data: response } = await API.CustomerInfoAPI.getCustomerInfo(
            storedCustomerId
          );
          if (response.status === "Success") {
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
            applicationNumber={applicationNumber}
            setApplicationNumber={setApplicationNumber}
            onSubmit={handleFormSubmit} // Pass form submission handler
            salary={applicationData?.salary}
          />
        );
      case 1:
        return <Step3Form handleNext={handleNext} />;
      case 2:
        return <Step4Form handleNext={handleNext} />;
      case 3:
        return <Step7Form />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        marginBottom: "15px",
        minHeight: "70vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginBottom: "15px",
          justifyContent: applicationData?.salary ? "center" : "flex-start",
        }}
      >
        {/* // Left side box  */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "50%",
            marginTop: "5vh",
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "260vh", // Adjust height as needed
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box>
              {getStepContent(activeStep)}
              {activeStep === 0 && !applicationData?.salary && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button onClick={handleNext} sx={{ mr: 10 }}>
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
              padding: "20px",
              backgroundColor: "#f5f5f5",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              position: "sticky", // Make the right box sticky
              top: 0,
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ marginBottom: "20px" }}
            >
              Steps Ahead
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ marginBottom: "20px" }}
            >
              In order to receive the loan amount, you will need to successfully
              complete these steps.
            </Typography>
            {steps_form.map((step, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  display: "flex",
                  width: "20vw",
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
                  sx={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
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

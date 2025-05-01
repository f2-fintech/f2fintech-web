// Main Component - EligibilityCriteria.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  useTheme,
  Container,
} from "@mui/material";
import Step1BasicDetails from "./Step1BasicDetails";
import Step2LoanDetails from "./Step2LoanDetails";
import Step3BankOffers from "./Step3BankOffers";
import EligibilityStepDetail from "./EligibilityStepDetail";

const EligibilityCriteria = () => {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [borrower, setBorrower] = useState();
  const [userData, setUserData] = useState({
    name: "",
    contact: "",
    pan: "",
    dob: "",
    loanCategory: "",
    // Additional fields for loan details will be added based on category
  });

  console.log("parentborrower", borrower);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const steps = ["Basic Details", "Loan Information", "Available Offers"];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          height: "calc(100vh - 64px)",
        }}
      >
        {/* Left: Form Section */}
        <Paper
          elevation={3}
          sx={{
            width: { xs: "100%", md: "60%" },
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            overflowY: "hidden",
          }}
        >
          <Box
            sx={{
              bgcolor: theme.palette.primary.main,
              py: 2,
              px: 3,
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight={700}
              textAlign="center"
              color="black"
            >
              Loan Eligibility Check
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 2, sm: 4 }, overflowY: "auto" }}>
            {step === 1 && (
              <Step1BasicDetails
                userData={userData}
                setUserData={setUserData}
                onNext={handleNext}
                borrower={borrower}
                setBorrower={setBorrower}
              />
            )}
            {step === 2 && (
              <Step2LoanDetails
                userData={userData}
                setUserData={setUserData}
                onNext={handleNext}
                onBack={handlePrev}
                borrower={borrower}
              />
            )}
            {step === 3 && (
              <Step3BankOffers
                userData={userData}
                onBack={handlePrev}
                borrower={borrower}
              />
            )}

            {/* <Stepper
              activeStep={step - 1}
              alternativeLabel
              sx={{ mt: 5, mb: 2 }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper> */}
          </Box>
        </Paper>

        {/* Right: Step Info Section */}
        <Paper
          elevation={3}
          sx={{
            width: { xs: "100%", md: "40%" },
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            maxHeight: "100%",
          }}
        >
          <EligibilityStepDetail step={step} />
        </Paper>
      </Box>
    </Container>
  );
};

export default EligibilityCriteria;

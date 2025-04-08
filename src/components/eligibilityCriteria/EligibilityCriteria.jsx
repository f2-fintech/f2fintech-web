import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Step1BasicDetails from "./Step1BasicDetails";
import Step2LoanDetails from "./Step2LoanDetails";
import Step3BankOffers from "./Step3BankOffers";

const EligibilityCriteria = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    contact: "",
    pan: "",
    loanCategory: "",
    // Add fields for loan details based on category
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const steps = ["Basic Details", "Loan Information", "Available Offers"];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        fontWeight={700}
        sx={{ mb: 4 }}
      >
        Loan Eligibility Check
      </Typography>

      <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>
        {step === 1 && (
          <Step1BasicDetails
            userData={userData}
            setUserData={setUserData}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <Step2LoanDetails
            userData={userData}
            setUserData={setUserData}
            onNext={handleNext}
            onBack={handlePrev}
          />
        )}
        {step === 3 && (
          <Step3BankOffers userData={userData} onBack={handlePrev} />
        )}
      </Box>
    </Container>
  );
};

export default EligibilityCriteria;

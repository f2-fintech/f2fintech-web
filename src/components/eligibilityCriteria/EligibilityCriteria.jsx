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
import { Helmet } from "react-helmet-async";

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

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const steps = ["Basic Details", "Loan Information", "Available Offers"];

  return (
    <>
      <Helmet>
        <title></title>
        <meta name="Name" content=" " />
        <link
          rel="canonical"
          href="https://f2fintech.com/eligibility-criteria"
        />
      </Helmet>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            height: { xs: "auto", md: "100%" },
            minHeight: { xs: "100vh", md: "unset" },
            overflow: "hidden",
          }}
        >
          {/* Left: Form Section */}
          <Paper
            elevation={3}
            sx={{
              width: { xs: "100%", md: "auto" },
              display: "flex",
              flexDirection: "column",
              borderRadius: {
                xs: "25px",
                md: "25px 0 0 25px",
              },
              height: "auto",
            }}
          >
            <Box
              sx={{
                bgcolor: "#3244e6",
                py: 2,
                px: 3,
                color: "white",
                borderRadius: {
                  xs: "25px 25px 0 0 ",
                  md: "25px 0px 0 0 ",
                },
              }}
            >
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                color="white"
                fontFamily="Poppins"
              >
                Loan Eligibility Check
              </Typography>
            </Box>

            <Box
              sx={{
                p: { xs: 2, sm: 4 },
                overflowY: "auto",
                fontFamily: "Poppins",
              }}
            >
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
            </Box>
          </Paper>

          {/* Right: Step Info Section */}
          <Paper
            elevation={3}
            sx={{
              width: { xs: "100%", md: "40%" },
              borderRadius: {
                xs: "25px 25px 0 0 ",
                md: " 0 25px  25px 0 ",
              },
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              maxHeight: "100%",
              height: "auto",
            }}
          >
            <EligibilityStepDetail step={step} />
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default EligibilityCriteria;

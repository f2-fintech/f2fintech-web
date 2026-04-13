import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Button,
  Divider,
  Stack,
  InputAdornment,
  useTheme,
  Paper,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MoneyIcon from "@mui/icons-material/Money";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalculateIcon from "@mui/icons-material/Calculate";
import useCreateLeadsInfo from "../../apis/EligibilityLeadsInfo";
import LoanHistorySection from "./LoanHistorySection";
import BusinessLoanFields from "./BusinessLoanFields";
import PropertyInformation from "./PeopertyLoanInfo";
import ProfessionalLoanFields from "./ProfessionalLoanFields";
import FoirCalculator from "./FoirCalculator";

const employmentTypes = ["Category A ", "Category B ", "Category C "];

const Step2LoanDetails = ({
  userData,
  setUserData,
  onNext,
  onBack,
  borrower,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { updateLeadsInfo, isLoading } = useCreateLeadsInfo();

  const validateFields = () => {
    const newErrors = {};

    if (!userData.age || isNaN(userData.age) || userData.age <= 0) {
      newErrors.age = "Valid age is required";
    }

    if (!userData.income || isNaN(userData.income) || userData.income <= 0) {
      newErrors.income = "Monthly income must be a positive number";
    }

    if (!userData.amount || isNaN(userData.amount) || userData.amount <= 0) {
      newErrors.amount = "Loan amount must be a positive number";
    }

    // CIBIL Score
    if (!userData.cibilScore) {
      newErrors.cibilScore = "CIBIL score is required";
    } else if (userData.cibilScore < 300 || userData.cibilScore > 900) {
      newErrors.cibilScore = "CIBIL score must be between 300 and 900";
    }

    // Personal Loan
    if (userData.loanCategory === "Personal") {
      if (!userData.employmentType) {
        newErrors.employmentType = "Employment type is required";
      }
    }

    // Professional Loan
    if (userData.loanCategory === "Professional") {
      if (!userData.employmentType) {
        newErrors.employmentType = "Employment Type is required";
      }

      if (userData.employmentType === "Doctor" && !userData.doctorType) {
        newErrors.doctorType = "Doctor Type is required";
      }

      if (!userData.registrationDate) {
        newErrors.registrationDate = "Registration date is required";
      }

      if (!userData.degree) {
        newErrors.degree = "Degree is required";
      }

      if (!userData.licenseNumber) {
        newErrors.licenseNumber = "License/Registration Number is required";
      }
    }

    // Business Loan
    if (userData.loanCategory === "Business") {
      if (userData.itr && parseFloat(userData.itr) < 0) {
        newErrors.itr = "Enter a valid ITR amount";
      }

      if (userData.turnover && parseFloat(userData.turnover) < 0) {
        newErrors.turnover = "Enter a valid turnover";
      }

      if (userData.profit && parseFloat(userData.profit) < 0) {
        newErrors.profit = "Enter a valid profit";
      }

      if (userData.employmentType && userData.employmentType.trim() === "") {
        newErrors.employmentType = "Employment type is required";
      }

      if (
        userData.date_of_incorporation &&
        userData.date_of_incorporation.trim() === ""
      ) {
        newErrors.date_of_incorporation = "Incorporation date is required";
      }
    }

    // Loan History
    if (userData.loanHistory?.length) {
      userData.loanHistory.forEach((loan, index) => {
        const loanErrors = {};
        if (!loan.type) {
          loanErrors.type = "Loan Type is required";
        }
        if (loan.type === "Credit Card" && !loan.numberOfCards) {
          loanErrors.numberOfCards = "Number of cards is required";
        }
        if (!loan.totalAmount) {
          loanErrors.totalAmount = "Total amount is required";
        }
        if (!loan.pendingAmount) {
          loanErrors.pendingAmount = "Pending amount is required";
        }

        if (Object.keys(loanErrors).length > 0) {
          if (!newErrors.loanHistory) newErrors.loanHistory = [];
          newErrors.loanHistory[index] = loanErrors;
        }
      });
    }

    // FOIR Calculator
    if (!userData.existingObligations) {
      newErrors.existingObligations = "Existing EMI is required";
    } else if (parseFloat(userData.existingObligations) < 0) {
      newErrors.existingObligations = "Amount must be positive";
    }

    if (userData.requestedEmi && parseFloat(userData.requestedEmi) < 0) {
      newErrors.requestedEmi = "Requested EMI cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate FOIR (placeholder - actual implementation should be defined elsewhere)
  const calculateFOIR = () => {
    // Placeholder - implement the actual FOIR calculation logic
    const monthlyIncome = parseFloat(userData.income) || 0;
    const existingEMI = parseFloat(userData.existingObligations) || 0;
    const requestedEMI = parseFloat(userData.requestedEmi) || 0;

    if (monthlyIncome <= 0) return 0;
    return ((existingEMI + requestedEMI) / monthlyIncome) * 100;
  };

  // Get FOIR risk level (placeholder - actual implementation should be defined elsewhere)
  const getFoirRiskLevel = (foirValue) => {
    if (foirValue <= 40) return { status: "Low Risk", color: "success.main" };
    if (foirValue <= 60)
      return { status: "Medium Risk", color: "warning.main" };
    return { status: "High Risk", color: "error.main" };
  };

  // Save handler to calculate FOIR and save all data
  const handleSave = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const calculatedFoir = calculateFOIR();
      const dataToSave = {
        ...userData,
        calculatedFoir,
        foirRiskLevel: getFoirRiskLevel(calculatedFoir).status,
      };
      await updateLeadsInfo(dataToSave);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save data");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "income" ? parseInt(value) : value;

    setUserData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    // Validation logic
    if (name === "income") {
      if (!value || parseInt(value) < 30000) {
        setErrors((prev) => ({
          ...prev,
          income: "Monthly income must be at least ₹30,000",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          income: "",
        }));
      }
    }
  };
  // Handle Next button press - save CIBIL score if provided
  const handleNextWithSave = async () => {
    console.log("borrower", borrower, userData);
    // console.log("cibil", cibil);
    if (!validateFields()) return;
    console.log(">>>>>>>", borrower);

    setLoading(true);
    try {
      await updateLeadsInfo(borrower, userData);
      onNext();
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save data");
    }
    setLoading(false);
  };

  // Get the appropriate icon based on loan category
  const getLoanCategoryIcon = () => {
    switch (userData.loanCategory) {
      case "Business":
        return <BusinessCenterIcon fontSize="large" color="primary" />;
      case "Home loan":
      case "LAP":
        return <HomeWorkIcon fontSize="large" color="primary" />;
      case "Professional":
        return <LocalHospitalIcon fontSize="large" color="primary" />;
      default:
        return <AccountBalanceWalletIcon fontSize="large" color="primary" />;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        {getLoanCategoryIcon()}
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#3244e6",
              fontFamily: "Poppins",
            }}
          >
            {userData.loanCategory} Loan Details
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontFamily: "Poppins",
            }}
          >
            Please provide your financial information to determine eligibility
          </Typography>
        </Box>
      </Box>

      {showSuccessMessage && (
        <Alert
          icon={<CheckCircleOutlineIcon fontSize="inherit" />}
          severity="success"
          sx={{ mb: 3 }}
        >
          Your data has been saved successfully!
        </Alert>
      )}

      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "#3244e6",
            display: "flex",
            alignItems: "center",
            fontFamily: "Poppins",
            gap: 1,
          }}
        >
          <PersonOutlineIcon /> Basic Information
        </Typography>

        {/* Common fields for all loan categories */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              name="age"
              value={userData.age || ""}
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
              fullWidth
              variant="outlined"
              placeholder="Enter your age"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 1.5 },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Monthly Income (INR)"
              name="income"
              value={userData.income || ""}
              onChange={handleChange}
              error={!!errors.income}
              helperText={errors.income}
              fullWidth
              variant="outlined"
              placeholder="Min monthly income must be 30,000"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBalanceWalletIcon color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 1.5 },
              }}
              inputProps={{ min: 30000 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Loan Amount Required (INR)"
              name="amount"
              value={userData.amount || ""}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              fullWidth
              variant="outlined"
              placeholder="Enter required loan amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon color="2f3ee3" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 1.5 },
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Loan History Section with improved styling */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "#3244e6",
            display: "flex",
            fontFamily: "Poppins",
            alignItems: "center",
            gap: 1,
          }}
        >
          <HistoryIcon /> Loan History
        </Typography>
        <LoanHistorySection userData={userData} setUserData={setUserData} />
      </Paper>

      {/* Field for Personal Loans */}
      {userData.loanCategory === "Personal" && (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontFamily: "Poppins",
              fontWeight: 600,
              color: "2f3ee3",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <WorkOutlineIcon /> Employment Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.employmentType}
              >
                <InputLabel>Employment Type</InputLabel>
                <Select
                  name="employmentType"
                  value={userData.employmentType || ""}
                  onChange={handleChange}
                  label="Employment Type"
                  sx={{ borderRadius: 1.5 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <WorkOutlineIcon color="primary" />
                    </InputAdornment>
                  }
                >
                  {employmentTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.employmentType && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ ml: 2, mt: 0.5, fontFamily: "Poppins" }}
                  >
                    {errors.employmentType}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Additional fields for Business Loans */}
      {userData.loanCategory === "Business" && (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "#3245e7",
              display: "flex",
              fontFamily: "Poppins",
              alignItems: "center",
              gap: 1,
            }}
          >
            <BusinessCenterIcon /> Business Information
          </Typography>
          <BusinessLoanFields
            userData={userData}
            handleChange={handleChange}
            setUserData={setUserData}
            errors={errors}
          />
        </Paper>
      )}

      {/* Additional fields for Home Loans and LAP */}
      {["Home loan", "LAP"].includes(userData.loanCategory) && (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "#3244e6",
              fontFamily: "Poppins",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <HomeWorkIcon /> Property Information
          </Typography>
          <PropertyInformation
            userData={userData}
            setUserData={setUserData}
            handleChange={handleChange}
            errors={errors}
          />
        </Paper>
      )}

      {/* Additional fields for Professional Loans */}
      {userData.loanCategory === "Professional" && (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              fontFamily: "Poppins",
              color: "2f3ee3",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocalHospitalIcon /> Professional Information
          </Typography>
          <ProfessionalLoanFields
            userData={userData}
            setUserData={setUserData}
            handleChange={handleChange}
            errors={errors}
          />
        </Paper>
      )}

      {/* FOIR Calculator Section */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#3244e6",
            display: "flex",
            fontFamily: "Poppins",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CalculateIcon /> Payment Capability Analysis
        </Typography>
        <FoirCalculator
          userData={userData}
          setUserData={setUserData}
          handleSave={handleSave}
          loading={loading || isLoading}
          errors={errors}
        />
      </Paper>

      {/* CIBIL Score Section */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#3245e7",
            display: "flex",
            fontFamily: "Poppins",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CreditScoreIcon /> Credit Score
        </Typography>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              label="CIBIL Score"
              name="cibilScore"
              value={userData.cibilScore || ""}
              onChange={handleChange}
              error={!!errors.cibilScore}
              helperText={errors.cibilScore || "Score range: 300-900"}
              fullWidth
              variant="outlined"
              placeholder="Enter your CIBIL score"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditScoreIcon color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 1.5 },
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => console.log("Check CIBIL Score")}
              sx={{
                backgroundColor: "#3244e6",
                color: "#fff",
                "&:hover": { backgroundColor: "#2736c7" },
                borderRadius: 1.5,
                py: 1.5,
                px: 3,
                boxShadow: 2,
                flexShrink: 0,
                fontFamily: "Poppins",
              }}
            >
              Check Score
            </Button>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, fontFamily: "Poppins" }}
          >
            You can also check your CIBIL score with Advance Report for more
            detailed insights.
          </Typography>
        </Stack>
      </Paper>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: "center",
          gap: 2,
          mt: 4,
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onBack}
          startIcon={<ArrowBackIcon />}
          size="large"
          fullWidth={{ xs: true, sm: false }}
          sx={{
            borderRadius: 1.5,
            px: 4,
            py: 1.2,
            color: "#3244e6",
            borderColor: "#3244e6",
            "&:hover": {
              borderColor: "#2736c7",
              backgroundColor: "#f0f2ff",
            },
            fontFamily: "Poppins",
          }}
        >
          Back
        </Button>

        <LoadingButton
          variant="contained"
          onClick={handleNextWithSave}
          loading={loading || isLoading}
          endIcon={<ArrowForwardIcon />}
          size="large"
          fullWidth={{ xs: true, sm: false }}
          sx={{
            borderRadius: 1.5,
            px: 4,
            py: 1.2,
            fontFamily: "Poppins",
            backgroundColor: "#3244e6",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#2736c7",
            },
            boxShadow: 3,
          }}
        >
          Continue to Offers
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Step2LoanDetails;

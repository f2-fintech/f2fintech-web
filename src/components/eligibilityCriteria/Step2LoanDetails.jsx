import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Grid,
  Button,
  Divider,
  Stack,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Alert,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import useCreateLeadsInfo from "../../apis/EligibilityLeadsInfo";
import LoanHistorySection from "./loanHistorySection";
import BusinessLoanFields from "./BusinessLoanFields";
import PropertyInformation from "./PeopertyLoanInfo";

const employmentTypes = ["Category A ", "Category B ", "Category C "];
const employmentTypesBusiness = [
  "Proprietership",
  "Partnership",
  "Private Limited",
];
const employmentTypesHome = [
  "Self Employed",
  "Salaried",
];

const employmentTypesProf = [
  "Self Employed",
  "Salaried",
  "Consultant",
  "Salary & Self Employed",
  "Salary & Consultant",
];

const Step2LoanDetails = ({ userData, setUserData, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const { createLeadInfo, isLoading } = useCreateLeadsInfo();

  // const [userData, setUserData] = useState({
  //   // default fields to avoid undefined errors
  //   registrationType: "None of these",
  //   employmentType: "",
  //   incorporationDate: "",
  // });
  // <LoanHistorySection userData={userData} setUserData={setUserData} />;

  const calculateFOIR = () => {
    const income = parseFloat(userData.income || 0);
    const existing = parseFloat(userData.existingObligations || 0);
    const requested = parseFloat(userData.requestedEmi || 0);
    const totalObligation = existing + requested;

    if (income === 0) return 0;
    return ((totalObligation / income) * 100).toFixed(2);
  };

  // Save handler to calculate FOIR and save all data
  const handleSave = async () => {
    setLoading(true);
    try {
      // Calculate FOIR and add it to userData
      const calculatedFoir = calculateFOIR();
      const dataToSave = {
        ...userData,
        calculatedFoir: calculatedFoir,
        foirRiskLevel: getFoirRiskLevel(calculatedFoir).status,
      };

      // Save to database using your API
      await createLeadInfo(dataToSave);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save data");
    }
    setLoading(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Next button press - save CIBIL score if provided
  const handleNextWithSave = async () => {
    if (userData.cibilScore) {
      setLoading(true);
      try {
        // Save the current data including CIBIL score
        await createLeadInfo(userData);
        console.log("Data with CIBIL score saved");
      } catch (error) {
        console.error("Failed to save CIBIL score:", error);
        alert("Failed to save CIBIL score");
        setLoading(false);
        return; // Stop if save fails
      }
      setLoading(false);
    }
    // Proceed to next step regardless
    onNext();
  };

  // Get FOIR value and determine risk level
  const foirValue = calculateFOIR();
  const getFoirRiskLevel = (foir) => {
    if (foir <= 40) return { status: "Low Risk", color: "success.main" };
    if (foir <= 60) return { status: "Moderate Risk", color: "warning.main" };
    return { status: "High Risk", color: "error.main" };
  };

  const foirRisk = getFoirRiskLevel(foirValue);

  // Normalize FOIR for progress bar (0-100%)
  const normalizedFoir = Math.min(100, parseFloat(foirValue));

  return (
    <Card
      elevation={5}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        maxWidth: 800,
        mx: "auto",
        mb: 4,
      }}
    >
      <CardHeader
        title={`Step 2: ${userData.loanCategory} Loan Details`}
        titleTypographyProps={{ fontWeight: 600 }}
        subheader="Please provide your financial information"
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: 2.5,
          "& .MuiCardHeader-subheader": {
            color: "black.light",
          },
        }}
      />

      <CardContent sx={{ px: 4, pt: 4, pb: 2 }}>
        {/* Common fields for all loan categories */}
        {["Personal", "Business", "Home loan", "LAP", "Professional"].includes(
          userData.loanCategory
        ) && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                name="age"
                value={userData.age || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="Enter your age"
                InputProps={{ sx: { borderRadius: 1.5 } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Monthly Income (INR)"
                name="income"
                value={userData.income || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="Enter your monthly income"
                InputProps={{ sx: { borderRadius: 1.5 } }}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Employment Type</InputLabel>
                <Select
                  name="employmentType"
                  value={userData.employmentType || ""}
                  onChange={handleChange}
                  label="Employment Type"
                  sx={{ borderRadius: 1.5 }}
                >
                  {employmentTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}

            <Grid item xs={12}>
              <TextField
                label="Loan Amount Required (INR)"
                name="loanAmount"
                value={userData.loanAmount || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="Enter required loan amount"
                InputProps={{ sx: { borderRadius: 1.5 } }}
              />
            </Grid>

            <LoanHistorySection userData={userData} setUserData={setUserData} />

            {/* <Grid item xs={12}>
              <TextField
                label="Previous Loan History"
                name="loanHistory"
                value={userData.loanHistory || ""}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                placeholder="E.g., EMI paid on time, no defaults"
                InputProps={{ sx: { borderRadius: 1.5 } }}
              />
            </Grid> */}
          </Grid>
        )}
        {/* Field for Personal Loans */}
        {userData.loanCategory === "Personal" && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Employment Type</InputLabel>
                  <Select
                    name="employmentType"
                    value={userData.employmentType || ""}
                    onChange={handleChange}
                    label="Employment Type"
                    sx={{ borderRadius: 1.5 }}
                  >
                    {employmentTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Additional fields for Business Loans */}
        {userData.loanCategory === "Business" && (
          <BusinessLoanFields
            userData={userData}
            handleChange={handleChange}
            setUserData={setUserData}
          />
        )}

        {/* <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Business Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Company Registration Details"
                  name="companyRegistration"
                  value={userData.companyRegistration || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter company registration details"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="GST Number"
                  name="gstNumber"
                  value={userData.gstNumber || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter GST number"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="ITR Filed for (Years)"
                  name="itrYears"
                  value={userData.itrYears || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="e.g., 3 years"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Employment Type</InputLabel>
                  <Select
                    name="employmentType"
                    value={userData.employmentType || ""}
                    onChange={handleChange}
                    label="Employment Type"
                    sx={{ borderRadius: 1.5 }}
                  >
                    {employmentTypesBusiness.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Company Incorporation Date"
                  name="incorporationDate"
                  type="date"
                  value={userData.incorporationDate || ""}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                />
              </Grid>
            </Grid>
          </Box>
        )} */}

        {/* Additional fields for Home Loans and LAP */}
        {["Home loan", "LAP"].includes(userData.loanCategory) && (
          <PropertyInformation
            userData={userData}
            setUserData={setUserData}
            handleChange={handleChange}
          />
        )}
        {/* <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Property Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Property Location"
                  name="propertyLocation"
                  value={userData.propertyLocation || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter complete property address"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Estimated Property Value (INR)"
                  name="propertyValue"
                  value={userData.propertyValue || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter estimated value"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Employment Type</InputLabel>
                  <Select
                    name="employmentType"
                    value={userData.employmentType || ""}
                    onChange={handleChange}
                    label="Employment Type"
                    sx={{ borderRadius: 1.5 }}
                  >
                    {employmentTypesHome.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box> */}

        {/* Additional fields for Professional Loans */}
        {userData.loanCategory === "Professional" && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Professional Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Employment Type</InputLabel>
                  <Select
                    name="employmentType"
                    value={userData.employmentType || ""}
                    onChange={handleChange}
                    label="Employment Type"
                    sx={{ borderRadius: 1.5 }}
                  >
                    {employmentTypesProf.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Years of Experience"
                  name="experienceYears"
                  value={userData.experienceYears || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter years of experience"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Degree"
                  name="degree"
                  value={userData.degree || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Your highest Qualified Degree"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Professional License/Registration Number"
                  name="licenseNumber"
                  value={userData.licenseNumber || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter license number"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* FOIR Calculator Section */}
        <Box mt={4}>
          <Divider sx={{ mb: 3 }} />
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Fixed Obligations to Income Ratio (FOIR)
            </Typography>
            <Tooltip title="FOIR is the ratio of your monthly loan obligations to your income. A lower FOIR indicates better loan eligibility.">
              <InfoOutlinedIcon fontSize="small" color="primary" />
            </Tooltip>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Existing Monthly Obligations (EMI)"
                name="existingObligations"
                value={userData.existingObligations || ""}
                onChange={handleChange}
                fullWidth
                placeholder="Enter current EMIs"
                type="number"
                InputProps={{ sx: { borderRadius: 1.5 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Requested EMI (Optional)"
                name="requestedEmi"
                value={userData.requestedEmi || ""}
                onChange={handleChange}
                fullWidth
                placeholder="Enter new loan EMI if known"
                type="number"
                InputProps={{ sx: { borderRadius: 1.5 } }}
              />
            </Grid>
          </Grid>

          {/* FOIR Result Display */}
          <Paper
            elevation={0}
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "background.default",
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              Your FOIR: {foirValue}%
            </Typography>

            <Box sx={{ mt: 1, mb: 1 }}>
              <LinearProgress
                variant="determinate"
                value={normalizedFoir}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: foirRisk.color,
                  },
                }}
              />
            </Box>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                0%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                50%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                100%
              </Typography>
            </Stack>

            <Alert
              severity={
                foirValue <= 40
                  ? "success"
                  : foirValue <= 60
                  ? "warning"
                  : "error"
              }
              sx={{ mt: 2, borderRadius: 1.5 }}
            >
              <Typography variant="body2">
                <strong>Status:</strong> {foirRisk.status}
                {foirValue <= 40 && " - You have good loan eligibility"}
                {foirValue > 40 &&
                  foirValue <= 60 &&
                  " - You may qualify for some loans"}
                {foirValue > 60 &&
                  " - It may be difficult to get loan approval"}
              </Typography>
            </Alert>
          </Paper>

          {/* Save Button for FOIR calculation */}
          <Box mt={2}>
            <LoadingButton
              variant="contained"
              color="secondary"
              onClick={handleSave}
              loading={loading || isLoading}
              sx={{ borderRadius: 1.5 }}
            >
              Calculate & Save Data
            </LoadingButton>
          </Box>
        </Box>

        {/* CIBIL Score Section */}
        <Box mt={4}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            CIBIL Score
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
                fullWidth
                variant="outlined"
                placeholder="Enter your CIBIL score"
                InputProps={{ sx: { borderRadius: 1.5 } }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => console.log("Check CIBIL Score")}
                sx={{ whiteSpace: "nowrap", borderRadius: 1.5 }}
              >
                Check CIBIL Score
              </Button>
            </Stack>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              You can also check your CIBIL score with Advance Report.
            </Typography>
          </Stack>
        </Box>
      </CardContent>

      <Divider />
      <CardActions sx={{ px: 4, py: 2, justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          onClick={onBack}
          startIcon={<ArrowBackIcon />}
          size="large"
          sx={{
            borderRadius: 1.5,
            px: 3,
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
          sx={{
            borderRadius: 1.5,
            px: 3,
            boxShadow: 2,
          }}
        >
          Next
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default Step2LoanDetails;

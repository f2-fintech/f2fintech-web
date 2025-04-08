import React from "react";
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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const employmentTypes = [
  "Company A (Upper)",
  "Company B (Medium)",
  "Company C (Lower)",
];

const Step2LoanDetails = ({ userData, setUserData, onNext, onBack }) => {
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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
            color: "primary.light",
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

            <Grid item xs={12} sm={6}>
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
            </Grid>

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

            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        )}

        {/* Additional fields for Business Loans */}
        {userData.loanCategory === "Business" && (
          <Box mt={4}>
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

              <Grid item xs={12}>
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
        )}

        {/* Additional fields for Home Loans and LAP */}
        {["Home loan", "LAP"].includes(userData.loanCategory) && (
          <Box mt={4}>
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
            </Grid>
          </Box>
        )}

        {/* Additional fields for Professional Loans */}
        {userData.loanCategory === "Professional" && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Professional Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Profession Type"
                  name="professionType"
                  value={userData.professionType || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="E.g., Doctor, Architect, Consultant"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                />
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
          onClick={onNext}
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

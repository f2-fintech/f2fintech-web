import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Grid,
  InputAdornment,
  Divider,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import CakeIcon from "@mui/icons-material/Cake";
import CategoryIcon from "@mui/icons-material/Category";
import useCreateLeadsInfo from "../../apis/EligibilityLeadsInfo";

const loanCategories = [
  "Personal",
  "Business",
  "Home loan",
  "LAP",
  "Professional",
];

const Step1BasicDetails = ({
  userData,
  setUserData,
  onNext,
  borrower,
  setBorrower,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const { createLeadsInfo } = useCreateLeadsInfo();

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validate = () => {
    const errors = {};

    if (!userData.name || userData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }

    if (!userData.contact || !/^[6-9]\d{9}$/.test(userData.contact)) {
      errors.contact = "Enter a valid 10-digit contact number";
    }

    if (!userData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(userData.pan)) {
      errors.pan = "Invalid PAN format";
    }

    if (!userData.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const age = calculateAge(userData.dob);
      if (age < 21) {
        errors.dob = "Applicant must be at least 21 years old";
      }
    }

    if (!userData.loanCategory) {
      errors.loanCategory = "Please select a loan category";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitLeadsInfo = async () => {
    if (!validate()) return;

    setLoading(true);
    setError("");

    const age = calculateAge(userData.dob);
    setUserData((prev) => ({ ...prev, age }));

    const payload = {
      name: userData.name,
      contact: userData.contact,
      pan: userData.pan,
      dob: userData.dob,
      loanCategory: userData.loanCategory,
    };

    try {
      const response = await createLeadsInfo(payload);
      if (response.success) {
        console.log("response", response);
        setBorrower(response.data.data.id)
        toast.success("Basic information saved successfully!");
        onNext(); // move to next step
      } else {
        throw new Error(response.error || "Something went wrong");
      }
    } catch (err) {
      setError(err.message || "Failed to save data.");
      toast.error(err.message || "Failed to save data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: "" }); // clear error
  };

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 3,
        }}
      >
        Personal Information
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: theme.palette.text.secondary,
        }}
      >
        Please provide your basic details to help us determine loan eligibility.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Full Name"
            name="name"
            value={userData.name || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
            error={!!validationErrors.name}
            helperText={validationErrors.name}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Contact Number"
            name="contact"
            type="number"
            value={userData.contact || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="primary" />
                </InputAdornment>
              ),
            }}
            error={!!validationErrors.contact}
            helperText={validationErrors.contact}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="PAN Card Number"
            name="pan"
            value={userData.pan || ""}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon color="primary" />
                </InputAdornment>
              ),
            }}
            error={!!validationErrors.pan}
            helperText={validationErrors.pan || "Format: ABCDE1234F"}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={userData.dob || ""}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CakeIcon color="primary" />
                </InputAdornment>
              ),
            }}
            error={!!validationErrors.dob}
            helperText={validationErrors.dob}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!validationErrors.loanCategory}>
            <InputLabel>Loan Category</InputLabel>
            <Select
              name="loanCategory"
              value={userData.loanCategory || ""}
              onChange={handleChange}
              label="Loan Category"
              startAdornment={
                <InputAdornment position="start">
                  <CategoryIcon color="primary" />
                </InputAdornment>
              }
            >
              {loanCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            {validationErrors.loanCategory && (
              <Typography
                variant="caption"
                color="error"
                sx={{ ml: 2, mt: 0.5 }}
              >
                {validationErrors.loanCategory}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5, textAlign: "center" }}>
        <LoadingButton
          onClick={submitLeadsInfo}
          variant="contained"
          loading={loading}
          size="large"
          sx={{
            px: 6,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          Continue to Loan Details
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Step1BasicDetails;

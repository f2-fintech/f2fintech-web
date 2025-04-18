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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
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
  setCibilScore,
  onNext,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { createLeadsInfo } = useCreateLeadsInfo();

const submitLeadsInfo = async () => {
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
      onNext(); // move to next step
    } else {
      throw new Error(response.error || "Something went wrong");
    }
  } catch (err) {
    setError(err.message || "Failed to save data.");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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

  const fetchCibilScore = async () => {
    setLoading(true);
    setError("");

    const age = calculateAge(userData.dob);
    setUserData((prev) => ({ ...prev, age }));
    onNext(); // proceed only after score is fetched

    try {
      const response = await fetch("/api/getCibilScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pan: userData.pan }),
      });
      const data = await response.json();

      if (data?.cibilScore) {
        setCibilScore(data.cibilScore);
        setUserData((prev) => ({ ...prev, cibilScore: data.cibilScore }));
      } else {
        throw new Error("Invalid PAN or no score found.");
      }
    } catch (err) {
      setError("Failed to fetch CIBIL score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 4,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        mt: 4,
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Step 1: Enter Basic Details
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Full Name"
        name="name"
        value={userData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Contact Number"
        name="contact"
        value={userData.contact}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="PAN Card Number"
        name="pan"
        value={userData.pan}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText="PAN should be in format ABCDE1234F"
      />

      <TextField
        label="Date of Birth"
        name="dob"
        type="date"
        value={userData.dob || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Loan Category</InputLabel>
        <Select
          name="loanCategory"
          value={userData.loanCategory || ""}
          onChange={handleChange}
          label="Loan Category"
        >
          {loanCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LoadingButton
        onClick={submitLeadsInfo} 
        variant="contained"
        loading={loading}
        fullWidth
        sx={{ mt: 3 }}
      >
        Submit
      </LoadingButton>
    </Box>
  );
};

export default Step1BasicDetails;

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

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const fetchCibilScore = async () => {
    setLoading(true);
    setError("");
    onNext();
    try {
      const response = await fetch("/api/getCibilScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pan: userData.pan }),
      });
      const data = await response.json();
      if (data?.cibilScore) {
        setCibilScore(data.cibilScore);
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
        onClick={fetchCibilScore}
        variant="contained"
        loading={loading}
        fullWidth
        sx={{ mt: 3 }}
      >
        Submit & Check CIBIL
      </LoadingButton>
    </Box>
  );
};

export default Step1BasicDetails;

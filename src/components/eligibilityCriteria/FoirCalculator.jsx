import React from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Stack,
  Divider,
  Tooltip,
  LinearProgress,
  Alert,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { LoadingButton } from "@mui/lab";

const FoirCalculator = ({
  userData,
  setUserData,
  handleSave,
  loading,
  errors,
}) => {
  const calculateFOIR = () => {
    const income = parseFloat(userData.income || 0);
    const existing = parseFloat(userData.existingObligations || 0);
    const requested = parseFloat(userData.requestedEmi || 0);
    const totalObligation = existing + requested;

    if (income === 0) return 0;
    return ((totalObligation / income) * 100).toFixed(2);
  };

  const foirValue = calculateFOIR();

  const getFoirRiskLevel = (foir) => {
    if (foir <= 40) return { status: "Low Risk", color: "success.main" };
    if (foir <= 60) return { status: "Moderate Risk", color: "warning.main" };
    return { status: "High Risk", color: "error.main" };
  };

  const foirRisk = getFoirRiskLevel(foirValue);
  const normalizedFoir = Math.min(100, parseFloat(foirValue));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box mt={4}>
      <Divider sx={{ mb: 3 }} />
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
          }}
          variant="h6"
          fontWeight={600}
        >
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
            error={!!errors?.existingObligations}
            helperText={errors?.existingObligations}
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
            error={!!errors?.requestedEmi}
            helperText={errors?.requestedEmi}
          />
        </Grid>
      </Grid>

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
            foirValue <= 40 ? "success" : foirValue <= 60 ? "warning" : "error"
          }
          sx={{ mt: 2, borderRadius: 1.5 }}
        >
          <Typography variant="body2">
            <strong>Status:</strong> {foirRisk.status}
            {foirValue <= 40 && " - You have good loan eligibility"}
            {foirValue > 40 &&
              foirValue <= 60 &&
              " - You may qualify for some loans"}
            {foirValue > 60 && " - It may be difficult to get loan approval"}
          </Typography>
        </Alert>
      </Paper>

      {/* <Box mt={2}>
        <LoadingButton
          variant="contained"
          color="secondary"
          onClick={handleSave}
          loading={loading}
          sx={{ borderRadius: 1.5 }}
        >
          Calculate & Save Data
        </LoadingButton>
      </Box> */}
    </Box>
  );
};

export default FoirCalculator;

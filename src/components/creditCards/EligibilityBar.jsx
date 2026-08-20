import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { toast } from "react-toastify";

export default function EligibilityBar({ onApplyEligibility, onClearEligibility, isApplied }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [pincode, setPincode] = useState("");
  const [inhandIncome, setInhandIncome] = useState("");
  const [empStatus, setEmpStatus] = useState("salaried");
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    if (!pincode || pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }
    if (!inhandIncome || parseInt(inhandIncome) < 1000) {
      toast.error("Please enter a valid monthly income.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onApplyEligibility({ pincode, inhandIncome: parseInt(inhandIncome), empStatus });
      toast.success("Eligibility criteria applied!");
      setLoading(false);
    }, 400);
  };

  const handleClear = () => {
    setPincode("");
    setInhandIncome("");
    setEmpStatus("salaried");
    onClearEligibility();
    toast.info("Eligibility filter cleared");
  };

  return (
    <Box
      sx={{
        p: { xs: 2.5, sm: 3 },
        mb: 4,
        borderRadius: "24px",
        background: isDark ? "rgba(30, 41, 59, 0.5)" : "#ffffff",
        backdropFilter: "blur(14px)",
        border: `1px solid ${
          isApplied
            ? isDark
              ? "rgba(16, 185, 129, 0.4)"
              : "#10b981"
            : isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(50,68,230,0.08)"
        }`,
        boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.2)" : "0 10px 30px rgba(50,68,230,0.04)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2 }}>
        <VerifiedUserIcon sx={{ color: isApplied ? "#10b981" : isDark ? "#38bdf8" : "#3244e6" }} />
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
            Check Your Card Eligibility
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
            Instant check based on pincode, monthly income & employment status
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} alignItems="center">
        {/* Pincode */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Pincode"
            placeholder="6-digit pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputProps={{ maxLength: 6, style: { fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" } }}
            InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" } }}
          />
        </Grid>

        {/* Monthly Income */}
        <Grid item xs={12} sm={6} md={3.5}>
          <TextField
            fullWidth
            size="small"
            label="Monthly Income (₹)"
            placeholder="e.g. 50,000"
            type="number"
            value={inhandIncome}
            onChange={(e) => setInhandIncome(e.target.value)}
            inputProps={{ style: { fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" } }}
            InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" } }}
          />
        </Grid>

        {/* Employment Status */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <Select
              value={empStatus}
              onChange={(e) => setEmpStatus(e.target.value)}
              sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem", borderRadius: "8px" }}
            >
              <MenuItem value="salaried" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>
                Salaried
              </MenuItem>
              <MenuItem value="self_employed" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>
                Self-Employed
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Action Button */}
        <Grid item xs={12} sm={6} md={2.5}>
          {isApplied ? (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<RestartAltIcon />}
              onClick={handleClear}
              sx={{
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                py: 0.9,
              }}
            >
              Reset
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <CheckCircleIcon />}
              onClick={handleCheck}
              sx={{
                background: isDark
                  ? "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
                  : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "50px",
                py: 0.9,
                fontFamily: "'Poppins', sans-serif",
                boxShadow: isDark
                  ? "0 4px 14px rgba(59,130,246,0.3)"
                  : "0 4px 14px rgba(50,68,230,0.25)",
                "&:hover": {
                  background: isDark
                    ? "linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)"
                    : "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                },
              }}
            >
              {loading ? "Checking..." : "Check Eligibility"}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

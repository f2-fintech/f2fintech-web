import React, { useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { color } from "framer-motion";

const loanTypes = [
  "Personal Loan",
  "Home Loan",
  "LAP",
  "Professional Loan",
  "Other",
];

const LoanHistorySection = ({ userData, setUserData }) => {
  const [loanHistory, setLoanHistory] = useState([
    { type: "", totalAmount: "", pendingAmount: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...loanHistory];
    updated[index][field] = value;
    setLoanHistory(updated);

    // Update main userData
    setUserData((prev) => ({ ...prev, loanHistory: updated }));
  };

  const handleAddLoan = () => {
    setLoanHistory([
      ...loanHistory,
      { type: "", totalAmount: "", pendingAmount: "" },
    ]);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Previous Loan History{" "}
          <Box
            component="span"
            sx={{ color: "gray", fontWeight: 400, fontSize: "0.875rem" }}
          >
            (if any)
          </Box>
        </Typography>
      </Grid>

      {loanHistory.map((loan, index) => (
        <Grid item xs={12} key={index} container spacing={2}>
          <Grid item xs={4}>
            <TextField
              select
              label="Loan Type"
              value={loan.type}
              onChange={(e) => handleChange(index, "type", e.target.value)}
              fullWidth
              size="small"
              variant="outlined"
            >
              {loanTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Total Loan Amount"
              type="number"
              value={loan.totalAmount}
              onChange={(e) =>
                handleChange(index, "totalAmount", e.target.value)
              }
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Pending Amount"
              type="number"
              value={loan.pendingAmount}
              onChange={(e) =>
                handleChange(index, "pendingAmount", e.target.value)
              }
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>

          {index === loanHistory.length - 1 && (
            <Grid item xs={1} sx={{ display: "flex", alignItems: "center" }}>
              <IconButton color="primary" onClick={handleAddLoan}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ))}
    </>
  );
};

export default LoanHistorySection;

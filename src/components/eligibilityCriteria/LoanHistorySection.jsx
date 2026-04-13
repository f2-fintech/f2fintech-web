import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  IconButton,
  MenuItem,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const loanTypes = [
  "Personal Loan",
  "Home Loan",
  "LAP",
  "Professional Loan",
  "Gold Loan",
  "Credit Card",
  "Other",
];

const LoanHistorySection = ({ userData, setUserData, errors }) => {
  const [loanHistory, setLoanHistory] = useState([
    { type: "", totalAmount: "", pendingAmount: "", numberOfCards: "" },
  ]);
  const [totalObligations, setTotalObligations] = useState(0);

  const handleChange = (index, field, value) => {
    const updated = [...loanHistory];
    updated[index][field] = value;
    setLoanHistory(updated);
    setUserData((prev) => ({ ...prev, loanHistory: updated }));
  };

  const handleAddLoan = () => {
    setLoanHistory([
      ...loanHistory,
      { type: "", totalAmount: "", pendingAmount: "", numberOfCards: "" },
    ]);
  };

  useEffect(() => {
    const total = loanHistory.reduce((acc, curr) => {
      const amount = parseFloat(curr.totalAmount || 0);
      return acc + amount;
    }, 0);
    setTotalObligations(total);
  }, [loanHistory]);

  return (
    <Box component={Paper} variant="outlined" sx={{ p: 3, mt: 4 }}>

      {loanHistory.map((loan, index) => {
        const isCreditCard = loan.type === "Credit Card";
        return (
          <Box
            key={index}
            sx={{ mb: 3, p: 2, border: "1px solid #eee", borderRadius: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  label="Loan Type"
                  value={loan.type}
                  onChange={(e) => handleChange(index, "type", e.target.value)}
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!errors?.loanHistory?.[index]?.type}
                  helperText={errors?.loanHistory?.[index]?.type}
                >
                  {loanTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {isCreditCard && (
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Number of Cards"
                    type="number"
                    value={loan.numberOfCards}
                    onChange={(e) =>
                      handleChange(index, "numberOfCards", e.target.value)
                    }
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={!!errors?.loanHistory?.[index]?.numberOfCards}
                    helperText={errors?.loanHistory?.[index]?.numberOfCards}
                  />
                </Grid>
              )}

              <Grid item xs={12} md={4}>
                <TextField
                  label={
                    isCreditCard ? "Total Utilized Amount" : "Total Loan Amount"
                  }
                  type="number"
                  value={loan.totalAmount}
                  onChange={(e) =>
                    handleChange(index, "totalAmount", e.target.value)
                  }
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!errors?.loanHistory?.[index]?.totalAmount}
                  helperText={errors?.loanHistory?.[index]?.totalAmount}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label={
                    isCreditCard ? "Total of all Card Amount" : "Pending Amount"
                  }
                  type="number"
                  value={loan.pendingAmount}
                  onChange={(e) =>
                    handleChange(index, "pendingAmount", e.target.value)
                  }
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!errors?.loanHistory?.[index]?.pendingAmount}
                  helperText={errors?.loanHistory?.[index]?.pendingAmount}
                />
              </Grid>

              {index === loanHistory.length - 1 && (
                <Grid
                  item
                  xs={12}
                  md={1}
                  sx={{ display: "flex", alignItems: "center", pl: 1 }}
                >
                  <IconButton color="primary" onClick={handleAddLoan}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Box>
        );
      })}

      <Divider sx={{ my: 2 }} />
      <Typography
        sx={{
          fontFamily: "Poppins",
        }}
        variant="subtitle1"
        fontWeight={600}
      >
        Total Obligations: ₹{totalObligations.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default LoanHistorySection;

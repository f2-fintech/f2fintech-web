import React from "react";
import {
  Box,
  Typography,
  Alert,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Step3BankOffers = ({ cibilScore, onBack }) => {
  const offers = [
    { bank: "HDFC", interest: "10.5%", maxLoan: "15L", minScore: 700 },
    { bank: "ICICI", interest: "11.2%", maxLoan: "10L", minScore: 650 },
    { bank: "SBI", interest: "12%", maxLoan: "8L", minScore: 600 },
  ];

  const eligibleBanks = offers.filter((offer) => cibilScore >= offer.minScore);

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
        Step 3: Loan Offers
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Your CIBIL Score: <strong>{cibilScore}</strong>
      </Typography>

      {eligibleBanks.length === 0 ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          No eligible offers found based on your CIBIL score.
        </Alert>
      ) : (
        <List>
          {eligibleBanks.map((bank, idx) => (
            <ListItem
              key={idx}
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                mb: 1,
              }}
            >
              <ListItemText
                primary={<Typography fontWeight={600}>{bank.bank}</Typography>}
                secondary={`Interest: ${bank.interest}, Max Loan: ${bank.maxLoan}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Button onClick={onBack} variant="outlined" fullWidth sx={{ mt: 3 }}>
        Back
      </Button>
    </Box>
  );
};

export default Step3BankOffers;

import React, { useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const registrationOptions = ["GST", "Udhyam", "None of these"];

const BusinessLoanFields = ({ userData, handleChange }) => {
  const [registrationType, setRegistrationType] = useState(
    userData.registrationType || "None of these"
  );

  return (
    <Box mt={4}>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Business Information
      </Typography>

      <Grid container spacing={3}>
        {/* Registration Dropdown */}
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Company Registration Type</InputLabel>
            <Select
              name="registrationType"
              value={registrationType}
              onChange={(e) => {
                setRegistrationType(e.target.value);
                handleChange({
                  target: { name: "registrationType", value: e.target.value },
                });
              }}
              label="Company Registration Type"
              sx={{ borderRadius: 1.5 }}
              autoWidth
            >
              {registrationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Conditional Registration Number Input */}
        {registrationType !== "None of these" && (
          <Grid item xs={12}>
            <TextField
              label={`${registrationType} Number`}
              name="registrationNumber"
              value={userData.registrationNumber || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              placeholder={`Enter ${registrationType} number`}
              InputProps={{ sx: { borderRadius: 1.5 } }}
            />
          </Grid>
        )}

        {/* Income Info: ITR, Turnover, Profit, Banking Turnover */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="ITR"
            name="itr"
            value={userData.itr || ""}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Enter ITR amount"
            InputProps={{ sx: { borderRadius: 1.5 } }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Turnover"
            name="turnover"
            value={userData.turnover || ""}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Enter annual turnover"
            InputProps={{ sx: { borderRadius: 1.5 } }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Profit"
            name="profit"
            value={userData.profit || ""}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Enter profit"
            InputProps={{ sx: { borderRadius: 1.5 } }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            disabled
            label="Banking Turnover"
            name="bankingTurnover"
            value={userData.bankingTurnover || ""}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Banking Turnover (paid)"
            InputProps={{ sx: { borderRadius: 1.5 } }}
          />
          <Button
            sx={{
              mt: 1,
              color: "#5c5c5c", // slightly darker than gray
              borderColor: "#5c5c5c",
              "&:hover": {
                backgroundColor: "gray", // subtle light gray on hover
                borderColor: "#5c5c5c",
                color:"white"
              },
              textTransform: "none", // optional: keeps the text from being all-uppercase
            }}
            variant="outlined"
            size="small"
            onClick={() =>
              window.open("https://your-payment-page.com", "_blank")
            }
          >
            Get via Paid Service
          </Button>
        </Grid>

        {/* Employment Type */}
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
              {["Self-employed", "Partner", "Director", "Proprietor"].map(
                (type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Incorporation Date */}
        <Grid item xs={12} sm={6}>
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
  );
};

export default BusinessLoanFields;

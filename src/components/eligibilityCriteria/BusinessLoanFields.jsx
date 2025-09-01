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

const BusinessLoanFields = ({ userData, handleChange, errors }) => {
  const [registrationType, setRegistrationType] = useState(
    userData.registrationType || "None of these"
  );

  return (
    <Box mt={4}>
      <Divider sx={{ mb: 3 }} />
      {/* <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Business Information
      </Typography> */}

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
            {!!errors?.registrationType && (
              <Typography
                sx={{
                  fontFamily: "Poppins",
                }}
                variant="caption"
                color="error"
              >
                {errors.registrationType}
              </Typography>
            )}
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
              error={!!errors?.registrationNumber}
              helperText={errors?.registrationNumber}
            />
          </Grid>
        )}

        {/* Income Info: ITR, Turnover, Profit, Banking Turnover */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="ITR"
            name="itr"
            type="number"
            value={userData.itr || ""}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Enter ITR amount"
            InputProps={{ sx: { borderRadius: 1.5 } }}
            error={!!errors?.itr}
            helperText={errors?.itr}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Turnover"
            name="turnover"
            type="number"
            value={userData.turnover || ""}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Enter annual turnover"
            InputProps={{ sx: { borderRadius: 1.5 } }}
            error={!!errors?.turnover}
            helperText={errors?.turnover}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Profit"
            name="profit"
            type="number"
            value={userData.profit || ""}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Enter profit"
            InputProps={{ sx: { borderRadius: 1.5 } }}
            error={!!errors?.profit}
            helperText={errors?.profit}
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
              color: "#2f3ee3",
              borderColor: "#2f3ee3",
              "&:hover": {
                backgroundColor: "#2f3ee3",
                borderColor: "#2f3ee3",
                color: "white",
              },
              textTransform: "none",
              fontFamily: "Poppins",
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
              {[
                "Sole Partnership",
                "Proprietorship",
                "Limited Liability Company (LLC)",
                "Corporation",
              ].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {!!errors?.employmentType && (
              <Typography variant="caption" color="error">
                {errors.employmentType}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Incorporation Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company Incorporation Date"
            name="date_of_incorporation"
            type="date"
            value={userData.date_of_incorporation || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 1.5 } }}
            error={!!errors?.date_of_incorporation}
            helperText={errors?.date_of_incorporation}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessLoanFields;

import React from "react";
import {
  Box,
  Divider,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const employmentTypesProf = [
  "Self Employed",
  "Salaried",
  "Consultant",
  "Salary & Self Employed",
  "Salary & Consultant",
  "Doctor",
  "CA",
];

const doctorTypes = [
  "MBBS",
  "BHMS",
  "BAMS",
  "BUMS",
  "BDS",
  "MDS",
  "MD",
  "MS",
  "DM",
];

const ProfessionalLoanFields = ({ userData, handleChange, errors }) => {
  return (
    <>
      {userData.loanCategory === "Professional" && (
        <Box mt={4}>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
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
                  {employmentTypesProf.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors?.employmentType && (
                  <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                    {errors.employmentType}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {userData.employmentType === "Doctor" && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Doctor Type</InputLabel>
                  <Select
                    name="doctorType"
                    value={userData.doctorType || ""}
                    onChange={handleChange}
                    label="Doctor Type"
                    sx={{ borderRadius: 1.5 }}
                  >
                    {doctorTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors?.doctorType && (
                    <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                      {errors.doctorType}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Date of Registration"
                name="registrationDate"
                value={userData.registrationDate || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{ sx: { borderRadius: 1.5 } }}
                error={!!errors?.registrationDate}
                helperText={errors?.registrationDate}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Degree"
                name="degree"
                value={userData.degree || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="Your highest Qualified Degree"
                InputProps={{ sx: { borderRadius: 1.5 } }}
                error={!!errors?.degree}
                helperText={errors?.degree}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Professional License/Registration Number"
                name="licenseNumber"
                value={userData.licenseNumber || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="Enter license number"
                InputProps={{ sx: { borderRadius: 1.5 } }}
                error={!!errors?.licenseNumber}
                helperText={errors?.licenseNumber}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ProfessionalLoanFields;

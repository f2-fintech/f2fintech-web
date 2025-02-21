import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const countries = [
  { code: "US", label: "United States" },
  { code: "IN", label: "India" },
  { code: "GB", label: "United Kingdom" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "AU", label: "Australia" },
  { code: "CN", label: "China" },
];

const CountryDropdown = () => {
  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={countries}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Select Country" />
        )}
      />
    </Box>
  );
};

export default CountryDropdown;

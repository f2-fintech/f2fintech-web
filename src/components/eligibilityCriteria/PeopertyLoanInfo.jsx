import React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const propertyTypes = [
  "Land",
  "Flat",
  "Farmhouse",
  "Home",
  "Shop",
  "Farming Land",
];

const ownershipTypes = ["Self Owned", "Willed"];
const employmentTypesHome = ["Self Employed", "Salaried"];

const PropertyInformation = ({
  userData,
  setUserData,
  handleChange,
  errors,
}) => {
  const properties = userData?.properties || [
    { type: "", ownership: "", location: "", value: "" },
  ];

  const handlePropertyChange = (index, field, value) => {
    const updated = [...properties];
    updated[index][field] = value;
    setUserData((prev) => ({ ...prev, properties: updated }));
  };

  const addPropertySection = () => {
    const updated = [
      ...properties,
      { type: "", ownership: "", location: "", value: "" },
    ];
    setUserData((prev) => ({ ...prev, properties: updated }));
  };

  const handleBankingTurnoverClick = () => {
    window.open("https://your-banking-turnover-service.com", "_blank");
  };
  return (
    <Box mt={4}>
      <Divider sx={{ mb: 3 }} />
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mb: 2, fontFamily: "Poppins" }}
      >
        Property Information
      </Typography>

      {properties.map((property, index) => (
        <Grid container spacing={3} key={index} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Property Type</InputLabel>
              <Select
                value={property.type}
                label="Property Type"
                onChange={(e) =>
                  handlePropertyChange(index, "type", e.target.value)
                }
                sx={{ borderRadius: 1.5 }}
              >
                {propertyTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {errors?.properties?.[index]?.type && (
                <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                  {errors.properties[index].type}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Ownership Type</InputLabel>
              <Select
                value={property.ownership}
                label="Ownership Type"
                onChange={(e) =>
                  handlePropertyChange(index, "ownership", e.target.value)
                }
                sx={{ borderRadius: 1.5 }}
              >
                {ownershipTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {errors?.properties?.[index]?.ownership && (
                <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                  {errors.properties[index].type}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Property Location"
              value={property.location}
              onChange={(e) =>
                handlePropertyChange(index, "location", e.target.value)
              }
              fullWidth
              placeholder="Enter city"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 1.5 } }}
            />
            {errors?.properties?.[index]?.location && (
              <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                {errors.properties[index].type}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Estimated Value (INR)"
              value={property.value}
              onChange={(e) =>
                handlePropertyChange(index, "value", e.target.value)
              }
              fullWidth
              placeholder="Enter value"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 1.5 } }}
            />
          </Grid>
          {errors?.properties?.[index]?.value && (
            <Typography variant="caption" color="error" sx={{ ml: 1 }}>
              {errors.properties[index].type}
            </Typography>
          )}
        </Grid>
      ))}

      <Box textAlign="left" sx={{ mb: 3 }}>
        <IconButton color="primary" onClick={addPropertySection}>
          <AddCircleIcon />
        </IconButton>
        <Typography display="inline" sx={{ ml: 1 }}>
          Add another property
        </Typography>
      </Box>

      {/* Static Section: Banking Turnover + Employment Type */}
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Button
            onClick={handleBankingTurnoverClick}
            variant="outlined"
            fullWidth
            sx={{ height: "56px", borderRadius: 1.5 }}
          >
            Check Banking Turnover (Paid)
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Employment Type</InputLabel>
            <Select
              name="employmentType"
              value={userData?.employmentType || ""}
              onChange={handleChange}
              label="Employment Type"
              sx={{ borderRadius: 1.5 }}
            >
              {employmentTypesHome.map((type) => (
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
      </Grid>
    </Box>
  );
};

export default PropertyInformation;

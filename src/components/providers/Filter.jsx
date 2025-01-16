import PropTypes from "prop-types";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Filter = ({ filter, setFilter }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
      <FormControl fullWidth sx={{ width: "15%" }}>
        {/* InputLabel with permanent white color */}
        <InputLabel id="filter-label" sx={{ color: "white" }}>
          Sort By
        </InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          label="Sort By"
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            color: "white", // Text color in the dropdown
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Border color for the dropdown
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Border color on hover
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "black", // Background color for the dropdown menu
                "& .MuiMenuItem-root": {
                  color: "white", // Text color for menu items
                  "&:hover": {
                    bgcolor: "gray", // Hover background color for menu items
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="name">Best Match</MenuItem>
          <MenuItem value="interestRate">Interest Rate</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;

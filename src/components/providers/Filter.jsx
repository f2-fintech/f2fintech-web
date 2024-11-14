import PropTypes from "prop-types";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Filter = ({ filter, setFilter }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
      <FormControl fullWidth sx={{ width: "15%" }}>
        <InputLabel id="filter-label">Sort By</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          label="Sort By"
          onChange={(e) => setFilter(e.target.value)}
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

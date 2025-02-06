import PropTypes from "prop-types";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Filter = ({ filter, setFilter }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: {
          xs: "center",
          lg: "flex-end",
          sm: "flex-end",
          xl: "flex-end",
        },
        mb: 2,
      }}
    >
      <FormControl fullWidth sx={{ width: { md: "15%", sm: "30%", xs:"60%"}
     }}>
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
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "black",
                "& .MuiMenuItem-root": {
                  color: "white",
                  fontSize: { xs: "14px", sm: "16px" },
                  "&:hover": {
                    bgcolor: "gray",
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

import PropTypes from "prop-types";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const Filter = ({ filter, setFilter }) => {
  const theme = useTheme();
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
      <FormControl sx={{ minWidth: 200, backgroundColor: "white" }}>
        {/* InputLabel with permanent white color */}
        <InputLabel
          id="filter-label"
          sx={{ color: theme.palette.text.primary }}
        >
          Sort By
        </InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          label="Sort By"
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            color: theme.palette.text.primary,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.primary,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.main,
            },
            "& .MuiSvgIcon-root": { color: "white" },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: theme.palette.secondary.main,
                "& .MuiMenuItem-root": {
                  color: theme.palette.whitetext.white,
                  fontSize: { xs: "14px", sm: "16px" },
                  "&:hover": {
                    bgcolor: "#333",
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

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
      <FormControl 
        sx={{ 
          minWidth: 200, 
          backgroundColor: "transparent",
        }}
      >
        <InputLabel
          id="filter-label"
          sx={{ 
            color: "#6c757d", 
            fontFamily: "Poppins",
            fontWeight: 500,
          }}
        >
          Sort By
        </InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          label="Sort By"
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#2c3e50",
            borderRadius: "12px",
            background: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e0e0e0",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3244e6",
            },
            "& .MuiSvgIcon-root": { color: "#3244e6" },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "12px",
                mt: 1,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                "& .MuiMenuItem-root": {
                  fontFamily: "Poppins",
                  fontSize: "0.9rem",
                  color: "#2c3e50",
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "rgba(50, 68, 230, 0.05)",
                    color: "#3244e6",
                  },
                  "&.Mui-selected": {
                    bgcolor: "rgba(50, 68, 230, 0.1)",
                    color: "#3244e6",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "rgba(50, 68, 230, 0.15)",
                    },
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

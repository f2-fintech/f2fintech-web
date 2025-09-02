import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Button,
  IconButton,
  Popover,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import API from "../../apis";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

import { setLoanProviders } from "../../redux/actions/LoanProviderAction";
import { width } from "@mui/system";
const StyledButton = styled(Button)(() => ({
  fontSize: "0.8rem",
  padding: "0.25rem 0.5rem",
  minWidth: "80px",
}));

const Listing = () => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("name");
  const [compares, setCompares] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [country, setCountry] = useState("");
  const loanProviders = useSelector((state) => state.allLoanProviders);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("compares", compares);

  useEffect(() => {
    const fetchLoanProviders = async () => {
      setLoading(true);
      try {
        let response;
        if (country) {
          console.log("Fetching loan providers for country:", country);
          response = await API.LoanProviderAPI.getCountryBasedProvider(country);
        } else {
          console.log("Fetching all loan providers");
          response = await API.LoanProviderAPI.getAll();
        }

        console.log(response.data, "API Response");

        if (response.data.status === "Success") {
          dispatch(
            setLoanProviders({
              listData: response.data.data.rows,
            })
          );
        } else {
          dispatch(
            setLoanProviders({
              listData: [],
            })
          );
          console.log("No loan providers found");
        }
      } catch (error) {
        console.error("Loan provider API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanProviders();
  }, [country]); // Fetch data when `country` changes

  const handlePopoverClick = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  // Adds/removes loan providers from the compare list.
  const handleCompareToggle = (item) => {
    setCompares((prevCompares) =>
      prevCompares.includes(item)
        ? prevCompares.filter((comp) => comp !== item)
        : [...prevCompares, item]
    );
  };

  // Clears the compare list.
  const handleRemoveAll = () => {
    setCompares([]);
    handlePopoverClose();
  };

  // Redirects the user to a comparison page with selected items.
  const handleProceedToCompare = () => {
    navigate("/providers/Compare", { state: { compares } });
    handlePopoverClose();
  };

  const open = Boolean(anchorEl);

  const getFilteredData = useMemo(() => {
    const sortedData = [...(loanProviders?.listData || [])];
    if (filter === "interestRate") {
      return sortedData.sort(
        (a, b) => parseFloat(a.interest_rate) - parseFloat(b.interest_rate)
      );
    } else if (filter === "rating") {
      return sortedData.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sortedData;
  }, [loanProviders?.listData, filter]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  const theme = useTheme();
  return (
    <>
      <Container
        sx={{
          marginTop: 8,
          overflowX: "hidden",
          maxWidth: "100vw",
          px: { xs: 2, sm: 3, md: 5 },
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            py: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              color: "#2c3e50",
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Loan Providers
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              color: "#7f8c8d",
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            Compare and choose the best loan options for you
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            mb: 5,
            gap: { xs: 3, sm: 4 },
            p: { xs: 3, sm: 4 },
            borderRadius: "16px",
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Filter filter={filter} setFilter={setFilter} />

          <FormControl
            sx={{
              minWidth: { xs: "100%", sm: 220 },
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <InputLabel
              id="country-label"
              sx={{
                color: "#495057",
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "1rem",
              }}
            >
              Select Country
            </InputLabel>
            <Select
              labelId="country-label"
              id="country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                borderRadius: "12px",
                color: "#495057",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e9ecef",
                  borderWidth: "2px",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2f3ee3",
                  border: "1px  solid #2f3ee3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "#6c757d",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#ffffff",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    borderRadius: "12px",
                    mt: 1,
                    "& .MuiMenuItem-root": {
                      fontFamily: "Poppins",
                      color: "#495057",
                      fontSize: { xs: "14px", sm: "16px" },
                      py: 1.5,
                      "&:hover": {
                        bgcolor: "#f8f9fa",
                        color: "#2f3ee3",
                      },
                      "&.Mui-selected": {
                        bgcolor: "#e7f3ff",
                        color: "#2f3ee3",
                        "&:hover": {
                          bgcolor: "#e7f3ff",
                        },
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="india">India</MenuItem>
              <MenuItem value="canada">Canada</MenuItem>
              <MenuItem value="malaysia">Malaysia</MenuItem>
              <MenuItem value="singapore">Singapore</MenuItem>
              <MenuItem value="uae">UAE</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          container
          spacing={4}
        >
          {!getFilteredData.length ? (
            <Typography
              sx={{
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins",
                fontWeight: 600,
                width: "100%",
              }}
              variant="h4"
            >
              No Loan Providers Available
            </Typography>
          ) : (
            getFilteredData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProductCard
                  api={API.CustomerFavouriteAPI}
                  loanProviderId={item.id}
                  title={item.title}
                  home={item.is_home}
                  homeimg={item.home_image}
                  interestRate={item.interest_rate}
                  max_tenure={item.max_tenure}
                  text={{
                    description: item.description,
                    short_description: item.short_description,
                    long_description: item.long_description,
                  }}
                  isCompared={compares.includes(item)}
                  handleCompareToggle={() => handleCompareToggle(item)}
                />
              </Grid>
            ))
          )}
        </Grid>

        {compares.length > 0 && (
          <Box
            sx={{
              position: "fixed",
              right: 16,
              bottom: 16,
              zIndex: 999,
            }}
          >
            <Button
              onClick={handlePopoverClick}
              disabled={compares.length == 1}
              sx={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                backgroundColor: theme.palette.secondary.main,
                fontFamily: "Poppins",
                fontSize: "1rem",
                fontWeight: 600,
                px: 3,
                py: 1.2,
                borderRadius: "30px",
                textTransform: "none",
                "&:hover": {
                  color: theme.palette.whitetext.white,
                  backgroundColor: theme.palette.secondary.main,
                },
              }}
            >
              Compare
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "bottom", horizontal: "right" }}
              onClose={handlePopoverClose}
              PaperProps={{
                sx: {
                  p: 2,
                  width: 300,
                  maxWidth: "90%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  backgroundColor: theme.palette.background.default,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{ color: theme.palette.text.primary }}
                  variant="h6"
                >
                  Compare Products
                </Typography>
                <IconButton size="small" onClick={handlePopoverClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {compares.length === 0 ? (
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ mt: 2, border: "1px solid white" }}
                >
                  No products selected for comparison.
                </Typography>
              ) : (
                <>
                  {compares.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "2vh",
                        }}
                        variant="body2"
                      >
                        {item.title}
                      </Typography>
                      <IconButton
                        sx={{
                          backgroundColor: "white",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "white",
                            color: "black",
                          },
                        }}
                        size="small"
                        onClick={() => handleCompareToggle(item)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <StyledButton
                      sx={{ color: "red", fontFamily: "Poppins" }}
                      onClick={handleRemoveAll}
                    >
                      Remove All
                    </StyledButton>
                    <StyledButton
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: "black",
                        fontWeight: "600",
                        fontFamily: "Poppins",
                        "&:hover": {
                          backgroundColor: theme.palette.secondary.main,
                          color: "white",
                        },
                      }}
                      variant="contained"
                      onClick={handleProceedToCompare}
                    >
                      Compare
                    </StyledButton>
                  </Box>
                </>
              )}
            </Popover>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Listing;

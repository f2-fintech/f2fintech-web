import { useState, useEffect, useMemo, useRef } from "react";
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
  Paper,
  Chip,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import API from "../../apis";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

import { setLoanProviders } from "../../redux/actions/LoanProviderAction";

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

  const filterSectionRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("compares", compares);

  useEffect(() => {
    if (country && filterSectionRef.current) {
      setTimeout(() => {
        filterSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [country]);

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
  }, [country, dispatch]);

  const handlePopoverClick = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const handleCompareToggle = (item) => {
    setCompares((prevCompares) =>
      prevCompares.includes(item)
        ? prevCompares.filter((comp) => comp !== item)
        : [...prevCompares, item]
    );
  };

  const handleRemoveAll = () => {
    setCompares([]);
    handlePopoverClose();
  };

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
  console.log(getFilteredData, "getFilteredData ");

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
        maxWidth="false"
        sx={{
          marginTop: 1,
          overflowX: "hidden",
          maxWidth: "100vw",
          px: { xs: 2, sm: 3, md: 5 },
          fontFamily: "Poppins, sans-serif",
          position: "relative",
          height: "40%",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            height: { xs: "35vh", sm: "40vh", md: "45vh", lg: "60vh" },
            background: `linear-gradient(135deg, #3244e6, #3244e6, #3244e6)`,
            zIndex: -1,
          },
        }}
      >
        {/* Enhanced Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            pt: { xs: 4, sm: 6, md: 8, lg: 12 },
            pb: { xs: 3, sm: 4, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 800,
              color: "white",
              mb: { xs: 2, sm: 3, md: 4, lg: 7 },
              lineHeight: 1.3,
              fontSize: {
                xs: "1.75rem",
                sm: "2.5rem",
                md: "3.5rem",
                lg: "4rem",
              },
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              px: { xs: 2, sm: 0 },
            }}
          >
            Find Your Perfect Loan Provider
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              color: "rgba(255,255,255,0.9)",
              mb: { xs: 2, sm: 3, md: 4 },
              fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.3rem" },
              maxWidth: { xs: "95%", sm: "80%", md: "600px" },
              margin: "0 auto",
              marginBottom: { xs: "1rem", sm: "1.5rem", md: "2rem" },
              lineHeight: 1.6,
              px: { xs: 2, sm: 1 },
            }}
          >
            Compare rates, terms, and features from top lenders
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: { xs: 1, sm: 1.5, md: 2 },
              px: { xs: 2, sm: 0 },
            }}
          >
            <Chip
              label={`${getFilteredData.length} Providers Available`}
              sx={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: "600",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: { xs: "0.75rem", sm: "0.8125rem", md: "0.875rem" },
                height: { xs: "28px", sm: "32px" },
              }}
            />
            <Chip
              label={
                country
                  ? country.charAt(0).toUpperCase() + country.slice(1)
                  : "All Countries"
              }
              sx={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: "600",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: { xs: "0.75rem", sm: "0.8125rem", md: "0.875rem" },
                height: { xs: "28px", sm: "32px" },
              }}
            />
          </Box>
        </Box>

        {/* Enhanced Filter Section with ref */}
        <Paper
          ref={filterSectionRef}
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 4, lg: 5 },
            mb: 2,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: { xs: "16px", sm: "20px", md: "24px" },
            height: { xs: "auto", lg: "7vh" },
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: { xs: "none", md: "translateY(-5px)" },
              boxShadow: {
                xs: "0 20px 40px rgba(0, 0, 0, 0.1)",
                md: "0 30px 60px rgba(0, 0, 0, 0.15)",
              },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: { xs: "stretch", lg: "center" },
              justifyContent: "space-between",
              gap: { xs: 2, sm: 3, md: 4 },
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                height: "100%",
                gap: { xs: 2, sm: 3, md: 4, lg: 20 },
                width: { xs: "100%", lg: "auto" },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: {
                    xs: "1.1rem",
                    sm: "1.3rem",
                    md: "1.5rem",
                    lg: "1.8rem",
                  },
                  color: "#2c3e50",
                  mb: { xs: 0, lg: 2 },
                  textAlign: { xs: "left", sm: "left", lg: "center" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Filter & Sort Options
              </Typography>
              <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                <Filter filter={filter} setFilter={setFilter} />
              </Box>
            </Box>

            <FormControl
              fullWidth
              sx={{
                width: { xs: "100%", sm: "100%", md: "280px", lg: "30%" },
                mb: { lg: "1.5%" },
              }}
            >
              <InputLabel
                id="country-label"
                sx={{
                  color: "#6c757d",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Choose your country
              </InputLabel>

              <Select
                labelId="country-label"
                id="country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                label="Choose your country"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  color: "#2c3e50",
                  borderRadius: { xs: "12px", sm: "14px", md: "16px" },
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  "&:hover": {
                    background: "#fff",
                    transform: { xs: "none", md: "translateY(-2px)" },
                    boxShadow: {
                      xs: "none",
                      md: "0 8px 25px rgba(102, 126, 234, 0.15)",
                    },
                  },
                  "&.Mui-focused": {
                    background: "#fff",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.2)",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e9ecef",
                    borderWidth: "2px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2f3ee3",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#667eea",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "#ffffff",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                      borderRadius: "12px",
                      maxHeight: { xs: "60vh", sm: "auto" },
                      "& .MuiMenuItem-root": {
                        fontFamily: "Poppins",
                        color: "#495057",
                        fontSize: {
                          xs: "0.875rem",
                          sm: "0.9375rem",
                          md: "1rem",
                        },
                        py: { xs: 1.25, sm: 1.5 },
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
                <MenuItem value="india">🇮🇳 India</MenuItem>
                <MenuItem value="canada">🇨🇦 Canada</MenuItem>
                <MenuItem value="malaysia">🇲🇾 Malaysia</MenuItem>
                <MenuItem value="singapore">🇸🇬 Singapore</MenuItem>
                <MenuItem value="uae">🇦🇪 UAE</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
        >
          {!getFilteredData.length ? (
            <Paper
              elevation={0}
              sx={{
                textAlign: "center",
                py: { xs: 4, sm: 6, md: 8 },
                px: { xs: 2, sm: 3 },
                width: "100%",
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                borderRadius: { xs: "16px", sm: "20px", md: "24px" },
                border: "2px dashed #dee2e6",
                mx: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#6c757d",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
                }}
              >
                No Loan Providers Available
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#868e96",
                  fontFamily: "Poppins",
                  fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                }}
              >
                Try adjusting your filters or selecting a different country
              </Typography>
            </Paper>
          ) : (
            getFilteredData.map((item, index) => (
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
              >
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
                    max_tenure: item.max_tenure,
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
              right: { xs: 12, sm: 16, md: 24 },
              bottom: { xs: 12, sm: 16, md: 24 },
              zIndex: 999,
            }}
          >
            <Badge
              badgeContent={compares.length}
              max={9}
              sx={{
                "& .MuiBadge-badge": {
                  background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                  color: "white",
                  fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                  fontWeight: "600",
                  minWidth: { xs: "18px", sm: "20px", md: "22px" },
                  height: { xs: "18px", sm: "20px", md: "22px" },
                  animation: "pulse 2s infinite",
                },
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(1)",
                    boxShadow: "0 0 0 0 rgba(255, 107, 107, 0.7)",
                  },
                  "70%": {
                    transform: "scale(1.05)",
                    boxShadow: "0 0 0 10px rgba(255, 107, 107, 0)",
                  },
                  "100%": {
                    transform: "scale(1)",
                    boxShadow: "0 0 0 0 rgba(255, 107, 107, 0)",
                  },
                },
              }}
            >
              <Button
                onClick={handlePopoverClick}
                disabled={compares.length === 1}
                sx={{
                  borderRadius: "50px",
                  padding: {
                    xs: "10px 16px",
                    sm: "12px 20px",
                    md: "16px 24px",
                  },
                  background:
                    "linear-gradient(135deg, #3244e6 0%, #3244e6 100%)",
                  color: "white",
                  fontSize: { xs: "0.8rem", sm: "0.85rem", md: "1rem" },
                  fontWeight: "600",
                  textTransform: "none",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                  fontFamily: "Poppins",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  minWidth: { xs: "auto", sm: "auto" },
                  "&:hover": {
                    transform: {
                      xs: "scale(1.02)",
                      md: "translateY(-3px) scale(1.05)",
                    },
                    boxShadow: "0 12px 40px rgba(102, 126, 234, 0.6)",
                    background:
                      "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                  },
                  "&:disabled": {
                    background: "rgba(158, 158, 158, 0.12)",
                    color: "rgba(0, 0, 0, 0.26)",
                    transform: "none",
                    boxShadow: "none",
                  },
                }}
              >
                Compare ({compares.length})
              </Button>
            </Badge>
          </Box>
        )}

        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={handlePopoverClose}
          PaperProps={{
            sx: {
              p: 0,
              width: { xs: "calc(100vw - 32px)", sm: "90vw", md: 380 },
              maxWidth: { xs: "calc(100vw - 32px)", sm: "90vw", md: "380px" },
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: { xs: "16px", sm: "18px", md: "20px" },
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
              overflow: "hidden",
            },
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #3244e6 0%, #3244e6 100%)",
              p: { xs: 2, sm: 2.5, md: 3 },
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                }}
              >
                Compare Products
              </Typography>
              <IconButton
                size="small"
                onClick={handlePopoverClose}
                sx={{
                  color: "white",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                opacity: 0.9,
                fontFamily: "Poppins",
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
              }}
            >
              {compares.length} product{compares.length !== 1 ? "s" : ""}{" "}
              selected
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
            {compares.length === 0 ? (
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  py: 2,
                  color: "#6c757d",
                  fontFamily: "Poppins",
                  fontSize: { xs: "0.85rem", sm: "0.875rem" },
                }}
              >
                No products selected for comparison.
              </Typography>
            ) : (
              <>
                <Box
                  sx={{
                    maxHeight: { xs: "180px", sm: "200px" },
                    overflowY: "auto",
                    mb: { xs: 2, sm: 2.5, md: 3 },
                  }}
                >
                  {compares.map((item, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: { xs: 1.5, sm: 2 },
                        mb: 1,
                        background: "rgba(102, 126, 234, 0.05)",
                        borderRadius: { xs: "10px", sm: "12px" },
                        border: "1px solid rgba(102, 126, 234, 0.1)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#2c3e50",
                          flex: 1,
                          mr: 1,
                          fontSize: { xs: "0.85rem", sm: "0.875rem" },
                        }}
                      >
                        {item.title}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleCompareToggle(item)}
                        sx={{
                          color: "#dc3545",
                          padding: { xs: "4px", sm: "8px" },
                          "&:hover": {
                            background: "rgba(220, 53, 69, 0.1)",
                          },
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  ))}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 1.5, sm: 2 },
                    pt: { xs: 1.5, sm: 2 },
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <StyledButton
                    fullWidth
                    variant="outlined"
                    onClick={handleRemoveAll}
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      color: "#dc3545",
                      borderColor: "#dc3545",
                      fontSize: { xs: "0.75rem", sm: "0.8rem" },
                      padding: { xs: "0.25rem 0.4rem", sm: "0.25rem 0.5rem" },
                      "&:hover": {
                        background: "rgba(220, 53, 69, 0.1)",
                        borderColor: "#dc3545",
                      },
                    }}
                  >
                    Remove All
                  </StyledButton>
                  <StyledButton
                    fullWidth
                    variant="contained"
                    onClick={handleProceedToCompare}
                    sx={{
                      background:
                        "linear-gradient(135deg, #3244e6 0%, #3244e6 100%)",
                      color: "white",
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      fontSize: { xs: "0.75rem", sm: "0.8rem" },
                      padding: { xs: "0.25rem 0.4rem", sm: "0.25rem 0.5rem" },
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #3244e6 0%, #3244e6 100%)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                      },
                    }}
                  >
                    Compare Now
                  </StyledButton>
                </Box>
              </>
            )}
          </Box>
        </Popover>
      </Container>
    </>
  );
};

export default Listing;

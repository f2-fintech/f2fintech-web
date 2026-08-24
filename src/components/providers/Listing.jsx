import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Chip,
  Badge,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import API from "../../apis";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import CompareTransition from "./CompareTransition";
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
  const [country, setCountry] = useState("all");
  const [showTransition, setShowTransition] = useState(false);
  const loanProviders = useSelector((state) => state.allLoanProviders);

  const filterSectionRef = useRef(null);
  const theme = useTheme();

  // Detect iPad Pro and other devices
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isIpadPro = useMediaQuery('(min-width: 1024px) and (max-width: 1366px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        if (country && country !== "all") {
          response = await API.LoanProviderAPI.getCountryBasedProvider(country);
        } else {
          response = await API.LoanProviderAPI.getAll();
        }

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
        }
      } catch (error) {
        console.error("Loan provider API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanProviders();
  }, [country, dispatch]);

  const handleGoToCompare = () => {
    setShowTransition(true);
  };

  const handleTransitionComplete = useCallback(() => {
    navigate("/lending-partners/compare", { state: { compares } });
  }, [navigate, compares]);

  const handleCompareToggle = (item) => {
    setCompares((prevCompares) =>
      prevCompares.includes(item)
        ? prevCompares.filter((comp) => comp !== item)
        : [...prevCompares, item]
    );
  };

  const handleRemoveAll = () => {
    setCompares([]);
  };

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

  // Dynamic grid based on device
  const getGridConfig = () => {
    // iPad Pro specific handling
    if (isIpadPro) {
      if (isLandscape) {
        return { xs: 12, sm: 6, md: 4, lg: 4 }; // 3 columns in landscape
      } else {
        return { xs: 12, sm: 6, md: 6, lg: 6 }; // 2 columns in portrait
      }
    }

    // Regular responsive
    if (isMobile) {
      return { xs: 12, sm: 12 };
    }
    if (isTablet) {
      return { xs: 12, sm: 6, md: 6 };
    }
    return { xs: 12, sm: 6, md: 4, lg: 4 };
  };

  const gridConfig = getGridConfig();

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "clip",
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Compare Transition Overlay */}
      {showTransition && (
        <CompareTransition onComplete={handleTransitionComplete} />
      )}

      {/* Hero Section Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: {
            xs: "280px",
            sm: "320px",
            md: "380px",
            lg: "420px",
            xl: "480px"
          },
          background: "#3244e6",
          zIndex: 0,
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          zIndex: 1,
          px: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
            xl: 6
          },
          py: {
            xs: 2,
            sm: 3,
            md: 4
          },
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            pt: {
              xs: 3,
              sm: 4,
              md: 5,
              lg: 6
            },
            pb: {
              xs: 2,
              sm: 3,
              md: 4
            },
            mb: {
              xs: 2,
              sm: 3,
              md: 4
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 800,
              color: "white",
              mb: {
                xs: 1.5,
                sm: 2,
                md: 2.5
              },
              lineHeight: 1.2,
              fontSize: {
                xs: "1.75rem",
                sm: "2.25rem",
                md: "2.75rem",
                lg: "3.25rem",
                xl: "3.75rem"
              },
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              px: { xs: 1, sm: 2 },
            }}
          >
            Compare Loan Providers
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              color: "rgba(255,255,255,0.95)",
              mb: {
                xs: 2,
                sm: 2.5,
                md: 3
              },
              fontSize: {
                xs: "0.875rem",
                sm: "1rem",
                md: "1.125rem",
                lg: "1.25rem"
              },
              maxWidth: {
                xs: "100%",
                sm: "90%",
                md: "800px"
              },
              margin: "0 auto",
              lineHeight: 1.5,
              px: { xs: 2, sm: 3 },
            }}
          >
            Evaluate rates, tenure options, and features across our partner lenders.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: {
                xs: 1,
                sm: 1.5,
                md: 2
              },
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
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.75rem",
                  md: "0.8rem"
                },
                height: {
                  xs: "28px",
                  sm: "30px",
                  md: "32px"
                },
              }}
            />
            <Chip
              label={
                country && country !== "all"
                  ? country.charAt(0).toUpperCase() + country.slice(1)
                  : "All Countries"
              }
              sx={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: "600",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.75rem",
                  md: "0.8rem"
                },
                height: {
                  xs: "28px",
                  sm: "30px",
                  md: "32px"
                },
              }}
            />
          </Box>
        </Box>

        {/* Filter Section */}
        <Paper
          ref={filterSectionRef}
          elevation={0}
          sx={{
            p: {
              xs: 2,
              sm: 2.5,
              md: 3,
              lg: 3.5
            },
            mb: {
              xs: 4,
              sm: 5,
              md: 7,
              lg: 8
            },
            background: "white",
            borderRadius: {
              xs: "16px",
              sm: "20px",
              md: "24px"
            },
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row"
              },
              alignItems: {
                xs: "stretch",
                md: "center"
              },
              justifyContent: "space-between",
              gap: {
                xs: 2,
                sm: 2.5,
                md: 3
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row"
                },
                alignItems: {
                  xs: "flex-start",
                  sm: "center"
                },
                gap: {
                  xs: 1.5,
                  sm: 2,
                  md: 3
                },
                flex: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: {
                    xs: "1rem",
                    sm: "1.125rem",
                    md: "1.25rem"
                  },
                  color: "#2c3e50",
                  whiteSpace: "nowrap",
                }}
              >
                Filter & Sort
              </Typography>
              <Box sx={{
                width: {
                  xs: "100%",
                  sm: "200px",
                  md: "220px"
                }
              }}>
                <Filter filter={filter} setFilter={setFilter} />
              </Box>
            </Box>

            <FormControl
              sx={{
                width: {
                  xs: "100%",
                  sm: "280px",
                  md: "300px",
                  lg: "320px"
                },
              }}
            >
              <InputLabel
                id="country-label"
                sx={{
                  color: "#6c757d",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                }}
              >
                Choose your country
              </InputLabel>
              <Select
                labelId="country-label"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                label="Choose your country"
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
                }}
              >
                <MenuItem value="all">All Countries</MenuItem>
                <MenuItem value="india">India</MenuItem>
                <MenuItem value="canada">Canada</MenuItem>
                <MenuItem value="malaysia">Malaysia</MenuItem>
                <MenuItem value="singapore">Singapore</MenuItem>
                <MenuItem value="uae">UAE</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {/* Products Grid */}
        <Grid
          container
          spacing={{
            xs: 2,
            sm: 2.5,
            md: 3,
            lg: 3
          }}
          sx={{
            mb: {
              xs: 4,
              sm: 5,
              md: 6,
              lg: 8
            },
            width: "100%",
            margin: 0,
            overflow: "visible",
          }}
        >
          {!getFilteredData.length ? (
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  textAlign: "center",
                  py: {
                    xs: 4,
                    sm: 5,
                    md: 6,
                    lg: 8
                  },
                  px: {
                    xs: 2,
                    sm: 3,
                    md: 4
                  },
                  background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  borderRadius: {
                    xs: "16px",
                    sm: "20px",
                    md: "24px"
                  },
                  border: "2px dashed #dee2e6",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#6c757d",
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    mb: 2,
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.5rem",
                      md: "1.75rem"
                    },
                  }}
                >
                  No Loan Providers Available
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#868e96",
                    fontFamily: "Poppins",
                    fontSize: {
                      xs: "0.875rem",
                      sm: "0.9375rem",
                      md: "1rem"
                    },
                  }}
                >
                  Try adjusting your filters or selecting a different country
                </Typography>
              </Paper>
            </Grid>
          ) : (
            getFilteredData.map((item, index) => (
              <Grid
                item
                xs={gridConfig.xs}
                sm={gridConfig.sm}
                md={gridConfig.md}
                lg={gridConfig.lg}
                key={index}
                sx={{
                  display: "flex",
                  // iPad Pro specific styles
                  ...(isIpadPro && {
                    width: isLandscape ? "33.333%" : "50%",
                    flexBasis: isLandscape ? "33.333%" : "50%",
                  })
                }}
              >
                <Box sx={{ width: "100%" }}>
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
                </Box>
              </Grid>
            ))
          )}
        </Grid>

        {/* Compare Button - Sticky */}
        {compares.length > 0 && (
          <Box
            sx={{
              position: "sticky",
              bottom: {
                xs: 16,
                sm: 20,
                md: 24,
                lg: 32
              },
              display: "flex",
              justifyContent: "flex-end",
              px: {
                xs: 2,
                sm: 2.5,
                md: 3,
                lg: 4
              },
              pb: {
                xs: 2,
                sm: 2.5,
                md: 3,
                lg: 4
              },
              pointerEvents: "none",
              zIndex: 99999,
              mt: -8,
            }}
          >
            <Box sx={{ pointerEvents: "auto" }}>
              <Badge
                badgeContent={compares.length}
                max={9}
                sx={{
                  "& .MuiBadge-badge": {
                    background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                    color: "white",
                    fontSize: {
                      xs: "0.7rem",
                      sm: "0.75rem"
                    },
                    fontWeight: "600",
                    minWidth: {
                      xs: "20px",
                      sm: "22px"
                    },
                    height: {
                      xs: "20px",
                      sm: "22px"
                    },
                  },
                }}
              >
                <Button
                  onClick={handleGoToCompare}
                  disabled={compares.length < 2}
                  sx={{
                    borderRadius: "50px",
                    padding: {
                      xs: "8px 16px",
                      sm: "10px 20px",
                      md: "12px 24px"
                    },
                    backgroundColor: "#3244e6",
                    color: "white",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.8125rem",
                      md: "0.875rem"
                    },
                    fontWeight: "600",
                    textTransform: "none",
                    boxShadow: "0 4px 15px rgba(50, 68, 230, 0.3)",
                    fontFamily: "Poppins",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: "#2837b9",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(50, 68, 230, 0.4)",
                    },
                    "&:disabled": {
                      background: "rgba(158, 158, 158, 0.12)",
                      color: "rgba(0, 0, 0, 0.26)",
                    },
                  }}
                >
                  Compare Now
                </Button>
              </Badge>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Listing;
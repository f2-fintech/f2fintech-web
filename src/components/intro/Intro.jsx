"use client";

import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import {
  ArrowRight,
  Star,
  Users,
  Heart,
  HandCoins,
  Stethoscope,
  Home,
} from "lucide-react";
import ButtonComp from "../common/button/Button";

// Floating elements
const FloatingCard = styled( "div" )( ( { theme } ) => ( {
  position: "absolute",
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: theme.spacing( 2 ),
  boxShadow: theme.shadows[ 3 ],
  border: "1px solid #e5e7eb",
  minWidth: "180px",
  animation: "float 6s ease-in-out infinite",
} ) );
const MainHeading = styled( Typography )( ( { theme } ) => ( {
  fontSize: "4rem",
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "-.025em",
  marginBottom: theme.spacing( 1 ),
} ) );

const ColoredText = styled( "span" )( ( { theme } ) => ( {
  background: "#3244e6",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
} ) );

const SaaSStarterLanding = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Returns true if screen width < sm (600px)
  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );
  return (
    <Box
      sx={ {
        position: "relative",
        minHeight: { xs: "85vh", sm: "85vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(to bottom right, #fff, #f0f9ff)",
      } }
    >
      <Container maxWidth="lg">
        <Grid
          sx={{
            "@media (max-width: 1365px)": {
              display: "flex",
              flexDirection: "column",
            },
          }}
          container
          spacing={{ xs: 4, sm: 6, md: 8 }}
          alignItems="center"
        >
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={ {
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 3, md: 3 },
                mb: { xs: 4, sm: 6, md: 10 },
                mt: {
                  xs: 3,
                  sm: 4,
                  md: 3,
                },
              } }
            >
              {/* Badge */ }
              <Box
                sx={ {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "#e8f0f6",
                  color: "#333",
                  px: 2,
                  py: 0.5,
                  borderRadius: "999px",
                  fontWeight: 500,
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  width: "fit-content",
                } }
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    bgcolor: "#3244e6",
                    borderRadius: "50%",
                  } }
                />
                <Typography
                  sx={ {
                    fontFamily: "urbanist",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  Trusted by 9,000 + Customers
                </Typography>
              </Box>

              {/* Heading */ }
              <MainHeading
                variant="h1"
                sx={ {
                  lineHeight: "1.3",
                  fontSize: { xs: "2rem", sm: "3rem", md: "2.8rem" },
                  "@media (max-width: 375px)": {
                    // iPhone SE width tak apply hoga
                    fontSize: "1.5rem",
                    flexDirection: "column",
                    gap: 1,
                  },
                  "@media (max-width: 414px)": {
                    // Samsung S8+ width tak apply hoga
                    fontSize: "2rem",
                  },
                  fontFamily: "Poppins",
                  fontWeight: 600,
                } }
              >
                Global Marketplace <br />
                For Buying and{ " " }
                <ColoredText
                  sx={ { position: "relative", display: "inline-block" } }
                >
                  Selling Loans.
                </ColoredText>
              </MainHeading>

              {/* Description */}
              <Typography
                variant="body1"
                sx={ {
                  fontSize: "1.2rem",
                  color: "text.secondary",
                  fontFamily: "Poppins",
                } }
              >
                Unlock your full financial potential with ease. Explore a wide
                range of trusted lending services designed to fit your unique
                needs. Discover smarter borrowing solutions tailored just for
                you.
              </Typography>

              {/* Stats */ }
              <Box sx={ { display: "flex", flexWrap: "wrap", gap: 4 } }>
                <Box sx={ { display: "flex", alignItems: "center", gap: 1 } }>
                  <Box sx={ { display: "flex" } }>
                    <Avatar
                      sx={ {
                        bgcolor: "#10b981",
                        width: 32,
                        height: 32,
                        border: "2px solid #fff",
                      } }
                    />
                    <Avatar
                      sx={ {
                        bgcolor: "#3b82f6",
                        width: 32,
                        height: 32,
                        border: "2px solid #fff",
                        ml: -1,
                      } }
                    />
                    <Avatar
                      sx={ {
                        bgcolor: "#a855f7",
                        width: 32,
                        height: 32,
                        border: "2px solid #fff",
                        ml: -1,
                      } }
                    />
                  </Box>
                  {/* <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Star size={16} style={{ color: "#f59e0b" }} />
                      <Typography
                        variant="body2"
                        sx={{ ml: 0.5, fontWeight: 600, fontFamily: "Poppins" }}
                      >
                        4
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontFamily: "Poppins" }}
                    >
                      2,500+ Impressions
                    </Typography>
                  </Box> */}
                </Box>

                <Box sx={ { display: "flex", alignItems: "center", gap: 1 } }>
                  <Users size={ 20 } style={ { color: "#10b981" } } />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={ { fontWeight: 600, fontFamily: "Poppins" } }
                    >
                      40+ Lender’s offerings
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={ { color: "text.secondary", fontFamily: "Poppins" } }
                    >
                      Available 24/7
                    </Typography>
                  </Box>
                </Box>

                {/* Buttons */ }

                <Box
                  sx={ {
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: { xs: 1.5, sm: 2 }, // smaller gap on mobile
                    width: "100%",
                    maxWidth: { sm: "80%", md: "100%" }, // control width on different screens
                    mx: "auto", // center horizontally
                    my: { xs: 1, sm: 0 }, // vertical margin
                  } }
                >
                  {/* First Button (ButtonComp) */ }
                  <Box sx={ { width: { xs: "100%", sm: "auto" } } }>
                    <ButtonComp />
                  </Box>

                  {/* Eligibility Check Button */ }
                  <Button
                    variant="contained"
                    onClick={ () =>
                      ( window.location.href = "https://finwise-eligibility.netlify.app/" )
                      // ( window.location.href = "http://localhost:3000/" )
                    }
                    sx={ {
                      bgcolor: "#fdb723",
                      color: "#FFFFFF",
                      fontWeight: "500",
                      "&:hover": {
                        bgcolor: "#f3ae21",
                        color: "white",
                      },
                      px: { xs: 2, sm: 3 },
                      py: { xs: 1, sm: 1.5 },
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                      },
                      borderRadius: 6,
                      textTransform: "none",
                      height: { xs: "6.3", sm: "2.5rem", md: "6.3" },
                      fontFamily: "Poppins",
                      width: { xs: "100%", sm: "auto" },
                      minWidth: { xs: "100%", sm: "220px" },
                    } }
                    fullWidth={ false }
                  >
                    Check Your Eligibility
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Section */ }
          <Grid item xs={ 12 } md={ 6 }>
            <Box
              sx={ {
                position: "relative",
                width: {
                  xs: "90vw",
                  sm: "80vw",
                  md: "70vw",
                  lg: "600px",
                },
                maxWidth: "600px",
                mx: "auto",
                display: {
                  xs: "none",
                  sm: "flex",
                  md: "flex",
                  lg: "flex",
                },
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5%",
                transform: "rotate(2deg)",
                backgroundColor: "#c4d5eb",
                overflow: "visible",
                zIndex: 1,
                height: {
                  xs: "300px",
                  sm: "350px",
                  md: "450px",
                  lg: "55vh",
                },
                bottom: {
                  sm: "40px",
                  md: "inherit",
                },
                right: isIpadPro ? "70px" : "inherit",
              }}
            >
              <Box
                sx={ {
                  transform: "rotate(-2deg)",
                  width: {
                    xs: "85vw",
                    sm: "75vw",
                    md: "65vw",
                    lg: "60vw",
                  },
                  maxWidth: "550px",
                  height: {
                    xs: "280px",
                    sm: "320px",
                    md: "420px",
                    lg: "50vh",
                  },
                  position: "relative",
                  borderBottomLeftRadius: 8,
                  overflow: "hidden",
                  zIndex: 1,
                } }
              >
                {/* Loan Image */ }
                <img
                  src="/homeimg.jpg"
                  alt="Loans image"
                  style={ {
                    width: "95%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    margin: "auto",
                    borderBottomLeftRadius: 20,
                    borderTopLeftRadius: 20,
                  } }
                />
              </Box>

              {/* Floating Card - Personal Loan */ }
              <FloatingCard
                sx={ {
                  position: "absolute",
                  top: { xs: 8, sm: 10, md: 10 },
                  left: { xs: 12, sm: 16, md: 16 },
                  border: "none",
                  animation: "float 2s ease-in-out infinite",
                  zIndex: 1000,
                  transform: { xs: "scale(0.9)", sm: "scale(1)" },
                  "@keyframes float": {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                    "100%": { transform: "translateY(0px)" },
                  },
                }}
              >
                <Box sx={ { display: "flex", alignItems: "center", gap: 1 } }>
                  <Box
                    sx={{
                      width: { xs: 28, sm: 32 },
                      height: { xs: 28, sm: 32 },
                      borderRadius: "50%",
                      backgroundColor: "#e8f0f6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    } }
                  >
                    <HandCoins size={ 16 } color="#3244e6" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={ 600 }
                      fontFamily="urbanist"
                      fontSize={{ xs: "1rem", sm: "1.25rem" }}
                    >
                      Personal Loan
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontFamily="urbanist"
                      fontSize={{ xs: "0.7rem", sm: "0.75rem" }}
                    >
                      Completed ✓
                    </Typography>
                  </Box>
                </Box>
              </FloatingCard>

              {/* Floating Card - Doctor Loan */ }
              <FloatingCard
                sx={ {
                  position: "absolute",
                  top: { xs: 100, sm: 130, md: 130 },
                  right: { xs: 12, sm: 16, md: 16 },
                  animation: "float 2s ease-in-out infinite",
                  zIndex: 1000,
                  transform: { xs: "scale(0.9)", sm: "scale(1)" },
                  "@keyframes float": {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                    "100%": { transform: "translateY(0px)" },
                  },
                }}
              >
                <Box sx={ { display: "flex", alignItems: "center", gap: 1 } }>
                  <Box
                    sx={{
                      width: { xs: 28, sm: 32 },
                      height: { xs: 28, sm: 32 },
                    sx={ {
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#e8f0f6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    } }
                  >
                    <Stethoscope size={ 16 } color="#3244e6" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={ 600 }
                      fontFamily="urbanist"
                      fontSize={{ xs: "1rem", sm: "1.25rem" }}
                    >
                      Doctor Loan
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontFamily="urbanist"
                      fontSize={{ xs: "0.7rem", sm: "0.75rem" }}
                    >
                      Completed ✓
                    </Typography>
                  </Box>
                </Box>
              </FloatingCard>

              {/* Floating Card - Home Loan */ }
              <FloatingCard
                sx={ {
                  position: "absolute",
                  top: { xs: 180, sm: 250, md: 250 },
                  left: { xs: 60, sm: 80, md: 80 },
                  animation: "float 2s ease-in-out infinite",
                  zIndex: 1000,
                  transform: { xs: "scale(0.9)", sm: "scale(1)" },
                  "@keyframes float": {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                    "100%": { transform: "translateY(0px)" },
                  },
                }}
              >
                <Box sx={ { display: "flex", alignItems: "center", gap: 1 } }>
                  <Box
                    sx={{
                      width: { xs: 28, sm: 32 },
                      height: { xs: 28, sm: 32 },
                      borderRadius: "50%",
                      backgroundColor: "#e8f0f6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    } }
                  >
                    <Home size={ 16 } color="#3244e6" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={ 600 }
                      fontFamily="urbanist"
                      fontSize={{ xs: "1rem", sm: "1.25rem" }}
                    >
                      Home Loan
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontFamily="urbanist"
                      fontSize={{ xs: "0.7rem", sm: "0.75rem" }}
                    >
                      Completed ✓
                    </Typography>
                  </Box>
                </Box>
              </FloatingCard>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SaaSStarterLanding;

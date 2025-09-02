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
const FloatingCard = styled("div")(({ theme }) => ({
  position: "absolute",
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  border: "1px solid #e5e7eb",
  minWidth: "180px",
  animation: "float 6s ease-in-out infinite",
}));
const MainHeading = styled(Typography)(({ theme }) => ({
  fontSize: "4rem",
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "-.025em",
  marginBottom: theme.spacing(1),
}));

const ColoredText = styled("span")(({ theme }) => ({
  background: "#3244e6",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const SaaSStarterLanding = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Returns true if screen width < sm (600px)

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: isMobile ? "" : "100vh",
        height: isMobile ? "85vh" : "",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(to bottom right, #fff, #f0f9ff)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mb: isMobile ? "" : 10,
                mt: {
                  xs: 5,
                  sm: 5,
                  md: 0,
                },
              }}
            >
              {/* Badge */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "#e8f0f6",
                  color: "#333",
                  px: 2,
                  py: 0.5,
                  borderRadius: "999px",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  width: "fit-content",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "#3244e6",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "urbanist",
                  }}
                >
                  Trusted by 10,000+ Customers
                </Typography>
              </Box>

              {/* Heading */}
              <MainHeading
                variant="h1"
                sx={{
                  lineHeight: "1.3",
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "3rem" },
                  "@media (max-width: 375px)": {
                    // iPhone SE width tak apply hoga
                    fontSize: "1.2rem",
                    flexDirection: "column",
                    gap: 1,
                  },
                  "@media (max-width: 414px)": {
                    // Samsung S8+ width tak apply hoga
                    fontSize: "1.5rem",
                  },
                  fontFamily: "Poppins",
                  fontWeight: 600,
                }}
              >
                Global Marketplace <br />
                For Buying and{" "}
                <ColoredText
                  sx={{ position: "relative", display: "inline-block" }}
                >
                  Selling Loans.
                </ColoredText>
              </MainHeading>
              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.2rem",
                  color: "text.secondary",
                  fontFamily: "Poppins",
                }}
              >
                Unlock your full financial potential with ease. Explore a wide
                range of trusted lending services designed to fit your unique
                needs. Discover smarter borrowing solutions tailored just for
                you.
              </Typography>

              {/* Stats */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ display: "flex" }}>
                    <Avatar
                      sx={{
                        bgcolor: "#10b981",
                        width: 32,
                        height: 32,
                        border: "2px solid #fff",
                      }}
                    />
                    <Avatar
                      sx={{
                        bgcolor: "#3b82f6",
                        width: 32,
                        height: 32,
                        border: "2px solid #fff",
                        ml: -1,
                      }}
                    />
                    <Avatar
                      sx={{
                        bgcolor: "#a855f7",
                        width: 32,
                        height: 32,
                        border: "2px solid #fff",
                        ml: -1,
                      }}
                    />
                  </Box>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Star size={16} style={{ color: "#f59e0b" }} />
                      <Typography
                        variant="body2"
                        sx={{ ml: 0.5, fontWeight: 600, fontFamily: "Poppins" }}
                      >
                        4.9
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontFamily: "Poppins" }}
                    >
                      2,500+ Reviews
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Users size={20} style={{ color: "#10b981" }} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, fontFamily: "Poppins" }}
                    >
                      40+ Lenders
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontFamily: "Poppins" }}
                    >
                      Available 24/7
                    </Typography>
                  </Box>
                </Box>

                {/* Buttons */}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: { xs: 1.5, sm: 2 }, // smaller gap on mobile
                    width: "100%",
                    maxWidth: { sm: "80%", md: "100%" }, // control width on different screens
                    mx: "auto", // center horizontally
                    my: { xs: 1, sm: 0 }, // vertical margin
                  }}
                >
                  {/* First Button (ButtonComp) */}
                  <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                    <ButtonComp />
                  </Box>

                  {/* Eligibility Check Button */}
                  <Button
                    variant="contained"
                    onClick={() =>
                      (window.location.href = "/eligibility-criteria")
                    }
                    sx={{
                      bgcolor: "#fdb723",
                      color: "#FFFFFF",
                      fontWeight: "500",
                      "&:hover": {
                        bgcolor: "#f3ae21",
                        color: "white",
                      },
                      px: { xs: 2, sm: 3 }, // responsive padding
                      py: { xs: 1, sm: 1.5 },
                      fontSize: {
                        xs: "0.9rem", // Font size for small screens
                        sm: "1rem", // Font size for tablet screens
                        md: "1.1rem", // Font size for desktop screens
                      },
                      borderRadius: 6,
                      textTransform: "none",
                      height: { xs: "6.3", sm: "2.5rem", md: "6.3" }, // fixed height on mobile, vh on desktop
                      fontFamily: "Poppins",
                      width: { xs: "100%", sm: "auto" }, // full width on mobile
                      minWidth: { xs: "100%", sm: "220px" }, // minimum width
                    }}
                    fullWidth={false} // override fullWidth on desktop
                  >
                    Check Your Eligibility
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "80vw",
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
                  xs: "35vh",
                  md: "55vh",
                },
                bottom: {
                  sm: "70px",
                  md: "inherit",
                },
              }}
            >
              <Box
                sx={{
                  transform: "rotate(-2deg)",
                  width: "60vw",
                  height: {
                    xs: "32vh",
                    md: "50vh",
                  },
                  position: "relative",
                  borderBottomLeftRadius: 8,
                  overflow: "hidden",
                  zIndex: 1,
                }}
              >
                {/* Loan Image */}
                <img
                  src="/homeimg.jpg"
                  alt="Loans image"
                  style={{
                    width: "95%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    margin: "auto",
                    borderBottomLeftRadius: 20,
                    borderTopLeftRadius: 20,
                  }}
                />
              </Box>

              {/* Floating Card - Personal Loan */}
              <FloatingCard
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 16,
                  border: "none",
                  animation: "float 2s ease-in-out infinite",
                  zIndex: 1000, // Highest z-index
                  "@keyframes float": {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                    "100%": { transform: "translateY(0px)" },
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#e8f0f6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <HandCoins size={16} color="#3244e6" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      fontFamily="urbanist"
                    >
                      Personal Loan
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontFamily="urbanist"
                    >
                      Completed ✓
                    </Typography>
                  </Box>
                </Box>
              </FloatingCard>

              {/* Floating Card - Doctor Loan */}
              <FloatingCard
                sx={{
                  position: "absolute",
                  top: 130,
                  right: 16,
                  animation: "float 2s ease-in-out infinite",
                  zIndex: 1000, // Highest z-index
                  "@keyframes float": {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                    "100%": { transform: "translateY(0px)" },
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#e8f0f6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Stethoscope size={16} color="#3244e6" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      fontFamily="urbanist"
                    >
                      Doctor Loan
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontFamily="urbanist"
                    >
                      Completed ✓
                    </Typography>
                  </Box>
                </Box>
              </FloatingCard>

              {/* Floating Card - Home Loan */}
              <FloatingCard
                sx={{
                  position: "absolute",
                  top: 250,
                  left: 80,
                  animation: "float 2s ease-in-out infinite",
                  zIndex: 1000,
                  "@keyframes float": {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                    "100%": { transform: "translateY(0px)" },
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#e8f0f6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Home size={16} color="#3244e6" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      fontFamily="urbanist"
                    >
                      Home Loan
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontFamily="urbanist"
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

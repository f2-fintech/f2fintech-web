import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Chip,
  Link,
  CssBaseline,
} from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import ButtonComp from "../common/button/Button";

import "@fontsource/urbanist/900.css"; // Black

const theme = createTheme({
  typography: {
    fontFamily:
      '"Urbanist", "Roboto", "Helvetica", "Arial", sans-serif, system-ui',
  },
});

// Styled components
const HeroContainer = styled(Container)(({ theme }) => ({
  textAlign: "center",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(12),
  maxWidth: "780px",
  display: "flex",
  flexDirection: "column", // Stacks elements vertically
  justifyContent: "center", // Vertically center
  alignItems: "center", // Horizontally center
  [theme.breakpoints.up("md")]: {
    height: "90vh", // Full viewport height on larger screens (web)
  },
  [theme.breakpoints.down("sm")]: {
    height: "100%",
    // paddingTop: theme.spacing(6), // Reduce top padding for smaller screens
    // paddingBottom: theme.spacing(6), // Reduce bottom padding for smaller screens
  },
}));

const AnnouncementChip = styled(Chip)(({ theme }) => ({
  borderRadius: "16px",
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  marginBottom: theme.spacing(3),
  padding: theme.spacing(0.5, 1),
  "& .MuiChip-label": {
    padding: theme.spacing(0.5, 1),
    fontSize: "14px",
  },
}));

const MainHeading = styled(Typography)(({ theme }) => ({
  fontSize: "4rem",
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: "-.025em",
  marginBottom: theme.spacing(1),
}));

const ColoredText = styled("span")(({ theme }) => ({
  background: "#3244e6",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const SubText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  maxWidth: "600px",
  margin: "0 auto",
  marginTop: theme.spacing(3),
}));

const SaaSStarterLanding = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeroContainer>
          {/* <AnnouncementChip /> */}
          <Box
            sx={{
              width: { xs: "90vw", sm: "70vw", md: "50vw" },
              height: "50vh",
              margin: "0 auto",
            }}
          >
            <MainHeading
              variant="h1"
              sx={{
                lineHeight: "1.3",
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
              }}
            >
              Global Marketplace For Buying <br />
              and{" "}
              <ColoredText
                sx={{ position: "relative", display: "inline-block" }}
              >
                Selling Loans.
                {/* <Box
                  component="img"
                  src="/underline2.svg" // Replace with your underline image
                  alt="Underline"
                  sx={{
                    position: "absolute",
                    bottom: "-70px", // Adjust position below text
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%", // Adjust width based on text
                    maxWidth: "250px", // Prevents it from being too large
                  }}
                /> */}
              </ColoredText>
            </MainHeading>

            <SubText
              variant="h2"
              sx={{
                mt: 8,
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.2rem" },
              }}
            >
              Unlock Your Financial Potential and Discover the Best Lending
              Services Tailored for You.
            </SubText>
          </Box>

          <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
            <ButtonComp />
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => (window.location.href = "/eligibility-criteria")}
              sx={{
                bgcolor: "#fdb723", // bright yellow
                color: "#FFFFFF", // white text
                fontWeight: "600",
                "&:hover": {
                  bgcolor: "#f3ae21", // dark yellow on hover
                  color: "white", // black text on hover
                },
                px: 3, // padding for better look
                py: 1,
                fontSize: "1.1rem",
                borderRadius: 6,
                mt: 4,
                textTransform: "none", // if you don't want ALL CAPS
              }}
            >
              Check Your Eligibility
            </Button>
          </Box>
        </HeroContainer>
      </ThemeProvider>
    </>
  );
};

export default SaaSStarterLanding;

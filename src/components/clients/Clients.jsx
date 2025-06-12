import styled from "@emotion/styled";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  height: {
    xs: "0",
    md: "17vh",
  },
  background: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  fontSize: "1.9vw",
  fontWeight: "bold",
  boxShadow: "none",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const useCounter = (end, duration, isInView) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration / 100);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.ceil(start));
        }
      }, 100); // Update every 100ms
      return () => clearInterval(timer);
    }
  }, [end, duration, isInView]);

  return count;
};

const Clients = () => {
  const observerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const locationsServed = useCounter(400, 1000, isInView);
  const happyClients = useCounter(11000, 1100, isInView);
  const applicationsReceived = useCounter(1440, 1000, isInView);
  const lendersServed = useCounter(100, 700, isInView);
  const loansDisbursed = useCounter(1100, 1000, isInView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const theme = useTheme();

  return (
    <Container
      maxWidth="false"
      sx={{
        width: "98%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        borderRadius: "10px",
        marginBottom: "50px",
        marginTop: "100px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Left Content Box */}
      <Box
        sx={{
          width: { xs: "100%", md: "60%" },
          display: "flex",
          flexDirection: "column",
          marginRight: { xs: "0", md: "2rem" },
          padding: { xs: "1.5rem", md: "3rem" }, // Increased padding for better spacing
          height: {
            xs: "auto", // Allow content to expand on mobile
            md: "80vh",
            sm: "35vh",
          },
          background: "linear-gradient(to right, #6b0668, #8217c3)",
          borderRadius: "25px",
          boxSizing: "border-box",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.whitetext.white,
            lineHeight: { xs: "2.2rem", md: "2.8rem" }, // Improved line height for readability
            fontSize: { xs: "2rem", md: "3.5vw" }, // Adjust font size for better readability
            fontWeight: "600", // Increased font weight for prominence
            fontFamily: "DM Sans",
            marginBottom: { xs: "1rem", md: "2rem" }, // Added margin bottom for spacing
          }}
        >
          Unlock Your Financial Potential
        </Typography>

        <Typography
          sx={{
            color: theme.palette.whitetext.white,
            lineHeight: { xs: "2rem", md: "2.8rem" },
            fontSize: { xs: "1.8rem", md: "2.5vw" }, // Adjusted font size
            fontWeight: "600", // Consistent font weight
            fontFamily: "DM Sans",
            marginBottom: { xs: "1rem", md: "2.5rem" }, // Added margin for space between paragraphs
          }}
        >
          Discover the Best Lending Services <br />
          Tailored for You
        </Typography>

        <Typography
          sx={{
            color: theme.palette.whitetext.white,
            fontSize: { xs: "1.1rem", md: "1.5vw", sm: "2vh" }, // Font size slightly smaller on mobile for a balance
            fontWeight: "500", // Light font weight for body text
            fontFamily: "DM Sans",
            letterSpacing: "1px", // Reduced letter spacing for a cleaner look
            marginBottom: { xs: "1.5rem", md: "3rem" },
            marginTop: {
              sm: "1.8rem",
              xs: "inherit",
              md: "inherit",
            },
            lineHeight: { xs: "1.8rem", md: "2.2rem" }, // Improved line height for readability
          }}
        >
          Our vision is to create awareness about money and help people achieve
          Financial Freedom early in life. We aspire to shape a future where
          everyone has equal opportunities to achieve their dreams and
          aspirations.
        </Typography>
      </Box>

      {/* Right Content Box */}
      <Box
        sx={{
          width: { xs: "100%", md: "30vw" },
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(-45deg, #8217c3, #8217c3)",
          height: {
            xs: "50vh",
            md: "80vh",
            sm: "30vh",
          },
          borderRadius: "25px",
          padding: "1rem",
          marginTop: {
            xs: "20px",
            md: "0",
          },
          boxSizing: "border-box",
        }}
        ref={observerRef}
      >
        <Grid
          container
          spacing={4}
          sx={{
            margin: { md: "20% auto" },
          }}
        >
          {[
            { value: locationsServed, label: "Location's Served" },
            { value: happyClients, label: "Happy Client's" },
            { value: applicationsReceived, label: "Application's Received" },
            { value: lendersServed, label: "Lender's Served" },
            { value: loansDisbursed, label: "Loan's Disbursed" },
          ].map((item, index) => (
            <Grid sx={{}} item xs={6} sm={4} md={5} key={index}>
              <Item>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    color: theme.palette.whitetext.white,
                    textAlign: "center",
                    fontSize: { xs: "2rem", md: "2.5vw" }, // Adjust font size for better readability
                  }}
                >
                  {isInView ? item.value.toLocaleString() : 0}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: ".99rem",
                    fontWeight: "500",
                    color: theme.palette.whitetext.white,
                    textAlign: "center",
                  }}
                >
                  {item.label}
                </Typography>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Clients;

import styled from "@emotion/styled";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  height: "17vh",
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
  // Intersection Observer ref and state
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

  console.log("isInView", isInView);
  const theme = useTheme();
  return (
    <Container
      maxWidth="false"
      sx={{
        // paddingBottom: "5%",
        // paddingTop: "4%",
        width: "98%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on larger
        height: "120vh",
        alignItems: "center",
        borderRadius: "10px",
        boxSizing: "border-box", // Ensure padding is included in size calculations
        overflow: "hidden", // Prevent overflow
      }}
    >
      {/* Left Content Box */}
      <Box
        sx={{
          width: { xs: "100%", md: "60%" }, // Full width on mobile, half on larger screens
          display: "flex",
          flexDirection: "column",
          marginRight: "2rem",
          padding: "2rem",
          height: "80vh",
          // backgroundImage: 'url("/caltheme5.png")',
          background: "linear-gradient(to right, #6b0668, #930b8e)",
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: "25px",
          boxSizing: "border-box", // Ensure padding is included in size
        }}
      >
        <Typography
          sx={{
            color: theme.palette.whitetext.white,
            lineHeight: { xs: "1.8rem", md: "2.4rem" },
            fontSize: { xs: "1.5rem", md: "3vw" },
            fontWeight: "580",
            fontFamily: "DM sans",
            display: "flex",
            marginTop: "40px",
          }}
        >
          Unlock Your Financial Potential:
        </Typography>
        <Typography
          sx={{
            color: theme.palette.whitetext.white,
            lineHeight: { xs: "1.8rem", md: "2.4rem" },
            fontSize: { xs: "1.5rem", md: "2vw" },
            fontWeight: "580",
            fontFamily: "DM sans",
          }}
        >
          Discover the Best Lending Services <br />
          Tailored for You
        </Typography>
        <Typography
          sx={{
            color: theme.palette.whitetext.white,
            fontSize: { xs: "1rem", md: "1.3vw" },
            fontWeight: "390",
            fontFamily: "DM sans",
            display: "flex",
            justifyContent: "center",
            mt: { xs: 2, md: 13 },
            letterSpacing: "1.5px",
            
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
          background: "linear-gradient(-45deg, #8217c3, #8217c3)",
          alignItems: "center",
          height: "80vh",
          borderRadius: "25px",
          padding: "1rem", // Added padding to ensure content stays within container
          boxSizing: "border-box", // Ensure padding is included in size
        }}
        ref={observerRef}
      >
        <Grid
          container
          spacing={4}
          sx={{
            margin: { xs: "5% auto", md: "20% auto" }, // Adjust margin for smaller screens
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
                    fontSize: { xs: "1.5rem", md: "2rem" }, // Larger numbers for mobile
                    fontWeight: "600",
                    color: theme.palette.whitetext.white,
                    textAlign: "center",
                  }}
                >
                  {isInView ? item.value.toLocaleString() : 0}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: ".99rem",
                    fontWeight: "350",
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

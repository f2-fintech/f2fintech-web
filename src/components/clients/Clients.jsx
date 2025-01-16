import styled from "@emotion/styled";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  height: "10vh",
  backgroundColor: "#000000",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#50c878",
  fontSize: "1.9vw",
  fontWeight: "bold",
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

  return (
    <Container
      maxWidth="false"
      sx={{
        paddingBottom: "5%",
        paddingTop: "4%",
        width: "91%",
        display: "flex",
        flexDirection: "row",
        height:'100%',
        boxShadow: "0 0  10px #43A865",
        // border: "3px solid red",
        borderRadius:'10px'
      }}
    >
      {/* left content Box */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
          backgroundImage: 'url("/caltheme.png")',
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius:'10px',
        }}
      >
        <Typography
          sx={{
            color: "white",
            lineHeight: "2.4rem",
            fontSize: "2vw",
            fontWeight: "580",
            fontFamily: "DM sans",
            display: "flex",
          }}
        >
          "Unlock Your Financial Potential:
        </Typography>
        <Typography
          sx={{
            color: "white",
            lineHeight: "2.4rem",
            fontSize: "2vw",
            fontWeight: "580",
            fontFamily: "DM sans",
          }}
        >
          Discover the Best Lending Services <span style={{color:'#FFD700'}}>Tailored for You"</span>
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "1.3vw",
            fontWeight: "390",
            fontFamily: "Poppins",
            display: "flex",
            justifyContent: "center",
            mt: 3.5,
            letterSpacing: "1.5px",
          }}
        >
          Our vision is to create awareness about money and help people achieve
          Financial Freedom early in life. We aspire to shape a future where
          everyone has equal opportunities to achieve their dreams and
          aspirations.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "50%",
          flexGrow: 1,
          alignItems: "center",
        }}
        ref={observerRef}
      >
        <Grid
          container
          spacing={4}
          sx={{ margin: "20% auto", 
            
           }}
        >
          <Grid item xs={2} md={5}>
            <Item>
              {isInView ? locationsServed : 0}
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: ".99rem",
                  fontWeight: "350",
                  color: "white",
                }}
              >
                Location's Served
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={2} md={5}>
            <Item>
              {isInView ? happyClients.toLocaleString() : 0}
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: ".99rem",
                  fontWeight: "350",
                  color: "white",
                }}
              >
                Happy Client's
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={2} md={5}>
            <Item>
              {isInView ? applicationsReceived.toLocaleString() : 0}
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: ".99rem",
                  fontWeight: "350",
                  color: "white",
                }}
              >
                Application's Received
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={2} md={5}>
            <Item>
              {isInView ? lendersServed : 0}
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: ".99rem",
                  fontWeight: "350",
                  color: "white",
                }}
              >
                Lender's Served
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={2} md={5}>
            <Item>
              {isInView ? loansDisbursed.toLocaleString() : 0} Cr
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: ".99rem",
                  fontWeight: "350",
                  color: "white",
                }}
              >
                Loan's Disbursed
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Clients;

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const CareersSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        my: 2,
        py: 14,
        position: "relative", // important for layering
        overflow: "hidden",
      }}
    >
      {/* <Container maxWidth="md" sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", color: "#3244e6" }}>
          Grow With Us — Explore Careers at F2Fintech
        </Typography>
      </Container> */}

      <Box
        sx={{
          backgroundColor: "#e1eaf2ff",
          color: "#3244e6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: { xs: "100%", md: "85vh" },
          px: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src="/careers.svg"
          alt="Careers Background"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "80%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.1,
            zIndex: 0,
          }}
        />
        <Container>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              color: "#3244e6",
              mb: 8,
              fontFamily: "Poppins",
            }}
          >
            Grow With Us — Explore Careers at F2Fintech
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              color: "#ffffff",
              WebkitTextStroke: "0.9px #000",
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.4)",
            }}
          >
            Join a fast-growing fintech company that empowers people with
            financial access.
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, WebkitTextStroke: "0.9px " }}>
            We’re always looking for passionate individuals to be a part of our
            journey.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="https://f2fintech-ats.netlify.app/f2fintech/all-posted-jobs"
            target="_blank"
            sx={{
              borderRadius: "18px",
              backgroundColor: "#3244e6",
              color: "#ffffff",
              fontWeight: "bold",
              "&:hover": {
                color: "#ffffff",
                textShadow: "2px 2px 6px rgba(0, 0, 0, 0.4)",
                backgroundColor: "#3516e3ff",
              },
            }}
          >
            View Open Positions
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default CareersSection;

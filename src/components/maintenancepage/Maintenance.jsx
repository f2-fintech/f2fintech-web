import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";

const MaintenancePage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000066",
        height: "100vh",
        maxWidth: "100% !important",
        padding: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "95%",
          height: "100vh",
          background: "linear-gradient(to right, white 100%, #000066 50%)",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <Box
          sx={{
            width: "50%",
            textAlign: "left",
            padding: 4,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#000066",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            UNDER MAINTENANCE
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#000000",
              marginBottom: 2,
              fontWeight: "bold",
            }}
          >
            Our website is currently undergoing scheduled maintenance. We
            apologize for any inconvenience and appreciate your patience. Please
            check back later.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3d3ddd",
              color: "#ffffff",
              padding: "10px 20px",
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 5,
            }}
          >
            Read More
          </Button>
        </Box>
        <Box
          sx={{
            width: "50%",
            textAlign: "center",
            padding: 4,
            backgroundColor: "#ffffff",
          }}
        >
          <video
            src="/maintenance.mp4"
            autoPlay
            loop
            muted
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default MaintenancePage;

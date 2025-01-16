import { Container, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function Intro() {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        padding: 0,
        margin: 0,
        maxWidth: "none",
        overFlow: "hidden",
      }}
    >
      <Box sx={{ width: "100%", height: "100%" }}>
        <video
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overFlow: "hidden",
            left: 0,
            right: 0,
          }}
          src="/intro1.MP4"
          autoPlay
          loop
          muted
        />
      </Box>
      <Box
        sx={{
          position: "absolute", // Ensure it covers the entire parent
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black overlay
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "5.3rem",
          zIndex: 1, // Ensures it is above other elements
        }}
      >
        <Typography
          color="white"
          sx={{
            textAlign: "center",
            fontSize: "5vw",
            fontWeight: 900,
            width: "70%",
            fontFamily: "Poppins", // Noto
          }}
        >
          global marketplace <br />
          for buying and selling loans.
        </Typography>
        {/* <Typography
          color="white"
          sx={{
            width: "50vw",
            textAlign: "center",
            fontSize: "1.5vw",
            letterSpacing: ".24rem",
            fontWeight: "600",
            fontFamily: "Poppins",
            mb: 22,
          }}
        >
          We are A global marketplace <br />
          For buying and selling loans.
        </Typography> */}
      </Box>
    </Container>
  );
}

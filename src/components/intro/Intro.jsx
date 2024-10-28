import { Container, Box } from "@mui/material";
import PropTypes from "prop-types";

export default function Intro({ title }) {
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
          src="/Video.mp4"
          autoPlay
          loop
          muted
        />
      </Box>
    </Container>
  );
}

Intro.propTypes = {
  title: PropTypes.string.isRequired,
  videoSrc: PropTypes.string.isRequired,
};

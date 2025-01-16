import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ButtonComp(props) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFD700",
        height: props.height || "40px",
        width: props.width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "25px",
      }}
    >
      <Button
        sx={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
          padding: "0.5rem 1.5rem",
          width: "13vw",
          borderRadius: "30px",
          color: "#000000",
          fontFamily: "Poppins",
          fontWeight: "500",
          fontSize: props.fontSize || "1.1rem",
          lineHeight: "1.5rem",
          textTransform: "none",
          border: "none",
          cursor: "pointer",
          backgroundColor: "transparent", // Ensure no default background
          "&:hover": {
            color: "#ffffff", // Change text color on hover
          },
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "100%",
            width: "100%",
            height: "100%",
            backgroundColor: "#transparent", // Sliding background color
            transition: "left 0.4s ease",
            zIndex: -0,
          },
          "&:hover::before": {
            left: 0, // Slide effect on hover
          },
          zIndex: 1, // Keep the text above the sliding background
        }}
      >
        <Link
          to="/application-form"
          style={{
            textDecoration: "none",
            color: "inherit",
            position: "relative",
            zIndex: 1, // Keep link above background
            display: "inline-block", // Ensure proper text alignment
          }}
        >
          Apply Now
        </Link>
      </Button>
    </Box>
  );
}

ButtonComp.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
};

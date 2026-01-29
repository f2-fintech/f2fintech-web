import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ButtonComp(props) {
  return (
    <Box
      sx={{
        backgroundColor: `${props.isWhite ? "#ffffff" : "#3244e6"}`,
        height: props.height || "40px",
        width: props.width || { xs: "100%", sm: "auto" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px",
      }}
    >
      <Button
        sx={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
          padding: {
            xs: "0.3rem 1rem", // Smaller padding for mobile screens
            sm: "0.5rem 1.5rem", // Medium padding for tablet screens
            md: "0.6rem 2rem", // Larger padding for desktop screens
          },
          width: props.width
            ? { xs: "100%", sm: props.width }
            : {
              xs: "100%", // Full width on mobile
              sm: "auto", // Adjust width for tablet and small screens
              md: "220px", // Standardized width for desktop
            },
          borderRadius: "30px",
          color: `${props.isWhite ? "#3244e6" : "#ffffff"}`,
          fontFamily: "Poppins",
          fontWeight: "500",
          fontSize: {
            xs: "0.9rem", // Font size for small screens
            sm: "1rem", // Font size for tablet screens
            md: "1rem", // Standardized font size
          },
          lineHeight: "1.5rem",
          textTransform: "none",
          border: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
          "&:hover": {
            color: `${props.isWhite ? "#3244e6" : "#ffffffff"}`,
          },
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "100%",
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            transition: "left 0.4s ease",
            zIndex: -1, // Fixed the z-index from 0 to -1 so that the hover effect works properly
          },
          "&:hover::before": {
            left: 0,
          },
          zIndex: 1,
        }}
      >
        <Link
          to="/application-form"
          style={{
            textDecoration: "none",
            color: "inherit",
            position: "relative",
            zIndex: 1,
            display: "inline-block",
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

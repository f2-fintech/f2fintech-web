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
          padding: {
            xs: "0.3rem 1rem",
            sm: "0.5rem 1.5rem",
            md: "0.6rem 2rem",
          },
          width: { xs: "100%", sm: "0vw", md: "13vw" },
          borderRadius: "30px",
          color: "#000000",
          fontFamily: "Poppins",
          fontWeight: "500",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          lineHeight: "1.5rem",
          textTransform: "none",
          border: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
          "&:hover": {
            color: "#ffffff",
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
            zIndex: -0,
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

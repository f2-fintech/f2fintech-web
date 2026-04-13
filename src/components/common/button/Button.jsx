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
        component={Link}
        to="/application-form"
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          padding: {
            xs: "0.3rem 1rem",
            sm: "0.5rem 1.5rem",
            md: "0.6rem 2rem",
          },
          width: props.width
            ? { xs: "100%", sm: props.width }
            : {
              xs: "100%",
              sm: "auto",
              md: "220px",
            },
          borderRadius: "30px",
          color: `${props.isWhite ? "#3244e6" : "#ffffff"}`,
          fontFamily: "Poppins",
          fontWeight: "500",
          fontSize: {
            xs: "0.9rem",
            sm: "1rem",
            md: "1rem",
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
            zIndex: -1,
          },
          "&:hover::before": {
            left: 0,
          },
          zIndex: 1,
        }}
      >
        Apply Now
      </Button>
    </Box>
  );
}

ButtonComp.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
};

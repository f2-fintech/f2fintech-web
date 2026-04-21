import { Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Marquee from "react-fast-marquee";
import "./Carousel.css";
function Carousel() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #000000, #3245e7, #3245e7, #000000)",
        height: { xs: "3rem", sm: "5rem", md: "4rem" },
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "#ffffff",
        fontFamily: "Poppins",
      }}
    >
      <Marquee pauseOnHover={false} autoFill={true} speed={60}>
        <Box
          component="span"
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.1rem" },
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 20px",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              color: "#ffffff",
              opacity: 0.3,
            }}
          />
          Hassle-free loans up to 30 lakhs
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 20px",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              color: "#ffffff",
              opacity: 0.3,
            }}
          />
          No collateral or guarantee needed
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 20px",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              color: "#ffffff",
              opacity: 0.3,
            }}
          />
          Minimal Documentation
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 20px",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              color: "#ffffff",
              opacity: 0.3,
            }}
          />
          Fully online loan application
        </Box>
      </Marquee>
    </Box>
  );
}
export default Carousel;

import { Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Marquee from "react-fast-marquee";
import "./Carousel.css";
function Carousel() {

  return (
   <Box
  sx={{
    background: "linear-gradient(135deg, #000000, #2c3ce3, #2c3ce3, #000000)",
    height: { xs: "4rem", sm: "4.5rem", md: "5rem" }, // Responsive height
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "#ffffff",
    fontFamily: "Poppins",
  }}
>
  <Marquee pauseOnHover={false} autoFill={false} speed={50}>
    <span
      style={{
        fontSize: { xs: "3.5vw", sm: "2.5vw", md: "1.4vw" }, // Default size for desktop
      }}
    >
      <FiberManualRecordIcon
        sx={{
          verticalAlign: "middle",
          margin: "0 10px",
          fontSize: { xs: "0.7rem", sm: "1rem", md: "1.2rem" }, // Default size for desktop
        }}
      />
      Hassle-free loans up to 30 lakhs
      <FiberManualRecordIcon
        sx={{
          verticalAlign: "middle",
          margin: "0 10px",
          fontSize: { xs: "0.7rem", sm: "1rem", md: "1.2rem" }, // Default size for desktop
        }}
      />
      No collateral or guarantee needed
      <FiberManualRecordIcon
        sx={{
          verticalAlign: "middle",
          margin: "0 10px",
          fontSize: { xs: "0.7rem", sm: "1rem", md: "1.2rem" }, // Default size for desktop
        }}
      />
      Minimal Documentation
      <FiberManualRecordIcon
        sx={{
          verticalAlign: "middle",
          margin: "0 10px",
          fontSize: { xs: "0.7rem", sm: "1rem", md: "1.2rem" }, // Default size for desktop
        }}
      />
      Fully online loan application
    </span>
  </Marquee>
</Box>

  );
}
export default Carousel;

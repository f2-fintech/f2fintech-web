import { Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Marquee from "react-fast-marquee";

import "./Carousel.css";

function Carousel() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #000066, #1a237e, #3f51b5, #5c6bc0)",
        height: "5rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      <Marquee pauseOnHover={"false"} autoFill={"false"} speed={"50"}>
        ;
        <span style={{ fontSize: "1.4vw" }}>
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 10px",
            }}
          />
          Hassle-free loans up to 30 lakhs
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 10px",
            }}
          />
          No collateral or guarantee needed
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 10px",
            }}
          />
          Minimal Documentation
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 10px",
            }}
          />
          Fully online loan application
        </span>
      </Marquee>
    </Box>
  );
}
export default Carousel;

import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Static imports to prevent request waterfall on page load
import Calculator from "../calculator/Calculator";
import Customers from "../customers/Customers";
import Carousel from "../../components/carousel/Carousel";
import Eligibility from "../../components/eligibility/Eligibility";
import Clients from "../clients/Clients";
import SaaSStarterLanding from "../intro/Intro";
import SegmentSelectorSection from "../intro/SegmentSelectorSection";
import EmailEnter from "../EnterEmain";
import ProblemAndSolution from "./ProblemAndSolution";
import SharkTankSection from "../intro/SharkTankSection";
import IndiaPresence from "./IndiaPresence";
import OurValues from "./OurValues";
import HowItWorks from "./HowItWorks";
import TopBanksSection from "./TopBanksSection";

import { customersdata } from "../data/Data.jsx";
import { Box } from "@mui/material";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToFooter) {
      setTimeout(() => {
        const footer = document.getElementById("footer");
        if (footer) {
          footer.scrollIntoView({ behavior: "instant" });
        }
      }, 0);
      // Clear state to avoid scrolling on subsequent re-renders
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <Suspense fallback={<SaaSStarterLanding />}>
      <SaaSStarterLanding />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Segment Selector Section */}
      <SegmentSelectorSection />

      {/* Shark Tank Section */}
      <SharkTankSection />

      {/* Top Banks For Loan Section */}
      <TopBanksSection />

      {/* Our Values Section */}
      <OurValues />

      {/* Clients Section */}
      <Clients />

      {/* Problem & Solution Section */}
      <ProblemAndSolution />

      {/* Calculator Section */}
      <Calculator />

      {/*Carousel Section */}
      <Carousel />

      {/* Customers Section */}
      <Customers customersdata={customersdata} />

      {/* Eligibility Section */}
      <Eligibility />

      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7ff 0%, #f0f4ff 100%)",
          position: "relative",
        }}
      >

        {/* ok and responsive */}
        {/* <Rating /> */}
        <Box
          sx={{
            padding: {
              xs: "40px 20px",
              sm: "60px 40px",
              md: "80px 60px",
            },
          }}
        >
          {/* ok and responsive */}
          <EmailEnter />

          {/* <CallToAction /> */}

        </Box>
      </Box>
    </Suspense>
  );
};

export default Home;

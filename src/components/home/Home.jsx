import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Lazy Load Components
const Calculator = lazy(() => import("../calculator/Calculator"));
const BrochureSection = lazy(() => import("../brochure/BrochureSection"));
const Customers = lazy(() => import("../customers/Customers"));
const Carousel = lazy(() => import("../../components/carousel/Carousel"));
const Apply = lazy(() => import("../../components/apply/Apply"));
const Advantages = lazy(() => import("../../components/advantages/Advantages"));
const Eligibility = lazy(() =>
  import("../../components/eligibility/Eligibility")
);
const Rating = lazy(() => import("../../components/ratingAndReview/Rating"));
const LendingPartners = lazy(() =>
  import("../../components/lendingpartners/Lendingpartners")
);
const SpotlightText = lazy(() => import("../aboutUs/SpotlightText"));
const HomeSpotlightText = lazy(() => import("../aboutUs/HomeSpotlightText"));
const Clients = lazy(() => import("../clients/Clients"));
const SaaSStarterLanding = lazy(() => import("../intro/Intro"));
const CallToAction = lazy(() => import("../CallAction"));
const EmailEnter = lazy(() => import("../EnterEmain"));
const Hook = lazy(() => import("./Hook"));
const ProblemAndSolution = lazy(() => import("./ProblemAndSolution"));



import { advantagesData, customersdata } from "../data/Data.jsx";
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

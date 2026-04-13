import { lazy, Suspense } from "react";

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
const Faq = lazy(() => import("../faq/Faq"));
const SpotlightText = lazy(() => import("../aboutUs/SpotlightText"));
const HomeSpotlightText = lazy(() => import("../aboutUs/HomeSpotlightText"));
const Clients = lazy(() => import("../clients/Clients"));
const SaaSStarterLanding = lazy(() => import("../intro/Intro"));
const CallToAction = lazy(() => import("../CallAction"));
const EmailEnter = lazy(() => import("../EnterEmain"));
const Hook = lazy(() => import("./Hook"));
const ProblemAndSolution = lazy(() => import("./ProblemAndSolution"));



import { advantagesData, customersdata } from "../data/Data.jsx";
import ChannelPartners from "../channelPartners/ChannelPartners.jsx";
import CareersSection from "../careers/CareersSection.jsx";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Suspense fallback={<SaaSStarterLanding />}>
      <SaaSStarterLanding />

      {/* Hook Section */}
      <Hook />

      {/* Clients Section */}
      <Clients />

      {/* Problem & Solution Section */}
      <ProblemAndSolution />

      {/* Customers Section */}
      <Customers customersdata={customersdata} />

      {/*Carousel Section */}
      <Carousel />

      {/* Calculator Section */}
      <Calculator />


      {/* Brouchere Section */}

      <BrochureSection />


      {/* Apply Section*/}
      {/* <Apply /> */}

      {/* Advantage Section */}
      {/* <Advantages advantagesData={advantagesData} /> */}

      {/* <SpotlightText /> */}
      <HomeSpotlightText />

      {/* <LendingPartners /> */}


      {/* Eligibility Section */}
      <Eligibility />

      {/* Channel Partners Section */}
      <ChannelPartners />

      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7ff 0%, #f0f4ff 100%)",
          position: "relative",
        }}
      >
        <CareersSection />

        {/* ok and responsive */}
        <Rating />
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

          <CallToAction />

          <Faq />
        </Box>
      </Box>
    </Suspense>
  );
};

export default Home;

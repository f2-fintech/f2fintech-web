import { lazy, Suspense } from "react";

// Lazy Load Components
const Calculator = lazy(() => import("../calculator/Calculator"));
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
const Clients = lazy(() => import("../clients/Clients"));
const SaaSStarterLanding = lazy(() => import("../intro/Intro"));
const CallToAction = lazy(() => import("../CallAction"));
const EmailEnter = lazy(() => import("../EnterEmain"));
// const TestimonialsSection = lazy(() => import("../TestoMonial"));

import { advantagesData, customersdata } from "../data/Data.jsx";
import ChannelPartners from "../channelPartners/ChannelPartners.jsx";
import CareersSection from "../careers/CareersSection.jsx";
import { Box } from "@mui/material";
// import FormattingPanel from "../formattingpannel/FormatterModal.jsx";

const Home = () => {
  return (
    <Suspense fallback={<SaaSStarterLanding />}>
      {/* ok and responsive */}
      <SaaSStarterLanding />
      {/* <SkeletonLoader /> */}

      {/* ok and responsive */}
      <Calculator />

      {/* ok and responsive */}
      <Carousel />

      {/* ok and responsive */}
      <Apply />

      {/* ok and responsive */}
      <Advantages advantagesData={advantagesData} />

      {/* ok and responsive */}
      <SpotlightText />

      {/* ok and responsive */}
      <LendingPartners />

      {/* ok and responsive */}
      <Clients />

      {/* ok and responsive */}
      <Eligibility />

      {/* ok and responsive */}
      <Customers customersdata={customersdata} />

      {/* <TestimonialsSection /> */}

      <ChannelPartners />

      {/* <FormattingPanel /> */}

      {/* ok and responsive */}

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

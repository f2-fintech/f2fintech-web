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

      <CallToAction />

      {/* ok and responsive */}
      <Faq />

      {/* ok and responsive */}
      <Rating />

      {/* ok and responsive */}
      <EmailEnter />
    </Suspense>
  );
};

export default Home;

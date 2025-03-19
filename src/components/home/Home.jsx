import Calculator from "../calculator/Calculator";
import Customers from "../customers/Customers";
import Carousel from "../../components/carousel/Carousel";
import Apply from "../../components/apply/Apply";
import Advantages from "../../components/advantages/Advantages";
import Eligibility from "../../components/eligibility/Eligibility";
import Rating from "../../components/ratingAndReview/Rating";
import LendingPartners from "../../components/lendingpartners/Lendingpartners";
import Faq from "../faq/Faq";

import { advantagesData, customersdata } from "../data/Data.jsx";
import SpotlightText from "../aboutUs/SpotlightText.jsx";
import Clients from "../clients/Clients.jsx";
import SaaSStarterLanding from "../intro/Intro";
import CallToAction from "../CallAction.jsx";
import EmailEnter from "../EnterEmain.jsx";
import TestimonialsSection from "../TestoMonial.jsx";

const Home = () => {
  return (
    <>
      {/* ok and responsive */}

      <SaaSStarterLanding />

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

      {/* ok and responsive*/}

      <Customers customersdata={customersdata} />

      {/* <TestimonialsSection /> */}

      <CallToAction />

      {/* ok and responsive*/}

      <Faq />

      {/* ok and responsive */}

      <Rating />

      {/* ok and responsive */}

      <EmailEnter />
    </>
  );
};

export default Home;

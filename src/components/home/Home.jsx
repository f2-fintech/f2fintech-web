import Calculator from "../calculator/Calculator";
import Customers from "../customers/Customers";
import Intro from "../intro/Intro";
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

const Home = () => {
  return (
    <>
      {/* ok and responsive */}
      <Intro />
      <Calculator />
      {/* ok  */}
      <Carousel />
      {/* ok  */}
      <Apply />
      {/* ok */}
      <Advantages advantagesData={advantagesData} />
      {/* ok */}
      <SpotlightText />
      <LendingPartners />
      <Clients />
      {/* ok and responsive */}
      <Eligibility />
      {/* ok and responsive*/}
      {/* ok and responsive */}
      {/* ok and responsive*/}
      <Customers customersdata={customersdata} />
      {/* ok and responsive*/}
      <Faq />
      {/* ok and responsive */}
      <Rating />
    </>
  );
};

export default Home;

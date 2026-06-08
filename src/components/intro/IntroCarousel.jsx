import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Carousel from "react-material-ui-carousel";
import PropTypes from "prop-types";

import API from "../../apis";
import Intro from "./Intro";
import { setLoanProviders } from "../../redux/actions/LoanProviderAction";

export default function IntroCarousel() {
  const dispatch = useDispatch();
  const loanProviders = useSelector((state) => state.allLoanProviders);

  useEffect(() => {
    API.LoanProviderAPI.getAll()
      .then((response) => {
        if (response.data.status === "Success") {
          dispatch(
            setLoanProviders({
              listData: response.data.data.rows,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error, "loanproviderapierror");
      });
  }, []);

  return (
    <Carousel autoPlay interval={3000}>
      {loanProviders?.listData?.map((item, index) => (
        <Intro
          key={index}
          title={item.title}
          home={item.is_home}
          homeimg={'../new/sl_121021_47240_16.webp'}
          interestRate={item.interest_rate}
          text={{
            description: item.description,
            short_description: item.short_description,
            long_description: item.long_description,
          }}
        />
      ))}
    </Carousel>
  );
}

Intro.propTypes = {
  title: PropTypes.string.isRequired,
  home: PropTypes.bool.isRequired,
  homeimg: PropTypes.string.isRequired,
};

{/* <Intro
homeimg={item.home_image}
text={{

}}
/> */}
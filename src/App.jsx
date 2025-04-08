import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import "./App.css";

import ApplicationForm from "./components/application/ApplicationForm";
import Blogs from "./components/blogs/Blogs";
import Businessloan from "./components/businessloan/Businessloan";
import BusinessLoanForWomen from "./components/businessLoanForWomen/BusinessLoanForWomen";
import Compare from "./components/providers/Compare";
import ECommerceBusinessLoan from "./components/eCommerceBusinessLoan/ECommerceBusinessLoan";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Listing from "./components/providers/Listing";
import Login from "./components/login/Login";
import MsmeLoan from "./components/msmeLoan/MsmeLoan";
import Profile from "./components/login/Profile";
import ResponsiveAppBar from "./components/appBar/Appbar";
import ResetPassword from "./components/login/Resetpassword";
import ScrollToTop from "./components/common/ScrollToTop";
import SmallBusinessLoan from "./components/smallBusinessLoan/SmallBusinessLoan";
import UnsecuredLoan from "./components/unsecuredLoan/UnsecuredLoan";
import QueryMain from "./components/query/QueryMain";
import Chatbot from "./components/chatbot/chatbot";
import FavouriteCard from "./components/providers/FavouriteCard";
import AboutUs from "./components/aboutUs/AboutUs";
import Privacy from "./components/privacy/Privacy";
import Terms from "./components/termAndCondition/Terms";
import Doctor from "./components/doctor/Doctor";
import { ColorModeContext, useMode } from "./theme";
import Loan from "./components/loantracking/loantracking";
import NotFoundPage from "./components/notfoundpage/notfoundpage";
import MaintenancePage from "./components/maintenancepage/Maintenance";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GetInTouch from "./components/getInTouch/GetInTouch";
import EligibilityCriteria from "./components/eligibilityCriteria/EligibilityCriteria";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const { pathname } = location;

  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <>
          {isMaintenance ? (
            <MaintenancePage />
          ) : (
            <>
              <ScrollToTop />
              <ResponsiveAppBar />
              <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route exact path="/" element={<Home />} />
                <Route exact path="/business-loan" element={<Businessloan />} />
                <Route exact path="/msme-loan" element={<MsmeLoan />} />
                <Route
                  exact
                  path="/small-business-loan"
                  element={<SmallBusinessLoan />}
                />
                <Route
                  exact
                  path="/unsecured-business-loan"
                  element={<UnsecuredLoan />}
                />
                <Route
                  exact
                  path="/business-loan-for-women"
                  element={<BusinessLoanForWomen />}
                />
                <Route
                  exact
                  path="/ecommerce-business-loan"
                  element={<ECommerceBusinessLoan />}
                />
                <Route exact path="/query" element={<QueryMain />} />
                <Route exact path="/chatbot" element={<Chatbot />} />
                <Route exact path="/blogs" element={<Blogs />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/providers" element={<Listing />} />
                <Route exact path="/providers/compare" element={<Compare />} />

                <Route
                  exact
                  path="/application-form"
                  element={<ApplicationForm />}
                />
                <Route exact path="/favourites" element={<FavouriteCard />} />
                <Route
                  exact
                  path="/reset-password"
                  element={<ResetPassword />}
                />
                <Route
                  exact
                  path="/maintenance-page"
                  element={<MaintenancePage />}
                />
                <Route exact path="/loan-tracker" element={<Loan />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/about-us" element={<AboutUs />} />
                <Route exact path="/privacy-policy" element={<Privacy />} />
                <Route exact path="/terms-&-condition" element={<Terms />} />
                <Route exact path="/doctor-loan" element={<Doctor />} />
                <Route path="/get-in-touch" element={<GetInTouch />} />
                <Route path="intro" element={<NotFoundPage />} />
                <Route
                  path="eligibility-criteria"
                  element={<EligibilityCriteria />}
                />
              </Routes>
              <Footer />
            </>
          )}
        </>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

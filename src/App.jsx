import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
// import BlogList from "./pages/BlogList"; // your listing page
import BlogDetails from "./components/blogs/BlogDetails.jsx"; // dynamic blog page


import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import { ColorModeContext, useMode } from "./theme";
import { lazy, Suspense } from "react";
import LandingPageSkeleton from "./components/home/LandingSkeleton.jsx";
import FormatterPage from "./components/blogs/formattingpannel/FormatterPage.jsx";

const ApplicationForm = lazy(() =>
  import("./components/application/ApplicationForm")
);
const Blogs = lazy(() => import("./components/blogs/Blogs"));

const BusinessBlogs = lazy(() =>
  import("./components/blogs/BusinessBlogs.jsx")
);
const OverDraftBlogs = lazy(() =>
  import("./components/blogs/OverDraftBlog.jsx")
);
const PersonalBlogs = lazy(() =>
  import("./components/blogs/PersonalBlogs.jsx")
);
const ChannelPartners = lazy(() =>
  import("./components/channelPartners/ChannelPartners.jsx")
);

const Businessloan = lazy(() =>
  import("./components/businessloan/Businessloan")
);
const BusinessLoanForWomen = lazy(() =>
  import("./components/businessLoanForWomen/BusinessLoanForWomen")
);
const Compare = lazy(() => import("./components/providers/Compare"));
const ECommerceBusinessLoan = lazy(() =>
  import("./components/eCommerceBusinessLoan/ECommerceBusinessLoan")
);
const Footer = lazy(() => import("./components/footer/Footer"));
const Home = lazy(() => import("./components/home/Home"));
const Listing = lazy(() => import("./components/providers/Listing"));
const Login = lazy(() => import("./components/login/Login"));
const MsmeLoan = lazy(() => import("./components/msmeLoan/MsmeLoan"));
const Profile = lazy(() => import("./components/login/Profile"));
const ResponsiveAppBar = lazy(() => import("./components/appBar/Appbar"));
const ResetPassword = lazy(() => import("./components/login/Resetpassword"));
const ScrollToTop = lazy(() => import("./components/common/ScrollToTop"));
const SmallBusinessLoan = lazy(() =>
  import("./components/smallBusinessLoan/SmallBusinessLoan")
);
const UnsecuredLoan = lazy(() =>
  import("./components/unsecuredLoan/UnsecuredLoan")
);
const QueryMain = lazy(() => import("./components/query/QueryMain"));
const FavouriteCard = lazy(() =>
  import("./components/providers/FavouriteCard")
);
const AboutUs = lazy(() => import("./components/aboutUs/AboutUs"));
const Privacy = lazy(() => import("./components/privacy/Privacy"));
const Terms = lazy(() => import("./components/termAndCondition/Terms"));
const Doctor = lazy(() => import("./components/doctor/Doctor"));
const Personal = lazy(() => import("./components/personal/Personal"));
const Loan = lazy(() => import("./components/loantracking/loantracking"));
const NotFoundPage = lazy(() =>
  import("./components/notfoundpage/notfoundpage")
);
const MaintenancePage = lazy(() =>
  import("./components/maintenancepage/Maintenance")
);
const GetInTouch = lazy(() => import("./components/getInTouch/GetInTouch"));
const EligibilityCriteria = lazy(() =>
  import("./components/eligibilityCriteria/EligibilityCriteria")
);
const OurProducts = lazy(() => import("./components/ourProducts/OurProducts"));
const ChatbotWidget = lazy(() => import("./components/chatbot/chatbot.jsx"));
const Plans = lazy(() => import("./components/plans/plans.jsx"));
const PortfolioPlans = lazy(() =>
  import("./components/portfolio/PortfolioPlans.jsx")
);
const CibilScore = lazy(() => import("./components/cibilScore/CibilScore.jsx"));

import NetworkManager from "./components/common/NetworkManager.jsx";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const { pathname } = location;

  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NetworkManager>
          <Suspense fallback={<LandingPageSkeleton />}>
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
                    <Route
                      exact
                      path="/business-loan"
                      element={<Businessloan />}
                    />
                    <Route exact path="/home-loan" element={<MsmeLoan />} />
                    <Route
                      exact
                      path="/loan-against-property"
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
                    <Route exact path="/our-products" element={<OurProducts />} />
                    <Route exact path="/query" element={<QueryMain />} />
                    <Route exact path="/chatbot" element={<ChatbotWidget />} />

                    <Route exact path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:slug" element={<BlogDetails />} />
                    <Route
                      exact
                      path="/blogs-formatting/:id"
                      element={<FormatterPage />}
                    />

                    <Route
                      exact
                      path="/personal-loan-blogs"
                      element={<PersonalBlogs />}
                    />
                    <Route
                      exact
                      path="/business-loan-blogs"
                      element={<BusinessBlogs />}
                    />
                    <Route
                      exact
                      path="/overdraft-blogs"
                      element={<OverDraftBlogs />}
                    />

                    <Route exact path="/plans" element={<Plans />} />
                    <Route exact path="/portfolio" element={<PortfolioPlans />} />
                    <Route exact path="/check-cibil-score" element={<CibilScore />} />

                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/providers" element={<Listing />} />
                    <Route
                      exact
                      path="/providers/compare"
                      element={<Compare />}
                    />

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
                    <Route exact path="/personal-loan" element={<Personal />} />
                    <Route path="/get-in-touch" element={<GetInTouch />} />
                    <Route path="intro" element={<NotFoundPage />} />
                    <Route
                      path="channel-partners"
                      element={<ChannelPartners />}
                    />

                    <Route
                      path="eligibility-criteria"
                      element={<EligibilityCriteria />}
                    />
                  </Routes>
                  {pathname === "/" && (
                    <div
                      style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        zIndex: 9999,
                      }}
                    >
                      {/* <ChatbotWidget /> */}
                    </div>
                  )}

                  <Footer />
                  <ToastContainer position="top-right" autoClose={3000} />
                </>
              )}
            </>
          </Suspense>
        </NetworkManager>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import GlobalBackground from "./components/common/GlobalBackground";
// import BlogList from "./pages/BlogList"; // your listing page

import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import { ColorModeContext, useMode } from "./theme";
import SEO from "./components/seo/SEO";
import { lazy, Suspense } from "react";

// Lazily loaded - excluded from main bundle
const LandingPageSkeleton = lazy(() => import("./components/home/LandingSkeleton.jsx"));
const BlogDetails = lazy(() => import("./components/blogs/BlogDetails.jsx"));
const FormatterPage = lazy(() => import("./components/blogs/formattingpannel/FormatterPage.jsx"));

const ApplicationForm = lazy(() =>
  import("./components/application/ApplicationForm")
);
const Blogs = lazy(() => import("./components/blogs/Blogs"));
const BrochureSection = lazy(() => import("./components/brochure/BrochureSection"));

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
const Careers = lazy(() => import("./components/careers/Careers"));
const Privacy = lazy(() => import("./components/privacy/Privacy"));
const Terms = lazy(() => import("./components/termAndCondition/Terms"));
const Compliance = lazy(() => import("./components/compliance/Compliance.jsx"));
const FairPractices = lazy(() => import("./components/fairPractices/FairPractices.jsx"));
const Grievance = lazy(() => import("./components/grievance/Grievance.jsx"));
const Doctor = lazy(() => import("./components/doctor/Doctor"));
const DoctorsAndProfessionals = lazy(() =>
  import("./components/doctorsAndProfessionals/DoctorsAndProfessionals")
);
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
const DownloadCibil = lazy(() => import("./components/cibilScore/DownloadCibil.jsx"));
const CibilAdminDashboard = lazy(() => import("./components/cibilScore/CibilAdminDashboard.jsx"));
const FaqPage = lazy(() => import("./components/faq/FaqPage.jsx"));
const CustomerFeedback = lazy(() => import("./components/feedback/CustomerFeedback.jsx"));

const DSA = lazy(() => import("./components/dsa/DSA.jsx"));
const Realtor = lazy(() => import("./components/realtor/Realtor.jsx"));
const OfferPage = lazy(() => import("./components/offer/OfferPage.jsx"));
const BankDetailPage = lazy(() => import("./components/homeLoanBanks/BankDetailPage.jsx"));
const CreditCards = lazy(() => import("./components/creditCards/CreditCards.jsx"));
const CardDetailPage = lazy(() => import("./components/creditCards/CardDetailPage.jsx"));
const CreditCardAdminDashboard = lazy(() => import("./components/creditCards/CreditCardAdminDashboard.jsx"));

const NetworkManager = lazy(() => import("./components/common/NetworkManager.jsx"));
const CookieConsent = lazy(() => import("./components/common/CookieConsent.jsx"));
const FestivalEngine = lazy(() => import("./components/festival/FestivalEngine.jsx"));
const PWAInstallPrompt = lazy(() => import("./components/common/PWAInstallPrompt.jsx"));

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const { pathname } = location;

  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === "true";
  const isFeedbackRoute =
    pathname.replace(/\/$/, "") === "/feedback" ||
    pathname.replace(/\/$/, "") === "/r/gidmH8krWu";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Global animated background - fixed, visible on all pages */}
        <GlobalBackground />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* Festival overlay — inside Box stacking context so AppBar (z-index 1100) wins over particles (z-index 999) */}
          <Suspense fallback={null}>
            <FestivalEngine />
          </Suspense>
          <NetworkManager>
            <Suspense fallback={<LandingPageSkeleton />}>
              <>
                {isMaintenance ? (
                  <MaintenancePage />
                ) : (
                  <>
                    <ScrollToTop />
                    <SEO />
                    <ResponsiveAppBar />
                    <main role="main">
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
                        <Route exact path="/download-cibil" element={<DownloadCibil />} />
                        <Route exact path="/admin/cibil-dashboard" element={<CibilAdminDashboard />} />
                        <Route exact path="/admin/credit-card-leads" element={<CreditCardAdminDashboard />} />
                        <Route exact path="/admin/cards-dashboard" element={<CreditCardAdminDashboard />} />

                        <Route exact path="/profile" element={<Profile />} />
                        <Route exact path="/lending-partners" element={<Listing />} />
                        <Route
                          exact
                          path="/lending-partners/compare"
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
                        <Route exact path="/careers" element={<Careers />} />
                        <Route exact path="/privacy-policy" element={<Privacy />} />
                        <Route exact path="/terms-and-condition" element={<Terms />} />
                        <Route exact path="/compliance" element={<Compliance />} />
                        <Route exact path="/fair-practices-code" element={<FairPractices />} />
                        <Route exact path="/grievance-policy" element={<Grievance />} />
                        <Route exact path="/doctor-loan" element={<Doctor />} />
                        <Route
                          exact
                          path="/doctors-and-professionals"
                          element={<DoctorsAndProfessionals />}
                        />
                        <Route exact path="/personal-loan" element={<Personal />} />
                        <Route exact path="/brochures" element={<BrochureSection />} />
                        <Route path="/get-in-touch" element={<GetInTouch />} />
                        <Route path="/intro" element={<NotFoundPage />} />
                        <Route
                          path="/channel-partners"
                          element={<ChannelPartners />}
                        />

                        <Route
                          path="/eligibility-checker"
                          element={<EligibilityCriteria />}
                        />
                        <Route exact path="/faq" element={<FaqPage />} />
                        <Route exact path="/feedback" element={<CustomerFeedback />} />
                        <Route exact path="/cards" element={<CreditCards />} />
                        <Route exact path="/credit-cards" element={<CreditCards />} />
                        <Route path="/cards/:cardSlug" element={<CardDetailPage />} />
                        <Route path="/credit-cards/:cardSlug" element={<CardDetailPage />} />
                        <Route exact path="/r/gidmH8krWu" element={<CustomerFeedback />} />

                        <Route exact path="/dsa" element={<DSA />} />
                        <Route exact path="/realtor" element={<Realtor />} />
                        <Route exact path="/offer" element={<OfferPage />} />
                        <Route path="/home-loans/:bankSlug" element={<BankDetailPage />} />
                        <Route path="/:loanType/:bankSlug" element={<BankDetailPage />} />
                      </Routes>
                    </main>
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

                    {!isFeedbackRoute && <Footer />}
                    <CookieConsent />
                    <PWAInstallPrompt />
                    <ToastContainer position="top-right" autoClose={3000} />
                  </>
                )}
              </>
            </Suspense>
          </NetworkManager>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

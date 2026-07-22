import React, { Component, Suspense, useEffect, useRef, useState, lazy } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

// ─── Above-the-fold: static imports (render immediately) ──────────────────
import SaaSStarterLanding from "../intro/Intro";
import HowItWorks from "./HowItWorks";
import SegmentSelectorSection from "../intro/SegmentSelectorSection";
import SharkTankSection from "../intro/SharkTankSection";

// ─── Below-the-fold: lazy-imported (JS bundle deferred) ───────────────────
const OurValues = lazy(() => import("./OurValues"));
const Clients = lazy(() => import("../clients/Clients"));
const ProblemAndSolution = lazy(() => import("./ProblemAndSolution"));
const TopBanksSection = lazy(() => import("./TopBanksSection"));
const Calculator = lazy(() => import("../calculator/Calculator"));
const Carousel = lazy(() => import("../../components/carousel/Carousel"));
const Customers = lazy(() => import("../customers/Customers"));
const Eligibility = lazy(() => import("../../components/eligibility/Eligibility"));
const EmailEnter = lazy(() => import("../EnterEmain"));

import { customersdata } from "../data/Data.jsx";

class SectionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Section render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// ─── LazySection ───────────────────────────────────────────────────────────
// Combines React.lazy (JS bundle) with IntersectionObserver (true render deferral).
// The section's children do NOT mount — and therefore do NOT fire any API
// calls or image requests — until the sentinel div comes within `rootMargin`
// of the viewport. A min-height placeholder preserves scroll layout.
function LazySection({ children, minHeight = 200 }) {
  const sentinelRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => setShouldRender(true), 30000);

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      clearTimeout(fallbackTimer);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
          clearTimeout(fallbackTimer);
        }
      },
      { rootMargin: "0px 0px 400px 0px" }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div ref={sentinelRef} style={{ minHeight: shouldRender ? undefined : minHeight }}>
      {shouldRender && (
        <SectionErrorBoundary>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </SectionErrorBoundary>
      )}
    </div>
  );
}

// ─── Home ──────────────────────────────────────────────────────────────────
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
    <>
      {/* ── Above-the-fold: always rendered immediately ────────────────── */}
      <SaaSStarterLanding />
      <HowItWorks />
      <SegmentSelectorSection />
      <SharkTankSection />

      {/* ── Below-the-fold: only mount when near viewport ─────────────── */}
      {/* Each LazySection holds a sentinel div. The IntersectionObserver   */}
      {/* triggers rendering only when that div is 300px from the screen.   */}
      {/* No API calls, no image downloads until then.                       */}

      {/* Our Values */}
      <LazySection minHeight={400}>
        <OurValues />
      </LazySection>

      {/* Clients / Stats */}
      <LazySection minHeight={500}>
        <Clients />
      </LazySection>

      {/* Problem & Solution */}
      <LazySection minHeight={400}>
        <ProblemAndSolution />
      </LazySection>

      {/* Top Banks For Loan Section */}
      {/* <LazySection minHeight={500}>
        <TopBanksSection />
      </LazySection> */}

      {/* Calculator */}
      <LazySection minHeight={350}>
        <Calculator />
      </LazySection>

      {/* Carousel ticker */}
      <LazySection minHeight={64}>
        <Carousel />
      </LazySection>

      {/* Customers / Reviews — this is the section with API calls.       */}
      {/* With LazySection, getRating() + getCustomerProfile() only fire  */}
      {/* when the user scrolls near the testimonials section.            */}
      <LazySection minHeight={600}>
        <Customers customersdata={customersdata} />
      </LazySection>

      {/* Eligibility — defers loading of Fingerprint.gif, Fillout.gif,  */}
      {/* Wallet.gif and all 3 eligibility icons until near viewport.     */}
      <LazySection minHeight={400}>
        <Eligibility />
      </LazySection>

      {/* Email CTA section */}
      <LazySection minHeight={200}>
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
      </LazySection>
    </>
  );
};

export default Home;

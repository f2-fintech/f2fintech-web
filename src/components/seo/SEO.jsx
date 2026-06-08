import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

/**
 * Route-level SEO metadata map.
 * Each entry defines the canonical URL, page title, meta description,
 * and Open Graph data for a specific route.
 * This directly addresses "Crawled — Currently Not Indexed" by giving
 * every page unique, substantial metadata that Google values.
 */
const ROUTE_META = {
  "/": {
    title: "F2 Fintech | Instant Personal & Business Loans | Fast Approval India",
    description:
      "Apply for instant personal loans, business loans, home loans & MSME loans in India. F2 Fintech offers fast approval, minimal documentation, and competitive interest rates.",
    keywords: "instant loan india, personal loan online, business loan, home loan, MSME loan, F2 Fintech",
  },
  "/personal-loan": {
    title: "Personal Loan Online | Instant Approval | Low Interest Rate | F2 Fintech",
    description:
      "Get a personal loan up to ₹50 lakh with instant online approval at F2 Fintech. Minimal documentation, competitive interest rates starting 10.5% p.a., and quick disbursal.",
    keywords: "personal loan, instant personal loan, personal loan online india, personal loan low interest",
  },
  "/business-loan": {
    title: "Business Loan India | MSME & SME Loans | F2 Fintech",
    description:
      "Grow your business with collateral-free business loans up to ₹5 crore. F2 Fintech connects you with top banks and NBFCs for fast approval and flexible repayment.",
    keywords: "business loan india, SME loan, MSME loan, collateral free business loan, working capital loan",
  },
  "/home-loan": {
    title: "Home Loan | Low Interest Rates | Easy EMI | F2 Fintech",
    description:
      "Apply for a home loan with F2 Fintech and get the best interest rates from leading banks and NBFCs. Quick processing, minimal paperwork, and flexible tenure options.",
    keywords: "home loan, housing loan, home loan india, low interest home loan, home loan EMI calculator",
  },
  "/doctor-loan": {
    title: "Doctor Loan | Professional Loan for Doctors | F2 Fintech",
    description:
      "Special doctor loans for medical professionals to set up clinics, buy equipment, or expand practice. Competitive rates, minimal documentation, and fast approval.",
    keywords: "doctor loan, medical professional loan, clinic loan, equipment loan for doctors",
  },
  "/loan-against-property": {
    title: "Loan Against Property | Up to ₹10 Crore | F2 Fintech",
    description:
      "Unlock the value of your property with a loan against property (LAP) from F2 Fintech. Get up to ₹10 crore at low interest rates with flexible repayment options.",
    keywords: "loan against property, LAP, property loan, mortgage loan india",
  },
  "/unsecured-business-loan": {
    title: "Unsecured Business Loan | No Collateral | F2 Fintech",
    description:
      "Get an unsecured business loan without pledging any asset. F2 Fintech offers collateral-free funding for SMEs and MSMEs with fast approval and flexible EMI.",
    keywords: "unsecured business loan, no collateral loan, business loan without security",
  },
  "/business-loan-for-women": {
    title: "Business Loan for Women Entrepreneurs | F2 Fintech",
    description:
      "Special business loans for women entrepreneurs with lower interest rates and flexible eligibility. Empower your business journey with F2 Fintech's dedicated women's loan program.",
    keywords: "business loan for women, women entrepreneur loan, startup loan for women, mudra loan",
  },
  "/ecommerce-business-loan": {
    title: "E-Commerce Business Loan | Online Seller Financing | F2 Fintech",
    description:
      "Funding solutions for Amazon, Flipkart, and other e-commerce sellers. F2 Fintech provides quick working capital loans tailored for online businesses.",
    keywords: "ecommerce business loan, online seller loan, amazon seller loan, flipkart seller loan",
  },
  "/check-cibil-score": {
    title: "Check CIBIL Score Free | Credit Score Check Online | F2 Fintech",
    description:
      "Check your CIBIL score for free on F2 Fintech. Understand your creditworthiness and improve your chances of loan approval with our instant credit score tool.",
    keywords: "check CIBIL score, free credit score, CIBIL score online, credit report india",
  },
  "/blogs": {
    title: "Finance & Loan Blogs | Tips, Guides & News | F2 Fintech",
    description:
      "Read expert articles on personal loans, business finance, credit scores, and money management. Stay informed with F2 Fintech's latest financial guides and tips.",
    keywords: "loan blogs, finance articles, personal loan tips, business loan guide",
  },
  "/personal-loan-blogs": {
    title: "Personal Loan Blog | Tips, Eligibility & Interest Rates | F2 Fintech",
    description:
      "Expert guides on personal loans — how to apply, check eligibility, compare interest rates, and improve your CIBIL score. Read F2 Fintech's personal loan blog.",
    keywords: "personal loan blog, personal loan tips, personal loan eligibility, personal loan interest rate",
  },
  "/business-loan-blogs": {
    title: "Business Loan Blog | SME Finance Tips & Guides | F2 Fintech",
    description:
      "Read practical guides on business financing, working capital, GST loans, and MSME schemes. F2 Fintech's business loan blog covers everything small businesses need to know.",
    keywords: "business loan blog, SME finance, MSME loan tips, working capital guide",
  },
  "/overdraft-blogs": {
    title: "Overdraft Loan Blog | OD Facility Guide | F2 Fintech",
    description:
      "Learn about bank overdraft facilities, OD limits, interest rates, and how to leverage overdraft for business cash flow. Guides by F2 Fintech experts.",
    keywords: "overdraft blog, OD facility, bank overdraft, overdraft loan guide",
  },
  "/about-us": {
    title: "About F2 Fintech | India's Trusted Loan Aggregator",
    description:
      "Learn about F2 Fintech — India's leading digital loan aggregator connecting borrowers with 50+ banks and NBFCs. Our mission is to make loans simple, fast, and transparent.",
    keywords: "about F2 Fintech, F2 Fintech company, loan aggregator india, digital lending platform",
  },
  "/get-in-touch": {
    title: "Contact F2 Fintech | Get In Touch | Loan Enquiry",
    description:
      "Contact F2 Fintech for loan enquiries, partnership opportunities, or customer support. Reach us at +91 8810600135 or visit our Noida office.",
    keywords: "contact F2 Fintech, loan enquiry, F2 Fintech phone number, F2 Fintech Noida",
  },
  "/faq": {
    title: "Frequently Asked Questions | Loans & Finance | F2 Fintech",
    description:
      "Find answers to common questions about personal loans, business loans, eligibility criteria, interest rates, and the application process at F2 Fintech.",
    keywords: "loan FAQ, F2 Fintech FAQ, loan questions, personal loan help, business loan help",
  },
  "/our-products": {
    title: "Our Loan Products | Personal, Business & Home Loans | F2 Fintech",
    description:
      "Explore F2 Fintech's full range of financial products — personal loans, business loans, home loans, doctor loans, LAP, and more from 50+ partner banks and NBFCs.",
    keywords: "loan products, F2 Fintech products, compare loans india",
  },
  "/providers": {
    title: "Compare Loan Providers | Best Banks & NBFCs | F2 Fintech",
    description:
      "Compare loan offers from HDFC, ICICI, Bajaj Finserv, Axis Bank, and 50+ lenders on F2 Fintech. Find the best interest rate and EMI that suits your needs.",
    keywords: "compare loan providers, best bank for loan, NBFC loan comparison, loan interest rate comparison",
  },
  "/eligibility-criteria": {
    title: "Loan Eligibility Criteria | Check Eligibility | F2 Fintech",
    description:
      "Check your loan eligibility at F2 Fintech. Understand the income, CIBIL score, age, and documentation requirements for personal, business, and home loans.",
    keywords: "loan eligibility, loan eligibility criteria, personal loan eligibility, business loan eligibility",
  },
  "/channel-partners": {
    title: "Become a Channel Partner | Earn Commission | F2 Fintech",
    description:
      "Join F2 Fintech's channel partner program and earn attractive commissions by referring loan customers. Simple onboarding, real-time tracking, and quick payouts.",
    keywords: "channel partner, loan referral program, F2 Fintech partner, DSA loan agent",
  },
  "/brochures": {
    title: "F2 Fintech Brochures | Download Loan Information",
    description:
      "Download F2 Fintech's product brochures for detailed information on personal loans, business loans, and financial services.",
    keywords: "F2 Fintech brochure, loan brochure download",
  },
  "/privacy-policy": {
    title: "Privacy Policy | F2 Fintech",
    description:
      "Read F2 Fintech's privacy policy to understand how we collect, use, and protect your personal data in compliance with Indian data protection regulations.",
    keywords: "F2 Fintech privacy policy, data protection",
  },
  "/terms-and-condition": {
    title: "Terms & Conditions | F2 Fintech",
    description:
      "Read the terms and conditions governing the use of F2 Fintech's website and financial services platform.",
    keywords: "F2 Fintech terms conditions, terms of use",
  },
  "/feedback": {
    title: "Customer Feedback | Share Your Experience | F2 Fintech",
    description:
      "We'd love to hear from you! Share your experience with F2 Fintech and help us improve our loan services. Quick, easy, and your feedback truly matters.",
    keywords: "F2 Fintech feedback, customer feedback, review F2 Fintech, loan service feedback",
  },
};

// Default fallback metadata
const DEFAULT_META = {
  title: "F2 Fintech | Instant Loans | Fast Approval India",
  description:
    "Apply for instant personal loans, business loans, home loans, and MSME loans in India. F2 Fintech — fast approval, minimal documentation, competitive rates.",
  keywords: "loan india, F2 Fintech, personal loan, business loan",
};

const SEO = () => {
  const location = useLocation();
  const baseUrl = "https://f2fintech.com";

  // Normalize pathname: strip trailing slash (except root "/")
  const rawPath = location.pathname;
  const normalizedPath =
    rawPath !== "/" && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;

  // Canonical URL always uses normalized HTTPS non-www form
  const canonicalUrl = `${baseUrl}${normalizedPath}`;

  // Resolve per-route metadata or fallback
  let meta = ROUTE_META[normalizedPath];

  // If no exact match, check if it's a dynamic blog route to prevent duplicate canonical issues
  if (!meta) {
    if (normalizedPath.startsWith("/blogs/")) {
      // Derive a readable title from the URL slug so each blog URL has a unique initial title
      // This matters because Google may crawl before React hydrates the real blog title
      const slug = normalizedPath.replace("/blogs/", "");
      const readableSlug = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      meta = {
        title: `${readableSlug} | F2 Fintech Blog`,
        description: `Read the F2 Fintech guide on ${readableSlug}. Expert financial content on loans, interest rates, and more.`,
        keywords: `${readableSlug.toLowerCase()}, f2 fintech blog, loan guide india`,
      };
    } else {
      meta = DEFAULT_META;
    }
  }

  // Check if this route is private/admin/utility and should not be indexed by search engines.
  // This matches disallowed routes in robots.txt.
  const isPrivateRoute =
    normalizedPath === "/reset-password" ||
    normalizedPath === "/profile" ||
    normalizedPath === "/favourites" ||
    normalizedPath === "/loan-tracker" ||
    normalizedPath === "/application-form" ||
    normalizedPath === "/query" ||
    normalizedPath === "/chatbot" ||
    normalizedPath === "/maintenance-page" ||
    normalizedPath === "/login" ||
    normalizedPath === "/plans" ||
    normalizedPath === "/portfolio" ||
    normalizedPath === "/providers/compare" ||
    normalizedPath.startsWith("/blogs-formatting");

  const robotsValue = isPrivateRoute ? "noindex, nofollow" : (meta.robots || "index, follow");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is F2 Fintech?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "F2 Fintech is a digital loan aggregator and financial service platform that helps individuals, professionals, and businesses compare and avail loans from multiple banks and NBFCs — quickly, transparently, and 100% paperless.",
        },
      },
      {
        "@type": "Question",
        name: "What types of loans does F2 Fintech offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "F2 Fintech offers Personal Loans, Business Loans, Home Loans, Loan Against Property, Unsecured Business Loans, E-Commerce Business Loans, Doctor Loans, and Business Loans for Women Entrepreneurs.",
        },
      },
      {
        "@type": "Question",
        name: "How do I check my loan eligibility at F2 Fintech?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Visit our Eligibility Criteria page or use the EMI Calculator on F2 Fintech. Provide basic details like income, business turnover, and CIBIL score for an instant eligibility assessment.",
        },
      },
      {
        "@type": "Question",
        name: "How long does loan approval and disbursal take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "F2 Fintech partners with leading banks and NBFCs to ensure approvals within 24–72 hours and disbursal within 3–7 working days depending on documentation and lender processing.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum CIBIL score needed for a loan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most lenders on F2 Fintech require a minimum CIBIL score of 700 for personal loans and 650–700 for business loans. Check your free CIBIL score on our platform.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to apply for a loan on F2 Fintech",
    description:
      "A quick, step-by-step guide to applying for a business or personal loan securely via F2 Fintech.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose Your Loan Type",
        text: "Browse our loan products — personal loans, business loans, home loans, doctor loans — and select the one that fits your needs.",
      },
      {
        "@type": "HowToStep",
        name: "Check Eligibility",
        text: "Use our EMI and Eligibility calculators, or check your CIBIL score for free to understand your loan eligibility instantly.",
      },
      {
        "@type": "HowToStep",
        name: "Submit Application",
        text: "Fill out the online application form and securely upload the required documents — completely paperless.",
      },
      {
        "@type": "HowToStep",
        name: "Get Matched and Disbursed",
        text: "Our platform matches you with the best lender from 50+ banks and NBFCs, and upon approval, funds are disbursed to your account.",
      },
    ],
  };

  return (
    <Helmet>
      {/* Dynamic Page Title */}
      <title>{meta.title}</title>

      {/* Dynamic Meta Description */}
      <meta name="description" content={meta.description} />

      {/* Dynamic Keywords */}
      <meta name="keywords" content={meta.keywords} />

      {/* Robots Meta Tag */}
      <meta name="robots" content={robotsValue} />

      {/* Canonical Tag — always points to the preferred HTTPS non-www URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content="https://f2fintech.com/og-image.webp" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="F2 Fintech" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content="https://f2fintech.com/og-image.webp" />
      <meta name="twitter:site" content="@f2fintech" />

      {/* JSON-LD Schemas */}
      {normalizedPath === "/" && (
        <>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        </>
      )}
    </Helmet>
  );
};

export default SEO;
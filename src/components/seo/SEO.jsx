import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

/**
 * Route-level SEO metadata map.
 * Each entry defines the canonical URL, page title, meta description,
 * and Open Graph data for a specific route.
 * This directly addresses "Crawled - Currently Not Indexed" by giving
 * every page unique, substantial metadata that Google values.
 */
const ROUTE_META = {
  "/": {
    title: "F2 Fintech | Doctor Loans, MSME & Professional Loans | Fast Approval India",
    description:
      "F2 Fintech helps doctors, CAs, salaried professionals, and MSMEs across India get fast loans - personal, business, home & doctor loans from 50+ banks with competitive rates.",
    keywords: "doctor loan for MBBS India, personal loan for chartered accountant India, MSME loan without collateral India, clinic setup loan India, same day personal loan salaried, home loan balance transfer 2026, F2 Fintech loan aggregator",
  },
  "/personal-loan": {
    title: "Personal Loan for Chartered Accountants & Salaried Professionals | F2 Fintech",
    description:
      "Get a personal loan for CAs, salaried professionals, and self-employed individuals across India. Same-day disbursal with Bajaj Finserv, HDFC, ICICI. Rates from 10.5% p.a. Apply online.",
    keywords: "personal loan for chartered accountant India, CA loan without collateral India, same day personal loan salaried India, personal loan for salaried professional 2026, personal loan self-employed without ITR, personal loan minimum income 20000 India",
  },
  "/business-loan": {
    title: "Business Loan Without Collateral | MSME Loan Up to ₹50 Lakh India | F2 Fintech",
    description:
      "Get collateral-free MSME and business loans up to ₹50 lakh across India. F2 Fintech connects you with ICICI, HDFC, Bajaj Finserv, Tata Capital for fast approval without pledging assets.",
    keywords: "business loan without collateral India, MSME loan without collateral 50 lakh, collateral free business loan India, startup business loan 1 year old company, working capital loan vs term loan India, business loan GST return required",
  },
  "/home-loan": {
    title: "Home Loan Balance Transfer | Lowest Rate 2026 | Salaried Professionals | F2 Fintech",
    description:
      "Apply for the lowest home loan rates in India. F2 Fintech helps salaried professionals with home loan balance transfer, new purchase, and refinancing options from top banks.",
    keywords: "home loan balance transfer lowest rate 2026, home loan for salaried professional India, housing loan balance transfer India, lowest home loan rate India 2026, home loan refinancing process India",
  },
  "/doctor-loan": {
    title: "Doctor Loan India | Clinic Setup, Equipment & MBBS Professional Loan | F2 Fintech",
    description:
      "Special doctor loans across India for MBBS, BDS, BHMS, and medical professionals. 100% equipment financing, OD limits, clinic setup & expansion loans. Fast approval with minimal documentation.",
    keywords: "doctor loan for MBBS India, clinic setup loan for doctors India, dental clinic equipment loan India, medical equipment loan 100% financing India, OD limit for doctors India, loan for fresh doctor 1 year experience, collateral free doctor loan India",
  },
  "/loan-against-property": {
    title: "Loan Against Property India | Up to ₹10 Crore | Low Interest Rate | F2 Fintech",
    description:
      "Unlock the value of your property with a loan against property (LAP) from F2 Fintech. Get up to ₹10 crore at low interest rates with flexible repayment options across India.",
    keywords: "loan against property India, LAP low interest rate India, property loan without income proof India, mortgage loan India 2026, loan against residential property India, LAP up to 10 crore",
  },
  "/unsecured-business-loan": {
    title: "Unsecured Business Loan India | No Collateral MSME Loan | F2 Fintech",
    description:
      "Get an unsecured business loan in India without pledging any asset. Collateral-free funding up to ₹50 lakh for SMEs and MSMEs. Fast approval from top NBFCs and banks.",
    keywords: "unsecured business loan India, no collateral MSME loan India, business loan without security India, SME loan without collateral 50 lakh, MSME unsecured loan 2026, collateral free SME loan fast approval",
  },
  "/business-loan-for-women": {
    title: "Business Loan for Women Entrepreneurs India | Mudra & Startup Loan | F2 Fintech",
    description:
      "Special business loans for women entrepreneurs across India. Lower interest rates, mudra scheme, and flexible eligibility. F2 Fintech's dedicated women's loan program.",
    keywords: "business loan for women entrepreneurs India, mudra loan for women 2026, startup loan for women India, women entrepreneur loan without collateral, business loan for women self-employed India",
  },
  "/ecommerce-business-loan": {
    title: "E-Commerce Business Loan India | Amazon & Flipkart Seller Working Capital | F2 Fintech",
    description:
      "Funding solutions for Amazon, Flipkart, and other e-commerce sellers across India. Quick working capital loans tailored for online businesses with fast disbursal.",
    keywords: "ecommerce business loan India, Amazon seller working capital loan India, Flipkart seller loan India, online seller loan fast approval, ecommerce working capital 2026, e-commerce business funding India",
  },
  "/check-cibil-score": {
    title: "Check CIBIL Score Free | Improve Credit Score for Doctor & Personal Loan | F2 Fintech",
    description:
      "Check your CIBIL score for free on F2 Fintech. Understand your creditworthiness and improve your chances of doctor loan, personal loan, or MSME loan approval across India.",
    keywords: "check CIBIL score free India, CIBIL score for doctor loan India, CIBIL score required for personal loan, improve CIBIL score for loan approval, free credit score check India 2026, credit score for MSME loan",
  },
  "/blogs": {
    title: "Finance & Loan Guides for Doctors, CAs & MSMEs | F2 Fintech Blog",
    description:
      "Read expert articles on doctor loans, personal loans for CAs, MSME business finance, home loan balance transfer, and credit score tips. F2 Fintech's loan guides for professionals.",
    keywords: "doctor loan guide India 2026, personal loan tips for CA India, MSME loan blog India, home loan balance transfer advice, business loan without collateral guide, clinic setup loan guide",
  },
  "/personal-loan-blogs": {
    title: "Personal Loan Tips for CAs & Salaried Professionals | F2 Fintech",
    description:
      "Expert guides on personal loans for chartered accountants, salaried professionals, and self-employed individuals across India. Eligibility, interest rates, CIBIL score, and how to apply.",
    keywords: "personal loan for CA India guide, personal loan salaried professional tips India, personal loan self-employed guide India, personal loan CIBIL score requirement 2026, CA loan eligibility India",
  },
  "/business-loan-blogs": {
    title: "Business Loan Blog | MSME Finance, Working Capital & GST Loan India | F2 Fintech",
    description:
      "Read practical guides on MSME business financing, working capital OD, GST loans, and collateral-free business loans in India. F2 Fintech's small business loan blog.",
    keywords: "MSME loan blog India, working capital OD loan guide India, GST business loan India 2026, collateral free business loan blog, startup business loan tips India",
  },
  "/overdraft-blogs": {
    title: "Overdraft Loan Blog | OD vs EMI for Doctors & Business India | F2 Fintech",
    description:
      "Learn about bank overdraft (OD) facilities, OD limits, OD vs EMI for doctors and businesses in India. Expert guides on business cash flow management by F2 Fintech.",
    keywords: "OD vs EMI doctor loan India, overdraft facility for doctors India, OD limit for small business India, bank overdraft loan guide 2026, business cash flow overdraft India",
  },
  "/about-us": {
    title: "About F2 Fintech | Trusted Loan Advisor for Doctors & Professionals India",
    description:
      "Learn about F2 Fintech - India's trusted digital loan advisor for doctors, CAs, and MSMEs. Connecting borrowers with 50+ banks and NBFCs. Headquartered in Noida, serving all of India.",
    keywords: "about F2 Fintech, loan advisor for doctors India, F2 Fintech Noida, digital lending platform India, loan aggregator 50 banks India, trusted MSME loan advisor",
  },
  "/get-in-touch": {
    title: "Contact F2 Fintech | Doctor Loan & MSME Loan Enquiry India",
    description:
      "Contact F2 Fintech for doctor loan, personal loan, or MSME business loan enquiries across India. Call +91 8810600135. Headquartered in Noida, serving pan-India customers.",
    keywords: "contact F2 Fintech India, doctor loan enquiry India, MSME loan enquiry India, F2 Fintech phone number Noida, personal loan enquiry India",
  },
  "/faq": {
    title: "Loan FAQs | Doctor Loan, MSME & Personal Loan Questions India | F2 Fintech",
    description:
      "Answers to common questions about doctor loans, MSME business loans, personal loans for CAs, CIBIL score requirements, and F2 Fintech loan approval process across India.",
    keywords: "doctor loan FAQ India, MSME loan questions India, personal loan for CA questions, loan approval time F2 Fintech, CIBIL score required for loan India, collateral free loan FAQ",
  },
  "/our-products": {
    title: "Loan Products for Doctors, CAs & MSMEs | India | F2 Fintech",
    description:
      "Explore F2 Fintech's full range of loans across India - doctor loans for MBBS/BDS, personal loans for CAs, MSME business loans, home loans, LAP from 50+ partner banks.",
    keywords: "doctor loan products India, personal loan for CA India, MSME loan products India, compare loans India 2026, loan for medical professionals India, collateral free loan products",
  },
  "/lending-partners": {
    title: "Compare Loan Partners | Best Banks for Doctor Loans & MSME | F2 Fintech",
    description:
      "Compare doctor loans, MSME business loans, and personal loan offers from HDFC, ICICI, Bajaj Finserv, Tata Capital, and 50+ lenders across India on F2 Fintech.",
    keywords: "best bank for doctor loan India, NBFC MSME loan comparison India, compare personal loan rates CA India, Bajaj Finserv same day loan, Tata Capital doctor loan, HDFC MSME loan comparison",
  },
  "/eligibility-checker": {
    title: "Loan Eligibility for Doctors, CAs & MSMEs | CIBIL Score Requirement | F2 Fintech",
    description:
      "Check loan eligibility at F2 Fintech for doctor loans, personal loans for CAs, and MSME business loans across India. CIBIL score, income, and documentation requirements.",
    keywords: "doctor loan eligibility India, personal loan eligibility CA India, MSME loan eligibility 2026, business loan CIBIL score requirement, fresh doctor loan eligibility, CA loan income requirement",
  },
  "/channel-partners": {
    title: "Become a Loan Channel Partner | Earn Commission on Doctor & MSME Loans | F2 Fintech",
    description:
      "Join F2 Fintech's channel partner program across India. Earn commissions by referring doctor loans, personal loans for CAs, and MSME business loans. Simple onboarding, quick payouts.",
    keywords: "loan channel partner India, DSA loan agent India, doctor loan referral program, MSME loan DSA agent India, F2 Fintech partner earn commission 2026",
  },
  "/brochures": {
    title: "F2 Fintech Brochures | Doctor Loan, MSME & Personal Loan Information India",
    description:
      "Download F2 Fintech's product brochures for detailed information on doctor loans, personal loans for CAs, MSME business loans, and home loans across India.",
    keywords: "doctor loan brochure India, MSME loan brochure download, personal loan CA brochure India, F2 Fintech product information",
  },
  "/privacy-policy": {
    title: "Privacy Policy | F2 Fintech",
    description:
      "Read F2 Fintech's privacy policy to understand how we collect, use, and protect your personal data in compliance with Indian data protection regulations.",
    keywords: "F2 Fintech privacy policy, data protection India",
  },
  "/terms-and-condition": {
    title: "Terms & Conditions | F2 Fintech",
    description:
      "Read the terms and conditions governing the use of F2 Fintech's website and financial services platform.",
    keywords: "F2 Fintech terms conditions, terms of use",
  },
  "/feedback": {
    title: "Customer Feedback | Doctor & MSME Loan Experience | F2 Fintech India",
    description:
      "Share your experience getting a doctor loan, personal loan for CA, or MSME business loan through F2 Fintech across India. Your feedback helps us serve you better.",
    keywords: "F2 Fintech feedback India, doctor loan review India, MSME loan customer review, personal loan CA review F2 Fintech, loan service testimonial India",
  },
  "/dsa": {
    title: "Become a Loan DSA Agent | Partner with F2 Fintech India",
    description:
      "Join F2 Fintech as a Direct Selling Agent (DSA). Refer doctor loans, MSME business loans, and personal loans to earn high commissions across India.",
    keywords: "DSA loan agent India, become loan DSA partner, fintech DSA registration, loan agent commission doctor loan India",
  },
  "/realtor": {
    title: "Realtor Home Loan Partner Program | F2 Fintech India",
    description:
      "Partner with F2 Fintech as a real estate broker or agent to offer home loans and LAP to clients. Earn attractive referral payouts.",
    keywords: "realtor home loan partner India, real estate broker loan referral, home loan agent partner program",
  },
  "/offer": {
    title: "Special Loan Offers & Low Interest Schemes | F2 Fintech",
    description:
      "Exclusive loan offers on doctor loans, business loans, and personal loans across India. Lowest interest rates and minimal processing fees.",
    keywords: "special loan offers India 2026, doctor loan discount offer, zero processing fee loan, MSME loan scheme offer",
  },
  "/doctors-and-professionals": {
    title: "Loans for Doctors & Professionals | Clinic & CA Finance | F2 Fintech",
    description:
      "Tailored professional loans for doctors, dentists, CAs, and architects across India. High limit collateral-free loans with fast approval.",
    keywords: "loans for doctors and professionals India, CA professional loan, medical practitioner finance",
  },
};

// Default fallback metadata
const DEFAULT_META = {
  title: "F2 Fintech | Instant Loans | Fast Approval India",
  description:
    "Apply for instant personal loans, business loans, home loans, and MSME loans in India. F2 Fintech - fast approval, minimal documentation, competitive rates.",
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
    normalizedPath === "/lending-partners/compare" ||
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
          text: "F2 Fintech is a digital loan aggregator and financial service platform that helps individuals, professionals, and businesses compare and avail loans from multiple banks and NBFCs - quickly, transparently, and 100% paperless.",
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
          text: "Visit our Eligibility Checker page or use the EMI Calculator on F2 Fintech. Provide basic details like income, business turnover, and CIBIL score for an instant eligibility assessment.",
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
        text: "Browse our loan products - personal loans, business loans, home loans, doctor loans - and select the one that fits your needs.",
      },
      {
        "@type": "HowToStep",
        name: "Check Eligibility",
        text: "Use our EMI and Eligibility calculators, or check your CIBIL score for free to understand your loan eligibility instantly.",
      },
      {
        "@type": "HowToStep",
        name: "Submit Application",
        text: "Fill out the online application form and securely upload the required documents - completely paperless.",
      },
      {
        "@type": "HowToStep",
        name: "Get Matched and Disbursed",
        text: "Our platform matches you with the best lender from 50+ banks and NBFCs, and upon approval, funds are disbursed to your account.",
      },
    ],
  };

  const FINANCIAL_PRODUCT_SCHEMAS = {
    "/doctor-loan": {
      name: "Doctor Loan India",
      description: "Specialized collateral-free loans for MBBS, BDS, MDS doctors across India with 100% equipment financing, clinic expansion funding, and OD limit.",
      lowPrice: "9.75",
      highPrice: "14.00",
    },
    "/business-loan": {
      name: "Unsecured Business Loan & MSME Finance",
      description: "Collateral-free MSME business loans up to ₹50 Lakh for working capital, equipment purchase, and growth across India.",
      lowPrice: "11.20",
      highPrice: "19.00",
    },
    "/personal-loan": {
      name: "Personal Loan for CAs & Salaried Professionals",
      description: "Fast disbursal personal loan for Chartered Accountants and salaried professionals up to ₹40 Lakh with minimal documentation.",
      lowPrice: "10.30",
      highPrice: "21.00",
    },
    "/home-loan": {
      name: "Home Loan & Balance Transfer India",
      description: "Apply for low interest home loans and home loan balance transfers in India starting from 7.00% p.a.",
      lowPrice: "7.00",
      highPrice: "11.00",
    },
    "/loan-against-property": {
      name: "Loan Against Property (LAP) India",
      description: "Unlock property value with low interest loan against residential or commercial property up to ₹10 Crore.",
      lowPrice: "8.40",
      highPrice: "12.50",
    },
  };

  const productSchemaData = FINANCIAL_PRODUCT_SCHEMAS[normalizedPath];
  const financialProductSchema = productSchemaData
    ? {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        name: productSchemaData.name,
        description: productSchemaData.description,
        category: "Loan",
        provider: {
          "@type": "FinancialService",
          name: "F2 Fintech",
          url: "https://f2fintech.com",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: productSchemaData.lowPrice,
          highPrice: productSchemaData.highPrice,
          offerCount: "50",
        },
        annualPercentageRate: `${productSchemaData.lowPrice}% - ${productSchemaData.highPrice}%`,
      }
    : null;

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

      {/* Canonical Tag - always points to the preferred HTTPS non-www URL */}
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

      {financialProductSchema && (
        <script type="application/ld+json">
          {JSON.stringify(financialProductSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
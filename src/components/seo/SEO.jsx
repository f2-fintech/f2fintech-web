import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SEO = () => {
  const location = useLocation();
  const baseUrl = "https://f2fintech.com";
  const canonicalUrl = `${baseUrl}${location.pathname}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is F2 Fintech?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "F2 Fintech is a digital loan aggregator and financial service platform that helps individuals, professionals, and businesses compare and avail loans from multiple banks and NBFCs — quickly, transparently, and 100% paperless."
        }
      },
      {
        "@type": "Question",
        "name": "What types of loans does F2 Fintech offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "F2 Fintech offers a wide range of financial products including Business Loans, MSME Loans, Unsecured Loans, E-Commerce Business Loans, and specialized loans such as Doctor Loans and Loans for Women Entrepreneurs."
        }
      },
      {
        "@type": "Question",
        "name": "How do I check my eligibility for a business loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can check your eligibility directly on the F2 Fintech platform by providing basic business details, financial statements, and your CIBIL score. Our AI-driven calculators provide instant eligibility insights."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take for loan approval and disbursal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "F2 Fintech partners with leading banks and NBFCs to ensure rapid digital processing, facilitating approvals and disbursals quickly depending on your documentation and credit profile."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to apply for a loan on F2 Fintech",
    "description": "A quick, step-by-step guide to applying for a business or personal loan securely via F2 Fintech.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Choose Your Loan Type",
        "text": "Browse our loan products ranging from unsecured business loans to MSME loans and select the one that fits your needs."
      },
      {
        "@type": "HowToStep",
        "name": "Check Eligibility",
        "text": "Use our EMI and Eligibility calculators, or navigate directly to the application form and provide your basic details."
      },
      {
        "@type": "HowToStep",
        "name": "Submit Application",
        "text": "Fill out the online application form and securely submit the required documents online."
      },
      {
        "@type": "HowToStep",
        "name": "Get Matched and Disbursed",
        "text": "Our intelligent platform matches you with the best provider, and upon swift approval, the funds are disbursed."
      }
    ]
  };

  return (
    <Helmet>
      {/* Canonical Tag */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content="F2 Fintech | Empowering your financial journey" />
      <meta property="og:description" content="Discover instant business loans, MSME loans, and tailored financial solutions. Smart, secure, and fully digital lending platform." />
      <meta property="og:image" content="https://f2fintech.com/og-image.png" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="F2 Fintech | Empowering your financial journey" />
      <meta name="twitter:description" content="Discover instant business loans, MSME loans, and tailored financial solutions." />
      <meta name="twitter:image" content="https://f2fintech.com/og-image.png" />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
    </Helmet>
  );
};

export default SEO;
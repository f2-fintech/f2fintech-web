import { Suspense, lazy } from "react";
import { Box, CircularProgress, Container, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { faqData } from "../data/Data.jsx";

const Faq = lazy(() => import("./Faq"));

const FaqPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleBackToFooter = () => {
    navigate("/", { state: { scrollToFooter: true } });
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDark
          ? "#0f172a"
          : "linear-gradient(135deg, #f5f7ff 0%, #f0f4ff 100%)",
        pt: { xs: 2, md: 0 },
        pb: { xs: 6, md: 0 },
      }}
    >
      <Helmet>
        <title>Frequently Asked Questions | Loans & Finance | F2 Fintech</title>
        <meta
          name="description"
          content="Find answers to common questions about personal loans, business loans, eligibility criteria, interest rates, and the application process at F2 Fintech."
        />
        <meta name="keywords" content="loan FAQ, F2 Fintech FAQ, loan questions, personal loan help, business loan help" />
        <link rel="canonical" href="https://f2fintech.com/faq" />
        <meta property="og:title" content="Frequently Asked Questions | Loans & Finance | F2 Fintech" />
        <meta property="og:description" content="Find answers to common questions about personal loans, business loans, eligibility criteria, interest rates, and the application process at F2 Fintech." />
        <meta property="og:url" content="https://f2fintech.com/faq" />
        <script type="application/ld+json">{JSON.stringify(faqPageSchema)}</script>
      </Helmet>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Box sx={{ mt: 0, display: "flex", justifyContent: "flex-start" }}>
          <Button
            onClick={handleBackToFooter}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: isDark ? "#94a3b8" : "#64748b",
              textTransform: "none",
              fontSize: "1rem",
              fontFamily: "Poppins",
              mt: 2,
              "&:hover": {
                color: "#3244e6",
                backgroundColor: "transparent",
                "& .MuiButton-startIcon": {
                  transform: "translateX(-4px)",
                },
              },
              transition: "all 0.3s ease",
            }}
          >
            Back to Home
          </Button>
        </Box>

        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "60vh",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Faq />
        </Suspense>
      </Container>
    </Box>
  );
};

export default FaqPage;

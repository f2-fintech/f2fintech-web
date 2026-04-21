import { Suspense, lazy } from "react";
import { Box, CircularProgress, Container, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Faq = lazy(() => import("./Faq"));

const FaqPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleBackToFooter = () => {
    navigate("/", { state: { scrollToFooter: true } });
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

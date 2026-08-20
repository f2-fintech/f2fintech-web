import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const steps = [
  "Analyzing selected providers...",
  "Comparing interest rates & terms...",
  "Calculating best matches...",
  "Building your comparison report...",
];

const CompareTransition = ({ onComplete }) => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let stepIndex = 0;

    const runStep = () => {
      if (stepIndex >= steps.length) {
        // All done — fire onComplete
        setTimeout(() => onComplete(), 400);
        return;
      }

      setActiveStep(stepIndex);

      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, stepIndex]);
        stepIndex++;
        setTimeout(runStep, 200);
      }, 700);
    };

    const timer = setTimeout(runStep, 300);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#f7f9fc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        animation: "fadeIn 0.3s ease",
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          background: "rgba(50, 68, 230, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          animation: "pulse 1.8s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { transform: "scale(1)", opacity: 1 },
            "50%": { transform: "scale(1.08)", opacity: 0.8 },
          },
        }}
      >
        <TrendingUpIcon sx={{ fontSize: 42, color: "#3244e6" }} />
      </Box>

      {/* Title */}
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 700,
          fontSize: { xs: "1.4rem", sm: "1.75rem", md: "2rem" },
          color: "#1a202c",
          mb: 1,
          textAlign: "center",
          px: 2,
        }}
      >
        Preparing your comparison...
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: { xs: "0.875rem", sm: "1rem" },
          color: "#718096",
          mb: 5,
          textAlign: "center",
        }}
      >
        This will only take a moment...
      </Typography>

      {/* Steps */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          width: { xs: "calc(100% - 48px)", sm: "420px", md: "460px" },
        }}
      >
        {steps.map((step, index) => {
          const isDone = completedSteps.includes(index);
          const isActive = activeStep === index && !isDone;

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                background: "white",
                borderRadius: "12px",
                px: 2.5,
                py: 1.5,
                boxShadow: isDone
                  ? "0 2px 12px rgba(50,68,230,0.08)"
                  : "0 1px 6px rgba(0,0,0,0.06)",
                border: isDone
                  ? "1px solid rgba(50,68,230,0.15)"
                  : "1px solid rgba(0,0,0,0.06)",
                transition: "all 0.35s ease",
                opacity: index > activeStep && !isDone ? 0.4 : 1,
                transform:
                  isDone ? "translateX(0)" : "translateX(0)",
              }}
            >
              {/* Icon slot */}
              <Box sx={{ width: 22, height: 22, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {isDone ? (
                  <CheckCircleIcon
                    sx={{
                      fontSize: 22,
                      color: "#3244e6",
                      animation: "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                      "@keyframes popIn": {
                        from: { transform: "scale(0)", opacity: 0 },
                        to: { transform: "scale(1)", opacity: 1 },
                      },
                    }}
                  />
                ) : isActive ? (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: "2.5px solid #3244e6",
                      borderTopColor: "transparent",
                      animation: "spin 0.7s linear infinite",
                      "@keyframes spin": {
                        from: { transform: "rotate(0deg)" },
                        to: { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: "2px solid #e2e8f0",
                    }}
                  />
                )}
              </Box>

              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  fontWeight: isDone ? 600 : 500,
                  color: isDone ? "#2d3748" : isActive ? "#2d3748" : "#a0aec0",
                  transition: "color 0.3s ease, font-weight 0.3s ease",
                }}
              >
                {step}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CompareTransition;

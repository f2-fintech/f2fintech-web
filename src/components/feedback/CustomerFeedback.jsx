import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Snackbar,
  Alert,
  Checkbox,
  FormGroup,
  Paper,
  Fade
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

import useCreateFeedback from "../../apis/CustomerFeedbackAPI";

/* ── animations ── */
const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const successPop = keyframes`
  0%   { opacity: 0; transform: scale(0.7); }
  70%  { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;
const pulseAnim = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

/* ── helpers ── */
const BRAND = "#0848bd";
const BRAND_HOVER = "#073ea4";

const getNpsText = (score) => {
  switch (score) {
    case 1: return "Not at all likely";
    case 2: return "Extremely unlikely";
    case 3: return "Very unlikely";
    case 4: return "Unlikely";
    case 5: return "Neutral";
    case 6: return "Somewhat likely";
    case 7: return "Moderately likely";
    case 8: return "Likely";
    case 9: return "Very likely";
    case 10: return "Extremely likely";
    default: return "";
  }
};

/* ── StarRating with Smiley ── */
const StarRatingWithSmiley = ({ value, onChange, max = 5 }) => {
  const [hover, setHover] = useState(0);
  const activeValue = hover || value;

  const icons = [
    <SentimentVeryDissatisfiedIcon key="1" sx={{ fontSize: 46, color: "#ef4444" }} />,
    <SentimentDissatisfiedIcon key="2" sx={{ fontSize: 46, color: "#f97316" }} />,
    <SentimentNeutralIcon key="3" sx={{ fontSize: 46, color: "#eab308" }} />,
    <SentimentSatisfiedAltIcon key="4" sx={{ fontSize: 46, color: "#84cc16" }} />,
    <SentimentVerySatisfiedIcon key="5" sx={{ fontSize: 46, color: "#22c55e" }} />
  ];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 4 }, mt: 1 }}>
      <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 }, flexWrap: "wrap" }}>
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <Box
            key={star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            sx={{
              cursor: "pointer",
              fontSize: { xs: 34, sm: 44 },
              color: star <= activeValue ? BRAND : "#d1d5db",
              transition: "transform 0.15s, color 0.15s",
              "&:hover": { transform: "scale(1.1)", color: BRAND },
              lineHeight: 1,
            }}
          >
            {star <= activeValue ? (
              <StarIcon sx={{ fontSize: "inherit" }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: "inherit" }} />
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 60, height: 60,
        opacity: activeValue ? 1 : 0,
        transform: activeValue ? "scale(1)" : "scale(0.8)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: hover ? `${pulseAnim} 0.5s ease-in-out` : "none",
        background: activeValue ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        borderRadius: "50%",
        border: `1.5px solid ${activeValue ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
        boxShadow: activeValue ? `0 8px 24px ${activeValue >= 4 ? "rgba(34,197,94,0.15)" : activeValue === 3 ? "rgba(234,179,8,0.15)" : "rgba(239,68,68,0.15)"}` : "none"
      }}>
        {activeValue > 0 && icons[activeValue - 1]}
      </Box>
    </Box>
  );
};

/* ── each question page config ── */
const QUESTIONS = [
  {
    id: 1,
    question: "1. Which type of loan did you apply for through F2 Fintech?",
    type: "radio",
    options: [
      "Personal Loan",
      "Business Loan",
      "Professional Loan",
      "Home Loan",
      "Loan Against Property",
      "Over Draft",
    ],
    field: "loan_type",
  },
  {
    id: 2,
    question: "2. How satisfied are you with the overall service provided by F2 Fintech?",
    type: "star",
    field: "overall_satisfaction",
  },
  {
    id: 3,
    question: "3. Which area of our service needs improvement?",
    type: "checkbox",
    options: [
      "Response Time",
      "Documentation Process",
      "Communication & Updates",
      "Loan Processing Speed",
      "Coordination with Bank",
      "Customer Support",
      "Other",
    ],
    field: "improvement_areas",
  },
  {
    id: 4,
    question: "4. How likely are you to recommend F2 Fintech to your friends or colleagues?",
    type: "nps",
    field: "recommend_score",
  },
  {
    id: 5,
    question: "5. Please share your valuable feedback or suggestions to help us improve our services.",
    type: "text",
    field: "valuable_feedback",
  },
];

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
const CustomerFeedback = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { createFeedback, loading } = useCreateFeedback();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({
    loan_type: "",
    overall_satisfaction: 0,
    improvement_areas: [],
    recommend_score: 0,
    valuable_feedback: "",
  });
  const [toast, setToast] = useState({ open: false, msg: "", severity: "error" });
  const [npsHover, setNpsHover] = useState(0);

  const update = (field, value) => setAnswers((prev) => ({ ...prev, [field]: value }));

  // Check if a question is unlocked based on previous required fields
  const isQUnlocked = (qId) => {
    if (qId === 1) return true;
    if (qId === 2) return !!answers.loan_type;
    if (qId === 3 || qId === 4) return !!answers.loan_type && answers.overall_satisfaction > 0;
    if (qId === 5) return !!answers.loan_type && answers.overall_satisfaction > 0 && answers.recommend_score > 0;
    return true;
  };

  const isFormComplete = !!answers.loan_type && answers.overall_satisfaction > 0 && answers.recommend_score > 0;

  const handleSubmit = async () => {
    if (!isFormComplete) {
      setToast({ open: true, msg: "Please answer all required questions before continuing.", severity: "warning" });
      return;
    }

    const payload = {
      loan_type: answers.loan_type,
      overall_satisfaction: answers.overall_satisfaction,
      improvement_areas: answers.improvement_areas.join(", "),
      recommend_score: answers.recommend_score,
      valuable_feedback: answers.valuable_feedback,
    };

    const result = await createFeedback(payload);
    if (result.success) {
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } else {
      setToast({ open: true, msg: result.error || "Submission failed. Please try again.", severity: "error" });
    }
  };

  const bg = isDark ? "#0f172a" : "#e6eaf2";
  const paperBg = isDark ? "#1e293b" : "#ffffff";
  const textColor = isDark ? "#f8fafc" : "#242424";

  // Helper for NPS colored boxes
  const getNpsBg = (num, selected) => {
    let baseColor;
    if (num <= 3) baseColor = "#ef4444";
    else if (num <= 6) baseColor = "#f97316";
    else if (num <= 8) baseColor = "#eab308";
    else baseColor = "#22c55e";

    if (selected) {
      return { bg: baseColor, border: baseColor, text: "#fff" };
    }
    return {
      bg: isDark ? `${baseColor}1A` : `${baseColor}15`,
      border: `${baseColor}60`,
      text: isDark ? "#e2e8f0" : baseColor
    };
  };

  const renderBackgroundBlobs = () => (
    <>
      <Box sx={{
        position: "fixed",
        top: "20%",
        left: "10%",
        width: "40vw",
        height: "40vw",
        borderRadius: "50%",
        background: isDark ? "radial-gradient(circle, rgba(8,72,189,0.12) 0%, rgba(8,72,189,0) 70%)" : "radial-gradient(circle, rgba(8,72,189,0.07) 0%, rgba(8,72,189,0) 70%)",
        filter: "blur(80px)",
        zIndex: 0,
        pointerEvents: "none"
      }} />
      <Box sx={{
        position: "fixed",
        bottom: "20%",
        right: "10%",
        width: "35vw",
        height: "35vw",
        borderRadius: "50%",
        background: isDark ? "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)" : "radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(99,102,241,0) 70%)",
        filter: "blur(70px)",
        zIndex: 0,
        pointerEvents: "none"
      }} />
    </>
  );

  /* ─── SUCCESS SCREEN ─── */
  if (isSubmitted) return (
    <Box sx={{
      width: "100%",
      minHeight: "calc(100vh - 84px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isDark ? "linear-gradient(135deg, #0f172a 0%, #171d33 100%)" : "linear-gradient(135deg, #f0f4fb 0%, #e2e8f5 100%)",
      py: 6,
      position: "relative",
      overflow: "hidden"
    }}>
      {renderBackgroundBlobs()}
      <Paper elevation={4} sx={{
        maxWidth: 550,
        width: "90%",
        p: { xs: 4, md: 6 },
        textAlign: "center",
        animation: `${successPop} 0.6s ease`,
        borderRadius: "24px",
        background: paperBg,
        position: "relative",
        zIndex: 1,
        backdropFilter: "blur(12px)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)"}`,
        boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 45px rgba(8,72,189,0.05)"
      }}>
        <CheckCircleOutlineIcon sx={{
          fontSize: 80,
          color: "#10b981",
          mb: 3,
          filter: "drop-shadow(0 6px 15px rgba(16,185,129,0.4))",
          animation: `${pulseAnim} 2s infinite ease-in-out`
        }} />
        <Typography variant="h2" sx={{
          fontWeight: 800,
          mb: 1.5,
          background: isDark ? "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" : `linear-gradient(135deg, ${BRAND} 0%, #3244e6 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "2.2rem", sm: "2.8rem" },
          letterSpacing: "-0.5px"
        }}>
          Thank You!
        </Typography>
        <Typography sx={{ color: isDark ? "#cbd5e1" : "#475569", mb: 4, fontSize: "1.1rem", fontWeight: 500 }}>
          Your response has been successfully recorded. We appreciate your valuable feedback!
        </Typography>

        <Box sx={{
          width: "60px",
          height: "3px",
          background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
          borderRadius: "10px",
          margin: "0 auto 30px"
        }} />

        <Button
          onClick={() => window.location.href = "/"}
          variant="outlined"
          size="large"
          sx={{
            borderColor: BRAND,
            borderWidth: "2px",
            color: BRAND,
            fontWeight: 700,
            borderRadius: "10px",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
            "&:hover": {
              borderWidth: "2px",
              borderColor: BRAND_HOVER,
              background: `linear-gradient(135deg, ${BRAND} 0%, #3244e6 100%)`,
              color: "#fff",
              boxShadow: `0 8px 24px rgba(8,72,189,0.3)`,
              transform: "translateY(-2px)"
            },
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          Back to Homepage
        </Button>
      </Paper>
    </Box>
  );

  /* ─── MAIN FORM SCREEN ─── */
  return (
    <Box sx={{
      width: "100%",
      minHeight: "calc(100vh - 84px)",
      background: bg,
      py: { xs: 4, md: 8 },
      display: "flex",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      {renderBackgroundBlobs()}
      <Box sx={{
        maxWidth: 900,
        width: "92%",
        animation: `${fadeSlideIn} 0.5s ease`,
        position: "relative",
        zIndex: 1
      }}>

        {/* Header Block */}
        <Paper elevation={2} sx={{
          p: { xs: 4, md: 5 },
          mb: 3,
          borderRadius: "24px",
          background: paperBg,
          position: "relative",
          backdropFilter: "blur(12px)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)"}`,
          boxShadow: isDark ? "0 20px 40px -10px rgba(0,0,0,0.3)" : "0 16px 35px -10px rgba(8,72,189,0.05)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "6px",
            borderRadius: "24px 24px 0 0",
            background: `linear-gradient(90deg, ${BRAND} 0%, #6366f1 100%)`
          }
        }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: textColor, mb: 2, fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
            F2 Fintech Customer Feedback
          </Typography>
          <Typography sx={{ color: isDark ? "#cbd5e1" : "#475569", whiteSpace: "pre-line", fontSize: "1.05rem", lineHeight: 1.6 }}>
            Thank you for choosing F2 Fintech.{"\n"}
            Please take 30 seconds to share your experience with our services.
          </Typography>
        </Paper>

        {/* Questions */}
        {QUESTIONS.map((q) => {
          const isRequired = ["loan_type", "overall_satisfaction", "recommend_score"].includes(q.field);
          const unlocked = isQUnlocked(q.id);

          return (
            <Paper
              key={q.id}
              elevation={unlocked ? 3 : 0}
              sx={{
                p: { xs: 3, md: 5 },
                mb: 3,
                borderRadius: "20px",
                background: paperBg,
                opacity: unlocked ? 1 : 0.45,
                pointerEvents: unlocked ? "auto" : "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${unlocked ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)") : (isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)")}`,
                boxShadow: unlocked
                  ? (isDark ? "0 12px 30px -10px rgba(0,0,0,0.3)" : "0 12px 30px -10px rgba(8,72,189,0.05)")
                  : "none",
                transform: unlocked ? "translateY(0)" : "translateY(10px)"
              }}
            >
              <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 2 }, alignItems: "flex-start", mb: 3 }}>
                <Box sx={{
                  background: unlocked ? `linear-gradient(135deg, ${BRAND} 0%, #3244e6 100%)` : (isDark ? "#334155" : "#e2e8f0"),
                  color: unlocked ? "#fff" : (isDark ? "#64748b" : "#94a3b8"),
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  flexShrink: 0,
                  boxShadow: unlocked ? `0 4px 10px ${BRAND}30` : "none",
                  transition: "all 0.3s ease",
                  border: unlocked ? "none" : `1px solid ${isDark ? "#475569" : "#cbd5e1"}`
                }}>
                  {q.id}
                </Box>
                <Typography sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  color: textColor,
                  lineHeight: 1.4
                }}>
                  {q.question.replace(/^\d+\.\s*/, "")} {isRequired && <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>}
                </Typography>
              </Box>

              {/* RADIO */}
              {q.type === "radio" && (
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <RadioGroup value={answers[q.field]} onChange={(e) => update(q.field, e.target.value)}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                      {q.options.map((opt) => {
                        const selected = answers[q.field] === opt;
                        return (
                          <Box
                            key={opt}
                            onClick={() => update(q.field, opt)}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              p: { xs: 1.5, sm: 2 },
                              borderRadius: "12px",
                              cursor: "pointer",
                              border: `2px solid ${selected ? BRAND : (isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0")}`,
                              background: selected
                                ? (isDark ? "rgba(8,72,189,0.12)" : "rgba(8,72,189,0.03)")
                                : (isDark ? "rgba(255,255,255,0.01)" : "#fafafa"),
                              transition: "all 0.2s ease-in-out",
                              boxShadow: selected ? `0 4px 12px ${BRAND}15` : "none",
                              "&:hover": {
                                borderColor: selected ? BRAND : (isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"),
                                background: selected
                                  ? (isDark ? "rgba(8,72,189,0.18)" : "rgba(8,72,189,0.05)")
                                  : (isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9"),
                                transform: "translateX(6px)"
                              }
                            }}
                          >
                            <Radio
                              checked={selected}
                              sx={{
                                p: 0,
                                mr: 2,
                                color: isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1",
                                "&.Mui-checked": { color: BRAND }
                              }}
                            />
                            <Typography sx={{ color: textColor, fontSize: "1.02rem", fontWeight: selected ? 600 : 500 }}>
                              {opt}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </RadioGroup>
                </FormControl>
              )}

              {/* STAR RATING WITH SMILEY */}
              {q.type === "star" && (
                <StarRatingWithSmiley value={answers[q.field]} onChange={(v) => update(q.field, v)} />
              )}

              {/* CHECKBOX */}
              {q.type === "checkbox" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  {q.options.map((opt) => {
                    const selected = answers[q.field]?.includes(opt);
                    return (
                      <Box
                        key={opt}
                        onClick={() => {
                          const current = answers[q.field] || [];
                          const next = current.includes(opt)
                            ? current.filter((x) => x !== opt)
                            : [...current, opt];
                          update(q.field, next);
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: { xs: 1.5, sm: 2 },
                          borderRadius: "12px",
                          cursor: "pointer",
                          border: `2px solid ${selected ? BRAND : (isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0")}`,
                          background: selected
                            ? (isDark ? "rgba(8,72,189,0.12)" : "rgba(8,72,189,0.03)")
                            : (isDark ? "rgba(255,255,255,0.01)" : "#fafafa"),
                          transition: "all 0.2s ease-in-out",
                          boxShadow: selected ? `0 4px 12px ${BRAND}15` : "none",
                          "&:hover": {
                            borderColor: selected ? BRAND : (isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"),
                            background: selected
                              ? (isDark ? "rgba(8,72,189,0.18)" : "rgba(8,72,189,0.05)")
                              : (isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9"),
                            transform: "translateX(6px)"
                          }
                        }}
                      >
                        <Checkbox
                          checked={selected || false}
                          sx={{
                            p: 0,
                            mr: 2,
                            color: isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1",
                            "&.Mui-checked": { color: BRAND }
                          }}
                        />
                        <Typography sx={{ color: textColor, fontSize: "1.02rem", fontWeight: selected ? 600 : 500 }}>
                          {opt}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              )}

              {/* NPS (Colored blocks 1-10) */}
              {q.type === "nps" && (() => {
                const activeNps = npsHover || answers[q.field];
                return (
                  <Box sx={{ width: "100%", overflowX: "auto", pt: 1, pb: 1 }}>
                    <Box sx={{ display: "flex", gap: { xs: 1, sm: 1.5 }, minWidth: { xs: 360, sm: "auto" } }}>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                        const selected = answers[q.field] === num;
                        const colors = getNpsBg(num, selected);
                        return (
                          <Box
                            key={num}
                            onClick={() => update(q.field, num)}
                            onMouseEnter={() => setNpsHover(num)}
                            onMouseLeave={() => setNpsHover(0)}
                            sx={{
                              flex: 1,
                              minWidth: { xs: 36, sm: 48 },
                              height: { xs: 44, sm: 54 },
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: `2px solid ${colors.border}`,
                              backgroundColor: colors.bg,
                              color: colors.text,
                              cursor: "pointer",
                              borderRadius: "8px",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: `0 6px 12px ${colors.border}40`
                              }
                            }}
                          >
                            <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>{num}</Typography>
                          </Box>
                        );
                      })}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5, minWidth: { xs: 360, sm: "auto" } }}>
                      <Typography sx={{ fontSize: "0.9rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 500 }}>Not at all likely</Typography>
                      <Typography sx={{ fontSize: "0.9rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 500 }}>Extremely likely</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, height: 28, alignItems: "center" }}>
                      <Fade in={activeNps > 0}>
                        <Typography sx={{
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: activeNps ? getNpsBg(activeNps, true).bg : "transparent",
                          textAlign: "center",
                          transition: "color 0.2s ease"
                        }}>
                          {activeNps ? `${activeNps} - ${getNpsText(activeNps)}` : ""}
                        </Typography>
                      </Fade>
                    </Box>
                  </Box>
                );
              })()}

              {/* TEXT INPUT */}
              {q.type === "text" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your answer"
                  multiline
                  rows={3}
                  value={answers[q.field]}
                  onChange={(e) => update(q.field, e.target.value)}
                  sx={{
                    mt: 1,
                    "& .MuiOutlinedInput-root": {
                      color: textColor,
                      backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                      borderRadius: "8px",
                      fontSize: "1.05rem",
                      "& fieldset": { borderColor: isDark ? "#475569" : "#cbd5e1", borderWidth: "1px" },
                      "&:hover fieldset": { borderColor: isDark ? "#64748b" : "#94a3b8" },
                      "&.Mui-focused fieldset": { borderColor: BRAND, borderWidth: "2px" },
                    },
                  }}
                />
              )}
            </Paper>
          );
        })}

        {/* Submit Button Block */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 8, mt: 2 }}>
          <Fade in={isFormComplete} style={{ transitionDelay: "100ms" }}>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                background: BRAND,
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                px: 5, py: 1.25,
                borderRadius: "8px",
                boxShadow: "none",
                "&:hover": {
                  background: BRAND_HOVER,
                  boxShadow: "0 4px 12px rgba(8, 72, 189, 0.2)"
                },
                transition: "all 0.2s ease-in-out",
                "&.Mui-disabled": { background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)" },
              }}>
              {loading ? "Submitting..." : "Submit Feedback"}
            </Button>
          </Fade>
        </Box>

        {/* Footer Text */}
        <Typography sx={{ textAlign: "center", fontSize: "0.85rem", color: isDark ? "#64748b" : "#94a3b8", mb: 4 }}>
          Never give out your password. Report abuse
        </Typography>

      </Box>

      {/* Toast Notification */}
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={toast.severity} onClose={() => setToast((t) => ({ ...t, open: false }))} sx={{ borderRadius: "8px", fontWeight: 500 }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerFeedback;

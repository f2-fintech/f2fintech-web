import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Chip,
  CircularProgress,
  Container,
  Fab,
  IconButton,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CloseFullscreen,
  Minimize,
  OpenInFull,
  Refresh,
  Send,
  ThumbDownOffAlt,
  ThumbDown,
  ThumbUpOffAlt,
  ThumbUp,
} from "@mui/icons-material";
import { ChatbotAPI } from "../../apis/ChatbotAPI";
import ChatWelcome from "./ChatWelcome";
import ChatMessageContent from "./ChatMessageContent";
import ComparisonCard from "./ComparisonCard";
import RecommendationCard from "./RecommendationCard";
import EmiAdvisorCard from "./EmiAdvisorCard";
import DocumentUploadCard from "./DocumentUploadCard";
import ApplicationReviewCard from "./ApplicationReviewCard";
import GuidedApplicationCard from "./GuidedApplicationCard";
import {
  ApplicationStatusCard,
  OtpVerificationCard,
  PageNavigationCard,
  SupportEscalationCard,
} from "./SupportAndStatusCards";

function getApplicationStepIndex(stepKey) {
  switch (stepKey) {
    case "category":
      return 0;
    case "loan_requirements":
      return 1;
    case "personal":
      return 2;
    case "employment":
    case "financial":
      return 3;
    case "documents":
      return 4;
    case "review":
      return 5;
    case "submitted":
      return 6;
    default:
      return 0;
  }
}

const STEP_LABELS = {
  en: ["Amount & Type", "Tenure & Banks", "Personal", "Financial", "Docs", "Review", "Submitted"],
  hi: ["राशि व प्रकार", "अवधि व बैंक", "व्यक्तिगत", "वित्तीय", "दस्तावेज़", "समीक्षा", "सबमिट"],
};

function getGreetingMessage(language) {
  return {
    id: "welcome-msg",
    from: "bot",
    language,
    text:
      language === "hi"
        ? "नमस्ते! मैं F2Fintech AI लोन सलाहकार हूँ। मैं केवल सत्यापित F2Fintech जानकारी के आधार पर लोन तुलना, पात्रता सलाह, EMI गणना, आवेदन स्टेटस जांच और पूरा लोन आवेदन करने में आपकी मदद कर सकता हूँ।"
        : "Hello! I am the F2Fintech AI Loan Advisor. I answer strictly from verified F2Fintech data and can help you compare loan partners, get personalized recommendations, calculate EMI & prepayments, check application status, or complete an actual loan application.",
    uiPayloads: [],
  };
}

export default function ChatbotWidget({ fullPage = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isRouteFullPage = fullPage || location?.pathname === "/chatbot";
  const isHomePage = location?.pathname === "/" || location?.pathname === "";

  const [isOpen, setIsOpen] = useState(isRouteFullPage);
  const [isExpanded, setIsExpanded] = useState(true);
  const [language, setLanguage] = useState("en");
  const [sessionId, setSessionId] = useState(null);
  const [loanCategories, setLoanCategories] = useState([]);
  const [activeDraft, setActiveDraft] = useState(null);
  const [messages, setMessages] = useState([getGreetingMessage("en")]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initError, setInitError] = useState(null);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const initializedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen && !isRouteFullPage) return;
    if (messages.length <= 1 && !isLoading) {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0;
      }
      return;
    }
    scrollToBottom();
  }, [messages, isLoading, isOpen, isRouteFullPage]);

  const initSession = useCallback(async ({ forceNew = false, langOverride = null } = {}) => {
    setInitError(null);
    const activeLang = langOverride || language;
    try {
      const data = await ChatbotAPI.initOrResumeSession({
        forceNew,
        language: activeLang,
      });
      setSessionId(data.sessionId);
      setLoanCategories(data.loanCategories || []);
      setActiveDraft(data.activeDraft || null);
      if (data.language) setLanguage(data.language);

      if (Array.isArray(data.messages) && data.messages.length > 0 && !forceNew) {
        setMessages(data.messages);
      } else {
        setMessages([getGreetingMessage(data.language || activeLang)]);
      }
    } catch (err) {
      setInitError(
        err.message || "Unable to connect to F2Fintech AI Assistant server right now."
      );
    }
  }, [language]);

  useEffect(() => {
    if ((isOpen || isRouteFullPage) && !initializedRef.current) {
      initializedRef.current = true;
      initSession();
    }
  }, [isOpen, isRouteFullPage, initSession]);

  const sendMessageText = async (rawText) => {
    const clean = String(rawText || "").trim();
    if (!clean || isLoading) return;

    let activeSid = sessionId;
    if (!activeSid) {
      try {
        const res = await ChatbotAPI.initOrResumeSession({ language });
        activeSid = res.sessionId;
        setSessionId(res.sessionId);
      } catch (err) {
        setInitError(err.message || "Session initialization failed.");
        return;
      }
    }

    const tempUserMsg = {
      id: `user-${Date.now()}`,
      from: "user",
      text: clean,
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await ChatbotAPI.sendMessage({
        sessionId: activeSid,
        message: clean,
        language,
      });

      if (res.sessionId && res.sessionId !== activeSid) {
        setSessionId(res.sessionId);
      }

      if (res.language && res.language !== language) {
        setLanguage(res.language);
      }

      // Sync draft indicator from application payloads if present
      for (const p of res.uiPayloads || []) {
        if (p.type === "application_step" || p.type === "document_checklist" || p.type === "application_review") {
          setActiveDraft((prev) => ({
            ...(prev || {}),
            loanType: p.data?.loanType || p.data?.loanRequirements?.loan_type || prev?.loanType,
            currentStep:
              p.type === "document_checklist"
                ? "documents"
                : p.type === "application_review"
                  ? "review"
                  : p.data?.currentStep || prev?.currentStep || "category",
          }));
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: res.messageId || `bot-${Date.now()}`,
          from: "bot",
          text: res.reply,
          uiPayloads: res.uiPayloads || [],
          language: res.language || language,
          feedbackRating: null,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          from: "bot",
          text:
            err.message ||
            "I encountered a temporary issue connecting to F2Fintech services. Please try again or reach support@f2fintech.com.",
          uiPayloads: [],
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (msgId, rating) => {
    if (!sessionId || typeof msgId !== "number") return;
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedbackRating: rating } : m))
    );
    try {
      await ChatbotAPI.submitFeedback({ sessionId, messageId: msgId, rating });
    } catch {
      // ignore non-blocking feedback error
    }
  };

  const handleNavigateToApply = ({ providerName, loanType, loanAmount, tenureMonths, tenure } = {}) => {
    const params = new URLSearchParams();
    if (loanType) params.set("loanType", loanType);
    if (providerName) params.set("provider", providerName);

    const numericAmount = Number(loanAmount);
    if (Number.isFinite(numericAmount) && numericAmount > 0) {
      params.set("amount", String(Math.round(numericAmount)));
    }

    const rawMonths = Number(tenureMonths ?? tenure);
    if (Number.isFinite(rawMonths) && rawMonths > 0) {
      const years = Math.max(1, Math.round(rawMonths / 12));
      params.set("tenure", `${years} ${years === 1 ? "Year" : "Years"}`);
    }

    const queryString = params.toString();
    if (!isRouteFullPage) {
      setIsOpen(false);
    }

    navigate(`/application-form${queryString ? `?${queryString}` : ""}`, {
      state: {
        fromChatbot: true,
        providerName: providerName || null,
        loanType: loanType || null,
        loanAmount: Number.isFinite(numericAmount) && numericAmount > 0 ? Math.round(numericAmount) : null,
        tenureMonths: Number.isFinite(rawMonths) && rawMonths > 0 ? rawMonths : null,
      },
    });
  };

  const handleNavigateToPage = (route) => {
    if (!route) return;
    if (!isRouteFullPage) {
      setIsOpen(false);
    }
    navigate(route);
  };

  const handleOtpVerified = async () => {
    if (!sessionId) return;
    setIsLoading(true);
    try {
      const statusRes = await ChatbotAPI.getApplicationStatus({ sessionId });
      setMessages((prev) => [
        ...prev,
        {
          id: `verified-${Date.now()}`,
          from: "bot",
          text: statusRes.hasApplications
            ? language === "hi"
              ? "पहचान सत्यापित हो गई! नीचे आपके सक्रिय F2Fintech आवेदन दिए गए हैं:"
              : "Identity verified! Here are your F2Fintech loan applications:"
            : statusRes.message,
          uiPayloads: statusRes.hasApplications
            ? [{ type: "application_status_cards", data: statusRes.applications }]
            : [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: `err-otp-${Date.now()}`, from: "bot", text: err.message, uiPayloads: [] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToReview = async () => {
    if (!sessionId) return;
    setIsLoading(true);
    try {
      const res = await ChatbotAPI.getApplicationReview(sessionId);
      setActiveDraft((prev) => ({ ...(prev || {}), currentStep: "review" }));
      setMessages((prev) => [
        ...prev,
        {
          id: `rev-${Date.now()}`,
          from: "bot",
          text:
            language === "hi"
              ? "आपके सभी विवरण और दस्तावेज़ तैयार हैं। कृपया नीचे सारांश जांचें और सबमिट करने की पुष्टि करें:"
              : "Here is your complete application review summary. Please verify all details and click Confirm & Submit:",
          uiPayloads: [{ type: "application_review", data: res.review || res.reviewSummary }],
        },
      ]);
    } catch {
      sendMessageText("Please show my application review summary");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageSwitch = (nextLang) => {
    setLanguage(nextLang);
    if (messages.length === 1 && messages[0].id === "welcome-msg") {
      setMessages([getGreetingMessage(nextLang)]);
    }
  };

  const renderUiPayload = (payload, idx) => {
    if (!payload || !payload.type) return null;
    const isCompactView = !isRouteFullPage && (isMobile || !isExpanded);
    switch (payload.type) {
      case "comparison_table":
        return (
          <ComparisonCard
            key={idx}
            data={payload.data}
            language={language}
            onApplyProvider={handleNavigateToApply}
          />
        );
      case "recommendation_cards":
        return (
          <RecommendationCard
            key={idx}
            data={payload.data}
            language={language}
            onApplyProvider={handleNavigateToApply}
          />
        );
      case "emi_calculator":
        return (
          <EmiAdvisorCard
            key={idx}
            data={payload.data}
            language={language}
            isCompact={isCompactView}
            onApplyWithTerms={handleNavigateToApply}
          />
        );
      case "application_step":
        return (
          <GuidedApplicationCard
            key={idx}
            data={payload.data}
            sessionId={sessionId}
            language={language}
            isCompact={isCompactView}
            onProgressUpdated={(prog) => {
              if (prog) {
                setActiveDraft((prev) => ({ ...(prev || {}), ...prog }));
              }
            }}
          />
        );
      case "document_checklist":
        return (
          <DocumentUploadCard
            key={idx}
            data={payload.data}
            sessionId={sessionId}
            language={language}
            isCompact={isCompactView}
            onChecklistUpdated={(prog) => setActiveDraft(prog)}
            onProceedToReview={handleProceedToReview}
          />
        );
      case "application_review":
        return (
          <ApplicationReviewCard
            key={idx}
            data={payload.data}
            sessionId={sessionId}
            language={language}
            isCompact={isCompactView}
            onRequestEdit={() =>
              sendMessageText("I would like to edit one of my details before submitting.")
            }
            onSubmitted={() => setActiveDraft((prev) => ({ ...(prev || {}), currentStep: "submitted" }))}
          />
        );
      case "otp_verification":
        return (
          <OtpVerificationCard
            key={idx}
            sessionId={sessionId}
            language={language}
            isCompact={isCompactView}
            onVerified={handleOtpVerified}
          />
        );
      case "application_status_cards":
        return (
          <ApplicationStatusCard
            key={idx}
            applications={payload.data}
            sessionId={sessionId}
            language={language}
            isCompact={isCompactView}
          />
        );
      case "escalation_card":
        return <SupportEscalationCard key={idx} data={payload.data} isCompact={isCompactView} />;
      case "page_navigation_links":
        return (
          <PageNavigationCard
            key={idx}
            data={payload.data}
            language={language}
            isCompact={isCompactView}
            onNavigate={handleNavigateToPage}
          />
        );
      default:
        return null;
    }
  };

  const activeStepIndex = activeDraft?.currentStep
    ? getApplicationStepIndex(activeDraft.currentStep)
    : -1;

  const chatWindowContent = (
    <Paper
      elevation={isRouteFullPage ? 3 : 12}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: isRouteFullPage
          ? { xs: "calc(100vh - 110px)", md: "78vh" }
          : isMobile
            ? "100dvh"
            : isExpanded
              ? "min(84vh, calc(100dvh - 40px))"
              : "min(620px, calc(100dvh - 40px))",
        maxHeight: isRouteFullPage
          ? undefined
          : isMobile
            ? "100dvh"
            : "calc(100dvh - 40px)",
        width: isRouteFullPage
          ? "100%"
          : isMobile
            ? "100vw"
            : isExpanded
              ? { sm: 660, md: 760 }
              : 450,
        maxWidth: isMobile && !isRouteFullPage ? "100vw" : "calc(100vw - 32px)",
        borderRadius: isMobile && !isRouteFullPage ? 0 : 3.5,
        overflow: "hidden",
        border: "1px solid rgba(50, 68, 230, 0.16)",
        bgcolor: "#ffffff",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.4,
          background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 55%, #384aff 100%)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexShrink: 0,
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            sx={{
              flexShrink: 0,
              "& .MuiBadge-badge": {
                bgcolor: "#10b981",
                boxShadow: "0 0 0 2px #3244e6",
              },
            }}
          >
            <Avatar
              src="/ai-loan-advisor-logo.webp"
              alt="F2Fintech AI Loan Advisor"
              sx={{
                bgcolor: "#ffffff",
                width: 42,
                height: 42,
                border: "1.5px solid rgba(255,255,255,0.85)",
                "& img": { objectFit: "contain" },
              }}
            />
          </Badge>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={700} noWrap sx={{ lineHeight: 1.2 }}>
              F2Fintech AI Loan Advisor
            </Typography>
            <Typography variant="caption" sx={{ display: "block", opacity: 0.88, fontSize: "0.7rem" }} noWrap>
              24/7 Verified Advisory • Instant Comparison & Application
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0 }}>
          <Chip
            size="small"
            clickable
            label={language === "en" ? "हिं" : "EN"}
            onClick={() => handleLanguageSwitch(language === "en" ? "hi" : "en")}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#ffffff",
              fontWeight: 700,
              height: 24,
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          />

          <Tooltip title="New Conversation">
            <IconButton
              size="small"
              onClick={() => initSession({ forceNew: true })}
              sx={{ color: "#ffffff" }}
            >
              <Refresh fontSize="small" />
            </IconButton>
          </Tooltip>

          {!isRouteFullPage && !isMobile && (
            <Tooltip title={isExpanded ? "Compact view" : "Expand view"}>
              <IconButton
                size="small"
                onClick={() => setIsExpanded((prev) => !prev)}
                sx={{ color: "#ffffff" }}
              >
                {isExpanded ? <CloseFullscreen fontSize="small" /> : <OpenInFull fontSize="small" />}
              </IconButton>
            </Tooltip>
          )}

          {!isRouteFullPage && (
            <Tooltip title="Minimize">
              <IconButton
                size="small"
                onClick={() => setIsOpen(false)}
                sx={{ color: "#ffffff" }}
              >
                <Minimize fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Box>

      {/* Active Application Progress Stepper */}
      {activeStepIndex >= 0 && (
        <Box
          sx={{
            px: { xs: 0.75, sm: 1.5 },
            py: 0.9,
            bgcolor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            overflowX: "auto",
          }}
        >
          <Stepper
            activeStep={activeStepIndex}
            alternativeLabel
            sx={{
              minWidth: 0,
              "& .MuiStep-root": { px: { xs: 0.25, sm: 0.75 } },
              "& .MuiStepLabel-label": {
                fontSize: { xs: "0.54rem", sm: "0.62rem" },
                mt: 0.3,
                lineHeight: 1.15,
              },
              "& .MuiStepIcon-root": { fontSize: { xs: "1.15rem", sm: "1.4rem" } },
              "& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed": {
                color: "#3244e6",
              },
            }}
          >
            {(STEP_LABELS[language === "hi" ? "hi" : "en"]).map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}

      {/* Messages Area */}
      <Box
        ref={messagesContainerRef}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          px: { xs: 1.5, sm: 2 },
          py: 2,
          bgcolor: "#f8fafc",
        }}
      >
        {initError && (
          <Alert severity="warning" sx={{ mb: 1.5, borderRadius: 2, fontSize: "0.8rem" }}>
            {initError}
          </Alert>
        )}

        {messages.length <= 1 && (
          <ChatWelcome
            language={language}
            loanCategories={loanCategories}
            onSelectPrompt={sendMessageText}
          />
        )}

        <Stack spacing={1.5}>
          {messages.map((msg) => {
            const isUser = msg.from === "user";
            return (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isUser ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    maxWidth: isUser ? "82%" : "98%",
                    width: isUser ? "auto" : "100%",
                    px: isUser ? 1.8 : 2,
                    py: isUser ? 1.15 : 1.6,
                    borderRadius: isUser ? "16px 16px 4px 16px" : "14px",
                    bgcolor: isUser ? "#3244e6" : "#ffffff",
                    color: isUser ? "#ffffff" : "#0f172a",
                    border: isUser ? "none" : "1px solid #e2e8f0",
                    boxShadow: isUser
                      ? "0 4px 12px rgba(50, 68, 230, 0.2)"
                      : "0 2px 10px rgba(15, 23, 42, 0.04)",
                    wordBreak: "break-word",
                    fontSize: "0.87rem",
                    lineHeight: 1.55,
                  }}
                >
                  {isUser ? msg.text : <ChatMessageContent text={msg.text} />}
                </Box>

                {!isUser &&
                  Array.isArray(msg.uiPayloads) &&
                  msg.uiPayloads.length > 0 && (
                    <Box sx={{ width: "100%", mt: 0.5 }}>
                      {msg.uiPayloads.map((p, idx) => renderUiPayload(p, idx))}
                    </Box>
                  )}

                {!isUser && typeof msg.id === "number" && (
                  <Stack direction="row" spacing={0.4} sx={{ mt: 0.4, ml: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleFeedback(msg.id, 1)}
                      sx={{ p: 0.3, color: msg.feedbackRating === 1 ? "#10b981" : "#94a3b8" }}
                    >
                      {msg.feedbackRating === 1 ? (
                        <ThumbUp sx={{ fontSize: 14 }} />
                      ) : (
                        <ThumbUpOffAlt sx={{ fontSize: 14 }} />
                      )}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleFeedback(msg.id, -1)}
                      sx={{ p: 0.3, color: msg.feedbackRating === -1 ? "#ef4444" : "#94a3b8" }}
                    >
                      {msg.feedbackRating === -1 ? (
                        <ThumbDown sx={{ fontSize: 14 }} />
                      ) : (
                        <ThumbDownOffAlt sx={{ fontSize: 14 }} />
                      )}
                    </IconButton>
                  </Stack>
                )}
              </Box>
            );
          })}

          {isLoading && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ pl: 1 }}>
              <CircularProgress size={16} sx={{ color: "#3244e6" }} />
              <Typography variant="caption" color="#64748b" fontWeight={600}>
                {language === "hi"
                  ? "F2Fintech सत्यापित डेटा की जांच हो रही है..."
                  : "Checking verified F2Fintech data..."}
              </Typography>
            </Stack>
          )}
        </Stack>

        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box sx={{ p: 1.4, bgcolor: "#ffffff", borderTop: "1px solid #e2e8f0", flexShrink: 0 }}>
        <Stack direction="row" spacing={1} alignItems="flex-end">
          <TextField
            fullWidth
            multiline
            maxRows={3}
            size="small"
            placeholder={
              language === "hi"
                ? "लोन, ब्याज दर, EMI या आवेदन से जुड़ा प्रश्न पूछें..."
                : "Ask about F2Fintech loans, rates, EMI, status, or apply..."
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessageText(inputValue);
              }
            }}
            disabled={isLoading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                bgcolor: "#f8fafc",
                fontSize: "0.88rem",
              },
            }}
          />
          <IconButton
            onClick={() => sendMessageText(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            sx={{
              bgcolor: "#3244e6",
              color: "#ffffff",
              width: 40,
              height: 40,
              borderRadius: 2.5,
              "&:hover": { bgcolor: "#1d2ebd" },
              "&.Mui-disabled": { bgcolor: "#e2e8f0", color: "#94a3b8" },
            }}
          >
            <Send fontSize="small" />
          </IconButton>
        </Stack>
        <Typography
          variant="caption"
          color="#94a3b8"
          sx={{ display: "block", textAlign: "center", mt: 0.6, fontSize: "0.66rem" }}
        >
          Strict Internal Verified Data Only • Preliminary matching is not loan approval guarantee
        </Typography>
      </Box>
    </Paper>
  );

  if (isRouteFullPage) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        {chatWindowContent}
      </Container>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: isOpen
          ? isMobile
            ? 0
            : 20
          : isHomePage
            ? { xs: "40px", md: "50px", lg: "10px" }
            : { xs: 20, md: 24 },
        right: isOpen
          ? isMobile
            ? 0
            : 20
          : isHomePage
            ? { xs: "87px", sm: "92px", md: "102px", lg: "107px" }
            : { xs: 20, md: 24 },
        zIndex: 2500,
      }}
    >
      {isOpen ? (
        chatWindowContent
      ) : (
        <Tooltip title="F2Fintech AI Loan Advisor">
          <Fab
            aria-label="F2Fintech AI Loan Advisor"
            onClick={() => {
              setIsExpanded(true);
              setIsOpen(true);
            }}
            sx={{
              width: { xs: 55, sm: 60, md: 65 },
              height: { xs: 55, sm: 60, md: 65 },
              minHeight: "unset",
              p: 0,
              background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 55%, #384aff 100%)",
              color: "#ffffff",
              boxShadow: "0 8px 24px rgba(50, 68, 230, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #1e293b 0%, #1d2ebd 100%)",
                transform: "scale(1.06) translateY(-2px)",
              },
              transition: "all 0.25s ease",
            }}
          >
            <Avatar
              src="/ai-loan-advisor-logo.webp"
              alt="AI Loan Advisor"
              sx={{
                width: { xs: 42, sm: 46, md: 50 },
                height: { xs: 42, sm: 46, md: 50 },
                bgcolor: "#ffffff",
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.2)",
                "& img": { objectFit: "contain" },
              }}
            />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
}

ChatbotWidget.propTypes = {
  fullPage: PropTypes.bool,
};


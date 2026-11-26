import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import {
  AutoAwesome,
  Balance,
  Calculate,
  Description,
  SupportAgent,
  TrackChanges,
} from "@mui/icons-material";

const QUICK_ACTIONS = {
  en: [
    {
      title: "Recommend Best Loan",
      desc: "Personal, Doctor, Business & Home match",
      prompt: "Help me find the best loan for my requirement",
      icon: <AutoAwesome fontSize="small" />,
      color: "#3244e6",
    },
    {
      title: "Compare Loan Rates",
      desc: "Side-by-side bank & NBFC comparison",
      prompt: "Compare personal loan interest rates and processing fees",
      icon: <Balance fontSize="small" />,
      color: "#0284c7",
    },
    {
      title: "EMI & Prepayment Advisor",
      desc: "Calculate EMI & interest savings",
      prompt: "Calculate EMI for 5 lakh personal loan for 5 years at 12%",
      icon: <Calculate fontSize="small" />,
      color: "#059669",
    },
    {
      title: "Apply for a Loan",
      desc: "Complete guided 7-step application here",
      prompt: "I want to apply for a loan now",
      icon: <Description fontSize="small" />,
      color: "#7c3aed",
    },
    {
      title: "Check Application Status",
      desc: "Track application or missing docs",
      prompt: "Check my loan application status",
      icon: <TrackChanges fontSize="small" />,
      color: "#d97706",
    },
    {
      title: "Customer Support",
      desc: "Policy help, corrections & escalation",
      prompt: "I need support regarding my loan query",
      icon: <SupportAgent fontSize="small" />,
      color: "#dc2626",
    },
  ],
  hi: [
    {
      title: "सही लोन सुझाव पाएं",
      desc: "पर्सनल, डॉक्टर, बिज़नेस और होम लोन मैच",
      prompt: "मेरी जरूरत के हिसाब से सबसे अच्छा लोन सुझाएं",
      icon: <AutoAwesome fontSize="small" />,
      color: "#3244e6",
    },
    {
      title: "लोन दरों की तुलना करें",
      desc: "बैंक और NBFC ब्याज दर व फीस तुलना",
      prompt: "पर्सनल लोन की ब्याज दरों और प्रोसेसिंग फीस की तुलना करें",
      icon: <Balance fontSize="small" />,
      color: "#0284c7",
    },
    {
      title: "EMI और प्रीपेमेंट कैलकुलेटर",
      desc: "मासिक EMI और ब्याज बचत जानें",
      prompt: "5 लाख रुपये पर 5 साल के लिए 12% दर से EMI बताएं",
      icon: <Calculate fontSize="small" />,
      color: "#059669",
    },
    {
      title: "यहीं लोन आवेदन करें",
      desc: "दस्तावेज़ अपलोड सहित पूरा आवेदन",
      prompt: "मुझे अभी लोन के लिए आवेदन करना है",
      icon: <Description fontSize="small" />,
      color: "#7c3aed",
    },
    {
      title: "आवेदन स्टेटस देखें",
      desc: "अपने आवेदन और दस्तावेज़ जांचें",
      prompt: "मेरे लोन आवेदन की स्थिति बताएं",
      icon: <TrackChanges fontSize="small" />,
      color: "#d97706",
    },
    {
      title: "कस्टमर सपोर्ट",
      desc: "समस्या समाधान और सहायता टीम",
      prompt: "मुझे अपने लोन से जुड़ी सहायता चाहिए",
      icon: <SupportAgent fontSize="small" />,
      color: "#dc2626",
    },
  ],
};

export default function ChatWelcome({ language = "en", onSelectPrompt, loanCategories = [] }) {
  const actions = QUICK_ACTIONS[language === "hi" ? "hi" : "en"];

  return (
    <Box sx={{ py: 1 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          background: "linear-gradient(135deg, #f0f4ff 0%, #eef2ff 50%, #ecfdf5 100%)",
          border: "1px solid rgba(50, 68, 230, 0.14)",
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} color="#0f172a" gutterBottom>
          {language === "hi"
            ? "नमस्ते! मैं F2Fintech AI लोन सलाहकार हूँ।"
            : "Welcome to F2Fintech AI Loan Advisor"}
        </Typography>
        <Typography variant="body2" color="#475569" sx={{ lineHeight: 1.55 }}>
          {language === "hi"
            ? "मैं केवल सत्यापित F2Fintech डेटा के आधार पर लोन तुलना, पात्रता सलाह, EMI गणना, आवेदन ट्रैकिंग और पूर्ण लोन आवेदन में 24/7 आपकी सहायता कर सकता हूँ।"
            : "Available 24/7 with strictly verified F2Fintech internal data — compare partner lenders, check tailored recommendations, simulate EMI & prepayments, or complete your actual loan application right here."}
        </Typography>
      </Paper>

      <Typography variant="caption" fontWeight={700} color="#64748b" sx={{ textTransform: "uppercase", letterSpacing: 0.6 }}>
        {language === "hi" ? "त्वरित विकल्प" : "How can I assist you today?"}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 1.2,
          mt: 0.5,
          mb: 2,
        }}
      >
        {actions.map((item) => (
          <Paper
            key={item.title}
            elevation={0}
            onClick={() => onSelectPrompt?.(item.prompt)}
            sx={{
              p: 1.4,
              borderRadius: 2.5,
              border: "1px solid #e2e8f0",
              bgcolor: "#ffffff",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: item.color,
                boxShadow: "0 4px 14px rgba(50, 68, 230, 0.1)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Stack direction="row" spacing={1.2} alignItems="flex-start">
              <Box
                sx={{
                  p: 0.8,
                  borderRadius: 2,
                  bgcolor: `${item.color}15`,
                  color: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" fontWeight={700} color="#0f172a" noWrap>
                  {item.title}
                </Typography>
                <Typography variant="caption" color="#64748b" sx={{ display: "block", lineHeight: 1.3 }}>
                  {item.desc}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Box>

      {loanCategories.length > 0 && (
        <Box>
          <Typography variant="caption" fontWeight={700} color="#64748b" sx={{ display: "block", mb: 0.8 }}>
            {language === "hi" ? "सीधे लोन श्रेणी चुनें:" : "Explore Verified Categories:"}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
            {loanCategories.slice(0, 7).map((cat) => (
              <Chip
                key={cat.loanType}
                size="small"
                clickable
                label={language === "hi" && cat.displayNameHi ? cat.displayNameHi : cat.displayName}
                onClick={() =>
                  onSelectPrompt?.(
                    language === "hi"
                      ? `मुझे ${cat.displayNameHi || cat.displayName} की जानकारी और ब्याज दर बताएं`
                      : `Tell me about ${cat.displayName} eligibility, documents, and lender rates`
                  )
                }
                sx={{
                  fontWeight: 600,
                  bgcolor: "#f1f5f9",
                  color: "#1e293b",
                  "&:hover": { bgcolor: "#e0e7ff", color: "#3244e6" },
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}


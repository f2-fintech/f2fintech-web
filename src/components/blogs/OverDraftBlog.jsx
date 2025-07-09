import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const OverDraftBlog = () => {
  const theme = useTheme();

  const gradientBg = "linear-gradient(90deg, #7C3AED 0%, #9F7AEA 100%)";
  const lightGradientBg = "linear-gradient(135deg, #f8f4ff 0%, #ffffff 100%)";

  const Section = ({ title, children, delay = 0 }) => (
    <Box
      my={4}
      sx={{
        animation: `${fadeIn} 0.8s ease-out ${delay}s both`,
      }}
    >
      {title && (
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: gradientBg,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mb: 2,
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      )}
      <Typography
        variant="body1"
        component="div"
        sx={{
          fontSize: "1.25rem",
          lineHeight: 1.8,
          textAlign: "justify",
          color: "text.secondary",
        }}
      >
        {children}
      </Typography>
    </Box>
  );

  const sections = [
    {
      title: (
        <Box
          component="span"
          sx={{
            display: "flex",
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#007bff",
            justifyContent: "center",
            p: 6,
          }}
        >
          🔍 What is an Overdraft?
        </Box>
      ),
      img: "/blogs4.png",
      content: [
        "An overdraft allows you to withdraw more than you currently have in your account, up to a pre-set limit. It acts like a temporary financial cushion useful in emergencies like:",
      ],
      list: [
        "Unexpected medical bills",
        "Last-minute purchases",
        "Delayed salary credits",
      ],
      footer:
        "But remember, overdrafts come at a cost—in the form of interest and fees.",
    },
    {
      title: "🏛 A Peek into History",
      content: [
        "The concept began in 1728 when the Royal Bank of Scotland allowed a merchant, William Hogg, to withdraw money before depositing it.",
      ],
    },
    {
      title: (
        <Box
          component="span"
          sx={{
            display: "flex",
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#007bff",
            justifyContent: "center",
            p: 6,
          }}
        >
          💡 Why Does Overdraft Happen?
        </Box>
      ),
      list: [
        "Emergency expenses (hospital, repair, travel)",
        "Auto-debits or EMIs before salary",
        "ATM withdrawals without checking balance",
      ],
      subTitle: "Tips to prevent:",
      subList: [
        "Set up real-time alerts",
        "Track EMIs and debits",
        "Keep a buffer balance",
      ],
    },
    {
      title: (
        <Box
          component="span"
          sx={{
            display: "flex",
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#007bff",
            justifyContent: "center",
            p: 6,
          }}
        >
          💰 Types of Overdrafts
        </Box>
      ),
      img: "/blogs6.png",
      content: ["✅ Authorized Overdraft"],
      list: ["Pre-approved limit", "Interest on used amount only"],
      footerTitle: "❌ Unauthorized Overdraft",
      footerList: ["Exceeds approved limit", "High penalties and interest"],
    },
    {
      title: "✅ Overdraft Advantages",
      list: [
        "Instant cash access",
        "No collateral required",
        "Interest only on what you use",
      ],
    },
    {
      title: "⚠ Watch Out for These Overdraft Risks",
      list: [
        "High interest (up to 20%)",
        "Credit score damage",
        "Risk of a debt trap",
      ],
    },
    {
      title: "📊 Overdraft in Indian Banking",
      list: [
        "ICICI: Overdraft on salary/FD",
        "HDFC: Flexible limits",
        "SBI, PNB: MSMEs & Pensioners",
      ],
      content: [
        "Interest Rates: 10% – 18%",
        "(✅ Cheaper than credit cards | ❌ Costlier than personal loans)",
      ],
    },
    {
      title: "🌍 Overdraft vs. Personal Loan: Key Differences",
      list: [
        "Overdraft: Flexible repayment, interest on used amount",
        "Loan: Fixed EMI, full interest",
      ],
    },
    {
      title: (
        <Box
          component="span"
          sx={{
            display: "flex",
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#007bff",
            justifyContent: "center",
            p: 6,
          }}
        >
          🧠 How to Use Your Overdraft Smartly
        </Box>
      ),
      img: "/blogs5.png",
      list: [
        "Set alerts and track activity",
        "Repay fast to reduce interest",
        "Avoid frequent use",
      ],
    },
    {
      title: "📈 Regulatory Push Toward Clarity",
      content: ["RBI (India) and FCA (UK) mandate:"],
      list: ["Simplified interest disclosures", "Transparent fee breakdowns"],
    },
    {
      title: "🧾 Final Thoughts: Power with Caution",
      content: [
        "Overdraft is helpful but should be used with discipline. If you're using it often, it may indicate deeper issues.",
      ],
      list: ["Can I repay this quickly?", "Is this a real emergency?"],
    },
    {
      title: "🧙‍♂️ Need Expert Help?",
      content: [
        "F2 Fintech helps you find the best overdraft option—be it for salary, FD, or business—across India’s leading banks.",
      ],
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: lightGradientBg, pb: 4 }}>
      <Box
        sx={{
          background: gradientBg,
          backgroundSize: "200% 200%",
          animation: `${gradientShift} 4s ease infinite`,
          color: "white",
          py: 8,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ animation: `${fadeIn} 1s ease-out` }}
          >
            💳 Overdraft Facility: Backup or Trap?
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ opacity: 0.9, animation: `${fadeIn} 1s ease-out 0.2s both` }}
          >
            Everything Indians should know about overdrafts and how to use them
            wisely in 2025
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {sections.map((sec, i) => (
          <Section key={i} title={sec.title} delay={0.1 + i * 0.1}>
            {sec.img && (
              <Box
                component="img"
                src={sec.img}
                alt={
                  typeof sec.title === "string" ? sec.title : "Section image"
                }
                sx={{
                  width: { xs: "100%", md: "80%" },
                  borderRadius: 3,
                  mb: 3,
                  boxShadow: theme.shadows[4],
                  mx: "auto",
                  display: "block",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              />
            )}
            {sec.content?.map((text, t) => (
              <Typography
                key={t}
                paragraph
                sx={{
                  fontSize: "1.25rem",
                  textAlign: "center",
                  color: "blue",
                }}
              >
                {text}
              </Typography>
            ))}
            {sec.list && (
              <List>
                {sec.list.map((item, li) => (
                  <ListItem key={li} sx={{ justifyContent: "center" }}>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{
                        fontSize: "1.2rem",
                        textAlign: "center",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            {sec.subTitle && (
              <Typography
                variant="subtitle2"
                mt={2}
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                {sec.subTitle}
              </Typography>
            )}
            {sec.subList && (
              <List>
                {sec.subList.map((item, sli) => (
                  <ListItem key={sli} sx={{ justifyContent: "center" }}>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{
                        fontSize: "1.1rem",
                        textAlign: "center",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            {sec.footer && (
              <Typography
                paragraph
                sx={{
                  fontSize: "1.2rem",
                  textAlign: "justify",
                  color: "text.secondary",
                }}
              >
                {sec.footer}
              </Typography>
            )}
            {sec.footerTitle && (
              <Typography
                fontWeight="bold"
                mt={2}
                sx={{ textAlign: "center", fontSize: "1.2rem" }}
              >
                {sec.footerTitle}
              </Typography>
            )}
            {sec.footerList && (
              <List>
                {sec.footerList.map((item, fi) => (
                  <ListItem
                    key={fi}
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{
                        fontSize: "1.1rem",
                        textAlign: "center",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Section>
        ))}

        <Divider sx={{ my: 4 }} />
        <Typography
          variant="h6"
          display="block"
          textAlign="center"
          color="text.secondary"
        >
          #OverdraftIndia #SmartBorrowing #FinancialPlanning #F2Fintech
        </Typography>
      </Container>
    </Box>
  );
};

export default OverDraftBlog;

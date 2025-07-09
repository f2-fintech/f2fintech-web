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

const PersonalLoanBlog = () => {
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
          💡 What is a Personal Loan?
        </Box>
      ),
      img: "/blogs7.png",

      content: [
        "A personal loan is money you borrow all at once from a lender and agree to pay back in regular monthly installments. Most personal loans are unsecured, meaning you don’t need to provide collateral like your house or car.",
        "You typically get a fixed interest rate and a fixed repayment term—helping you manage your budget easily.",
      ],
    },
    {
      title: (
        <Box
          component="span"
          sx={{
            display: "flex",
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#007bff",
            justifyContent: "center",
            p: 6,
          }}
        >
          🎯 Common Uses of Personal Loans
        </Box>
      ),
      list: [
        "Medical emergencies",
        "Debt consolidation",
        "Home renovations",
        "Weddings & celebrations",
        "Education or certifications",
      ],
    },
    {
      title: (
        <Box
          component="span"
          sx={{
            display: "flex",
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#007bff",
            justifyContent: "center",
            p: 6,
          }}
        >
          📌 Types of Personal Loans
        </Box>
      ),
      img: "/blogs8.png",
      content: ["Types based on security and purpose:"],
      list: [
        "🛡 Unsecured Loan – No collateral, based on credit score",
        "🏠 Secured Loan – Backed by assets like gold or FD",
        "💍 Wedding Loan – Covers event-related expenses",
        "✈️ Travel Loan – Finances domestic/international trips",
        "🏥 Medical Loan – For health emergencies",
        "🏚 Home Renovation – Painting, upgrades, etc.",
        "📘 Education Loan (short-term) – For skill training",
      ],
    },
    {
      title: (
        <Box
          component="span"
          sx={{
            display: "flex",
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#007bff",
            justifyContent: "center",
            p: 6,
          }}
        >
          💳 Personal Loan vs Credit Card
        </Box>
      ),
      img: "/blogs9.png",
      list: [
        "Personal Loan: Lump sum disbursed upfront, fixed EMI",
        "Credit Card: Revolving credit, flexible payments",
        "Loan = Lower interest for large expenses",
        "Card = Better for short-term purchases",
      ],
    },
    {
      title: (
        <Box
          component="span"
          sx={{
            display: "flex",
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#007bff",
            justifyContent: "center",
            p: 6,
          }}
        >
          📋 Things to Consider Before Borrowing
        </Box>
      ),
      list: [
        "Check your credit score",
        "Review your monthly budget",
        "Compare lenders & offers",
        "Understand terms & fine print",
        "Evaluate alternatives like saving or family help",
      ],
    },
    {
      title: (
        <Box
          component="span"
          sx={{
            display: "flex",
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#007bff",
            justifyContent: "center",
            p: 6,
          }}
        >
          ✅ Final Thoughts
        </Box>
      ),
      content: [
        "Personal loans can be a smart choice if used responsibly. Always borrow only what you need, compare terms, and make sure you can repay on time.",
        "When in doubt, consult a financial advisor to ensure you're making the right decision for your future.",
      ],
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: lightGradientBg, pb: 4 }}>
      {/* Header Section */}
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
            🧾 Personal Loan Guide: Borrow Smart in 2025
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ opacity: 0.9, animation: `${fadeIn} 1s ease-out 0.2s both` }}
          >
            Learn how personal loans work, when to use them, and how they
            compare to credit cards.
          </Typography>
        </Container>
      </Box>

      {/* Main Sections */}
      <Container maxWidth="lg">
        {sections.map((sec, i) => (
          <Section key={i} title={sec.title} delay={0.1 + i * 0.1}>
            {sec.img && (
              <Box
                component="img"
                src={sec.img}
                alt="Personal Loan Visual"
                sx={{
                  width: { xs: "100%", md: "80%" },
                  mx: "auto",
                  mb: 3,
                  borderRadius: 3,
                  display: "block",
                  boxShadow: theme.shadows[4],
                  transition: "0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              />
            )}
            {sec.content?.map((text, idx) => (
              <Typography
                key={idx}
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
                {sec.list.map((item, idx) => (
                  <ListItem key={idx} sx={{ justifyContent: "center" }}>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{
                        fontSize: "1.15rem",
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
          #PersonalLoan #SmartBorrowing #LoanTips #F2Fintech
        </Typography>
      </Container>
    </Box>
  );
};

export default PersonalLoanBlog;

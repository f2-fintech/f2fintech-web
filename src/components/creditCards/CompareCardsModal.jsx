import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Box,
  Divider,
  Grid,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function CompareCardsModal({
  open,
  onClose,
  cards = [],
  onRemoveCard,
  onApply,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (!cards || cards.length === 0) return null;

  const renderSafeText = (text, defaultVal = "N/A") => {
    if (!text) return defaultVal;
    if (typeof text === "string" && /<[a-z][\s\S]*>/i.test(text)) {
      return (
        <Box
          sx={{
            fontSize: "0.85rem",
            "& ul": { pl: 2, my: 0.2 },
            "& li": { mb: 0.2 },
          }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }
    return text;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          background: isDark ? "#0f172a" : "#ffffff",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(50,68,230,0.12)"}`,
          boxShadow: isDark
            ? "0 25px 60px -15px rgba(0,0,0,0.8)"
            : "0 25px 60px -15px rgba(50,68,230,0.22)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          m: 0,
          p: { xs: 2, sm: 2.5 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
          background: isDark
            ? "linear-gradient(180deg, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.6) 100%)"
            : "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              backgroundColor: "rgba(50, 68, 230, 0.12)",
              color: "#3244e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CompareArrowsIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#0f172a", fontSize: "1.1rem" }}>
              Side-by-Side Card Comparison
            </Typography>
            <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
              Comparing {cards.length} {cards.length === 1 ? "card" : "cards"} across fees, rewards & eligibility
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} aria-label="close" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2, sm: 3 }, overflowX: "auto" }}>
        <Box sx={{ minWidth: cards.length > 2 ? `${cards.length * 300}px` : "100%" }}>
          {/* Card Hero Columns */}
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            {cards.map((card) => {
              const joiningFee = card.joining_fee_text || "0";
              const isLTF = joiningFee === "0" || joiningFee === "Nil" || joiningFee === "Free" || !joiningFee;
              const cardSlug = card.card_alias || card.seo_alias || card.id;

              return (
                <Grid item xs={12 / Math.max(cards.length, 1)} key={card.id || card.seo_alias}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "20px",
                      background: isDark
                        ? "linear-gradient(180deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.7) 100%)"
                        : "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                      textAlign: "center",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Delete button */}
                    <Tooltip title="Remove from comparison">
                      <IconButton
                        size="small"
                        onClick={() => onRemoveCard(card)}
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          color: "#ef4444",
                          backgroundColor: isDark ? "rgba(239,68,68,0.15)" : "#fee2e2",
                          "&:hover": { backgroundColor: "#fca5a5", color: "#b91c1c" },
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    {/* Network & LTF Badges */}
                    <Box sx={{ display: "flex", gap: 0.8, justifyContent: "center", mb: 1.5, mt: 0.5 }}>
                      <Chip
                        label={(card.card_type || "VISA").toUpperCase()}
                        size="small"
                        sx={{
                          backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#f1f5f9",
                          color: isDark ? "#fff" : "#334155",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          height: "22px",
                        }}
                      />
                      {isLTF && (
                        <Chip
                          label="Lifetime Free"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(16, 185, 129, 0.12)",
                            color: "#10b981",
                            fontWeight: 800,
                            fontSize: "0.7rem",
                            height: "22px",
                          }}
                        />
                      )}
                    </Box>

                    {/* 3D Card Visual */}
                    <Box sx={{ minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center", my: 1 }}>
                      <img
                        src={card.image || card.card_bg_image || "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742"}
                        alt={card.name}
                        style={{
                          maxHeight: "110px",
                          maxWidth: "180px",
                          width: "100%",
                          objectFit: "contain",
                          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.2))",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.98rem",
                        color: isDark ? "#fff" : "#0f172a",
                        fontFamily: "'Poppins', sans-serif",
                        lineHeight: 1.3,
                        mb: 0.5,
                        minHeight: "42px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {card.name}
                    </Typography>

                    <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif", mb: 2 }}>
                      {card.bank_name || "Issuing Bank"}
                    </Typography>

                    {/* Action Buttons */}
                    <Stack spacing={1} sx={{ mt: "auto" }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          onClose();
                          onApply(card);
                        }}
                        endIcon={<ArrowForwardIcon sx={{ fontSize: "0.95rem !important" }} />}
                        sx={{
                          background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                          color: "#ffffff",
                          fontWeight: 700,
                          borderRadius: "12px",
                          fontSize: "0.85rem",
                          py: 1,
                          textTransform: "none",
                          fontFamily: "'Poppins', sans-serif",
                          boxShadow: "0 4px 12px rgba(50, 68, 230, 0.25)",
                        }}
                      >
                        Apply Now
                      </Button>

                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        onClick={() => {
                          onClose();
                          navigate(`/cards/${cardSlug}`);
                        }}
                        sx={{
                          borderColor: isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1",
                          color: isDark ? "#cbd5e1" : "#475569",
                          fontWeight: 600,
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          textTransform: "none",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        View Full Details
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          {/* Section 1: Fee Structure Table */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                p: 1.2,
                px: 2,
                borderRadius: "10px",
                backgroundColor: isDark ? "rgba(50, 68, 230, 0.15)" : "#eff6ff",
                borderLeft: "4px solid #3244e6",
                mb: 1.5,
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: "0.85rem", color: "#3244e6", letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" }}>
                Fee Structure & Waivers
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {cards.map((card) => {
                const joiningFee = card.joining_fee_text || "0";
                const annualFee = card.annual_fee_text || "0";
                const isJoiningFree = joiningFee === "0" || joiningFee === "Nil" || joiningFee === "Free" || !joiningFee;
                const isAnnualFree = annualFee === "0" || annualFee === "Nil" || annualFee === "Free" || !annualFee;

                return (
                  <Grid item xs={12 / Math.max(cards.length, 1)} key={card.id || card.seo_alias}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "14px",
                        backgroundColor: isDark ? "rgba(30, 41, 59, 0.4)" : "#ffffff",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
                        height: "100%",
                      }}
                    >
                      <Box sx={{ mb: 1.5 }}>
                        <Typography sx={{ fontSize: "0.72rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                          Joining Fee
                        </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", color: isDark ? "#fff" : "#0f172a" }}>
                          {isJoiningFree ? "Free (₹0)" : `₹${parseInt(joiningFee).toLocaleString("en-IN")}`}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 1.5 }}>
                        <Typography sx={{ fontSize: "0.72rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                          Annual Renewal Fee
                        </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", color: isDark ? "#fff" : "#0f172a" }}>
                          {isAnnualFree ? "Free (₹0)" : `₹${parseInt(annualFee).toLocaleString("en-IN")}`}
                        </Typography>
                      </Box>

                      {card.annual_fee_waiver || card.annual_fee_comment ? (
                        <Box sx={{ pt: 1, borderTop: `1px dashed ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}` }}>
                          <Typography sx={{ fontSize: "0.7rem", color: "#3244e6", fontWeight: 700 }}>
                            Fee Waiver
                          </Typography>
                          <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#cbd5e1" : "#475569" }}>
                            {card.annual_fee_comment || `Spend ₹${card.annual_fee_waiver}/yr`}
                          </Typography>
                        </Box>
                      ) : null}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Section 2: Key Rewards & Benefits */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                p: 1.2,
                px: 2,
                borderRadius: "10px",
                backgroundColor: isDark ? "rgba(16, 185, 129, 0.12)" : "#ecfdf5",
                borderLeft: "4px solid #10b981",
                mb: 1.5,
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: "0.85rem", color: "#10b981", letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" }}>
                Key Rewards & Top Features
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {cards.map((card) => (
                <Grid item xs={12 / Math.max(cards.length, 1)} key={card.id || card.seo_alias}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      backgroundColor: isDark ? "rgba(30, 41, 59, 0.4)" : "#ffffff",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
                      height: "100%",
                      minHeight: "180px",
                    }}
                  >
                    <Stack spacing={1.2}>
                      {(card.product_usps || []).slice(0, 3).map((usp, idx) => (
                        <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                          <Box
                            sx={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              backgroundColor: "rgba(16, 185, 129, 0.15)",
                              color: "#10b981",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              mt: "2px",
                            }}
                          >
                            <CheckIcon sx={{ fontSize: "0.75rem" }} />
                          </Box>
                          <Typography sx={{ fontSize: "0.82rem", color: isDark ? "#cbd5e1" : "#334155", lineHeight: 1.4, fontFamily: "'Poppins', sans-serif" }}>
                            <strong>{usp.header}</strong>: {usp.description}
                          </Typography>
                        </Box>
                      ))}

                      {(!card.product_usps || card.product_usps.length === 0) && (
                        <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                          Standard bank rewards and cashback policy applicable.
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Section 3: Eligibility */}
          <Box>
            <Box
              sx={{
                p: 1.2,
                px: 2,
                borderRadius: "10px",
                backgroundColor: isDark ? "rgba(245, 158, 11, 0.12)" : "#fffbeb",
                borderLeft: "4px solid #f59e0b",
                mb: 1.5,
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: "0.85rem", color: "#d97706", letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" }}>
                Eligibility Requirements
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {cards.map((card) => (
                <Grid item xs={12 / Math.max(cards.length, 1)} key={card.id || card.seo_alias}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      backgroundColor: isDark ? "rgba(30, 41, 59, 0.4)" : "#ffffff",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
                      height: "100%",
                    }}
                  >
                    <Grid container spacing={1.5}>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: "0.7rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                          Min Income
                        </Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: isDark ? "#fff" : "#0f172a" }}>
                          {card.income_comment || (card.income ? `₹${parseInt(card.income).toLocaleString("en-IN")}` : "₹25,000/mo")}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: "0.7rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                          Employment
                        </Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: isDark ? "#fff" : "#0f172a" }}>
                          {card.employment_type || "Salaried / Self-Employed"}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: "0.7rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                          Age Limit
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "0.84rem", color: isDark ? "#cbd5e1" : "#475569" }}>
                          {card.min_age ? `${card.min_age} - ${card.max_age || 65} Yrs` : "21 - 65 Yrs"}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: "0.7rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                          CIBIL / CRIF
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "0.84rem", color: isDark ? "#cbd5e1" : "#475569" }}>
                          {card.crif ? `${card.crif}+` : "700+ Score"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

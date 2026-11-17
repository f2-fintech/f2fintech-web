import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Box,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function CardDetailModal({ open, onClose, card, onApply }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (!card) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          background: isDark ? "#0f172a" : "#ffffff",
          backgroundImage: isDark
            ? "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)"
            : "radial-gradient(rgba(50,68,230,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(50,68,230,0.12)"}`,
          boxShadow: isDark
            ? "0 25px 50px -12px rgba(0,0,0,0.7)"
            : "0 25px 50px -12px rgba(50,68,230,0.25)",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <VerifiedIcon sx={{ color: isDark ? "#38bdf8" : "#3244e6", fontSize: "1.4rem" }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#0f172a" }}>
            {card.name}
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="close" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
        {/* Top visual and highlight grid */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
            {card.image && (
              <img
                src={card.image}
                alt={card.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "180px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.2))",
                }}
              />
            )}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
              {card.tags?.map((t) => (
                <Chip
                  key={t.id || t.name}
                  label={t.name}
                  size="small"
                  sx={{
                    backgroundColor: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(50, 68, 230, 0.08)",
                    color: isDark ? "#38bdf8" : "#3244e6",
                    fontWeight: 700,
                    fontSize: "0.76rem",
                    fontFamily: "'Poppins', sans-serif",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccountBalanceIcon sx={{ color: isDark ? "#38bdf8" : "#3244e6" }} />
                <Typography sx={{ fontWeight: 600, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                  Bank: {card.bank_name}
                </Typography>
              </Box>

              {card.annual_saving && card.annual_saving !== "0" && (
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: "12px",
                    backgroundColor: isDark ? "rgba(16, 185, 129, 0.15)" : "#ecfdf5",
                    border: `1px solid ${isDark ? "rgba(16, 185, 129, 0.3)" : "#a7f3d0"}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <MonetizationOnIcon sx={{ color: "#10b981" }} />
                  <Typography sx={{ color: isDark ? "#34d399" : "#065f46", fontWeight: 700, fontSize: "0.9rem", fontFamily: "'Poppins', sans-serif" }}>
                    Potential Annual Savings: ₹{parseInt(card.annual_saving).toLocaleString("en-IN")}/year
                  </Typography>
                </Box>
              )}

              {/* Fees Summary */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2,
                  borderRadius: "14px",
                  backgroundColor: isDark ? "rgba(30, 41, 59, 0.6)" : "#f8fafc",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "0.75rem", color: isDark ? "#94a3b8" : "#64748b", textTransform: "uppercase", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                    Joining Fee
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
                    {card.joining_fee_text === "0" || card.joining_fee_text === "Nil" || !card.joining_fee_text
                      ? "Free"
                      : `₹${card.joining_fee_text}`}
                  </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0" }} />

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "0.75rem", color: isDark ? "#94a3b8" : "#64748b", textTransform: "uppercase", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                    Annual Fee
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
                    {card.annual_fee_text === "0" || card.annual_fee_text === "Nil" || !card.annual_fee_text
                      ? "Free"
                      : `₹${card.annual_fee_text}`}
                  </Typography>
                </Box>
              </Box>

              {card.annual_fee_waiver && (
                <Typography sx={{ fontSize: "0.82rem", color: isDark ? "#cbd5e1" : "#475569", fontFamily: "'Poppins', sans-serif" }}>
                  💡 <strong>Fee Waiver:</strong> {card.annual_fee_waiver}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0" }} />

        {/* Benefits & USPs */}
        {card.product_usps && card.product_usps.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? "#fff" : "#0f172a", mb: 1.5, fontFamily: "'Poppins', sans-serif" }}>
              Key Benefits & Rewards
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {card.product_usps.map((usp, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <CheckCircleIcon sx={{ color: "#10b981", fontSize: "1.1rem", mt: "2px", flexShrink: 0 }} />
                  <Typography sx={{ fontSize: "0.88rem", color: isDark ? "#cbd5e1" : "#334155", fontFamily: "'Poppins', sans-serif", lineHeight: 1.5 }}>
                    <strong>{usp.header}</strong>: {usp.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Eligibility Details */}
        {(card.age_criteria || card.income || card.crif) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? "#fff" : "#0f172a", mb: 1.5, fontFamily: "'Poppins', sans-serif" }}>
              Eligibility Criteria
            </Typography>
            <Grid container spacing={2}>
              {card.age_criteria && (
                <Grid item xs={12} sm={4}>
                  <Box sx={{ p: 1.5, borderRadius: "12px", backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}>
                    <Typography sx={{ fontSize: "0.75rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      Age Requirement
                    </Typography>
                    <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                      {card.age_criteria} Years
                    </Typography>
                  </Box>
                </Grid>
              )}
              {card.income && (
                <Grid item xs={12} sm={4}>
                  <Box sx={{ p: 1.5, borderRadius: "12px", backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}>
                    <Typography sx={{ fontSize: "0.75rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      Min Annual Income
                    </Typography>
                    <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                      ₹{parseInt(card.income).toLocaleString("en-IN")}+
                    </Typography>
                  </Box>
                </Grid>
              )}
              {card.crif && (
                <Grid item xs={12} sm={4}>
                  <Box sx={{ p: 1.5, borderRadius: "12px", backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}>
                    <Typography sx={{ fontSize: "0.75rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      Min Credit Score
                    </Typography>
                    <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                      {card.crif}+
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        )}

        {/* Exclusions */}
        {card.exclusion_earnings && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: isDark ? "#94a3b8" : "#64748b", mb: 0.5, fontFamily: "'Poppins', sans-serif" }}>
              Reward Exclusions
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif", lineHeight: 1.5 }}>
              {card.exclusion_earnings}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 2.5,
          borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onClose} sx={{ textTransform: "none", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
          Close
        </Button>
        <Button
          onClick={() => {
            onClose();
            onApply(card);
          }}
          variant="contained"
          sx={{
            background: isDark
              ? "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
              : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
            color: "#fff",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "50px",
            px: 4,
            py: 1,
            fontFamily: "'Poppins', sans-serif",
            "&:hover": {
              background: isDark
                ? "linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)"
                : "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
            },
          }}
        >
          Apply Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}

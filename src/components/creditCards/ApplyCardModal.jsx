import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import { toast } from "react-toastify";
import { submitCardLead, trackCardClick } from "../../apis/CreditCardsAPI";

function getCustomerInfo() {
  try {
    const item = localStorage.getItem("customerInfo");
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
}

export default function ApplyCardModal({ open, onClose, card }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const currentUser = getCustomerInfo();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        fullName: currentUser?.name || "",
        mobile: currentUser?.mobile || "",
        email: currentUser?.email || "",
        city: currentUser?.city || "",
        pincode: currentUser?.pincode || "",
      });
      setErrors({});
      setLoading(false);
    }
  }, [open, currentUser]);

  if (!card) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      // 1. Track Click
      const clickRes = await trackCardClick(card, currentUser?.id);
      const trackingUrl = clickRes?.tracking_url || card.network_url;
      const clickId = clickRes?.click_id;

      // 2. Submit Lead
      const leadRes = await submitCardLead({
        full_name: formData.fullName.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email ? formData.email.trim() : "",
        city: formData.city ? formData.city.trim() : "",
        pincode: formData.pincode ? formData.pincode.trim() : "",
        card_id: card.id,
        card_name: card.name,
        card_alias: card.card_alias || card.seo_alias || "",
        bank_name: card.bank_name,
        card_type: card.card_type,
        joining_fee_text: card.joining_fee_text,
        campaign_id: card.campaign_id,
        click_id: clickId,
        tracking_url: trackingUrl,
        network_url: card.network_url,
        customer_id: currentUser?.id,
      });

      const finalRedirectUrl = leadRes?.tracking_url || trackingUrl || (card.network_url ? card.network_url.trim() : "");

      toast.success("Application initiated! Redirecting to official bank portal...");

      // 3. Redirect smoothly
      setTimeout(() => {
        if (finalRedirectUrl) {
          window.open(finalRedirectUrl, "_blank", "noopener,noreferrer");
        }
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Apply error:", err);
      toast.error("Connecting to bank portal...");
      if (card.network_url) {
        window.open(card.network_url, "_blank", "noopener,noreferrer");
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
            Apply for {card.name}
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="close" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        {/* Card Header Preview */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            mb: 3,
            borderRadius: "16px",
            backgroundColor: isDark ? "rgba(30, 41, 59, 0.6)" : "#f8fafc",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
          }}
        >
          {card.image && (
            <img
              src={card.image}
              alt={card.name}
              style={{ width: "85px", height: "55px", objectFit: "contain", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.15))" }}
            />
          )}
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: isDark ? "#fff" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
              {card.name}
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
              {card.bank_name} • Joining Fee: ₹{card.joining_fee_text || "0"}
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name (as per PAN)"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
              required
              size="small"
              inputProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
              InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
            />

            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              fullWidth
              required
              size="small"
              placeholder="10-digit mobile number"
              inputProps={{ maxLength: 10, style: { fontFamily: "'Poppins', sans-serif" } }}
              InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              size="small"
              inputProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
              InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                size="small"
                inputProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
                InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
              />

              <TextField
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                error={!!errors.pincode}
                helperText={errors.pincode}
                fullWidth
                size="small"
                inputProps={{ maxLength: 6, style: { fontFamily: "'Poppins', sans-serif" } }}
                InputLabelProps={{ style: { fontFamily: "'Poppins', sans-serif" } }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <LockIcon sx={{ fontSize: "0.95rem", color: isDark ? "#94a3b8" : "#64748b" }} />
              <Typography sx={{ fontSize: "0.75rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
                256-bit SSL encrypted. Directly submitted to issuing bank.
              </Typography>
            </Box>
          </Box>
        </form>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2.5,
          borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onClose} sx={{ textTransform: "none", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ArrowForwardIcon />}
          sx={{
            background: isDark
              ? "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
              : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
            color: "#fff",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "50px",
            px: 3.5,
            py: 1,
            fontFamily: "'Poppins', sans-serif",
            "&:hover": {
              background: isDark
                ? "linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)"
                : "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
            },
          }}
        >
          {loading ? "Processing..." : "Continue to Bank Application"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

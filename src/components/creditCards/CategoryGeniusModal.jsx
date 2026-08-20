import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Box,
  Slider,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { toast } from "react-toastify";
import { calculateCardSpends } from "../../apis/CreditCardsAPI";

const CATEGORY_QUESTIONS = {
  shopping: [
    { key: "amazon_spends", label: "Monthly spend on Amazon (₹)", max: 100000, step: 1000, default: 8000 },
    { key: "flipkart_spends", label: "Monthly spend on Flipkart (₹)", max: 100000, step: 1000, default: 4000 },
    { key: "other_online_spends", label: "Other online shopping (Myntra, Ajio etc.) (₹)", max: 100000, step: 1000, default: 3000 },
    { key: "other_offline_spends", label: "Monthly offline store shopping (₹)", max: 100000, step: 1000, default: 5000 },
  ],
  fuel: [
    { key: "fuel", label: "Monthly spend on Fuel / Petrol / Diesel (₹)", max: 50000, step: 500, default: 5000 },
  ],
  "online-food": [
    { key: "online_food_ordering", label: "Monthly spend on Zomato / Swiggy (₹)", max: 50000, step: 500, default: 4000 },
  ],
  dining: [
    { key: "dining_or_going_out", label: "Monthly spend on restaurants & dining out (₹)", max: 50000, step: 500, default: 5000 },
  ],
  grocery: [
    { key: "grocery_spends_online", label: "Monthly groceries (Blinkit, Zepto, Instamart) (₹)", max: 80000, step: 1000, default: 8000 },
  ],
  travel: [
    { key: "flights_annual", label: "Annual spend on Flights (₹)", max: 500000, step: 10000, default: 60000 },
    { key: "hotels_annual", label: "Annual spend on Hotels & Stays (₹)", max: 500000, step: 10000, default: 30000 },
    { key: "domestic_lounge_usage_quarterly", label: "Domestic airport lounge visits per year", max: 50, step: 1, default: 4, isCount: true },
  ],
  utility: [
    { key: "electricity_bills", label: "Monthly Electricity bill (₹)", max: 30000, step: 500, default: 2500 },
    { key: "mobile_phone_bills", label: "Monthly Mobile & Wi-Fi recharge (₹)", max: 10000, step: 100, default: 1000 },
    { key: "rent", label: "Monthly House Rent (₹)", max: 200000, step: 2000, default: 15000 },
  ],
};

const CATEGORY_NAMES = {
  shopping: "Shopping",
  fuel: "Fuel",
  "online-food": "Food Delivery",
  dining: "Dining",
  grocery: "Grocery",
  travel: "Travel",
  utility: "Utility & Bills",
};

export default function CategoryGeniusModal({
  open,
  onClose,
  category = "shopping",
  onApplySavings,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const questions = CATEGORY_QUESTIONS[category] || CATEGORY_QUESTIONS.shopping;
  const categoryTitle = CATEGORY_NAMES[category] || "Category";

  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const initial = {};
      questions.forEach((q) => {
        initial[q.key] = q.default || 0;
      });
      setValues(initial);
      setLoading(false);
    }
  }, [open, category]);

  const handleSlider = (key) => (e, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await calculateCardSpends(values);
      toast.success(`Calculated savings for ${categoryTitle} cards!`);
      onApplySavings(category, res);
      onClose();
    } catch (err) {
      console.error("Genius calculation error:", err);
      toast.error("Failed to calculate savings. Please try again.");
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
          <AutoAwesomeIcon sx={{ color: isDark ? "#38bdf8" : "#3244e6", fontSize: "1.4rem" }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#0f172a" }}>
            Calculate {categoryTitle} Savings
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="close" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
        <Typography sx={{ color: isDark ? "#94a3b8" : "#64748b", fontSize: "0.9rem", mb: 3, fontFamily: "'Poppins', sans-serif" }}>
          Tell us your approximate spending to calculate exact annual cashback and reward savings for each card.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {questions.map((q, idx) => {
            const val = values[q.key] || 0;
            return (
              <Box key={q.key}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.88rem", color: isDark ? "#e2e8f0" : "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
                    {idx + 1}. {q.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: isDark ? "#38bdf8" : "#3244e6", fontFamily: "'Poppins', sans-serif" }}>
                    {q.isCount ? `${val} visits/yr` : `₹${val.toLocaleString("en-IN")}`}
                  </Typography>
                </Box>
                <Slider
                  value={val}
                  onChange={handleSlider(q.key)}
                  min={0}
                  max={q.max}
                  step={q.step}
                  sx={{ color: isDark ? "#38bdf8" : "#3244e6" }}
                />
              </Box>
            );
          })}
        </Box>
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
          onClick={handleCalculate}
          variant="contained"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <AutoAwesomeIcon />}
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
          {loading ? "Calculating..." : "Calculate Savings"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

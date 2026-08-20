import React, { useState } from "react";
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
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CalculateIcon from "@mui/icons-material/Calculate";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FlightIcon from "@mui/icons-material/Flight";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import { calculateCardSpends } from "../../apis/CreditCardsAPI";
import { toast } from "react-toastify";

export default function SpendCalculatorModal({ open, onClose, onSelectCard }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [spends, setSpends] = useState({
    amazon_spends: 10000,
    flipkart_spends: 5000,
    other_online_spends: 3000,
    other_offline_spends: 4000,
    grocery_spends_online: 6000,
    online_food_ordering: 4000,
    fuel: 4000,
    dining_or_going_out: 5000,
    flights_annual: 50000,
    hotels_annual: 20000,
    electricity_bills: 3000,
    mobile_phone_bills: 1000,
    rent: 15000,
  });

  const [loading, setLoading] = useState(false);
  const [recommendedCards, setRecommendedCards] = useState(null);

  const handleSliderChange = (name) => (event, newValue) => {
    setSpends((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const data = await calculateCardSpends(spends);
      let list = [];
      if (data?.savings && Array.isArray(data.savings)) {
        list = data.savings;
      } else if (data?.cards && Array.isArray(data.cards)) {
        list = data.cards;
      } else if (Array.isArray(data)) {
        list = data;
      } else if (data?.data && Array.isArray(data.data)) {
        list = data.data;
      }

      if (list.length > 0) {
        setRecommendedCards(list);
        toast.success(`Calculated top ${Math.min(list.length, 5)} matching credit cards!`);
      } else {
        toast.info("No specific cards matched these criteria. Try adjusting your spend amounts.");
      }
    } catch (err) {
      console.error("Calculate spends error:", err);
      toast.error("Failed to calculate savings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const rankBadges = [
    { title: "🏆 #1 Best Value Match", color: "#3244e6", bg: "rgba(50,68,230,0.12)" },
    { title: "⭐ #2 Top Rewards", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
    { title: "🔥 #3 High Cashback", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    { title: "✨ #4 Great Savings", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
    { title: "💎 #5 Smart Pick", color: "#06b6d4", bg: "rgba(6,182,212,0.12)" },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "28px",
          background: isDark ? "#0f172a" : "#ffffff",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(50,68,230,0.12)"}`,
          boxShadow: isDark
            ? "0 25px 60px -12px rgba(0,0,0,0.8)"
            : "0 25px 60px -12px rgba(50,68,230,0.25)",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: { xs: 2.5, sm: 3 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: isDark
            ? "linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.9) 100%)"
            : "linear-gradient(135deg, #f8faff 0%, #eef4ff 100%)",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(50,68,230,0.1)"}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(50,68,230,0.3)",
            }}
          >
            <AutoAwesomeIcon sx={{ color: "#ffffff", fontSize: "1.2rem" }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#0f172a", fontSize: { xs: "1rem", sm: "1.15rem" } }}>
              CardGenius™ Spend & Rewards Calculator
            </Typography>
            <Typography sx={{ fontSize: "0.76rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
              Calculate personalized yearly rewards & net cashback across 130+ cards
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} aria-label="close" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, sm: 4 }, maxHeight: "75vh", overflowY: "auto" }}>
        <Typography sx={{ color: isDark ? "#cbd5e1" : "#475569", fontSize: "0.92rem", mb: 3.5, fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
          Tell us your approximate spending pattern to see which credit cards yield maximum cashback and milestone value:
        </Typography>

        {/* Sliders Grid */}
        <Grid container spacing={3.5}>
          {/* Online Shopping */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, borderRadius: "16px", backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ShoppingBagIcon sx={{ fontSize: "1.1rem", color: "#3244e6" }} />
                  <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b" }}>
                    Online Shopping
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 800, color: "#3244e6", fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" }}>
                  ₹{spends.amazon_spends.toLocaleString("en-IN")}/mo
                </Typography>
              </Box>
              <Slider
                value={spends.amazon_spends}
                onChange={handleSliderChange("amazon_spends")}
                min={0}
                max={100000}
                step={1000}
                sx={{ color: "#3244e6" }}
              />
            </Box>
          </Grid>

          {/* Dining & Food Delivery */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, borderRadius: "16px", backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <RestaurantIcon sx={{ fontSize: "1.1rem", color: "#f59e0b" }} />
                  <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b" }}>
                    Dining & Food Apps
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 800, color: "#f59e0b", fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" }}>
                  ₹{spends.dining_or_going_out.toLocaleString("en-IN")}/mo
                </Typography>
              </Box>
              <Slider
                value={spends.dining_or_going_out}
                onChange={handleSliderChange("dining_or_going_out")}
                min={0}
                max={50000}
                step={500}
                sx={{ color: "#f59e0b" }}
              />
            </Box>
          </Grid>

          {/* Fuel & Petrol */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, borderRadius: "16px", backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalGasStationIcon sx={{ fontSize: "1.1rem", color: "#ef4444" }} />
                  <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b" }}>
                    Fuel & Petrol
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 800, color: "#ef4444", fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" }}>
                  ₹{spends.fuel.toLocaleString("en-IN")}/mo
                </Typography>
              </Box>
              <Slider
                value={spends.fuel}
                onChange={handleSliderChange("fuel")}
                min={0}
                max={30000}
                step={500}
                sx={{ color: "#ef4444" }}
              />
            </Box>
          </Grid>

          {/* Flights & Hotels */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, borderRadius: "16px", backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "#f8fafc", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FlightIcon sx={{ fontSize: "1.1rem", color: "#06b6d4" }} />
                  <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif", color: isDark ? "#fff" : "#1e293b" }}>
                    Flights & Travel (Annual)
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 800, color: "#06b6d4", fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem" }}>
                  ₹{spends.flights_annual.toLocaleString("en-IN")}/yr
                </Typography>
              </Box>
              <Slider
                value={spends.flights_annual}
                onChange={handleSliderChange("flights_annual")}
                min={0}
                max={500000}
                step={10000}
                sx={{ color: "#06b6d4" }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Calculate CTA Button */}
        <Box sx={{ mt: 4, mb: 4, textAlign: "center" }}>
          <Button
            onClick={handleCalculate}
            variant="contained"
            disabled={loading}
            size="large"
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CalculateIcon />}
            sx={{
              background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
              color: "#fff",
              fontWeight: 800,
              textTransform: "none",
              borderRadius: "50px",
              px: 5,
              py: 1.4,
              fontSize: "1rem",
              fontFamily: "'Poppins', sans-serif",
              boxShadow: "0 10px 25px rgba(50, 68, 230, 0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Calculating Best Cards..." : "Calculate Best Cards"}
          </Button>
        </Box>

        {/* Recommended Cards List */}
        {recommendedCards && (
          <Box
            sx={{
              mt: 2,
              p: { xs: 2.5, sm: 3 },
              borderRadius: "24px",
              backgroundColor: isDark ? "rgba(30, 41, 59, 0.6)" : "#f8faff",
              border: `1px solid ${isDark ? "rgba(56, 189, 248, 0.3)" : "#b9d5ff"}`,
              boxShadow: "0 12px 32px rgba(50,68,230,0.08)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2.5 }}>
              <AutoAwesomeIcon sx={{ color: "#3244e6" }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif", fontSize: "1.05rem" }}>
                Top Recommended Cards for Your Spending
              </Typography>
            </Box>

            <Stack spacing={2}>
              {recommendedCards.slice(0, 5).map((card, idx) => {
                const rank = rankBadges[idx] || rankBadges[0];
                const netSavings = card.total_savings_yearly || card.net_savings || card.annual_saving || 0;
                const cardName = card.card_name || card.name || "Credit Card";
                const bankName = card.bank_name || card.bank || "Bank";
                const annualFee = card.annual_fee_without_gst || card.annual_fees || card.annual_fee_text || "0";
                const cardImg = card.logo || card.image || card.card_bg_image || "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742";

                return (
                  <Card
                    key={card.id || idx}
                    sx={{
                      borderRadius: "18px",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                      background: isDark ? "#1e293b" : "#ffffff",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 25px rgba(50,68,230,0.12)",
                        borderColor: "#3244e6",
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: { xs: 2, sm: 2.5 } } }}>
                      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}>
                        {/* Artwork & Details */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                          <Box
                            sx={{
                              width: 80,
                              height: 52,
                              borderRadius: "10px",
                              p: 0.5,
                              backgroundColor: "#f1f5f9",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={cardImg}
                              alt={cardName}
                              style={{ width: "100%", height: "100%", objectFit: "contain" }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742";
                              }}
                            />
                          </Box>

                          <Box>
                            <Chip
                              label={rank.title}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.72rem",
                                color: rank.color,
                                backgroundColor: rank.bg,
                                borderRadius: "6px",
                                height: 22,
                                mb: 0.5,
                              }}
                            />
                            <Typography sx={{ fontWeight: 800, color: isDark ? "#fff" : "#0f172a", fontFamily: "'Poppins', sans-serif", fontSize: "0.98rem", lineHeight: 1.3 }}>
                              {cardName}
                            </Typography>
                            <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
                              {bankName} • Annual Fee: {annualFee === "0" || annualFee === "Nil" ? "Free" : `₹${parseInt(annualFee).toLocaleString("en-IN")}`}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Value Badge & Action */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "space-between", sm: "flex-end" } }}>
                          <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                            <Typography sx={{ fontSize: "0.72rem", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                              Net Estimated Savings
                            </Typography>
                            <Typography sx={{ fontSize: "1.15rem", fontWeight: 850, color: "#10b981", fontFamily: "'Poppins', sans-serif" }}>
                              ₹{parseInt(netSavings).toLocaleString("en-IN")}/yr
                            </Typography>
                          </Box>

                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              onClose();
                              onSelectCard && onSelectCard(card);
                            }}
                            endIcon={<ArrowForwardIcon sx={{ fontSize: "0.9rem !important" }} />}
                            sx={{
                              background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                              color: "#fff",
                              fontWeight: 700,
                              borderRadius: "50px",
                              px: 2.5,
                              py: 0.9,
                              textTransform: "none",
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: "0.85rem",
                              boxShadow: "0 4px 12px rgba(50,68,230,0.25)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Apply Now
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
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
        <Typography sx={{ fontSize: "0.78rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif" }}>
          * Savings estimates calculated using live BankKaro AI engine
        </Typography>
        <Button onClick={onClose} sx={{ textTransform: "none", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

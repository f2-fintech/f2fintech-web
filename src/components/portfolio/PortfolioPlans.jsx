import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  useTheme,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle,
  Close,
  Payment,
  WhatsApp,
  ContentCopy,
} from "@mui/icons-material";

const plans = [
  {
    id: "#001",
    title: "Standard Lending Solution",
    price: "₹1.00",
    amount: "1.00",
    duration: "Basic Package",
    popular: false,
    features: [
      "F2 Financial Advisory (6 Times)",
      "1 Free live session",
      "Get 5mins Free Call",
      "1st call for data gathering with our advisor",
      "2nd call with our qualified financial advisor for a plan",
    ],
  },
  {
    id: "#002",
    title: "Standard Lending Solution",
    price: "₹100.00",
    amount: "100.00",
    duration: "6 Months",
    popular: false,
    features: [
      "F2 Financial Advisory (6 Months)",
      "1 Free live session",
      "Get 30mins Free Call",
      "1st call for data gathering with our advisor",
      "2nd call with our qualified financial advisor for a plan",
    ],
  },
  {
    id: "#003",
    title: "Supreme Strategy For Lenders",
    price: "₹639.00",
    amount: "639.00",
    duration: "Premium Package",
    popular: true,
    features: [
      "1 Free live sessions",
      "Eligibility Check Form Multiple Lenders",
      "Personalized Lending Solutions",
      "Call for data gathering with our advisor",
      "3 Times Relationship Management (RM) Support",
    ],
  },
  {
    id: "#004",
    title: "Ultimate Financial Blueprint",
    price: "₹1,369.00",
    amount: "1369.00",
    duration: "3 Years",
    popular: false,
    features: [
      "F2 Financial Advisory (3 Years)",
      "Personalized Loan Solutions",
      "Team Sheet For Easy Comparison",
      "Free live sessions",
      "3 Years RM Support",
    ],
  },
  {
    id: "#006",
    title: "Presidential Portfolio Plan",
    price: "₹5,369.00",
    amount: "5369.00",
    duration: "5 Years",
    popular: false,
    features: [
      "Enroll as a Channel Partner with zero fees or charges on any Financial Product",
      "Based Deals on Fees & Charges",
      "Regular Financial Check-ups",
      "Periodic reviews & Support",
      "5 Year RM Support",
    ],
  },
  {
    id: "#007",
    title: "Executive Presidential Portfolio Plan",
    price: "₹10,369.00",
    amount: "10369.00",
    duration: "9 Years",
    popular: false,
    features: [
      "Enroll as a Channel Partner with zero fees or charges on any Financial Product",
      "Based Deals on Fees & Charges",
      "Regular Financial Check-ups",
      "Periodic reviews & Support",
      "9 Year RM Support",
    ],
  },
  {
    id: "#008",
    title: "Premium Presidential Portfolio Plan",
    price: "₹15,369.00",
    amount: "15369.00",
    duration: "Lifetime",
    popular: false,
    features: [
      "Enroll as a Channel Partner with zero fees or charges on any Financial Product",
      "Based Deals on Fees & Charges",
      "Regular Financial Check-ups",
      "Periodic reviews & Support",
      "Lifetime RM Support",
    ],
  },
];

const PortfolioPlans = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const upiId = "harpreet3006-1@okhdfcbank";
  const whatsappNumber = "+91 88106 00135";

  const handleOpen = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
    setImageLoading(true);
    setImageError(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlan(null);
    setCopySuccess(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
    console.error("Failed to load QR image: /qr.webp");
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const openWhatsApp = () => {
    const message = `Hi! I want to subscribe to ${selectedPlan?.title} (${selectedPlan?.id}) for ${selectedPlan?.price}. Please help me with the process.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
      /\s+/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const theme = useTheme();

  return (
    <Box sx={{ p: 4, backgroundColor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: "#caa8f5",
          fontWeight: "bold",
          mb: 4,
        }}
      >
        Choose Your Financial Plan
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card
              sx={{
                height: "100%",
                background: plan.popular
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "linear-gradient(135deg, #d8b4fe 0%, #06b6d4 100%)",
                color: "#fff",
                borderRadius: 4,
                boxShadow: plan.popular ? 8 : 6,
                position: "relative",
                border: plan.popular ? "2px solid #ffd700" : "none",
                transform: plan.popular ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: plan.popular ? "scale(1.08)" : "scale(1.03)",
                  boxShadow: 10,
                },
              }}
            >
              {plan.popular && (
                <Chip
                  label="Most Popular"
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: 20,
                    backgroundColor: "#ffd700",
                    color: "#000",
                    fontWeight: "bold",
                    zIndex: 1,
                  }}
                />
              )}

              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#000",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: "bold",
                    }}
                  >
                    {plan.id}
                  </Typography>
                  <Chip
                    label={plan.duration}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "#fff",
                    }}
                  />
                </Box>

                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    minHeight: "3rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {plan.title}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    fontWeight: "bold",
                    textAlign: "center",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {plan.price}
                </Typography>

                <List dense sx={{ mb: 2 }}>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle sx={{ color: "#4ade80", fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{ color: "#fff", fontSize: "0.9rem" }}
                          >
                            {feature}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  variant="contained"
                  onClick={() => handleOpen(plan)}
                  sx={{
                    mt: 2,
                    backgroundColor: plan.popular ? "#ffd700" : "#001F3F",
                    color: plan.popular ? "#000" : "white",
                    fontWeight: "bold",
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: plan.popular ? "#ffed4e" : "#003366",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  fullWidth
                  startIcon={<Payment />}
                >
                  GET STARTED
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: "#fff",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            pb: 1,
            position: "relative",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
            Complete Your Payment
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666", mt: 1 }}>
            {selectedPlan?.title}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", px: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                color: "#4caf50",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              {selectedPlan?.price}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Scan the QR code below or use UPI ID
            </Typography>
          </Box>

          {/* QR Code Section */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "220px",
              mb: 3,
              backgroundColor: "#f8f9fa",
              borderRadius: 2,
              border: "2px dashed #ddd",
            }}
          >
            {imageLoading && (
              <CircularProgress
                sx={{
                  position: "absolute",
                  color: "#4caf50",
                }}
              />
            )}

            {imageError ? (
              <Alert
                severity="info"
                sx={{
                  width: "100%",
                  "& .MuiAlert-message": {
                    fontSize: "0.875rem",
                  },
                }}
              >
                QR Code not available. Please use the UPI ID below to make
                payment.
              </Alert>
            ) : (
              <img
                src={`/new/portfolio${selectedPlan?.amount.split(".")[0]}.webp`}
                alt={`QR Code for ${selectedPlan?.title}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "12px",
                  border: "2px solid #ddd",
                  display: imageLoading ? "none" : "block",
                }}
              />
            )}
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" sx={{ color: "#666" }}>
              OR
            </Typography>
          </Divider>

          {/* UPI ID Section */}
          <Box
            sx={{
              backgroundColor: "green",
              p: 2,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#000 !important", mb: 1 }}
            >
              Pay using UPI ID:
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  fontFamily: "monospace",
                }}
              >
                {upiId}
              </Typography>
              <Tooltip title={copySuccess ? "Copied!" : "Copy"}>
                <IconButton
                  onClick={() => copyToClipboard(upiId)}
                  size="small"
                  sx={{
                    color: "white", // sets icon color to white
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)", // light white hover effect
                    },
                  }}
                >
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            {copySuccess && (
              <Typography
                variant="caption"
                sx={{ color: "#4caf50", mt: 1, display: "block" }}
              >
                UPI ID copied to clipboard!
              </Typography>
            )}
          </Box>

          {/* WhatsApp Support */}
          <Box
            sx={{
              backgroundColor: "#e8f5e8",
              p: 2,
              borderRadius: 2,
              border: "1px solid #4caf50",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#2e7d32", fontWeight: "bold", mb: 1 }}
            >
              Need Help?
            </Typography>
            <Typography variant="body2" sx={{ color: "#2e7d32", mb: 2 }}>
              Send your payment screenshot to WhatsApp for faster approval
            </Typography>
            <Button
              variant="contained"
              onClick={openWhatsApp}
              sx={{
                backgroundColor: "#25d366",
                color: "white",
                "&:hover": { backgroundColor: "#20b858" },
              }}
              startIcon={<WhatsApp />}
              fullWidth
            >
              Contact Support: {whatsappNumber}
            </Button>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", p: 3, pt: 1 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              minWidth: 120,
              bgcolor: "gray",
              borderColor: "#666",
              color: "white",
              "&:hover": {
                borderColor: "#333",
                bgcolor: "white",
                color: "black",
              },
            }}
          >
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PortfolioPlans;

import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Modal,
  Button,
} from "@mui/material";
import QRModal from "./QRModal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const plans = [
  {
    title: "Monthly Subscription Plan",
    price: "199-Plan",
    features: [
      "Financial assessment",
      "Investment recommendations",
      "Dedicated sales representative for guidance",
    ],
  },
  {
    title: "6-Months Subscription Plan",
    price: "599-Plan",
    features: [
      "Comprehensive financial planning",
      "Semi-annual portfolio performance review",
      "Tax-saving investment opportunities",
      "Retirement and wealth management guidance",
      "Dedicated sales representative",
    ],
  },
  {
    title: "Annual Subscription Plan",
    price: "999-Plan",
    features: [
      "Full-spectrum financial consulting",
      "Quarterly portfolio adjustments",
      "Tax optimization and strategic planning",
      "Comprehensive retirement and estate planning",
      "Priority access to exclusive financial products",
      "Dedicated sales representative",
    ],
  },
];

export default function Plans() {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpen = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlan(null);
  };
  return (
    <Box
      sx={{
        bgcolor: "#121212",
        minHeight: "100vh",
        py: 8,
        px: 3,
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#caa8f5", fontWeight: "bold" }}
      >
        Welcome User!
      </Typography>

      <Grid container spacing={4} justifyContent="center" mt={4}>
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box onClick={() => handleOpen(plan)} sx={{ cursor: "pointer" }}>
              <Card
                sx={{
                  height: "60vh",
                  bgcolor: "#1e1e1e",
                  borderRadius: 3,
                  boxShadow: 5,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardHeader
                  title={plan.title}
                  titleTypographyProps={{
                    align: "center",
                    sx: {
                      color: "#caa8f5",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    },
                  }}
                  sx={{
                    bgcolor: "#2b2b2b",
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      backgroundColor: "#333",
                      textAlign: "center",
                      py: 1,
                      borderRadius: 2,
                      mb: 2,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "#caa8f5",
                    }}
                  >
                    <CurrencyRupeeIcon
                      fontSize="small"
                      sx={{ color: "#caa8f5" }}
                    />{" "}
                    {plan.price}
                  </Box>

                  <Divider sx={{ borderColor: "#555", mb: 2 }} />

                  <List dense>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} sx={{ color: "#ddd" }}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: "#a78bfa" }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <QRModal
        open={open}
        handleClose={handleClose}
        selectedPlan={selectedPlan}
      />
    </Box>
  );
}

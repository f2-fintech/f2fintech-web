import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Modal,
  TextField,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
  Fade,
} from "@mui/material";
import {
  Close,
  CheckCircleOutline,
  ErrorOutline,
  SendRounded,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import useProductLead from "../../apis/ProductLeadsAPI";

const products = [
  {
    name: "EMS",
    description:
      "EMS (Employee Management System) helps businesses streamline employee records, manage payroll, track attendance, process leaves, and automate HR tasks for greater efficiency and compliance.",
    color: "#E91E63",
    icon: "👥",
  },
  {
    name: "Karya.io",
    description:
      "Karya.io is an all-in-one office management platform designed to simplify task management, assign responsibilities, track team productivity, and foster collaboration, enhancing workplace efficiency and communication.",
    color: "#3F51B5",
    icon: "📋",
  },
  {
    name: "Aarogya",
    description:
      "Aarogya is a comprehensive healthcare management system for doctors and medical practitioners. It enables easy appointment scheduling, teleconsultation, patient records management, and prescription handling, making healthcare services more accessible.",
    color: "#4CAF50",
    icon: "🩺",
  },
  {
    name: "ATS",
    description:
      "ATS (Applicant Tracking System) helps recruiters and HR teams streamline the hiring process. It allows tracking of applicants, interview scheduling, candidate pipeline management, and data-driven hiring decision-making.",
    color: "#FF9800",
    icon: "🔍",
  },
  {
    name: "Quora AI",
    description:
      "Quora AI provides advanced AI agents designed to assist with your day-to-day tasks. These intelligent agents understand your work context and provide personalized responses, helping automate repetitive processes and improve efficiency. Suggesting solutions & handling routine tasks.",
    color: "#9C27B0",
    icon: "🤖",
  },
  {
    name: "Payroll",
    description:
      "The Payroll system offers a comprehensive solution for managing employee compensation, tax calculations, salary disbursements, and statutory compliance, ensuring smooth payroll processing for businesses of any size.",
    color: "#FF5722",
    icon: "💰",
  },
];

const OurProducts = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const { createProductLead } = useProductLead();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    orgName: "",
    contact: "",
    email: "",
    product: "",
    message: "",
  });

  // Advanced form validation
  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const orgNameRegex = /^[a-zA-Z0-9\s]{2,100}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Name must be 2-50 characters, letters only";
    }

    // Organization Name validation
    if (!formData.orgName.trim()) {
      errors.orgName = "Organization Name is required";
    } else if (!orgNameRegex.test(formData.orgName)) {
      errors.orgName = "Organization Name must be 2-100 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Phone validation
    if (!formData.contact.trim()) {
      errors.contact = "Contact number is required";
    } else if (!phoneRegex.test(formData.contact)) {
      errors.contact = "Invalid 10-digit phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const payload = {
      name: formData.name,
      organization_name: formData.orgName,
      contact: formData.contact,
      email: formData.email,
      product: formData.product,
      message: formData.message,
    };

    try {
      const response = await createProductLead(payload);
      if (response.success) {
        toast.success("Successfully submitted your application!");
        handleClose();
      } else {
        toast.error("Failed to submit: " + (response.error || "Unknown error"));
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (productName) => {
    setSelectedProduct(productName);
    setFormData((prev) => ({ ...prev, product: productName }));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      orgName: "",
      contact: "",
      email: "",
      product: "",
      message: "",
    });
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Container sx={{ pb: 8 }}>
      <Typography
        align="center"
        fontWeight="bold"
        gutterBottom
        sx={{
          background: "linear-gradient(90deg, #7C3AED 0%, #9F7AEA 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 5,
        }}
      >
        Our SAAS based Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={6}
              sx={{
                backgroundColor: product.color,
                color: "#fff",
                padding: "20px",
                borderRadius: "16px",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "3rem",
                  mb: 2,
                }}
              >
                {product.icon}
              </Box>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  mb: 2,
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  height: "8rem",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  wordWrap: "break-word",
                  mb: 2,
                }}
              >
                {product.description}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  onClick={() => handleOpen(product.name)}
                  variant="contained"
                  sx={{
                    bgcolor: "white",
                    color: product.color,
                    width: "8rem",
                    borderRadius: "40px",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.9)",
                      color: product.color,
                    },
                  }}
                >
                  Get Quote
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Enhanced Modal for Form */}
      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        }}
      >
        <Fade in={open}>
          <Paper
            sx={{
              width: { xs: "90%", sm: 500 },
              maxWidth: 600,
              bgcolor: "white",
              p: 4,
              borderRadius: 3,
              boxShadow: 24,
              mx: "auto",
              mt: "5%",
              position: "relative",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "grey.500",
              }}
            >
              <Close />
            </IconButton>

            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              sx={{
                fontFamily: "monospace",
                color: "gray",
                mb: 3,
              }}
            >
              {selectedProduct} Inquiry
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Organization Name"
                  name="orgName"
                  fullWidth
                  value={formData.orgName}
                  onChange={handleChange}
                  error={!!formErrors.orgName}
                  helperText={formErrors.orgName}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Number"
                  name="contact"
                  fullWidth
                  value={formData.contact}
                  onChange={handleChange}
                  error={!!formErrors.contact}
                  helperText={formErrors.contact}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Product"
                  name="product"
                  fullWidth
                  value={formData.product}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Additional Message (Optional)"
                  name="message"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={handleSubmit}
              startIcon={
                loading ? <CircularProgress size={20} /> : <SendRounded />
              }
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                "&.Mui-disabled": {
                  bgcolor: "grey.300",
                  color: "grey.500",
                },
              }}
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </Button>
          </Paper>
        </Fade>
      </Modal>
    </Container>
  );
};

export default OurProducts;

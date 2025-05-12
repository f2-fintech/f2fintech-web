import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import useProductLead from "../../apis/ProductLeadsAPI";

const products = [
  {
    name: "EMS",
    description:
      "EMS (Employee Management System) helps businesses streamline employee records, manage payroll, track attendance, process leaves, and automate HR tasks for greater efficiency and compliance.",
    color: "#E91E63",
  },
  {
    name: "Karya.io",
    description:
      "Karya.io is an all-in-one office management platform designed to simplify task management, assign responsibilities, track team productivity, and foster collaboration, enhancing workplace efficiency and communication.",
    color: "#3F51B5",
  },
  {
    name: "Aarogya",
    description:
      "Aarogya is a comprehensive healthcare management system for doctors and medical practitioners. It enables easy appointment scheduling, teleconsultation, patient records management, and prescription handling, making healthcare services more accessible.",
    color: "#4CAF50",
  },
  {
    name: "ATS",
    description:
      "ATS (Applicant Tracking System) helps recruiters and HR teams streamline the hiring process. It allows tracking of applicants, interview scheduling, candidate pipeline management, and data-driven hiring decision-making.",
    color: "#FF9800",
  },
  {
    name: "Quora AI",
    description:
      "Quora AI provides advanced AI agents designed to assist with your day-to-day tasks. These intelligent agents understand your work context and provide personalized responses, helping automate repetitive processes and improve efficiency. Suggesting solutions & handling routine tasks.",
    color: "#9C27B0",
  },
  {
    name: "Payroll",
    description:
      "The Payroll system offers a comprehensive solution for managing employee compensation, tax calculations, salary disbursements, and statutory compliance, ensuring smooth payroll processing for businesses of any size.",
    color: "#FF5722",
  },
];

const OurProducts = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const { createProductLead } = useProductLead();
  //   const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    orgName: "",
    contact: "",
    email: "",
    product: "",
  });

  const isValidForm = () => {
    const { name, orgName, contact, email } = formData;

    if (!name || !orgName || !contact || !email) {
      toast.error(
        "Please fill in all required fields including Organization Name."
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(contact)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }

    return true;
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!isValidForm()) return;
    setLoading(true);
    const payload = {
      name: formData.name,
      organization_name: formData.orgName, // 👈 fix this key
      contact: formData.contact,
      email: formData.email,
      product: formData.product,
    };

    const response = await createProductLead(payload);
    if (response.success) {
      toast.success("Successfully submitted your application!");
      handleClose();
    } else {
      toast.error("Failed to submit: " + response.error);
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
      organization_name: "",
      contact: "",
      email: "",
      product: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container sx={{ pb: 8 }}>
      <Typography
        variant="h1"
        align="center"
        fontWeight="bold"
        // fontFamily={"cursive"}
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
            <Box
              sx={{
                backgroundColor: product.color,
                color: "#fff",
                padding: "20px",
                borderRadius: "16px",
                minHeight: "200px",
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
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body5"
                sx={{
                  height: "8rem",
                  display: "flex",
                  justifyContent: "center",
                  //   mb: 3,
                  textAlign: "center",
                  wordWrap: "break-word",
                }}
              >
                {product.description}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  onClick={() => handleOpen(product.name)}
                  sx={{
                    bgcolor: "pink",
                    color: "black",
                    width: "6rem",
                    borderRadius: "40px",
                    "&:hover": {
                      bgcolor: "#f06292",
                      color: "white",
                    },
                  }}
                >
                  Get Quote
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Form */}
      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(4px)",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            p: 4,
            borderRadius: 3,
            boxShadow: 24,
            mx: "auto",
            mt: "10%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ fontFamily: "monospace", color: "purple" }}
          >
            {selectedProduct}
          </Typography>

          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Organization Name"
            name="orgName"
            fullWidth
            value={formData.orgName}
            onChange={handleChange}
          />
          <TextField
            label="Contact Number"
            name="contact"
            fullWidth
            value={formData.contact}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Product"
            name="product"
            fullWidth
            value={formData.product}
            disabled
          />
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
            onKeyDown={handleKeyPress}
            sx={{
              bgcolor: "#3f51b5",
              "&:hover": { bgcolor: "#303f9f", color: "white" },
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default OurProducts;

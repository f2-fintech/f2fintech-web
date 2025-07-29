// src/pages/ChannelPartners.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { postChannelPartner } from "../../apis/ChannelPartnerAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function ChannelPartners() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    organization: "",
    name: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    description: "",
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await postChannelPartner(formData);
      toast.success("✅ Application Submitted Successfully!");
      setOpen(false);
      setFormData({
        organization: "",
        name: "",
        contact: "",
        email: "",
        state: "",
        city: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        paddingTop: 4,
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #3244e6 0%, #764ba2 100%)",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="md">
          <Typography
            fontWeight="bold"
            sx={{
              color: "#fff",
              mb: 4,
              fontFamily: "Urbanist",
              fontSize: {
                xs: "2rem",
                sm: "2.3rem",
                md: "2.5rem",
                xl: "3rem",
              },
              lineHeight: 1.2,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Become Our Channel Partner
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: { xs: "16px", sm: "20px" },
              lineHeight: 1.6,
              maxWidth: "600px",
              mx: "auto",
              fontFamily: "verdana",
            }}
          >
            Join hands with{" "}
            <strong style={{ fontFamily: "Poppins" }}>F2 Fintech</strong> and
            grow your financial network.
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#3244e6",
              fontWeight: 600,
              fontSize: { xs: "1rem", md: "1.1rem" },
              px: { xs: 5, md: 3.5 },
              py: { xs: 1.5, md: 1.5 },
              textTransform: "none",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              fontFamily: "Poppins, sans-serif",
              "&:hover": {
                backgroundColor: "#fff",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Apply Now
          </Button>
        </Container>

        {/* Modal */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={modalStyle}>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 700,
                color: "#3244e6",
                textAlign: "center",
                fontSize: { xs: "1.3rem", md: "1.5rem" },
              }}
            >
              Channel Partner Application
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Organization Name (Optional)"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description (Optional)"
                  name="description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ pt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: "12px",
                    backgroundColor: "#3244e6",
                    color: "white",
                    fontWeight: 600,
                    py: 2,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    boxShadow: "0 4px 15px rgba(50, 68, 230, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#1d2dc1",
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 20px rgba(50, 68, 230, 0.4)",
                    },
                  }}
                >
                  Submit Application
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

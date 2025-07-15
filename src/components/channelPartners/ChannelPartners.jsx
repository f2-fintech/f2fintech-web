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
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3244e6",
        textAlign: "center",
        p: 3,
      }}
    >
      <Container>
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            backgroundColor: "#fff",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "#3244e6", mb: 2, fontWeight: "bold" }}
          >
            🤝 Become Our Channel Partner
          </Typography>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Join hands with <strong>F2Fintech</strong> and grow your financial
            network.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3244e6",
              "&:hover": { backgroundColor: "#1d2dc1" },
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
            }}
            onClick={() => setOpen(true)}
          >
            Apply Now
          </Button>
        </Paper>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={modalStyle}>
            <Typography
              variant="h6"
              sx={{ mb: 3, fontWeight: "bold", color: "#3244e6" }}
            >
              Channel Partner Application
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Organization Name (Optional)"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
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
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#3244e6",
                    "&:hover": { backgroundColor: "#1d2dc1" },
                    color: "white",
                    fontWeight: "bold",
                    py: 1.5,
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}

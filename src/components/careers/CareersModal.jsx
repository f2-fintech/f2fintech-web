import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Fade,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import { postCareer } from "../../apis/CareersAPI";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "20px",
  outline: "none",
};

const CareersModal = ({ open, onClose }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    organization: "",
    position: "",
    name: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      organization: "",
      position: "",
      name: "",
      contact: "",
      email: "",
      state: "",
      city: "",
      description: "",
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.contact ||
      !formData.email ||
      !formData.state ||
      !formData.city
    ) {
      toast.error("❌ Please fill in all required fields.");
      return;
    }

    try {
      await postCareer(formData);
      toast.success("✅ Application Submitted Successfully!");
      resetForm();
      onClose();
    } catch (error) {
      toast.error("❌ Failed to submit application. Please try again.");
      console.error("[CareersModal] submission error:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            ...modalStyle,
            width: { xs: "90%", sm: "80%", md: "65%", lg: "55%" },
            maxHeight: "90vh",
            overflowY: "auto",
            p: { xs: 3, sm: 4, md: 5 },
            background:
              "linear-gradient(145deg, #ffffff 0%, #fafbff 50%, #f5f7ff 100%)",
          }}
        >
          {/* Modal Header */}
          <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background:
                  "linear-gradient(45deg, #3244e6 30%, #2a38c4 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
              }}
            >
              Explore Careers at F2 Fintech
            </Typography>
            <Typography
              sx={{
                color: "#666",
                mt: 1,
                fontFamily: "Inter, sans-serif",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Join our network and grow with us
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {[
              {
                label: "Current Organization Name (Optional)",
                name: "organization",
                required: false,
              },
              {
                label: "Name of Position Applying For",
                name: "position", // Fixed name to be unique if needed, though previously it used 'organization' again
                required: false,
              },
              { label: "Name", name: "name", required: true },
              { label: "Contact", name: "contact", required: true },
              { label: "Email", name: "email", required: true },
              { label: "State", name: "state", required: true, half: true },
              { label: "City", name: "city", required: true, half: true },
              {
                label: "Description (Optional)",
                name: "description",
                required: false,
                multiline: true,
              },
            ].map((field, index) => (
              <Grid item xs={12} sm={field.half ? 6 : 12} key={field.name + index}>
                <Fade in={open} timeout={800 + index * 100}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    multiline={field.multiline}
                    rows={field.multiline ? 3 : 1}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3244e6",
                            borderWidth: "2px",
                          },
                        },
                        "&.Mui-focused": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3244e6",
                            borderWidth: "2px",
                          },
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontFamily: "Inter, sans-serif",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#3244e6",
                      },
                    }}
                  />
                </Fade>
              </Grid>
            ))}

            <Grid item xs={12} sx={{ pt: 3 }}>
              <Fade in={open} timeout={1600}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
                    color: "white",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    minHeight: { xs: "56px", sm: "60px" },
                    maxWidth: { xs: "100%", sm: "90%" },
                    mx: "auto",
                    display: "block",
                    fontSize: { xs: "1.1rem", sm: "1.2rem" },
                    textTransform: "none",
                    boxShadow: "0 8px 25px rgba(50, 68, 230, 0.4)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "left 0.6s",
                    },
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #2a38c4 0%, #3244e6 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 35px rgba(50, 68, 230, 0.6)",
                      "&::before": {
                        left: "100%",
                      },
                    },
                  }}
                >
                  Submit Application
                </Button>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CareersModal;

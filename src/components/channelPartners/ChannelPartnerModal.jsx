import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Grid,
  Fade,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import { postChannelPartner } from "../../apis/ChannelPartnerAPI";
import { toast } from "react-toastify";
import { Info } from "@mui/icons-material";
import { Link } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  p: 3,
  background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
  outline: "none",
};

const categoryOptions = [
  "Student",
  "Salaried Person",
  "Working Individual",
  "Broker",
  "DSA",
  "Retired Banker",
  "Self Employed",
  "Real Estate Agent",
];

export default function ChannelPartnerModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    organization: "",
    category: "",
    name: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    description: "",
  });

  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await postChannelPartner(formData);
      toast.success("✅ Message Sent Successfully!");
      onClose();
      setFormData({
        organization: "",
        category: "",
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
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            ...modalStyle,
            width: {
              xs: "95%",
              sm: "85%",
              md: isIpadPro ? "80%" : "75%",
              lg: "60%",
              xl: "50%",
            },
            maxWidth: 600,
            maxHeight: "90vh",
            overflowY: "auto",
            p: {
              xs: 2,
              sm: 3,
              md: isIpadPro ? 3 : 4,
            },
            background:
              "linear-gradient(145deg, #ffffff 0%, #fafbff 50%, #f5f7ff 100%)",
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 2, sm: 3, md: isIpadPro ? 2.5 : 3 },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "50px",
                  sm: "55px",
                  md: isIpadPro ? "58px" : "60px",
                },
                height: {
                  xs: "50px",
                  sm: "55px",
                  md: isIpadPro ? "58px" : "60px",
                },
                background:
                  "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: {
                  xs: 1.5,
                  sm: 2,
                  md: isIpadPro ? 1.8 : 2,
                },
                boxShadow: "0 6px 15px rgba(50, 68, 230, 0.3)",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.3rem",
                    md: isIpadPro ? "1.4rem" : "1.5rem",
                  },
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                CU
              </Typography>
            </Box>
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
                fontSize: {
                  xs: "1.3rem",
                  sm: "1.6rem",
                  md: isIpadPro ? "1.7rem" : "1.8rem",
                },
                mb: 0.5,
              }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{
                color: "#666",
                fontFamily: "Inter, sans-serif",
                fontSize: {
                  xs: "0.85rem",
                  sm: "0.9rem",
                  md: isIpadPro ? "0.95rem" : "1rem",
                },
              }}
            >
              Get in touch with our team
            </Typography>
          </Box>

          <Grid
            container
            spacing={{ xs: 1.5, sm: 2, md: isIpadPro ? 2 : 2.5 }}
          >
            {/* Organization Name */}
            <Grid item xs={12}>
              <Fade in={open} timeout={800}>
                <TextField
                  fullWidth
                  label="Organization Name (Optional)"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#3244e6",
                        },
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#3244e6",
                        },
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontFamily: "Inter, sans-serif",
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: isIpadPro ? "0.95rem" : "1rem",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#3244e6",
                    },
                  }}
                />
              </Fade>
            </Grid>

            {/* Category Dropdown */}
            <Grid item xs={12}>
              <Fade in={open} timeout={900}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: isIpadPro ? "0.95rem" : "1rem",
                      },
                      "&.Mui-focused": {
                        color: "#3244e6",
                      },
                    }}
                  >
                    Select Category *
                  </InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    label="Select Category *"
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#3244e6",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#3244e6",
                      },
                      "& .MuiSelect-select": {
                        fontFamily: "Inter, sans-serif",
                        fontSize: {
                          xs: "0.9rem",
                          sm: "1rem",
                          md: isIpadPro ? "0.95rem" : "1rem",
                        },
                      },
                    }}
                  >
                    {categoryOptions.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: {
                            xs: "0.9rem",
                            sm: "1rem",
                            md: isIpadPro ? "0.95rem" : "1rem",
                          },
                        }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Fade>
            </Grid>

            {/* Other fields */}
            {[
              { label: "Name *", name: "name", required: true },
              { label: "Contact *", name: "contact", required: true },
              { label: "Email *", name: "email", required: true },
              { label: "State *", name: "state", required: true, half: true },
              { label: "City *", name: "city", required: true, half: true },
              {
                label: "Description (Optional)",
                name: "description",
                required: false,
                multiline: true,
              },
            ].map((field, index) => (
              <Grid item xs={12} sm={field.half ? 6 : 12} key={field.name}>
                <Fade in={open} timeout={1000 + index * 100}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    multiline={field.multiline}
                    rows={field.multiline ? 3 : 1}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3244e6",
                          },
                        },
                        "&.Mui-focused": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3244e6",
                          },
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontFamily: "Inter, sans-serif",
                        fontSize: {
                          xs: "0.9rem",
                          sm: "1rem",
                          md: isIpadPro ? "0.95rem" : "1rem",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#3244e6",
                      },
                    }}
                  />
                </Fade>
              </Grid>
            ))}

            <Grid item xs={12} sx={{ pt: 1 }}>
              <Fade in={open} timeout={1500}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 2,
                    backgroundColor: "rgba(50, 68, 230, 0.05)",
                    borderRadius: "12px",
                    border: "1px solid rgba(50, 68, 230, 0.2)",
                    textAlign: "left",
                    maxWidth: "100%",
                    mx: "auto",
                  }}
                >
                  <Info sx={{ color: "#3244e6", fontSize: "1.5rem", flexShrink: 0 }} />
                  <Typography
                    sx={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "0.82rem",
                      fontFamily: "Poppins, sans-serif",
                      lineHeight: 1.4,
                    }}
                  >
                    By clicking submit, I agree to the{" "}
                    <Link
                      to="/terms-and-condition"
                      target="_blank"
                      style={{ color: "#3244e6", textDecoration: "underline", fontWeight: 500 }}
                    >
                      terms & conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy-policy"
                      target="_blank"
                      style={{ color: "#3244e6", textDecoration: "underline", fontWeight: 500 }}
                    >
                      privacy policy
                    </Link>{" "}
                    and I am giving my consent to receive updates through SMS/email/RCS/WhatsApp
                  </Typography>
                </Box>
              </Fade>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ pt: { xs: 1, sm: 2, md: isIpadPro ? 1.5 : 2 } }}
            >
              <Fade in={open} timeout={1600}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
                    color: "white",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    minHeight: {
                      xs: "48px",
                      sm: "52px",
                      md: isIpadPro ? "54px" : "56px",
                    },
                    fontSize: {
                      xs: "1rem",
                      sm: "1.1rem",
                      md: isIpadPro ? "1.05rem" : "1.1rem",
                    },
                    textTransform: "none",
                    boxShadow: "0 6px 20px rgba(50, 68, 230, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #2a38c4 0%, #3244e6 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(50, 68, 230, 0.6)",
                    },
                  }}
                >
                  Submit
                </Button>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}

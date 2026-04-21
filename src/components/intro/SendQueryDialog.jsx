import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Menu,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SendQueryAPI } from '../../apis/SendQueryAPI';

const QUERY_OPTIONS = [
  "Send Query for loan",
  "Send query for channel partner",
  "Send query for job",
  "Send query for any other association",
  "Others"
];

const SendQueryDialog = ({ anchorEl, open, handleClose }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedQueryType, setSelectedQueryType] = useState("");
  const [formData, setFormData] = useState({ name: "", number: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({ name: "", number: "", email: "" });

  const handleMenuItemClick = (type) => {
    setSelectedQueryType(type);
    handleClose();
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({ name: "", number: "", email: "" });
    setSuccessMessage("");
    setErrorMsg("");
    setErrors({ name: "", number: "", email: "" });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name": {
        if (!value.trim()) return "Name is required.";
        if (!/^[a-zA-Z\s]{2,}$/.test(value.trim()))
          return "Name must be at least 2 characters and contain only letters.";
        return "";
      }
      case "number": {
        if (!value.trim()) return "Phone number is required.";
        if (!/^[6-9]\d{9}$/.test(value.trim()))
          return "Enter a valid 10-digit Indian mobile number.";
        return "";
      }
      case "email": {
        if (!value.trim()) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Enter a valid email address.";
        return "";
      }
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: validateField("name", formData.name),
      number: validateField("number", formData.number),
      email: validateField("email", formData.email),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    setLoading(true);
    setErrorMsg("");
    try {
      const response = await SendQueryAPI.create({
        ...formData,
        query_type: selectedQueryType
      });
      if (response.status === 201) {
        setSuccessMessage("We will get back to you shortly.");
        setFormData({ name: "", number: "", email: "" });
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      setErrorMsg("Failed to submit query. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Menu
        id="send-query-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'send-query-button',
        }}
      >
        {QUERY_OPTIONS.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(option)}
            sx={{ fontFamily: 'Poppins', fontSize: '0.95rem' }}
          >
            {index + 1}. {option}
          </MenuItem>
        ))}
      </Menu>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: "#ffffff", color: "#1f2937", borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Poppins', fontWeight: 600, color: '#1f2937' }}>
          Submit Query
          <IconButton onClick={handleDialogClose} sx={{ color: '#1f2937' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: 'rgba(0, 0, 0, 0.12)' }}>
          {successMessage ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="success.main" sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                {successMessage}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, mt: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#4b5563', mb: 1 }}>
                Query Type:  <strong style={{ color: '#1f2937' }}>{selectedQueryType}</strong>
              </Typography>

              <Box sx={{ mb: 1 }}>
                <TextField
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  variant="outlined"
                  error={!!errors.name}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                      '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.87)' },
                      '&.Mui-focused fieldset': { borderColor: '#352acbff' },
                    },
                    '& .MuiInputBase-input': { color: '#1f2937', fontFamily: 'Poppins' },
                    '& .MuiInputLabel-root': { color: '#4b5563', fontFamily: 'Poppins' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#352acbff' },
                  }}
                />
                {errors.name && (
                  <Typography variant="caption" sx={{ color: '#d32f2f', fontFamily: 'Poppins', mt: 0.5, ml: 1.5, display: 'block' }}>
                    {errors.name}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mb: 1 }}>
                <TextField
                  name="number"
                  label="Phone Number"
                  value={formData.number}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  variant="outlined"
                  type="tel"
                  inputProps={{ maxLength: 10 }}
                  error={!!errors.number}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                      '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.87)' },
                      '&.Mui-focused fieldset': { borderColor: '#352acbff' },
                    },
                    '& .MuiInputBase-input': { color: '#1f2937', fontFamily: 'Poppins' },
                    '& .MuiInputLabel-root': { color: '#4b5563', fontFamily: 'Poppins' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#352acbff' },
                  }}
                />
                {errors.number && (
                  <Typography variant="caption" sx={{ color: '#d32f2f', fontFamily: 'Poppins', mt: 0.5, ml: 1.5, display: 'block' }}>
                    {errors.number}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mb: 1 }}>
                <TextField
                  name="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  variant="outlined"
                  type="email"
                  error={!!errors.email}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                      '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.87)' },
                      '&.Mui-focused fieldset': { borderColor: '#352acbff' },
                    },
                    '& .MuiInputBase-input': { color: '#1f2937', fontFamily: 'Poppins' },
                    '& .MuiInputLabel-root': { color: '#4b5563', fontFamily: 'Poppins' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#352acbff' },
                  }}
                />
                {errors.email && (
                  <Typography variant="caption" sx={{ color: '#d32f2f', fontFamily: 'Poppins', mt: 0.5, ml: 1.5, display: 'block' }}>
                    {errors.email}
                  </Typography>
                )}
              </Box>
              {errorMsg && (
                <Typography color="error" variant="body2" sx={{ fontFamily: 'Poppins' }}>
                  {errorMsg}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        {!successMessage && (
          <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "#352acbff",
                color: "#FFFFFF",
                fontWeight: "500",
                "&:hover": { bgcolor: "#281f99" },
                px: 4,
                py: 1,
                borderRadius: '24px',
                fontFamily: "Poppins",
                textTransform: "none",
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default SendQueryDialog;

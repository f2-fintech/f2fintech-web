import React, { useState } from "react";
import { Box, Typography, Modal, CircularProgress, Alert } from "@mui/material";

const qrImageMap = {
  "199-Plan": "/img/199plan.jpeg",
  "599-Plan": "/img/599plan.jpeg",
  "999-Plan": "/img/999plan.jpeg",
};

export default function QRModal({ open, handleClose, selectedPlan }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const qrImage = qrImageMap[selectedPlan?.price] || "/img/199plan.jpeg";
  const planPrice = selectedPlan?.price?.replace("-Plan", "") || "199";

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
    console.error(`Failed to load QR image: ${qrImage}`);
  };

  // Reset image states when modal opens/closes
  React.useEffect(() => {
    if (open) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="qr-modal-title"
      aria-describedby="qr-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
          width: "90%",
          maxWidth: 450,
          boxShadow: 24,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Typography
          id="qr-modal-title"
          variant="h6"
          sx={{ color: "#ff4d4d", fontWeight: "bold", mb: 1 }}
        >
          You Don't Have Any Active Plan
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#4caf50", fontWeight: "bold", mb: 2 }}
        >
          Scan & Pay ₹{planPrice}/-
        </Typography>

        {/* QR Code Image Section */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
            mb: 2,
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
              severity="error"
              sx={{
                width: "100%",
                "& .MuiAlert-message": {
                  fontSize: "0.875rem",
                },
              }}
            >
              QR Code image failed to load. Please use the UPI ID below or
              contact support.
            </Alert>
          ) : (
            <img
              src={qrImage}
              alt={`QR Code for ${selectedPlan?.title || "payment"}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                width: "100%",
                maxWidth: "200px",
                borderRadius: "10px",
                border: "2px solid #ddd",
                display: imageLoading ? "none" : "block",
              }}
            />
          )}
        </Box>

        <Typography
          id="qr-modal-description"
          variant="body2"
          sx={{ color: "#555", mb: 2 }}
        >
          or Pay Via UPI ID <br />
          <Box
            component="span"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#333",
              backgroundColor: "#f5f5f5",
              padding: "4px 8px",
              borderRadius: "4px",
              display: "inline-block",
              mt: 1,
              userSelect: "all", // Makes text easily selectable
            }}
          >
            harpreet3006-1@okhdfcbank
          </Box>
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          sx={{ mt: 2, color: "#4caf50", fontWeight: "bold" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Icon"
            style={{ width: 30, height: 30 }}
            onError={(e) => {
              // Fallback if WhatsApp icon fails to load
              e.target.style.display = "none";
            }}
          />
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#4caf50" }}
            >
              WhatsApp Your Payment Screenshot to
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#333",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              +91 88106 00135
            </Typography>
            <Typography variant="caption" sx={{ color: "#666" }}>
              for Faster Approval
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

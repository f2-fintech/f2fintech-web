import React from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Fade,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const JobDetailsModal = ({ open, onClose, selectedJob, onApplyClick }) => {
  if (!selectedJob) return null;

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            maxHeight: "100vh",
            overflowY: "auto",
            bgcolor: "#ffffff",
            outline: "none",
            p: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Sticky Top Bar */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              bgcolor: "white",
              zIndex: 10,
              borderBottom: "1px solid #cbd5e1",
              py: 2.5,
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <Box
              sx={{
                width: { xs: "90%", md: "80%" },
                maxWidth: "1200px",
                mx: "auto",
                px: { xs: 2, md: 0 },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", fontFamily: "Poppins, sans-serif" }}>
                Job Details
              </Typography>
              <Button onClick={onClose} sx={{ minWidth: 0, p: 1, borderRadius: "50%", color: "#64748b" }}>
                <CloseIcon sx={{ fontSize: "1.8rem" }} />
              </Button>
            </Box>
          </Box>

          {/* Main Scrollable Content */}
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <Box
              sx={{
                width: { xs: "90%", md: "80%" },
                maxWidth: "1200px",
                mx: "auto",
                px: { xs: 2, md: 0 },
                py: 6,
              }}
            >
              {/* Title Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "#0f172a",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "2rem", sm: "2.5rem" },
                    mb: 1.5,
                    textTransform: "capitalize",
                  }}
                >
                  {selectedJob.title}
                </Typography>
                <Typography sx={{ color: "#2335c9", fontWeight: 600, fontSize: "1.1rem" }}>
                  {selectedJob.type} | {selectedJob.scheduleType || "Flexible"}
                </Typography>
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Quick Info Grid */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, mb: 0.5 }}>
                    Location
                  </Typography>
                  <Typography sx={{ fontWeight: 600, color: "#1e293b", fontSize: "1.05rem" }}>
                    {selectedJob.city ? `${selectedJob.city}, ${selectedJob.state || ""}, ${selectedJob.country || "IN"}` : "Noida, UP, IN"} ({selectedJob.locationType || "On-site"})
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, mb: 0.5 }}>
                    Compensation
                  </Typography>
                  <Typography sx={{ fontWeight: 600, color: "#1e293b", fontSize: "1.05rem" }}>
                    {selectedJob.compensation ? (selectedJob.compensation.includes("₹") ? selectedJob.compensation : `₹${selectedJob.compensation}/Month`) : "Not Disclosed"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, mb: 0.5 }}>
                    Experience Required
                  </Typography>
                  <Typography sx={{ fontWeight: 600, color: "#1e293b", fontSize: "1.05rem" }}>
                    {selectedJob.experienceRequired || "0-2"} Years
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ mb: 4 }} />

              {/* Detailed Description */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2.5, fontFamily: "Poppins, sans-serif", color: "#0f172a" }}>
                  Job Description
                </Typography>
                <Box
                  sx={{
                    color: "#334155",
                    lineHeight: 1.8,
                    fontSize: "1.05rem",
                    "& p": { mb: 2.5 },
                    "& ul": { pl: 4, mb: 2.5 },
                    "& li": { mb: 1.5 },
                  }}
                  dangerouslySetInnerHTML={{ __html: selectedJob.description }}
                />
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2.5, justifyContent: "flex-end", pb: 8 }}>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    borderRadius: "14px",
                    borderColor: "#cbd5e1",
                    color: "#64748b",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      borderColor: "#94a3b8",
                      backgroundColor: "#f8fafc",
                    }
                  }}
                >
                  Back to Openings
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    onClose();
                    onApplyClick(selectedJob);
                  }}
                  sx={{
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #2335c9 0%, #1a28b0 100%)",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 5,
                    py: 1.5,
                    boxShadow: "0 6px 20px rgba(35, 53, 201, 0.35)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1a28b0 0%, #2335c9 100%)",
                      boxShadow: "0 8px 24px rgba(35, 53, 201, 0.45)",
                    }
                  }}
                >
                  Apply for this Position
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default JobDetailsModal;

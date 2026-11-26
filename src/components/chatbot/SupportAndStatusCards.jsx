import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Lock, SupportAgent, TrackChanges } from "@mui/icons-material";
import { ChatbotAPI } from "../../apis/ChatbotAPI";

export function OtpVerificationCard({ sessionId, language = "en", onVerified }) {
  const [identifier, setIdentifier] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSendOtp = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await ChatbotAPI.sendOtp({ identifier, sessionId });
      setOtpSent(true);
      setMessage(res.message || "Verification OTP sent.");
    } catch (err) {
      setError(err.message || "Could not send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await ChatbotAPI.verifyOtp({ identifier, otp, sessionId });
      onVerified?.(res);
    } catch (err) {
      setError(err.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 2, mt: 1, borderRadius: 3, border: "1px solid #fde68a", bgcolor: "#fffbeb" }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Lock sx={{ color: "#d97706" }} fontSize="small" />
        <Typography variant="subtitle2" fontWeight={700} color="#78350f">
          {language === "hi" ? "ग्राहक पहचान सत्यापन (OTP)" : "Verify Identity to View Your Applications"}
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <TextField
          size="small"
          fullWidth
          label={language === "hi" ? "पंजीकृत ईमेल या मोबाइल नंबर" : "Registered Email or Mobile"}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          disabled={loading}
          sx={{ bgcolor: "#ffffff" }}
        />

        {!otpSent ? (
          <Button
            size="small"
            variant="contained"
            onClick={handleSendOtp}
            disabled={!identifier.trim() || loading}
            sx={{ bgcolor: "#3244e6", textTransform: "none", fontWeight: 600 }}
          >
            {loading ? "Sending..." : "Send Verification OTP"}
          </Button>
        ) : (
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              label="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
              sx={{ bgcolor: "#ffffff", flex: 1 }}
            />
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={handleVerifyOtp}
              disabled={!otp.trim() || loading}
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Verify
            </Button>
          </Stack>
        )}

        {message && <Alert severity="success" sx={{ py: 0, fontSize: "0.74rem" }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ py: 0, fontSize: "0.74rem" }}>{error}</Alert>}
      </Stack>
    </Paper>
  );
}

export function ApplicationStatusCard({ applications = [], language = "en", onAskToFix }) {
  if (!Array.isArray(applications) || applications.length === 0) return null;

  return (
    <Stack spacing={1.2} sx={{ mt: 1 }}>
      {applications.map((app) => (
        <Paper
          key={app.applicationId || app.applicationNo}
          elevation={0}
          sx={{ p: 1.6, borderRadius: 2.5, border: "1px solid #dbeafe", bgcolor: "#ffffff" }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
            <Stack direction="row" spacing={0.8} alignItems="center">
              <TrackChanges sx={{ color: "#3244e6" }} fontSize="small" />
              <Typography variant="body2" fontWeight={700} color="#0f172a">
                App #{app.applicationNo} • {app.provider}
              </Typography>
            </Stack>
            <Chip
              size="small"
              label={String(app.trackingStatus || "submitted").toUpperCase()}
              color={app.trackingStatus === "approved" ? "success" : app.trackingStatus === "rejected" ? "error" : "primary"}
              sx={{ fontWeight: 700, fontSize: "0.68rem" }}
            />
          </Stack>

          <Typography variant="caption" color="#64748b" display="block" sx={{ mt: 0.4 }}>
            {app.loanType} • ₹{Number(app.amount || 0).toLocaleString("en-IN")} • {app.tenure} yrs
          </Typography>
          <Typography variant="body2" color="#334155" sx={{ mt: 0.8, fontSize: "0.8rem" }}>
            {app.explanation}
          </Typography>

          {app.missingDocuments?.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" fontWeight={700} color="#b45309" display="block">
                {language === "hi" ? "बाकी आवश्यक दस्तावेज़:" : "Missing Mandatory Documents:"}
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 0.4 }}>
                {app.missingDocuments.map((doc) => (
                  <Chip key={doc.type} size="small" label={doc.label} color="warning" variant="outlined" sx={{ fontSize: "0.68rem" }} />
                ))}
              </Stack>
            </Box>
          )}

          {onAskToFix && (
            <Button
              size="small"
              onClick={() => onAskToFix(app)}
              sx={{ mt: 1, textTransform: "none", fontWeight: 600, p: 0 }}
            >
              Update Details / Upload Missing Docs
            </Button>
          )}
        </Paper>
      ))}
    </Stack>
  );
}

export function SupportEscalationCard({ data }) {
  if (!data) return null;
  const channels = data.supportChannels || {};

  return (
    <Paper elevation={0} sx={{ p: 1.8, mt: 1, borderRadius: 2.5, border: "1px solid #fecaca", bgcolor: "#fef2f2" }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.8 }}>
        <SupportAgent sx={{ color: "#dc2626" }} fontSize="small" />
        <Typography variant="subtitle2" fontWeight={700} color="#7f1d1d">
          Support Ticket Created #{data.ticketId} ({data.title})
        </Typography>
      </Stack>
      <Typography variant="caption" color="#7f1d1d" display="block" sx={{ lineHeight: 1.45 }}>
        Our F2Fintech support executive will follow up shortly. Official channels:
        <br />
        Support: <strong>{channels.supportEmail || "support@f2fintech.com"}</strong> • Grievance:{" "}
        <strong>{channels.grievanceEmail || "wecare@f2fintech.com"}</strong>
        <br />
        Helplines: {(channels.helplines || []).join(", ")}
      </Typography>
    </Paper>
  );
}


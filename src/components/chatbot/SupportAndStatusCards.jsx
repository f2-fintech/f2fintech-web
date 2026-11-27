 import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  CheckCircle,
  CloudUpload,
  EditOutlined,
  ErrorOutline,
  Lock,
  Refresh,
  SupportAgent,
  TrackChanges,
  VerifiedUser,
} from "@mui/icons-material";
import { ChatbotAPI } from "../../apis/ChatbotAPI";

function normalizeIdentifier(raw) {
  const trimmed = String(raw || "").trim();
  if (!trimmed || trimmed.includes("@")) return trimmed;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }
  return digits || trimmed;
}

function isValidIdentifier(value) {
  if (!value) return false;
  if (value.includes("@")) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  return /^[6-9]\d{9}$/.test(value) || /^\d{10}$/.test(value);
}

function formatTenureLabel(tenure) {
  if (tenure === null || tenure === undefined || tenure === "") return "—";
  const str = String(tenure).trim();
  if (/yr|year/i.test(str)) return str;
  return `${str} yrs`;
}

function getStatusBadgeSx(status) {
  const s = String(status || "submitted").toLowerCase().trim();
  if (s === "approved" || s === "disbursed" || s === "to be disbursed") {
    return { bgcolor: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0" };
  }
  if (s === "rejected" || s === "drop") {
    return { bgcolor: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" };
  }
  if (
    s === "carry forward" ||
    s === "pendency in file" ||
    s === "hold" ||
    s === "awaiting response" ||
    s === "relook"
  ) {
    return { bgcolor: "#fffbeb", color: "#b45309", border: "1px solid #fde68a" };
  }
  return { bgcolor: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" };
}

export function OtpVerificationCard({
  sessionId,
  language = "en",
  isCompact = false,
  onVerified,
}) {
  const isHi = language === "hi";
  const [identifier, setIdentifier] = useState("");
  const [sentIdentifier, setSentIdentifier] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifiedDone, setVerifiedDone] = useState(false);
  const [message, setMessage] = useState(null);
  const [maskedEmail, setMaskedEmail] = useState(null);
  const [devOtpPreview, setDevOtpPreview] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resendCooldown <= 0) return undefined;
    const timer = setTimeout(() => setResendCooldown((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleIdentifierChange = (val) => {
    setIdentifier(val);
    setError(null);
    if (otpSent && normalizeIdentifier(val).toLowerCase() !== sentIdentifier.toLowerCase()) {
      setOtpSent(false);
      setOtp("");
      setMessage(null);
      setMaskedEmail(null);
      setDevOtpPreview(null);
    }
  };

  const handleSendOtp = async () => {
    const cleanId = normalizeIdentifier(identifier);
    if (!sessionId) {
      setError(isHi ? "चैट सत्र तैयार नहीं है। कृपया पुनः प्रयास करें।" : "Chat session not ready. Please try again.");
      return;
    }
    if (!isValidIdentifier(cleanId)) {
      setError(
        isHi
          ? "कृपया मान्य पंजीकृत ईमेल या 10-अंकीय मोबाइल नंबर दर्ज करें।"
          : "Please enter a valid registered email address or 10-digit mobile number."
      );
      return;
    }

    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await ChatbotAPI.sendOtp({ identifier: cleanId, sessionId });
      setSentIdentifier(cleanId);
      setOtpSent(true);
      setResendCooldown(30);
      setMaskedEmail(res.maskedEmail || null);
      setDevOtpPreview(res.devOtpPreview || null);

      const usedMobile = !cleanId.includes("@");
      if (res.smsSent) {
        setMessage(
          res.message ||
          (isHi
            ? `आपके पंजीकृत मोबाइल नंबर (${cleanId}) पर 6-अंकीय OTP भेजा गया है।`
            : `A 6-digit verification OTP has been sent via SMS to ${cleanId}.`)
        );
      } else if (usedMobile && res.maskedEmail) {
        setMessage(
          isHi
            ? `इस मोबाइल से जुड़े पंजीकृत ईमेल (${res.maskedEmail}) पर 6-अंकीय OTP भेजा गया है।`
            : `OTP generated for your account! Verification code is dispatched to your registered email (${res.maskedEmail}) linked with ${cleanId}.`
        );
      } else {
        setMessage(
          res.message ||
          (isHi
            ? "आपके पंजीकृत ईमेल पर 6-अंकीय सत्यापन OTP भेजा गया है।"
            : "A 6-digit verification OTP has been sent to your registered email.")
        );
      }
    } catch (err) {
      setError(err.message || "Could not send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const cleanOtp = String(otp || "").replace(/\D/g, "").slice(0, 6);
    if (cleanOtp.length !== 6) {
      setError(isHi ? "कृपया 6-अंकीय OTP दर्ज करें।" : "Please enter the complete 6-digit OTP.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const targetId = sentIdentifier || normalizeIdentifier(identifier);
      const res = await ChatbotAPI.verifyOtp({ identifier: targetId, otp: cleanOtp, sessionId });
      setVerifiedDone(true);
      setDevOtpPreview(null);
      setMessage(
        res.message ||
        (isHi ? "पहचान सफलतापूर्वक सत्यापित हो गई!" : "Identity verified successfully!")
      );
      onVerified?.(res);
    } catch (err) {
      setError(err.message || "Invalid OTP. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
    bgcolor: "#ffffff",
    borderRadius: 1.5,
    "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.84rem" },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: isCompact ? 1.5 : 2,
        mt: 1,
        borderRadius: 3,
        border: "1px solid #fde68a",
        bgcolor: "#fffbeb",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        {verifiedDone ? (
          <VerifiedUser sx={{ color: "#10b981" }} fontSize="small" />
        ) : (
          <Lock sx={{ color: "#d97706" }} fontSize="small" />
        )}
        <Typography variant="subtitle2" fontWeight={700} color="#78350f" sx={{ fontSize: "0.86rem" }}>
          {isHi ? "ग्राहक पहचान सत्यापन (OTP)" : "Verify Identity to View Your Applications"}
        </Typography>
      </Stack>

      <Stack spacing={1.1}>
        <TextField
          size="small"
          fullWidth
          label={isHi ? "पंजीकृत ईमेल या मोबाइल नंबर" : "Registered Email or Mobile"}
          placeholder={isHi ? "उदा. 9876543210 या name@email.com" : "e.g. 9876543210 or name@email.com"}
          value={identifier}
          onChange={(e) => handleIdentifierChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !otpSent && !loading && identifier.trim()) {
              e.preventDefault();
              handleSendOtp();
            }
          }}
          disabled={loading || verifiedDone}
          sx={inputSx}
        />

        {!otpSent ? (
          <Button
            size="small"
            variant="contained"
            fullWidth
            onClick={handleSendOtp}
            disabled={!identifier.trim() || loading}
            sx={{
              bgcolor: "#3244e6",
              color: "#ffffff",
              "&:hover": { bgcolor: "#1d2ebd" },
              "&.Mui-disabled": { bgcolor: "#cbd5e1", color: "#475569" },
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              py: 0.75,
            }}
          >
            {loading
              ? isHi
                ? "OTP भेजा जा रहा है..."
                : "Sending..."
              : isHi
                ? "सत्यापन OTP भेजें"
                : "Send Verification OTP"}
          </Button>
        ) : (
          <Stack spacing={0.9}>
            <Stack
              direction={isCompact ? "column" : "row"}
              spacing={1}
              alignItems={isCompact ? "stretch" : "center"}
            >
              <TextField
                size="small"
                fullWidth
                placeholder={isHi ? "6-अंकीय OTP दर्ज करें" : "Enter 6-digit OTP"}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading && !verifiedDone && otp.trim().length === 6) {
                    e.preventDefault();
                    handleVerifyOtp();
                  }
                }}
                inputProps={{ maxLength: 6, inputMode: "numeric" }}
                disabled={loading || verifiedDone}
                sx={{ ...inputSx, flex: 1 }}
              />
              <Button
                size="small"
                variant="contained"
                onClick={handleVerifyOtp}
                disabled={otp.trim().length !== 6 || loading || verifiedDone}
                sx={{
                  bgcolor: "#059669",
                  color: "#ffffff",
                  "&:hover": { bgcolor: "#047857" },
                  "&.Mui-disabled": { bgcolor: "#cbd5e1", color: "#475569" },
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 2.2,
                  py: 0.85,
                  flexShrink: 0,
                }}
              >
                {verifiedDone
                  ? isHi
                    ? "सत्यापित ✓"
                    : "Verified ✓"
                  : loading
                    ? isHi
                      ? "जांच जारी..."
                      : "Verifying..."
                    : isHi
                      ? "सत्यापित करें"
                      : "Verify"}
              </Button>
            </Stack>

            {!verifiedDone && (
              <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={0.8}>
                <Button
                  size="small"
                  variant="text"
                  startIcon={<EditOutlined sx={{ fontSize: 14 }} />}
                  disabled={loading}
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setMessage(null);
                    setError(null);
                    setMaskedEmail(null);
                    setDevOtpPreview(null);
                  }}
                  sx={{
                    color: "#92400e",
                    textTransform: "none",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    p: 0,
                    minWidth: "auto",
                  }}
                >
                  {isHi ? "नंबर / ईमेल बदलें" : "Change Email / Mobile"}
                </Button>

                <Button
                  size="small"
                  variant="text"
                  startIcon={<Refresh sx={{ fontSize: 14 }} />}
                  disabled={loading || resendCooldown > 0}
                  onClick={handleSendOtp}
                  sx={{
                    color: "#1d2ebd",
                    "&.Mui-disabled": { color: "#64748b" },
                    textTransform: "none",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    p: 0,
                    minWidth: "auto",
                  }}
                >
                  {resendCooldown > 0
                    ? `${isHi ? "पुनः भेजें" : "Resend OTP"} (${resendCooldown}s)`
                    : isHi
                      ? "OTP पुनः भेजें"
                      : "Resend OTP"}
                </Button>
              </Stack>
            )}
          </Stack>
        )}

        {message && (
          <Alert severity="success" sx={{ py: 0.2, fontSize: "0.74rem", borderRadius: 1.5 }}>
            {message}
          </Alert>
        )}

        {devOtpPreview && !verifiedDone && (
          <Alert
            severity="info"
            action={
              <Button
                size="small"
                onClick={() => setOtp(String(devOtpPreview))}
                sx={{
                  color: "#1d2ebd",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.72rem",
                  minWidth: "auto",
                }}
              >
                {isHi ? "OTP भरें" : "Fill OTP"}
              </Button>
            }
            sx={{ py: 0.2, fontSize: "0.73rem", borderRadius: 1.5, alignItems: "center" }}
          >
            {isHi ? "लोकल टेस्ट OTP (SMTP सेट नहीं है): " : "Local Dev OTP (SMTP not configured): "}
            <strong>{devOtpPreview}</strong>
            {maskedEmail ? ` • ${maskedEmail}` : ""}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ py: 0.2, fontSize: "0.74rem", borderRadius: 1.5 }}>
            {error}
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}

OtpVerificationCard.propTypes = {
  sessionId: PropTypes.string,
  language: PropTypes.string,
  isCompact: PropTypes.bool,
  onVerified: PropTypes.func,
};

export function ApplicationStatusCard({
  applications = [],
  sessionId,
  language = "en",
  isCompact = false,
  onApplicationsUpdated,
}) {
  const [appsState, setAppsState] = useState(applications);
  const [uploadingKey, setUploadingKey] = useState(null);
  const [uploadErrors, setUploadErrors] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState({});
  const fileInputRef = useRef(null);
  const activeTargetRef = useRef(null);

  useEffect(() => {
    setAppsState(Array.isArray(applications) ? applications : []);
  }, [applications]);

  if (!Array.isArray(appsState) || appsState.length === 0) return null;
  const isHi = language === "hi";

  const triggerMissingDocUpload = (app, docType) => {
    activeTargetRef.current = {
      applicationId: app.applicationId,
      applicationNo: app.applicationNo,
      docType,
    };
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleMissingFileChange = async (e) => {
    const file = e.target.files?.[0];
    const target = activeTargetRef.current;
    if (!file || !target?.docType) return;

    const key = `${target.applicationId}:${target.docType}`;
    setUploadErrors((prev) => ({ ...prev, [target.applicationId]: null }));
    setUploadSuccess((prev) => ({ ...prev, [target.applicationId]: null }));
    setUploadingKey(key);
    try {
      const res = await ChatbotAPI.uploadMissingApplicationDocument({
        sessionId,
        applicationId: target.applicationId,
        docType: target.docType,
        file,
        language,
      });
      if (Array.isArray(res?.status?.applications)) {
        setAppsState(res.status.applications);
        onApplicationsUpdated?.(res.status.applications);
      }
      const appLabel = res?.document?.applicationNo || target.applicationNo;
      setUploadSuccess((prev) => ({
        ...prev,
        [target.applicationId]: isHi
          ? `आवेदन #${appLabel} के लिए दस्तावेज़ (${res?.document?.fileName || target.docType}) सफलतापूर्वक अपलोड हो गया!`
          : `Uploaded ${res?.document?.fileName || target.docType} for App #${appLabel} successfully!`,
      }));
    } catch (err) {
      setUploadErrors((prev) => ({
        ...prev,
        [target.applicationId]:
          err.message ||
          "Document upload failed. Please upload a valid PDF/JPG/PNG/DOC under 10MB.",
      }));
    } finally {
      setUploadingKey(null);
    }
  };

  return (
    <Stack spacing={1.2} sx={{ mt: 1 }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
        style={{ display: "none" }}
        onChange={handleMissingFileChange}
      />

      {appsState.map((app) => {
        const appError = uploadErrors[app.applicationId];
        const appSuccess = uploadSuccess[app.applicationId];

        return (
          <Paper
            key={app.applicationId || app.applicationNo}
            elevation={0}
            sx={{
              p: isCompact ? 1.3 : 1.6,
              borderRadius: 2.5,
              border: "1px solid #dbeafe",
              bgcolor: "#ffffff",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
              <Stack direction="row" spacing={0.8} alignItems="center" sx={{ minWidth: 0 }}>
                <TrackChanges sx={{ color: "#3244e6", flexShrink: 0 }} fontSize="small" />
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="#0f172a"
                  sx={{ fontSize: "0.84rem", wordBreak: "break-word" }}
                >
                  App #{app.applicationNo} • {app.provider}
                </Typography>
              </Stack>
              <Chip
                size="small"
                label={`${isHi ? "आवेदन: " : "App: "}${String(app.trackingStatus || "submitted").toUpperCase()}`}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.66rem",
                  ...getStatusBadgeSx(app.trackingStatus),
                }}
              />
            </Stack>

            {(app.isPicked || app.ticket) && (
              <Stack direction="row" spacing={0.7} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mt: 0.7 }}>
                <Chip
                  size="small"
                  label={isHi ? "क्रेडिट टीम द्वारा पिक किया गया" : "Picked by Credit Team"}
                  sx={{
                    height: 22,
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    bgcolor: "#f5f3ff",
                    color: "#6d28d9",
                    border: "1px solid #ddd6fe",
                  }}
                />
                {app.ticket && (
                  <Chip
                    size="small"
                    label={`${isHi ? "टिकट" : "Ticket"} #${app.ticket.id}: ${String(app.ticket.status || "in progress").toUpperCase()}`}
                    sx={{
                      height: 22,
                      fontSize: "0.66rem",
                      fontWeight: 700,
                      ...getStatusBadgeSx(app.ticket.status),
                    }}
                  />
                )}
              </Stack>
            )}

            <Typography variant="caption" color="#64748b" display="block" sx={{ mt: 0.4 }}>
              {app.loanType} • ₹{Number(app.amount || 0).toLocaleString("en-IN")} •{" "}
              {formatTenureLabel(app.tenure)}
            </Typography>
            <Typography variant="body2" color="#334155" sx={{ mt: 0.8, fontSize: "0.8rem", lineHeight: 1.45 }}>
              {app.explanation}
            </Typography>

            {app.uploadedDocumentTypes?.length > 0 && (
              <Box sx={{ mt: 0.9 }}>
                <Typography variant="caption" fontWeight={700} color="#15803d" display="block">
                  {isHi ? "अपलोड किए गए दस्तावेज़:" : "Uploaded Documents:"}
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 0.4 }}>
                  {app.uploadedDocumentTypes.map((docType) => (
                    <Chip
                      key={docType}
                      size="small"
                      icon={<CheckCircle sx={{ fontSize: "13px !important", color: "#16a34a !important" }} />}
                      label={docType}
                      variant="outlined"
                      sx={{ fontSize: "0.66rem", borderColor: "#bbf7d0", color: "#166534", bgcolor: "#f0fdf4" }}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {app.missingDocuments?.length > 0 ? (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" fontWeight={700} color="#b45309" display="block" sx={{ mb: 0.5 }}>
                  {isHi
                    ? "बाकी आवश्यक दस्तावेज़ (यहीं से अपलोड करें):"
                    : "Missing Mandatory Documents (Upload directly below):"}
                </Typography>
                <Stack spacing={0.7}>
                  {app.missingDocuments.map((doc) => {
                    const rowKey = `${app.applicationId}:${doc.type}`;
                    const isUploading = uploadingKey === rowKey;
                    return (
                      <Box
                        key={doc.type}
                        sx={{
                          p: isCompact ? 0.9 : 1.05,
                          borderRadius: 2,
                          border: "1px solid #fed7aa",
                          bgcolor: "#fffbeb",
                        }}
                      >
                        <Stack
                          direction={isCompact ? "column" : "row"}
                          justifyContent="space-between"
                          alignItems={isCompact ? "stretch" : "center"}
                          gap={0.8}
                        >
                          <Stack direction="row" spacing={0.6} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                            <ErrorOutline sx={{ color: "#d97706", fontSize: 16, flexShrink: 0 }} />
                            <Typography
                              variant="caption"
                              fontWeight={600}
                              color="#78350f"
                              sx={{ fontSize: "0.76rem", lineHeight: 1.3 }}
                            >
                              {doc.label}
                            </Typography>
                          </Stack>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<CloudUpload sx={{ fontSize: 15 }} />}
                            disabled={Boolean(uploadingKey)}
                            onClick={() => triggerMissingDocUpload(app, doc.type)}
                            sx={{
                              bgcolor: "#3244e6",
                              color: "#ffffff",
                              "&:hover": { bgcolor: "#1d2ebd" },
                              "&.Mui-disabled": { bgcolor: "#cbd5e1", color: "#475569" },
                              textTransform: "none",
                              fontWeight: 700,
                              fontSize: "0.72rem",
                              borderRadius: 1.8,
                              px: 1.4,
                              py: 0.4,
                              flexShrink: 0,
                            }}
                          >
                            {isUploading
                              ? isHi
                                ? "अपलोड..."
                                : "Uploading..."
                              : isHi
                                ? "अपलोड करें"
                                : "Upload"}
                          </Button>
                        </Stack>
                        {isUploading && (
                          <LinearProgress
                            sx={{
                              mt: 0.8,
                              borderRadius: 2,
                              bgcolor: "#e0e7ff",
                              "& .MuiLinearProgress-bar": { bgcolor: "#3244e6" },
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            ) : (
              <Chip
                size="small"
                icon={<CheckCircle sx={{ fontSize: "14px !important", color: "#16a34a !important" }} />}
                label={isHi ? "सभी आवश्यक दस्तावेज़ अपलोड हो चुके हैं" : "All Mandatory Documents Uploaded"}
                sx={{ mt: 0.9, bgcolor: "#f0fdf4", color: "#166534", fontWeight: 700, fontSize: "0.68rem" }}
              />
            )}

            {appSuccess && (
              <Alert severity="success" sx={{ mt: 0.9, py: 0.2, fontSize: "0.74rem", borderRadius: 1.5 }}>
                {appSuccess}
              </Alert>
            )}
            {appError && (
              <Alert severity="error" sx={{ mt: 0.9, py: 0.2, fontSize: "0.74rem", borderRadius: 1.5 }}>
                {appError}
              </Alert>
            )}

            {app.pendingActions?.length > 0 && (
              <Box sx={{ mt: 0.9, p: 0.9, borderRadius: 1.5, bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <Typography variant="caption" fontWeight={700} color="#334155" display="block">
                  {isHi ? "अगला कदम:" : "Next Steps:"}
                </Typography>
                {app.pendingActions.map((act, i) => (
                  <Typography key={i} variant="caption" color="#475569" display="block" sx={{ fontSize: "0.72rem" }}>
                    • {act}
                  </Typography>
                ))}
              </Box>
            )}
          </Paper>
        );
      })}
    </Stack>
  );
}

ApplicationStatusCard.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.object),
  sessionId: PropTypes.string,
  language: PropTypes.string,
  isCompact: PropTypes.bool,
  onApplicationsUpdated: PropTypes.func,
};

export function SupportEscalationCard({ data, isCompact = false }) {
  if (!data) return null;
  const channels = data.supportChannels || {};

  return (
    <Paper
      elevation={0}
      sx={{
        p: isCompact ? 1.4 : 1.8,
        mt: 1,
        borderRadius: 2.5,
        border: "1px solid #fecaca",
        bgcolor: "#fef2f2",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.8 }}>
        <SupportAgent sx={{ color: "#dc2626" }} fontSize="small" />
        <Typography variant="subtitle2" fontWeight={700} color="#7f1d1d" sx={{ fontSize: "0.85rem" }}>
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

SupportEscalationCard.propTypes = {
  data: PropTypes.shape({
    ticketId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    supportChannels: PropTypes.shape({
      supportEmail: PropTypes.string,
      grievanceEmail: PropTypes.string,
      helplines: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  isCompact: PropTypes.bool,
};

/**
 * Clickable contextual page navigation CTA strip/buttons inside chatbot messages
 */
export function PageNavigationCard({ data, language = "en", isCompact = false, onNavigate }) {
  const links = Array.isArray(data?.links) ? data.links : [];
  if (links.length === 0 || !onNavigate) return null;

  const heading = language === "hi" ? "संबंधित वेबसाइट पेज:" : "Explore Related Pages:";

  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mb: 0.65,
          fontWeight: 700,
          fontSize: "0.72rem",
          color: "#475569",
          letterSpacing: "0.02em",
        }}
      >
        {heading}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.85}>
        {links.map((link) => {
          const title = language === "hi" ? link.labelHi || link.label : link.label;
          const subtitle = language === "hi" ? link.subtitleHi || link.subtitle : link.subtitle;
          return (
            <Button
              key={link.route}
              variant="outlined"
              size="small"
              onClick={() => onNavigate(link.route)}
              endIcon={<ArrowForward sx={{ fontSize: "0.92rem !important" }} />}
              data-nav-route={link.route}
              title={subtitle || link.route}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: isCompact ? 1.25 : 1.6,
                py: isCompact ? 0.55 : 0.7,
                fontWeight: 700,
                fontSize: isCompact ? "0.76rem" : "0.81rem",
                lineHeight: 1.25,
                borderColor: "#bfdbfe",
                bgcolor: "#eff6ff",
                color: "#1e3a8a",
                boxShadow: "0 1px 2px rgba(30, 58, 138, 0.06)",
                "&:hover": {
                  bgcolor: "#1d2ebd",
                  borderColor: "#1d2ebd",
                  color: "#ffffff",
                },
              }}
            >
              {title}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}

PageNavigationCard.propTypes = {
  data: PropTypes.shape({
    links: PropTypes.arrayOf(
      PropTypes.shape({
        route: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        labelHi: PropTypes.string,
        subtitle: PropTypes.string,
        subtitleHi: PropTypes.string,
      })
    ),
  }),
  language: PropTypes.string,
  isCompact: PropTypes.bool,
  onNavigate: PropTypes.func,
};



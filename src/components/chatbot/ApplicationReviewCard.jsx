import { useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { AssignmentTurnedIn, CheckCircle, Edit, Verified } from "@mui/icons-material";
import { ChatbotAPI } from "../../apis/ChatbotAPI";

function FieldItem({ label, value }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" color="#64748b" display="block" sx={{ fontSize: "0.68rem" }}>
        {label}
      </Typography>
      <Typography
        variant="caption"
        fontWeight={700}
        color="#0f172a"
        sx={{ fontSize: "0.75rem", wordBreak: "break-word" }}
      >
        {value || "Not Provided"}
      </Typography>
    </Box>
  );
}

FieldItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function isDocUploaded(doc) {
  return Boolean(
    doc?.uploaded ||
      doc?.status === "uploaded" ||
      (Array.isArray(doc?.files) && doc.files.length > 0)
  );
}

export default function ApplicationReviewCard({
  data,
  sessionId,
  language = "en",
  isCompact = false,
  onRequestEdit,
  onSubmitted,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  if (!data) return null;

  const personal = data.personalInfo || {};
  const financial = data.employmentAndFinancials || {};
  const loanReq = data.loanRequirements || {};
  const docs = data.documents || [];
  const canSubmit = Boolean(data.isReadyForReview);

  const handleConfirmSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const idempotencyKey = `f2_${sessionId}_${data.draftId || "draft"}_${Date.now()}`;
      const res = await ChatbotAPI.submitApplication({
        sessionId,
        confirmSubmission: true,
        idempotencyKey,
      });
      setConfirmation(res);
      onSubmitted?.(res);
    } catch (err) {
      setSubmitError(
        err.message || "Submission failed. Please verify required details and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation?.success) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: isCompact ? 1.5 : 2,
          mt: 0.5,
          borderRadius: 2.5,
          border: "1.5px solid #10b981",
          bgcolor: "#f0fdf4",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.2 }}>
          <Verified sx={{ color: "#10b981" }} />
          <Typography variant="subtitle1" fontWeight={800} color="#065f46" sx={{ fontSize: "0.95rem" }}>
            {language === "hi"
              ? "लोन आवेदन सफलतापूर्वक सबमिट हुआ!"
              : "Loan Application Submitted Successfully!"}
          </Typography>
        </Stack>

        <Stack spacing={0.8} sx={{ mb: 1.5 }}>
          {(confirmation.applications || []).map((app) => (
            <Paper
              key={app.applicationNo}
              elevation={0}
              sx={{ p: 1.2, borderRadius: 2, border: "1px solid #bbf7d0", bgcolor: "#ffffff" }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={0.5}>
                <Typography variant="body2" fontWeight={700} color="#0f172a" sx={{ fontSize: "0.82rem" }}>
                  App #{app.applicationNo} • {app.provider}
                </Typography>
                <Chip
                  size="small"
                  label={app.status || app.trackingStatus || "submitted"}
                  color="success"
                  sx={{ fontWeight: 700, height: 20, fontSize: "0.66rem" }}
                />
              </Stack>
              <Typography variant="caption" color="#475569">
                {[
                  app.loanType,
                  app.amount ? `₹${Number(app.amount).toLocaleString("en-IN")}` : null,
                  app.tenureMonths
                    ? `${Math.round(app.tenureMonths / 12)} yrs`
                    : app.tenure
                      ? /yr|year/i.test(String(app.tenure))
                        ? app.tenure
                        : `${app.tenure} yrs`
                      : null,
                ]
                  .filter(Boolean)
                  .join(" • ") || "Application Registered"}
              </Typography>
            </Paper>
          ))}
        </Stack>

        {(confirmation.nextSteps || []).map((step, i) => (
          <Stack key={i} direction="row" spacing={0.8} alignItems="flex-start" sx={{ mb: 0.4 }}>
            <CheckCircle sx={{ color: "#10b981", fontSize: 15, mt: 0.2, flexShrink: 0 }} />
            <Typography variant="caption" color="#065f46">
              {step}
            </Typography>
          </Stack>
        ))}
      </Paper>
    );
  }

  const gridSx = {
    display: "grid",
    gridTemplateColumns: isCompact ? "1fr" : "repeat(2, minmax(0, 1fr))",
    gap: 1,
    mb: 1.2,
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: isCompact ? 1.3 : 1.8,
        mt: 0.5,
        borderRadius: 2.5,
        border: "1px solid #bfdbfe",
        bgcolor: "#ffffff",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={0.8}
        sx={{ mb: 1.2 }}
      >
        <Stack direction="row" spacing={0.8} alignItems="center">
          <AssignmentTurnedIn sx={{ color: "#3244e6" }} fontSize="small" />
          <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
            {language === "hi" ? "आवेदन सारांश समीक्षा" : "Application Review Summary"}
          </Typography>
        </Stack>
        <Chip
          size="small"
          label={canSubmit ? "Ready to Submit" : "Missing Required Details"}
          color={canSubmit ? "success" : "warning"}
          sx={{ fontWeight: 700, fontSize: "0.68rem", height: 22 }}
        />
      </Stack>

      <Typography variant="caption" fontWeight={700} color="#3244e6" display="block" sx={{ mb: 0.6 }}>
        1. Loan Requirements
      </Typography>
      <Box sx={gridSx}>
        <FieldItem label="Loan Type" value={loanReq.loan_type} />
        <FieldItem
          label="Amount"
          value={loanReq.amount ? `₹${Number(loanReq.amount).toLocaleString("en-IN")}` : null}
        />
        <FieldItem label="Tenure" value={loanReq.tenure ? `${loanReq.tenure}` : null} />
        <FieldItem
          label="Selected Lender(s)"
          value={(loanReq.providers || []).join(", ") || "Let F2 Fintech decide your lender"}
        />
      </Box>

      <Divider sx={{ my: 1 }} />

      <Typography variant="caption" fontWeight={700} color="#3244e6" display="block" sx={{ mb: 0.6 }}>
        2. Personal Details
      </Typography>
      <Box sx={gridSx}>
        <FieldItem
          label="Applicant Name"
          value={`${personal.prefix ? `${personal.prefix.toUpperCase()} ` : ""}${personal.name || ""}`.trim()}
        />
        <FieldItem label="Mobile" value={personal.contactMasked} />
        <FieldItem label="Email" value={personal.email} />
        <FieldItem label="PAN Card" value={personal.panMasked} />
        <FieldItem label="Date of Birth" value={personal.dob} />
        <FieldItem
          label="City / State"
          value={[personal.city, personal.state].filter(Boolean).join(", ")}
        />
      </Box>

      <Divider sx={{ my: 1 }} />

      <Typography variant="caption" fontWeight={700} color="#3244e6" display="block" sx={{ mb: 0.6 }}>
        3. Employment, Financials & Documents
      </Typography>
      <Box sx={gridSx}>
        <FieldItem label="Employment Type" value={financial.employment_type} />
        <FieldItem
          label="Salary / Income (₹ p.a.)"
          value={financial.salary ? `₹${Number(financial.salary).toLocaleString("en-IN")}` : null}
        />
        <FieldItem
          label="Existing Monthly EMI"
          value={`₹${Number(financial.existing_emi || 0).toLocaleString("en-IN")}`}
        />
        <FieldItem label="Company / Degree" value={financial.company || financial.degree} />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 1.4 }}>
        {docs.map((d) => {
          const uploaded = isDocUploaded(d);
          return (
            <Chip
              key={d.type}
              size="small"
              label={`${d.label}: ${uploaded ? "Uploaded" : d.required ? "Missing" : "Optional"}`}
              color={uploaded ? "success" : d.required ? "error" : "default"}
              variant="outlined"
              sx={{ fontSize: "0.66rem" }}
            />
          );
        })}
      </Box>

      {!canSubmit && (
        <Alert severity="warning" sx={{ mb: 1.2, py: 0.4, fontSize: "0.74rem" }}>
          Missing items:{" "}
          {[
            ...(data.missingPersonal || []),
            ...(data.missingFinancial || []),
            ...(data.missingLoanReq || []),
            ...(data.missingDocuments || []),
          ].join(", ")}
        </Alert>
      )}

      {submitError && (
        <Alert severity="error" sx={{ mb: 1.2, py: 0.4, fontSize: "0.74rem" }}>
          {submitError}
        </Alert>
      )}

      <Stack
        direction={isCompact ? "column-reverse" : "row"}
        spacing={1}
        justifyContent="flex-end"
      >
        {onRequestEdit && (
          <Button
            size="small"
            variant="outlined"
            fullWidth={isCompact}
            startIcon={<Edit fontSize="small" />}
            onClick={onRequestEdit}
            sx={{
              color: "#1d2ebd",
              borderColor: "#c7d2fe",
              bgcolor: "#f8faff",
              "&:hover": { bgcolor: "#eef2ff", borderColor: "#3244e6" },
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {language === "hi" ? "विवरण बदलें" : "Edit Details"}
          </Button>
        )}
        <Button
          size="small"
          variant="contained"
          fullWidth={isCompact}
          disabled={!canSubmit || submitting}
          onClick={handleConfirmSubmit}
          sx={{
            bgcolor: "#10b981",
            color: "#ffffff",
            "&:hover": { bgcolor: "#059669" },
            "&.Mui-disabled": { bgcolor: "#e2e8f0", color: "#94a3b8" },
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 700,
          }}
        >
          {submitting
            ? language === "hi"
              ? "सबमिट हो रहा है..."
              : "Submitting..."
            : language === "hi"
              ? "पुष्टि करें और आवेदन सबमिट करें"
              : "Confirm & Submit Application"}
        </Button>
      </Stack>
    </Paper>
  );
}

ApplicationReviewCard.propTypes = {
  data: PropTypes.shape({
    draftId: PropTypes.string,
    isReadyForReview: PropTypes.bool,
    personalInfo: PropTypes.object,
    employmentAndFinancials: PropTypes.object,
    loanRequirements: PropTypes.object,
    documents: PropTypes.arrayOf(PropTypes.object),
    missingPersonal: PropTypes.arrayOf(PropTypes.string),
    missingFinancial: PropTypes.arrayOf(PropTypes.string),
    missingLoanReq: PropTypes.arrayOf(PropTypes.string),
    missingDocuments: PropTypes.arrayOf(PropTypes.string),
  }),
  sessionId: PropTypes.string,
  language: PropTypes.string,
  isCompact: PropTypes.bool,
  onRequestEdit: PropTypes.func,
  onSubmitted: PropTypes.func,
};

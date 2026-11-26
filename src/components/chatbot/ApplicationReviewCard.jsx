import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { AssignmentTurnedIn, CheckCircle, Edit, Verified } from "@mui/icons-material";
import { ChatbotAPI } from "../../apis/ChatbotAPI";

function FieldItem({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="#64748b" display="block">
        {label}
      </Typography>
      <Typography variant="caption" fontWeight={700} color="#0f172a">
        {value || "Not Provided"}
      </Typography>
    </Box>
  );
}

export default function ApplicationReviewCard({
  data,
  sessionId,
  language = "en",
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
      setSubmitError(err.message || "Submission failed. Please verify required details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation?.success) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2.2,
          mt: 1,
          borderRadius: 3,
          border: "1.5px solid #10b981",
          bgcolor: "#f0fdf4",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.2 }}>
          <Verified sx={{ color: "#10b981" }} />
          <Typography variant="subtitle1" fontWeight={800} color="#065f46">
            {language === "hi" ? "लोन आवेदन सफलतापूर्वक सबमिट हुआ!" : "Loan Application Submitted Successfully!"}
          </Typography>
        </Stack>

        <Stack spacing={0.8} sx={{ mb: 1.5 }}>
          {(confirmation.applications || []).map((app) => (
            <Paper key={app.applicationNo} elevation={0} sx={{ p: 1.2, borderRadius: 2, border: "1px solid #bbf7d0" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={700} color="#0f172a">
                  App #{app.applicationNo} • {app.provider}
                </Typography>
                <Chip size="small" label={app.status || "submitted"} color="success" sx={{ fontWeight: 700 }} />
              </Stack>
              <Typography variant="caption" color="#475569">
                {app.loanType} • ₹{Number(app.amount || 0).toLocaleString("en-IN")} • {app.tenure} yrs
              </Typography>
            </Paper>
          ))}
        </Stack>

        {(confirmation.nextSteps || []).map((step, i) => (
          <Stack key={i} direction="row" spacing={0.8} alignItems="flex-start" sx={{ mb: 0.4 }}>
            <CheckCircle sx={{ color: "#10b981", fontSize: 15, mt: 0.2 }} />
            <Typography variant="caption" color="#065f46">
              {step}
            </Typography>
          </Stack>
        ))}
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mt: 1,
        borderRadius: 3,
        border: "1px solid #bfdbfe",
        bgcolor: "#ffffff",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <AssignmentTurnedIn sx={{ color: "#3244e6" }} fontSize="small" />
          <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
            {language === "hi" ? "आवेदन सारांश समीक्षा" : "Application Review Summary"}
          </Typography>
        </Stack>
        <Chip
          size="small"
          label={canSubmit ? "Ready to Submit" : "Missing Required Details"}
          color={canSubmit ? "success" : "warning"}
          sx={{ fontWeight: 700, fontSize: "0.7rem" }}
        />
      </Stack>

      <Typography variant="caption" fontWeight={700} color="#3244e6" display="block" sx={{ mb: 0.6 }}>
        1. Personal Details
      </Typography>
      <Grid container spacing={1} sx={{ mb: 1.2 }}>
        <Grid item xs={6}><FieldItem label="Applicant Name" value={`${personal.prefix || ""} ${personal.name || ""}`.trim()} /></Grid>
        <Grid item xs={6}><FieldItem label="Mobile" value={personal.contactMasked} /></Grid>
        <Grid item xs={6}><FieldItem label="Email" value={personal.email} /></Grid>
        <Grid item xs={6}><FieldItem label="PAN Card" value={personal.panMasked} /></Grid>
        <Grid item xs={6}><FieldItem label="Date of Birth" value={personal.dob} /></Grid>
        <Grid item xs={6}><FieldItem label="City / State" value={[personal.city, personal.state].filter(Boolean).join(", ")} /></Grid>
      </Grid>

      <Divider sx={{ my: 1 }} />

      <Typography variant="caption" fontWeight={700} color="#3244e6" display="block" sx={{ mb: 0.6 }}>
        2. Employment & Financials
      </Typography>
      <Grid container spacing={1} sx={{ mb: 1.2 }}>
        <Grid item xs={6}><FieldItem label="Employment Type" value={financial.employment_type} /></Grid>
        <Grid item xs={6}><FieldItem label="Salary / Income (₹ p.a.)" value={financial.salary ? `₹${Number(financial.salary).toLocaleString("en-IN")}` : null} /></Grid>
        <Grid item xs={6}><FieldItem label="Existing Monthly EMI" value={`₹${Number(financial.existing_emi || 0).toLocaleString("en-IN")}`} /></Grid>
        <Grid item xs={6}><FieldItem label="Company / Practice" value={financial.company || financial.degree} /></Grid>
      </Grid>

      <Divider sx={{ my: 1 }} />

      <Typography variant="caption" fontWeight={700} color="#3244e6" display="block" sx={{ mb: 0.6 }}>
        3. Loan Requirements & Documents
      </Typography>
      <Grid container spacing={1} sx={{ mb: 1.2 }}>
        <Grid item xs={6}><FieldItem label="Loan Type" value={loanReq.loan_type} /></Grid>
        <Grid item xs={6}><FieldItem label="Amount" value={loanReq.amount ? `₹${Number(loanReq.amount).toLocaleString("en-IN")}` : null} /></Grid>
        <Grid item xs={6}><FieldItem label="Tenure" value={loanReq.tenure ? `${loanReq.tenure}` : null} /></Grid>
        <Grid item xs={6}><FieldItem label="Selected Lender(s)" value={(loanReq.providers || []).join(", ") || "Best Matched F2 Partner"} /></Grid>
      </Grid>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 1.5 }}>
        {docs.map((d) => (
          <Chip
            key={d.type}
            size="small"
            label={`${d.label}: ${d.uploaded ? "Uploaded" : d.required ? "Missing" : "Optional"}`}
            color={d.uploaded ? "success" : d.required ? "error" : "default"}
            variant="outlined"
            sx={{ fontSize: "0.68rem" }}
          />
        ))}
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

      <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap">
        {onRequestEdit && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<Edit fontSize="small" />}
            onClick={onRequestEdit}
            sx={{ textTransform: "none", borderRadius: 2, fontWeight: 600 }}
          >
            {language === "hi" ? "विवरण बदलें" : "Edit Details"}
          </Button>
        )}
        <Button
          size="small"
          variant="contained"
          disabled={!canSubmit || submitting}
          onClick={handleConfirmSubmit}
          sx={{
            bgcolor: "#10b981",
            "&:hover": { bgcolor: "#059669" },
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 700,
          }}
        >
          {submitting
            ? language === "hi" ? "सबमिट हो रहा है..." : "Submitting..."
            : language === "hi" ? "पुष्टि करें और आवेदन सबमिट करें" : "Confirm & Submit Application"}
        </Button>
      </Stack>
    </Paper>
  );
}


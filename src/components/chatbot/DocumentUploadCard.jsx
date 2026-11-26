import { useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CheckCircle, CloudUpload, Description, ErrorOutline } from "@mui/icons-material";
import { ChatbotAPI } from "../../apis/ChatbotAPI";

export default function DocumentUploadCard({ data, sessionId, language = "en", onChecklistUpdated, onProceedToReview }) {
  const [checklist, setChecklist] = useState(data?.checklist || []);
  const [uploadingType, setUploadingType] = useState(null);
  const [uploadErrors, setUploadErrors] = useState({});
  const fileInputRef = useRef(null);
  const activeDocTypeRef = useRef(null);

  const items = checklist || [];
  const mandatoryItems = items.filter((d) => d.required);
  const mandatoryDone = mandatoryItems.filter((d) => d.uploaded).length;
  const allMandatoryUploaded = mandatoryItems.length > 0 && mandatoryDone === mandatoryItems.length;

  const triggerUpload = (docType) => {
    activeDocTypeRef.current = docType;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    const docType = activeDocTypeRef.current;
    if (!file || !docType) return;

    setUploadErrors((prev) => ({ ...prev, [docType]: null }));
    setUploadingType(docType);
    try {
      const res = await ChatbotAPI.uploadApplicationDocument({ sessionId, docType, file });
      const updated = res?.progress?.documentChecklist;
      if (Array.isArray(updated)) {
        setChecklist(updated);
        onChecklistUpdated?.(res.progress);
      }
    } catch (err) {
      setUploadErrors((prev) => ({
        ...prev,
        [docType]: err.message || "Document validation failed. Please upload a valid PDF/JPG/PNG under 10MB.",
      }));
    } finally {
      setUploadingType(null);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mt: 1,
        borderRadius: 3,
        border: "1px solid #ddd6fe",
        bgcolor: "#ffffff",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Description sx={{ color: "#7c3aed" }} fontSize="small" />
          <Box>
            <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
              {language === "hi" ? "आवश्यक दस्तावेज़ अपलोड करें" : "Application Document Checklist"}
            </Typography>
            <Typography variant="caption" color="#64748b">
              {data?.loanType || "Loan"} • Mandatory uploaded: {mandatoryDone}/{mandatoryItems.length}
            </Typography>
          </Box>
        </Stack>
        <Chip
          size="small"
          label={allMandatoryUploaded ? "All Mandatory Ready" : "Pending Upload"}
          color={allMandatoryUploaded ? "success" : "warning"}
          sx={{ fontWeight: 700, fontSize: "0.7rem" }}
        />
      </Stack>

      <Typography variant="caption" color="#64748b" sx={{ display: "block", mb: 1.5 }}>
        Accepted formats: PDF, JPG, JPEG, PNG, WEBP, DOC, DOCX (max 10MB per file).
      </Typography>

      <Stack spacing={1}>
        {items.map((doc) => {
          const isUploading = uploadingType === doc.type;
          const err = uploadErrors[doc.type];

          return (
            <Box
              key={doc.type}
              sx={{
                p: 1.2,
                borderRadius: 2,
                border: doc.uploaded ? "1px solid #86efac" : "1px solid #e2e8f0",
                bgcolor: doc.uploaded ? "#f0fdf4" : "#f8fafc",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                <Box sx={{ minWidth: 0 }}>
                  <Stack direction="row" spacing={0.8} alignItems="center">
                    {doc.uploaded ? (
                      <CheckCircle sx={{ color: "#16a34a", fontSize: 16 }} />
                    ) : (
                      <ErrorOutline sx={{ color: doc.required ? "#d97706" : "#64748b", fontSize: 16 }} />
                    )}
                    <Typography variant="body2" fontWeight={600} color="#0f172a" noWrap>
                      {doc.label}
                    </Typography>
                    <Chip
                      size="small"
                      label={doc.required ? "Mandatory" : "Optional"}
                      variant="outlined"
                      color={doc.required ? "error" : "default"}
                      sx={{ height: 18, fontSize: "0.64rem" }}
                    />
                  </Stack>

                  {doc.files?.length > 0 && (
                    <Typography variant="caption" color="#15803d" sx={{ display: "block", ml: 3 }}>
                      Uploaded: {doc.files.map((f) => f.fileName).join(", ")}
                    </Typography>
                  )}
                </Box>

                <Button
                  size="small"
                  variant={doc.uploaded ? "outlined" : "contained"}
                  startIcon={<CloudUpload fontSize="small" />}
                  disabled={Boolean(uploadingType)}
                  onClick={() => triggerUpload(doc.type)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "0.74rem",
                    flexShrink: 0,
                    ...(doc.uploaded
                      ? { borderColor: "#16a34a", color: "#15803d" }
                      : { bgcolor: "#3244e6", "&:hover": { bgcolor: "#1d2ebd" } }),
                  }}
                >
                  {doc.uploaded ? "Replace / Add" : "Upload"}
                </Button>
              </Stack>

              {isUploading && <LinearProgress sx={{ mt: 1, borderRadius: 2 }} />}
              {err && (
                <Alert severity="error" sx={{ mt: 1, py: 0, fontSize: "0.74rem" }}>
                  {err}
                </Alert>
              )}
            </Box>
          );
        })}
      </Stack>

      {allMandatoryUploaded && onProceedToReview && (
        <Button
          fullWidth
          variant="contained"
          onClick={onProceedToReview}
          sx={{
            mt: 1.5,
            bgcolor: "#10b981",
            "&:hover": { bgcolor: "#059669" },
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 2.5,
          }}
        >
          {language === "hi" ? "आवेदन समीक्षा और सबमिट के लिए आगे बढ़ें" : "Proceed to Application Review & Submit"}
        </Button>
      )}
    </Paper>
  );
}


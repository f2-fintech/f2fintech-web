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
  Typography,
} from "@mui/material";
import { CheckCircle, CloudUpload, Description, ErrorOutline } from "@mui/icons-material";
import { ChatbotAPI } from "../../apis/ChatbotAPI";

function isDocUploaded(doc) {
  return Boolean(
    doc?.uploaded ||
      doc?.status === "uploaded" ||
      (Array.isArray(doc?.files) && doc.files.length > 0)
  );
}

export default function DocumentUploadCard({
  data,
  sessionId,
  language = "en",
  isCompact = false,
  onChecklistUpdated,
  onProceedToReview,
}) {
  const [checklist, setChecklist] = useState(data?.checklist || []);
  const [uploadingType, setUploadingType] = useState(null);
  const [uploadErrors, setUploadErrors] = useState({});
  const fileInputRef = useRef(null);
  const activeDocTypeRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(data?.checklist)) {
      setChecklist(data.checklist);
    }
  }, [data]);

  const items = checklist || [];
  const mandatoryItems = items.filter((d) => d.required);
  const mandatoryDone = mandatoryItems.filter(isDocUploaded).length;
  const allMandatoryUploaded =
    mandatoryItems.length > 0 && mandatoryDone === mandatoryItems.length;

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
        [docType]:
          err.message ||
          "Document validation failed. Please upload a valid PDF/JPG/PNG under 10MB.",
      }));
    } finally {
      setUploadingType(null);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: isCompact ? 1.3 : 1.8,
        mt: 0.5,
        borderRadius: 2.5,
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

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={0.8}
        sx={{ mb: 1 }}
      >
        <Stack direction="row" spacing={0.9} alignItems="center" sx={{ minWidth: 0 }}>
          <Description sx={{ color: "#7c3aed" }} fontSize="small" />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={700} color="#0f172a" sx={{ fontSize: "0.84rem" }}>
              {language === "hi" ? "आवश्यक दस्तावेज़ अपलोड करें" : "Application Document Checklist"}
            </Typography>
            <Typography variant="caption" color="#64748b" sx={{ fontSize: "0.7rem" }}>
              {data?.loanType || "Loan"} • Mandatory uploaded: {mandatoryDone}/{mandatoryItems.length}
            </Typography>
          </Box>
        </Stack>
        <Chip
          size="small"
          label={allMandatoryUploaded ? "All Mandatory Ready" : "Pending Upload"}
          color={allMandatoryUploaded ? "success" : "warning"}
          sx={{ fontWeight: 700, fontSize: "0.68rem", height: 22 }}
        />
      </Stack>

      <Typography variant="caption" color="#64748b" sx={{ display: "block", mb: 1.2, fontSize: "0.7rem" }}>
        Accepted formats: PDF, JPG, JPEG, PNG, WEBP, DOC, DOCX (max 10MB per file).
      </Typography>

      <Stack spacing={0.9}>
        {items.map((doc) => {
          const uploaded = isDocUploaded(doc);
          const isUploading = uploadingType === doc.type;
          const err = uploadErrors[doc.type];

          return (
            <Box
              key={doc.type}
              sx={{
                p: isCompact ? 1 : 1.2,
                borderRadius: 2,
                border: uploaded ? "1px solid #86efac" : "1px solid #e2e8f0",
                bgcolor: uploaded ? "#f0fdf4" : "#f8fafc",
              }}
            >
              <Stack
                direction={isCompact ? "column" : "row"}
                justifyContent="space-between"
                alignItems={isCompact ? "stretch" : "center"}
                gap={1}
              >
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Stack direction="row" spacing={0.7} alignItems="center" flexWrap="wrap" useFlexGap>
                    {uploaded ? (
                      <CheckCircle sx={{ color: "#16a34a", fontSize: 16, flexShrink: 0 }} />
                    ) : (
                      <ErrorOutline
                        sx={{ color: doc.required ? "#d97706" : "#64748b", fontSize: 16, flexShrink: 0 }}
                      />
                    )}
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="#0f172a"
                      sx={{ fontSize: "0.78rem", lineHeight: 1.3 }}
                    >
                      {language === "hi" && doc.labelHi ? doc.labelHi : doc.label}
                    </Typography>
                    <Chip
                      size="small"
                      label={doc.required ? "Mandatory" : "Optional"}
                      variant="outlined"
                      color={doc.required ? "error" : "default"}
                      sx={{ height: 18, fontSize: "0.62rem" }}
                    />
                  </Stack>

                  {doc.files?.length > 0 && (
                    <Typography
                      variant="caption"
                      color="#15803d"
                      sx={{ display: "block", ml: 2.8, mt: 0.3, fontSize: "0.68rem", wordBreak: "break-word" }}
                    >
                      Uploaded: {doc.files.map((f) => f.fileName).join(", ")}
                    </Typography>
                  )}
                </Box>

                <Button
                  size="small"
                  variant={uploaded ? "outlined" : "contained"}
                  startIcon={<CloudUpload fontSize="small" />}
                  disabled={Boolean(uploadingType)}
                  onClick={() => triggerUpload(doc.type)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "0.74rem",
                    flexShrink: 0,
                    ...(uploaded
                      ? { borderColor: "#16a34a", color: "#15803d", bgcolor: "#ffffff" }
                      : { bgcolor: "#3244e6", color: "#ffffff", "&:hover": { bgcolor: "#1d2ebd" } }),
                  }}
                >
                  {uploaded ? "Replace / Add" : "Upload"}
                </Button>
              </Stack>

              {isUploading && (
                <LinearProgress
                  sx={{
                    mt: 1,
                    borderRadius: 2,
                    bgcolor: "#e0e7ff",
                    "& .MuiLinearProgress-bar": { bgcolor: "#3244e6" },
                  }}
                />
              )}
              {err && (
                <Alert severity="error" sx={{ mt: 1, py: 0, fontSize: "0.72rem" }}>
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
            color: "#ffffff",
            "&:hover": { bgcolor: "#059669" },
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 2,
          }}
        >
          {language === "hi"
            ? "आवेदन समीक्षा और सबमिट के लिए आगे बढ़ें"
            : "Proceed to Application Review & Submit"}
        </Button>
      )}
    </Paper>
  );
}

DocumentUploadCard.propTypes = {
  data: PropTypes.shape({
    loanType: PropTypes.string,
    checklist: PropTypes.arrayOf(PropTypes.object),
  }),
  sessionId: PropTypes.string,
  language: PropTypes.string,
  isCompact: PropTypes.bool,
  onChecklistUpdated: PropTypes.func,
  onProceedToReview: PropTypes.func,
};

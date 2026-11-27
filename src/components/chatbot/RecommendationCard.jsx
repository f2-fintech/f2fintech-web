import { Alert, Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { AutoAwesome, CheckCircle, VerifiedUser } from "@mui/icons-material";

function formatMoney(v) {
  if (v === "Not Available" || v === null || v === undefined) return "Not Available";
  return `₹${Math.round(Number(v)).toLocaleString("en-IN")}`;
}

export default function RecommendationCard({ data, language = "en", onApplyProvider }) {
  const recommendations = data?.recommendations || [];
  if (recommendations.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mt: 1,
        borderRadius: 3,
        border: "1px solid #c7d2fe",
        bgcolor: "#ffffff",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.2 }}>
        <AutoAwesome sx={{ color: "#3244e6" }} fontSize="small" />
        <Box>
          <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
            {language === "hi" ? "आपके लिए अनुशंसित लोन विकल्प" : "Personalized Loan Matches"}
          </Typography>
          <Typography variant="caption" color="#64748b">
            {data.inferredCategory} • Eligible: {data.eligibleCount} | Filtered Out: {data.filteredOutCount}
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={1.2}>
        {recommendations.map((rec, idx) => (
          <Paper
            key={rec.productSlug || rec.providerName}
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              border: idx === 0 ? "1.5px solid #10b981" : "1px solid #e2e8f0",
              bgcolor: idx === 0 ? "#f0fdf4" : "#ffffff",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  size="small"
                  label={`#${idx + 1} Match`}
                  color={idx === 0 ? "success" : "primary"}
                  sx={{ fontWeight: 700, height: 22, fontSize: "0.7rem" }}
                />
                <Typography variant="body2" fontWeight={700} color="#0f172a">
                  {rec.providerName}
                </Typography>
              </Stack>

              {onApplyProvider && (
                <Button
                  size="small"
                  variant="contained"
                  onClick={() =>
                    onApplyProvider({
                      providerName: rec.providerName,
                      loanType: rec.loanCategory || data.inferredCategory,
                      loanAmount: data.profileUsed?.loanAmount,
                      tenureMonths: data.profileUsed?.tenureMonths,
                    })
                  }
                  sx={{
                    bgcolor: "#3244e6",
                    "&:hover": { bgcolor: "#1d2ebd" },
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "0.74rem",
                  }}
                >
                  {language === "hi" ? "यह लोन चुनें" : "Apply Now"}
                </Button>
              )}
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))",
                gap: 1,
                mt: 1,
              }}
            >
              <Box>
                <Typography variant="caption" color="#64748b" display="block">Interest Rate</Typography>
                <Typography variant="caption" fontWeight={700} color="#0f172a">{rec.interestRateRange}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="#64748b" display="block">Est. Monthly EMI</Typography>
                <Typography variant="caption" fontWeight={700} color="#1d2ebd">{formatMoney(rec.estimatedMonthlyEmi)}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="#64748b" display="block">Est. Total Cost</Typography>
                <Typography variant="caption" fontWeight={700} color="#047857">{formatMoney(rec.estimatedTotalRepayment)}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="#64748b" display="block">Processing Fee</Typography>
                <Typography variant="caption" fontWeight={600} color="#334155">{rec.processingFee}</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Stack spacing={0.4}>
              {(rec.matchReasons || []).map((reason, rIdx) => (
                <Stack key={rIdx} direction="row" spacing={0.6} alignItems="flex-start">
                  <CheckCircle sx={{ color: "#10b981", fontSize: 14, mt: 0.2 }} />
                  <Typography variant="caption" color="#334155" sx={{ lineHeight: 1.35 }}>
                    {reason}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Alert
        icon={<VerifiedUser fontSize="small" />}
        severity="info"
        sx={{ mt: 1.5, borderRadius: 2, py: 0.5, fontSize: "0.74rem" }}
      >
        {data.approvalDisclaimer}
      </Alert>
    </Paper>
  );
}


import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Balance, CheckCircleOutline, TableChart, ViewAgenda } from "@mui/icons-material";

function formatMoney(v) {
  if (v === "Not Available" || v === null || v === undefined) return "Not Available";
  if (typeof v === "string" && isNaN(Number(v))) return v;
  return `₹${Math.round(Number(v)).toLocaleString("en-IN")}`;
}

export default function ComparisonCard({ data, language = "en", onApplyProvider }) {
  const [viewMode, setViewMode] = useState("cards");
  const items = data?.items || [];
  if (items.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mt: 1,
        borderRadius: 3,
        border: "1px solid #dbeafe",
        bgcolor: "#ffffff",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} sx={{ mb: 1.5 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Balance sx={{ color: "#3244e6" }} fontSize="small" />
          <Box>
            <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
              {language === "hi" ? "अधिकृत लेंडर तुलना" : "Verified Lender Comparison"}
            </Typography>
            <Typography variant="caption" color="#64748b">
              {data.loanCategory} • {formatMoney(data.comparedLoanAmount)} • {data.comparedTenureMonths} mo
            </Typography>
          </Box>
        </Stack>

        <ToggleButtonGroup
          size="small"
          exclusive
          value={viewMode}
          onChange={(_, val) => val && setViewMode(val)}
        >
          <ToggleButton value="cards" sx={{ py: 0.4, px: 1 }}>
            <ViewAgenda fontSize="small" />
          </ToggleButton>
          <ToggleButton value="table" sx={{ py: 0.4, px: 1 }}>
            <TableChart fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {data?.summary?.rationale?.length > 0 && (
        <Box sx={{ p: 1.2, mb: 1.5, borderRadius: 2, bgcolor: "#f0f4ff" }}>
          {data.summary.rationale.map((line, i) => (
            <Typography key={i} variant="caption" color="#1e293b" sx={{ display: "block", lineHeight: 1.4 }}>
              • {line}
            </Typography>
          ))}
        </Box>
      )}

      {viewMode === "cards" ? (
        <Stack spacing={1.2}>
          {items.map((item) => (
            <Paper
              key={item.productSlug || item.providerName}
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: 2.5,
                border: item.isRecommended ? "1.5px solid #3244e6" : "1px solid #e2e8f0",
                bgcolor: item.isRecommended ? "#fafbff" : "#ffffff",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1}>
                <Box>
                  <Typography variant="body2" fontWeight={700} color="#0f172a">
                    {item.providerName}
                  </Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 0.5 }}>
                    {(item.badges || []).map((badge) => (
                      <Chip
                        key={badge}
                        label={badge}
                        size="small"
                        color={badge.includes("Lowest") ? "success" : "primary"}
                        variant="outlined"
                        sx={{ height: 20, fontSize: "0.66rem", fontWeight: 600 }}
                      />
                    ))}
                  </Stack>
                </Box>

                {onApplyProvider && (
                  <Button
                    size="small"
                    variant="contained"
                    endIcon={<CheckCircleOutline fontSize="small" />}
                    onClick={() =>
                      onApplyProvider({
                        providerName: item.providerName,
                        loanType: data.loanCategory,
                        loanAmount: data.comparedLoanAmount,
                        tenureMonths: data.comparedTenureMonths,
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
                    {language === "hi" ? "आवेदन करें" : "Apply"}
                  </Button>
                )}
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: 1,
                  mt: 1.2,
                  pt: 1,
                  borderTop: "1px dashed #e2e8f0",
                }}
              >
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">Interest Rate</Typography>
                  <Typography variant="caption" fontWeight={700} color="#0f172a">{item.interestRateDisplay}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">Est. Monthly EMI</Typography>
                  <Typography variant="caption" fontWeight={700} color="#1d2ebd">{formatMoney(item.estimatedMonthlyEmi)}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">Est. Total Interest</Typography>
                  <Typography variant="caption" fontWeight={700} color="#0f172a">{formatMoney(item.estimatedTotalInterest)}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">Est. Total Repay</Typography>
                  <Typography variant="caption" fontWeight={700} color="#047857">{formatMoney(item.estimatedTotalRepayment)}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">APR</Typography>
                  <Typography variant="caption" fontWeight={600} color="#334155">{item.aprDisplay}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">Processing Fee</Typography>
                  <Typography variant="caption" fontWeight={600} color="#334155">{item.processingFee}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">Loan Range</Typography>
                  <Typography variant="caption" fontWeight={600} color="#334155">{item.loanAmountRange}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">Max Tenure</Typography>
                  <Typography variant="caption" fontWeight={600} color="#334155">{item.maxTenureDisplay}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">Min Income</Typography>
                  <Typography variant="caption" fontWeight={600} color="#334155">{item.minIncomeRequirement}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">Prepayment / Foreclosure</Typography>
                  <Typography variant="caption" fontWeight={600} color="#334155">
                    {item.prepaymentCharges} / {item.foreclosureCharges}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Stack>
      ) : (
        <TableContainer sx={{ maxHeight: 340, border: "1px solid #e2e8f0", borderRadius: 2 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Lender</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Rate</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Est. EMI</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Total Repay</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Fee</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>APR</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Prepay / Foreclosure</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Docs</TableCell>
                {onApplyProvider && (
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }} align="right">Action</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.productSlug || item.providerName} hover>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>{item.providerName}</TableCell>
                  <TableCell sx={{ fontSize: "0.74rem" }}>{item.interestRateDisplay}</TableCell>
                  <TableCell sx={{ fontSize: "0.74rem", fontWeight: 700, color: "#1d2ebd" }}>
                    {formatMoney(item.estimatedMonthlyEmi)}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.74rem" }}>{formatMoney(item.estimatedTotalRepayment)}</TableCell>
                  <TableCell sx={{ fontSize: "0.74rem" }}>{item.processingFee}</TableCell>
                  <TableCell sx={{ fontSize: "0.74rem" }}>{item.aprDisplay}</TableCell>
                  <TableCell sx={{ fontSize: "0.74rem" }}>
                    {item.prepaymentCharges} / {item.foreclosureCharges}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.72rem" }}>
                    {Array.isArray(item.requiredDocuments)
                      ? item.requiredDocuments.slice(0, 3).join(", ")
                      : item.requiredDocuments}
                  </TableCell>
                  {onApplyProvider && (
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          onApplyProvider({
                            providerName: item.providerName,
                            loanType: data.loanCategory,
                            loanAmount: data.comparedLoanAmount,
                            tenureMonths: data.comparedTenureMonths,
                          })
                        }
                        sx={{
                          bgcolor: "#3244e6",
                          "&:hover": { bgcolor: "#1d2ebd" },
                          textTransform: "none",
                          borderRadius: 1.5,
                          fontWeight: 600,
                          fontSize: "0.7rem",
                          px: 1.2,
                          py: 0.3,
                          minWidth: "auto",
                        }}
                      >
                        {language === "hi" ? "आवेदन करें" : "Apply"}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Typography variant="caption" color="#64748b" sx={{ display: "block", mt: 1.2, fontSize: "0.7rem", lineHeight: 1.35 }}>
        {data.disclaimer}
      </Typography>
    </Paper>
  );
}


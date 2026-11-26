import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  Paper,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Calculate, ExpandMore, ExpandLess, Savings } from "@mui/icons-material";
import { ChatbotAPI } from "../../apis/ChatbotAPI";

function formatINR(n) {
  if (n === null || n === undefined || isNaN(Number(n))) return "₹0";
  return `₹${Math.round(Number(n)).toLocaleString("en-IN")}`;
}

export default function EmiAdvisorCard({ data, language = "en", onApplyWithTerms }) {
  const initialInputs = data?.inputs || {};
  const [principal, setPrincipal] = useState(Number(initialInputs.principal) || 500000);
  const [rate, setRate] = useState(Number(initialInputs.annualRatePercent) || 11.5);
  const [tenureMonths, setTenureMonths] = useState(Number(initialInputs.tenureMonths) || 60);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [extraEmiPerYear, setExtraEmiPerYear] = useState(false);
  const [result, setResult] = useState(data);
  const [showSchedule, setShowSchedule] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const timerRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    setResult(data);
    if (data?.inputs) {
      setPrincipal(Number(data.inputs.principal) || 500000);
      setRate(Number(data.inputs.annualRatePercent) || 11.5);
      setTenureMonths(Number(data.inputs.tenureMonths) || 60);
    }
  }, [data]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setCalculating(true);
      try {
        const res = await ChatbotAPI.calculateRepayment({
          principal,
          annualRatePercent: rate,
          tenureMonths,
          extraMonthlyPayment: extraMonthly,
          extraEmiPerYear,
        });
        const nextResult = res?.repayment || res;
        if (nextResult?.summary) {
          setResult(nextResult);
        }
      } catch {
        // Retain last verified result if backend throttle triggers
      } finally {
        setCalculating(false);
      }
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [principal, rate, tenureMonths, extraMonthly, extraEmiPerYear]);

  const summary = result?.summary || {};
  const prepayment = result?.prepaymentSummary;
  const affordability = result?.affordability;
  const yearlySchedule = result?.yearlySchedule || [];

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
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Calculate sx={{ color: "#3244e6" }} fontSize="small" />
          <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
            {language === "hi" ? "अनुमानित EMI और रीपेमेंट सलाहकार" : "Estimated Repayment & EMI Advisor"}
          </Typography>
        </Stack>
        {calculating && (
          <Typography variant="caption" color="#3244e6" fontWeight={600}>
            {language === "hi" ? "गणना जारी..." : "Updating..."}
          </Typography>
        )}
      </Stack>

      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: "#eff6ff", textAlign: "center" }}>
            <Typography variant="caption" color="#475569" display="block">
              {language === "hi" ? "मासिक EMI" : "Monthly EMI"}
            </Typography>
            <Typography variant="subtitle1" fontWeight={800} color="#1d2ebd">
              {formatINR(summary.monthlyEmi)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: "#f8fafc", textAlign: "center" }}>
            <Typography variant="caption" color="#475569" display="block">
              {language === "hi" ? "मूलधन" : "Principal"}
            </Typography>
            <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
              {formatINR(summary.principalAmount || principal)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: "#fff7ed", textAlign: "center" }}>
            <Typography variant="caption" color="#475569" display="block">
              {language === "hi" ? "कुल ब्याज" : "Total Interest"}
            </Typography>
            <Typography variant="subtitle2" fontWeight={700} color="#c2410c">
              {formatINR(summary.totalInterestPayable)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: "#ecfdf5", textAlign: "center" }}>
            <Typography variant="caption" color="#475569" display="block">
              {language === "hi" ? "कुल भुगतान" : "Total Payable"}
            </Typography>
            <Typography variant="subtitle2" fontWeight={700} color="#047857">
              {formatINR(summary.totalRepaymentAmount)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Stack spacing={1.2} sx={{ mb: 1.5 }}>
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" fontWeight={600} color="#334155">
              {language === "hi" ? "लोन राशि" : "Loan Amount"}
            </Typography>
            <Typography variant="caption" fontWeight={700} color="#3244e6">
              {formatINR(principal)}
            </Typography>
          </Stack>
          <Slider
            size="small"
            min={50000}
            max={10000000}
            step={50000}
            value={principal}
            onChange={(_, v) => setPrincipal(Number(v))}
            sx={{ color: "#3244e6" }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" fontWeight={600} color="#334155">
                {language === "hi" ? "ब्याज दर (% p.a.)" : "Interest Rate (% p.a.)"}
              </Typography>
              <Typography variant="caption" fontWeight={700} color="#3244e6">
                {rate}%
              </Typography>
            </Stack>
            <Slider
              size="small"
              min={7}
              max={28}
              step={0.25}
              value={rate}
              onChange={(_, v) => setRate(Number(v))}
              sx={{ color: "#3244e6" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" fontWeight={600} color="#334155">
                {language === "hi" ? "अवधि (महीने)" : "Tenure (Months)"}
              </Typography>
              <Typography variant="caption" fontWeight={700} color="#3244e6">
                {tenureMonths} mo ({(tenureMonths / 12).toFixed(1)} yrs)
              </Typography>
            </Stack>
            <Slider
              size="small"
              min={6}
              max={360}
              step={6}
              value={tenureMonths}
              onChange={(_, v) => setTenureMonths(Number(v))}
              sx={{ color: "#3244e6" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" fontWeight={600} color="#334155">
                {language === "hi" ? "अतिरिक्त मासिक प्रीपेमेंट" : "Extra Monthly Prepayment"}
              </Typography>
              <Typography variant="caption" fontWeight={700} color="#059669">
                {formatINR(extraMonthly)}/mo
              </Typography>
            </Stack>
            <Slider
              size="small"
              min={0}
              max={50000}
              step={1000}
              value={extraMonthly}
              onChange={(_, v) => setExtraMonthly(Number(v))}
              sx={{ color: "#10b981" }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={extraEmiPerYear}
                  onChange={(e) => setExtraEmiPerYear(e.target.checked)}
                />
              }
              label={
                <Typography variant="caption" fontWeight={600}>
                  {language === "hi" ? "+1 अतिरिक्त EMI प्रति वर्ष" : "+1 Extra EMI / Year"}
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </Stack>

      {prepayment && prepayment.interestSaved > 0 && (
        <Alert
          icon={<Savings fontSize="small" />}
          severity="success"
          sx={{ mb: 1.5, borderRadius: 2, py: 0.5, fontSize: "0.78rem" }}
        >
          <strong>
            {language === "hi" ? "प्रीपेमेंट बचत:" : "Prepayment Impact:"}
          </strong>{" "}
          Save <strong>{formatINR(prepayment.interestSaved)}</strong> in interest & close loan{" "}
          <strong>{prepayment.monthsSaved} months earlier</strong>!
        </Alert>
      )}

      {affordability && (
        <Alert severity={affordability.foirPercent > 60 ? "warning" : "info"} sx={{ mb: 1.5, borderRadius: 2, py: 0.5, fontSize: "0.78rem" }}>
          Post-loan FOIR: <strong>{affordability.foirPercent}%</strong> ({affordability.riskLevel})
        </Alert>
      )}

      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
        {yearlySchedule.length > 0 && (
          <Button
            size="small"
            onClick={() => setShowSchedule((prev) => !prev)}
            endIcon={showSchedule ? <ExpandLess /> : <ExpandMore />}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            {showSchedule
              ? language === "hi" ? "शेड्यूल छुपाएं" : "Hide Yearly Schedule"
              : language === "hi" ? "वार्षिक शेड्यूल देखें" : "View Yearly Schedule"}
          </Button>
        )}

        {onApplyWithTerms && (
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              onApplyWithTerms({
                loanType: data?.inputs?.loanType || data?.loanCategory,
                loanAmount: principal,
                tenureMonths,
              })
            }
            sx={{
              bgcolor: "#3244e6",
              "&:hover": { bgcolor: "#1d2ebd" },
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {language === "hi" ? "इस राशि के लिए आवेदन करें" : "Apply with These Terms"}
          </Button>
        )}
      </Stack>

      <Collapse in={showSchedule}>
        <TableContainer sx={{ mt: 1.5, maxHeight: 210, border: "1px solid #e2e8f0", borderRadius: 2 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Yr</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Principal</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Interest</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.74rem" }}>Closing Bal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {yearlySchedule.map((row) => (
                <TableRow key={row.year}>
                  <TableCell sx={{ fontSize: "0.74rem" }}>{row.year}</TableCell>
                  <TableCell sx={{ fontSize: "0.74rem" }}>{formatINR(row.principalPaid)}</TableCell>
                  <TableCell sx={{ fontSize: "0.74rem" }}>{formatINR(row.interestPaid)}</TableCell>
                  <TableCell sx={{ fontSize: "0.74rem" }}>{formatINR(row.closingBalance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>

      <Typography variant="caption" color="#64748b" sx={{ display: "block", mt: 1.2, fontSize: "0.7rem", lineHeight: 1.35 }}>
        {result?.disclaimer ||
          "Estimated calculation using reducing-balance methodology. Distinct from official lender sanction schedules."}
      </Typography>
    </Paper>
  );
}


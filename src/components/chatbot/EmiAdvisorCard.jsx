import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Collapse,
  LinearProgress,
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowForward,
  Calculate,
  ExpandLess,
  ExpandMore,
  Savings,
  TableChart,
} from "@mui/icons-material";
import { ChatbotAPI } from "../../apis/ChatbotAPI";

function formatINR(n) {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "₹0";
  return `₹${Math.round(Number(n)).toLocaleString("en-IN")}`;
}

function formatCompactINR(n) {
  const num = Number(n);
  if (!Number.isFinite(num) || num <= 0) return "₹0";
  if (num >= 10000000) {
    const cr = num / 10000000;
    return `₹${Number.isInteger(cr) ? cr : cr.toFixed(1)} Cr`;
  }
  if (num >= 100000) {
    const lk = num / 100000;
    return `₹${Number.isInteger(lk) ? lk : lk.toFixed(1)} L`;
  }
  if (num >= 1000) {
    const k = num / 1000;
    return `₹${Number.isInteger(k) ? k : k.toFixed(0)}K`;
  }
  return formatINR(num);
}

/**
 * Reusable slider control with value pill and padded track so thumbs never clip.
 */
function SliderField({
  label,
  valueDisplay,
  value,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  onChange,
  accentColor = "#3244e6",
  railColor = "#e0e7ff",
  pillBg = "#eef2ff",
  pillColor = "#1d2ebd",
  compact = false,
}) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ mb: 0.3 }}
      >
        <Typography
          variant="caption"
          fontWeight={600}
          color="#334155"
          sx={{
            fontSize: compact ? "0.74rem" : "0.77rem",
            lineHeight: 1.25,
          }}
        >
          {label}
        </Typography>
        <Box
          component="span"
          sx={{
            px: 1,
            py: 0.25,
            borderRadius: 1.5,
            bgcolor: pillBg,
            color: pillColor,
            fontSize: compact ? "0.72rem" : "0.75rem",
            fontWeight: 700,
            whiteSpace: "nowrap",
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {valueDisplay}
        </Box>
      </Stack>

      <Box sx={{ px: "8px" }}>
        <Slider
          size="small"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(_, v) => onChange(Number(v))}
          aria-label={label}
          sx={{
            color: accentColor,
            height: 6,
            py: 1,
            display: "block",
            "& .MuiSlider-rail": {
              bgcolor: railColor,
              opacity: 1,
              borderRadius: 99,
            },
            "& .MuiSlider-track": {
              border: "none",
              borderRadius: 99,
            },
            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              bgcolor: "#ffffff",
              border: `2.5px solid ${accentColor}`,
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.18)",
              "&:before": { display: "none" },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: `0 0 0 6px ${accentColor}26`,
              },
            },
          }}
        />
      </Box>

      {(minLabel || maxLabel) && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mt: -0.25, px: "2px" }}
        >
          <Typography variant="caption" color="#94a3b8" sx={{ fontSize: "0.64rem" }}>
            {minLabel}
          </Typography>
          <Typography variant="caption" color="#94a3b8" sx={{ fontSize: "0.64rem" }}>
            {maxLabel}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

SliderField.propTypes = {
  label: PropTypes.string.isRequired,
  valueDisplay: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  minLabel: PropTypes.string,
  maxLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  accentColor: PropTypes.string,
  railColor: PropTypes.string,
  pillBg: PropTypes.string,
  pillColor: PropTypes.string,
  compact: PropTypes.bool,
};

export default function EmiAdvisorCard({
  data,
  language = "en",
  isCompact = false,
  onApplyWithTerms,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const cardRef = useRef(null);
  const [measuredWidth, setMeasuredWidth] = useState(0);

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
    const el = cardRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width;
      if (width) setMeasuredWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const compact = Boolean(
    isCompact || isSmallScreen || (measuredWidth > 0 && measuredWidth < 500)
  );
  const isHi = language === "hi";

  const summary = result?.summary || {};
  const prepayment = result?.prepaymentSummary;
  const affordability = result?.affordability;
  const yearlySchedule = result?.yearlySchedule || [];

  const principalDisplayVal = Number(summary.principalAmount || principal) || 0;
  const interestDisplayVal = Number(summary.totalInterestPayable) || 0;
  const totalPayableDisplayVal =
    Number(summary.totalRepaymentAmount) || principalDisplayVal + interestDisplayVal;

  const ratioTotal = principalDisplayVal + interestDisplayVal;
  const principalPct =
    ratioTotal > 0 ? Math.round((principalDisplayVal / ratioTotal) * 1000) / 10 : 100;
  const interestPct =
    ratioTotal > 0 ? Math.max(0, Math.round((100 - principalPct) * 10) / 10) : 0;

  const minPrincipal = Math.min(50000, principal > 0 ? principal : 50000);
  const maxPrincipal = Math.max(10000000, Math.ceil(principal / 500000) * 500000);
  const minRate = Math.min(7, rate > 0 ? Math.floor(rate) : 7);
  const maxRate = Math.max(28, Math.ceil(rate));
  const maxTenure = Math.max(360, tenureMonths);
  const maxExtraMonthly = Math.max(50000, Math.ceil(extraMonthly / 10000) * 10000);

  const loanTypeTag = data?.inputs?.loanType || data?.loanCategory;

  const kpiCards = [
    {
      key: "emi",
      label: isHi ? "मासिक EMI" : "Monthly EMI",
      value: formatINR(summary.monthlyEmi),
      hero: true,
    },
    {
      key: "principal",
      label: isHi ? "मूलधन" : "Principal",
      value: formatINR(principalDisplayVal),
      bg: "#f8fafc",
      border: "#e2e8f0",
      labelColor: "#475569",
      valueColor: "#0f172a",
      dotColor: "#3244e6",
    },
    {
      key: "interest",
      label: isHi ? "कुल ब्याज" : "Total Interest",
      value: formatINR(interestDisplayVal),
      bg: "#fff7ed",
      border: "#fed7aa",
      labelColor: "#9a3412",
      valueColor: "#c2410c",
      dotColor: "#f97316",
    },
    {
      key: "total",
      label: isHi ? "कुल भुगतान" : "Total Payable",
      value: formatINR(totalPayableDisplayVal),
      bg: "#ecfdf5",
      border: "#a7f3d0",
      labelColor: "#065f46",
      valueColor: "#047857",
      dotColor: "#059669",
    },
  ];

  const scheduleToggleBtn = yearlySchedule.length > 0 && (
    <Button
      size="small"
      variant="outlined"
      fullWidth={compact}
      onClick={() => setShowSchedule((prev) => !prev)}
      startIcon={<TableChart sx={{ fontSize: 16 }} />}
      endIcon={showSchedule ? <ExpandLess /> : <ExpandMore />}
      sx={{
        color: "#1d2ebd",
        borderColor: "#c7d2fe",
        bgcolor: "#f8faff",
        "&:hover": {
          bgcolor: "#eef2ff",
          borderColor: "#3244e6",
        },
        textTransform: "none",
        borderRadius: 2,
        fontWeight: 600,
        fontSize: "0.78rem",
        py: 0.75,
        px: 1.5,
      }}
    >
      {showSchedule
        ? isHi
          ? "शेड्यूल छुपाएं"
          : "Hide Yearly Schedule"
        : isHi
          ? "वार्षिक शेड्यूल देखें"
          : "View Yearly Schedule"}
    </Button>
  );

  const applyTermsBtn = onApplyWithTerms && (
    <Button
      size="small"
      variant="contained"
      fullWidth={compact}
      endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
      onClick={() =>
        onApplyWithTerms({
          loanType: data?.inputs?.loanType || data?.loanCategory,
          loanAmount: principal,
          tenureMonths,
        })
      }
      sx={{
        background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
        color: "#ffffff",
        boxShadow: "0 4px 12px rgba(50, 68, 230, 0.25)",
        "&:hover": {
          background: "linear-gradient(135deg, #17259c 0%, #1d2ebd 100%)",
          boxShadow: "0 6px 16px rgba(50, 68, 230, 0.35)",
        },
        textTransform: "none",
        borderRadius: 2,
        fontWeight: 700,
        fontSize: "0.8rem",
        py: 0.8,
        px: 2,
        ml: !compact && yearlySchedule.length === 0 ? "auto" : 0,
      }}
    >
      {isHi ? "इस राशि के लिए आवेदन करें" : "Apply with These Terms"}
    </Button>
  );

  const tableHeadCellSx = {
    bgcolor: "#f1f5f9",
    color: "#0f172a",
    fontWeight: 700,
    fontSize: compact ? "0.68rem" : "0.74rem",
    py: 0.85,
    px: compact ? 0.9 : 1.5,
    whiteSpace: "nowrap",
    borderBottom: "1px solid #cbd5e1",
  };

  const tableBodyCellSx = {
    fontSize: compact ? "0.69rem" : "0.74rem",
    py: 0.7,
    px: compact ? 0.9 : 1.5,
    whiteSpace: "nowrap",
    fontVariantNumeric: "tabular-nums",
  };

  const scheduleCollapse = (
    <Collapse in={showSchedule}>
      <TableContainer
        sx={{
          mt: compact ? 0 : 1.5,
          maxHeight: 220,
          border: "1px solid #cbd5e1",
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeadCellSx}>{isHi ? "वर्ष" : "Yr"}</TableCell>
              <TableCell align="right" sx={tableHeadCellSx}>
                {isHi ? "मूलधन" : "Principal"}
              </TableCell>
              <TableCell align="right" sx={tableHeadCellSx}>
                {isHi ? "ब्याज" : "Interest"}
              </TableCell>
              <TableCell align="right" sx={tableHeadCellSx}>
                {isHi ? "बकाया राशि" : "Closing Bal"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {yearlySchedule.map((row) => (
              <TableRow
                key={row.year}
                sx={{
                  "&:nth-of-type(even)": { bgcolor: "#f8fafc" },
                  "&:hover": { bgcolor: "#eef2ff" },
                }}
              >
                <TableCell sx={{ ...tableBodyCellSx, fontWeight: 700, color: "#334155" }}>
                  {row.year}
                </TableCell>
                <TableCell align="right" sx={{ ...tableBodyCellSx, fontWeight: 600, color: "#0f172a" }}>
                  {formatINR(row.principalPaid)}
                </TableCell>
                <TableCell align="right" sx={{ ...tableBodyCellSx, color: "#c2410c" }}>
                  {formatINR(row.interestPaid)}
                </TableCell>
                <TableCell align="right" sx={{ ...tableBodyCellSx, fontWeight: 600, color: "#047857" }}>
                  {formatINR(row.closingBalance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Collapse>
  );

  return (
    <Paper
      ref={cardRef}
      elevation={0}
      sx={{
        mt: 1,
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid #dbeafe",
        bgcolor: "#ffffff",
        boxShadow: "0 6px 24px rgba(29, 46, 189, 0.07)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: compact ? 1.5 : 2,
          py: compact ? 1.15 : 1.35,
          background: "linear-gradient(135deg, #f8faff 0%, #eef2ff 100%)",
          borderBottom: "1px solid #e0e7ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Stack direction="row" spacing={1.1} alignItems="center" sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: compact ? 30 : 34,
              height: compact ? 30 : 34,
              borderRadius: 2,
              background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 10px rgba(50, 68, 230, 0.25)",
            }}
          >
            <Calculate sx={{ fontSize: compact ? 17 : 19 }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              color="#0f172a"
              sx={{ fontSize: compact ? "0.82rem" : "0.9rem", lineHeight: 1.25 }}
            >
              {isHi
                ? "अनुमानित EMI और रीपेमेंट सलाहकार"
                : "Estimated Repayment & EMI Advisor"}
            </Typography>
            <Typography
              variant="caption"
              color="#64748b"
              sx={{ display: "block", fontSize: "0.66rem", lineHeight: 1.2 }}
              noWrap
            >
              {loanTypeTag
                ? `${loanTypeTag} • ${isHi ? "रिड्यूसिंग बैलेंस" : "Reducing Balance"}`
                : isHi
                  ? "रिड्यूसिंग-बैलेंस EMI और प्रीपेमेंट सिम्युलेटर"
                  : "Interactive EMI & Prepayment Simulator"}
            </Typography>
          </Box>
        </Stack>

        {calculating ? (
          <Stack
            direction="row"
            spacing={0.6}
            alignItems="center"
            sx={{
              px: 1,
              py: 0.3,
              borderRadius: 99,
              bgcolor: "#dbeafe",
              flexShrink: 0,
            }}
          >
            <CircularProgress size={11} thickness={5} sx={{ color: "#1d2ebd" }} />
            <Typography variant="caption" color="#1d2ebd" fontWeight={700} sx={{ fontSize: "0.66rem" }}>
              {isHi ? "अपडेट..." : "Updating..."}
            </Typography>
          </Stack>
        ) : (
          !compact && (
            <Chip
              size="small"
              label={isHi ? "लाइव सिम्युलेटर" : "Live Simulator"}
              sx={{
                height: 22,
                bgcolor: "#ffffff",
                border: "1px solid #c7d2fe",
                color: "#3244e6",
                fontWeight: 700,
                fontSize: "0.66rem",
                flexShrink: 0,
              }}
            />
          )
        )}
      </Box>

      {/* Zero-shift Top Progress Indicator */}
      <Box sx={{ height: 3, bgcolor: "#f8faff" }}>
        {calculating && (
          <LinearProgress
            sx={{
              height: 3,
              bgcolor: "#e0e7ff",
              "& .MuiLinearProgress-bar": { bgcolor: "#3244e6" },
            }}
          />
        )}
      </Box>

      <Box sx={{ p: compact ? 1.5 : 2 }}>
        {/* KPI Summary Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: compact
              ? "repeat(2, minmax(0, 1fr))"
              : "repeat(4, minmax(0, 1fr))",
            gap: compact ? 1 : 1.25,
          }}
        >
          {kpiCards.map((card) =>
            card.hero ? (
              <Box
                key={card.key}
                sx={{
                  p: compact ? 1.1 : 1.25,
                  borderRadius: 2.2,
                  background: "linear-gradient(135deg, #1d2ebd 0%, #3244e6 100%)",
                  border: "1px solid #1d2ebd",
                  boxShadow: "0 6px 16px rgba(50, 68, 230, 0.22)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255, 255, 255, 0.88)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    mb: 0.3,
                  }}
                >
                  {card.label}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={800}
                  color="#ffffff"
                  sx={{
                    fontSize: compact ? "1.02rem" : "1.12rem",
                    lineHeight: 1.2,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {card.value}
                </Typography>
              </Box>
            ) : (
              <Box
                key={card.key}
                sx={{
                  p: compact ? 1.1 : 1.25,
                  borderRadius: 2.2,
                  bgcolor: card.bg,
                  border: `1px solid ${card.border}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  minWidth: 0,
                }}
              >
                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ mb: 0.3 }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: card.dotColor,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: card.labelColor,
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {card.label}
                  </Typography>
                </Stack>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{
                    color: card.valueColor,
                    fontSize: compact ? "0.92rem" : "0.98rem",
                    lineHeight: 1.2,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {card.value}
                </Typography>
              </Box>
            )
          )}
        </Box>

        {/* Principal vs Interest Visual Breakdown */}
        {ratioTotal > 0 && (
          <Box sx={{ mt: 1.35, mb: compact ? 1.4 : 1.75 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 0.5 }}
            >
              <Stack direction="row" spacing={0.6} alignItems="center">
                <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#3244e6" }} />
                <Typography
                  variant="caption"
                  color="#334155"
                  fontWeight={600}
                  sx={{ fontSize: "0.68rem", fontVariantNumeric: "tabular-nums" }}
                >
                  {isHi ? `मूलधन (${principalPct}%)` : `Principal (${principalPct}%)`}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.6} alignItems="center">
                <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#f97316" }} />
                <Typography
                  variant="caption"
                  color="#9a3412"
                  fontWeight={600}
                  sx={{ fontSize: "0.68rem", fontVariantNumeric: "tabular-nums" }}
                >
                  {isHi ? `ब्याज (${interestPct}%)` : `Interest (${interestPct}%)`}
                </Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                height: 7,
                borderRadius: 99,
                overflow: "hidden",
                bgcolor: "#ffedd5",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: `${principalPct}%`,
                  bgcolor: "#3244e6",
                  transition: "width 0.3s ease",
                }}
              />
              <Box
                sx={{
                  flex: 1,
                  bgcolor: "#f97316",
                }}
              />
            </Box>
          </Box>
        )}

        {/* Core Loan Parameter Sliders */}
        <Box
          sx={{
            p: compact ? 1.25 : 1.6,
            mb: compact ? 1.25 : 1.5,
            borderRadius: 2.5,
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <SliderField
            label={isHi ? "लोन राशि" : "Loan Amount"}
            valueDisplay={formatINR(principal)}
            value={principal}
            min={minPrincipal}
            max={maxPrincipal}
            step={50000}
            minLabel={formatCompactINR(minPrincipal)}
            maxLabel={formatCompactINR(maxPrincipal)}
            onChange={setPrincipal}
            compact={compact}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))",
              gap: compact ? 1.2 : 2.5,
              mt: 1.2,
            }}
          >
            <SliderField
              label={isHi ? "ब्याज दर (% p.a.)" : "Interest Rate (% p.a.)"}
              valueDisplay={`${rate}%`}
              value={rate}
              min={minRate}
              max={maxRate}
              step={0.25}
              minLabel={`${minRate}%`}
              maxLabel={`${maxRate}%`}
              onChange={setRate}
              compact={compact}
            />

            <SliderField
              label={isHi ? "अवधि (महीने)" : "Tenure (Months)"}
              valueDisplay={
                isHi
                  ? `${tenureMonths} माह • ${(tenureMonths / 12).toFixed(1)} वर्ष`
                  : `${tenureMonths} mo • ${(tenureMonths / 12).toFixed(1)} yrs`
              }
              value={tenureMonths}
              min={6}
              max={maxTenure}
              step={6}
              minLabel={isHi ? "6 माह" : "6 mo"}
              maxLabel={isHi ? `${Math.round(maxTenure / 12)} वर्ष` : `${Math.round(maxTenure / 12)} yrs`}
              onChange={setTenureMonths}
              compact={compact}
            />
          </Box>
        </Box>

        {/* Prepayment Optimizer Panel */}
        <Box
          sx={{
            p: compact ? 1.25 : 1.5,
            mb: 1.5,
            borderRadius: 2.5,
            bgcolor: "#f0fdf4",
            border: "1px solid #bbf7d0",
          }}
        >
          <Stack direction="row" spacing={0.7} alignItems="center" sx={{ mb: 1 }}>
            <Savings sx={{ fontSize: 15, color: "#059669" }} />
            <Typography
              variant="caption"
              fontWeight={700}
              color="#065f46"
              sx={{ fontSize: "0.72rem", letterSpacing: 0.2 }}
            >
              {isHi ? "प्रीपेमेंट और ब्याज बचत विकल्प" : "Prepayment & Interest Saver"}
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: compact ? "1fr" : "1.45fr 1fr",
              gap: compact ? 1.1 : 2,
              alignItems: "center",
            }}
          >
            <SliderField
              label={isHi ? "अतिरिक्त मासिक प्रीपेमेंट" : "Extra Monthly Prepayment"}
              valueDisplay={
                isHi ? `${formatINR(extraMonthly)}/माह` : `${formatINR(extraMonthly)}/mo`
              }
              value={extraMonthly}
              min={0}
              max={maxExtraMonthly}
              step={1000}
              minLabel="₹0"
              maxLabel={`${formatCompactINR(maxExtraMonthly)}/mo`}
              onChange={setExtraMonthly}
              accentColor="#059669"
              railColor="#d1fae5"
              pillBg="#dcfce7"
              pillColor="#047857"
              compact={compact}
            />

            <Box
              role="checkbox"
              aria-checked={extraEmiPerYear}
              tabIndex={0}
              onClick={() => setExtraEmiPerYear((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  setExtraEmiPerYear((prev) => !prev);
                }
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.1,
                py: 0.85,
                borderRadius: 2,
                border: extraEmiPerYear ? "1.5px solid #10b981" : "1px solid #cbd5e1",
                bgcolor: extraEmiPerYear ? "#dcfce7" : "#ffffff",
                cursor: "pointer",
                transition: "all 0.18s ease",
                userSelect: "none",
                minWidth: 0,
                "&:hover": {
                  borderColor: "#10b981",
                  bgcolor: extraEmiPerYear ? "#dcfce7" : "#f8fafc",
                },
              }}
            >
              <Checkbox
                size="small"
                checked={extraEmiPerYear}
                onChange={(e) => setExtraEmiPerYear(e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  p: 0.3,
                  color: "#94a3b8",
                  "&.Mui-checked": { color: "#059669" },
                }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="#0f172a"
                  sx={{ display: "block", fontSize: "0.73rem", lineHeight: 1.25 }}
                >
                  {isHi ? "+1 अतिरिक्त EMI / वर्ष" : "+1 Extra EMI / Year"}
                </Typography>
                <Typography
                  variant="caption"
                  color="#475569"
                  sx={{ display: "block", fontSize: "0.64rem", lineHeight: 1.2 }}
                >
                  {isHi ? "हर साल 1 अतिरिक्त किश्त" : "Pay 13 EMIs/yr & save"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Prepayment Impact Callout */}
        {prepayment && prepayment.interestSaved > 0 && (
          <Alert
            icon={<Savings fontSize="small" sx={{ color: "#059669" }} />}
            severity="success"
            sx={{
              mb: 1.5,
              borderRadius: 2,
              py: 0.6,
              fontSize: "0.77rem",
              bgcolor: "#ecfdf5",
              border: "1px solid #6ee7b7",
              color: "#065f46",
            }}
          >
            {isHi ? (
              <>
                <strong>प्रीपेमेंट बचत:</strong>{" "}
                <strong>{formatINR(prepayment.interestSaved)}</strong> ब्याज बचाएं और लोन{" "}
                <strong>{prepayment.monthsSaved} महीने पहले</strong> बंद करें!
              </>
            ) : (
              <>
                <strong>Prepayment Impact:</strong> Save{" "}
                <strong>{formatINR(prepayment.interestSaved)}</strong> in interest & close loan{" "}
                <strong>{prepayment.monthsSaved} months earlier</strong>!
              </>
            )}
          </Alert>
        )}

        {/* Affordability / FOIR Callout */}
        {affordability && (
          <Alert
            severity={affordability.foirPercent > 60 ? "warning" : "info"}
            sx={{ mb: 1.5, borderRadius: 2, py: 0.5, fontSize: "0.77rem" }}
          >
            {isHi ? "लोन के बाद FOIR:" : "Post-loan FOIR:"}{" "}
            <strong>{affordability.foirPercent}%</strong> ({affordability.riskLevel})
          </Alert>
        )}

        {/* Action Buttons & Collapsible Yearly Schedule */}
        {compact ? (
          <Stack spacing={1.1}>
            {scheduleToggleBtn}
            {scheduleCollapse}
            {applyTermsBtn}
          </Stack>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1.1,
                flexWrap: "wrap",
              }}
            >
              {scheduleToggleBtn}
              {applyTermsBtn}
            </Box>
            {scheduleCollapse}
          </>
        )}

        {/* Disclaimer */}
        <Typography
          variant="caption"
          color="#64748b"
          sx={{
            display: "block",
            mt: 1.3,
            pt: 1,
            borderTop: "1px dashed #e2e8f0",
            fontSize: "0.68rem",
            lineHeight: 1.4,
          }}
        >
          {result?.disclaimer ||
            "Estimated calculation using reducing-balance methodology. Distinct from official lender sanction schedules."}
        </Typography>
      </Box>
    </Paper>
  );
}

EmiAdvisorCard.propTypes = {
  data: PropTypes.shape({
    loanCategory: PropTypes.string,
    inputs: PropTypes.shape({
      principal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      annualRatePercent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      tenureMonths: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      loanType: PropTypes.string,
    }),
    summary: PropTypes.shape({
      monthlyEmi: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      principalAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      totalInterestPayable: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      totalRepaymentAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    prepaymentSummary: PropTypes.shape({
      interestSaved: PropTypes.number,
      monthsSaved: PropTypes.number,
    }),
    affordability: PropTypes.shape({
      foirPercent: PropTypes.number,
      riskLevel: PropTypes.string,
    }),
    yearlySchedule: PropTypes.arrayOf(
      PropTypes.shape({
        year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        principalPaid: PropTypes.number,
        interestPaid: PropTypes.number,
        closingBalance: PropTypes.number,
      })
    ),
    disclaimer: PropTypes.string,
  }),
  language: PropTypes.string,
  isCompact: PropTypes.bool,
  onApplyWithTerms: PropTypes.func,
};

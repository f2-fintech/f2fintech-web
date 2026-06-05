import { useState, useEffect, useRef } from "react";
import {
  Typography,
  FilledInput,
  Box,
  Container,
  InputAdornment,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";



/* ─── Constants ─────────────────────────────────────────────── */
const MIN_AMOUNT = 50000;
const MAX_AMOUNT = 600000000;
const MIN_RATE = 5;
const MAX_RATE = 30;
const MIN_YEARS = 1;
const MAX_YEARS = 30;

const PRIMARY = "#3244e6";
const PRIMARY_DARK = "#2536c4";
const PURPLE = "#B95FCC";
const TEAL = "#3DC8BA";

/* ─── Slider Styles (shared) ────────────────────────────────── */
const sliderSx = {
  color: PRIMARY,
  height: 8,
  padding: "10px 0",
  "& .MuiSlider-rail": { backgroundColor: "#E2E5FF", opacity: 1 },
  "& .MuiSlider-track": { backgroundColor: PRIMARY, border: "none" },
  "& .MuiSlider-thumb": {
    width: 26,
    height: 26,
    backgroundColor: "#fff",
    border: "none",
    boxShadow: "0 0 0 6px rgba(245, 245, 245, 0.7)",
    "&::before": {
      display: "none",
    },
    "&:hover, &.Mui-active": {
      boxShadow: "0 0 0 8px rgba(240, 240, 240, 0.9)",
    },
  },
};

/* ─── Input Styles (shared) ─────────────────────────────────── */
const inputSx = (width = 130) => ({
  width,
  background: "#fff",
  borderRadius: "8px",
  border: "1.5px solid #EAEAEA",
  "& input": {
    padding: "7px 10px",
    fontWeight: 800,
    fontSize: "1.05rem",
    color: PRIMARY,
    textAlign: "right",
  },
});

/* ─── Donut Chart ───────────────────────────────────────────── */
function DonutChart({ principal, interestAmt, total, size = 200 }) {
  const r = size * 0.37;
  const sw = size * 0.065;
  const circ = 2 * Math.PI * r;
  const safe = total > 0 ? total : 1;
  const pDash = (principal / safe) * circ;
  const iDash = (interestAmt / safe) * circ;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <Box sx={{ position: "relative", width: size, height: size, mx: "auto" }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)", display: "block" }}
      >
        {/* grey background ring */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#EEEEEE"
          strokeWidth={sw}
        />
        {/* principal arc */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={PRIMARY}
          strokeWidth={sw}
          strokeDasharray={`${Math.max(0, pDash - 3)} ${circ}`}
          strokeLinecap="butt"
        />
        {/* interest arc */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={TEAL}
          strokeWidth={sw}
          strokeDasharray={`${Math.max(0, iDash - 3)} ${circ}`}
          strokeDashoffset={-pDash}
          strokeLinecap="butt"
        />
      </svg>
      {/* center label */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 1,
        }}
      >
        <Typography sx={{ fontSize: size >= 250 ? "0.85rem" : "0.7rem", color: "#888", lineHeight: 1.2 }}>
          Total Amount<br />Payable
        </Typography>
        <Typography
          sx={{
            fontSize: (() => {
              const len = Number(total).toLocaleString("en-IN").length;
              if (size >= 250) {
                if (len > 14) return "0.9rem";
                if (len > 11) return "1.1rem";
                if (len > 8) return "1.3rem";
                return "1.6rem";
              }
              if (len > 14) return size < 180 ? "0.55rem" : "0.7rem";
              if (len > 11) return size < 180 ? "0.7rem" : "0.85rem";
              if (len > 8) return size < 180 ? "0.85rem" : "1.0rem";
              return size < 180 ? "1.0rem" : "1.25rem";
            })(),
            fontWeight: 700,
            color: "#222",
            mt: 0.5,
            width: "75%",
            wordWrap: "break-word",
          }}
        >
          ₹{Number(total).toLocaleString("en-IN")}
        </Typography>
      </Box>
    </Box>
  );
}

/* ─── Reusable Slider Row ───────────────────────────────────── */
function SliderRow({ label, subLabel, value, inputValue, min, max, step, minLabel, maxLabel, onChange, onInputChange, adornStart, adornEnd, inputWidth = 120 }) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5, flexWrap: "wrap", gap: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#333" }}>
          {label}
          {subLabel && (
            <Box component="span" sx={{ fontWeight: 400, fontSize: "0.85rem", color: "#888", ml: 0.5 }}>
              {subLabel}
            </Box>
          )}
        </Typography>
        <FilledInput
          value={inputValue ?? value}
          onChange={onInputChange}
          disableUnderline
          startAdornment={adornStart && <InputAdornment position="start" sx={{ color: "#555", mr: 0 }}>{adornStart}</InputAdornment>}
          endAdornment={adornEnd && <InputAdornment position="end" sx={{ color: "#555", ml: 0 }}>{adornEnd}</InputAdornment>}
          inputProps={{ style: { textAlign: "right", padding: "7px 8px" } }}
          sx={inputSx(inputWidth)}
        />
      </Box>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        sx={sliderSx}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.2 }}>
        <Typography variant="caption" sx={{ color: "#888" }}>{minLabel}</Typography>
        <Typography variant="caption" sx={{ color: "#888" }}>{maxLabel}</Typography>
      </Box>
    </Box>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function EMICalculator() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [amount, setAmount] = useState(500000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(9.99);

  const [emi, setEmi] = useState("0");
  const [totalPayable, setTotalPayable] = useState("0");
  const [totalInterest, setTotalInterest] = useState("0");

  const [extraEMIEnabled, setExtraEMIEnabled] = useState(false);
  const [interestSaved, setInterestSaved] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);

  const [activeNav, setActiveNav] = useState(0);
  const [activeLoan, setActiveLoan] = useState(0);

  const handleTabChange = (index) => {
    setActiveLoan(index);
    if (index === 0) {
      setAmount(500000); // 5 Lakh
      setRate(9.99);
    } else if (index === 1) {
      setAmount(50000); // 50 K
      setRate(9.99);
    } else if (index === 2) {
      setAmount(300000); // 3 Lakh
      setRate(8.5);
    } else if (index === 3) {
      setAmount(100000); // 1 Lakh
      setRate(8);
    }
  };

  /* ── calculation ── */
  useEffect(() => {
    if (amount < 1000 || rate <= 0 || years <= 0) {
      setEmi("0"); setTotalPayable("0"); setTotalInterest("0");
      setInterestSaved(0); setTimeSaved(0); return;
    }
    const r = rate / 12 / 100;
    const totalMonths = years * 12;
    const factor = Math.pow(1 + r, totalMonths);
    const e = (amount * r * factor) / (factor - 1);
    const tp = e * totalMonths;
    const baseInterest = tp - amount;

    setEmi(Math.round(e).toString());
    setTotalPayable(Math.round(tp).toString());
    setTotalInterest(Math.round(baseInterest).toString());

    if (extraEMIEnabled) {
      let currentPrincipal = amount;
      let totalInt = 0;
      let monthsCount = 0;

      while (currentPrincipal > 0 && monthsCount < totalMonths * 2) {
        monthsCount++;
        const intForMonth = currentPrincipal * r;
        totalInt += intForMonth;
        let pmt = e;

        if (monthsCount % 12 === 0) {
          pmt += e; // one extra EMI per year
        }

        const principalPayment = pmt - intForMonth;
        currentPrincipal -= principalPayment;
      }

      const savedInt = Math.round(baseInterest - totalInt);
      const savedTime = totalMonths - monthsCount;
      setInterestSaved(savedInt > 0 ? savedInt : 0);
      setTimeSaved(savedTime > 0 ? savedTime : 0);
    } else {
      setInterestSaved(0);
      setTimeSaved(0);
    }
  }, [amount, years, rate, extraEMIEnabled]);

  /* ── amount ─── */
  const onAmountInput = (e) => {
    const n = parseInt(e.target.value, 10);
    if (!isNaN(n)) setAmount(Math.min(n, MAX_AMOUNT));
    else if (e.target.value === "") setAmount(0);
  };

  /* ── rate ──── */
  const onRateInput = (e) => {
    const n = parseFloat(e.target.value);
    if (!isNaN(n)) setRate(Math.min(n, MAX_RATE));
    else if (e.target.value === "") setRate(0);
  };

  /* ── years ── */
  const onYearsInput = (e) => {
    const n = parseInt(e.target.value, 10);
    if (!isNaN(n)) setYears(Math.min(n, MAX_YEARS));
    else if (e.target.value === "") setYears(0);
  };

  const fmt = (v) => Number(v).toLocaleString("en-IN");

  /* ── nav labels ── */
  const navItems = ["Calculator", "FAQs", "Other Calculators", "Learning Hub"];
  const loanTypes = [
    "Doctor Loan EMI Calculator",
    "Personal Loan EMI Calculator",
    "Home Loan EMI Calculator",
    "Other Loan EMI Calculator",
  ];

  return (
    <Box sx={{ backgroundColor: "#F0F2F5", py: { xs: 3, md: 6 } }}>

      {/* ── Heading ── */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 }, px: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "1.8rem", md: "3.5rem" },
            fontWeight: 650,
            lineHeight: 1.1,
            color: "#1e293b",
            mb: 2,
            letterSpacing: "-0.04em",
          }}
        >
          Loan Planning{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #1f1681ff 0%, #102e7aff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Reimagined
          </span>
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.3rem" },
            color: "#64748b",
            fontFamily: "Poppins",
            fontWeight: 500,
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Experience financial clarity with our next-gen predictive engine.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>

        {/* ── Loan Type Tabs ── */}
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: { xs: 1, sm: 2, md: 1 },
            mb: { xs: 3, md: 4 },
            justifyContent: "center",
          }}
        >
          {loanTypes.map((tab, i) => (
            <Button
              key={i}
              onClick={() => handleTabChange(i)}
              sx={{
                flex: { xs: "1 1 45%", sm: "0 0 auto", md: "1 1 auto" },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 1, sm: 3, md: 1.5, lg: 2 },
                borderRadius: "4px",
                backgroundColor: activeLoan === i ? PRIMARY : "#fff",
                color: activeLoan === i ? "#fff" : "#666",
                border: activeLoan === i ? "none" : "1.5px solid #D5D5D5",
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: { xs: "0.55rem", sm: "0.82rem", md: "0.7rem", lg: "0.8rem" },
                textTransform: "none",
                letterSpacing: 0.3,
                whiteSpace: { xs: "normal", sm: "nowrap", md: "nowrap" },
                lineHeight: { xs: 1.2, sm: 1.5 },
                textAlign: "center",
                "&:hover": {
                  backgroundColor: activeLoan === i ? PRIMARY_DARK : "#F5F5F5",
                },
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>

        {/* ── Main Calculator Card ── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            background: "#fff",
            borderRadius: { xs: "12px", md: "16px" },
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          {/* ── LEFT: Inputs ── */}
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
              p: { xs: 3, sm: 4 },
              display: "flex",
              flexDirection: "column",
              gap: { xs: 3, sm: 4 },
              borderRight: { md: "1.5px solid #F0F0F0" },
            }}
          >
            <SliderRow
              label="Loan Amount"
              value={amount}
              inputValue={amount}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={10000}
              minLabel="₹50 K"
              maxLabel="₹60 Cr"
              adornStart="₹"
              inputWidth={isSmall ? 150 : 170}
              onChange={(_, v) => setAmount(v)}
              onInputChange={onAmountInput}
            />

            <SliderRow
              label="Interest Rate"
              value={rate}
              min={MIN_RATE}
              max={MAX_RATE}
              step={0.01}
              minLabel={`${MIN_RATE} %`}
              maxLabel={`${MAX_RATE} %`}
              adornEnd="%"
              inputWidth={isSmall ? 90 : 110}
              onChange={(_, v) => setRate(v)}
              onInputChange={onRateInput}
            />

            <SliderRow
              label="Loan Tenure"
              value={years}
              inputValue={years}
              min={MIN_YEARS}
              max={MAX_YEARS}
              step={1}
              minLabel={`${MIN_YEARS} Y`}
              maxLabel={`${MAX_YEARS} Y`}
              adornEnd="Years"
              inputWidth={isSmall ? 110 : 130}
              onChange={(_, v) => setYears(v)}
              onInputChange={onYearsInput}
            />

            <Box sx={{ mt: 1, mb: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={extraEMIEnabled}
                    onChange={(e) => setExtraEMIEnabled(e.target.checked)}
                    sx={{ color: PRIMARY, "&.Mui-checked": { color: PRIMARY } }}
                  />
                }
                label="Optimize with one extra EMI per year (Save more!)"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    fontWeight: 500,
                    color: "#444",
                  }
                }}
              />


            </Box>

            {/* ── EMI Result Bar ── */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                backgroundColor: "#FAFAFA",
                border: "1.5px solid #EBEBEB",
                borderRadius: "10px",
                px: { xs: 2.5, sm: 3 },
                py: { xs: 2, sm: 2.5 },
                gap: { xs: 2, sm: 0 },
                mt: { xs: 1, md: 0 },
              }}
            >
              <Box>
                <Typography sx={{ color: "#555", fontSize: { xs: "0.9rem", sm: "1rem" }, fontWeight: 500 }}>
                  Expected Monthly Installment *
                </Typography>
                <Typography
                  sx={{
                    color: PRIMARY,
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", sm: "1.8rem" },
                    mt: 0.2,
                    letterSpacing: "-0.5px",
                  }}
                >
                  ₹ {fmt(emi)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                href="https://f2fintech.com/application-form"
                sx={{
                  backgroundColor: PRIMARY,
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  px: { xs: 3, sm: 4 },
                  py: 1.4,
                  borderRadius: "8px",
                  alignSelf: { xs: "stretch", sm: "center" },
                  boxShadow: `0 4px 12px ${PRIMARY}44`,
                  "&:hover": { backgroundColor: PRIMARY_DARK, boxShadow: `0 6px 16px ${PRIMARY}55` },
                }}
              >
                Apply Now
              </Button>
            </Box>
          </Box>

          {/* ── RIGHT: Chart Panel ── */}
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
              p: { xs: 3, sm: 4 },
              pt: { md: 8 },
              ml: { md: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
              gap: 3,
              borderTop: { xs: "1.5px solid #F0F0F0", md: "none" },
            }}
          >

            <DonutChart
              principal={amount}
              interestAmt={Number(totalInterest)}
              total={Number(totalPayable)}
              size={isSmall ? 230 : 300}
            />

            {/* Legend */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "row" },
                justifyContent: "space-around",
                width: "100%",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {[
                { color: PRIMARY, label: "Principal Amount", value: fmt(amount) },
                { color: TEAL, label: "Interest Amount", value: fmt(totalInterest) },
              ].map((item) => (
                <Box key={item.label} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.4 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                        mr: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ color: "#777", fontSize: "0.82rem" }}>{item.label}</Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: "#222", fontSize: "1rem", ml: 2.8 }}>
                    ₹{item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {extraEMIEnabled && interestSaved > 0 && (
              <Box
                sx={{
                  width: "100%",
                  mt: 2,
                  p: { xs: 2, sm: 2.5 },
                  backgroundColor: PRIMARY,
                  borderRadius: "12px",
                  textAlign: "center",
                  boxShadow: `0 4px 14px ${PRIMARY}40`,
                }}
              >
                <Typography
                  sx={{
                    color: "#4ade80",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Smart Optimization Results
                </Typography>
                <Typography sx={{ color: "#fff", fontSize: { xs: "1.3rem", sm: "1.5rem" }, fontWeight: 700, mb: 0.5 }}>
                  Save ₹{fmt(interestSaved)}
                </Typography>
                <Typography sx={{ color: "#4ade80", fontSize: "0.95rem", fontWeight: 600 }}>
                  Repay {timeSaved} Months Faster
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* ── Disclaimer ── */}
        <Typography
          sx={{
            mt: { xs: 2, md: 3 },
            fontSize: "0.78rem",
            color: "#999",
            textAlign: "center",
            px: 2,
          }}
        >
          *Interactive projections based on current market trends.
        </Typography>
      </Container>
    </Box>
  );
}
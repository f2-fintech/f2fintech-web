import { useState, useEffect, useRef, useCallback } from "react";
import {
  Typography,
  FilledInput,
  Box,
  Container,
  InputAdornment,
  Button,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import ButtonComp from "../common/button/Button";

let timeout;
const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Define constants for the loan amount range for clarity and easy maintenance
const MIN_LOAN_AMOUNT = 100000;
const MAX_LOAN_AMOUNT = 600000000;

function EMICalculator() {
  const [amount, setAmount] = useState(500000);
  const [years, setYears] = useState(3);
  const [interest, setInterest] = useState(10);
  const [monthlyEMI, setMonthlyEMI] = useState("");
  const [totalpayable, setTotalPayable] = useState("");
  const [totalInterest, setTotalInterest] = useState("");

  const [calculationMode, setCalculationMode] = useState("emi");
  const [customEMI, setCustomEMI] = useState("");
  const [calculatedTenure, setCalculatedTenure] = useState("");
  const [extraEMIEnabled, setExtraEMIEnabled] = useState(false);
  const [interestSaved, setInterestSaved] = useState("");
  const [timeSaved, setTimeSaved] = useState("");

  const isMobile = window.innerWidth <= 480;
  const [isVisible, setIsVisible] = useState(isMobile);
  const textRef = useRef(null);

  const calculateAmountFromSlider = (sliderValue) => {
    const range = MAX_LOAN_AMOUNT - MIN_LOAN_AMOUNT;
    const calculatedAmount = MIN_LOAN_AMOUNT + (sliderValue / 100) * range;
    return Math.round(calculatedAmount);
  };

  const calculateSliderValueFromAmount = () => {
    if (amount < MIN_LOAN_AMOUNT) return 0;
    if (amount > MAX_LOAN_AMOUNT) return 100;
    const range = MAX_LOAN_AMOUNT - MIN_LOAN_AMOUNT;
    return ((amount - MIN_LOAN_AMOUNT) / range) * 100;
  };

  const calculateTenureFromEMI = (loanAmount, monthlyEMI, annualRate) => {
    const r = annualRate / 12 / 100;

    const minEMI = loanAmount * r;
    if (monthlyEMI <= minEMI) {
      return null;
    }

    const numerator = Math.log(monthlyEMI / (monthlyEMI - loanAmount * r));
    const denominator = Math.log(1 + r);
    const tenureInMonths = numerator / denominator;

    return tenureInMonths;
  };

  const calculateExtraEMIImpact = (
    emi,
    tenureMonths,
    annualRate,
    loanAmount
  ) => {
    const r = annualRate / 12 / 100;
    const totalPaymentStandard = emi * tenureMonths;
    const totalInterestStandard = totalPaymentStandard - loanAmount;
    let balance = loanAmount;
    let monthsPassed = 0;
    let totalInterestPaid = 0;
    while (balance > 0.01 && monthsPassed < tenureMonths * 2) {
      const interestForMonth = balance * r;
      const principalForMonth = emi - interestForMonth;
      balance -= principalForMonth;
      totalInterestPaid += interestForMonth;
      monthsPassed++;
      if (monthsPassed % 12 === 0 && balance > 0) {
        balance -= emi;
        if (balance < 0) balance = 0;
      }
      if (balance < 0) balance = 0;
    }
    const monthsSaved = Math.max(0, tenureMonths - monthsPassed);
    const interestSavedAmount = Math.max(
      0,
      totalInterestStandard - totalInterestPaid
    );
    return {
      reducedTenureMonths: monthsPassed,
      interestSaved: interestSavedAmount,
      timeSavedMonths: Math.round(monthsSaved),
    };
  };

  const handleRangeChange = (event) => {
    const sliderValue = parseFloat(event.target.value);
    const calculatedAmount = calculateAmountFromSlider(sliderValue);
    setAmount(calculatedAmount);
  };

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "" || inputValue === undefined) {
      setAmount(0);
      return;
    }
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= MAX_LOAN_AMOUNT) {
      setAmount(numValue);
    } else if (numValue > MAX_LOAN_AMOUNT) {
      setAmount(MAX_LOAN_AMOUNT);
    }
  };

  // --- START OF CHANGES ---

  // UPDATED: Years handler now allows clearing the input (sets state to 0)
  const handleYearsChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "" || inputValue === undefined) {
      setYears(0);
      return;
    }
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 30) {
      setYears(numValue);
    } else if (numValue > 30) {
      setYears(30);
    }
  };

  // UPDATED: Interest handler now allows clearing the input (sets state to 0)
  const handleInterestChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "" || inputValue === undefined) {
      setInterest(0);
      return;
    }
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setInterest(numValue);
    } else if (numValue > 100) {
      setInterest(100);
    }
  };

  const handleCustomEMIChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "" || inputValue === undefined) {
      setCustomEMI("");
      return;
    }
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= 0) {
      setCustomEMI(numValue);
    }
  };

  // UPDATED: Main calculation function now checks for valid interest and tenure
  const calculate = () => {
    const principal = amount;

    // Helper to reset all calculated values to 0 or empty
    const resetCalculations = () => {
      setMonthlyEMI("0");
      setTotalPayable("0");
      setTotalInterest("0");
      setCalculatedTenure("");
      setInterestSaved("");
      setTimeSaved("");
    };

    // Check for minimum required values before calculating
    if (
      principal < MIN_LOAN_AMOUNT ||
      interest < 1 ||
      (calculationMode === "emi" && years < 1)
    ) {
      resetCalculations();
      return;
    }

    const annualInterestRate = interest / 100;
    const monthlyInterestRate = annualInterestRate / 12;

    if (calculationMode === "emi") {
      const numberOfMonths = years * 12;
      if (monthlyInterestRate === 0) {
        const calculatedEMI = principal / numberOfMonths;
        setMonthlyEMI(Math.round(calculatedEMI).toString());
        setTotalPayable(principal.toString());
        setTotalInterest("0");
      } else {
        const factor = Math.pow(1 + monthlyInterestRate, numberOfMonths);
        const calculatedEMI =
          (principal * monthlyInterestRate * factor) / (factor - 1);
        const totalPayable = calculatedEMI * numberOfMonths;
        const totalInt = totalPayable - principal;
        setMonthlyEMI(Math.round(calculatedEMI).toString());
        setTotalPayable(Math.round(totalPayable).toString());
        setTotalInterest(Math.round(totalInt).toString());
        if (extraEMIEnabled && monthlyInterestRate > 0) {
          const extraImpact = calculateExtraEMIImpact(
            calculatedEMI,
            numberOfMonths,
            interest,
            principal
          );
          setInterestSaved(Math.round(extraImpact.interestSaved).toString());
          setTimeSaved(extraImpact.timeSavedMonths);
        }
      }
    } else {
      if (customEMI && customEMI > 0) {
        if (monthlyInterestRate === 0) {
          const tenureMonths = principal / customEMI;
          setCalculatedTenure(
            `${(tenureMonths / 12).toFixed(1)} years (${Math.round(
              tenureMonths
            )} months)`
          );
          setTotalPayable(Math.round(customEMI * tenureMonths).toString());
          setTotalInterest("0");
        } else {
          const tenureMonths = calculateTenureFromEMI(
            principal,
            customEMI,
            interest
          );
          if (tenureMonths && tenureMonths > 0 && tenureMonths < 1200) {
            const tenureYears = tenureMonths / 12;
            const totalPayable = customEMI * tenureMonths;
            const totalInt = totalPayable - principal;
            setCalculatedTenure(
              `${tenureYears.toFixed(1)} years (${Math.round(
                tenureMonths
              )} months)`
            );
            setTotalPayable(Math.round(totalPayable).toString());
            setTotalInterest(Math.round(totalInt).toString());
            if (extraEMIEnabled) {
              const extraImpact = calculateExtraEMIImpact(
                customEMI,
                tenureMonths,
                interest,
                principal
              );
              setInterestSaved(
                Math.round(extraImpact.interestSaved).toString()
              );
              setTimeSaved(extraImpact.timeSavedMonths);
            }
          } else {
            setCalculatedTenure("EMI too low to repay loan");
            setTotalPayable("0");
            setTotalInterest("0");
          }
        }
      } else {
        setCalculatedTenure("Enter EMI amount");
        setTotalPayable("0");
        setTotalInterest("0");
      }
    }
  };

  // --- END OF CHANGES ---

  const debouncedCalculate = useCallback(debounce(calculate, 300), [
    amount,
    years,
    interest,
    calculationMode,
    customEMI,
    extraEMIEnabled,
  ]);

  useEffect(() => {
    debouncedCalculate();
  }, [amount, years, interest, calculationMode, customEMI, extraEMIEnabled]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (textRef.current) {
      observer.observe(textRef.current);
    }
    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  const theme = {
    palette: {
      text: { primary: "#000000" },
      whitetext: { white: "#ffffff", black: "#000000", secondary: "#666666" },
      secondary: { main: "#3244e6" },
    },
  };

  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );

  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: { xs: "20px", md: "40px" },
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
      }}
    >
      {/* Unique Animated Background Blobs */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(50, 68, 230, 0.1) 0%, rgba(50, 68, 230, 0) 70%)",
          borderRadius: "50%",
          zIndex: 0,
          filter: "blur(60px)",
        }}
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(94, 109, 240, 0.1) 0%, rgba(94, 109, 240, 0) 70%)",
          borderRadius: "50%",
          zIndex: 0,
          filter: "blur(60px)",
        }}
        component={motion.div}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ rotateY: 2, rotateX: -2 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "1200px", zIndex: 1, perspective: "1000px" }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
            px: 2,
          }}
        >
          <Typography
            fontWeight="900"
            fontFamily="'Outfit', sans-serif"
            sx={{
              fontSize: { xs: "2.2rem", sm: "3rem", md: "4rem" },
              lineHeight: 1.1,
              color: "#1e293b",
              mb: 2,
              letterSpacing: "-0.04em",
              textShadow: "0 10px 20px rgba(0,0,0,0.05)",
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

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(30px)",
            borderRadius: "40px",
            boxShadow: "0 40px 100px -20px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.5)",
            overflow: "hidden",
            width: "100%",
            transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          {/* Left Section: Inputs */}
          <Box
            sx={{
              flex: 1.2,
              p: { xs: 4, md: 8 },
              display: "flex",
              flexDirection: "column",
              gap: 5,
              background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(241,245,249,0.5) 100%)",
            }}
          >
            {/* Mode Toggle */}
            <Box
              sx={{
                display: "inline-flex",
                alignSelf: "center",
                background: "#e2e8f0",
                borderRadius: "20px",
                p: "6px",
                mb: 2,
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
              }}
            >
              {["emi", "tenure"].map((mode) => (
                <Button
                  key={mode}
                  onClick={() => setCalculationMode(mode)}
                  sx={{
                    px: 5,
                    py: 1.2,
                    borderRadius: "16px",
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    letterSpacing: 1,
                    fontWeight: 800,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    backgroundColor: calculationMode === mode ? "white" : "transparent",
                    color: calculationMode === mode ? "#3244e6" : "#64748b",
                    boxShadow: calculationMode === mode ? "0 10px 20px -5px rgba(50, 68, 230, 0.2)" : "none",
                    "&:hover": { backgroundColor: calculationMode === mode ? "white" : "rgba(255,255,255,0.4)" },
                  }}
                >
                  {mode}
                </Button>
              ))}
            </Box>

            {/* Input Groups with Hover Effects */}
            {[
              { label: "Loan Amount", value: amount, change: handleAmountChange, slider: calculateSliderValueFromAmount(), max: 100, step: 0.1, adorn: "₹", key: "amount" },
              { label: "Interest Rate", value: interest, change: handleInterestChange, slider: interest, min: 1, max: 30, step: 0.1, adorn: "%", key: "interest", isEnd: true },
            ].map((input) => (
              <Box
                key={input.key}
                component={motion.div}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography fontWeight="700" color="#1e293b" sx={{ fontSize: "1rem", letterSpacing: -0.5 }}>{input.label}</Typography>
                  <FilledInput
                    value={input.value || ""}
                    onChange={input.change}
                    startAdornment={!input.isEnd && <InputAdornment position="start" sx={{ color: "#3244e6", fontWeight: 800, fontSize: "1.1rem" }}>{input.adorn}</InputAdornment>}
                    endAdornment={input.isEnd && <InputAdornment position="end" sx={{ color: "#3244e6", fontWeight: 800, fontSize: "1.1rem" }}>{input.adorn}</InputAdornment>}
                    disableUnderline
                    sx={{
                      width: "160px",
                      height: "50px",
                      borderRadius: "15px",
                      backgroundColor: "white",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.06)",
                      border: "2px solid #f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      "& input": {
                        textAlign: "right",
                        fontWeight: 800,
                        color: "#3244e6",
                        fontSize: "1.1rem",
                        pt: 0,
                        pb: 0
                      },
                      "&:focus-within": { borderColor: "#3244e6", boxShadow: "0 0 0 4px rgba(50, 68, 230, 0.1)" },
                    }}
                  />
                </Box>
                <Slider
                  value={input.slider}
                  min={input.min || 0}
                  max={input.max}
                  step={input.step}
                  onChange={(e, val) => input.key === "amount" ? handleRangeChange({ target: { value: val } }) : setInterest(val)}
                  sx={{
                    color: "#3244e6",
                    height: 8,
                    "& .MuiSlider-rail": { opacity: 0.1, backgroundColor: "#3244e6" },
                    "& .MuiSlider-thumb": {
                      width: 28,
                      height: 28,
                      backgroundColor: "#fff",
                      boxShadow: "0 10px 20px rgba(50, 68, 230, 0.3)",
                      "&:before": { display: "none" },
                      "&:hover, &.Mui-active": { boxShadow: "0 0 0 10px rgba(50, 68, 230, 0.1)" },
                    },
                  }}
                />
              </Box>
            ))}

            {/* Tenure / Custom EMI */}
            {calculationMode === "emi" ? (
              <Box component={motion.div} whileHover={{ x: 5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography fontWeight="700" color="#1e293b" sx={{ fontSize: "1rem" }}>Loan Tenure</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FilledInput
                      value={years || ""}
                      onChange={handleYearsChange}
                      disableUnderline
                      sx={{
                        width: "100px",
                        height: "50px",
                        borderRadius: "15px",
                        backgroundColor: "white",
                        border: "2px solid #f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        "& input": {
                          textAlign: "center",
                          fontWeight: 800,
                          color: "#3244e6",
                          fontSize: "1.1rem",
                          pt: 0,
                          pb: 0,
                        },
                      }}
                    />
                    <Typography fontWeight="700" color="#64748b">Years</Typography>
                  </Box>
                </Box>
                <Slider
                  value={years}
                  min={1}
                  max={30}
                  step={0.5}
                  onChange={(e, val) => setYears(val)}
                  sx={{ color: "#3244e6", height: 8 }}
                />
              </Box>
            ) : (
              <Box component={motion.div} whileHover={{ x: 5 }}>
                <Typography fontWeight="700" color="#1e293b" sx={{ fontSize: "1rem", mb: 2 }}>Desired Monthly Payment</Typography>
                <FilledInput
                  value={customEMI}
                  onChange={handleCustomEMIChange}
                  startAdornment={<InputAdornment position="start" sx={{ color: "#3244e6", fontWeight: 900, fontSize: "1.5rem" }}>₹</InputAdornment>}
                  fullWidth
                  disableUnderline
                  sx={{
                    height: "65px",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    border: "2px solid #3244e6",
                    boxShadow: "0 10px 30px -10px rgba(50, 68, 230, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    "& input": {
                      fontWeight: 900,
                      color: "#3244e6",
                      fontSize: "1.5rem",
                      pt: 0,
                      pb: 0
                    },
                  }}
                />
              </Box>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={extraEMIEnabled}
                  onChange={(e) => setExtraEMIEnabled(e.target.checked)}
                  sx={{ color: "#3244e6", "&.Mui-checked": { color: "#3244e6" } }}
                />
              }
              label={
                <Typography sx={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 500 }}>
                  Optimize with one extra EMI per year (Save more!)
                </Typography>
              }
            />
          </Box>

          {/* Right Section: Results */}
          <Box
            sx={{
              flex: 0.9,
              background: "#3244e6",
              p: { xs: 5, md: 8 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative Inner Glow */}
            <Box sx={{ position: "absolute", top: "-20%", right: "-20%", width: "100%", height: "100%", background: "radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)", filter: "blur(40px)" }} />

            <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 1, fontWeight: 700, fontSize: "0.75rem" }}>
              {calculationMode === "emi" ? "Expected Monthly Installment" : "Projected Repayment Period"}
            </Typography>

            <motion.div
              key={monthlyEMI + calculatedTenure}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.8rem" },
                  fontWeight: 900,
                  my: 2,
                  fontFamily: "'Outfit', sans-serif",
                  background: "linear-gradient(135deg, #fff 0%, #cbd5e1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                  letterSpacing: -2,
                }}
              >
                {calculationMode === "emi" ? `₹${monthlyEMI}` : calculatedTenure}
              </Typography>
            </motion.div>

            <Box sx={{ width: "100%", mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
              {[
                { label: "Total Interest Payable", value: `₹${totalInterest}`, color: "#ffffff" },
                { label: "Total Amount Repayable", value: `₹${Math.round(totalpayable)}`, color: "#ffffff" }
              ].map((card, idx) => (
                <Box
                  key={idx}
                  component={motion.div}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  sx={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "24px",
                    p: 3,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "white", fontWeight: 600, textAlign: "left" }}>{card.label}</Typography>
                  <Typography variant="h6" fontWeight="800" sx={{ color: "white" }}>{card.value}</Typography>
                </Box>
              ))}
            </Box>

            {extraEMIEnabled && interestSaved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ width: "100%", marginTop: "32px" }}
              >
                <Box
                  sx={{
                    p: 3,
                    background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 100%)",
                    borderRadius: "24px",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#4ade80", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>Smart Optimization Results</Typography>
                  <Typography variant="h6" sx={{ color: "#fff", fontWeight: 800 }}>
                    Save ₹{interestSaved}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#4ade80", fontWeight: 600, opacity: 0.9 }}>
                    Repay {timeSaved} Months Faster
                  </Typography>
                </Box>
              </motion.div>
            )}

            <Typography variant="caption" sx={{ mt: 4, opacity: 1, fontStyle: "italic", maxWidth: "250px" }}>
              *Interactive projections based on current market trends.
            </Typography>
          </Box>
        </Box>
      </motion.div>

      <Box
        sx={{
          mt: 8,
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "4px",
            background: "#3244e6",
            borderRadius: "2px",
            opacity: 0.3
          }
        }}
      >
        <ButtonComp />
      </Box>
    </Container >
  );
}

export default EMICalculator;
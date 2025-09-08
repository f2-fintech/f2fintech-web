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
} from "@mui/material";
import ButtonComp from "../common/button/Button";

// Mock ButtonComp component
// const ButtonComp = () => (
//   <Button
//     variant="contained"
//     sx={{
//       background: "#3244e6",
//       color: "white",
//       padding: "10px 30px",
//       borderRadius: "25px",
//       fontSize: "1rem",
//       "&:hover": {
//         background: "#2835c7",
//       },
//     }}
//   >
//     Apply Now
//   </Button>
// );

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

  const calculateExtraEMIImpact = (emi, tenureMonths, annualRate, loanAmount) => {
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
    const interestSavedAmount = Math.max(0, totalInterestStandard - totalInterestPaid);
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
        const calculatedEMI = (principal * monthlyInterestRate * factor) / (factor - 1);
        const totalPayable = calculatedEMI * numberOfMonths;
        const totalInt = totalPayable - principal;
        setMonthlyEMI(Math.round(calculatedEMI).toString());
        setTotalPayable(Math.round(totalPayable).toString());
        setTotalInterest(Math.round(totalInt).toString());
        if (extraEMIEnabled && monthlyInterestRate > 0) {
          const extraImpact = calculateExtraEMIImpact(calculatedEMI, numberOfMonths, interest, principal);
          setInterestSaved(Math.round(extraImpact.interestSaved).toString());
          setTimeSaved(extraImpact.timeSavedMonths);
        }
      }
    } else {
      if (customEMI && customEMI > 0) {
        if (monthlyInterestRate === 0) {
          const tenureMonths = principal / customEMI;
          setCalculatedTenure(`${(tenureMonths / 12).toFixed(1)} years (${Math.round(tenureMonths)} months)`);
          setTotalPayable(Math.round(customEMI * tenureMonths).toString());
          setTotalInterest("0");
        } else {
          const tenureMonths = calculateTenureFromEMI(principal, customEMI, interest);
          if (tenureMonths && tenureMonths > 0 && tenureMonths < 1200) {
            const tenureYears = tenureMonths / 12;
            const totalPayable = customEMI * tenureMonths;
            const totalInt = totalPayable - principal;
            setCalculatedTenure(`${tenureYears.toFixed(1)} years (${Math.round(tenureMonths)} months)`);
            setTotalPayable(Math.round(totalPayable).toString());
            setTotalInterest(Math.round(totalInt).toString());
            if (extraEMIEnabled) {
              const extraImpact = calculateExtraEMIImpact(customEMI, tenureMonths, interest, principal);
              setInterestSaved(Math.round(extraImpact.interestSaved).toString());
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

  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: { sm: "110vh", md: "140vh" },
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "30px",
        margin: {
          xs: "0px",
          sm: "30px 0px 50px",
          md: "0px 0px 50px",
          xl: "30px 0px 50px",
        },
      }}
    >
      <Typography
        fontWeight="bold"
        fontFamily="Poppins"
        textAlign="center"
        sx={{
          fontSize: {
            xs: "2rem",
            sm: "2rem",
            md: "2.3rem",
            lg: "2.5rem",
            xl: "3rem",
          },
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          color: theme.palette.text.primary,
          paddingBottom: "3rem",
          px: 2,
        }}
      >
        <span
          style={{
            marginRight: "10px",
            background: "#3244e6",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Happy place
        </span>
        to apply for your loan
      </Typography>

      <Box
        style={{
          transform: isMobile ? "translateX(0)" : "translateX(0)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-evenly",
          width: "90%",
          borderRadius: "10px",
          boxShadow: isMobile
            ? "none"
            : `0 0 10px ${theme.palette.secondary.main}`,
          gap: isMobile ? "20px" : "0px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left box */}
        <Box
          sx={{
            height: { xs: "70vh", sm: "85vh", md: "inherit" },
            width: "100%",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: isMobile ? "10px" : "10px 0px 0px 10px",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "90%",
              width: "90%",
              padding: "10px 20px",
            }}
          >
            {/* Mode Toggle */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#f2f5ff",
                  borderRadius: "25px",
                  padding: "5px",
                  border: "1px solid #aaa",
                  mt: 2,
                }}
              >
                <Button
                  variant={calculationMode === "emi" ? "contained" : "text"}
                  onClick={() => setCalculationMode("emi")}
                  sx={{
                    backgroundColor:
                      calculationMode === "emi" ? "#3244e6" : "transparent",
                    color: calculationMode === "emi" ? "white" : "black",
                    borderRadius: "20px",
                    px: 3,
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                >
                  Calculate EMI
                </Button>
                <Button
                  variant={calculationMode === "tenure" ? "contained" : "text"}
                  onClick={() => setCalculationMode("tenure")}
                  sx={{
                    backgroundColor:
                      calculationMode === "tenure" ? "#3244e6" : "transparent",
                    color: calculationMode === "tenure" ? "white" : "black",
                    borderRadius: "20px",
                    px: 3,
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                >
                  Calculate Tenure
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "12vh",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "4vw", sm: "3vw", md: "2vw" },
                  color: theme.palette.whitetext.secondary,
                  fontFamily: "DM Sans",
                  fontWeight: 600,
                }}
              >
                How much are you looking for?
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "3vw", sm: "2.2vw", md: "1vw" },
                  color: theme.palette.whitetext.secondary,
                }}
              >
                Know your cost of lending.
              </Typography>
            </Box>

            {/* Loan Amount */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                height: "20vh",
                mt: {
                  xs: 6,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "3vw", sm: "2.5vw", md: "1vw" },
                  color: theme.palette.whitetext.black,
                  fontFamily: "Poppins",
                }}
              >
                Loan Amount
              </Typography>
              <FilledInput
                type="number"
                disableUnderline
                sx={{
                  width: { xs: "50%", sm: "44%", md: "35%" },
                  height: { xs: "35px", sm: "40px", md: "50px" },
                  fontSize: { md: "16px", sm: "16px", xs: ".8rem" },
                  borderRadius: "40px",
                  border: "1px solid #989898",
                  color: theme.palette.whitetext.black,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  overflow: "hidden",
                  padding: "0",
                  backgroundColor: "white",
                }}
                inputProps={{
                  min: 0,
                  max: MAX_LOAN_AMOUNT,
                  style: { padding: "0 10px" },
                }}
                onChange={handleAmountChange}
                value={amount || ""}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
              />
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={calculateSliderValueFromAmount()}
                onChange={handleRangeChange}
                style={{
                  width: "80%",
                  flexGrow: 1,
                  accentColor: theme.palette.secondary.main,
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "2.5vw", sm: "1.8vw", md: "0.8vw" },
                  color: "black",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>₹1L</span>
                <span>₹60Cr</span>
              </Typography>
            </Box>

            {/* Interest Rate */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                height: "20vh",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "3vw", sm: "2.5vw", md: "1vw" },
                  color: theme.palette.whitetext.black,
                  fontFamily: "Poppins",
                }}
              >
                Interest Rate (%)
              </Typography>
              <FilledInput
                type="number"
                disableUnderline={true}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: { xs: "35%", sm: "40%", md: "35%" },
                  height: { xs: "35px", sm: "40px", md: "50px" },
                  fontSize: { md: "16px", sm: "16px", xs: ".8rem" },
                  border: "1px solid #989898",
                  borderRadius: "40px",
                  color: theme.palette.whitetext.black,
                  textDecoration: "none",
                  backgroundColor: "white",
                }}
                inputProps={{
                  style: { padding: "0 10px" },
                  min: 0, // UPDATED: Allow 0 in input field
                  max: 100,
                  step: 0.1,
                }}
                onChange={handleInterestChange}
                value={interest || ""} // UPDATED: Show empty for 0
                endAdornment={
                  <InputAdornment position="end">%</InputAdornment>
                }
              />
              <input
                type="range"
                min="1" // Slider still represents the valid calculation range
                max="100"
                step="0.1"
                value={interest}
                onChange={(e) => setInterest(parseFloat(e.target.value))}
                style={{
                  width: "80%",
                  flexGrow: 1,
                  accentColor: theme.palette.secondary.main,
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "2.5vw", sm: "1.8vw", md: "0.8vw" },
                  color: "black",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>1%</span>
                <span>100%</span>
              </Typography>
            </Box>

            {/* Conditional Input - Tenure or EMI */}
            {calculationMode === "emi" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "3vw", sm: "2.5vw", md: "1vw" },
                    color: theme.palette.whitetext.black,
                    fontFamily: "Poppins",
                  }}
                >
                  Loan Tenure (years)
                </Typography>
                <FilledInput
                  type="number"
                  disableUnderline={true}
                  sx={{
                    width: { xs: "35%", sm: "40%", md: "35%" },
                    height: { xs: "35px", sm: "40px", md: "50px" },
                    fontSize: { md: "16px", sm: "16px", xs: ".8rem" },
                    border: "1px solid #989898",
                    borderRadius: "40px",
                    color: theme.palette.whitetext.black,
                    textDecoration: "none",
                    backgroundColor: "white",
                  }}
                  inputProps={{
                    style: { padding: "0 20px" },
                    min: 0, // UPDATED: Allow 0 in input field
                    max: 30,
                    step: 0.1,
                  }}
                  onChange={handleYearsChange}
                  value={years || ""} // UPDATED: Show empty for 0
                />
                <input
                  type="range"
                  min="1" // Slider still represents the valid calculation range
                  max="30"
                  step="0.1"
                  value={years}
                  onChange={(e) => setYears(parseFloat(e.target.value))}
                  style={{
                    width: "80%",
                    flexGrow: 1,
                    accentColor: theme.palette.secondary.main,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "2.5vw", sm: "1.8vw", md: "0.8vw" },
                    color: "black",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>1 year</span>
                  <span>30 years</span>
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "3vw", sm: "2.5vw", md: "1vw" },
                    color: theme.palette.secondary.main,
                    fontFamily: "Poppins",
                    mb: 2,
                  }}
                >
                  Monthly EMI (₹)
                </Typography>
                <FilledInput
                  type="number"
                  disableUnderline={true}
                  sx={{
                    width: { xs: "70%", sm: "60%", md: "50%" },
                    height: { xs: "35px", sm: "40px", md: "50px" },
                    fontSize: { md: "16px", sm: "16px", xs: ".8rem" },
                    border: "1px solid #989898",
                    borderRadius: "40px",
                    color: theme.palette.text.primary,
                    textDecoration: "none",
                    backgroundColor: "white",
                  }}
                  inputProps={{
                    style: { padding: "0 20px" },
                    min: 0,
                  }}
                  onChange={handleCustomEMIChange}
                  value={customEMI}
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                />
              </Box>
            )}

            {/* Extra EMI Checkbox */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={extraEMIEnabled}
                    onChange={(e) => setExtraEMIEnabled(e.target.checked)}
                    sx={{
                      color: "#3244e6",
                      "&.Mui-checked": { color: "#3244e6" },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: { xs: "2.5vw", sm: "1.5vw", md: "0.9vw" },
                    }}
                  >
                    Include one extra EMI per year for faster repayment
                  </Typography>
                }
              />
            </Box>
          </Box>
        </Box>

        {/* Right box */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: { xs: "0", sm: "20px", md: "30px" },
            padding: { xs: "inherit", sm: "20px", md: "inherit" },
          }}
        >
          <Box
            sx={{
              height: { xs: "auto", sm: "80vh", md: "100vh" },
              width: { xs: "100%", sm: "100%", md: "100%" },
              background: "#3244e6",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              color: "white",
            }}
            ref={textRef}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "5vw", sm: "3vw", md: "2vw" },
                  fontWeight: "600",
                  fontFamily: "DM sans",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {calculationMode === "emi"
                  ? "Equated Monthly Installment"
                  : "Loan Tenure"}
              </Typography>
            </Box>

            <Typography
              align="center"
              sx={{
                fontSize: { xs: "8vw", sm: "4.5vw", md: "3.5vw" },
                fontWeight: "bold",
                color: "white",
                mb: 2,
              }}
            >
              {calculationMode === "emi" ? `₹${monthlyEMI}` : calculatedTenure}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: { xs: "auto", md: "12vh" },
                  border: "2px solid #FFD700",
                  borderRadius: "20px",
                  flex: 1,
                  padding: "15px",
                  ":hover": {
                    transform: "scale(1.05)",
                    transition: "all 300ms ease-in-out",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "3vw", sm: "1.2vw", md: "1vw" },
                    fontFamily: "Poppins",
                    color: "white",
                  }}
                >
                  Total Interest
                </Typography>
                <Typography
                  align="center"
                  sx={{
                    fontWeight: "bolder",
                    fontSize: { xs: "4vw", sm: "2.5vw", md: "1.8vw" },
                    color: "white",
                  }}
                >
                  ₹{totalInterest}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: { xs: "auto", md: "12vh" },
                  border: "2px solid #FFD700",
                  borderRadius: "20px",
                  flex: 1,
                  padding: "15px",
                  ":hover": {
                    transform: "scale(1.05)",
                    transition: "all 300ms ease-in-out",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "3vw", sm: "1.2vw", md: "1vw" },
                    fontFamily: "Poppins",
                    color: "white",
                  }}
                >
                  Total Amount
                </Typography>
                <Typography
                  align="center"
                  sx={{
                    fontWeight: "bolder",
                    fontSize: { xs: "4vw", sm: "2.5vw", md: "1.8vw" },
                    color: "white",
                  }}
                >
                  ₹{Math.round(totalpayable)}
                </Typography>
              </Box>
            </Box>

            {extraEMIEnabled && interestSaved && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "15px",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "3vw", sm: "1.5vw", md: "1.2vw" },
                    fontFamily: "Poppins",
                    color: "#90EE90",
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  With One Extra EMI Per Year
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "4vw", sm: "2vw", md: "1.5vw" },
                    fontWeight: "bold",
                    color: "#90EE90",
                    textAlign: "center",
                  }}
                >
                  Interest Saved: ₹{interestSaved}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "3.5vw", sm: "1.8vw", md: "1.3vw" },
                    color: "#90EE90",
                    textAlign: "center",
                  }}
                >
                  Time Saved: {timeSaved} months
                </Typography>
              </Box>
            )}

            <Typography
              sx={{
                width: { xs: "90%", sm: "250px", md: "400px" },
                fontSize: { xs: "3.5vw", sm: "2vw", md: "1.25vw" },
                marginTop: "20px",
                textAlign: "center",
                fontFamily: "Poppins",
                color: "white",
              }}
            >
              *Starting at 1% monthly reducing interest rate. Apply now to know
              your exact EMI & interest rate.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginBottom: { sm: "inherit", md: "-5px" },
          marginTop: { xs: "30px" },
          paddingTop: { md: "40px", sm: "0", xs: "0" },
        }}
      >
        <ButtonComp />
      </Box>
    </Container>
  );
}

export default EMICalculator;
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Typography,
  FilledInput,
  Box,
  Container,
  InputAdornment,
} from "@mui/material";

import styles from "./Calculator.module.css";

// Custom debounce function
let timeout;
const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

function EMICalculator() {
  const [amount, setAmount] = useState(50000);
  const [years, setYears] = useState(1);
  const [interest, setInterest] = useState(1);
  const [monthlyEMI, setMonthlyEMI] = useState("");
  const [totalpayable, setTotalPayable] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  const changeValue = (get_id, to_id, setValue) => {
    const inputAmt = document.getElementById(get_id).value;
    if (inputAmt) {
      document.getElementById(to_id).value = inputAmt;
      setValue(inputAmt);
    }
  };
  const calculateAmountFromSlider = (sliderValue) => {
    if (sliderValue <= 50) {
      // First half: increases in 1 lakh increments
      return sliderValue * 100000; // Each step equals 1 lakh, so 1 lakh total increase
    } else {
      // Second half: increases in 50 lakh increments
      return 5000000 + (sliderValue - 50) * 2500000; // Offset by 1 crore, then increase by 50 lakhs
    }
  };

  // Function to reverse map the amount to slider value for two-way binding
  const calculateSliderValueFromAmount = () => {
    if (amount < 5000000) {
      return amount / 100000; // Maps back to 0-50 range for amounts up to 1 crore
    } else {
      return 50 + (amount - 5000000) / 2500000; // Maps to 51-100 range for amounts above 1 crore
    }
  };

  const handleRangeChange = (event) => {
    const sliderValue = parseInt(event.target.value, 10);
    const calculatedAmount = calculateAmountFromSlider(sliderValue);
    setAmount(calculatedAmount);
  };

  const handleAmountChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    // changeValue("txtAmount", "slideAmount", setAmount);
    if (!isNaN(inputValue)) setAmount(inputValue);
  };
  const changeRange = (id, setState) => {
    setState(document.getElementById(id).value);
  };

  const calculate = () => {
    const principal = amount;
    const annualInterestRate = interest * 0.01;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfMonths = years * 12;

    // EMI calculation using the standard formula
    const numerator =
      principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1;
    const monthlyEMI = numerator / denominator;

    const totalPayable = monthlyEMI * numberOfMonths;

    setMonthlyEMI(`${monthlyEMI.toFixed(2)}`);
    setTotalPayable(`${totalPayable.toFixed(2)}`);
  };

  // const handleAmountChange = () => {
  //   changeValue("txtAmount", "slideAmount", setAmount);
  // };

  // const handleRangeChange = () => {
  //   changeRange("slideAmount", setAmount);
  // };
  const handleValueChange = () => {
    changeValue("txtYear", "slideYear", setYears);
  };
  const handleChangeYearRange = () => {
    changeRange("slideYear", setYears);
  };

  const handleInterestValue = (e) => {
    if (!e.target.value) {
      setInterest(parseFloat(1));
    } else {
      const inputValue = parseFloat(e.target.value);

      if (inputValue >= 0 && inputValue <= 30) {
        setInterest(inputValue);
      }
    }
    changeValue("txtInterest", "slideInterest", setInterest);
  };
  const handleChangeInterestRange = () => {
    changeRange("slideInterest", setInterest);
  };

  const textStyle = {
    background: "linear-gradient(90deg, #ffffff, #00f9ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: "800",
    fontSize: "3vw",
    color: "white",
    marginTop: "50px",
    marginBottom: "58px",
  };

  const debouncedCalculate = useCallback(debounce(calculate, 500), [
    amount,
    years,
    interest,
  ]);

  useEffect(() => {
    debouncedCalculate();
  }, [amount, years, interest]);

  useEffect(() => {
    // IntersectionObserver to trigger animation every time text enters the view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Show animation when in view
          } else {
            setIsVisible(false); // Reset animation when out of view
          }
        });
      },
      { threshold: 0.2 } // Trigger when 10% of the element is visible
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (textRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  console.log("interest", interest);

  return (
    <>
      <Container
        maxWidth="false"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "130vh",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          // background:
          //   "linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))",
          // borderRadius: "0% 100% 0% 100% / 0% 100% 0% 100%",
          padding: "30px",
          margin: "0px",
          marginTop: "30px",
        }}
      >
        <Typography
          sx={{
            justifyContent: "center",
            display: "flex",
            marginTop: "0px",
            variant: "h4",
            lineHeight: "4rem",
            fontSize: "2.5vw",
            fontWeight: "300",
          }}
        >
          Happy place to apply for your loan
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            height: "100vh",
            width: "90%",
          }}
        >
          <Box
            style={{
              width: "100%",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px #8080806b",
              //  background:'white'
              backgroundImage: "url(./new/rm222batch3-mind-02.jpg)",
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
                alignItems: "center",
                height: "85%",
                width: "90%",
                padding: "10px 20px",
              }}
            >
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
                    fontSize: "2vw",
                  }}
                >
                  How much are you looking for?
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "cursive",
                    fontSize: "1vw",
                  }}
                >
                  Know your cost of landing.
                </Typography>
              </Box>
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
                <Typography sx={{ fontSize: "1vw" }}>Loan Amount</Typography>
                <FilledInput
                  type="number"
                  disableUnderline
                  sx={{
                    width: "35%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "40px",
                    border: "1px solid #989898",
                  }}
                  inputProps={{
                    min: 50000,
                    max: 100000000,
                    style: { padding: 0 },
                  }}
                  onChange={handleAmountChange}
                  value={amount}
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                />
                <input
                  id="slideAmount"
                  type="range"
                  min="0"
                  max="88"
                  value={calculateSliderValueFromAmount()}
                  onChange={handleRangeChange}
                  style={{ width: "80%", flexGrow: 1 }}
                />
              </Box>
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
                <Typography sx={{ fontSize: "1vw" }}>
                  {"Tenure years"}
                </Typography>
                <FilledInput
                  type="number"
                  disableUnderline={true}
                  style={{
                    width: "35%",
                    height: "50px",
                    fontSize: "16px",
                    border: "1px solid #989898 ",
                    borderRadius: "40px",
                    textDecoration: "none",
                  }}
                  inputProps={{
                    style: {
                      padding: "0 20px",
                    },
                  }}
                  onInput={(e) => {
                    e.target.value = e.target.value <= 30 ? e.target.value : 30;
                  }}
                  id="txtYear"
                  onChange={handleValueChange}
                  value={years}
                />
                <input
                  id="slideYear"
                  min="1"
                  max="40"
                  value={years}
                  onChange={handleChangeYearRange}
                  type="range"
                  style={{ width: "80%", flexGrow: 1 }}
                />
              </Box>
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
                <Typography sx={{ fontSize: "1vw" }}>
                  {" Interest rate "}
                </Typography>
                <FilledInput
                  type="number"
                  min="0"
                  max="30"
                  step="0.1"
                  disableUnderline={true}
                  style={{
                    width: "35%",
                    height: "50px",
                    fontSize: "16px",
                    border: "1px solid #989898",
                    borderRadius: "40px",
                    textDecoration: "none",
                  }}
                  inputProps={{
                    style: {
                      padding: "0 20px",
                    },
                  }}
                  // onInput={(e) => {
                  //   e.target.value = !e.target.value
                  //     ? 1
                  //     : e.target.value <= 30
                  //     ? e.target.value
                  //     : 30;
                  // }}
                  id="txtInterest"
                  onChange={handleInterestValue}
                  value={interest}
                  endAdornment={
                    <InputAdornment position="start">%</InputAdornment>
                  }
                />
                <input
                  id="slideInterest"
                  min="1"
                  max="30"
                  value={interest}
                  onChange={handleChangeInterestRange}
                  type="range"
                  style={{ width: "80%", flexGrow: 1 }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              background:
                "linear-gradient(to right, rgb(217 217 217 / 41%), rgb(33 189 192 / 33%",
              marginLeft: "30px",
            }}
          >
            <Box
              sx={{
                height: "100vh",
              }}
              ref={textRef}
              className={`${styles.calculatorCount} ${
                isVisible ? styles.visible : ""
              }`}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "2vw",
                    color: "white",
                  }}
                >
                  Equated Monthly Installment
                </Typography>
              </Box>
              <Typography align="center" style={textStyle}>
                ₹{monthlyEMI}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: "15vh",
                  border: "2px solid #354dcc69",
                  borderRadius: "20px",
                  width: "280px",
                  ":hover": {
                    transform: "scale(1.1)",
                    background: "transparent",
                    transition: "all 300ms ease-in-out",
                  },
                }}
              >
                <Typography sx={{ fontSize: "1vw", color: "white" }}>
                  Total Payable
                </Typography>
                <Typography
                  align="center"
                  style={{
                    fontWeight: "bolder",
                    fontSize: "2.2vw",
                    color: "white",
                  }}
                >
                  ₹{Math.round(totalpayable)}
                </Typography>
              </Box>
              <Typography
                style={{
                  width: "350px",
                  fontFamily: "cursive",
                  fontSize: "1vw",
                  color: "white",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                *Starting at 1% monthly reducing interest rate. Apply now to
                know your exact EMI & interest rate.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default EMICalculator;

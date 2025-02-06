import { useState, useEffect, useRef, useCallback } from "react";
import {
  Typography,
  FilledInput,
  Box,
  Container,
  InputAdornment,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import styles from "./Calculator.module.css";
import { BackgroundColor } from "@cloudinary/url-gen/actions/background/actions/BackgroundColor";
import { keyframes, styled, useMediaQuery } from "@mui/system";
import { Link } from "react-router-dom";
import ButtonComp from "../common/button/Button";

// Neon glow animation for specific colors
const neonGlow = keyframes`
  0% {
    text-shadow: 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700;
  }
  50% {
    text-shadow: 
      0 0 2px #50C878, 
      0 0 2px #50C878, 
      0 0 2px #50C878, 
      0 0 2px #50C878, 
      0 0 2px #50C878, 
      0 0 2px #50C878, 
      0 0 2px #50C878;
  }
  100% {
    text-shadow: 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700, 
      0 0 2px #FFD700;
  }
`;

// Styled component for neon text
const NeonText = styled(Box)(({ theme }) => ({
  fontSize: "4rem", // Adjust size as needed
  fontWeight: {
    xs: "150",
    sm: "180",
    md: "850",
  },

  textTransform: "uppercase",
  color: "#fff",
  textShadow: `
    0 0 5px #FFD700, 
    0 0 10px #FFD700, 
    0 0 20px #FFD700, 
    0 0 30px #FFD700, 
    0 0 40px #FFD700, 
    0 0 50px #FFD700, 
    0 0 60px #FFD700
  `,
  animation: `${neonGlow} 3s infinite alternate`,
  textAlign: "center",
}));

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
  const isMobile = useMediaQuery("(max-width:480px)");

  const [isVisible, setIsVisible] = useState(isMobile);
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
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "white",
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

  console.log("isVisible", isVisible);
  const theme = useTheme();
  return (
    <>
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          flexDirection: "column",
          // height: "140vh",
          height: {
            xs: "110vh",
            sm: "110vh",
            md: "140vh",
          },
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "30px",
          margin: {
            xs: "0px", // Override margin on mobile
            sm: "30px 0px 50px", // Apply margin for other screens
            md: "30px 0px 50px",
            xl: "30px 0px 50px",
          },

        }}
      >
        <NeonText
          sx={{
            justifyContent: "center",
            display: "flex",
            marginTop: "0px",
            variant: "h4",
            lineHeight: {
              xs: "inherit",
              md: "4rem",
              sm: "4rem",
            },
            fontSize: {
              xs: "4vw",
              sm: "4vw",
              md: "3vw",
            },
            // marginBottom: {
            //   xs: "4rem",
            //   sm: "2rem",
            //   md: "inherit",
            // },
            fontFamily: "DM Sans",
          }}
        >
          Happy place to apply for your loan
        </NeonText>
        <Box
          style={{
            display: "flex",
            // marginBottom: isMobile ? "110px", :"0"
            flexDirection: isMobile ? "column" : "row", // Column on mobile, row on laptops
            justifyContent: "space-evenly",
            width: "90%",
            borderRadius: "10px",
            boxShadow: isMobile ? "none" : "0 0 10px #43A865", // No shadow on mobile
            gap: isMobile ? "20px" : "0px", // Add gap between boxes on mobile
          }}
        >
          {/* left box */}
          <Box
            sx={{
              height: {
                xs: "50vh",
                sm: "85vh",
                md: "inherit",
              },
              
              width: "100%",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: isMobile ? "10px" : "10px 0px 0px 10px",
              backgroundColor: theme.palette.background.default,
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
                    fontSize: {
                      xs: "4vw",
                      sm: "3vw",
                      md: "2vw",
                    },
                    fontFamily: "DM Sans",
                    fontWeight: 600,
                  }}
                >
                  How much are you looking for?
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: {
                      xs: "3vw",
                      sm: "2.2vw",
                      md: "1vw",
                    },
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
                <Typography
                  sx={{
                    fontSize: {
                      xs: "3vw",
                      sm: "2.5vw",
                      md: "1vw",
                    },
                    fontFamily: "Poppins",
                  }}
                >
                  Loan Amount
                </Typography>
                <FilledInput
                  type="number"
                  disableUnderline
                  sx={{
                    // width: "35%",
                    width: {
                      xs: "50%",
                      sm: "44%",
                      md: "35%",
                    },
                    // height: "50px",
                    height: {
                      xs: "35px",
                      sm: "40px",
                      md: "50px",
                    },
                    fontSize: {
                      md:"16px",
                      sm:"16px",
                      xs:'.8rem' 
                    },

                    // fontSize: ".8rem",     // hassan
                    borderRadius: "40px",
                    border: "1px solid #989898",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    overflow: "hidden",
                    padding: "0",
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
                  style={{
                    width: "80%",
                    flexGrow: 1,
                    accentColor: theme.palette.secondary.main,
                  }}
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
                <Typography
                  sx={{
                    fontSize: {
                      xs: "3vw",
                      sm: "2.5vw",
                      md: "1vw",
                    },
                    fontFamily: "Poppins",
                  }}
                >
                  {"Tenure years"}
                </Typography>
                <FilledInput
                  type="number"
                  disableUnderline={true}
                  sx={{
                    width: {
                      xs: "35%",
                      sm: "40%",
                      md: "35%",
                    },
                    // height: "50px",
                    height: {
                      xs: "35px",
                      sm: "40px",
                      md: "50px",
                    },
                    fontSize: {
                      md:"16px",
                      sm:"16px",
                      xs:'.8rem' 
                    },
                    border: "1px solid #989898 ",
                    borderRadius: "40px",
                    textDecoration: "none",
                  }}
                  inputProps={{
                    style: {
                      padding: "0 20px ",
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
                  style={{
                    width: "80%",
                    flexGrow: 1,
                    accentColor: theme.palette.secondary.main,
                  }}
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
                <Typography
                  sx={{
                    fontSize: {
                      xs: "3vw",
                      sm: "2.5vw",
                      md: "1vw",
                    },
                    fontFamily: "Poppins",
                  }}
                >
                  {" Interest rate "}
                </Typography>
                <FilledInput
                  type="number"
                  min="0"
                  max="30"
                  step="0.1"
                  disableUnderline={true}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: {
                      xs: "35%",
                      sm: "40%",
                      md: "35%",
                    },
                    height: {
                      xs: "35px",
                      sm: "40px",
                      md: "50px",
                    },
                    fontSize: {
                      md:"16px",
                      sm:"16px",
                      xs:'.8rem' 
                    },
                    border: "1px solid #989898",
                    borderRadius: "40px",
                    textDecoration: "none",
                  }}
                  inputProps={{
                    style: {
                      // padding: "20px", 
                      marginBottom:"15px",
                      marginLeft:'8.5px'
                    },
                  }}
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
                  style={{
                    width: "80%",
                    flexGrow: 1,
                    accentColor: theme.palette.secondary.main,
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* right box */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              background:
                "linear-gradient(to right, rgb(217 217 217 / 41%), rgb(33 189 192 / 33%)",
              marginLeft: { xs: "7.3vw", sm: "20px", md: "30px" }, // Responsive margin
              padding: { xs: "inherit", sm: "20px", md: "inherit" }, // Padding for smaller screens
              
            }}
          >
            <Box
              sx={{
                height: { xs: "auto", sm: "80vh", md: "100vh" }, // Auto height for smaller screens
                width: { xs: "75vw", sm: "39vw", md: "47.5vw" }, // Responsive widt
                transform: isMobile ? "translateX(0)" : "translateX(-100%)",

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
                  justifyContent: "center",
                  flexDirection: { xs: "column", md: "row" }, // Adjust direction for smaller screens
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "5vw", sm: "3vw", md: "2vw" }, // Responsive font size
                    color: "#ffffff",
                    fontWeight: "600",
                    fontFamily: "DM sans",
                    textAlign: "center", // Center align on smaller screens
                  }}
                >
                  Equated Monthly Installment
                </Typography>
              </Box>
              <Typography
                align="center"
                sx={{
                  fontSize: { xs: "6vw", sm: "3.8vw", md: "3.1vw" }, // Responsive font size
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                ₹{monthlyEMI}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: { xs: "auto", md: "15vh" }, // Adjust height for smaller screens
                  border: "2px solid #FFD700",
                  borderRadius: "20px",
                  width: { xs: "90%", sm: "280px" }, // Responsive width
                  marginTop: "20px",
                  ":hover": {
                    transform: "scale(1.1)",
                    background: "transparent",
                    transition: "all 300ms ease-in-out",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "3vw", sm: "1vw" }, // Responsive font size
                    color: "white",
                    fontFamily: "Poppins",
                  }}
                >
                  Total Payable
                </Typography>
                <Typography
                  align="center"
                  sx={{
                    fontWeight: "bolder",
                    fontSize: { xs: "4vw", sm: "3vw", md: "2.2vw" }, // Responsive font size
                    color: "#000000",
                  }}
                >
                  <span style={{ color: "#ffffff" }}>
                    {" "}
                    ₹{Math.round(totalpayable)}{" "}
                  </span>
                </Typography>
              </Box>
              <Typography
                sx={{
                  width: { xs: "90%", sm: "250px", md: "400px" }, // Responsive width
                  fontSize: { xs: "3.5vw", sm: "2vw", md: "1.25vw" }, // Responsive font size
                  color: "white",
                  marginTop: "20px",
                  textAlign: "center",
                  fontFamily: "Poppins",
                }}
              >
                *Starting at 1% monthly reducing interest rate. Apply now to
                know your exact EMI & interest rate.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{marginBottom:{
          xs:'5vh', sm:'inherit', md:'-5px'
        }}}>  <ButtonComp/></Box>
      

      </Container>
    </>
  );
}

export default EMICalculator;

import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { CurrencyRupee as CurrencyRupeeIcon } from "@mui/icons-material";

import API from "../../apis";
import { Utility } from "../utility";

const Step7Form = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(null);
  const [emi, setEmi] = useState(null);
  const [liability, setLiability] = useState(null);

  const [errors, setErrors] = useState({
    amount: "",
    emi: "",
    liability: "",
  });

  const { getLocalStorage } = Utility();
  const storedCustomerId = getLocalStorage("customerInfo")?.id;

  // Validation for Amount
  const validateAmount = (value) => {
    let error = "";
    if (!value) {
      error = "This field is required.";
    } else if (isNaN(value)) {
      error = "Amount must be a number.";
    } else if (value < 50000 || value > 1000000000) {
      error = "Amount must be between 50 thousand and 100 crore.";
    }
    setErrors((prev) => ({ ...prev, amount: error }));
  };

  // Validation for EMI
  const validateEmi = (value) => {
    let error = "";
    if (value && isNaN(value)) {
      error = "EMI must be a number.";
    }
    setErrors((prev) => ({ ...prev, emi: error }));
  };

  // Validation for Liability
  const validateLiability = (value) => {
    let error = "";
    if (value && isNaN(value)) {
      error = "Liability must be a number.";
    }
    setErrors((prev) => ({ ...prev, liability: error }));
  };

  // Function to update customer info
  const updateCustomerInfo = async (data) => {
    try {
      await API.CustomerInfoAPI.updateCustomerInfo(data);
      console.log("Customer info updated successfully.");
    } catch (error) {
      console.log("Error updating customer info:", error);
    }
  };

  // Handle form submission
  const create = useCallback(async () => {
    const data = {
      customer_id: storedCustomerId,
      salary: amount,
      existing_emi: emi,
      existing_liability: liability,
    };

    if (storedCustomerId) {
      try {
        // Update customer info
        await updateCustomerInfo(data);

        // Reset form fields
        setAmount(null);
        setEmi(null);
        setLiability(null);

        // Refresh the page after a successful submission
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error updating customer info:", error);
      }
    } else {
      console.error("No customer ID found.");
    }
  }, [amount, emi, liability, storedCustomerId, dispatch]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: "bold 10px",
          fontSize: "4vh",
          fontWeight: "300vh",
          marginBottom: 2,
        }}
      >
        Additional Details
      </Typography>
      <Typography
        sx={{
          fontFamily: "-moz-initial",
          fontSize: "2.5vh",
          color: "gray",
          marginBottom: 2,
        }}
      >
        Step 4/4
      </Typography>
      <Box sx={{ width: "45%", marginBottom: 3 }}>
        <TextField
          fullWidth
          variant="filled"
          type="number"
          name="amount"
          label="(Salary/Turnover)p.a*"
          placeholder="(Salary/Turnover)*p.a"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            validateAmount(e.target.value);
          }}
          onBlur={() => validateAmount(amount)}
          error={!!errors.amount}
          helperText={errors.amount}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupeeIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            fontSize: "13px",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: 2,
            "& .MuiFilledInput-root": {
              borderRadius: "4px",
              border: "1px solid transparent",
            },
            "& .MuiInputAdornment-root": {
              color: "#000",
            },
          }}
        />
        <TextField
          fullWidth
          variant="filled"
          name="emi"
          type="number"
          label="Existing Emi Amount"
          placeholder="Existing Emi Amount"
          value={emi}
          onChange={(e) => {
            setEmi(e.target.value);
            validateEmi(e.target.value);
          }}
          onBlur={() => validateEmi(emi)}
          error={!!errors.emi}
          helperText={errors.emi}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupeeIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            fontSize: "13px",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: 2,
            "& .MuiFilledInput-root": {
              borderRadius: "4px",
              border: "1px solid transparent",
            },
            "& .MuiInputAdornment-root": {
              color: "#000",
            },
          }}
        />
        <TextField
          fullWidth
          variant="filled"
          name="liability"
          type="number"
          label="Existing credit card liability"
          placeholder="Existing credit card liability"
          value={liability}
          onChange={(e) => {
            setLiability(e.target.value);
            validateLiability(e.target.value);
          }}
          onBlur={() => validateLiability(liability)}
          error={!!errors.liability}
          helperText={errors.liability}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupeeIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            fontSize: "13px",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: 2,
            "& .MuiFilledInput-root": {
              borderRadius: "4px",
              border: "1px solid transparent",
            },
            "& .MuiInputAdornment-root": {
              color: "#000",
            },
          }}
        />
      </Box>

      <Button
        color="primary"
        disabled={!!errors.amount || !amount}
        variant="contained"
        onClick={create}
        sx={{
          fontWeight: "500",
          fontSize: "1rem",
          lineHeight: "1.5rem",
          mt: 2,
          width: "45%",
          alignSelf: "center",
          marginBottom: 3,
        }}
      >
        Submit
      </Button>
    </Container>
  );
};

Step7Form.propTypes = {
  applicationNumber: PropTypes.number,
  setApplicationNumber: PropTypes.func.isRequired,
};

export default Step7Form;

import PropTypes from "prop-types";
import { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { CurrencyRupee as CurrencyRupeeIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useTheme } from "@mui/material/styles";

import API from "../../apis";
import { Utility } from "../utility";

const Step7Form = ({ handleBack, aadharUploadsSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedAudioFiles, setSelectedAudioFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUploadsSuccess, setAllUploadsSuccess] = useState(false);

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const theme = useTheme();
  const [amount, setAmount] = useState(null);
  const [emi, setEmi] = useState(null);
  const [liability, setLiability] = useState(null);

  const [errors, setErrors] = useState({
    amount: "",
    emi: "",
    liability: "",
  });

  const { getLocalStorage, formatName, remLocalStorage, toastAndNavigate, uploadFileToS3 } =
    Utility();
  const storedCustomerId = useMemo(
    () => getLocalStorage("customerInfo")?.id,
    []
  );
  const profileDetail = useMemo(() => getLocalStorage("profileDetail"), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
  const updateCustomerInfo = useCallback(async (data) => {
    try {
      await API.CustomerInfoAPI.updateCustomerInfo(data);
      console.log("Customer info updated successfully.");
    } catch (error) {
      console.log("Error updating customer info:", error);
    }
  }, []);

  // Handle deleting a file from the selected files array
  const handleAttachmentDelete = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const updateFormInfo = async (data) => {
    if (storedCustomerId) {
      try {
        await updateCustomerInfo(data);

        // Reset form fields
        setAmount(null);
        setEmi(null);
        setLiability(null);
        setSelectedFiles([]);
        remLocalStorage("activeStep");
        remLocalStorage("StatementUpload");
        remLocalStorage("profileDetail");
        setLoading(false);
        window.location.reload();
      } catch (error) {
        setLoading(false);
        console.error("Error updating customer info:", error);
      }
    } else {
      setLoading(false);
      console.error("No customer ID found.");
    }
  };

  // Handle form submission
  const create = useCallback(async () => {
    const data = {
      customer_id: storedCustomerId,
      salary: parseFloat(amount),
      existing_emi: emi,
      existing_liability: liability,
    };
    setLoading(true);

    try {
      // Handle file uploads
      if (selectedFiles.length !== 0) {
        for (const file of selectedFiles) {
          await uploadFileToS3(file, "certificate", storedCustomerId);
        }
      }

      // Handle audio uploads (if any, though none selected in UI currently)
      if (selectedAudioFiles.length !== 0) {
        for (const file of selectedAudioFiles) {
          await uploadFileToS3(file, "audio", storedCustomerId);
        }
      }

      setAllUploadsSuccess(true);
      await updateFormInfo(data);
    } catch (error) {
      console.error("Error during form submission:", error);
      toastAndNavigate(
        dispatch,
        true,
        "error",
        "Upload failed. Please try again"
      );
      setAllUploadsSuccess(false);
      setLoading(false);
    }
  }, [
    amount,
    emi,
    liability,
    storedCustomerId,
    dispatch,
    selectedFiles,
    selectedAudioFiles,
    uploadFileToS3,
    updateFormInfo,
    toastAndNavigate
  ]);

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
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.5rem", md: "2rem" },
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Poppins",
            mb: 1,
          }}
        >
          Additional Details
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "1.1rem",
            color: "rgba(0, 0, 0, 0.4)",
            fontWeight: 600,
          }}
        >
          Step 4 of 4
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "75%", lg: "60%" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        <TextField
          autoComplete="off"
          fullWidth
          variant="outlined"
          type="number"
          name="amount"
          label="(Salary/Turnover) p.a*"
          placeholder="e.g. 10,00,000"
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
                <CurrencyRupeeIcon sx={{ color: "#1e3c72" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
              "&:hover fieldset": { borderColor: "#1e3c72" },
              "&.Mui-focused fieldset": { borderColor: "#1e3c72", borderWidth: "1px" },
            },
            "& .MuiInputLabel-root": {
              color: "#555",
              fontWeight: 500,
              "&.Mui-focused": { color: "#1e3c72" },
            },
          }}
        />
        <TextField
          autoComplete="off"
          fullWidth
          variant="outlined"
          name="emi"
          type="number"
          label="Existing Emi Amount"
          placeholder="e.g. 15,000"
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
                <CurrencyRupeeIcon sx={{ color: "#1e3c72" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
              "&:hover fieldset": { borderColor: "#1e3c72" },
              "&.Mui-focused fieldset": { borderColor: "#1e3c72", borderWidth: "1px" },
            },
            "& .MuiInputLabel-root": {
              color: "#555",
              fontWeight: 500,
              "&.Mui-focused": { color: "#1e3c72" },
            },
          }}
        />
        <Box sx={{ gridColumn: { md: "span 2" } }}>
          <TextField
            autoComplete="off"
            fullWidth
            variant="outlined"
            name="liability"
            type="number"
            label="Existing credit card liability"
            placeholder="e.g. 50,000"
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
                  <CurrencyRupeeIcon sx={{ color: "#1e3c72" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                "&:hover fieldset": { borderColor: "#1e3c72" },
                "&.Mui-focused fieldset": { borderColor: "#1e3c72", borderWidth: "1px" },
              },
              "& .MuiInputLabel-root": {
                color: "#555",
                fontWeight: 500,
                "&.Mui-focused": { color: "#1e3c72" },
              },
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ width: "40vw" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(30, 60, 114, 0.1)",
          p: 4,
          borderRadius: "24px",
          width: { xs: "100%", md: "90%", lg: "85%" },
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderColor: "rgba(30, 60, 114, 0.3)"
          }
        }}
      >
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#1e3c72",
            mb: 3,
            fontFamily: "Poppins"
          }}
        >
          Upload Required Documents
        </Typography>
        <IconButton
          ref={inputRef}
          component="label"
          sx={{
            color: "#1e3c72",
            background: "rgba(30, 60, 114, 0.05)",
            p: 3,
            borderRadius: "16px",
            border: "1px dashed rgba(30, 60, 114, 0.4)",
            "&:hover": {
              background: "rgba(30, 60, 114, 0.1)",
              borderColor: "#1e3c72"
            }
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: "3rem" }} />
          <input
            hidden
            multiple
            type="file"
            accept=".jpg, .gif, .png, .jpeg, .svg, .webp, application/pdf, .doc, .docx, .txt"
            onChange={(event) => {
              const newFiles = Array.from(event.target.files);

              // Calculate total files including the new selection
              const totalFiles = selectedFiles.length + newFiles.length;

              if (totalFiles > 4) {
                toastAndNavigate(
                  dispatch,
                  true,
                  "error",
                  "Maximum limit reached: 4 files"
                );
                return;
              }

              // Check file size limit (1MB)
              const filteredFiles = newFiles.filter((file) => {
                if (file.size > 10485760) {
                  toastAndNavigate(
                    dispatch,
                    true,
                    "error",
                    `${file.name} exceeds the 10MB limit`
                  );
                  return false;
                }
                return true;
              });

              // If there are no files left after filtering, return early
              if (filteredFiles.length === 0) return;

              setSelectedFiles((prevFiles) => [
                ...prevFiles,
                ...filteredFiles,
              ]);
            }}
          />
        </IconButton>

        {/* Display selected file names with delete icons */}
        {selectedFiles.length > 0 && (
          <Box sx={{ width: "100%", mt: 3 }}>
            {selectedFiles.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.5,
                  mb: 1.5,
                  backgroundColor: "white",
                  borderRadius: "16px",
                  border: "1px solid rgba(30, 60, 114, 0.1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.01)",
                    borderColor: "rgba(30, 60, 114, 0.3)",
                  }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)"
                    }}
                  />
                  <Typography sx={{ fontSize: "0.95rem", color: "#1e3c72", fontWeight: 600 }}>
                    {file.name}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => handleAttachmentDelete(index)}
                  sx={{
                    color: "#d32f2f",
                    "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.08)" }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          gap: 2
        }}
      >
        <Button
          onClick={handleBack}
          sx={{
            fontFamily: "Poppins",
            fontSize: "1rem",
            color: "rgba(0,0,0,0.5)",
            textTransform: "none",
            "&:hover": {
              background: "transparent",
              color: "#1e3c72",
              textDecoration: "underline"
            },
            "&.Mui-disabled": {
              opacity: 0.3,
            },
          }}
          disabled={aadharUploadsSuccess || profileDetail}
        >
          Go Back
        </Button>
        <Button
          disabled={!!errors.amount || !amount || loading}
          variant="contained"
          onClick={create}
          sx={{
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            color: "white",
            fontWeight: 700,
            fontFamily: "Poppins",
            fontSize: "1.1rem",
            borderRadius: "12px",
            px: 6,
            py: 1.5,
            textTransform: "none",
            boxShadow: "0 8px 24px rgba(30, 60, 114, 0.3)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 32px rgba(30, 60, 114, 0.4)",
            },
            "&.Mui-disabled": {
              background: "#e0e0e0",
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Complete Application"
          )}
        </Button>
      </Box>
    </Container>
  );
};

Step7Form.propTypes = {
  applicationNumber: PropTypes.number,
  setApplicationNumber: PropTypes.func.isRequired,
};

export default Step7Form;

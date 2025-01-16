import PropTypes from "prop-types";
import { useCallback, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { CurrencyRupee as CurrencyRupeeIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AudioFileIcon from "@mui/icons-material/AudioFile";

import API from "../../apis";
import { Utility } from "../utility";

const Step7Form = ({ handleBack, aadharUploadsSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]); // To store selected files
  const [selectedAudioFiles, setSelectedAudioFiles] = useState([]); // To store selected audio files
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(null);
  const [emi, setEmi] = useState(null);
  const [liability, setLiability] = useState(null);
  const [allUploadsSuccess, setAllUploadsSuccess] = useState(false);

  const inputRef = useRef(null);

  const [errors, setErrors] = useState({
    amount: "",
    emi: "",
    liability: "",
  });

  const { getLocalStorage, formatName, remLocalStorage, toastAndNavigate } =
    Utility();
  const storedCustomerId = getLocalStorage("customerInfo")?.id;
  const profileDetail = getLocalStorage("profileDetail");

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

  // Handle deleting a file from the selected files array
  const handleAttachmentDelete = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset the value of the input element
    }
  };

  const handleAttachmentAudioDelete = (index) => {
    const updatedFiles = selectedAudioFiles.filter((_, i) => i !== index);
    setSelectedAudioFiles(updatedFiles);
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset the value of the input element
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

        setTimeout(() => {
          remLocalStorage("activeStep");
          remLocalStorage("StatementUpload");
          remLocalStorage("profileDetail");
          location.reload();
        }, 1500);
      } catch (error) {
        console.error("Error updating customer info:", error);
      }
    } else {
      console.error("No customer ID found.");
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

    if (selectedFiles.length !== 0) {
      selectedFiles.forEach((file) => {
        const formattedName = formatName(file.name);

        // Uploading each document
        API.DocumentAPI.uploadDocument({
          document: file,
          folder: `document/${formattedName}`,
        })
          .then((res) => {
            if (res.data.status === "Success") {
              API.DocumentAPI.createDocument({
                document_url: res.data.data,
                customer_id: storedCustomerId,
                type: "certificate",
              })
                .then(() => {
                  setAllUploadsSuccess(true);
                  updateFormInfo(data);
                })
                .catch((err) => {
                  toastAndNavigate(
                    dispatch,
                    true,
                    "info",
                    "Error in creating document inside DB"
                  );
                  console.log("Error in creating document inside DB", err);
                  setAllUploadsSuccess(false);
                });
            } else {
              toastAndNavigate(dispatch, true, "info", "Upload failed");
              setAllUploadsSuccess(false);
            }
          })
          .catch((err) => {
            toastAndNavigate(
              dispatch,
              true,
              "error",
              "Upload failed. Please try again"
            );
            setAllUploadsSuccess(false);
          });
      });
    }

    if (selectedAudioFiles.length !== 0) {
      selectedAudioFiles.forEach((file) => {
        const formattedName = formatName(file.name);

        API.DocumentAPI.uploadDocument({
          document: file,
          folder: `audio/${formattedName}`,
        })
          .then((res) => {
            if (res.data.status === "Success") {
              API.DocumentAPI.createDocument({
                document_url: res.data.data,
                customer_id: storedCustomerId,
                type: "audio",
              })
                .then(() => {
                  setAllUploadsSuccess(true);
                  updateFormInfo(data);
                })
                .catch((err) => {
                  toastAndNavigate(
                    dispatch,
                    true,
                    "info",
                    "Error in creating audio document inside DB"
                  );
                  console.log(
                    "Error in creating audio document inside DB",
                    err
                  );
                  setAllUploadsSuccess(false);
                });
            } else {
              toastAndNavigate(dispatch, true, "info", "Audio upload failed");
              setAllUploadsSuccess(false);
            }
          })
          .catch((err) => {
            toastAndNavigate(
              dispatch,
              true,
              "error",
              "Audio upload failed. Please try again"
            );
            console.error("Error in audio upload:", err);
            setAllUploadsSuccess(false);
          });
      });
    }

    if (!selectedFiles.length) {
      updateFormInfo(data);
    }
  }, [
    amount,
    emi,
    liability,
    storedCustomerId,
    dispatch,
    selectedFiles,
    selectedAudioFiles,
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
      <Typography
        sx={{
          fontSize: "1.9vw",
          fontWeight: "500",
          marginBottom: 2,
          color: "#ffffff",
          fontFamily: "Poppins",
        }}
      >
        Additional <span style={{ color: "#FFD700" }}> Details</span>
      </Typography>
      <Typography
        sx={{
          fontFamily: "-moz-initial",
          fontSize: "2.5vh",
          color: "white",
          marginBottom: 2,
        }}
      >
        Step 4/4
      </Typography>
      <Box sx={{ width: "45%", marginBottom: 3 }}>
        <TextField
          autoComplete="off"
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
              color: "white",
            },
            "& .css-ubk1op-MuiFormLabel-root-MuiInputLabel-root": {
              color: "white",
            },
          }}
        />
        <TextField
          autoComplete="off"
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
              color: "white",
            },
            "& .css-ubk1op-MuiFormLabel-root-MuiInputLabel-root": {
              color: "white",
            },
          }}
        />
        <TextField
          autoComplete="off"
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
            "& .MuiFilledInput-root": {
              borderRadius: "4px",
              border: "1px solid transparent",
            },
            "& .MuiInputAdornment-root": {
              color: "white",
            },
            "& .css-ubk1op-MuiFormLabel-root-MuiInputLabel-root": {
              color: "white",
            },
          }}
        />
      </Box>
      <Divider sx={{ width: "40vw" }} />
      <Typography
        variant="h5"
        sx={{
          width: "20vw",
          mt: 4,
          mb: 2,
          fontFamily: "Poppins",
          color: "white",
        }}
      >
        Degree and Registration Certificate
      </Typography>
      {selectedFiles.length < 4 && (
        <IconButton
          component="label"
          sx={{ width: "auto", mb: 2, color: "#FFD700" }}
        >
          <AddPhotoAlternateIcon />
          <input
            ref={inputRef}
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

              // Check file size limit (1MB = 1,048,576 bytes)
              const filteredFiles = newFiles.filter((file) => {
                if (file.size > 1048576) {
                  toastAndNavigate(
                    dispatch,
                    true,
                    "error",
                    `${file.name} exceeds the 1MB limit`
                  );
                  return false;
                }
                return true;
              });
              console.log("filteredFiles", filteredFiles);

              // If there are no files left after filtering, return early
              if (filteredFiles.length === 0) return;

              setSelectedFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
              // setFieldValue("data", [...selectedFiles, ...filteredFiles]);
            }}
          />
        </IconButton>
      )}

      {/* Display selected file names with delete icons */}
      {selectedFiles.length > 0 && (
        <Box sx={{ width: "100%", maxWidth: "40vw", mt: 2 }}>
          {selectedFiles.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography>{file.name}</Typography>
              <IconButton
                onClick={() => handleAttachmentDelete(index)}
                sx={{ ml: 2 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          width: "40vw",
          justifyContent: "flex-start",
          ml: "40px",
        }}
      >
        <Button
          onClick={handleBack}
          sx={{ mt: 2, fontFamily: "Poppins", fontSize: ".9rem" }}
          disabled={aadharUploadsSuccess || profileDetail}
        >
          Back
        </Button>
        <Button
          disabled={!!errors.amount || !amount}
          variant="contained"
          onClick={create}
          sx={{
            fontSize: "1rem",
            lineHeight: "1.5rem",
            mt: 2,
            ml: 14,
            width: "30%",
            alignSelf: "center",
            marginBottom: 3,
            color: "black",
            fontFamily: "Poppins",
            fontWeight: "500",
            backgroundColor: "#FFD700",
            "&:hover": {
              backgroundColor: "transparent", // Transparent color on hover
            },
          }}
        >
          Submit
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

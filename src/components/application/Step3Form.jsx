import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import API from "../../apis";
import Toast from "../toast/Toast";
import { Utility } from "../utility";

const initialValues = {
  data: [],
};

const Step3Form = ({ handleNext, allUploadsSuccess, setAllUploadsSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]); // To store selected files
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);

  const { formatName, getLocalStorage, setLocalStorage, toastAndNavigate, uploadFileToS3 } =
    Utility();
  const customerId = useMemo(() => getLocalStorage("customerInfo")?.id, []);
  const inputRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle deleting a file from the selected files array
  const handleAttachmentDelete = useCallback((index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  // Submitting the form and uploading files
  const handleFormSubmit = useCallback(
    async (values) => {
      setLoading(true);

      console.log("these are form values=>", values.data);

      try {
        const results = await Promise.allSettled(
          values.data.map(async (file) => {
            return uploadFileToS3(file, "bank statement", customerId);
          })
        );

        const successfulUploads = results.filter((r) => r.status === "fulfilled");
        const failedUploads = results.filter((r) => r.status === "rejected");

        if (successfulUploads.length > 0) {
          setAllUploadsSuccess(true);
          setLocalStorage("StatementUpload", true);
          toastAndNavigate(
            dispatch,
            true,
            "info",
            `Successfully uploaded ${successfulUploads.length} files`
          );
        }

        if (failedUploads.length > 0) {
          console.error("Some uploads failed:", failedUploads);
          toastAndNavigate(
            dispatch,
            true,
            "error",
            `${failedUploads.length} file(s) failed to upload`
          );
        }
      } catch (err) {
        toastAndNavigate(
          dispatch,
          true,
          "error",
          "An unexpected error occurred during upload"
        );
        console.error("Error in upload process:", err);
      } finally {
        setLoading(false);
      }
    },
    [customerId, formatName, dispatch, setAllUploadsSuccess, toastAndNavigate]
  );

  useEffect(() => {
    if (allUploadsSuccess) {
      const timer = setTimeout(() => {
        handleNext();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [allUploadsSuccess]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) =>
          handleFormSubmit({ ...values, data: selectedFiles })
        }
      >
        {({ dirty, isSubmitting, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginBottom: "15px",
              }}
            >
              {/* Header section */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.5rem", md: "1.5rem" },
                    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "Poppins",
                    mb: 1,
                  }}
                >
                  Statement Upload
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1.1rem",
                    color: "rgba(0, 0, 0, 0.4)",
                    fontWeight: 600,
                    mb: 3,
                  }}
                >
                  Step 2 of 4
                </Typography>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontFamily: "Poppins",
                  }}
                >
                  Upload your recent 6 months Bank Statement
                  <br />
                  <Typography component="span" sx={{ fontSize: "0.8rem", opacity: 0.7 }}>
                    (Maximum File Upload Limit Is 10)
                  </Typography>
                </Typography>
              </Box>

              {/* File input and display */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "24px",
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                  border: "2px dashed rgba(30, 60, 114, 0.2)",
                  width: { xs: "100%", md: "75%", lg: "65%" },
                  p: 4,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#1e3c72",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }
                }}
              >
                {/* File picker with multiple file upload support */}
                {selectedFiles.length < 10 && (
                  <IconButton
                    component="label"
                    sx={{
                      mb: 2,
                      background: "rgba(30, 60, 114, 0.05)",
                      p: 3,
                      "&:hover": { background: "rgba(30, 60, 114, 0.1)" }
                    }}
                  >
                    <AddPhotoAlternateIcon sx={{ color: "#1e3c72", fontSize: "3.5rem" }} />
                    <input
                      ref={inputRef}
                      hidden
                      multiple
                      type="file"
                      accept=".jpg, .gif, .png, .jpeg, .svg, .webp, application/pdf, .doc, .docx, .txt"
                      onChange={(event) => {
                        const newFiles = Array.from(event.target.files);

                        // Calculate total files including the new selection
                        const totalFiles =
                          selectedFiles.length + newFiles.length;

                        if (totalFiles > 10) {
                          toastAndNavigate(
                            dispatch,
                            true,
                            "error",
                            "Maximum limit reached: 10 files"
                          );
                          return;
                        }

                        // Check file size limit (10MB)
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
                        setFieldValue("data", [
                          ...selectedFiles,
                          ...filteredFiles,
                        ]);
                      }}
                    />
                  </IconButton>
                )}

                {/* Display selected file names with delete icons */}
                {selectedFiles.length > 0 && (
                  <Box sx={{ width: "100%", mt: 2 }}>
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

                <Button
                  color="primary"
                  disabled={
                    !dirty ||
                    isSubmitting ||
                    selectedFiles.length === 0 ||
                    loading
                  }
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                    color: "white",
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    fontSize: "1.1rem",
                    borderRadius: "12px",
                    px: 6,
                    py: 1.5,
                    mt: 4,
                    textTransform: "none",
                    boxShadow: "0 8px 24px rgba(30, 60, 114, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 32px rgba(30, 60, 114, 0.4)",
                    },
                    "&:disabled": {
                      background: "#e0e0e0",
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Upload Statement"
                  )}
                </Button>

                <Button
                  sx={{
                    mt: 2,
                    fontFamily: "Poppins",
                    fontSize: "0.9rem",
                    color: "rgba(0, 0, 0, 0.5)",
                    textTransform: "none",
                    "&:hover": {
                      background: "transparent",
                      color: "#1e3c72",
                      textDecoration: "underline"
                    }
                  }}
                  onClick={handleNext}
                  disabled={selectedFiles.length > 0}
                >
                  I'll do this later (Skip for now)
                </Button>
              </Box>
            </Container>
          </Form>
        )}
      </Formik>
      <Toast
        alerting={toastInfo.toastAlert}
        message={toastInfo.toastMessage}
        severity={toastInfo.toastSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default Step3Form;

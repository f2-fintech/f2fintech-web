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

  const { formatName, getLocalStorage, setLocalStorage, toastAndNavigate } =
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
      inputRef.current.value = ""; // Reset the value of the input element
    }
  }, []);

  // Submitting the form and uploading files
  const handleFormSubmit = useCallback(
    async (values) => {
      setLoading(true); // Start loader

      console.log("these are form values=>", values.data);

      const uploadPromises = values.data.map(async (file) => {
        const formattedName = formatName(file.name);

        const res = await API.DocumentAPI.uploadDocument({
          document: file,
          folder: `document/${formattedName}`,
        });
        if (res.data.status === "Success") {
          // Creating document entry in DB
          return API.DocumentAPI.createDocument({
            document_url: res.data.data,
            customer_id: customerId,
            type: "bank statement",
          });
        } else {
          throw new Error("Upload failed");
        }
      });

      try {
        await Promise.all(uploadPromises);
        setAllUploadsSuccess(true);
        setLocalStorage("StatementUpload", true);
        toastAndNavigate(dispatch, true, "info", "Uploaded Successfully");
        setLoading(false);
      } catch (err) {
        toastAndNavigate(
          dispatch,
          true,
          "error",
          "Upload Failed. Please Try Again"
        );
        console.error("Error in upload:", err);
        setAllUploadsSuccess(false);
        setLoading(false);
      }
    },
    [customerId, formatName]
  );

  useEffect(() => {
    if (allUploadsSuccess) {
      const timer = setTimeout(() => {
        handleNext(); // Call handleNext to move to the next step after 2 seconds
      }, 2000);

      // Clear the timeout if the component unmounts or if allUploadsSuccess changes
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
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "DM Sans",
                    fontSize: {
                      xs: "1.7rem", // Mobile
                      sm: "2.5rem", // Tablet
                      md: "2rem", // Desktop
                    },
                    color: "#2f3ee3",
                    fontWeight: 500,
                    marginBottom: 1,
                  }}
                >
                  Statement Upload
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "2vh",
                    color: theme.palette.whitetext.blacl,
                    marginBottom: 3,
                  }}
                  variant="subtitle1"
                // color="black"
                >
                  Step 2/4
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.75rem", // Mobile
                      sm: "0.875rem", // Tablet
                      md: "1rem", // Desktop
                    },
                    color: theme.palette.whitetext.black,
                  }}
                >
                  ( Upload your recent 6 months Bank Statement)
                  <br />
                  (Maximum File Upload Limit Is 10 )
                </Typography>
              </Box>

              {/* File input and display */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius:"20px",
                  backgroundColor: "#eaf4f4",
                  width: "50%",
                  p: 3
                }}
              >
                {/* File picker with multiple file upload support */}
                {selectedFiles.length < 10 && (
                  <IconButton
                    component="label"
                    sx={{
                      mb: 2,

                      color: theme.palette.whitetext.white,
                    }}
                  >
                    <AddPhotoAlternateIcon sx={{ color: "black" }} />
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

                        // Check file size limit (1MB = 10,04,85,760 bytes)
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
                  <Box sx={{ width: "100%", maxWidth: "40vw", mt: 2 }}>
                    {selectedFiles.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                          // ml: "36%"
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
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#4E9FE5",
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                      mt: 2,
                      "&:hover": {
                        backgroundColor: "blue",
                        color: "white",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Upload"
                    )}
                  </Button>

                  <Button
                    sx={{
                      mt: 2,
                      fontFamily: "Poppins",
                      fontSize: ".9rem",
                      color: "black",
                      "&.Mui-disabled": {
                        color: "black",
                        opacity: 0.5,
                      },
                    }}
                    onClick={handleNext}
                    disabled={selectedFiles.length > 0}
                  >
                    Skip
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

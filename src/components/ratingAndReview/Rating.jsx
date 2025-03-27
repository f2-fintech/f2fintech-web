import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  Container,
  Paper,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Toast from "../toast/Toast";
import { Utility } from "../utility";
import { RatingRevAPI } from "../../apis/RatingRevAPI";

const commentValidationSchema = Yup.object().shape({
  comment: Yup.string()
    .min(5, "Comment must be at least 5 characters long")
    .max(400, "Comment cannot be longer than 400 characters")
    .matches(
      /^[a-zA-Z0-9\s,.!?'-]+$/, // Allow letters, numbers, spaces, and common punctuation
      "Comment can only contain letters, numbers, and basic punctuation"
    ),
});

const RatingReview = () => {
  const [rating, setRating] = useState(0);
  const [initialComment, setInitialComment] = useState("");
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const toastInfo = useSelector((state) => state.toastInfo);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    toastAndNavigate,
    getLocalStorage,
    setLocalStorage,
    remLocalStorage,
  } = Utility();
  const customer = getLocalStorage("customerInfo");

  useEffect(() => {
    const savedData = getLocalStorage("savedRatingReview");
    if (savedData) {
      setRating(Number(savedData.rating));
      setInitialComment(savedData.review);
    }
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    if (!customer) {
      setLocalStorage("savedRatingReview", {
        rating: rating,
        review: values.comment,
      });
      setOpenLoginDialog(true);
      return;
    }

    const ratingData = {
      rating: rating,
      review: values.comment,
      customer_id: customer.id,
    };
    RatingRevAPI.createRating(ratingData)
      .then((response) => {
        console.log("response", response);
        toastAndNavigate(dispatch, true, "info", "Review Submitted");
        setRating(0);
        setInitialComment("");
        remLocalStorage("savedRatingReview");
        resetForm();
      })
      .catch((err) => {
        console.log("An Error Occurred", err);
        toastAndNavigate(dispatch, true, "error", "Failed to submit review");
      });
  };

  const handleLoginRedirect = () => {
    setOpenLoginDialog(false);
    navigate("/login", { state: { from: location } });
  };
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{}}>
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          marginBottom: "-10px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "3vh", sm: "4vh", md: "6vh" },
          borderRadius: "20px",
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundSize: "cover",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "center",
            mb: { xs: 4, md: 0 },
          }}
        >
          <img
            src="/ratinglast.png"
            alt="Rating Illustration"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "20px",
            }}
          />
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h1"
            fontWeight="bold"
            fontFamily="Poppins"
            sx={{
              color: theme.palette.whitetext.white,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              mb: 2,
            }}
          >
            Rating and Review
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.whitetext.white,
              fontFamily: "Poppins",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              mb: 2,
            }}
          >
            How are you feeling?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.whitetext.white,
              fontFamily: "Poppins",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              mb: 4,
            }}
          >
            Your input is valuable in helping us better understand your needs
            and tailor our service accordingly.
          </Typography>

          {/* Rating Section */}
          <Box
            display="flex"
            justifyContent={{ xs: "center", md: "flex-start" }}
            my={2}
          >
            <Rating
              sx={{ fontSize: { xs: "2rem", sm: "3rem" }, color: "#FFD700" }}
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>

          {/* Form Section */}
          <Formik
            initialValues={{ comment: initialComment }}
            validationSchema={commentValidationSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values, { resetForm });
            }}
          >
            {({
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              values,
            }) => (
              <Form>
                <TextField
                  name="comment"
                  label="Add a Comment.."
                  variant="outlined"
                  value={values.comment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: "15px",
                      color: "black !important",
                      "& fieldset": {
                        borderColor: theme.palette.secondary.main,
                        borderRadius: "15px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "gray",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "black",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: ".85rem",
                      fontFamily: "DM sans",
                      fontWeight: "550",
                    },
                  }}
                  error={touched.comment && !!errors.comment}
                  helperText={touched.comment && errors.comment}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: { xs: "0.5rem 1rem", sm: "0.5rem 1.5rem" },
                    width: { xs: "100%", sm: "auto" },
                    borderRadius: "30px",
                    color: "#000000",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: "1.5rem",
                    textTransform: "none",
                    backgroundColor: theme.palette.whitetext.white,
                    mt: 2.3,
                    cursor: "pointer",
                    border: "none",
                    "&:hover": {
                      backgroundColor: theme.palette.whitetext.white,
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>

      {/* Login Dialog */}
      <Dialog
        open={openLoginDialog}
        onClose={() => setOpenLoginDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must be logged in to submit a review.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLoginDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoginRedirect} color="primary" autoFocus>
            Log In
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Toast
        alerting={toastInfo.toastAlert}
        message={toastInfo.toastMessage}
        severity={toastInfo.toastSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Container>
  );
};

export default RatingReview;

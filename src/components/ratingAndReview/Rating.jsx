import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonComp from "../common/button/Button";

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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "6vh",
        borderRadius: "30px",
        margin: "0px auto 100px auto",
        maxWidth: "70%",
        transition: "transform 0.3s ease",
        backgroundImage: "url(caltheme.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "0 0  7px #FFD700",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 0  7px #50C878",
        },
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <img
          src="/ratinglast.png"
          style={{
            height: "",
            width: "32vw",
            paddingTop: "10px",
          }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "2rem",
            fontFamily: "cursive",
            fontWeight: "500",
            color: "#ffffff",
            fontFamily: "DM sans",
            fontSize: "2.2rem",
            fontWeight: "500",
          }}
          gutterBottom
        >
          Rating and
          <span style={{ color: "#FFD700" }}> Review </span>
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#ffffff",
            fontFamily: "Poppins",
          }}
          gutterBottom
        >
          How are you feeling
        </Typography>
        <Typography
          sx={{
            fontSize: "1.1em",
            fontWeight: "400",
            marginTop: "2vh",
            fontFamily: "Poppins",
          }}
          gutterBottom
        >
          Your input is valuable in helping us better understand your needs and
          tailor our service accordingly.
        </Typography>
        <Box display="flex" justifyContent="flex-start" my={2}>
          <Rating
            sx={{ fontSize: "3rem", color: "#FFD700" }}
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
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
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
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
                  width: "30vw",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white", // Set background color to white
                    borderRadius: "15px", // Customize border radius
                    color: "black !important",
                    "& fieldset": {
                      borderColor: "#FFD700", // Default border color
                      borderRadius: "15px", // Ensure border radius applies to fieldset as well
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "gray", // Border color on focus
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black", // Label color on focus
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
                sx={{
                  padding: "0.5rem 1.5rem",
                  width: "13vw",
                  borderRadius: "30px",
                  color: "#000000",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "1.1rem",
                  lineHeight: "1.5rem",
                  textTransform: "none",
                  backgroundColor: "#FFD700",
                  mt:2.3,
                  cursor: "pointer",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "#FFD700", // Change this to the desired hover color
                    color: "#ffffff", // Optionally, change text color on hover
                  },
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
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
        <Toast
          alerting={toastInfo.toastAlert}
          message={toastInfo.toastMessage}
          severity={toastInfo.toastSeverity}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </Box>
    </Box>
  );
};

export default RatingReview;

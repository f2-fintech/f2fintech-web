import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Box, Button, Typography } from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object({
  field1: Yup.string().required("Required"),
});

const Step5Form = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "15px 15px",
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.5rem", md: "2.5rem" },
                background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "Poppins",
                mb: 1,
              }}
            >
              Business Details
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "1.1rem",
                color: "rgba(0, 0, 0, 0.4)",
                fontWeight: 600,
              }}
            >
              Step 5 of 5
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            name="field1"
            label="Business Name"
            placeholder="Enter your business name"
            sx={{
              width: { xs: "100%", md: "75%", lg: "60%" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                "& fieldset": { borderColor: "rgba(30, 60, 114, 0.2)" },
                "&:hover fieldset": { borderColor: "#1e3c72" },
                "&.Mui-focused fieldset": { borderColor: "#1e3c72", borderWidth: "1px" },
              },
              "& .MuiInputLabel-root": {
                color: "#555",
                "&.Mui-focused": { color: "#1e3c72" },
              },
            }}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
              color: "white",
              fontWeight: 700,
              fontFamily: "Poppins",
              fontSize: "1.1rem",
              borderRadius: "12px",
              px: 8,
              py: 1.5,
              mt: 2,
              textTransform: "none",
              boxShadow: "0 8px 24px rgba(30, 60, 114, 0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px rgba(30, 60, 114, 0.4)",
              },
            }}
          >
            Submit Details
          </Button>
          <ErrorMessage
            name="field1"
            component="div"
            style={{ color: "#d32f2f", fontFamily: "Poppins", fontSize: "0.8rem", marginTop: "8px" }}
          />
        </Box>
      </Form>
    )}
  </Formik>
);

export default Step5Form;

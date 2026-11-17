import React from "react";
import { Formik, Form } from "formik";
import { Box, Container, Typography, Button } from "@mui/material";
import * as Yup from "yup";

import Otp from "./Otp";
const initialValues = {
  otp: "",
};

const validationSchema = Yup.object({
  otp: Yup.string().required("Required"),
});

const Step2Form = ({ handleNext }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleNext}
  >
    {({ isSubmitting }) => (
      <Form>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.5rem", md: "2.5rem" },
                  background: "linear-gradient(135deg, #3244e6 0%, #4f61f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Poppins",
                  mb: 1,
                }}
              >
                Pan Card Verification
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "1.1rem",
                  color: "rgba(0, 0, 0, 0.4)",
                  fontWeight: 600,
                }}
              >
                Step 2 of 5
              </Typography>
            </Box>
          </Box>
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
            <Otp />
            <Button
              type="submit"
              variant="contained"
              onClick={handleNext}
              sx={{
                background: "linear-gradient(135deg, #3244e6 0%, #4f61f7 100%)",
                color: "white",
                fontWeight: 700,
                fontFamily: "Poppins",
                fontSize: "1.1rem",
                borderRadius: "12px",
                px: 8,
                py: 1.5,
                mt: 4,
                textTransform: "none",
                boxShadow: "0 8px 24px rgba(50, 68, 230, 0.3)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 32px rgba(50, 68, 230, 0.4)",
                  background: "linear-gradient(135deg, #3244e6 0%, #4f61f7 100%)",
                },
              }}
            >
              Verify OTP
            </Button>
          </Box>
        </Container>
      </Form>
    )}
  </Formik>
);

export default Step2Form;

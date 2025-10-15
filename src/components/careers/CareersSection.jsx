import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  Modal,
  Fade,
  Grid,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

const CareersSection = () => {
  const theme = useTheme();
  const [ open, setOpen ] = useState( false );
  const [ showToast, setShowToast ] = useState( false );
  const [ formData, setFormData ] = useState( {
    organization: "",
    name: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    description: "",
  } );

  const handleChange = ( e ) => {
    setFormData( { ...formData, [ e.target.name ]: e.target.value } );
  };

  const handleSubmit = () => {
    console.log( "Form Submitted:", formData );
    setOpen( false );
    setShowToast( true );

    // Reset form data
    setFormData( {
      organization: "",
      name: "",
      contact: "",
      email: "",
      state: "",
      city: "",
      description: "",
    } );
  };

  const handleCloseToast = ( event, reason ) => {
    if ( reason === "clickaway" ) {
      return;
    }
    setShowToast( false );
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
  };

  return (
    <Box
      sx={ {
        py: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f5f7ff 0%, #f0f4ff 100%)",
        "&:before": {
          content: '""',
          position: "absolute",
          top: -50,
          right: 100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(50, 68, 230, 0.08)",
          zIndex: 0,
        },
      } }
    >
      <Container maxWidth="lg">
        <Box
          sx={ {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          } }
        >
          <Typography
            variant="h2"
            sx={ {
              mb: 3,
              background: "linear-gradient(90deg, #000 0%, #000 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 700,
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "1.875rem", md: "3.25rem" },
              lineHeight: 1.2,
            } }
          >
            Grow{ " " }
            <span
              style={ {
                color: "#3244e6",
              } }
            >
              With Us
            </span>
          </Typography>

          <Typography
            variant="h3"
            sx={ {
              mb: 4,
              color: "#3244e6",
              fontWeight: 600,
              fontFamily: "Urbanist, sans-serif",
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "1.7rem" },
              lineHeight: 1.3,
            } }
          >
            Explore Careers at F2 Fintech
          </Typography>

          {/* Modern Card Container */ }
          <Box
            sx={ {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              p: { xs: 3, md: 6 },
              width: "100%",
              maxWidth: "900px",
              height: "auto",
              boxShadow: "0 20px 40px rgba(50, 68, 230, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 25px 50px rgba(50, 68, 230, 0.15)",
              },
            } }
          >
            <Typography
              variant="h3"
              sx={ {
                mb: 3,
                color: "#444",
                fontWeight: 400,
                fontFamily: "verdana, sans-serif",
                fontSize: { xs: "16px", sm: "18px" },
                lineHeight: 1.4,
                maxWidth: "800px",
                mx: "auto",
              } }
            >
              Join a fast-growing fintech company that's revolutionizing
              financial access through innovation and technology.
            </Typography>

            <Typography
              variant="body1"
              sx={ {
                mb: 6,
                fontWeight: 400,
                color: "#444",
                maxWidth: "600px",
                mx: "auto",
                fontFamily: "verdana, sans-serif",
                fontSize: { xs: "16px", sm: "18px" },
                lineHeight: 1.4,
              } }
            >
              We're building a team of passionate individuals who want to make a
              real impact in the financial world. Your journey starts here.
            </Typography>

            {/* Animated Button that opens Modal */ }
            <Button
              variant="contained"
              size="large"
              onClick={ () => setOpen( true ) }
              sx={ {
                borderRadius: "30px",
                background: theme.palette.secondary.main,
                color: "#fff",
                fontWeight: 600,
                fontSize: { xs: "1rem", md: "1.1rem" },
                px: { xs: 5, md: 3.5 },
                py: { xs: 1.5, md: 1.5 },
                textTransform: "none",
                boxShadow: "0 10px 20px rgba(50, 68, 230, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                fontFamily: "Poppins, sans-serif",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "0.5s",
                },
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 30px rgba(50, 68, 230, 0.4)",
                  background: theme.palette.secondary.main,
                  "&:before": {
                    left: "100%",
                  },
                },
              } }
            >
              View Open Positions
            </Button>
          </Box>
        </Box>
      </Container>

      {/* =================== MODAL =================== */ }
      <Modal open={ open } onClose={ () => setOpen( false ) } closeAfterTransition>
        <Fade in={ open }>
          <Box
            sx={ {
              ...modalStyle,
              width: { xs: "90%", sm: "80%", md: "65%", lg: "55%" },
              maxHeight: "90vh",
              overflowY: "auto",
              p: { xs: 3, sm: 4, md: 5 },
              background:
                "linear-gradient(145deg, #ffffff 0%, #fafbff 50%, #f5f7ff 100%)",
              border: "1px solid rgba(50, 68, 230, 0.1)",
            } }
          >
            {/* Modal Header */ }
            <Box sx={ { textAlign: "center", mb: { xs: 3, sm: 4 } } }>
              <Typography
                variant="h4"
                sx={ {
                  fontWeight: 700,
                  background:
                    "linear-gradient(45deg, #3244e6 30%, #2a38c4 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
                } }
              >
                Explore Careers at F2 Fintech
              </Typography>
              <Typography
                sx={ {
                  color: "#666",
                  mt: 1,
                  fontFamily: "Inter, sans-serif",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                } }
              >
                Join our network and grow with us
              </Typography>
            </Box>

            <Grid container spacing={ { xs: 2, sm: 3 } }>
              { [
                {
                  label: "Organization Name (Optional)",
                  name: "organization",
                  required: false,
                },
                {
                  label: "Name of Position Applying For",
                  name: "organization",
                  required: false,
                },
                { label: "Name", name: "name", required: true },
                { label: "Contact", name: "contact", required: true },
                { label: "Email", name: "email", required: true },
                { label: "State", name: "state", required: true, half: true },
                { label: "City", name: "city", required: true, half: true },
                {
                  label: "Description (Optional)",
                  name: "description",
                  required: false,
                  multiline: true,
                },
              ].map( ( field, index ) => (
                <Grid item xs={ 12 } sm={ field.half ? 6 : 12 } key={ field.name }>
                  <Fade in={ open } timeout={ 800 + index * 100 }>
                    <TextField
                      fullWidth
                      label={ field.label }
                      name={ field.name }
                      value={ formData[ field.name ] }
                      onChange={ handleChange }
                      required={ field.required }
                      multiline={ field.multiline }
                      rows={ field.multiline ? 3 : 1 }
                      sx={ {
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#3244e6",
                              borderWidth: "2px",
                            },
                          },
                          "&.Mui-focused": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#3244e6",
                              borderWidth: "2px",
                            },
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "Inter, sans-serif",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#3244e6",
                        },
                      } }
                    />
                  </Fade>
                </Grid>
              ) ) }

              <Grid item xs={ 12 } sx={ { pt: 3 } }>
                <Fade in={ open } timeout={ 1600 }>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={ handleSubmit }
                    sx={ {
                      borderRadius: "16px",
                      background:
                        "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
                      color: "white",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      minHeight: { xs: "56px", sm: "60px" },
                      maxWidth: { xs: "100%", sm: "90%" },
                      mx: "auto",
                      display: "block",
                      fontSize: { xs: "1.1rem", sm: "1.2rem" },
                      textTransform: "none",
                      boxShadow: "0 8px 25px rgba(50, 68, 230, 0.4)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.6s",
                      },
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #2a38c4 0%, #3244e6 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 35px rgba(50, 68, 230, 0.6)",
                        "&::before": {
                          left: "100%",
                        },
                      },
                    } }
                  >
                    Submit Application
                  </Button>
                </Fade>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>

      {/* Success Toast Notification */ }
      <Snackbar
        open={ showToast }
        autoHideDuration={ 3000 }
        onClose={ handleCloseToast }
        anchorOrigin={ { vertical: "top", horizontal: "center" } }
      >
        <Alert
          onClose={ handleCloseToast }
          severity="success"
          variant="filled"
          sx={ {
            width: "100%",
            borderRadius: "12px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "1rem",
            fontWeight: 500,
            boxShadow: "0 8px 25px rgba(50, 68, 230, 0.3)",
            background: "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
          } }
        >
          Application submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CareersSection;
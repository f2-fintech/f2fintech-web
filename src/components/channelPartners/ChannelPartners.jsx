import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { postChannelPartner } from "../../apis/ChannelPartnerAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 520,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  p: 4,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
};

// Category options for dropdown
const categoryOptions = [
  "Student",
  "Salaried Person",
  "Working Individual",
  "Broker",
  "DSA",
  "Retired Banker",
  "Self Employed",
  "Real Estate Agent"
];

export default function ChannelPartners() {
  const [ open, setOpen ] = useState( false );
  const [ formData, setFormData ] = useState( {
    organization: "",
    category: "",
    name: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    description: "",
  } );

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery( theme.breakpoints.down( "sm" ) );

  const handleChange = ( e ) => {
    setFormData( { ...formData, [ e.target.name ]: e.target.value } );
  };

  const handleSubmit = async () => {
    try {
      await postChannelPartner( formData );
      toast.success( "✅ Application Submitted Successfully!" );
      setOpen( false );
      setFormData( {
        organization: "",
        category: "",
        name: "",
        contact: "",
        email: "",
        state: "",
        city: "",
        description: "",
      } );
    } catch ( error ) {
      console.error( error );
      toast.error( "❌ Something went wrong. Please try again." );
    }
  };

  return (
    <Box
      sx={ {
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        paddingTop: 4,
      } }
    >
      {/* Background Elements */ }
      <Box
        sx={ {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
          zIndex: 0,
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
          },
        } }
      />

      <Box
        sx={ {
          background: "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 3,
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        } }
      >
        {/* Floating Shapes */ }
        <Box
          sx={ {
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            animation: "float 6s ease-in-out infinite",
          } }
        />
        <Box
          sx={ {
            position: "absolute",
            bottom: "30%",
            right: "15%",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            animation: "float 4s ease-in-out infinite 1s",
          } }
        />

        <Container maxWidth="md">
          <Slide in={ true } direction="down" timeout={ 800 }>
            <Typography
              fontWeight="bold"
              sx={ {
                color: "#fff",
                mb: 4,
                fontFamily: "Poppins, sans-serif",
                fontSize: {
                  xs: "2.2rem",
                  sm: "2.8rem",
                  md: "3.2rem",
                  xl: "3.5rem",
                },
                lineHeight: 1.1,
                textShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                background: "linear-gradient(45deg, #fff 30%, #f0f4ff 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              } }
            >
              Become Our Channel Partner
            </Typography>
          </Slide>

          <Fade in={ true } timeout={ 1000 }>
            <Typography
              variant="h6"
              sx={ {
                mb: 5,
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                lineHeight: 1.7,
                maxWidth: "700px",
                mx: "auto",
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              } }
            >
              Join hands with{ " " }
              <strong style={ {
                fontFamily: "Poppins",
                fontWeight: 600,
                background: "linear-gradient(45deg, #ffd700 30%, #fff8dc 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              } }>F2 Fintech</strong>{ " " }
              and unlock new growth opportunities in the financial ecosystem
            </Typography>
          </Fade>

          <Fade in={ true } timeout={ 1200 }>
            <Button
              variant="contained"
              onClick={ () => setOpen( true ) }
              sx={ {
                borderRadius: "50px",
                background: "linear-gradient(45deg, #ffffff 0%, #f8faff 100%)",
                color: "#3244e6",
                fontWeight: 700,
                fontSize: { xs: "1.1rem", md: "1.2rem" },
                px: { xs: 6, md: 5 },
                py: { xs: 1.8, md: 1.8 },
                textTransform: "none",
                boxShadow: "0 12px 30px rgba(255, 255, 255, 0.25)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                fontFamily: "Poppins, sans-serif",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  transition: "left 0.5s",
                },
                "&:hover": {
                  background: "linear-gradient(45deg, #ffffff 0%, #e8edff 100%)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 16px 40px rgba(255, 255, 255, 0.35)",
                  "&::before": {
                    left: "100%",
                  },
                },
              } }
            >
              Apply Now
            </Button>
          </Fade>
        </Container>
      </Box>

      {/* Enhanced Modal */ }
      <Modal open={ open } onClose={ () => setOpen( false ) } closeAfterTransition>
        <Fade in={ open }>
          <Box
            sx={ {
              ...modalStyle,
              width: { xs: "90%", sm: "80%", md: "65%", lg: "55%" },
              maxHeight: "90vh",
              overflowY: "auto",
              p: { xs: 3, sm: 4, md: 5 },
              background: "linear-gradient(145deg, #ffffff 0%, #fafbff 50%, #f5f7ff 100%)",
              border: "1px solid rgba(50, 68, 230, 0.1)",
            } }
          >
            {/* Modal Header */ }
            <Box sx={ { textAlign: "center", mb: { xs: 3, sm: 4 } } }>
              <Box
                sx={ {
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  boxShadow: "0 8px 20px rgba(50, 68, 230, 0.3)",
                } }
              >
                <Typography
                  sx={ {
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                  } }
                >
                  CP
                </Typography>
              </Box>
              <Typography
                variant="h4"
                sx={ {
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #3244e6 30%, #2a38c4 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
                } }
              >
                Channel Partner Application
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
              {/* Organization Name */ }
              <Grid item xs={ 12 }>
                <Fade in={ open } timeout={ 800 }>
                  <TextField
                    fullWidth
                    label="Organization Name (Optional)"
                    name="organization"
                    value={ formData.organization }
                    onChange={ handleChange }
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

              {/* Category Dropdown */ }
              <Grid item xs={ 12 }>
                <Fade in={ open } timeout={ 900 }>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={ {
                        fontFamily: "Inter, sans-serif",
                        "&.Mui-focused": {
                          color: "#3244e6",
                        },
                      } }
                    >
                      Select Category *
                    </InputLabel>
                    <Select
                      name="category"
                      value={ formData.category }
                      onChange={ handleChange }
                      required
                      label="Category *"
                      sx={ {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(0, 0, 0, 0.23)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#3244e6",
                          borderWidth: "2px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#3244e6",
                          borderWidth: "2px",
                        },
                        "& .MuiSelect-select": {
                          fontFamily: "Inter, sans-serif",
                        },
                      } }
                    >
                      { categoryOptions.map( ( option ) => (
                        <MenuItem
                          key={ option }
                          value={ option }
                          sx={ {
                            fontFamily: "Inter, sans-serif",
                          } }
                        >
                          { option }
                        </MenuItem>
                      ) ) }
                    </Select>
                  </FormControl>
                </Fade>
              </Grid>

              {/* Other fields */ }
              { [
                { label: "Name", name: "name", required: true },
                { label: "Contact", name: "contact", required: true },
                { label: "Email", name: "email", required: true },
                { label: "State", name: "state", required: true, half: true },
                { label: "City", name: "city", required: true, half: true },
                { label: "Description (Optional)", name: "description", required: false, multiline: true },
              ].map( ( field, index ) => (
                <Grid item xs={ 12 } sm={ field.half ? 6 : 12 } key={ field.name }>
                  <Fade in={ open } timeout={ 1000 + index * 100 }>
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
                      background: "linear-gradient(135deg, #3244e6 0%, #2a38c4 100%)",
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
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.6s",
                      },
                      "&:hover": {
                        background: "linear-gradient(135deg, #2a38c4 0%, #3244e6 100%)",
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

      {/* Add floating animation */ }
      <style>{ `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
}
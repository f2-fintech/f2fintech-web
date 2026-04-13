import { useEffect, useState, useRef } from "react";
import { Container, Typography, Grid, Box, Rating, Dialog, DialogContent, IconButton, Button, DialogTitle, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Carousel from "react-material-ui-carousel";
import API from "../../apis";
import { Utility } from "../utility";
import { createTheme, useTheme } from "@mui/material/styles";
import "@fontsource/urbanist/600.css";
import ButtonComp from "../common/button/Button";

const theme = createTheme({
  typography: {
    fontFamily:
      '"Urbanist", "Roboto", "Helvetica", "Arial", sans-serif, system-ui',
  },
});
const Customers = () => {
  const [customerRatings, setCustomerRatings] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ customer_id: "", rating: 5, review: "", thumbnail: "" });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [customersList, setCustomersList] = useState([]);
  const scrollRef = useRef(null);
  const theme = useTheme();
  const { capitalizeFirstLetter } = Utility();
  const { formatNameDr } = Utility();
  const serverBaseUrl = import.meta.env.VITE_BASE_URL?.replace("/api/v1", "") || "";

  const customerInfo = JSON.parse(localStorage.getItem("customerInfo") || "{}");
  const userRole = customerInfo?.role || "customer";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleAddSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("customer_id", newTestimonial.customer_id);
      formData.append("rating", newTestimonial.rating);
      formData.append("review", newTestimonial.review);
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      } else {
        formData.append("thumbnail", "/new/dr.sunilkshastri.jpeg");
      }

      const response = await API.RatingRevAPI.createRating(formData);
      if (response?.data?.status === "Success" || response?.data?.status === 200 || response?.status === 200) {
        setIsAddModalOpen(false);
        setNewTestimonial({ customer_id: "", rating: 5, review: "", thumbnail: "" });
        setThumbnailFile(null);
        setThumbnailPreview("");
        window.location.reload();
      } else {
        alert("Failed to add testimonial");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding testimonial");
    }
  };

  useEffect(() => {
    if (userRole === "marketing_agent") {
      API.CustomerAPI.getCustomer()
        .then((res) => {
          if (res?.data?.data?.customers) {
            setCustomersList(res.data.data.customers);
          }
        })
        .catch((err) => console.error("Error fetching customers list:", err));
    }

    API.RatingRevAPI.getRating()
      .then((res) => {
        if (res && res.data && res.data.data && res.data.data.reviews) {
          const ratingData = res.data.data.reviews;

          const profilePromises = ratingData.map((cust) => {
            const cid = cust.customer_id || cust.id;
            return API.CustomerAPI.getCustomerProfile(cid)
              .then((profile) => ({
                ...cust,
                profile: profile.data.data.customer,
              }))
              .catch((profileErr) => {
                console.error(`Profile error for customer ${cid}`, profileErr);
                return { ...cust, profile: null };
              });
          });

          Promise.all(profilePromises)
            .then((ratingsWithProfiles) => {
              setCustomerRatings(ratingsWithProfiles);
            })
            .catch((err) => {
              console.error("Error in processing profiles", err);
            });
        }
      })
      .catch((err) => {
        console.error("Error fetching ratings:", err);
      });
  }, []);

  // Show all video reviews (different customers may share same video URL — that is OK)
  const videoReviews = customerRatings.filter((c) =>
    c.review?.toLowerCase().includes("drive.google.com")
  );

  const textReviews = customerRatings.filter(
    (c) => !c.review?.toLowerCase().includes("drive.google.com")
  );

  const handleOpenPopup = (review) => {
    setSelectedReview(review);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedReview(null);
  };

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    document.getElementById("carousel-container").click();
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
      const regExp = /(?:https?:\/\/)?(?:drive\.google\.com\/)(?:file\/d\/|open\?id=)([^?\/&]+)/;
      const match = url.match(regExp);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return url;
  };

  if (!customerRatings.length) {
    return null;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3 },
        position: "relative",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 3, md: 6 },
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            top: 10,
            right: 1100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(50, 68, 230, 0.05)",
          },
        }}
      >
        {userRole === "marketing_agent" && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => setIsAddModalOpen(true)}
              sx={{
                bgcolor: "#3244e6",
                color: "#FFFFFF",
                borderRadius: "20px",
                textTransform: "none",
                fontFamily: "Poppins",
                "&:hover": { bgcolor: "#2835b3" }
              }}
            >
              + Add Testimonial
            </Button>
          </Box>
        )}
        <Typography
          fontWeight="700"
          fontFamily="Poppins"
          sx={{
            fontSize: {
              xs: "1.75rem",
              sm: "2.25rem",
              md: "2.75rem",
              xl: "3.25rem",
            },
            color: theme.palette.text.primary,
            mb: { xs: 2, md: 3 },
            lineHeight: 1.2,
          }}
        >
          <span
            style={{
              color: theme.palette.text.primary,
              fontFamily: "Urbanist",
            }}
          >
            Happy &{" "}
          </span>
          <span
            style={{
              background: "linear-gradient(135deg, #3244e6 0%, #5a67f2 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Urbanist",
            }}
          >
            Satisfied Customers
          </span>
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            fontWeight: 500,
            color: theme.palette.text.secondary,
            fontFamily: "Poppins",
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Here is what some of our satisfied clients have to say about our work
        </Typography>
      </Box>

      {/* Dynamic Video Testimonials Grid */}
      {videoReviews.length > 0 && (
        <Box
          sx={{
            mb: { xs: 8, md: 10 },
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left Arrow */}
          <IconButton
            onClick={() => {
              if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
            }}
            sx={{
              position: "absolute",
              left: { xs: 0, md: -80 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              "&:hover": { backgroundColor: "#fff" },
              display: videoReviews.length > 1 ? "flex" : "none"
            }}
          >
            <ArrowBackIosNewIcon sx={{ color: theme.palette.primary.main, fontSize: "1.2rem" }} />
          </IconButton>

          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              gap: 4,
              pb: 4,
              pt: 4,
              px: { xs: 2, md: 4 },
              mx: { xs: -2, md: -4 },
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {videoReviews.map((video, index) => (
              <Box
                key={index}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "85vw", sm: "45vw", md: "30vw" },
                  maxWidth: "400px",
                  scrollSnapAlign: "center",
                }}
              >
                <Box
                  sx={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(15px)",
                    borderRadius: { xs: "24px", md: "32px" },
                    p: { xs: 1.5, sm: 2 },
                    border: "1px solid rgba(50, 68, 230, 0.15)",
                    boxShadow: "0 25px 50px -12px rgba(50, 68, 230, 0.15)",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 35px 70px -12px rgba(50, 68, 230, 0.3)",
                    },
                  }}
                >
                  {/* Decorative camera icon badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -12,
                      right: -12,
                      width: 50,
                      height: 50,
                      background: "linear-gradient(135deg, #3244e6 0%, #5a67f2 100%)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 15px rgba(50, 68, 230, 0.4)",
                      zIndex: 2,
                      border: "3px solid #fff",
                    }}
                  >
                    <Typography sx={{ color: "#fff", fontSize: "1rem" }}>🎥</Typography>
                  </Box>

                  {/* Thumbnail — click opens popup */}
                  <Box
                    onClick={() => handleOpenPopup(video)}
                    sx={{
                      position: "relative",
                      paddingTop: "62%", /* Roughly 16:10 aspect ratio */
                      width: "100%",
                      borderRadius: "18px",
                      overflow: "hidden",
                      backgroundColor: "#000",
                      cursor: "pointer",
                      "&:hover .play-btn": {
                        transform: "translate(-50%, -50%) scale(1.12)",
                        boxShadow: "0 0 40px rgba(50, 68, 230, 0.7)",
                      },
                    }}
                  >
                    {/* Thumbnail image */}
                    <img
                      src={video.thumbnail?.startsWith("/uploads") ? `${serverBaseUrl}${video.thumbnail}` : (video.thumbnail || "/new/dr.sunilkshastri.jpeg")}
                      alt={`Thumbnail for ${video.name}`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                      }}
                    />
                    {/* Dark gradient overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.50) 100%)",
                      }}
                    />
                    {/* Play button */}
                    <Box
                      className="play-btn"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: 36, md: 44 },
                        height: { xs: 36, md: 44 },
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #3244e6 0%, #5a67f2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 18px rgba(50, 68, 230, 0.55)",
                        border: "2px solid rgba(255,255,255,0.85)",
                        transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: "block",
                          width: 0,
                          height: 0,
                          borderTop: "12px solid transparent",
                          borderBottom: "12px solid transparent",
                          borderLeft: "20px solid #fff",
                          ml: "4px",
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Name below — also opens popup */}
                  <Box
                    onClick={() => handleOpenPopup(video)}
                    sx={{ mt: 2, textAlign: "center", px: 1, cursor: "pointer" }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        fontFamily: "Urbanist",
                      }}
                    >
                      {formatNameDr(video.name)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Right Arrow */}
          <IconButton
            onClick={() => {
              if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
            }}
            sx={{
              position: "absolute",
              right: { xs: 0, md: -80 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              "&:hover": { backgroundColor: "#fff" },
              display: videoReviews.length > 1 ? "flex" : "none"
            }}
          >
            <ArrowForwardIosIcon sx={{ color: theme.palette.primary.main, fontSize: "1.2rem" }} />
          </IconButton>
        </Box>
      )}

      {/* Carousel Section for Text Reviews */}
      {textReviews.length > 0 && (
        <>
          <Box sx={{ position: "relative", mb: 4 }}>
            <Carousel
              id="carousel-container"
              indicators={false}
              navButtonsAlwaysVisible={false}
              autoPlay={true}
              interval={5000}
              index={activeIndex}
              onChange={(index) => handleSlideChange(index)}
              sx={{
                fontFamily: "Poppins",
                "& .CarouselItem": {
                  padding: { xs: "0 8px", sm: "0 16px" },
                },
              }}
            >
              {textReviews.map((customer, i) => (
                <Grid
                  container
                  spacing={2}
                  key={i}
                  sx={{
                    justifyContent: "center",
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  <Grid item xs={12} sm={10} md={8}>
                    <Box
                      onClick={() => handleOpenPopup(customer)}
                      sx={{
                        position: "relative",
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, rgba(50, 68, 230, 0.9) 100%)`,
                        borderRadius: "24px",
                        p: { xs: 3, sm: 4, md: 5 },
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        minHeight: { xs: "280px", sm: "300px", md: "320px" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.01)",
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                          borderRadius: "24px",
                          pointerEvents: "none",
                        },
                      }}
                    >
                      {/* Quote Icon */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: { xs: 16, md: 20 },
                          left: { xs: 16, md: 20 },
                          width: { xs: 32, md: 40 },
                          height: { xs: 32, md: 40 },
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: { xs: "1.2rem", md: "1.5rem" },
                          color: "rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        ❝
                      </Box>

                      {/* Review Text */}
                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          pt: { xs: 4, md: 5 },
                          pb: { xs: 2, md: 3 },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                            fontWeight: 500,
                            color: theme.palette.whitetext?.white || "#ffffff",
                            fontFamily: "DM Sans",
                            lineHeight: 1.7,
                            textAlign: "center",
                            fontStyle: "italic",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {customer.review}
                        </Typography>
                      </Box>

                      {/* Customer Info */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {/* Rating */}
                        <Rating
                          value={Number.parseInt(customer.rating) || 0}
                          readOnly
                          precision={0.5}
                          sx={{
                            mb: 1,
                            "& .MuiRating-iconFilled": {
                              color: "#fdb723",
                              filter:
                                "drop-shadow(0 2px 4px rgba(253, 183, 35, 0.3))",
                            },
                            "& .MuiRating-iconEmpty": {
                              color: "rgba(255, 255, 255, 0.3)",
                            },
                            "& .MuiRating-icon": {
                              fontSize: { xs: "1.4rem", sm: "1.6rem" },
                            },
                          }}
                        />

                        {/* Name */}
                        <Typography
                          sx={{
                            fontSize: { xs: "1.1rem", md: "1.25rem" },
                            fontWeight: 600,
                            color: "#fdb723",
                            fontFamily: "Poppins",
                            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                          }}
                        >
                          {formatNameDr(customer.name)}
                        </Typography>

                        {/* City */}
                        {customer.city && (
                          <Typography
                            sx={{
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              fontWeight: 400,
                              color: "rgba(255, 255, 255, 0.8)",
                              fontFamily: "Poppins",
                            }}
                          >
                            {capitalizeFirstLetter(customer.city)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Carousel>
          </Box>

          {/* Enhanced Dot Indicators */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mt: 3,
            }}
          >
            {textReviews.map((_, index) => (
              <Box
                key={index}
                onClick={() => goToSlide(index)}
                sx={{
                  width: activeIndex === index ? "32px" : "12px",
                  height: "12px",
                  borderRadius: "6px",
                  backgroundColor:
                    activeIndex === index ? "#3244e6" : "rgba(50, 68, 230, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor:
                      activeIndex === index ? "#2c3ce3" : "rgba(50, 68, 230, 0.5)",
                    transform: "scale(1.1)",
                  },
                }}
              />
            ))}
          </Box>
        </>
      )}

      {/* Testimonial Popup Dialog */}
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            overflow: "hidden",
            position: "relative",
          },
        }}
      >
        <IconButton
          onClick={handleClosePopup}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
            zIndex: 10,
            background: "rgba(255,255,255,0.8)",
            "&:hover": { background: "#fff" },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          {selectedReview && (
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              {selectedReview.review?.toLowerCase().includes("drive.google.com") ? (
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "56.25%",
                    borderRadius: "16px",
                    overflow: "hidden",
                    bgcolor: "#000",
                    mb: 3,
                  }}
                >
                  <iframe
                    src={getEmbedUrl(selectedReview.review)}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Enlarged Testimonial"
                  ></iframe>
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 4,
                    background: "rgba(50, 68, 230, 0.05)",
                    borderRadius: "20px",
                    border: "1px solid rgba(50, 68, 230, 0.1)",
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontStyle: "italic",
                      lineHeight: 1.8,
                      color: theme.palette.text.primary,
                      textAlign: "center",
                    }}
                  >
                    "{selectedReview.review}"
                  </Typography>
                </Box>
              )}

              <Box sx={{ textAlign: "center" }}>
                <Rating
                  value={Number.parseInt(selectedReview.rating) || 0}
                  readOnly
                  sx={{ mb: 1.5 }}
                />
                <Typography variant="h5" fontWeight={700} color="primary" sx={{ fontFamily: "Urbanist" }}>
                  {formatNameDr(selectedReview.name)}
                </Typography>
                {selectedReview.city && (
                  <Typography color="text.secondary">
                    {capitalizeFirstLetter(selectedReview.city)}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Testimonial Dialog */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: "Poppins", fontWeight: 700 }}>Add Testimonial</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1, p: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="customer-select-label">Select Customer</InputLabel>
            <Select
              labelId="customer-select-label"
              id="customer-select"
              value={newTestimonial.customer_id}
              label="Select Customer"
              onChange={(e) => setNewTestimonial({ ...newTestimonial, customer_id: e.target.value })}
            >
              {customersList.map((cust) => (
                <MenuItem key={cust.id} value={cust.id}>
                  ID: {cust.id} - {cust.name} ({cust.contact})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Rating (1-5)"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            fullWidth
            value={newTestimonial.rating}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: e.target.value })}
            size="small"
          />
          <TextField
            label="Review (Text or Google Drive Video URL)"
            multiline
            rows={3}
            fullWidth
            value={newTestimonial.review}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, review: e.target.value })}
            size="small"
          />
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontFamily: "Poppins" }}>
              Thumbnail Image (Optional)
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  textTransform: "none",
                  fontFamily: "Poppins",
                  borderRadius: "8px",
                  borderColor: "rgba(0,0,0,0.23)",
                  color: "rgba(0,0,0,0.87)",
                  "&:hover": { borderColor: "rgba(0,0,0,0.87)" }
                }}
              >
                Choose Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              <Typography variant="body2" sx={{ fontFamily: "Poppins", color: thumbnailFile ? "primary.main" : "text.secondary" }}>
                {thumbnailFile ? thumbnailFile.name : "No file chosen"}
              </Typography>
            </Box>
            {thumbnailPreview && (
              <Box sx={{ mt: 1, width: "120px", height: "70px", borderRadius: "12px", overflow: "hidden", border: "2px solid #3244e6", boxShadow: "0 4px 10px rgba(50, 68, 230, 0.2)" }}>
                <img src={thumbnailPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setIsAddModalOpen(false)} color="inherit" sx={{ textTransform: "none", fontFamily: "Poppins" }}>Cancel</Button>
          <Button onClick={handleAddSubmit} variant="contained" sx={{ bgcolor: "#3244e6", textTransform: "none", fontFamily: "Poppins", "&:hover": { bgcolor: "#2835b3" } }}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Apply Now Button */}
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        mt: { xs: 6, md: 10 },
        width: "100%"
      }}>
        <Box sx={{ width: { xs: "100%", sm: "auto", md: "32%" }, display: "flex", justifyContent: "center" }}>
          <Button
            component={Link}
            to="/application-form"
            sx={{
              bgcolor: "#3244e6",
              color: "#FFFFFF",
              fontWeight: "400",
              "&:hover": {
                bgcolor: "#2835b3",
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(50, 68, 230, 0.3)",
              },
              px: { xs: 3, sm: 1 },
              py: { xs: 1.5, sm: .5 },
              fontSize: {
                xs: "0.95rem",
                sm: "1.05rem",
                md: "1.15rem",
              },
              borderRadius: "50px",
              textTransform: "none",
              fontFamily: "Poppins",
              width: "70%",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(50, 68, 230, 0.2)",
            }}
          >
            Apply Now
          </Button>
        </Box>
      </Box>

    </Container>
  );
};

export default Customers;

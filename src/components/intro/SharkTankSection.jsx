"use client";
import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardActionArea,
} from "@mui/material";
import { Play, Tv, Sparkles, Award } from "lucide-react";

const videos = [
  {
    url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/f2fin1.mp4",
    title: "Part 1: The Pitch Introduction",
    description: "Introducing F2 Fintech's revolutionary doctor-centric lending solutions to the Sharks.",
    duration: "1:45",
  },
  {
    url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/f2fin2.mp4",
    title: "Part 2: Business & Valuation Q&A",
    description: "The Sharks dive deep into business numbers, market growth potential, and margins.",
    duration: "2:10",
  },
  {
    url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/assets/f2fin3.mp4",
    title: "Part 3: The Deal & Wrap Up",
    description: "Negotiations culminate in a landmark offer matching F2 Fintech's vision.",
    duration: "1:55",
  },
];

export default function SharkTankSection() {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoSelect = (idx) => {
    setActiveVideoIdx(idx);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Playback error:", err);
      });
    }
  };

  // Sync isPlaying state if the video is paused/played via native controls
  const handleNativePlay = () => setIsPlaying(true);
  const handleNativePause = () => setIsPlaying(false);

  return (
    <Box
      id="shark-tank-section"
      sx={{
        width: "100%",
        backgroundColor: "#f4faff",
        backgroundImage: "radial-gradient(circle at 50% 0%, #f4faff 0%, #eef6ff 70%)",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(58, 73, 214, 0.15), transparent)",
        },
      }}
    >
      {/* Background Ambient Glows */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "rgba(58, 73, 214, 0.06)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background: "rgba(58, 73, 214, 0.04)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* Header Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: "50px",
              backgroundColor: "rgba(217, 119, 6, 0.08)",
              border: "1px solid rgba(217, 119, 6, 0.2)",
              mb: 3,
            }}
          >
            <Award size={16} color="#d97706" />
            <Typography
              variant="caption"
              sx={{
                color: "#d97706",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "Poppins",
              }}
            >
              Exclusive National Pitch
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontFamily: "Poppins, Poppins, sans-serif",
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.6rem" },
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#1e293b",
              mb: 2,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            As Seen on{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #0284c7 0%, #3a49d6 50%, #059669 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Shark Tank India
            </Box>{" "}
            Season 5
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              maxWidth: "650px",
              mx: "auto",
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              fontFamily: "Poppins",
              lineHeight: 1.6,
            }}
          >
            Watch our co-founders pitch F2 Fintech on India&apos;s biggest entrepreneurial stage and secure interest from the country&apos;s top business leaders.
          </Typography>
        </Box>

        {/* Video Player Grid */}
        <Grid container spacing={4} alignItems="stretch">
          {/* Main Video View */}
          <Grid item xs={12} md={7.5}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 0,
                paddingTop: "56.25%", // 16:9 Aspect Ratio
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1), 0 0 30px rgba(58, 73, 214, 0.05)",
                border: "1px solid #cbd5e1",
                backgroundColor: "#000",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "rgba(58, 73, 214, 0.5)",
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15), 0 0 40px rgba(58, 73, 214, 0.1)",
                },
              }}
            >
              {/* Actual Video */}
              <video
                ref={videoRef}
                src={videos[activeVideoIdx].url}
                controls={isPlaying}
                onPlay={handleNativePlay}
                onPause={handleNativePause}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  zIndex: 1,
                }}
              >
                <track kind="captions" src="" srcLang="en" label="English" default />
              </video>

              {/* Play Overlay Thumbnail */}
              {!isPlaying && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    // Use a sleek semi-transparent backdrop gradient showing a preview hint
                    background: "linear-gradient(to bottom, rgba(2, 11, 19, 0.6), rgba(2, 11, 19, 0.95))",
                  }}
                  onClick={handlePlayClick}
                >
                  {/* Decorative Video Icon */}
                  <Tv size={48} style={{ color: "rgba(255,255,255,0.15)", marginBottom: 16 }} />

                  {/* Play Button Overlay */}
                  <Box
                    sx={{
                      width: { xs: 70, md: 90 },
                      height: { xs: 70, md: 90 },
                      borderRadius: "50%",
                      backgroundColor: "rgba(58, 73, 214, 0.9)",
                      boxShadow: "0 0 30px rgba(58, 73, 214, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      border: "2px solid rgba(255,255,255,0.4)",
                      "&:hover": {
                        transform: "scale(1.1)",
                        backgroundColor: "#10b981",
                        boxShadow: "0 0 40px rgba(16, 185, 129, 0.8)",
                        borderColor: "#fff",
                      },
                    }}
                  >
                    <Play size={32} fill="currentColor" style={{ marginLeft: 6 }} />
                  </Box>

                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      color: "#ffffff",
                      fontWeight: 700,
                      mt: 3,
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      textAlign: "center",
                      fontFamily: "Poppins",
                      px: 3,
                    }}
                  >
                    {videos[activeVideoIdx].title}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: "#94a3b8",
                      mt: 1,
                      fontFamily: "Poppins",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Sparkles size={12} color="#10b981" /> Click to play clip
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Clip Playlist Selector */}
          <Grid item xs={12} md={4.5} sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#64748b",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.85rem",
                  fontFamily: "Poppins",
                  mb: 0.5,
                  px: 1,
                }}
              >
                Select Pitch Highlights
              </Typography>

              {videos.map((video, idx) => {
                const isActive = activeVideoIdx === idx;
                return (
                  <Card
                    key={idx}
                    sx={{
                      backgroundColor: isActive ? "rgba(58, 73, 214, 0.06)" : "#ffffff",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(58, 73, 214, 0.3)" : "#e2e8f0",
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      boxShadow: isActive
                        ? "0 4px 20px rgba(58, 73, 214, 0.08)"
                        : "0 4px 15px rgba(0, 0, 0, 0.02)",
                      "&:hover": {
                        backgroundColor: isActive
                          ? "rgba(58, 73, 214, 0.09)"
                          : "rgba(58, 73, 214, 0.02)",
                        borderColor: isActive ? "rgba(58, 73, 214, 0.5)" : "rgba(58, 73, 214, 0.2)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleVideoSelect(idx)}
                      sx={{ p: 2.5, display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      {/* Video Indicator Button */}
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "12px",
                          backgroundColor: isActive ? "#3a49d6" : "#f1f5f9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isActive ? "#fff" : "#64748b",
                          flexShrink: 0,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {isActive && isPlaying ? (
                          <Box
                            sx={{
                              display: "flex",
                              gap: "3px",
                              alignItems: "flex-end",
                              height: 14,
                              "& span": {
                                width: "3px",
                                backgroundColor: "#fff",
                                animation: "sound-bar 1s infinite alternate",
                                transformOrigin: "bottom",
                              },
                              "& span:nth-of-type(2)": {
                                animationDelay: "0.2s",
                              },
                              "& span:nth-of-type(3)": {
                                animationDelay: "0.4s",
                              },
                              "@keyframes sound-bar": {
                                "0%": { height: 4 },
                                "100%": { height: 14 },
                              },
                            }}
                          >
                            <span />
                            <span />
                            <span />
                          </Box>
                        ) : (
                          <Play size={18} fill={isActive ? "currentColor" : "none"} />
                        )}
                      </Box>

                      {/* Video Info details */}
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: "#1e293b",
                              fontWeight: 700,
                              fontSize: "0.95rem",
                              fontFamily: "Poppins",
                            }}
                          >
                            {video.title}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#64748b",
                            fontFamily: "Poppins",
                            lineHeight: 1.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {video.description}
                        </Typography>
                      </Box>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

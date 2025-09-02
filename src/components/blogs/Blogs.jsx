"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  InputAdornment,
  TextField,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  CardActionArea,
} from "@mui/material";
import {
  Search as SearchIcon,
  TrendingUp,
  AttachMoney as DollarSign,
  CreditCard,
  Business as Building2,
  Menu as MenuIcon,
  ArrowForward,
  Share,
  BookmarkBorder,
  KeyboardArrowRight,
  LocalFireDepartment,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import { categories } from "../data/BlogData.js";

import { getAllBlogs } from "../../apis/BlogsAPI";

export default function EnhancedBlogPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [setAnchorEl] = useState(null);
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        console.log("Fetched blogs:", data); // ✅ Debug

        if (data.success && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else {
          console.error("Invalid response format", data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const theme = {
    primary: "#3244e6",
    secondary: "#ffffff",
    accent: "#f8f9ff",
    text: "#1a1a1a",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
    shadow: "0 4px 25px rgba(50, 68, 230, 0.1)",
  };

  const filteredPosts = (blogs || []).filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const customerInfo = JSON.parse(localStorage.getItem("customerInfo"));
  const userRole = customerInfo?.role || "customer";

  const featuredPost = filteredPosts.find((post) => post.featured);
  const otherPosts = filteredPosts.filter(
    (post) => !post.featured || post.id !== featuredPost?.id
  );

  const handleCreateNew = () => {
    navigate("/blogs-formatting/new");
  };

  const handleEdit = (post) => {
    navigate(`/blogs-formatting/${post.id}`); // Navigate to edit page with ID
  };

  const trendingTopics = [
    { name: "Personal Finance", icon: <DollarSign />, count: 24 },
    { name: "Business Loans", icon: <Building2 />, count: 18 },
    { name: "Credit Score", icon: <CreditCard />, count: 31 },
    { name: "Investment Tips", icon: <TrendingUp />, count: 15 },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.secondary }}>
      {/* Enhanced Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, #3244e6, #4c51bf)`,
          borderBottom: `1px solid ${theme.border}`,
          color: theme.secondary,
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(50, 68, 230, 0.15)",
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 }, py: 1 }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: theme.secondary,
                mr: 4,
                fontFamily: "Poppins",
                background: `linear-gradient(135deg, ${theme.primary}, #4c51bf)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              F2Fintech Blog
            </Typography> */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  sx={{
                    color:
                      selectedCategory === category.name
                        ? theme.secondary
                        : "rgba(255, 255, 255, 0.8)",
                    fontWeight: selectedCategory === category.name ? 700 : 500,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    fontFamily: "Poppins",
                    px: 3,
                    py: 1,
                    borderRadius: 3,
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      color: theme.secondary,
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: selectedCategory === category.name ? "100%" : "0%",
                      height: "3px",
                      bgcolor: theme.secondary,
                      transition: "width 0.3s ease",
                      borderRadius: "2px 2px 0 0",
                    },
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </Box>
          </Box>

          {(userRole === "admin" || userRole === "marketing_agent") && (
            <Button
              sx={{
                color: theme.secondary,
                fontWeight: 600,
                bgcolor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
              }}
              onClick={handleCreateNew}
            >
              CREATE NEW BLOG
            </Button>
          )}

          {/* Inside Toolbar in AppBar */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ color: theme.textSecondary, fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: 3,
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover": { bgcolor: theme.secondary },
                  "&.Mui-focused": {
                    bgcolor: theme.secondary,
                    boxShadow: `0 0 0 2px rgba(255, 255, 255, 0.3)`,
                  },
                },
              }}
              sx={{ width: 280, display: { xs: "none", sm: "block" } }}
            />

            <IconButton
              sx={{
                display: { xs: "block", md: "none" },
                bgcolor: "rgba(255, 255, 255, 0.1)",
                color: theme.secondary,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, #3244e6, #4c51bf, #3244e6)`,
          py: 10,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
            opacity: 0.3,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ px: { xs: 2, md: 4 }, position: "relative", zIndex: 1 }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", md: "4rem" },
                color: "white",
                mb: 3,
                fontFamily: "Poppins",
              }}
            >
              Financial Insights & Success Stories
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: 400,
                fontSize: "1.25rem",
                fontFamily: "Poppins",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Discover expert advice on finance, business growth, and personal
              wealth building from F2Fintech
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          {/* Main Content Area */}
          <Grid item xs={12} lg={8}>
            {/* Featured Article */}
            {featuredPost && (
              <Card
                elevation={0}
                sx={{
                  mb: 6,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 4,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    boxShadow: theme.shadow,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardActionArea>
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="400"
                      image={featuredPost.image}
                      alt={featuredPost.title}
                      sx={{ objectFit: "cover" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      {/* <Chip
                        label="Featured"
                        icon={<Star />}
                        sx={{
                          bgcolor: theme.primary,
                          color: theme.secondary,
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        }}
                      /> */}
                      {/* <Chip
                        label={featuredPost.category}
                        sx={{
                          bgcolor: `${theme.secondary}90`,
                          color: theme.text,
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          backdropFilter: "blur(10px)",
                        }}
                      /> */}
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h3"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        color: theme.text,
                        mb: 3,
                        fontFamily: "Poppins",
                        fontSize: { xs: "1.75rem", md: "2.25rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {featuredPost.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.textSecondary,
                        mb: 4,
                        lineHeight: 1.7,
                        fontFamily: "Poppins",
                        fontSize: "1.1rem",
                      }}
                    >
                      {featuredPost.excerpt}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: theme.primary,
                            // fontSize: "1rem",
                            // fontWeight: 600,
                          }}
                        >
                          <img
                            src={`f2Fintechlogo.png`}
                            alt="Logo"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.text,
                              fontWeight: 600,
                              fontFamily: "Poppins",
                            }}
                          >
                            {featuredPost.author}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.textSecondary,
                              fontFamily: "Poppins",
                            }}
                          >
                            {featuredPost.date} • {featuredPost.readTime}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        {/* Save button */}
                        <IconButton
                          size="small"
                          onClick={() => {
                            // save logic
                            console.log("Saved to favorites!");
                            alert("Item saved successfully!");
                          }}
                          sx={{
                            color: theme.textSecondary,
                            "&:hover": {
                              color: theme.primary,
                              bgcolor: theme.accent,
                            },
                          }}
                        >
                          <BookmarkBorder />
                        </IconButton>

                        {/* Share button */}
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: "Check this out!",
                                text: "I found something interesting for you.",
                                url: window.location.href,
                              });
                            } else {
                              // Fallback (desktop browsers without Web Share API)
                              navigator.clipboard.writeText(
                                window.location.href
                              );
                              alert("Link copied to clipboard!");
                            }
                          }}
                          sx={{
                            color: theme.textSecondary,
                            "&:hover": {
                              color: theme.primary,
                              bgcolor: theme.accent,
                            },
                          }}
                        >
                          <Share />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            )}

            {/* Other Articles */}
            <Grid container spacing={3}>
              {otherPosts.map((post) => (
                <Grid item xs={12} md={6} key={post.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      position: "relative",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: theme.shadow,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {/* ✏️ Edit Button */}

                    {(userRole === "admin" ||
                      userRole === "marketing_agent") && (
                      <IconButton
                        onClick={() => handleEdit(post)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "white",
                          zIndex: 1,
                          "&:hover": { bgcolor: "grey.100" },
                        }}
                      >
                        <EditIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    )}
                    <CardActionArea
                      key={post.title}
                      onClick={() => navigate(post.route)}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="240"
                          image={post.image}
                          alt={post.title}
                          sx={{ objectFit: "cover" }}
                        />
                      </Box>
                      <CardContent
                        sx={{
                          p: 3,
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            color: theme.text,
                            mb: 2,
                            fontFamily: "Poppins",
                            lineHeight: 1.3,
                            flexGrow: 1,
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.textSecondary,
                            mb: 3,
                            lineHeight: 1.6,
                            fontFamily: "Poppins",
                          }}
                        >
                          {post.excerpt}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: "auto",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: theme.primary,
                              }}
                            >
                              <img
                                src={`f2Fintechlogo.png`}
                                alt="Logo"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Avatar>
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme.text,
                                  fontWeight: 500,
                                  fontFamily: "Poppins",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {post.author}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme.textSecondary,
                                  fontFamily: "Poppins",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {post.date} • {post.readTime}
                              </Typography>
                            </Box>
                          </Box>
                          <KeyboardArrowRight sx={{ color: theme.primary }} />
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Enhanced Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: "sticky", top: 20 }}>
              {/* Trending Topics */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.secondary})`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <LocalFireDepartment sx={{ color: theme.primary, mr: 1 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: theme.text,
                      fontFamily: "Poppins",
                    }}
                  >
                    Trending Topics
                  </Typography>
                </Box>
                <Stack spacing={2}>
                  {trendingTopics.map((topic) => (
                    <Button
                      key={topic.name}
                      variant="outlined"
                      fullWidth
                      startIcon={topic.icon}
                      endIcon={
                        <Chip
                          label={topic.count}
                          size="small"
                          sx={{
                            bgcolor: theme.primary,
                            color: theme.secondary,
                            fontSize: "0.7rem",
                            height: 20,
                          }}
                        />
                      }
                      sx={{
                        justifyContent: "space-between",
                        textTransform: "none",
                        color: theme.text,
                        borderColor: theme.border,
                        fontFamily: "Poppins",
                        py: 1.5,
                        "&:hover": {
                          borderColor: theme.primary,
                          bgcolor: theme.accent,
                          "& .MuiChip-root": {
                            bgcolor: theme.primary,
                          },
                        },
                      }}
                    >
                      {topic.name}
                    </Button>
                  ))}
                </Stack>
              </Paper>

              {/* Enhanced Newsletter Signup */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.primary}10, ${theme.accent})`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    bgcolor: `${theme.primary}20`,
                    borderRadius: "50%",
                    zIndex: 0,
                  }}
                />
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: theme.text,
                      mb: 2,
                      fontFamily: "Poppins",
                    }}
                  >
                    Stay Updated
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.textSecondary,
                      mb: 3,
                      fontFamily: "Poppins",
                      lineHeight: 1.6,
                    }}
                  >
                    Get the latest insights and updates delivered directly to
                    your inbox.
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter your email"
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        bgcolor: theme.secondary,
                        borderRadius: 2,
                        "&:hover": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.primary,
                          },
                        },
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.primary,
                          },
                        },
                      },
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: "#3244e6",
                      textTransform: "none",
                      fontFamily: "Poppins",
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      color: "white",
                      "&:hover": {
                        bgcolor: "#2a3bdc",
                        boxShadow: "0 8px 25px rgba(50, 68, 230, 0.3)",
                      },
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

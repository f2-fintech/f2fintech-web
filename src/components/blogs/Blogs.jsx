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
  Menu,
  MenuItem,
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
import { Link, useNavigate } from "react-router-dom";

import { blogPosts, categories } from "../data/BlogData.js";
import FormatterModal from "./formattingpannel/FormatterModal.jsx";
import BlogDetails from "./BlogDetails.jsx";
import { getAllBlogs } from "../../apis/BlogsAPI";

export default function EnhancedBlogPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          bgcolor: theme.secondary,
          borderBottom: `1px solid ${theme.border}`,
          color: theme.text,
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 }, py: 1 }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: theme.primary,
                mr: 4,
                fontFamily: "Inter, system-ui, sans-serif",
                background: `linear-gradient(135deg, ${theme.primary}, #4c51bf)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Blog
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  sx={{
                    color:
                      selectedCategory === category.name
                        ? theme.primary
                        : theme.textSecondary,
                    fontWeight: selectedCategory === category.name ? 600 : 400,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    fontFamily: "Inter, system-ui, sans-serif",
                    px: 3,
                    py: 1,
                    borderRadius: 3,
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      bgcolor: theme.accent,
                      color: theme.primary,
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: selectedCategory === category.name ? "100%" : "0%",
                      height: "2px",
                      bgcolor: theme.primary,
                      transition: "width 0.3s ease",
                    },
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </Box>
          </Box>

          {(userRole === "admin" || userRole === "marketing_agent") && (
            <Button sx={{ color: "black" }} onClick={handleOpenModal}>
              UPLOAD
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
                  bgcolor: theme.accent,
                  borderRadius: 3,
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover": { bgcolor: "#f0f1ff" },
                  "&.Mui-focused": {
                    bgcolor: theme.secondary,
                    boxShadow: `0 0 0 2px ${theme.primary}20`,
                  },
                },
              }}
              sx={{ width: 280, display: { xs: "none", sm: "block" } }}
            />

            <IconButton
              onClick={handleMenuOpen}
              sx={{
                display: { xs: "block", md: "none" },
                bgcolor: theme.accent,
                "&:hover": { bgcolor: theme.primary, color: theme.secondary },
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
          background: `linear-gradient(135deg, ${theme.primary}15, ${theme.accent})`,
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                color: theme.text,
                mb: 3,
                fontFamily: "Inter, system-ui, sans-serif",
                background: `linear-gradient(135deg, ${theme.text}, ${theme.primary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Latest Insights & Stories
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: theme.textSecondary,
                fontWeight: 400,
                fontSize: "1.25rem",
                fontFamily: "Inter, system-ui, sans-serif",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Discover expert advice on finance, business, and personal growth
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
                        fontFamily: "Inter, system-ui, sans-serif",
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
                        fontFamily: "Inter, system-ui, sans-serif",
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
                            fontSize: "1rem",
                            fontWeight: 600,
                          }}
                        >
                          {featuredPost.author.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.text,
                              fontWeight: 600,
                              fontFamily: "Inter, system-ui, sans-serif",
                            }}
                          >
                            {featuredPost.author}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.textSecondary,
                              fontFamily: "Inter, system-ui, sans-serif",
                            }}
                          >
                            {featuredPost.date} • {featuredPost.readTime}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
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
                        <IconButton
                          size="small"
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

                      border: `1px solid ${theme.border}`,
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: theme.shadow,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardActionArea
                      key={post.title}
                      onClick={() => navigate(post.route)}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        border: "3px solid blue",
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
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
                            fontFamily: "Inter, system-ui, sans-serif",
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
                            fontFamily: "Inter, system-ui, sans-serif",
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
                                width: 32,
                                height: 32,
                                bgcolor: theme.primary,
                                fontSize: "0.75rem",
                                fontWeight: 600,
                              }}
                            >
                              {post.author.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme.text,
                                  fontWeight: 500,
                                  fontFamily: "Inter, system-ui, sans-serif",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {post.author}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme.textSecondary,
                                  fontFamily: "Inter, system-ui, sans-serif",
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
                      fontFamily: "Inter, system-ui, sans-serif",
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
                        fontFamily: "Inter, system-ui, sans-serif",
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
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    Stay Updated
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.textSecondary,
                      mb: 3,
                      fontFamily: "Inter, system-ui, sans-serif",
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
                      bgcolor: theme.primary,
                      textTransform: "none",
                      fontFamily: "Inter, system-ui, sans-serif",
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

      <FormatterModal
        isOpen={openModal}
        onClose={handleCloseModal}
        // handleBlogSubmit={handleBlogSubmit}
      />
      {/* Modal */}
    </Box>
  );
}

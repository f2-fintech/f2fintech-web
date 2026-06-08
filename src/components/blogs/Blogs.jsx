"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Grid,
  Paper,
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
  FormControl,
  MenuItem,
  Select,
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
  Home as HomeIcon,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

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

  // Filter posts based on search and category
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
    navigate(`/blogs-formatting/${post.id}`);
  };

  // Dynamically calculate trending topics from blogs data
  const getTrendingTopics = () => {
    if (!blogs || !Array.isArray(blogs)) return [];

    // Count blogs by category
    const categoryCounts = blogs.reduce((acc, blog) => {
      if (blog.category) {
        // Clean up category names (handle typos like "Home Loans")
        const cleanCategory = blog.category.replace("s{2,}", "s");
        acc[cleanCategory] = (acc[cleanCategory] || 0) + 1;
      }
      return acc;
    }, {});

    // Map to trending topics format with appropriate icons
    const trendingTopics = Object.entries(categoryCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 6)
      .map(([category, count]) => {
        // Map categories to appropriate icons
        let icon;
        switch (category.toLowerCase()) {
          case "personal finance":
            icon = <DollarSign />;
            break;
          case "business loans":
            icon = <Building2 />;
            break;
          case "credit score":
            icon = <CreditCard />;
            break;
          case "home loans":
            icon = <HomeIcon />;
            break;
          default:
            icon = <TrendingUp />;
        }

        return {
          name: category,
          icon: icon,
          count: count,
        };
      });

    return trendingTopics;
  };

  const trendingTopics = getTrendingTopics();

  // Handle category click from trending topics
  const handleTrendingTopicClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setTimeout(() => {
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.secondary }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "#3244e6",
          pt: 12,
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
                fontFamily: "Poppins",
                fontWeight: 800,
                color: "white",
                mb: 1,
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                lineHeight: 1.4,
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
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
              wealth building from F2 Fintech
            </Typography>
          </Box>
        </Container>
        {/* Enhanced Header */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: `transparent`,
            color: theme.secondary,
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(50, 68, 230, 0.15)",
          }}
        >
          <Toolbar
            sx={{ justifyContent: "end", gap: 5, px: { xs: 2, md: 4 }, py: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Dropdown for trending topics with custom trigger */}
              <FormControl
                sx={{
                  display: "block",
                }}
                size="small"
              >
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  displayEmpty
                  sx={{
                    color: theme.secondary,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 3,
                    fontFamily: "Poppins",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    fontWeight: 600,
                    px: { xs: 2, sm: 3 },
                    py: 0.3,
                    minWidth: { xs: "140px", sm: "160px" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& .MuiSelect-icon": {
                      color: theme.secondary,
                    },
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        "& .MuiMenuItem-root": {
                          fontFamily: "Poppins",
                          fontSize: { xs: "0.8rem", sm: "0.9rem" },
                          "&:hover": {
                            bgcolor: "rgba(50, 68, 230, 0.1)",
                          },
                          "&.Mui-selected": {
                            bgcolor: "rgba(50, 68, 230, 0.2)",
                            fontWeight: 600,
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="All">All Categories</MenuItem>
                  {trendingTopics.map((category) => (
                    <MenuItem
                      key={category.name}
                      value={category.name}
                      sx={{
                        fontWeight:
                          selectedCategory === category.name ? 700 : 500,
                      }}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  fontFamily: "Poppins",
                  fontSize: "0.9rem",
                }}
                onClick={handleCreateNew}
              >
                CREATE NEW BLOG
              </Button>
            )}
          </Toolbar>
        </AppBar>
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
                  // borderRadius: 4,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    boxShadow: theme.shadow,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardActionArea onClick={() => navigate(featuredPost.route)}>
                  <Box sx={{ position: "relative" }}>
                    {(userRole === "admin" ||
                      userRole === "marketing_agent") && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(featuredPost);
                          }}
                          sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            bgcolor: "white",
                            zIndex: 10,
                            "&:hover": { bgcolor: "grey.100" },
                          }}
                        >
                          <EditIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                      )}
                    <CardMedia
                      component="img"
                      image={featuredPost.image}
                      alt={featuredPost.title}
                      sx={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: { xs: "16/9", md: "21/9" },
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        display: "flex",
                        gap: 1,
                      }}
                    ></Box>
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
                          }}
                        >
                          <img
                            src={`f2Fintechlogo.webp`}
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
                          image={post.image}
                          alt={post.title}
                          sx={{
                            width: "100%",
                            height: "auto",
                            aspectRatio: "16/9",
                            objectFit: "cover",
                          }}
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
                                src={`f2Fintechlogo.webp`}
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
                  {trendingTopics.length > 0 ? (
                    trendingTopics.map((topic) => (
                      <Button
                        key={topic.name}
                        variant="outlined"
                        fullWidth
                        startIcon={topic.icon}
                        onClick={() => handleTrendingTopicClick(topic.name)}
                        endIcon={
                          <Chip
                            label={topic.count}
                            size="small"
                            sx={{
                              bgcolor: theme.secondary,
                              color: theme.primary,
                              fontSize: "0.7rem",
                              height: 27,
                            }}
                          />
                        }
                        sx={{
                          justifyContent: "space-between",
                          textTransform: "none",
                          color: theme.text,
                          borderColor:
                            selectedCategory === topic.name
                              ? theme.primary
                              : theme.border,
                          fontFamily: "Poppins",
                          py: 1.5,
                          "&:hover": {
                            borderColor: theme.primary,
                            bgcolor: theme.accent,
                            "& .MuiChip-root": {
                              bgcolor: theme.secondary,
                            },
                          },
                        }}
                      >
                        {topic.name}
                      </Button>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.textSecondary,
                        textAlign: "center",
                        fontFamily: "Poppins",
                      }}
                    >
                      No trending topics available
                    </Typography>
                  )}
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

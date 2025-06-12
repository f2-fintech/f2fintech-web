"use client";

import { useState } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import {
  Search as SearchIcon,
  TrendingUp,
  AttachMoney as DollarSign,
  Home,
  CreditCard,
  Savings as PiggyBank,
  Business as Building2,
} from "@mui/icons-material";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Understanding Personal Loan Interest Rates in 2024",
    excerpt:
      "Learn how interest rates work and how to get the best rates for your personal loan.",
    category: "Personal Loans",
    featured: true,
    image: "/harpreetimg.jpg",
  },
  {
    id: 2,
    title: "Home Loan vs. Rent: Making the Right Decision",
    excerpt: "Compare the pros and cons of home loans versus renting.",
    category: "Home Loans",
    featured: false,
    image: "/images/loan2.jpg",
  },
  // Add more posts as needed
];

const categories = [
  { name: "All", icon: TrendingUp, count: 6 },
  { name: "Personal Loans", icon: DollarSign, count: 2 },
  { name: "Home Loans", icon: Home, count: 1 },
  { name: "Business Loans", icon: Building2, count: 1 },
  { name: "Credit Tips", icon: CreditCard, count: 1 },
  { name: "Financial Planning", icon: PiggyBank, count: 1 },
];

const recentPosts = [
  {
    id: 1,
    title: "Understanding Personal Loan Interest Rates in 2024",
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    title: "Home Loan vs. Rent: Making the Right Decision",
    date: "Jan 12, 2024",
  },
  {
    id: 3,
    title: "5 Steps to Improve Your Credit Score Fast",
    date: "Jan 10, 2024",
  },
];

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <Box
      sx={{ minHeight: "100vh", bgcolor: "#f9fafb", border: "1px solid red" }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          color: "common.white",
          py: 10,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          border: "1px solid green",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('/images/pattern.svg')",
            opacity: 0.05,
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", sm: "3rem", md: "3.75rem" },
              lineHeight: 1.2,
              fontFamily: "Poppins",
            }}
          >
            Financial Insights & Tips
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              mb: 4,
              maxWidth: "700px",
              mx: "auto",
              fontFamily: "Poppins",
            }}
          >
            Stay informed with expert advice on loans, credit, and personal
            finance.
          </Typography>
          <Box sx={{ maxWidth: "600px", mx: "auto", px: 2 }}>
            <TextField
              fullWidth
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "action.active" }} />
                  </InputAdornment>
                ),
                sx: {
                  pl: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              }}
              variant="outlined"
            />
          </Box>
        </Container>
      </Box>
      <Box
        // elevation={0}
        sx={{
          // p: 3,
          // mb: 4,
          // borderRadius: 3,
          // width: "80vw",
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          bgcolor: "background.paper",
          padding: "25px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          // gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontFamily: "Poppins",
            border: "1px solid blue",
          }}
        >
          Categories
        </Typography>
        <List
          sx={{
            display: "flex",
            gap: "30px",
          }}
          disablePadding
        >
          {categories.map((category) => (
            <Box
              button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              sx={{
                fontFamily: "Poppins",
                border: "1px solid #aaa",
                display: "flex",
                borderRadius: 2,
                px: 2,
                py: 1.5,
                mb: 0.5,
                // width: "20%",

                bgcolor:
                  selectedCategory === category.name
                    ? "#3245e7"
                    : "transparent",
                color:
                  selectedCategory === category.name ? "#fff" : "text.primary",
                "&:hover": {
                  bgcolor:
                    selectedCategory === category.name
                      ? "#3245e7"
                      : "rgba(0, 0, 0, 0.02)",
                },
              }}
            >
              <Box
                component={category.icon}
                fontSize="small"
                sx={{
                  mr: 2,
                  padding: "5px",

                  color: selectedCategory === category.name ? "white" : "black",
                }}
              />
              <ListItemText
                primary={`${category.name}`}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
              <Chip
                label={category.count}
                size="small"
                sx={{
                  ml: 1,
                  bgcolor:
                    selectedCategory === category.name
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.05)",
                  color:
                    selectedCategory === category.name
                      ? "primary.contrastText"
                      : "text.secondary",
                }}
              />
            </Box>
          ))}
        </List>
      </Box>
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={8}>
          {/* Main Articles */}
          <Grid item xs={12} md={8}>
            {featuredPosts.length > 0 && (
              <Box sx={{ mb: 10 }}>
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      position: "relative",
                      fontFamily: "Poppins",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -8,
                        left: 0,
                        width: 60,
                        height: 4,
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: 2,
                      },
                    }}
                  >
                    Featured Articles
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 2, fontFamily: "Poppins" }}
                  >
                    Discover our handpicked selection of trending content
                  </Typography>
                </Box>
                <Grid container spacing={5}>
                  {featuredPosts.map((post) => (
                    <Grid item xs={12} sm={6} key={post.id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: 4,
                          overflow: "hidden",
                          border: "none",
                          background:
                            "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          },
                          "&:hover": {
                            transform: "translateY(-12px) scale(1.02)",
                            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
                            "&::before": {
                              opacity: 1,
                            },
                          },
                        }}
                      >
                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                          <CardMedia
                            component="img"
                            height="220"
                            image={post.image}
                            alt={post.title}
                            sx={{
                              objectFit: "cover",
                              transition: "transform 0.4s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              top: 16,
                              right: 16,
                              // background: "rgba(255, 255, 255, 0.95)",
                              backdropFilter: "blur(10px)",
                              borderRadius: 3,
                              p: 1,
                            }}
                          >
                            <Chip
                              label={post.category}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                borderRadius: 2,
                                background:
                                  "linear-gradient(135deg, #3245e7 0%, #3245e7 100%)",
                                color: "white",
                                border: "none",
                                fontSize: "0.75rem",
                                letterSpacing: "0.5px",
                              }}
                            />
                          </Box>
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 4 }}>
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                              fontWeight: 800,
                              mb: 2,
                              fontFamily: "Poppins",
                              lineHeight: 1.3,
                              color: "#1a202c",
                              transition: "color 0.3s ease",
                              "&:hover": {
                                color: "#667eea",
                              },
                            }}
                          >
                            {post.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              mb: 4,
                              lineHeight: 1.6,
                              fontSize: "0.95rem",
                              fontFamily: "Poppins",
                            }}
                          >
                            {post.excerpt}
                          </Typography>
                          <Button
                            variant="contained"
                            component="a"
                            href={`/blog/${post.id}`}
                            sx={{
                              borderRadius: 3,
                              fontWeight: 600,
                              textTransform: "none",
                              px: 4,
                              fontFamily: "Poppins",
                              color: "white",
                              py: 1.5,
                              background:
                                "linear-gradient(135deg, #3245e7 0%, #3245e7 100%)",
                              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                              fontSize: "0.9rem",
                              letterSpacing: "0.5px",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #3245e7 0%, #3245e7 100%)",
                                boxShadow:
                                  "0 12px 32px rgba(102, 126, 234, 0.4)",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            Read Article
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* All Articles */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  mb: 6,
                  pb: 3,
                  borderBottom: "2px solid",
                  borderImage:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1",
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontWeight: 800,
                      fontFamily: "Poppins",
                      color: "#1a202c",
                      mb: 1,
                    }}
                  >
                    All Articles
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      fontFamily: "Poppins",
                    }}
                  >
                    Explore our complete collection of insights and stories
                  </Typography>
                </Box>
                <Chip
                  label={`${filteredPosts.length} articles`}
                  sx={{
                    fontWeight: 700,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #fdb723 0%, #fdb723 100%)",
                    color: "white",
                    px: 2,
                    py: 1,
                    fontSize: "0.85rem",
                    letterSpacing: "0.5px",
                    boxShadow: "0 4px 12px rgba(245, 87, 108, 0.3)",
                  }}
                />
              </Box>
              <Grid container spacing={5}>
                {regularPosts.map((post) => (
                  <Grid item xs={12} key={post.id}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        background:
                          "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 4,
                          background:
                            "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                          transform: "scaleY(0)",
                          transformOrigin: "bottom",
                          transition: "transform 0.3s ease",
                        },
                        "&:hover": {
                          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
                          transform: "translateY(-6px)",
                          "&::before": {
                            transform: "scaleY(1)",
                          },
                        },
                      }}
                    >
                      <CardContent sx={{ p: 5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2,
                            mb: 3,
                          }}
                        >
                          <Chip
                            label={post.category}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              borderRadius: 2,
                              background:
                                "linear-gradient(135deg, #3245e7 0%, #3245e7 100%)",
                              color: "white",
                              fontSize: "0.75rem",
                              letterSpacing: "0.5px",
                              boxShadow: "0 2px 8px rgba(79, 172, 254, 0.3)",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h4"
                          component="h3"
                          sx={{
                            fontWeight: 800,
                            mb: 2,
                            color: "#1a202c",
                            fontFamily: "Poppins",
                            lineHeight: 1.3,
                            transition: "color 0.3s ease",
                            "&:hover": {
                              color: "#667eea",
                            },
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            fontFamily: "Poppins",
                            mb: 4,
                            lineHeight: 1.7,
                            fontSize: "1rem",
                          }}
                        >
                          {post.excerpt}
                        </Typography>
                        <Button
                          variant="outlined"
                          component="a"
                          href={`/blog/${post.id}`}
                          sx={{
                            borderRadius: 3,
                            fontWeight: 700,
                            textTransform: "none",
                            px: 4,
                            py: 1.5,
                            borderWidth: 2,
                            fontFamily: "Poppins",
                            borderColor: "#667eea",
                            color: "#667eea",
                            fontSize: "0.9rem",
                            letterSpacing: "0.5px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              borderColor: "#667eea",
                              background:
                                "linear-gradient(135deg, #3245e7 0%, #3245e7 100%)",
                              color: "white",
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                            },
                          }}
                        >
                          Read Article
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 32 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    mb: 4,
                    color: "#1a202c",
                    fontFamily: "Poppins",
                    position: "relative",
                  }}
                >
                  Recent Posts
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      width: 40,
                      height: 3,
                      background:
                        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      borderRadius: 2,
                    }}
                  />
                </Typography>
                <List disablePadding>
                  {recentPosts.map((post, index) => (
                    <Box key={post.id}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          px: 0,
                          py: 3,
                          borderRadius: 3,
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: "rgba(102, 126, 234, 0.08)",
                            transform: "translateX(8px)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            mr: 3,
                            borderRadius: 3,
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                            flexShrink: 0,
                          }}
                        >
                          {post.id}
                        </Box>
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              component="a"
                              href="#"
                              sx={{
                                fontWeight: 700,
                                fontFamily: "Poppins",
                                textDecoration: "none",
                                color: "#1a202c",
                                lineHeight: 1.4,
                                transition: "color 0.3s ease",
                                "&:hover": {
                                  color: "#667eea",
                                },
                              }}
                            >
                              {post.title}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "Poppins",
                                color: "text.secondary",
                                mt: 1,
                                fontWeight: 500,
                                fontSize: "0.85rem",
                              }}
                            >
                              {post.date}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < recentPosts.length - 1 && (
                        <Divider
                          sx={{
                            borderColor: "rgba(0, 0, 0, 0.08)",
                            mx: 2,
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </List>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

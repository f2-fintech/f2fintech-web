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
  Card,
  CardContent,
  CardMedia,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  TrendingUp,
  AttachMoney as DollarSign,
  Home,
  CreditCard,
  Business as Building2,
  Menu as MenuIcon,
  Person,
  ArrowForward,
  PlayArrow,
  Share,
  BookmarkBorder,
} from "@mui/icons-material";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Understanding Personal Loan Interest Rates in 2024",
    excerpt:
      "Learn how interest rates work and how to get the best rates for your personal loan. Discover key factors that affect your rates.",
    category: "Personal Loans",
    featured: true,
    image: "/blogs8.png",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    href: "/personal-loan-blogs",
  },
  {
    id: 2,
    title: "Business Loan: Making the Right Decision",
    excerpt:
      "We simplify everything you need to know about business loans and how to choose the right one for your company.",
    category: "Business Loans",
    featured: true,
    image: "/blogs3.png",
    author: "Michael Chen",
    date: "March 12, 2024",
    readTime: "7 min read",
    href: "/business-loan-blogs",
  },
  {
    id: 3,
    title: "Understanding Business Loan Interest Rates in 2024",
    excerpt:
      "Running and growing a business often requires more than just hard work and vision. Learn about financing options.",
    category: "Business Loans",
    featured: false,
    image: "/blogs5.png",
    author: "Emily Davis",
    date: "March 10, 2024",
    readTime: "6 min read",
    href: "/business-loan-blogs",
  },
  {
    id: 4,
    title: "Understanding Over Draft in 2024",
    excerpt:
      "An overdraft allows you to withdraw more than you currently have in your account, up to a pre-set limit.",
    category: "Business Loans",
    featured: false,
    image: "/blogs8.png",
    author: "Robert Wilson",
    date: "March 8, 2024",
    readTime: "4 min read",
    href: "/overdraft-blogs",
  },
];

const categories = [
  { name: "All", count: 4 },
  { name: "Personal Loans", count: 1 },
  { name: "Business Loans", count: 3 },
  { name: "Credit Tips", count: 0 },
  { name: "Financial Planning", count: 0 },
];

export default function MicrosoftBlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const otherPosts = filteredPosts.filter(
    (post) => !post.featured || post.id !== featuredPost?.id
  );

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff" }}>
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          color: "#323130",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#0078d4",
                mr: 4,
                fontFamily: "Segoe UI, system-ui, sans-serif",
              }}
            >
              Blog
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  sx={{
                    color:
                      selectedCategory === category.name
                        ? "#0078d4"
                        : "#323130",
                    fontWeight: selectedCategory === category.name ? 600 : 400,
                    textTransform: "none",
                    fontSize: "0.875rem",
                    fontFamily: "Segoe UI, system-ui, sans-serif",
                    "&:hover": {
                      bgcolor: "rgba(0, 120, 212, 0.1)",
                    },
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#605e5c", fontSize: 20 }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "#f3f2f1",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover": {
                    bgcolor: "#edebe9",
                  },
                },
              }}
              sx={{ width: 250, display: { xs: "none", sm: "block" } }}
            />
            <IconButton
              onClick={handleMenuOpen}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    handleMenuClose();
                  }}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        {/* Hero Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "2rem", md: "2.5rem" },
              color: "#323130",
              mb: 2,
              fontFamily: "Segoe UI, system-ui, sans-serif",
            }}
          >
            Latest insights and stories
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#605e5c",
              fontWeight: 400,
              fontSize: "1.125rem",
              fontFamily: "Segoe UI, system-ui, sans-serif",
            }}
          >
            Stay informed with expert advice on loans, credit, and personal
            finance
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Main Content Area */}
          <Grid item xs={12} lg={8}>
            {/* Featured Article */}
            {featuredPost && (
              <Card
                elevation={0}
                sx={{
                  mb: 6,
                  border: "1px solid #edebe9",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={featuredPost.image}
                  alt={featuredPost.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ p: 4 }}>
                  <Chip
                    label={featuredPost.category}
                    sx={{
                      bgcolor: "#deecf9",
                      color: "#0078d4",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      color: "#323130",
                      mb: 2,
                      fontFamily: "Segoe UI, system-ui, sans-serif",
                      fontSize: { xs: "1.5rem", md: "2rem" },
                    }}
                  >
                    {featuredPost.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#605e5c",
                      mb: 3,
                      lineHeight: 1.6,
                      fontFamily: "Segoe UI, system-ui, sans-serif",
                    }}
                  >
                    {featuredPost.excerpt}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#605e5c",
                          fontFamily: "Segoe UI, system-ui, sans-serif",
                        }}
                      >
                        {featuredPost.author} • {featuredPost.date} •{" "}
                        {featuredPost.readTime}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton size="small" sx={{ color: "#605e5c" }}>
                        <BookmarkBorder />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#605e5c" }}>
                        <Share />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
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
                      border: "1px solid #edebe9",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.image}
                      alt={post.title}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent
                      sx={{
                        p: 3,
                        height: "calc(100% - 200px)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Chip
                        label={post.category}
                        sx={{
                          bgcolor: "#deecf9",
                          color: "#0078d4",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          mb: 2,
                          alignSelf: "flex-start",
                        }}
                      />
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          color: "#323130",
                          mb: 2,
                          fontFamily: "Segoe UI, system-ui, sans-serif",
                          flexGrow: 1,
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#605e5c",
                          mb: 2,
                          lineHeight: 1.5,
                          fontFamily: "Segoe UI, system-ui, sans-serif",
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#605e5c",
                          fontFamily: "Segoe UI, system-ui, sans-serif",
                          mt: "auto",
                        }}
                      >
                        {post.author} • {post.date} • {post.readTime}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: "sticky", top: 20 }}>
              {/* Trending Topics */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  border: "1px solid #edebe9",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#323130",
                    mb: 3,
                    fontFamily: "Segoe UI, system-ui, sans-serif",
                  }}
                >
                  Trending topics
                </Typography>
                <Stack spacing={2}>
                  {[
                    "Personal Finance",
                    "Business Loans",
                    "Credit Score",
                    "Investment Tips",
                  ].map((topic) => (
                    <Button
                      key={topic}
                      variant="outlined"
                      fullWidth
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        color: "#323130",
                        borderColor: "#edebe9",
                        fontFamily: "Segoe UI, system-ui, sans-serif",
                        "&:hover": {
                          borderColor: "#0078d4",
                          bgcolor: "rgba(0, 120, 212, 0.05)",
                        },
                      }}
                    >
                      {topic}
                    </Button>
                  ))}
                </Stack>
              </Paper>

              {/* Newsletter Signup */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: "1px solid #edebe9",
                  borderRadius: 2,
                  bgcolor: "#f3f2f1",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#323130",
                    mb: 2,
                    fontFamily: "Segoe UI, system-ui, sans-serif",
                  }}
                >
                  Stay informed
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#605e5c",
                    mb: 3,
                    fontFamily: "Segoe UI, system-ui, sans-serif",
                  }}
                >
                  Get the latest insights and updates delivered to your inbox.
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter your email"
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                    },
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: "#0078d4",
                    textTransform: "none",
                    fontFamily: "Segoe UI, system-ui, sans-serif",
                    "&:hover": {
                      bgcolor: "#106ebe",
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

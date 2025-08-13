import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Chip,
  IconButton,
  Paper,
  Fade,
  Button,
  Divider,
} from "@mui/material";
import {
  AccessTime,
  Share,
  BookmarkBorder,
  ArrowBack,
  Visibility,
  FavoriteBorder,
  Comment,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { getAllBlogs, getBlogById } from "../../apis/BlogsAPI";

const BlogDetails = () => {
  const { id } = useParams();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        console.log("API Response:", data);
        console.log("Looking for slug:", slug);

        if (data.success && Array.isArray(data.blogs)) {
          console.log(
            "Available blogs:",
            data.blogs.map((b) => ({
              title: b.title,
              route: b.route,
              slug: b.slug,
              id: b.id,
            }))
          );

          // Try multiple matching strategies
          const found = data.blogs.find((b) => {
            const matches = [
              b.route === `/blogs/${slug}`,
              b.route === `/${slug}`,
              b.slug === slug,
              b.id === slug,
              b.title?.toLowerCase().replace(/\s+/g, "-") === slug,
              b.title
                ?.toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "") === slug,
              // Check if the slug contains the blog title keywords
              slug.includes(b.title?.toLowerCase().replace(/\s+/g, "-")),
              // Check if blog route contains the slug
              b.route?.includes(slug),
            ];

            console.log(`Checking blog "${b.title}":`, {
              route: b.route,
              slug: b.slug,
              id: b.id,
              matches: matches,
            });

            return matches.some((match) => match);
          });

          if (found) {
            console.log("Found blog:", found);
            setBlog(found);
          } else {
            console.warn("No blog found for slug:", slug);
          }
        } else {
          console.error("Invalid API response structure:", data);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const result = await getBlogById(id); // ✅ Fetch by id
        if (result.success) {
          setBlog(result.blog);
        } else {
          console.error("Invalid blog data", result);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]); // ✅ re-run when id changes

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        console.log("Fetched blogs:", data); // ✅ Debug

        if (data.success && Array.isArray(data.blogs)) {
          // Optionally filter out the current blog
          const filtered = data.blogs.filter((b) => b.id !== blog?.id);
          setRelatedBlogs(filtered.slice(0, 6)); // Limit to 3
        } else {
          console.error("Invalid response format", data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    if (blog) {
      // Fetch only after current blog is loaded
      fetchBlogs();
    }
  }, [blog]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <CircularProgress size={50} sx={{ color: "#2a5298", mb: 2 }} />
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            Loading amazing content...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Paper
            elevation={8}
            sx={{
              p: 6,
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, mb: 2, color: "#1e3c72" }}
            >
              Blog Not Found
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              The blog post you're looking for doesn't exist or has been moved.
            </Typography>
            <Button
              onClick={() => navigate("/blogs")}
              variant="contained"
              size="large"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                background: "linear-gradient(45deg, #2a5298, #1e3c72)",
                "&:hover": {
                  background: "linear-gradient(45deg, #1e3c72, #2a5298)",
                },
              }}
            >
              <ArrowBack sx={{ mr: 1 }} />
              Back to Blogs
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  const getAvatarColor = (author) => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
    ];
    const index = author?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ minHeight: "100vh" }}>
        {/* Hero Section with Full Image Background */}
        <Box
          sx={{
            pt: 10,
            position: "relative",
            height: { xs: "100vh", md: "100vh" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Image */}
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain", // keeps image fully visible
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)",
              }}
            />
          )}

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              // background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
            }}
          />

          {/* Decorative Elements */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            }}
          />

          {/* Navigation Button */}
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              zIndex: 10,
            }}
          >
            <IconButton
              onClick={() => navigate("/blogs")}
              sx={{
                color: "white",
                bgcolor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.25)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ArrowBack />
            </IconButton>
          </Box>

          {/* Hero Content */}
          <Container
            sx={{
              position: "relative",
              zIndex: 2,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {/* Categories */}
            <Box sx={{ mb: 3 }}>
              <Chip
                label="HOME FINANCING"
                sx={{
                  bgcolor: "#3244e6",
                  color: "white",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  mr: 1,
                }}
              />
              <Chip
                label="HOME SELLING"
                sx={{
                  bgcolor: "#3244e6",
                  color: "white",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
                lineHeight: 1.1,
                mb: 4,
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                maxWidth: { md: "80%" },
              }}
            >
              {blog.title}
            </Typography>

            {/* Author Info */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#3244e6",
                  color: "white",
                  width: 48,
                  height: 48,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {blog.author?.charAt(0)?.toUpperCase() || "A"}
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "black",
                  }}
                >
                  By {blog.author || "dsignerworld_admin"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "black",
                  }}
                >
                  {blog.date || "October 18, 2024"}
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Content Section */}
        <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 8 }, mb: 8 }}>
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Main Content */}
            <Box sx={{ flex: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 6 },
                  borderRadius: 3,
                  mb: 4,
                  backgroundColor: "white",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                {/* Article Stats */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    mb: 4,
                    pb: 3,
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTime
                      sx={{ fontSize: 18, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {blog.readTime || "5 min read"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Visibility
                      sx={{ fontSize: 18, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      2.1k views
                    </Typography>
                  </Box>
                  <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                      <FavoriteBorder />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                      <BookmarkBorder />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                      <Share />
                    </IconButton>
                  </Box>
                </Box>

                {/* Tags */}
                {blog.tags && (
                  <Box
                    sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    {blog.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: "primary.main",
                          color: "primary.main",
                          fontWeight: 500,
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "white",
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}

                {/* Article Content */}
                <Box
                  sx={{
                    fontSize: "1.125rem",
                    lineHeight: 1.8,
                    color: "text.primary",
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    "& p": {
                      mb: 3,
                      textAlign: "justify",
                    },
                    "& p:first-of-type": {
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "text.secondary",
                      mb: 4,
                    },
                    "& h1, & h2, & h3, & h4, & h5, & h6": {
                      fontFamily: "inherit",
                      fontWeight: 700,
                      color: "#1e3c72",
                      mt: 5,
                      mb: 3,
                      lineHeight: 1.3,
                    },
                    "& h2": {
                      fontSize: "2rem",
                      borderLeft: "4px solid",
                      borderColor: "primary.main",
                      pl: 3,
                    },
                    "& h3": {
                      fontSize: "1.5rem",
                    },
                    "& img": {
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: 2,
                      my: 4,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    },
                    "& blockquote": {
                      borderLeft: "4px solid",
                      borderColor: "primary.main",
                      pl: 3,
                      py: 2,
                      bgcolor: "rgba(46, 82, 152, 0.05)",
                      borderRadius: 2,
                      fontStyle: "italic",
                      my: 4,
                      fontSize: "1.1rem",
                    },
                    "& ul, & ol": {
                      pl: 3,
                      mb: 3,
                    },
                    "& li": {
                      mb: 1.5,
                    },
                    "& a": {
                      color: "primary.main",
                      textDecoration: "none",
                      fontWeight: 600,
                      borderBottom: "2px solid transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.content ||
                      blog.description ||
                      `
                      <p>As we step further into 2025, the way people access financial support has evolved significantly. With increasing digitization and changing consumer demands, obtaining funds has become faster, more convenient, and more crucial than ever before.</p>
                      
                      <h2>The Evolution of Personal Finance</h2>
                      <p>Personal loans, in particular, continue to be one of the most popular financial tools—serving both salaried professionals and self-employed individuals. Whether it's for covering medical bills, organizing a wedding, pursuing higher education, traveling, or funding a business idea, a personal loan offers quick financial support without the need to put up assets as collateral.</p>
                      
                      <h3>Smart Borrowing Strategies</h3>
                      <p>This guide provides you with an in-depth understanding of personal loans in 2025, including their benefits, eligibility criteria, application processes, and tips for securing the best rates. We'll also explore emerging trends in the lending industry and how technology is reshaping the borrowing experience.</p>
                      
                      <blockquote>"The best investment on Earth is earth itself - but sometimes you need the right financial tools to make that investment possible."</blockquote>
                      
                      <p>From traditional banks to innovative fintech companies, the lending landscape has never been more diverse or accessible. Understanding your options and making informed decisions can save you thousands of dollars in interest and fees.</p>
                    `,
                  }}
                />
              </Paper>

              {/* Call to Action */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                  color: "white",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "200px",
                    height: "200px",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  Ready to Grow Your Business?
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}
                >
                  Explore our financial solutions and take your business to the
                  next level.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    mb: 3,
                  }}
                >
                  {["Doctor Loans", "Business Loans", "MSME Loans"].map(
                    (loan) => (
                      <Button
                        key={loan}
                        variant="outlined"
                        sx={{
                          color: "white",
                          borderColor: "rgba(255, 255, 255, 0.5)",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            borderColor: "white",
                          },
                          borderRadius: 3,
                          px: 3,
                          py: 1,
                        }}
                      >
                        {loan}
                      </Button>
                    )
                  )}
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "white",
                    color: "#1e3c72",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                >
                  Get Started Today
                  <KeyboardArrowRight />
                </Button>
              </Paper>
            </Box>

            {/* Sidebar */}

            <Box
              sx={{
                width: { xs: "100%", md: "300px" }, // full width on mobile, fixed width on desktop
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {relatedBlogs.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => navigate(`/blogs/${item.route}`)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.05)",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: 120,
                      backgroundImage: item.image
                        ? `url(${item.image})`
                        : "linear-gradient(45deg, #f0f0f0, #ffffff)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <Box sx={{ p: 1.5 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, mb: 0.5 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.readTime || "5 min read"} •{" "}
                      {item.date || "Recently"}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

export default BlogDetails;

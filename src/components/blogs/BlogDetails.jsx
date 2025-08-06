import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
} from "@mui/material";
import {
  AccessTime,
  Share,
  BookmarkBorder,
  ArrowBack,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CircularProgress size={50} sx={{ color: "#667eea", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading amazing content...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" color="error" gutterBottom>
          Blog Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The blog post you're looking for doesn't exist or has been moved.
        </Typography>
        <IconButton
          onClick={() => navigate("/blogs")}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <ArrowBack />
        </IconButton>
      </Container>
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
      <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            py: { xs: 4, md: 6 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage:
                'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
            }}
          />

          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
            <IconButton
              onClick={() => navigate("/blogs")}
              sx={{
                color: "white",
                mb: 2,
                bgcolor: "rgba(255, 255, 255, 0.1)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              <ArrowBack />
            </IconButton>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2rem", md: "3rem" },
                lineHeight: 1.2,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {blog.title}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontWeight: 300,
                fontSize: "1.2rem",
              }}
            >
              {blog.description ||
                "Discover insights and strategies to grow your business"}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: getAvatarColor(blog.author),
                    width: 48,
                    height: 48,
                    fontSize: 18,
                    fontWeight: 700,
                    border: "3px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {blog.author?.charAt(0)?.toUpperCase() || "A"}
                </Avatar>

                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {blog.author || "Admin"}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      opacity: 0.8,
                    }}
                  >
                    <Typography variant="body2">
                      {blog.date || "July 30, 2025"}
                    </Typography>
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        bgcolor: "white",
                        borderRadius: "50%",
                      }}
                    />
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <AccessTime sx={{ fontSize: 16 }} />
                      <Typography variant="body2">
                        {blog.readTime || "3 min read"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
                <IconButton
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                  }}
                >
                  <BookmarkBorder />
                </IconButton>
                <IconButton
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                  }}
                >
                  <Share />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Content Section */}
        <Container
          maxWidth="md"
          sx={{ mt: -4, position: "relative", zIndex: 2 }}
        >
          {blog.image && (
            <Paper
              elevation={8}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                mb: 6,
                background: "linear-gradient(45deg, #f0f0f0, #ffffff)",
              }}
            >
              <Box
                component="img"
                src={blog.image}
                alt={blog.title}
                sx={{
                  width: "100%",
                  height: { xs: 250, sm: 400, md: 500 },
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              />
            </Paper>
          )}

          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              mb: 4,
              backgroundColor: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            {blog.tags && (
              <Box sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap" }}>
                {blog.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      fontWeight: 500,
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  />
                ))}
              </Box>
            )}

            <Box
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "text.primary",
                fontFamily: "Georgia, serif",
                "& p": {
                  mb: 3,
                  textAlign: "justify",
                },
                "& h1, & h2, & h3, & h4, & h5, & h6": {
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  color: "primary.main",
                  mt: 4,
                  mb: 2,
                },
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 2,
                  my: 3,
                },
                "& blockquote": {
                  borderLeft: "4px solid",
                  borderColor: "primary.main",
                  pl: 3,
                  py: 2,
                  bgcolor: "grey.50",
                  borderRadius: 1,
                  fontStyle: "italic",
                  my: 3,
                },
                "& ul, & ol": {
                  pl: 3,
                  mb: 3,
                },
                "& li": {
                  mb: 1,
                },
                "& a": {
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                },
              }}
              dangerouslySetInnerHTML={{
                __html: blog.content || blog.description,
              }}
            />
          </Paper>

          {/* Call to Action */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              mb: 6,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Ready to Grow Your Business?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Explore our financial solutions and take your business to the next
              level.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Chip
                label="Doctor Loans"
                clickable
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                }}
              />
              <Chip
                label="Business Loans"
                clickable
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                }}
              />
              <Chip
                label="MSME Loans"
                clickable
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                }}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </Fade>
  );
};

export default BlogDetails;

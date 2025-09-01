"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
  List,
  ListItem,
  ListItemText,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  AccessTime,
  Share,
  BookmarkBorder,
  ArrowBack,
  Visibility,
  FavoriteBorder,
  KeyboardArrowRight,
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
  Menu,
  Close,
} from "@mui/icons-material"
import { getAllBlogs, getBlogById } from "../../apis/BlogsAPI"
import Logo from '../../assets/f2Fintechlogo.png'

const BlogDetails = () => {
  const { id } = useParams()
  const { slug } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const brandColors = {
    primary: "#3244e6",
    secondary: "#2a5298",
    accent: "#1e3c72",
    light: "#f8f9ff",
    gradient: "linear-gradient(135deg, #3244e6 0%, #2a5298 50%, #1e3c72 100%)",
  }

  const tableOfContents = [
    { id: "introduction", title: "Introduction", level: 1 },
    { id: "evolution", title: "Evolution of Personal Finance", level: 1 },
    { id: "smart-borrowing", title: "Smart Borrowing Strategies", level: 2 },
    { id: "application-process", title: "Application Process", level: 1 },
    { id: "eligibility", title: "Eligibility Criteria", level: 2 },
    { id: "tips", title: "Tips for Best Rates", level: 2 },
    { id: "conclusion", title: "Conclusion", level: 1 },
  ]

  const ShareButtons = () => (
    <Box
      sx={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1000,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        gap: 1,
        bgcolor: "white",
        borderRadius: 3,
        p: 1,
        boxShadow: "0 8px 32px rgba(50, 68, 230, 0.15)",
        border: `1px solid ${brandColors.primary}20`,
      }}
    >
      <IconButton
        size="small"
        sx={{
          color: "#1877f2",
          "&:hover": { bgcolor: "#1877f220" },
        }}
        onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${window.location.href}`, "_blank")}
      >
        <Facebook />
      </IconButton>
      <IconButton
        size="small"
        sx={{
          color: "#1da1f2",
          "&:hover": { bgcolor: "#1da1f220" },
        }}
        onClick={() =>
          window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog?.title}`, "_blank")
        }
      >
        <Twitter />
      </IconButton>
      <IconButton
        size="small"
        sx={{
          color: "#0077b5",
          "&:hover": { bgcolor: "#0077b520" },
        }}
        onClick={() => window.open(`https://linkedin.com/sharing/share-offsite/?url=${window.location.href}`, "_blank")}
      >
        <LinkedIn />
      </IconButton>
      <IconButton
        size="small"
        sx={{
          color: "#25d366",
          "&:hover": { bgcolor: "#25d36620" },
        }}
        onClick={() => window.open(`https://wa.me/?text=${blog?.title} ${window.location.href}`, "_blank")}
      >
        <WhatsApp />
      </IconButton>
    </Box>
  )

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const data = await getAllBlogs()
        console.log("API Response:", data)
        console.log("Looking for slug:", slug)

        if (data.success && Array.isArray(data.blogs)) {
          console.log(
            "Available blogs:",
            data.blogs.map((b) => ({
              title: b.title,
              route: b.route,
              slug: b.slug,
              id: b.id,
            })),
          )

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
            ]

            console.log(`Checking blog "${b.title}":`, {
              route: b.route,
              slug: b.slug,
              id: b.id,
              matches: matches,
            })

            return matches.some((match) => match)
          })

          if (found) {
            console.log("Found blog:", found)
            setBlog(found)
          } else {
            console.warn("No blog found for slug:", slug)
          }
        } else {
          console.error("Invalid API response structure:", data)
        }
      } catch (err) {
        console.error("Error fetching blog:", err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchBlog()
    }
  }, [slug])
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const result = await getBlogById(id) // ✅ Fetch by id
        if (result.success) {
          setBlog(result.blog)
        } else {
          console.error("Invalid blog data", result)
        }
      } catch (err) {
        console.error("Error fetching blog:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBlog()
    }
  }, [id]) // ✅ re-run when id changes

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs()
        console.log("Fetched blogs:", data) // ✅ Debug

        if (data.success && Array.isArray(data.blogs)) {
          // Optionally filter out the current blog
          const filtered = data.blogs.filter((b) => b.id !== blog?.id)
          setRelatedBlogs(filtered.slice(0, 6)) // Limit to 3
        } else {
          console.error("Invalid response format", data)
        }
      } catch (err) {
        console.error("Error fetching blogs:", err)
      }
    }

    if (blog) {
      // Fetch only after current blog is loaded
      fetchBlogs()
    }
  }, [blog])

  useEffect(() => {
    if (blog) {
      // Add canonical tag
      const canonical = document.querySelector('link[rel="canonical"]') || document.createElement("link")
      canonical.rel = "canonical"
      canonical.href = window.location.href
      if (!document.querySelector('link[rel="canonical"]')) {
        document.head.appendChild(canonical)
      }

      // Add meta tags
      document.title = `${blog.title} | F2 Fintech`

      const metaDescription = document.querySelector('meta[name="description"]') || document.createElement("meta")
      metaDescription.name = "description"
      metaDescription.content = blog.excerpt || blog.description || ""
      if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDescription)
      }
    }
  }, [blog])

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandColors.gradient,
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
            border: `1px solid ${brandColors.primary}20`,
          }}
        >
          <CircularProgress size={50} sx={{ color: brandColors.primary, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
            Loading amazing content...
          </Typography>
        </Paper>
      </Box>
    )
  }

  if (!blog) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: brandColors.gradient,
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
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: brandColors.accent }}>
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
                background: brandColors.gradient,
                "&:hover": {
                  background: `linear-gradient(45deg, ${brandColors.accent}, ${brandColors.secondary})`,
                },
              }}
            >
              <ArrowBack sx={{ mr: 1 }} />
              Back to Blogs
            </Button>
          </Paper>
        </Container>
      </Box>
    )
  }

  const getAvatarColor = (author) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]
    const index = author?.charCodeAt(0) % colors.length || 0
    return colors[index]
  }

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ minHeight: "100vh", bgcolor: brandColors.light }}>
        <Box
          sx={{
            background: brandColors.gradient,
            color: "white",
            py: 2,
            position: "sticky",
            top: 0,
            zIndex: 100,
            backdropFilter: "blur(10px)",
            borderBottom: `1px solid ${brandColors.primary}30`,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                  onClick={() => navigate("/blogs")}
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.25)",
                    },
                  }}
                >
                  <ArrowBack />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "0.5px" }}>
                  F2 FINTECH BLOG
                </Typography>
              </Box>

              {isMobile && (
                <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: "white" }}>
                  <Menu />
                </IconButton>
              )}
            </Box>
          </Container>
        </Box>

        <Box
          sx={{
            pt: 4,
            pb: 6,
            background: `linear-gradient(135deg, ${brandColors.light} 0%, white 100%)`,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
              {/* Featured Image */}
              <Box
                sx={{
                  flex: { xs: 1, md: 0.6 },
                  position: "relative",
                }}
              >
                {blog.image ? (
                  <Box
                    component="img"
                    src={blog.image}
                    alt={blog.title}
                    onClick={() => window.open(blog.image, "_blank")}
                    sx={{
                      width: "100%",
                      height: { xs: 260, md: 430 },
                      objectFit: "cover",
                      borderRadius: 3,
                      cursor: "pointer",
                      border: `3px solid ${brandColors.primary}`,
                      boxShadow: `0 12px 40px ${brandColors.primary}20`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 20px 60px ${brandColors.primary}30`,
                      },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: 250, md: 400 },
                      background: brandColors.gradient,
                      borderRadius: 3,
                      border: `3px solid ${brandColors.primary}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
                      F2 FINTECH
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Content Info */}
              <Box sx={{ flex: { xs: 1, md: 0.4 } }}>
                {/* Categories */}
                <Box sx={{ mb: 3 }}>
                  <Chip
                    label={blog.category || "FINANCIAL SERVICES"}
                    sx={{
                      bgcolor: brandColors.primary,
                      color: "white",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      mb: 1,
                    }}
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                    lineHeight: 1.2,
                    mb: 3,
                    color: brandColors.accent,
                    fontFamily: '"Inter", "Roboto", sans-serif',
                  }}
                >
                  {blog.title}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: brandColors.primary,
                      // fontSize: "1rem",
                      // fontWeight: 600,
                    }}
                  >
                    <img
                      src={Logo}
                      alt="Logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: brandColors.accent }}>
                      {blog.author || "F2 Fintech Team"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.date || "Recently Published"}
                    </Typography>
                  </Box>
                </Box>

                {/* Stats */}
                <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: 18, color: brandColors.primary }} />
                    <Typography variant="body2" color="text.secondary">
                      {blog.read_time || "5 min read"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Visibility sx={{ fontSize: 18, color: brandColors.primary }} />
                    <Typography variant="body2" color="text.secondary">
                      2.1k views
                    </Typography>
                  </Box>
                </Box>

                {/* Action Buttons */}
                {/* <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    sx={{
                      color: brandColors.primary,
                      border: `1px solid ${brandColors.primary}30`,
                      "&:hover": { bgcolor: `${brandColors.primary}10` },
                    }}
                  >
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: brandColors.primary,
                      border: `1px solid ${brandColors.primary}30`,
                      "&:hover": { bgcolor: `${brandColors.primary}10` },
                    }}
                  >
                    <BookmarkBorder />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: brandColors.primary,
                      border: `1px solid ${brandColors.primary}30`,
                      "&:hover": { bgcolor: `${brandColors.primary}10` },
                    }}
                  >
                    <Share />
                  </IconButton>
                </Box> */}
              </Box>
            </Box>
          </Container>
        </Box>

        {/* <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          variant={isMobile ? "temporary" : "permanent"}
          sx={{
            width: 280,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 280,
              boxSizing: "border-box",
              top: isMobile ? 0 : 80,
              height: isMobile ? "100%" : "calc(100% - 80px)",
              bgcolor: "white",
              borderRight: `1px solid ${brandColors.primary}20`,
              p: 2,
            },
          }}
        >
          {isMobile && (
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: brandColors.primary }}>
                Contents
              </Typography>
              <IconButton onClick={() => setSidebarOpen(false)}>
                <Close />
              </IconButton>
            </Box>
          )}

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: brandColors.primary }}>
            Table of Contents
          </Typography>

          <List>
            {tableOfContents.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                  if (isMobile) setSidebarOpen(false)
                }}
                sx={{
                  pl: item.level * 2,
                  py: 0.5,
                  borderRadius: 1,
                  mb: 0.5,
                  "&:hover": {
                    bgcolor: `${brandColors.primary}10`,
                  },
                }}
              >
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: item.level === 1 ? "0.9rem" : "0.8rem",
                    fontWeight: item.level === 1 ? 600 : 400,
                    color: item.level === 1 ? brandColors.accent : "text.secondary",
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: brandColors.primary }}>
            Related Topics
          </Typography>

          <List>
            {["Personal Loans", "Business Financing", "MSME Loans", "Home Loans", "Investment Tips"].map(
              (topic, index) => (
                <ListItem
                  key={index}
                  button
                  sx={{
                    py: 0.5,
                    borderRadius: 1,
                    mb: 0.5,
                    "&:hover": {
                      bgcolor: `${brandColors.primary}10`,
                    },
                  }}
                >
                  <ListItemText
                    primary={topic}
                    primaryTypographyProps={{
                      fontSize: "0.85rem",
                      color: "text.secondary",
                    }}
                  />
                </ListItem>
              ),
            )}
          </List>
        </Drawer> */}

        {/* Main Content */}
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 8,
            ml: { xs: 0, md: "280px" },
            width: { xs: "100%", md: "calc(100% - 280px)" },
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Article Content */}
            <Box sx={{ flex: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 6 },
                  borderRadius: 3,
                  mb: 4,
                  backgroundColor: "white",
                  border: `1px solid ${brandColors.primary}10`,
                  boxShadow: `0 8px 32px ${brandColors.primary}08`,
                }}
              >
                <Box
                  sx={{
                    fontSize: "1.125rem",
                    lineHeight: 1.8,
                    color: "text.primary",
                    fontFamily: '"Inter", "Roboto", sans-serif',
                    "& p": {
                      mb: 3,
                      textAlign: "justify",
                    },
                    "& p:first-of-type": {
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: brandColors.secondary,
                      mb: 4,
                      pl: 3,
                      borderLeft: `4px solid ${brandColors.primary}`,
                      bgcolor: `${brandColors.primary}05`,
                      py: 2,
                      borderRadius: 1,
                    },
                    "& h1, & h2, & h3, & h4, & h5, & h6": {
                      fontFamily: '"Inter", "Roboto", sans-serif',
                      fontWeight: 700,
                      color: brandColors.accent,
                      mt: 5,
                      mb: 3,
                      lineHeight: 1.3,
                    },
                    "& h2": {
                      fontSize: "2rem",
                      borderLeft: `4px solid ${brandColors.primary}`,
                      pl: 3,
                      bgcolor: `${brandColors.primary}05`,
                      py: 2,
                      borderRadius: 1,
                    },
                    "& h3": {
                      fontSize: "1.5rem",
                      color: brandColors.secondary,
                    },
                    "& img": {
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: 2,
                      my: 4,
                      border: `2px solid ${brandColors.primary}`,
                      boxShadow: `0 8px 32px ${brandColors.primary}20`,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 12px 40px ${brandColors.primary}30`,
                      },
                    },
                    "& blockquote": {
                      borderLeft: `4px solid ${brandColors.primary}`,
                      pl: 3,
                      py: 2,
                      bgcolor: `${brandColors.primary}08`,
                      borderRadius: 2,
                      fontStyle: "italic",
                      my: 4,
                      fontSize: "1.1rem",
                      position: "relative",
                      "&::before": {
                        content: '"""',
                        fontSize: "3rem",
                        color: brandColors.primary,
                        position: "absolute",
                        top: -10,
                        left: 10,
                        fontFamily: "serif",
                      },
                    },
                    "& ul, & ol": {
                      pl: 3,
                      mb: 3,
                    },
                    "& li": {
                      mb: 1.5,
                    },
                    "& a": {
                      color: brandColors.primary,
                      textDecoration: "none",
                      fontWeight: 600,
                      borderBottom: `2px solid ${brandColors.primary}30`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: brandColors.primary,
                        bgcolor: `${brandColors.primary}10`,
                        px: 1,
                        borderRadius: 1,
                      },
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.content ||
                      blog.description ||
                      `
                      <div id="introduction">
                        <p>As we step further into 2025, the way people access financial support has evolved significantly. With increasing digitization and changing consumer demands, obtaining funds has become faster, more convenient, and more crucial than ever before.</p>
                      </div>
                      
                      <div id="evolution">
                        <h2>The Evolution of Personal Finance</h2>
                        <p>Personal loans, in particular, continue to be one of the most popular financial tools—serving both salaried professionals and self-employed individuals. Whether it's for covering medical bills, organizing a wedding, pursuing higher education, traveling, or funding a business idea, a personal loan offers quick financial support without the need to put up assets as collateral.</p>
                        
                        <p>The <a href="/personal-loans" target="_blank">personal loan market</a> has seen tremendous growth, with digital lenders offering competitive rates and faster approval processes. Traditional banks are also adapting to this digital-first approach.</p>
                      </div>
                      
                      <div id="smart-borrowing">
                        <h3>Smart Borrowing Strategies</h3>
                        <p>This guide provides you with an in-depth understanding of personal loans in 2025, including their benefits, eligibility criteria, application processes, and tips for securing the best rates. We'll also explore emerging trends in the lending industry and how technology is reshaping the borrowing experience.</p>
                        
                        <p>Consider exploring our <a href="/loan-calculator" target="_blank">loan calculator</a> to understand your EMI obligations before applying.</p>
                      </div>
                      
                      <div id="application-process">
                        <h2>Application Process</h2>
                        <blockquote>"The best investment on Earth is earth itself - but sometimes you need the right financial tools to make that investment possible."</blockquote>
                        
                        <p>From traditional banks to innovative fintech companies, the lending landscape has never been more diverse or accessible. Understanding your options and making informed decisions can save you thousands of dollars in interest and fees.</p>
                        
                        <div id="eligibility">
                          <h3>Eligibility Criteria</h3>
                          <p>Most lenders require a minimum credit score of 650, stable income proof, and age between 21-65 years. Check our <a href="/eligibility-checker" target="_blank">eligibility checker</a> for personalized requirements.</p>
                        </div>
                        
                        <div id="tips">
                          <h3>Tips for Best Rates</h3>
                          <p>Maintain a good credit score, compare offers from multiple lenders, and consider our <a href="/rate-comparison" target="_blank">rate comparison tool</a> to find the best deals.</p>
                        </div>
                      </div>
                      
                      <div id="conclusion">
                        <h2>Conclusion</h2>
                        <p>The future of personal lending is bright, with more options and better rates available than ever before. Make sure to do your research and choose the right financial partner for your needs.</p>
                        
                        <p>Ready to get started? <a href="/apply-now" target="_blank">Apply for a loan today</a> and take the first step towards achieving your financial goals.</p>
                      </div>
                    `,
                  }}
                />
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: brandColors.gradient,
                  color: "white",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  border: `2px solid ${brandColors.primary}`,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "200px",
                    height: "200px",
                    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  Ready to Grow Your Business?
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}>
                  Explore our financial solutions and take your business to the next level with F2 Fintech.
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
                  {["Doctor Loans", "Business Loans", "MSME Loans"].map((loan) => (
                    <Button
                      key={loan}
                      variant="outlined"
                      component="a"
                      href={`/${loan.toLowerCase().replace(" ", "-")}`}
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
                  ))}
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  component="a"
                  href="/apply-now"
                  sx={{
                    bgcolor: "white",
                    color: brandColors.primary,
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Started Today
                  <KeyboardArrowRight />
                </Button>
              </Paper>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "300px" },
                display: { xs: "none", lg: "flex" },
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: brandColors.primary }}>
                Related Articles
              </Typography>

              {relatedBlogs.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => navigate(`/blogs/${item.route}`)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: `1px solid ${brandColors.primary}20`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: `0 8px 24px ${brandColors.primary}20`,
                      transform: "translateY(-2px)",
                      borderColor: brandColors.primary,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: 120,
                      backgroundImage: item.image ? `url(${item.image})` : brandColors.gradient,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border: item.image ? `2px solid ${brandColors.primary}30` : "none",
                    }}
                  />
                  <Box sx={{ p: 1.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: brandColors.accent,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: brandColors.secondary }}>
                      {item.read_time || "5 min read"} • {item.date || "Recently"}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>

        <ShareButtons />
      </Box>
    </Fade>
  )
}

export default BlogDetails

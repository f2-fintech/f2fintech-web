"use client"

import React, { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
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
  List,
  ListItem,
  ListItemText,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  AccessTime,
  ArrowBack,
  KeyboardArrowRight,
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
  Menu,
  Close,
  Edit,
} from "@mui/icons-material"
import { getAllBlogs, updateBlog } from "../../apis/BlogsAPI"
import { Utility } from "../utility"
import Logo from '../../assets/f2Fintechlogo.png'

// Detect if the blog content is a self-contained HTML file (custom HTML blog)
const isRawHTMLBlog = (content) => {
  if (!content) return false
  const lower = content.toLowerCase().trim()
  return (
    lower.includes('f2dl-wrapper') ||
    lower.includes('<!doctype') ||
    lower.includes('<html') ||
    (lower.includes('<style>') && lower.includes('<script'))
  )
}

// Iframe-based renderer for self-contained HTML blogs
const HtmlBlogIframe = ({ htmlContent, onLoaded }) => {
  const iframeRef = React.useRef(null)

  React.useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    // Use the content as provided, IDs are now pre-injected in the parent
    iframe.srcdoc = htmlContent
  }, [htmlContent])

  return (
    <iframe
      ref={iframeRef}
      title="Blog Content"
      style={{
        width: '100%',
        border: 'none',
        display: 'block',
        minHeight: '100vh',
      }}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      onLoad={(e) => {
        try {
          const doc = e.target.contentDocument || e.target.contentWindow?.document
          if (doc) {
            e.target.style.height = doc.documentElement.scrollHeight + 'px'
            if (onLoaded) onLoaded()
          }
        } catch (_) { }
      }}
    />
  )
}

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
  const [headings, setHeadings] = useState([])
  const [activeHeading, setActiveHeading] = useState("")
  const contentRef = useRef(null)
  const observerRef = useRef(null)
  const [processedContent, setProcessedContent] = useState("")
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [isMarketingAgent, setIsMarketingAgent] = useState(false)
  const [updatingImage, setUpdatingImage] = useState(false)
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const { getLocalStorage, toastAndNavigate } = Utility()

  useEffect(() => {
    const customerInfo = getLocalStorage("customerInfo")
    if (customerInfo && customerInfo.role === "marketing_agent") {
      setIsMarketingAgent(true)
    }
  }, [])

  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      setUpdatingImage(true)
      const result = await updateBlog(blog.id, { image: file })
      if (result.success) {
        setBlog(prev => ({ ...prev, image: result.blog.image }))
        toastAndNavigate(dispatch, true, "success", "Featured image updated successfully")
      } else {
        toastAndNavigate(dispatch, true, "error", result.message || "Failed to update image")
      }
    } catch (error) {
      console.error("Error updating image:", error)
      toastAndNavigate(dispatch, true, "error", "Network error while updating image")
    } finally {
      setUpdatingImage(false)
    }
  }

  // ── Scroll to top: disable browser scroll-restore and enforce position on mount + after load ──
  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo({ top: 0, behavior: "instant" })
    return () => {
      // Restore default behaviour when leaving the page
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto"
      }
    }
  }, [slug])

  // After blog data finishes loading, scroll to top again to cancel any layout-shift drift
  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [loading])

  // ── JS-based sticky sidebars (CSS sticky unreliable in this layout) ──
  const layoutRef = useRef(null)
  // 'pre' = before sticky, 'fixed' = fixed to viewport, 'bottom' = anchored to container bottom
  const [sidebarMode, setSidebarMode] = useState('pre')
  const [sidebarLeft, setSidebarLeft] = useState(0)
  const [sidebarRight, setSidebarRight] = useState(0)
  const isSidebarFixed = sidebarMode === 'fixed' // legacy alias kept for readability
  const STICKY_TOP = 70 // px below viewport top (height of blog sticky header)

  useEffect(() => {
    const updateSidebarMode = () => {
      if (!layoutRef.current) return
      const rect = layoutRef.current.getBoundingClientRect()
      const sidebarH = window.innerHeight - 80

      // Container's bottom edge relative to viewport
      const containerBottomInViewport = rect.bottom

      // The sidebar's bottom edge would be at: STICKY_TOP + sidebarH
      const sidebarBottomInViewport = STICKY_TOP + sidebarH

      if (rect.top > STICKY_TOP) {
        // Layout hasn't reached the sticky threshold yet — keep sidebar in normal flow
        setSidebarMode('pre')
      } else if (containerBottomInViewport <= sidebarBottomInViewport) {
        // Container bottom is about to go behind the sidebar — pin to container bottom
        setSidebarMode('bottom')
        setSidebarLeft(rect.left)
        setSidebarRight(window.innerWidth - rect.right)
      } else {
        // Normal fixed-sticky region
        setSidebarMode('fixed')
        setSidebarLeft(rect.left)
        setSidebarRight(window.innerWidth - rect.right)
      }
    }
    window.addEventListener('scroll', updateSidebarMode, { passive: true })
    window.addEventListener('resize', updateSidebarMode)
    updateSidebarMode()
    return () => {
      window.removeEventListener('scroll', updateSidebarMode)
      window.removeEventListener('resize', updateSidebarMode)
    }
  }, [blog])

  // ── Iframe Communication Logic ──
  useEffect(() => {
    const handleMessage = (event) => {
      const { type, height } = event.data || {}

      if (type === 'IFRAME_RESIZE' && height) {
        const iframe = document.querySelector('iframe[title="Blog Content"]')
        if (iframe) {
          iframe.style.height = height + 'px'
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const brandColors = {
    primary: "#3244e6",
    secondary: "#2a5298",
    accent: "#1e3c72",
    light: "#f8f9ff",
    gradient: "linear-gradient(135deg, #3244e6 0%, #2a5298 50%, #1e3c72 100%)",
  }

  // ShareButtons component remains the same...
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

  // Process content to add IDs to headings and extract them
  useEffect(() => {
    if (blog?.content) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(blog.content, 'text/html')

      // If it's a full HTML blog, we look for headings inside the body
      const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')

      const extractedHeadings = []

      // Add IDs to headings and collect them
      headingElements.forEach((heading, index) => {
        if (heading.textContent.trim()) {
          // Generate a clean ID
          let id = heading.id
          if (!id || id === '') {
            id = `heading-${index}-${heading.textContent
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')}`
            heading.id = id
          }

          extractedHeadings.push({
            id,
            title: heading.textContent.trim(),
            level: parseInt(heading.tagName.charAt(1)),
            element: heading.tagName.toLowerCase()
          })
        }
      })

      // Update the content with IDs
      if (!isRawHTMLBlog(blog.content)) {
        setProcessedContent(doc.body.innerHTML)
      } else {
        // For HTML blogs, provide the full mutated HTML so headers have IDs
        setProcessedContent(doc.documentElement.outerHTML)
      }
      setHeadings(extractedHeadings)
    } else {
      setProcessedContent(blog?.content || blog?.description || "")
      setHeadings([])
    }
  }, [blog])

  // Intersection Observer for active heading highlight
  useEffect(() => {
    if (headings.length === 0) return

    // ── HIGHLIGHTING LOGIC FOR HTML BLOGS (IFRAME) ──
    if (isRawHTMLBlog(blog?.content)) {
      const handleScroll = () => {
        const iframe = document.querySelector('iframe[title="Blog Content"]')
        if (!iframe || !iframe.contentDocument) return

        const iframeRect = iframe.getBoundingClientRect()
        // If iframe is well outside viewport, stop processing
        if (iframeRect.bottom < -200 || iframeRect.top > window.innerHeight + 200) return

        // Calculate internal iframe scroll position (150px offset from viewport top)
        const scrollOffsetInIframe = Math.max(0, -iframeRect.top + 150)

        let newActive = activeHeading || (headings.length > 0 ? headings[0].id : "")

        // Check if we're essentially at the bottom of the page
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60

        if (isAtBottom && headings.length > 0) {
          newActive = headings[headings.length - 1].id
        } else {
          // Iterate through headings to find the current one
          for (let i = 0; i < headings.length; i++) {
            const h = headings[i]
            const el = iframe.contentDocument.getElementById(h.id)
            if (el) {
              if (el.offsetTop <= scrollOffsetInIframe) {
                newActive = h.id
              } else {
                break // Stop once we find a heading below the current point
              }
            }
          }
        }

        if (newActive && newActive !== activeHeading) {
          setActiveHeading(newActive)
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      const timer = setTimeout(handleScroll, 500)

      return () => {
        window.removeEventListener('scroll', handleScroll)
        clearTimeout(timer)
      }
    }

    // ── HIGHLIGHTING LOGIC FOR REGULAR BLOGS (INTERSECTION OBSERVER) ──
    const options = {
      rootMargin: '-120px 0px -70% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id)
        }
      })
    }, options)

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [headings, iframeLoaded, blog?.content, activeHeading])

  const scrollToHeading = (headingId) => {
    // 1. Try finding in main document first
    const element = document.getElementById(headingId)
    const iframe = document.querySelector('iframe[title="Blog Content"]')
    let innerElement = null

    if (!element && iframe && iframe.contentDocument) {
      try {
        innerElement = iframe.contentDocument.getElementById(headingId)
      } catch (e) {
        console.error("Error accessing iframe content:", e)
      }
    }

    const offset = 120

    // Helper to get absolute offset top by traversing offsetParent chain
    const getAbsoluteOffsetTop = (el) => {
      let top = 0
      while (el) {
        top += el.offsetTop
        el = el.offsetParent
      }
      return top
    }

    if (element) {
      const targetY = getAbsoluteOffsetTop(element) - offset
      window.scrollTo({ top: targetY, behavior: "smooth" })
      setActiveHeading(headingId)
      if (isMobile) setSidebarOpen(false)
    } else if (innerElement && iframe) {
      // absoluteTargetY = iframe's absolute Y + element's relative Y in iframe
      const iframeAbsoluteY = getAbsoluteOffsetTop(iframe)
      const innerElementRelativeY = getAbsoluteOffsetTop(innerElement)

      window.scrollTo({
        top: iframeAbsoluteY + innerElementRelativeY - offset,
        behavior: "smooth"
      })
      setActiveHeading(headingId)
      if (isMobile) setSidebarOpen(false)
    } else {
      console.warn("Element not found with ID:", headingId)
    }
  }

  const getHeadingPadding = (level) => {
    switch (level) {
      case 1: return 1
      case 2: return 3
      case 3: return 5
      case 4: return 7
      case 5: return 9
      case 6: return 11
      default: return 1
    }
  }

  const TableOfContents = ({ sticky = true }) => {
    const activeItemRef = useRef(null)

    // Auto-scroll the active TOC item into view if the list is long
    useEffect(() => {
      if (activeItemRef.current) {
        activeItemRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }
    }, [activeHeading])

    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "white",
          border: `1px solid ${brandColors.primary}10`,
          boxShadow: `0 8px 32px ${brandColors.primary}08`,
          position: sticky ? "sticky" : "static",
          top: sticky ? 70 : "auto",
          maxHeight: "calc(100vh - 80px)",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: 4,
          },
          "&::-webkit-scrollbar-track": {
            background: `${brandColors.primary}10`,
            borderRadius: 2,
          },
          "&::-webkit-scrollbar-thumb": {
            background: `${brandColors.primary}30`,
            borderRadius: 2,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: brandColors.primary,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: brandColors.accent,
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          📑 Table of Contents
        </Typography>

        {
          headings.length > 0 ? (
            <List sx={{ py: 0 }}>
              {headings.map((heading, index) => (
                <ListItem
                  key={heading.id}
                  ref={activeHeading === heading.id ? activeItemRef : null}
                  button
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHeading(heading.id)
                  }}
                  sx={{
                    pl: getHeadingPadding(heading.level),
                    py: 0.75,
                    borderRadius: 2,
                    mb: 0.5,
                    borderLeft: `3px solid ${activeHeading === heading.id ? brandColors.primary : "transparent"
                      }`,
                    backgroundColor: activeHeading === heading.id ? `${brandColors.primary}08` : "transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: `${brandColors.primary}10`,
                      borderLeft: `3px solid ${brandColors.primary}60`,
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <ListItemText
                    primary={heading.title}
                    primaryTypographyProps={{
                      fontSize: heading.level === 1 ? "0.95rem" :
                        heading.level === 2 ? "0.9rem" : "0.85rem",
                      fontWeight: activeHeading === heading.id ? 700 :
                        (heading.level === 1 ? 600 : 500),
                      color: activeHeading === heading.id ? brandColors.primary : "text.secondary",
                      lineHeight: 1.3,
                    }}
                    sx={{
                      "& .MuiListItemText-primary": {
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              No headings found in this article.
            </Typography>
          )
        }

        {/* Reading Progress */}
        <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${brandColors.primary}20` }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Reading progress
            </Typography>
            <Typography variant="caption" color={brandColors.primary} fontWeight={600}>
              {headings.length > 0 ?
                `${Math.round(((headings.findIndex(h => h.id === activeHeading) + 1) / headings.length) * 100)}%`
                : "0%"
              }
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 4,
              backgroundColor: `${brandColors.primary}20`,
              borderRadius: 2,
              overflow: "hidden"
            }}
          >
            <Box
              sx={{
                height: "100%",
                backgroundColor: brandColors.primary,
                borderRadius: 2,
                width: headings.length > 0 ?
                  `${((headings.findIndex(h => h.id === activeHeading) + 1) / headings.length) * 100}%`
                  : "0%",
                transition: "width 0.3s ease"
              }}
            />
          </Box>
        </Box>
      </Paper >
    )
  }

  // Rest of your existing useEffect hooks remain the same...
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const data = await getAllBlogs()

        if (data.success && Array.isArray(data.blogs)) {
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
              slug.includes(b.title?.toLowerCase().replace(/\s+/g, "-")),
              b.route?.includes(slug),
            ]
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
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs()
        if (data.success && Array.isArray(data.blogs)) {
          const filtered = data.blogs.filter((b) => b.id !== blog?.id)
          setRelatedBlogs(filtered.slice(0, 6))
        } else {
          console.error("Invalid response format", data)
        }
      } catch (err) {
        console.error("Error fetching blogs:", err)
      }
    }

    if (blog) {
      fetchBlogs()
    }
  }, [blog])

  useEffect(() => {
    if (blog) {
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

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ minHeight: "100vh", bgcolor: brandColors.light }}>
        {/* Header remains the same */}
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

        {/* Blog header section – Refined for perfect responsiveness */}
        <Box
          sx={{
            pt: { xs: 3, md: 5 },
            pb: { xs: 4, md: 6 },
            background: `linear-gradient(135deg, ${brandColors.light} 0%, white 100%)`,
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" }, // Stack on tablets for more breathing room
                gap: { xs: 4, lg: 6 },
                alignItems: "flex-start",
              }}
            >
              {/* Featured Image - Compact Banner Style */}
              <Box
                sx={{
                  flex: { xs: "0 0 auto", lg: "0 0 60%" },
                  width: "100%",
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
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
                      height: "auto",
                      aspectRatio: { xs: "16 / 9", sm: "4 / 2", md: "4.5  / 3", lg: "5 / 3" },
                      objectFit: "cover", // Sleek banner look
                      backgroundColor: "rgba(0,0,0,0.02)",
                      display: "block",
                      cursor: "pointer",
                      boxShadow: `0 12px 40px ${brandColors.primary}15`,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: `0 20px 60px ${brandColors.primary}25`,
                      },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: { xs: "16 / 9", sm: "4 / 1", md: "4.5 / 1", lg: "5 / 1" },
                      background: brandColors.gradient,
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

                {/* Edit Button for Marketing Agent */}
                {isMarketingAgent && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      accept="image/*"
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        zIndex: 20,
                      }}
                    >
                      <IconButton
                        onClick={() => fileInputRef.current.click()}
                        disabled={updatingImage}
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.9)",
                          color: brandColors.primary,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          "&:hover": {
                            bgcolor: "white",
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        {updatingImage ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Edit />
                        )}
                      </IconButton>
                    </Box>
                  </>
                )}
              </Box>

              {/* Content Info */}
              <Box
                sx={{
                  flex: "1 1 auto",
                  width: "100%",
                }}
              >
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

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem", lg: "2.5rem" },
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

                <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: 18, color: brandColors.primary }} />
                    <Typography variant="body2" color="text.secondary">
                      {blog.read_time || "5 min read"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Mobile Table of Contents Drawer */}
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          variant="temporary"
          sx={{
            "& .MuiDrawer-paper": {
              width: 280,
              boxSizing: "border-box",
              top: 0,
              height: "100%",
              bgcolor: "white",
              p: 2,
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: brandColors.primary }}>
              📑 Contents
            </Typography>
            <IconButton onClick={() => setSidebarOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <TableOfContents sticky={false} />
        </Drawer>

        {/* Main Content */}
        <Container maxWidth="false" sx={{ mt: 4, mb: 8 }}>
          <Box ref={layoutRef} sx={{ display: "flex", gap: 4, alignItems: "stretch" }}>
            {/* Left Sidebar - Table of Contents for Desktop */}
            {!isMobile && (
              // Outer box keeps the 300px space in the flex layout always
              <Box sx={{ width: 300, flexShrink: 0, position: 'relative' }}>
                {/* Inner box: fixed to viewport when scrolled, absolute when near bottom */}
                <Box
                  sx={{
                    width: 300,
                    maxHeight: 'calc(100vh - 80px)',
                    zIndex: 10,
                    ...(sidebarMode === 'fixed' ? {
                      position: 'fixed',
                      top: STICKY_TOP,
                      left: sidebarLeft,
                    } : sidebarMode === 'bottom' ? {
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                    } : {
                      position: 'relative',
                    })
                  }}
                >
                  <TableOfContents sticky={false} />
                </Box>
              </Box>
            )}

            {/* Main Content Area */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Article Content */}
              <Box sx={{ flex: 1 }} ref={contentRef}>
                {/* ── Content rendering: iframe for HTML blogs, styled div for rich text ── */}
                {isRawHTMLBlog(blog.content || blog.description) ? (
                  /* Self-contained HTML blog: render in sandboxed iframe */
                  <Box
                    sx={{
                      borderRadius: 3,
                      mb: 4,
                      overflow: 'hidden',
                      border: `1px solid ${brandColors.primary}10`,
                      boxShadow: `0 8px 32px ${brandColors.primary}08`,
                    }}
                  >
                    <HtmlBlogIframe
                      htmlContent={processedContent || blog.content || blog.description}
                      onLoaded={() => setIframeLoaded(prev => !prev)}
                    />
                  </Box>
                ) : (
                  /* Regular rich-text blog: styled dangerouslySetInnerHTML */
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
                          scrollMarginTop: "100px",
                          position: "relative",
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
                          minWidth: "100%",
                          display: "inline-block",
                          height: "auto",
                          borderRadius: 2,
                          my: 4,
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
                            content: '"',
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
                        __html: processedContent || blog.content || blog.description || `
                  <h2 id="personal-loan">Personal Loan</h2>
                  <p>Personal loans are versatile financial tools that can be used for various purposes...</p>

                  <h2 id="home-loan">Home Loan</h2>
                  <p>Home loans help individuals purchase their dream homes with flexible repayment options...</p>
                `,
                      }}
                    />
                  </Paper>
                )}

                {/* CTA Section */}
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
                    {[
                      { name: "Doctor Loans", url: "/doctor-loan" },
                      { name: "Business Loans", url: "/business-loan#about-business-loans" },
                      { name: "Home Loans", url: "/home-loan" }
                    ].map((loan) => (
                      <Button
                        key={loan.name}
                        variant="outlined"
                        component="a"
                        href={loan.url}
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
                        {loan.name}
                      </Button>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    size="large"
                    component="a"
                    href="/application-form"
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
            </Box>

            {/* Right Sidebar - Related Articles */}
            {/* Outer box keeps the 300px space in the flex layout always */}
            <Box
              sx={{
                width: 300,
                flexShrink: 0,
                display: { xs: "none", lg: "block" },
                position: 'relative',
              }}
            >
              {/* Inner box: fixed to viewport when scrolled, absolute when near bottom */}
              <Box
                sx={{
                  width: 300,
                  maxHeight: "calc(100vh - 80px)",
                  zIndex: 10,
                  ...(sidebarMode === 'fixed' ? {
                    position: "fixed",
                    top: STICKY_TOP,
                    right: sidebarRight,
                  } : sidebarMode === 'bottom' ? {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  } : {
                    position: "relative",
                  })
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "white",
                    border: `1px solid ${brandColors.primary}10`,
                    boxShadow: `0 8px 32px ${brandColors.primary}08`,
                    maxHeight: "calc(100vh - 80px)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: brandColors.primary,
                      flexShrink: 0,
                    }}
                  >
                    Related Articles
                  </Typography>

                  {/* Scrollable related articles area */}
                  <Box sx={{ flex: 1, overflow: "auto" }}>
                    {relatedBlogs.length > 0 ? (
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontStyle: "italic",
                          textAlign: "center",
                          py: 4
                        }}
                      >
                        No related articles found.
                      </Typography>
                    )}
                  </Box>

                  {/* Optional: Add a footer section if needed */}
                  <Box sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: `1px solid ${brandColors.primary}20`,
                    flexShrink: 0,
                    textAlign: "center"
                  }}>
                    <Typography variant="caption" color="text.secondary">
                      {relatedBlogs.length} articles
                    </Typography>
                  </Box>
                </Paper>
              </Box> {/* end inner fixed Box */}
            </Box> {/* end outer placeholder Box */}
          </Box>
        </Container>

        <ShareButtons />
      </Box>
    </Fade>
  )
}

export default BlogDetails
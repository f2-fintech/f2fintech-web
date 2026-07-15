import React from "react";

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {
  MenuItem,
  Menu,
  MenuList,
  Typography,
  Box,
  Badge,
  IconButton,
  Avatar,
  useMediaQuery,
  Drawer,
  styled,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CircleIcon from "@mui/icons-material/Circle";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { keyframes } from "@mui/system";

import { pages, products } from "../../data/Data";
import { Utility } from "../utility";
import API from "../../apis";

export default function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [blogAnchorEl, setBlogAnchorEl] = React.useState(null);
  const [resourcesAnchorEl, setResourcesAnchorEl] = useState(null);
  const [regulatoryAnchorEl, setRegulatoryAnchorEl] = useState(null);

  const [b2bAnchorEl, setB2bAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [userNotificationAnchorEl, setUserNotificationAnchorEl] =
    useState(null);
  const [notifications, setNotifications] = useState([]);
  const [visibleNotificationsCount, setVisibleNotificationsCount] = useState(5);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px)");
  // Detect touch-primary devices (iPad Pro, tablets, mobiles).
  // Only (pointer: coarse) is used - desktop browsers expose maxTouchPoints > 0
  // even on non-touch hardware, which would falsely trigger click-mode on desktop.
  const [isTouch, setIsTouch] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state) => () => setOpen(state);

  const location = useLocation();
  const { getLocalStorage, remLocalStorage, groupNotificationsByDate } =
    Utility();
  const customer = getLocalStorage("customerInfo");
  const username = customer?.name;
  const customerId = customer?.id;

  const timeoutRef = React.useRef(null);

  const openMenu = (setAnchor, event) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setAnchorEl(null);

    setResourcesAnchorEl(null);
    setRegulatoryAnchorEl(null);
    setB2bAnchorEl(null);
    setAnchor(event.currentTarget);
  };

  const closeMenu = (setAnchor) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAnchor(null);
    }, 150);
  };

  const keepMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleBlogMenuOpen = (event) => {
    setBlogAnchorEl(event.currentTarget);
  };
  const handleResourcesMenuOpen = (event) => {
    setResourcesAnchorEl(event.currentTarget);
  };
  const handleRegulatoryMenuOpen = (event) => {
    setRegulatoryAnchorEl(event.currentTarget);
  };

  const handleB2bMenuOpen = (event) => {
    setB2bAnchorEl(event.currentTarget);
  };
  const handleB2bMenuClose = () => {
    setB2bAnchorEl(null);
  };
  useEffect(() => {
    handleMenuClose();
    handleUserMenuClose();
    handleNotificationMenuClose();
    handleBlogMenuClose();
    handleResourcesMenuClose();
    handleRegulatoryMenuClose();

    handleB2bMenuClose();
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const closeAllMenusOnScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setAnchorEl(null);

      setResourcesAnchorEl(null);
      setRegulatoryAnchorEl(null);
      setB2bAnchorEl(null);
      setBlogAnchorEl(null);
    };
    window.addEventListener("scroll", closeAllMenusOnScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", closeAllMenusOnScroll);
    };
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBlogMenuClose = () => {
    setBlogAnchorEl(null);
  };

  const handleResourcesMenuClose = () => {
    setResourcesAnchorEl(null);
  };

  const handleRegulatoryMenuClose = () => {
    setRegulatoryAnchorEl(null);
  };



  const handleNotificationMenuOpen = (event) => {
    setUserNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationMenuClose = () => {
    setUserNotificationAnchorEl(null);
    setVisibleNotificationsCount(5);
  };
  const handleUserMenuOpen = (event) => {
    // Toggle: if already open, close it; otherwise open it
    if (userMenuAnchorEl) {
      setUserMenuAnchorEl(null);
    } else {
      setUserMenuAnchorEl(event.currentTarget);
    }
  };
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear(); // Clears all items from local storage
    handleUserMenuClose();
    navigate("/");
  };

  const handleResetPassword = () => {
    handleUserMenuClose();
    navigate("/reset-password");
  };

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  const handleMarkAsRead = async (id, type) => {
    try {
      const response = await API.NotificationAPI.markAsRead(id);
      if (response.data.status === "Success") {
        setNotifications(
          notifications.map((notif) =>
            notif.id === id ? { ...notif, status: "read" } : notif
          )
        );
        if (type === "loan") {
          navigate("/loan-tracker");
          handleNotificationMenuClose();
        }
      } else {
        console.error(
          "Error marking notification as read:",
          response.data.message
        );
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await API.NotificationAPI.markAllAsRead(customerId);
      if (response.data.status === "Success") {
        setNotifications(
          notifications.map((notif) => ({ ...notif, status: "read" }))
        );
      } else {
        console.error(
          "Error marking all notifications as read:",
          response.data.message
        );
      }
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };
  const unreadCount = notifications.filter(
    (notif) => notif.status !== "read"
  ).length;
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMouseOut = () => {
    setAnchorEl(null);
  };
  const handleViewMore = () => {
    setVisibleNotificationsCount((prevCount) => prevCount + 5);
  };

  const sortedNotifications = [...notifications]
    .filter((notif) => notif.status !== "read")
    .sort((a, b) => {
      const dateComparison = new Date(b.createdAt) - new Date(a.createdAt);

      if (dateComparison === 0) {
        if (a.status === b.status) return 0;
        return a.status === "read" ? 1 : -1;
      }

      return dateComparison;
    });

  const displayedNotifications = sortedNotifications.slice(
    0,
    visibleNotificationsCount
  );

  const groupedDisplayedNotifications = groupNotificationsByDate(
    displayedNotifications
  );

  const sortedDisplayedDates = Object.keys(groupedDisplayedNotifications).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  useEffect(() => {
    if (customerId) {
      API.NotificationAPI.getNotification(customerId)
        .then(({ data: res }) => {
          if (res.status === "Success") {
            setNotifications(res.data.rows);
          }
        })
        .catch((err) => console.log(err, "Appbar Notification Error"));
    }
  }, [customerId]);

  const drawerWidth = 200;
  const DrawerHeader = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    padding: "5px",
    justifyContent: "flex-end",
  }));

  const marqueeScroll = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  `;

  const MarqueeItem = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 4, whiteSpace: 'nowrap' }}>
      <Typography sx={{ color: '#fff', fontSize: { xs: '0.65rem', md: '0.8rem' }, fontWeight: 500, fontFamily: 'Poppins', whiteSpace: 'nowrap' }}>
        As seen On
      </Typography>
      <Typography sx={{ color: '#00d2ff', fontSize: { xs: '0.65rem', md: '0.8rem' }, fontWeight: 700, fontFamily: 'Poppins', whiteSpace: 'nowrap' }}>
        SHARK TANK
      </Typography>
      <Typography sx={{ color: '#ffcc00', fontSize: { xs: '0.65rem', md: '0.8rem' }, fontWeight: 700, fontFamily: 'Poppins', whiteSpace: 'nowrap' }}>
        INDIA
      </Typography>
      <Typography sx={{ color: '#fff', fontSize: { xs: '0.65rem', md: '0.8rem' }, fontWeight: 500, fontFamily: 'Poppins', whiteSpace: 'nowrap' }}>
        Season - 05
      </Typography>
    </Box>
  );

  const theme = useTheme();
  const isIpadPro = useMediaQuery(
    "only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)"
  );
  return (
    <>
      {/* SHARK TANK MARQUEE */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#020b13",
          overflow: "hidden",
          py: .4,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: 'flex',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            animation: `${marqueeScroll} 30s linear infinite`,
            "&:hover": {
              animationPlayState: "paused",
            },
          }}
        >
          {[...Array(10)].map((_, i) => (
            <MarqueeItem key={i} />
          ))}
        </Box>
      </Box>

      <Box component="nav" role="navigation" sx={{ display: "flex", height: { xs: "60px", sm: "70px", md: "80px" }, overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#eaf4f4",
            color: theme.palette.primary.main,
          }}
        >
          {/* LOGO */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexShrink: 0,
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
              }}
            >
              <Link to="/">
                <img
                  src="/f2Fintechlogo-old.webp"
                  alt="Logo"
                  style={{
                    height: isIpadPro ? "60px" : isMobile ? "60px" : "90px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </Link>
            </Toolbar>
          </Box>

          {/* SHOW ON MOBILE  */}
          <Drawer
            sx={{
              width: isIpadPro ? 220 : drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: isIpadPro ? 320 : drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#eaf4f4",
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <IconButton sx={{ color: "#000" }} onClick={toggleDrawer(false)} aria-label="close drawer">
                <ChevronRightIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Button
              href="/about-us"
              sx={{
                height: "40px",
                textTransform: "none",
                color: "#000",
                fontSize: isIpadPro ? "1.2rem" : { xs: "0.95rem", sm: "1.1rem" },
                fontFamily: "Poppins",
                justifyContent: "flex-start",
              }}
            >
              About Us
            </Button>
            <Button
              aria-controls={anchorEl ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={anchorEl ? handleMenuClose : handleMenuOpen}
              endIcon={
                isMobile && !Boolean(anchorEl) ? (
                  <ChevronRightIcon />
                ) : (
                  <ArrowDropDownIcon />
                )
              }
              sx={{
                height: "40px",
                textTransform: "none",
                color: "#000",
                fontSize: isIpadPro ? "1.2rem" : { xs: "0.95rem", sm: "1.1rem" },
                fontFamily: "Poppins",
                justifyContent: "flex-start",
              }}
            >
              Products
            </Button>
            {Boolean(anchorEl) && (
              <List
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "100 !important",
                }}
              >
                {products.map((product, index) => (
                  <ListItem key={product.title} disablePadding>
                    <ListItemButton href={product.href}>
                      <ListItemText
                        primary={product.title}
                        primaryTypographyProps={{
                          style: {
                            fontSize: isIpadPro ? "1.1rem" : "0.9rem",
                            fontWeight: "100",
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}

            <Button
              aria-controls={resourcesAnchorEl ? "resources-menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={resourcesAnchorEl ? handleResourcesMenuClose : handleResourcesMenuOpen}
              endIcon={
                isMobile && !Boolean(resourcesAnchorEl) ? (
                  <ChevronRightIcon />
                ) : (
                  <ArrowDropDownIcon />
                )
              }
              sx={{
                height: "40px",
                textTransform: "none",
                color: "#000",
                fontSize: isIpadPro ? "1.2rem" : { xs: "0.95rem", sm: "1.1rem" },
                fontFamily: "Poppins",
                justifyContent: "flex-start",
              }}
            >
              Resources
            </Button>
            {Boolean(resourcesAnchorEl) && (
              <List
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "100 !important",
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton href="/blogs">
                    <ListItemText
                      primary="Blogs"
                      primaryTypographyProps={{
                        style: {
                          fontSize: isIpadPro ? "1.1rem" : "0.9rem",
                          fontWeight: "100",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="/eligibility-checker">
                    <ListItemText
                      primary="Eligibility Checker"
                      primaryTypographyProps={{
                        style: {
                          fontSize: isIpadPro ? "1.1rem" : "0.9rem",
                          fontWeight: "100",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            )}

            <Button
              aria-controls={b2bAnchorEl ? "b2b-menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={b2bAnchorEl ? handleB2bMenuClose : handleB2bMenuOpen}
              endIcon={
                isMobile && !Boolean(b2bAnchorEl) ? (
                  <ChevronRightIcon />
                ) : (
                  <ArrowDropDownIcon />
                )
              }
              sx={{
                height: "40px",
                textTransform: "none",
                color: "#000",
                fontSize: isIpadPro ? "1.2rem" : { xs: "0.95rem", sm: "1.1rem" },
                fontFamily: "Poppins",
                justifyContent: "flex-start",
              }}
            >
              B2B
            </Button>
            {Boolean(b2bAnchorEl) && (
              <List
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "100 !important",
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton href="/realtor">
                    <ListItemText
                      primary="Realtor"
                      primaryTypographyProps={{
                        style: {
                          fontSize: isIpadPro ? "1.1rem" : "0.9rem",
                          fontWeight: "100",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="/dsa">
                    <ListItemText
                      primary="Channel Partner/Broker"
                      primaryTypographyProps={{
                        style: {
                          fontSize: isIpadPro ? "1.1rem" : "0.9rem",
                          fontWeight: "100",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            )}

            <Button
              aria-controls={regulatoryAnchorEl ? "regulatory-menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={regulatoryAnchorEl ? handleRegulatoryMenuClose : handleRegulatoryMenuOpen}
              endIcon={
                isMobile && !Boolean(regulatoryAnchorEl) ? (
                  <ChevronRightIcon />
                ) : (
                  <ArrowDropDownIcon />
                )
              }
              sx={{
                height: "40px",
                textTransform: "none",
                color: "#000",
                fontSize: isIpadPro ? "1.2rem" : { xs: "0.95rem", sm: "1.1rem" },
                fontFamily: "Poppins",
                justifyContent: "flex-start",
              }}
            >
              Regulatory
            </Button>
            {Boolean(regulatoryAnchorEl) && (
              <List
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "100 !important",
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton href="/compliance">
                    <ListItemText
                      primary="Compliance"
                      primaryTypographyProps={{
                        style: {
                          fontSize: isIpadPro ? "1.1rem" : "0.9rem",
                          fontWeight: "100",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="/fair-practices-code">
                    <ListItemText
                      primary="Fair Practices Code"
                      primaryTypographyProps={{
                        style: {
                          fontSize: isIpadPro ? "1.1rem" : "0.9rem",
                          fontWeight: "100",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="/grievance-policy">
                    <ListItemText
                      primary="Grievance Policy"
                      primaryTypographyProps={{
                        style: {
                          fontSize: isIpadPro ? "1.1rem" : "0.9rem",
                          fontWeight: "100",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="/privacy-policy">
                    <ListItemText
                      primary="Privacy Policy"
                      primaryTypographyProps={{
                        style: {
                          fontSize: isIpadPro ? "1.1rem" : "0.9rem",
                          fontWeight: "100",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="/terms-and-condition">
                    <ListItemText
                      primary="Terms and Condition"
                      primaryTypographyProps={{
                        style: {
                          fontSize: isIpadPro ? "1.1rem" : "0.9rem",
                          fontWeight: "100",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            )}


            {pages.map((page) => {
              if (page.title === "Login" && username) {
                return (
                  <div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={username}
                  >
                    <Button
                      onClick={
                        Boolean(userMenuAnchorEl)
                          ? handleUserMenuClose
                          : handleUserMenuOpen
                      }
                      endIcon={
                        isMobile && !Boolean(userMenuAnchorEl) ? (
                          <ChevronRightIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      }
                      sx={{
                        height: "40px",
                        textTransform: "none",
                        fontSize: isIpadPro ? "1.2rem" : { xs: "0.95rem", sm: "1.1rem" },
                        borderRadius: "22px",
                        marginRight: "10px",
                        justifyContent: "flex-start",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {username
                        .split(" ")
                        .map((n) => n[0])
                        .join(".")}
                    </Button>
                    {Boolean(userMenuAnchorEl) && (
                      <List>
                        {[
                          "Profile",
                          "Favourites",
                          "Loan Tracker",
                          "Reset Password",
                          "Logout",
                        ].map((text, index) => (
                          <ListItem key={text} disablePadding>
                            <ListItemButton
                              onClick={() => {
                                if (text === "Logout") {
                                  handleLogout();
                                } else {
                                  const path = `/${text
                                    .toLowerCase()
                                    .split(" ")
                                    .join("-")}`;
                                  navigate(path);
                                  setOpen(false);
                                }
                              }}
                            >
                              <ListItemText
                                primary={text}
                                primaryTypographyProps={{
                                  style: {
                                    fontSize: isIpadPro ? "1.1rem" : "inherit", // Adjusted font size for iPad Pro
                                  },
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </div>
                );
              }
              return (
                <Button
                  href={page.href}
                  key={page.title}
                  sx={{
                    height: "40px",
                    textTransform: "none",
                    fontSize: isIpadPro ? "1.2rem" : { xs: "0.95rem", sm: "1.1rem" },
                    color: "#000",
                    fontFamily: "Poppins",
                    justifyContent: "flex-start",
                  }}
                >
                  {page.title}
                </Button>
              );
            })}
          </Drawer>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            onClick={toggleDrawer(true)}
            aria-label="open drawer"
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              color: "#2c3ce3",
              marginLeft: "auto",
              marginRight: "4%",
            }}
          >
            <MenuIcon
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                },
              }}
            />{" "}
          </IconButton>

          {/* SHOW ON WEB */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: { md: "0.5%", lg: "2%" },
              gap: { md: "4px", lg: "12px", xl: "28px" },
              "& .MuiButton-root": {
                px: { md: "4px", lg: "12px", xl: "16px" },
                whiteSpace: "nowrap",
              },
            }}
          >
            {/* aboutus  button  */}
            <Button
              component={Link}
              to="/"
              onClick={topFunction}
              key={"web-home"}
              disableRipple
              sx={{
                fontSize: isIpadPro ? "1vw" : "0.95vw",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
                fontWeight: 400,
                backgroundColor: "transparent",
                "&:hover": {
                  transform: "scale(1.1)",
                  // background: "#000066",
                  transition: "all 300ms ease-in-out",
                  backgroundColor: "transparent !important",
                },
                "&:focus": {
                  backgroundColor: "transparent !important",
                },
                "&:active": {
                  backgroundColor: "transparent !important",
                },
              }}
            >
              {"Home"}
            </Button>

            <Button
              component={Link}
              to="/about-us"
              onClick={topFunction}
              disableRipple
              sx={{
                fontSize: isIpadPro ? "1vw" : "0.95vw",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
                fontWeight: 400,
                textTransform: "none",
                backgroundColor: "transparent",
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "all 300ms ease-in-out",
                  backgroundColor: "transparent !important",
                },
                "&:focus": {
                  backgroundColor: "transparent !important",
                },
                "&:active": {
                  backgroundColor: "transparent !important",
                },
                "&.MuiButton-root": {
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent !important",
                  },
                  "&:focus": {
                    backgroundColor: "transparent !important",
                  },
                  "&:active": {
                    backgroundColor: "transparent !important",
                  },
                },
              }}
            >
              About Us
            </Button>
            {/* Product button  */}
            <Button
              aria-controls={anchorEl ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={isTouch ? (anchorEl ? handleMenuClose : handleMenuOpen) : handleMenuOpen}
              onMouseEnter={isTouch ? undefined : (e) => openMenu(setAnchorEl, e)}
              onMouseLeave={isTouch ? undefined : () => closeMenu(setAnchorEl)}
              endIcon={<ArrowDropDownIcon />}
              disableRipple
              sx={{
                fontSize: isIpadPro ? "1vw" : "0.95vw",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
                fontWeight: 400,
                backgroundColor: "transparent",
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "all 300ms ease-in-out",
                  backgroundColor: "transparent !important",
                },
                "&:focus": {
                  backgroundColor: "transparent !important",
                },
                "&:active": {
                  backgroundColor: "transparent !important",
                },
                "&.MuiButton-root": {
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent !important",
                  },
                  "&:focus": {
                    backgroundColor: "transparent !important",
                  },
                  "&:active": {
                    backgroundColor: "transparent !important",
                  },
                },
              }}
            >
              Products
            </Button>
            {!isMobile && Boolean(anchorEl) && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                endIcon={<ArrowDropDownIcon />}
                MenuListProps={{
                  onMouseEnter: isTouch ? undefined : keepMenu,
                  onMouseLeave: isTouch ? undefined : () => closeMenu(setAnchorEl),
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                getContentAnchorEl={null}
                disableScrollLock={true}
                sx={{ pointerEvents: isTouch ? "auto" : "none" }}
                PaperProps={{
                  style: { pointerEvents: "auto" }
                }}
              >
                {products.map((product) => {
                  const isExternal = product.href.startsWith("http");
                  const LinkComponent = isExternal ? "a" : Link;
                  const linkProps = isExternal ? { href: product.href } : { to: product.href };
                  return (
                    <LinkComponent
                      key={product.title}
                      {...linkProps}
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={() => {
                        handleMenuClose();
                        topFunction();
                      }}
                    >
                      <MenuItem>
                        <Typography
                          sx={{
                            color: "black",
                            fontSize: isIpadPro ? "1.5vw" : "1vw",
                            lineHeight: "2vw",
                            fontFamily: "Poppins",
                          }}
                        >
                          {product.title}
                        </Typography>
                      </MenuItem>
                    </LinkComponent>
                  );
                })}
              </Menu>
            )}

            <Button
              aria-controls={resourcesAnchorEl ? "resources-menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={isTouch ? (resourcesAnchorEl ? handleResourcesMenuClose : handleResourcesMenuOpen) : handleResourcesMenuOpen}
              onMouseEnter={isTouch ? undefined : (e) => openMenu(setResourcesAnchorEl, e)}
              onMouseLeave={isTouch ? undefined : () => closeMenu(setResourcesAnchorEl)}
              endIcon={<ArrowDropDownIcon />}
              disableRipple
              sx={{
                fontSize: isIpadPro ? "1vw" : "0.95vw",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
                fontWeight: 400,
                backgroundColor: "transparent",
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "all 300ms ease-in-out",
                  backgroundColor: "transparent !important",
                },
                "&:focus": {
                  backgroundColor: "transparent !important",
                },
                "&:active": {
                  backgroundColor: "transparent !important",
                },
                "&.MuiButton-root": {
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent !important",
                  },
                  "&:focus": {
                    backgroundColor: "transparent !important",
                  },
                  "&:active": {
                    backgroundColor: "transparent !important",
                  },
                },
              }}
            >
              Resources
            </Button>
            {!isMobile && Boolean(resourcesAnchorEl) && (
              <Menu
                id="resources-menu-appbar"
                anchorEl={resourcesAnchorEl}
                open={Boolean(resourcesAnchorEl)}
                onClose={handleResourcesMenuClose}
                MenuListProps={{
                  onMouseEnter: isTouch ? undefined : keepMenu,
                  onMouseLeave: isTouch ? undefined : () => closeMenu(setResourcesAnchorEl),
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                getContentAnchorEl={null}
                disableScrollLock={true}
                sx={{ pointerEvents: isTouch ? "auto" : "none" }}
                PaperProps={{
                  style: { pointerEvents: "auto" }
                }}
              >
                <Link
                  to="/blogs"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => {
                    handleResourcesMenuClose();
                    topFunction();
                  }}
                >
                  <MenuItem>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: isIpadPro ? "1.5vw" : "1vw",
                        lineHeight: "2vw",
                        fontFamily: "Poppins",
                      }}
                    >
                      Blogs
                    </Typography>
                  </MenuItem>
                </Link>
                <Link
                  to="/eligibility-checker"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => {
                    handleResourcesMenuClose();
                    topFunction();
                  }}
                >
                  <MenuItem>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: isIpadPro ? "1.5vw" : "1vw",
                        lineHeight: "2vw",
                        fontFamily: "Poppins",
                      }}
                    >
                      Eligibility Checker
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
            )}
            {/* B2B button */}
            <Button
              aria-controls={b2bAnchorEl ? "b2b-menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={isTouch ? (b2bAnchorEl ? handleB2bMenuClose : handleB2bMenuOpen) : handleB2bMenuOpen}
              onMouseEnter={isTouch ? undefined : (e) => openMenu(setB2bAnchorEl, e)}
              onMouseLeave={isTouch ? undefined : () => closeMenu(setB2bAnchorEl)}
              endIcon={<ArrowDropDownIcon />}
              disableRipple
              sx={{
                fontSize: isIpadPro ? "1vw" : "0.95vw",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
                fontWeight: 400,
                backgroundColor: "transparent",
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "all 300ms ease-in-out",
                  backgroundColor: "transparent !important",
                },
                "&:focus": { backgroundColor: "transparent !important" },
                "&:active": { backgroundColor: "transparent !important" },
                "&.MuiButton-root": {
                  backgroundColor: "transparent",
                  "&:hover": { backgroundColor: "transparent !important" },
                  "&:focus": { backgroundColor: "transparent !important" },
                  "&:active": { backgroundColor: "transparent !important" },
                },
              }}
            >
              B2B
            </Button>
            {!isMobile && Boolean(b2bAnchorEl) && (
              <Menu
                id="b2b-menu-appbar"
                anchorEl={b2bAnchorEl}
                open={Boolean(b2bAnchorEl)}
                onClose={handleB2bMenuClose}
                MenuListProps={{
                  onMouseEnter: isTouch ? undefined : keepMenu,
                  onMouseLeave: isTouch ? undefined : () => closeMenu(setB2bAnchorEl),
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                getContentAnchorEl={null}
                disableScrollLock={true}
                sx={{ pointerEvents: isTouch ? "auto" : "none" }}
                PaperProps={{ style: { pointerEvents: "auto" } }}
              >
                <Link
                  to="/realtor"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => { handleB2bMenuClose(); topFunction(); }}
                >
                  <MenuItem>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: isIpadPro ? "1.5vw" : "1vw",
                        lineHeight: "2vw",
                        fontFamily: "Poppins",
                      }}
                    >
                      Realtor
                    </Typography>
                  </MenuItem>
                </Link>
                <Link
                  to="/dsa"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => { handleB2bMenuClose(); topFunction(); }}
                >
                  <MenuItem>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: isIpadPro ? "1.5vw" : "1vw",
                        lineHeight: "2vw",
                        fontFamily: "Poppins",
                      }}
                    >
                      Channel Partner/Broker
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
            )}
            <Button
              aria-controls={regulatoryAnchorEl ? "regulatory-menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={isTouch ? (regulatoryAnchorEl ? handleRegulatoryMenuClose : handleRegulatoryMenuOpen) : handleRegulatoryMenuOpen}
              onMouseEnter={isTouch ? undefined : (e) => openMenu(setRegulatoryAnchorEl, e)}
              onMouseLeave={isTouch ? undefined : () => closeMenu(setRegulatoryAnchorEl)}
              endIcon={<ArrowDropDownIcon />}
              disableRipple
              sx={{
                fontSize: isIpadPro ? "1vw" : "0.95vw",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
                fontWeight: 400,
                backgroundColor: "transparent",
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "all 300ms ease-in-out",
                  backgroundColor: "transparent !important",
                },
                "&:focus": {
                  backgroundColor: "transparent !important",
                },
                "&:active": {
                  backgroundColor: "transparent !important",
                },
                "&.MuiButton-root": {
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent !important",
                  },
                  "&:focus": {
                    backgroundColor: "transparent !important",
                  },
                  "&:active": {
                    backgroundColor: "transparent !important",
                  },
                },
              }}
            >
              Regulatory
            </Button>
            {!isMobile && Boolean(regulatoryAnchorEl) && (
              <Menu
                id="regulatory-menu-appbar"
                anchorEl={regulatoryAnchorEl}
                open={Boolean(regulatoryAnchorEl)}
                onClose={handleRegulatoryMenuClose}
                MenuListProps={{
                  onMouseEnter: isTouch ? undefined : keepMenu,
                  onMouseLeave: isTouch ? undefined : () => closeMenu(setRegulatoryAnchorEl),
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                getContentAnchorEl={null}
                disableScrollLock={true}
                sx={{ pointerEvents: isTouch ? "auto" : "none" }}
                PaperProps={{
                  style: { pointerEvents: "auto" }
                }}
              >
                <Link
                  to="/compliance"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => {
                    handleRegulatoryMenuClose();
                    topFunction();
                  }}
                >
                  <MenuItem>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: isIpadPro ? "1.5vw" : "1vw",
                        lineHeight: "2vw",
                        fontFamily: "Poppins",
                      }}
                    >
                      Compliance
                    </Typography>
                  </MenuItem>
                </Link>
                <Link
                  to="/fair-practices-code"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => {
                    handleRegulatoryMenuClose();
                    topFunction();
                  }}
                >
                  <MenuItem>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: isIpadPro ? "1.5vw" : "1vw",
                        lineHeight: "2vw",
                        fontFamily: "Poppins",
                      }}
                    >
                      Fair Practices Code
                    </Typography>
                  </MenuItem>
                </Link>
                <Link
                  to="/grievance-policy"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => {
                    handleRegulatoryMenuClose();
                    topFunction();
                  }}
                >
                  <MenuItem>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: isIpadPro ? "1.5vw" : "1vw",
                        lineHeight: "2vw",
                        fontFamily: "Poppins",
                      }}
                    >
                      Grievance Policy
                    </Typography>
                  </MenuItem>
                </Link>
                <Link
                  to="/privacy-policy"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => {
                    handleRegulatoryMenuClose();
                    topFunction();
                  }}
                >
                  <MenuItem>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: isIpadPro ? "1.5vw" : "1vw",
                        lineHeight: "2vw",
                        fontFamily: "Poppins",
                      }}
                    >
                      Privacy Policy
                    </Typography>
                  </MenuItem>
                </Link>
                <Link
                  to="/terms-and-condition"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => {
                    handleRegulatoryMenuClose();
                    topFunction();
                  }}
                >
                  <MenuItem>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: isIpadPro ? "1.5vw" : "1vw",
                        lineHeight: "2vw",
                        fontFamily: "Poppins",
                      }}
                    >
                      Terms and Condition
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
            )}
            {!isMobile &&
              pages.map((page) => {
                if (page.title === "Login" && username) {
                  return (
                    <div key={username}>
                      <Button
                        onClick={handleUserMenuOpen}
                        endIcon={<ArrowDropDownIcon />}
                        sx={{
                          fontSize: isIpadPro ? "1vw" : "1vw",
                          color: theme.palette.text.primary,
                          fontFamily: "Poppins",
                          fontWeight: 400,
                          ":hover": {
                            transform: "scale(1.1)",
                            transition: "all 300ms ease-in-out",
                          },
                        }}
                      >
                        {username
                          .split(" ")
                          .map((n) => n[0])
                          .join(".")}
                      </Button>
                      {userMenuAnchorEl &&
                        <Menu
                          id="user-menu-appbar"
                          anchorEl={userMenuAnchorEl}
                          open={Boolean(userMenuAnchorEl)}
                          onClose={handleUserMenuClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          disableScrollLock={true}
                          sx={{
                            "& .MuiPaper-root": {
                              backgroundColor: "black",
                            },
                          }}
                        >
                          <MenuItem
                            sx={{
                              color: theme.palette.primary.main,
                              fontFamily: "Poppins",
                              fontSize: "1.2vw",
                              lineHeight: "2vw",
                            }}
                            onClick={() => {
                              handleUserMenuClose();
                              navigate("/profile");
                            }}
                          >
                            Profile
                          </MenuItem>
                          <MenuItem
                            sx={{
                              color: theme.palette.primary.main,
                              fontFamily: "Poppins",
                              fontSize: "1.2vw",
                              lineHeight: "2vw",
                            }}
                            onClick={() => {
                              handleUserMenuClose();
                              navigate("/favourites");
                            }}
                          >
                            Favourites
                          </MenuItem>
                          <MenuItem
                            sx={{
                              color: theme.palette.primary.main,
                              fontFamily: "Poppins",
                              fontSize: "1.2vw",
                              lineHeight: "2vw",
                            }}
                            onClick={() => {
                              handleUserMenuClose();
                              navigate("/loan-tracker");
                            }}
                          >
                            Loan Tracker
                          </MenuItem>
                          <MenuItem
                            sx={{
                              color: theme.palette.primary.main,
                              fontFamily: "Poppins",
                              fontSize: "1.2vw",
                              lineHeight: "2vw",
                            }}
                            onClick={handleResetPassword}
                          >
                            Reset password
                          </MenuItem>
                          <MenuItem
                            sx={{
                              color: theme.palette.primary.main,
                              fontFamily: "Poppins",
                              fontSize: "1.2vw",
                              lineHeight: "2vw",
                            }}
                            onClick={handleLogout}
                          >
                            Logout
                          </MenuItem>
                        </Menu>
                      }
                      {/* Notification systum */}
                      <Button
                        onClick={handleNotificationMenuOpen}
                        aria-label="notifications menu"
                        sx={{
                          height: "40px",
                          textTransform: "none",
                          fontSize: "1.3rem",
                          borderRadius: "22px",
                          marginLeft: { md: "2px", lg: "10px" },
                          color: "var(--brand-blue)",
                          ":hover": {
                            transform: "scale(1.1)",
                            background: "gray",
                            transition: "all 300ms ease-in-out",
                          },
                        }}
                      >
                        <Badge badgeContent={unreadCount} color="primary">
                          <NotificationsIcon />
                        </Badge>
                      </Button>
                      <Menu
                        id="user-menu-appbar"
                        anchorEl={userNotificationAnchorEl}
                        open={Boolean(userNotificationAnchorEl)}
                        onClose={handleNotificationMenuClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        PaperProps={{
                          style: {
                            maxHeight: "400px",
                            width: "400px",
                            backgroundColor: "white",
                            color: "white",
                            fontFamily: "Poppins",
                          },
                        }}
                        getContentAnchorEl={null}
                        disableScrollLock={true}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          sx={{
                            p: 2,
                            borderBottom: "1px solid #e0e0e0",
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={"500"}
                            component="div"
                            fontFamily={"Poppins"}
                            color="black"
                          >
                            Notifications
                          </Typography>
                          <Button
                            onClick={handleMarkAllAsRead}
                            size="small"
                            disabled={unreadCount === 0}
                            sx={{
                              "&.Mui-disabled": {
                                backgroundColor: "white",
                                color: "var(--brand-blue)",
                              },
                            }}
                          >
                            Mark all as read
                          </Button>
                        </Box>

                        {sortedDisplayedDates.length === 0 ? (
                          <MenuItem disabled>
                            <Typography
                              sx={{
                                color: "red",
                              }}
                              variant="body2"
                            >
                              No notifications
                            </Typography>
                          </MenuItem>
                        ) : (
                          sortedDisplayedDates.map((date) => (
                            <div key={date}>
                              <Typography
                                sx={{
                                  px: 2,
                                  py: 1,
                                  fontWeight: "bold",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                {date}
                              </Typography>
                              {groupedDisplayedNotifications[date].map(
                                (notification, index) => (
                                  <MenuItem
                                    key={notification.id}
                                    onClick={() =>
                                      handleMarkAsRead(
                                        notification.id,
                                        notification.type
                                      )
                                    }
                                    sx={{
                                      color: "black",
                                      fontSize: "14px",
                                      py: 1,
                                      backgroundColor:
                                        notification.status === "read"
                                          ? "rgba(0, 0, 0, 0.05)"
                                          : "",
                                      borderBottom:
                                        index < notifications.length - 1
                                          ? "1px solid #f0f0f0"
                                          : "none",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Avatar>
                                      {username
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join(".")}
                                    </Avatar>
                                    <Typography
                                      variant="body2"
                                      marginLeft={1}
                                      sx={{
                                        mr: 2,
                                        flexGrow: 1,
                                        color:
                                          notification.status === "read"
                                            ? "rgba(0, 0, 0, 0.46)"
                                            : "",
                                      }}
                                    >
                                      {notification.message}
                                    </Typography>
                                    <IconButton
                                      size="small"
                                      aria-label="mark as read"
                                      disabled={notification.status === "read"}
                                    >
                                      <CircleIcon
                                        sx={{ fontSize: "10px" }}
                                        color={
                                          notification.status === "read"
                                            ? "disabled"
                                            : "warning"
                                        }
                                      />
                                    </IconButton>
                                  </MenuItem>
                                )
                              )}
                            </div>
                          ))
                        )}

                        {visibleNotificationsCount <
                          sortedNotifications.length && (
                            <Box textAlign="center" p={1}>
                              <Button size="small" onClick={handleViewMore}>
                                View More
                              </Button>
                            </Box>
                          )}
                      </Menu>
                    </div>
                  );
                }
                return (
                  <Button
                    href={page.href}
                    key={page.title}
                    disableRipple={page.title === "Lending Partners"}
                    sx={{
                      height: "35px",
                      textTransform: "none",
                      fontSize: isIpadPro ? "1vw" : "1vw",

                      borderRadius: "22px",
                      marginLeft: { md: "2px", lg: "10px" },
                      backgroundColor: "transparent",
                      border:
                        page.title === "Lending Partners"
                          ? "none"
                          : ".12rem solid blue",
                      color:
                        page.title === "Lending Partners"
                          ? theme.palette.text.primary
                          : "black",
                      fontFamily: "Poppins",
                      ":hover": {
                        ...(page.title === "Lending Partners"
                          ? {
                            backgroundColor: "transparent !important",
                            color: "black",
                            transform: "scale(1.1)",
                            transition: "all 300ms ease-in-out",
                          }
                          : {
                            backgroundColor: "var(--brand-blue)",
                            color: "#fff",
                          }),
                      },
                      "&:focus": page.title === "Lending Partners" ? {
                        backgroundColor: "transparent !important",
                      } : {},
                      "&:active": page.title === "Lending Partners" ? {
                        backgroundColor: "transparent !important",
                      } : {},
                    }}
                  >
                    {page.title}
                  </Button>
                );
              })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

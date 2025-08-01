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

import { pages, products, blogs } from "../../data/Data";
import { Utility } from "../utility";
import API from "../../apis";

export default function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [blogAnchorEl, setBlogAnchorEl] = React.useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [userNotificationAnchorEl, setUserNotificationAnchorEl] =
    useState(null);
  const [notifications, setNotifications] = useState([]);
  const [visibleNotificationsCount, setVisibleNotificationsCount] = useState(5);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state) => () => setOpen(state);

  const location = useLocation();
  const { getLocalStorage, remLocalStorage, groupNotificationsByDate } =
    Utility();
  const customer = getLocalStorage("customerInfo");
  const username = customer?.name;
  const customerId = customer?.id;
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleBlogMenuOpen = (event) => {
    setBlogAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    handleMenuClose();
    setBlogAnchorEl(null);
  }, [location]);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBlogMenuClose = () => {
    setBlogAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setUserNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationMenuClose = () => {
    setUserNotificationAnchorEl(null);
    setVisibleNotificationsCount(5);
  };
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
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

  const theme = useTheme();

  return (
    <>
      <Box sx={{ display: "flex", height: "12vh", overflowX: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.main,
          }}
        >
          {/* LOGO */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              // marginLeft: "2%",
              width: "50%",
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
              }}
            >
              <Link to="/">
                <img
                  src="f2Fintechlogo-old.png"
                  alt="Logo"
                  style={{
                    height: isMobile ? "12vh" : "auto",
                    width: isMobile ? "auto" : "7.5vw",
                  }}
                />
              </Link>
            </Toolbar>
          </Box>

          {/* SHOW ON MOBILE  */}
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "white",
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <IconButton sx={{ color: "#000" }} onClick={toggleDrawer(false)}>
                <ChevronRightIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Button
              href={"/about-us"}
              key={"aboutus"}
              sx={{
                height: "40px",
                textTransform: "none",
                fontSize: "3vw",
                color: "#000",
                fontFamily: "Poppins",
                justifyContent: "flex-start",
              }}
            >
              {"About Us"}
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
                fontSize: "3vw",
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
                  fontWeight: "100 !important", // You can adjust this value if needed
                }}
              >
                {products.map((product, index) => (
                  <ListItem key={product.title} disablePadding>
                    <ListItemButton href={product.href}>
                      <ListItemText
                        primary={product.title}
                        primaryTypographyProps={{
                          style: { fontSize: "2.5vw", fontWeight: "100" },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
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
                    {/* Notification system start */}
                    {/* <Button
                    onClick={handleNotificationMenuOpen}
                    color="inherit"
                    sx={{
                      height: "40px",
                      textTransform: "none",
                      fontSize: "1.3rem",
                      borderRadius: "22px",
                      marginLeft: "10px",
                      color: "white",
                      ":hover": {
                        transform: "scale(1.1)",
                        background: "#0A0A0A",
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
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      style: {
                        maxHeight: "400px",
                        width: "400px",
                        backgroundColor: "black",
                        color: "white",
                        fontFamily: "Poppins",
                      },
                    }}
                    getContentAnchorEl={null}
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
                        backgroundColor: "#000000",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={"500"}
                        component="div"
                        fontFamily={"Poppins"}
                        color="white"
                      >
                        Notifications
                      </Typography>
                      <Button
                        onClick={handleMarkAllAsRead}
                        size="small"
                        disabled={unreadCount === 0}
                        sx={{
                          "&.Mui-disabled": {
                            backgroundColor: "black", // Example disabled background color
                            color: "white", // Example disabled text color
                          },
                        }}
                      >
                        Mark all as read
                      </Button>
                    </Box>

                    {sortedDisplayedDates.length === 0 ? (
                      <MenuItem disabled>
                        <Typography variant="body2">
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

                    {visibleNotificationsCount < sortedNotifications.length && (
                      <Box textAlign="center" p={1}>
                        <Button size="small" onClick={handleViewMore}>
                          View More
                        </Button>
                      </Box>
                    )}
                  </Menu> */}
                    {/* Notification system end */}
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
                        fontSize: "3vw",
                        borderRadius: "22px",
                        // marginLeft: "10px",
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
                              onClick={
                                text === "Logout" ? () => handleLogout() : null
                              }
                              href={
                                text !== "Logout"
                                  ? `/${text
                                      .toLowerCase()
                                      .split(" ")
                                      .join("-")}`
                                  : "#"
                              }
                            >
                              <ListItemText primary={text} />
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
                    fontSize: "3vw",
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
            sx={{
              display: {
                xs: "flex",
                md: "none",
                color: "#2c3ce3",
              },
              marginRight: {
                xs: "140px",
                sm: "10px",
              },
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
            {/* Adjust this value to change icon size */}
          </IconButton>

          {/* SHOW ON WEB */}
          <Box
            sx={{
              width: "120%",
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: "2%",
              // gap: 5,
            }}
          >
            {/* aboutus  button  */}

            <Button
              href={"/about-us"}
              key={"aboutus"}
              sx={{
                fontSize: "1vw",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
                fontWeight: 500,
                ":hover": {
                  transform: "scale(1.1)",
                  // background: "#000066",
                  transition: "all 300ms ease-in-out",
                },
              }}
            >
              {"About Us"}
            </Button>
            {/* Product button  */}
            <Button
              aria-controls={anchorEl ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                fontSize: "1vw",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
                fontWeight: 500,
                ":hover": {
                  transform: "scale(1.1)",
                  // background: "#000066",
                  transition: "all 300ms ease-in-out",
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
                MenuListProps={{ onMouseLeave: handleMenuClose }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                getContentAnchorEl={null}
              >
                {products.map((product) => (
                  <Link
                    key={product.title}
                    to={product.href}
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
                          fontSize: "1vw",
                          lineHeight: "2vw",
                          fontFamily: "Poppins",
                        }}
                      >
                        {product.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            )}
            <Button
              aria-controls={blogAnchorEl ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleBlogMenuOpen}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                fontSize: "1vw",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
                fontWeight: 500,
                ":hover": {
                  transform: "scale(1.1)",
                  // background: "#000066",
                  transition: "all 300ms ease-in-out",
                },
              }}
            >
              Blogs
            </Button>
            {!isMobile && Boolean(blogAnchorEl) && (
              <Menu
                id="menu-appbar"
                anchorEl={blogAnchorEl}
                open={Boolean(blogAnchorEl)}
                onClose={handleBlogMenuClose}
                endIcon={<ArrowDropDownIcon />}
                MenuListProps={{ onMouseLeave: handleBlogMenuClose }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                getContentAnchorEl={null}
              >
                {blogs.map((blog) => (
                  <Link
                    key={blog.title}
                    to={blog.href}
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => {
                      setBlogAnchorEl(null);
                      handleBlogMenuClose();
                      topFunction();
                    }}
                  >
                    <MenuItem>
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "1vw",
                          lineHeight: "2vw",
                          fontFamily: "Poppins",
                        }}
                      >
                        {blog.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            )}
            <Tooltip title="Explore our more products" arrow>
              <Button
                href={"/our-products"}
                key={"aboutus"}
                sx={{
                  fontSize: "1vw",
                  color: theme.palette.text.primary,
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  ":hover": {
                    transform: "scale(1.1)",
                    // background: "#000066",
                    transition: "all 300ms ease-in-out",
                  },
                }}
              >
                {"SAAS Products"}
              </Button>
            </Tooltip>
            {!isMobile &&
              pages.map((page) => {
                if (page.title === "Login" && username) {
                  return (
                    <div key={username}>
                      <Button
                        onClick={handleUserMenuOpen}
                        endIcon={<ArrowDropDownIcon />}
                        sx={{
                          fontSize: "1vw",
                          color: theme.palette.text.primary,
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          ":hover": {
                            transform: "scale(1.1)",
                            // background: "#000066",
                            transition: "all 300ms ease-in-out",
                          },
                        }}
                      >
                        {username
                          .split(" ")
                          .map((n) => n[0])
                          .join(".")}
                      </Button>
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
                        getContentAnchorEl={null}
                        sx={{
                          // backgroundColor: "black", // Dropdown ka background color black
                          "& .MuiPaper-root": {
                            backgroundColor: "black", // Ensuring the paper inside menu is black
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
                          component="a"
                          href="/profile"
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
                          component="a"
                          href="/favourites"
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
                          component="a"
                          href="/loan-tracker"
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
                      {/* Notification systum */}
                      <Button
                        onClick={handleNotificationMenuOpen}
                        sx={{
                          height: "40px",
                          textTransform: "none",
                          fontSize: "1.3rem",
                          borderRadius: "22px",
                          marginLeft: "10px",
                          color: "#2f3ee3",
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
                          vertical: "bottom",
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
                            backgroundColor: "black",
                            color: "white",
                            fontFamily: "Poppins",
                          },
                        }}
                        getContentAnchorEl={null}
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
                            backgroundColor: "#000000",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={"500"}
                            component="div"
                            fontFamily={"Poppins"}
                            color={theme.palette.text.primary}
                          >
                            Notifications
                          </Typography>
                          <Button
                            onClick={handleMarkAllAsRead}
                            size="small"
                            disabled={unreadCount === 0}
                            sx={{
                              "&.Mui-disabled": {
                                backgroundColor: "black", // Example disabled background color
                                color: "white", // Example disabled text color
                              },
                            }}
                          >
                            Mark all as read
                          </Button>
                        </Box>

                        {sortedDisplayedDates.length === 0 ? (
                          <MenuItem disabled>
                            <Typography variant="body2">
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
                    sx={{
                      height: "35px",
                      textTransform: "none",
                      fontSize: "1vw",
                      borderRadius: "22px",
                      marginLeft: "10px",
                      backgroundColor: "transparent",
                      border: "1px solid blue",
                      color: theme.palette.text.primary,
                      fontFamily: "Poppins",
                      ":hover": {
                        backgroundColor: "#3244e6",
                        color: "white",
                      },
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

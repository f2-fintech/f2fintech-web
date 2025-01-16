import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {
  MenuItem,
  Menu,
  Typography,
  Box,
  Badge,
  IconButton,
  Avatar,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CircleIcon from "@mui/icons-material/Circle";

import { pages, products } from "../../data/Data";
import { Utility } from "../utility";
import API from "../../apis";

export default function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [userNotificationAnchorEl, setUserNotificationAnchorEl] =
    useState(null);
  const [notifications, setNotifications] = useState([]);
  const [visibleNotificationsCount, setVisibleNotificationsCount] = useState(5);
  const navigate = useNavigate();
  const { getLocalStorage, remLocalStorage, groupNotificationsByDate } =
    Utility();
  const customer = getLocalStorage("customerInfo");
  const username = customer?.name;
  const customerId = customer?.id;
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
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

  console.log("Notifications", notifications);

  return (
    <Box sx={{ display: "flex", height: "12vh" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "2%",
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
                src="f2Fintechlogo.png"
                alt="Logo"
                style={{
                  height: "auto",
                  width: "15vh",
                }}
              />
            </Link>
          </Toolbar>
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "2%",
          }}
        >
          <Button
            href={"/aboutus"}
            key={"aboutus"}
            color="inherit"
            sx={{
              height: "40px",
              textTransform: "none",
              fontSize: "1.2vw",
              borderRadius: "22px",
              marginLeft: "10px",
              color: "white",
              fontFamily: "Poppins",
              ":hover": {
                transform: "scale(1.1)",
                // background: "#000066",
                transition: "all 300ms ease-in-out",
              },
            }}
          >
            {"About Us"}
          </Button>
          <Button
            color="inherit"
            aria-controls={anchorEl ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            endIcon={<ArrowDropDownIcon />}
            sx={{
              height: "40px",
              textTransform: "none",
              color: "white",
              fontSize: "1.2vw",
              lineHeight: "2vw",
              fontFamily: "Poppins",
              ":hover": {
                transform: "scale(1.1)",
                // background: "#000066",
                color: "white",
                transition: "all 300ms ease-in-out",
              },
            }}
          >
            Products
          </Button>
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
          {pages.map((page) => {
            if (page.title === "Login" && username) {
              return (
                <div key={username}>
                  <Button
                    onClick={handleUserMenuOpen}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                      height: "40px",
                      textTransform: "none",
                      fontSize: "1.2vw",
                      borderRadius: "22px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      color: "white",
                      ":hover": {
                        transform: "scale(1.1)",
                        background: "#000066",
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
                  >
                    <MenuItem
                      sx={{
                        color: "black",
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
                        color: "black",
                        fontSize: "1vw",
                        lineHeight: "2vw",
                      }}
                      component="a"
                      href="/customer-favourites"
                    >
                      Favourite
                    </MenuItem>
                    <MenuItem
                      sx={{
                        color: "black",
                        fontSize: "1vw",
                        lineHeight: "2vw",
                      }}
                      component="a"
                      href="/loan-tracker"
                    >
                      Loan Tracking
                    </MenuItem>
                    <MenuItem
                      sx={{
                        color: "black",
                        fontSize: "1vw",
                        lineHeight: "2vw",
                      }}
                      onClick={handleResetPassword}
                    >
                      Reset password
                    </MenuItem>
                    <MenuItem
                      sx={{
                        color: "black",
                        fontSize: "1vw",
                        lineHeight: "2vw",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                  <Button
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
                        background: "#000066",
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
                      style: { maxHeight: "400px", width: "400px" },
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
                        backgroundColor: "white",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={"bold"}
                        component="div"
                      >
                        Notifications
                      </Typography>
                      <Button
                        onClick={handleMarkAllAsRead}
                        size="small"
                        disabled={unreadCount === 0}
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
                  </Menu>
                </div>
              );
            }
            return (
              <Button
                href={page.href}
                key={page.title}
                color="inherit"
                sx={{
                  height: "40px",
                  textTransform: "none",
                  fontSize: "1.2vw",
                  borderRadius: "22px",
                  marginLeft: "10px",
                  color: "white",
                  fontFamily: "Poppins",
                  ":hover": {
                    transform: "scale(1.1)",
                    // background: "#000066",
                    transition: "all 300ms ease-in-out",
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
  );
}

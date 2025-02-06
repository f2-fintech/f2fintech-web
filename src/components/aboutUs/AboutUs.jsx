"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CardContent,
  CardActions,
  Card,
  CardMedia,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";
import SpotlightText from "./SpotlightText";
import Faq from "../faq/Faq";
import LightScroll from "./LightScroll";

const ImageCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "300px",
  cursor: "pointer",
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  alignItems: "center",
  fontFamily: "Poppins",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  color: "white",
}));

const YearButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  "&.active": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

// Sample data
const portfolioItems = [
  {
    id: 1,
    year: "2021",
    title: "TEAM CELEBRETION",
    image: "/abt9.jpg",
  },
  {
    id: 2,
    year: "2021",
    title: "HOLI CELEBRETION",
    image: "/abt2.jpg",
  },
  {
    id: 3,
    year: "2021",
    title: "WOMEN'S DAY",

    image: "/abt5.jpg",
  },
  {
    id: 4,
    year: "2023",
    title: "GRAND OPENING",
    image: "/abt1.jpeg",
  },
  {
    id: 5,
    year: "2023",
    title: "REPUBLIC DAY",
    image: "/abt3.jpeg",
  },
  {
    id: 6,
    year: "2023",
    title: "INDEPENDENCE DAY",
    image: "/abt6.jpg",
  },
  {
    id: 7,
    year: "2022",
    title: "BLIND INPOWERMENT",
    image: "/abt4.jpeg",
  },
  {
    id: 8,
    year: "2022",
    title: "TEAM BUILDING",
    image: "/abt7.jpeg",
  },
  {
    id: 9,
    year: "2022",
    title: "ANNUAL MEATING",
    image: "/abt8.jpeg",
  },
];

const years = ["2024", "2023", "2022", "2021"];

export default function AboutUsPage() {
  const [hover, setHover] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [inView, setInView] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    if (boxRef.current) {
      observer.observe(boxRef.current);
    }
    return () => {
      if (boxRef.current) observer.unobserve(boxRef.current);
    };
  }, []);
  const blogPosts = [
    {
      id: 1,
      title: "A guide to acquiring loans for non-listed companies",
      date: "Sat, March 20",
      image: "/loan11.webp",
      link: "#",
    },
    {
      id: 2,
      title: "keep in mind while applying for a personal loan",
      date: "Sat, March 20",
      image: "/loan2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "How To Apply For A  Personal Loan these step ",
      date: "Sat, March 20",
      image: "/loan1.webp",
      link: "#",
    },
  ];
  const [isHovered, setIsHovered] = useState(false);
  const awards = [
    {
      title: "Bajaj Finserv Award",
      image: "/awardceremony.jpg",
      description:
        "Receiving the esteemed Bajaj Finserv Award marks a pinnacle moment in F2Fintech's journey, illuminating our path.",
    },
    {
      title: "Entrepreneur of the Year",
      image: "/enterpreneur.jpg",
      description:
        "October 15, 2022,honored with the prestigious 'Entrepreneur of the Year (Financial Service)' award at the MSME India Business Awards.",
    },
    {
      title: "MSME Award",
      image: "/award(2).jpg",
      description:
        "Empowering F2 Fintech to innovate, bridging gap between financial services and cutting-edge technology, earning us the prestigious MSME Award.",
    },
  ];

  const portfolioFilter =
    selectedYear === "2024"
      ? portfolioItems
      : portfolioItems.filter((item) => item.year === selectedYear);

  return (
    <Box sx={{ bgcolor: "#000000", height: "100%" }}>
      {/* Main Content */}
      <Container sx={{}} maxWidth="xl">
        <Grid container spacing={4} sx={{ pt: { xs: 4, md: 8 } }}>
          {/* Left Side Content */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                mt: { xs: 4, md: 8 },
                marginLeft: { xs: "1rem", md: "3rem" },
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.3rem",
                  fontFamily: "Poppins",
                  fontWeight: 550,
                  mb: 2,
                  letterSpacing: 1,
                }}
              >
                F2fintech
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "3.2rem" }, // Adjust font size for mobile
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.2,
                  letterSpacing: 1.5,
                  fontFamily: "DM sans",
                  maxWidth: { xs: "100%", md: "90%" }, // Adjust width for better fit
                }}
              >
                We are a Global Electronic Marketplace for
                <span style={{ color: "#FFD700" }}> Buying & Selling </span>
                loans.
              </Typography>
            </Box>
          </Grid>

          {/* Right Side Content - Image Centered on Mobile & Tablet */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" }, // Center image on mobile, right-align on desktop
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="/loanabtt.gif"
              alt="Creative designers"
              sx={{
                width: "100%",
                maxWidth: { xs: 250, md: 400 }, // Adjust image size for responsiveness
                height: "auto",
              }}
            />
          </Grid>

          {/* Video Section */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: { xs: "none", md: "block" }, // Hide on small screens, show on md+
              }}
            >
              <video
                autoPlay
                loop
                muted
                style={{
                  height: "60vh",
                  width: "100%",
                }}
              >
                <source src="/Delegate.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            lineHeight: "4rem",
            fontSize: {
              md: "2.6vw",
              sm: "6vw",
              xs: "6vw",
            },
            fontWeight: "550",
            fontFamily: "DM sans",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Who we
          <span style={{ color: "#50C878", marginLeft: ".7rem" }}>Are</span>
        </Typography>
        <LightScroll width="40%" />
      </Box>
      <Box>
        <Typography
          sx={{
            color: "#ffffff",
            display: "flex",
            fontSize: {
              md: "2.6vw",
              sm: "6vw",
              xs: "6vw",
            },
            fontWeight: "550",
            fontFamily: "DM sans",
            justifyContent: "center",
          }}
        >
          Meet our{" "}
          <span style={{ color: "#FFD700", marginLeft: ".6rem" }}>
            {" "}
            Founders
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          height: { xs: "auto", sm: "auto", md: "121vh" },
          width: "auto",
          backgroundColor: "#000000",
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          justifyContent: "center",
          marginTop: { xs: "4vh", sm: "6vh", md: "8vh" },
          gap: { xs: "20px", sm: "25px", md: "30px" },
          alignItems: "center",
          padding: { xs: "10px", sm: "15px", md: "0px" },
        }}
      >
        <Card
          sx={{
            maxWidth: { xs: "90%", sm: "70%", md: 360 },
            backgroundColor: "black",
            height: { xs: "auto", sm: "auto", md: "110vh" },
            boxShadow: "0 0  5px #FFD700",
            transition: { md: "transform 0.3s ease-in-out" }, // Transition only on desktop
            "&:hover": {
              transform: { md: "scale(1.03)" }, // Disable hover effect on mobile/tablet
            },
          }}
        >
          <CardMedia
            sx={{
              height: { xs: "40vh", sm: "50vh", md: "58vh" },
            }}
            image="/harpreetimg.jpg"
            title="Harpreet img"
          />
          <CardContent>
            <Typography
              sx={{
                color: "#FFD700",
                fontSize: { xs: "2.5vh", sm: "3vh" },
                fontWeight: "550",
                fontFamily: "DM sans",
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Harpreet Singh
            </Typography>
            <Typography
              sx={{
                color: "#AAAAAA",
                fontFamily: "DM sans",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Founder & Chief Executive Officers
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: "DM sans",
                textAlign: "justify",
                fontWeight: "300",
                marginTop: "1rem",
                fontSize: { xs: "2vh", sm: "2.2vh", md: "2.5vh" },
              }}
            >
              Harpreet Singh, a Chartered Accountant by training, has carved a
              niche in the financial services industry through his strategic
              foresight and leadership...
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: { xs: "90%", sm: "70%", md: 360 },
            backgroundColor: "black",
            height: { xs: "auto", sm: "auto", md: "110vh" },
            boxShadow: "0 0  5px #FFD700",
            transition: { md: "transform 0.3s ease-in-out" }, // Transition only on desktop
            "&:hover": {
              transform: { md: "scale(1.03)" }, // Disable hover effect on mobile/tablet
            },
          }}
        >
          <CardMedia
            sx={{
              height: { xs: "40vh", sm: "50vh", md: "58vh" },
            }}
            image="/abhinavimg.jpg"
            title="Abhinav img"
          />
          <CardContent>
            <Typography
              sx={{
                color: "#FFD700",
                fontSize: { xs: "2.5vh", sm: "3vh" },
                fontWeight: "550",
                fontFamily: "DM sans",
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Abhinav Awal
            </Typography>
            <Typography
              sx={{
                color: "#AAAAAA",
                fontFamily: "DM sans",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Co-Founder & Managing Director
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: "DM sans",
                textAlign: "justify",
                fontWeight: "300",
                marginTop: "1rem",
                fontSize: { xs: "2vh", sm: "2.2vh", md: "2.5vh" },
              }}
            >
              Abhinav’s journey from a business administration graduate to a
              co-founder of F2 Fintech is a testament to his adaptability and
              keen business acumen...
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Box>
      <Box sx={{ py: 8, px: 2 }}>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            color: "#ffffff",
            mb: 2,
            fontFamily: "Poppins",
            fontSize: "2.5vh",
            fontWeight: 500,
          }}
        >
          OUR VALUES
        </Typography>

        <Typography
          variant="h3"
          align="center"
          sx={{
            color: "#ffffff",
            mb: 6,
            fontSize: {
              md: "2.6vw",
              sm: "6vw",
              xs: "6vw",
            },
            fontWeight: "550",
            fontFamily: "DM sans",
          }}
        >
          Speak Volumes Through Every
          <span style={{ color: "#FFD700" }}> Award Captured </span>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" }, // Stack vertically on mobile/tablet, row on desktop
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 4, sm: 4, md: 6 }, // Add space between awards
            width: "100%", // Full width for mobile and tab
          }}
        >
          {awards.map((award, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "none",
                  width: { xs: "65vw", sm: "80vw", md: "20vw" }, // Full width on mobile/tablet, fixed on desktop
                  backgroundColor: "#100D0D",
                  alignItems: "center",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <CardMedia
                  component="img"
                  image={award.image}
                  alt={award.title}
                  sx={{
                    height: 240,
                    objectFit: "cover",
                    borderRadius: 1,
                    transition: { md: "transform 0.3s ease" }, // Transition only on desktop
                    "&:hover": {
                      transform: { md: "scale(1.15)" }, // Disable hover effect on mobile/tablet
                    },
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    textAlign: "center",
                    px: 2,
                    backgroundColor: "#100D0D",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "#FFD700",
                      fontFamily: "Poppins",
                      fontWeight: 410,
                      fontSize: {
                        xs: "3.5vw",
                        sm: "3vw",
                        md: "default",
                      },
                      mb: 2,
                    }}
                  >
                    {award.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#ffffff",
                      fontFamily: "DM sans",
                      lineHeight: 1.6,
                      fontSize: {
                        xs: "3vw",
                        sm: "2.8",
                        md: "default",
                      },
                    }}
                  >
                    {award.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            mb: 2,
            mt: -6,
            color: "#ffffff",
            fontSize: {
              md: "2.6vw",
              sm: "6vw",
              xs: "6vw",
            },
            fontWeight: "550",
            fontFamily: "DM sans",
          }}
        >
          Check our latest <span style={{ color: "#50C878" }}> work</span>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          {years.map((year) => (
            <YearButton
              style={{
                border: "1px solid #FFD700",
                backgroundColor:
                  selectedYear === year ? "#FFD700" : "transparent",
                color: selectedYear === year ? "#000000" : "#ffffff",
                fontFamily: "Poppins",
              }}
              key={year}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </YearButton>
          ))}
        </Box>

        <Grid container spacing={3}>
          {portfolioFilter.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ImageCard>
                <CardMedia
                  component="img"
                  height="300"
                  image={item.image}
                  alt={item.title}
                />
                <ImageOverlay className="overlay">
                  <Typography
                    sx={{ fontFamily: "Poppins" }}
                    variant="h6"
                    component="div"
                    align="center"
                  >
                    {item.title}
                  </Typography>
                </ImageOverlay>
              </ImageCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Faq />
      {/* Last only about  */}
      {/* <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="subtitle1"
            component="p"
            color="primary"
            gutterBottom
            sx={{
              textTransform: "uppercase",
              fontFamily: "DM sans",
              fontSize: "2vw",
              fontWeight: "450",
              color: "#FFD700",
            }}
          >
            BLOG
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            color="primary"
            sx={{
              fontWeight: "450",
              color: "white",
              fontFamily: "Poppins",
              fontSize: "2vw",
            }}
          >
            Recent posts from <span style={{ color: "#FFD700" }}>our Blog</span>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item xs={12} md={4} key={post.id}>
              <Card
                sx={{
                  height: "75vh",
                  display: "flex",
                  width: "24vw",
                  flexDirection: "column",
                  boxShadow: "none",
                  backgroundColor: "#100D0D",
                }}
              >
                <CardMedia
                  component="img"
                  height={250}
                  image={post.image}
                  alt={post.title}
                  sx={{
                    borderRadius: 1,
                    transition: "transform 0.3s ease-in-out", // Smooth transition effect
                    "&:hover": {
                      transform: "scale(1.1) rotate(5deg)", // Zoom and tilt effect on hover
                    },
                  }}
                />

                <CardContent sx={{ flexGrow: 1, px: 0 }}>
                  <Typography
                    sx={{
                      marginLeft: "0.5rem",
                      fontFamily: "Poppins",
                      fontWeight: "400",
                    }}
                    variant="subtitle2"
                    color="#ffffff"
                    gutterBottom
                  >
                    {post.date}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: "0.5rem",
                      fontSize: "1.10rem",
                      color: "white",
                      fontWeight: "450",
                      fontFamily: "Poppins",
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Box
                    href="#"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Poppins",
                      fontWeight: "340",
                      color: "#FFD700",
                      marginTop: "15vh",
                      marginLeft: "0.8rem",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    Read More
                    <ArrowForwardIcon
                      sx={{
                        fontSize: 18,
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                        transform: hover ? "translateX(20px)" : "translateX(0)",
                        opacity: hover ? 0 : 1,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container> */}
    </Box>
  );
}

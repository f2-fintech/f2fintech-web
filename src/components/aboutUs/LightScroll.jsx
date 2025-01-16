import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const LightScroll = (props) => {
  const textRef = useRef(null);
  const [highlightedLineIndex, setHighlightedLineIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);
          if (entry.isIntersecting) {
            setHighlightedLineIndex(index); // Highlight the line in viewport
          }
        });
      },
      { threshold: 0.9 } // Trigger when 50% of the element is visible
    );

    const lines = textRef.current.querySelectorAll(".line");
    lines.forEach((line) => observer.observe(line));

    return () => {
      lines.forEach((line) => observer.unobserve(line)); // Cleanup observer
    };
  }, []);

  const text = `We're F2Fintech, the one-stop destination for easing the loan process in
  India. We help you navigate the complex world of finance.
  We have you covered, regardless of the type of loan you require.
  We carefully consider your specific scenario to ensure you get the best possible offer.
  And here's something to be proud of since our inception, we've made over 11,000 clients happy.`;

  const lines = text.split("\n");

  return (
    <Box
      style={{
        margin: "0 auto",
        width: props.width || "80%",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "black",
        padding: "40px",
      }}
    >
      <Typography
        sx={{
          position: "relative",
          color: "rgba(255, 255, 255, 0.2)",
          textShadow: "0 0 5px rgba(255, 255, 255, 0.3)",
          fontFamily: "DM Sans",
          lineHeight: "55px",
          letterSpacing: "0.05rem",
          fontWeight: "600",
          fontSize: "2.7vw",
          textAlign: "center",
        }}
        ref={textRef}
      >
        {lines.map((line, index) => (
          <span
            key={index}
            className="line"
            data-index={index}
            style={{
              display: "block",
              opacity: highlightedLineIndex === index ? 1 : 0.3,
              transition: "opacity 0.5s ease-out, text-shadow 0.5s ease-out",
              background: highlightedLineIndex === index
                ? "transparent"
                : "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: highlightedLineIndex === index
                ? "#ffffff"
                : "rgba(255, 255, 255, 0.2)",
              // textShadow: highlightedLineIndex === index
              //   ? "0 0 10px rgba(255, 255, 255, 0.7)"
              //   : "0 0 3px rgba(255, 255, 255, 0.3)",
            }}
          >
            {line}
          </span>
        ))}
      </Typography>
    </Box>
  );
};

export default LightScroll;

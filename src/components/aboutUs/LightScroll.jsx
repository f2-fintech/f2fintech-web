import React from "react";

export const LightScroll = ({ width = "80%" }) => {
  const text = `F2Fintech connects you to the best loans, cards, and investments fast. We compare options from top lenders, build plans that match your goals, and deliver real results without the hassle. Thousands of Indians; from small businesses to everyday hustlers, rely on us to simplify finance and grow smarter.`;

  const lines = text.split("\n").filter((line) => line.trim());

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "clamp(16px, 5vw, 40px) clamp(12px, 4vw, 32px)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          width: "min(90%, 1200px)",
          textAlign: "center",
          maxWidth: width || "800px",
        }}
      >
        {lines.map((line, index) => (
          <p
            key={index}
            style={{
              fontSize: "clamp(18px, 4vw, 28px)",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              lineHeight: "1.4",
              color: "#3244e6",
              marginBottom: "clamp(12px, 3vw, 24px)",
              marginTop: index === 0 ? "0" : "clamp(12px, 3vw, 24px)",
              padding: "0 clamp(8px, 2vw, 16px)",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {line.trim()}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LightScroll;

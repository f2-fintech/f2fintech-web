import React from "react";

const LightScroll = ({ width = "80%" }) => {
  const text = `We're F2 Fintech, the one-stop destination for easing the loan process in India.
We help you navigate the complex world of finance.
We have you covered, regardless of the type of loan you require.
We carefully consider your specific scenario to ensure you get the best possible offer.
And here's something to be proud of since our inception, we've made over 11,000 clients happy.`;

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

export default function App() {
  return <LightScroll />;
}

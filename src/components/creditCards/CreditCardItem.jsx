import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function CreditCardItem({ card, onApply, onViewDetails }) {
  if (!card) return null;

  const topUsps = card.product_usps?.slice(0, 3) || [];
  const primaryTag = card.tags?.[0]?.name || card.card_type || "Credit Card";

  return (
    <div className="credit-card-card">
      {/* Top Header */}
      <div className="card-top-header">
        <span className="card-bank-badge">{card.bank_name || "Credit Card"}</span>
        <Chip
          label={primaryTag}
          size="small"
          sx={{
            backgroundColor: "#f1f5f9",
            color: "#475569",
            fontWeight: 600,
            fontSize: "0.72rem",
            fontFamily: "Poppins",
            height: "22px",
          }}
        />
      </div>

      {/* Card Visual / Artwork */}
      <div className="card-visual-wrapper">
        <img
          src={card.image || card.card_bg_image || "/card-placeholder.png"}
          alt={card.name}
          className="card-visual-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://d2sriifpjiqv0p.cloudfront.net/admin/BankKaro_20260622_122010_AGB_SBI_Cashback.png1732257446742";
          }}
        />
      </div>

      {/* Title */}
      <Typography className="card-title-text" component="h3">
        {card.name}
      </Typography>

      {/* Savings highlight if available */}
      {card.annual_saving && card.annual_saving !== "0" && (
        <Box
          sx={{
            mx: 2.5,
            mb: 1,
            px: 1.5,
            py: 0.6,
            borderRadius: "8px",
            backgroundColor: "#ecfdf5",
            border: "1px solid #d1fae5",
            display: "flex",
            alignItems: "center",
            gap: 0.8,
          }}
        >
          <MonetizationOnIcon sx={{ color: "#059669", fontSize: "1rem" }} />
          <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: "#065f46", fontFamily: "Poppins" }}>
            Save up to ₹{parseInt(card.annual_saving).toLocaleString("en-IN")}/yr
          </Typography>
        </Box>
      )}

      {/* Fee Strip */}
      <div className="card-fee-strip">
        <div className="card-fee-col">
          <div className="card-fee-label">Joining Fee</div>
          <div className="card-fee-value">
            {card.joining_fee_text === "0" || card.joining_fee_text === "Nil" || !card.joining_fee_text
              ? "Free"
              : `₹${card.joining_fee_text}`}
          </div>
        </div>
        <div className="card-fee-col">
          <div className="card-fee-label">Annual Fee</div>
          <div className="card-fee-value">
            {card.annual_fee_text === "0" || card.annual_fee_text === "Nil" || !card.annual_fee_text
              ? "Free"
              : `₹${card.annual_fee_text}`}
          </div>
        </div>
      </div>

      {/* USPs / Highlights */}
      <div className="card-usp-list">
        {topUsps.map((usp, idx) => (
          <div className="card-usp-item" key={idx}>
            <CheckCircleIcon sx={{ color: "#10b981", fontSize: "0.95rem", mt: "2px", flexShrink: 0 }} />
            <span>
              <strong>{usp.header}</strong>: {usp.description}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="card-actions-wrapper">
        <Button
          className="btn-card-details"
          onClick={() => onViewDetails(card)}
          disableRipple
        >
          Details
        </Button>
        <Button
          className="btn-card-apply"
          onClick={() => onApply(card)}
          endIcon={<ArrowForwardIcon sx={{ fontSize: "1rem !important" }} />}
          disableRipple
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
}

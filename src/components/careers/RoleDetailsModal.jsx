import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { X, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";

const RoleDetailsModal = ({ open, onClose, roleData, onJoinWaitlist }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !roleData) return null;

  return ReactDOM.createPortal(
    <div className="wl-modal-overlay" onClick={onClose}>
      <div
        className="wl-modal-container role-details-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "780px", width: "92%", padding: "36px 40px" }}
      >
        <button className="wl-modal-close" onClick={onClose} aria-label="Close details">
          <X size={18} />
        </button>

        <div className="wl-modal-header" style={{ marginBottom: "16px" }}>
          <div className="job-meta-pill" style={{ display: "inline-flex", marginBottom: "10px", background: "rgba(50, 68, 230, 0.08)", color: "var(--primary)", border: "1px solid rgba(50, 68, 230, 0.15)", padding: "4px 12px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: "700" }}>
            <Briefcase size={12} style={{ marginRight: "6px" }} />
            {roleData.deptLabel || "Career Path"}
          </div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--ink)", marginBottom: "4px" }}>
            {roleData.name}
          </h3>
        </div>

        <div className="role-details-content" style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "4px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary)", marginBottom: "8px" }}>
              Role Overview
            </h4>
            <p style={{ fontSize: "0.92rem", color: "var(--ink-muted)", lineHeight: "1.6", margin: 0 }}>
              {roleData.description || "No description available for this role yet."}
            </p>
          </div>

          {roleData.responsibilities && roleData.responsibilities.length > 0 && (
            <div>
              <h4 style={{ fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary)", marginBottom: "10px" }}>
                Key Responsibilities
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {roleData.responsibilities.map((resp, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.88rem", color: "var(--ink-muted)", lineHeight: "1.5" }}>
                    <CheckCircle2 size={16} style={{ color: "#10b981", flexShrink: 0, marginTop: "2px" }} />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="role-details-footer" style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button
            type="button"
            className="btn-details-close"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn-details-join"
            onClick={() => {
              onClose();
              onJoinWaitlist(roleData.deptKey, roleData.name);
            }}
          >
            Join Waitlist <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RoleDetailsModal;


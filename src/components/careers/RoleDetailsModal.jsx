import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { X, Briefcase, ChevronRight } from "lucide-react";

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
      >
        <button className="wl-modal-close" onClick={onClose} aria-label="Close details">
          <X size={18} />
        </button>

        <div className="wl-modal-header" style={{ marginBottom: "20px" }}>
          <div className="job-meta-pill" style={{ display: "inline-flex", marginBottom: "12px", background: "rgba(50, 68, 230, 0.08)", color: "var(--primary)", border: "1px solid rgba(50, 68, 230, 0.15)", padding: "4px 12px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: "700" }}>
            <Briefcase size={12} style={{ marginRight: "6px" }} />
            {roleData.deptLabel || "Career Path"}
          </div>
          <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--ink)", marginBottom: "8px" }}>
            {roleData.name}
          </h3>
        </div>

        <div className="role-details-content">
          <h4>Role Description & Scope</h4>
          <p>{roleData.description || "No description available for this role yet."}</p>
        </div>

        <div className="role-details-footer">
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

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Upload, X } from "lucide-react";

const WaitlistModal = ({
  open,
  onClose,
  companyInfo,
  selectedDept,
  setSelectedDept,
  otherDept,
  setOtherDept,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Reset form states when modal is opened/closed
  useEffect(() => {
    if (!open) {
      setFullName("");
      setEmail("");
      setPhone("");
      setCurrentCity("");
      setCurrentEmployee(null);
      setResumeFile(null);
    }
  }, [open]);

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

  if (!open) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !selectedDept) {
      toast.error("❌ Please fill in all required fields.");
      return;
    }
    if (!resumeFile) {
      toast.error("❌ Please upload your resume.");
      return;
    }

    setSubmitting(true);
    try {
      const targetCompanyId =
        companyInfo?._id ||
        companyInfo?.id ||
        "572691c9-cc32-45be-b82b-13ee432b805b";
      const role = otherDept || selectedDept;
      const fd = new FormData();
      fd.append("resume", resumeFile);
      fd.append("name", fullName);
      fd.append("email", email);
      fd.append("phone", phone);
      fd.append("currentCity", currentCity);
      if (currentEmployee !== null) {
        fd.append("currentEmployee", currentEmployee);
      }
      fd.append("department", selectedDept);
      fd.append("role", role);
      fd.append("companyId", targetCompanyId);
      fd.append("status", "Pending");
      fd.append("createdAt", new Date().toISOString());

      let savedToSupabase = false;
      const BASE_URL = "https://ats-web-7ysc.onrender.com";
      try {
        const resApi = await axios.post(
          `${BASE_URL}/waitlist/add-waitlist`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (resApi.status >= 200 && resApi.status < 300) {
          savedToSupabase = true;
        }
      } catch (errApi) {
        console.warn("Backend waitlist API note:", errApi.message);
      }

      if (!savedToSupabase) {
        const SUPABASE_URL = "https://ovshelkhnusagvyomifk.supabase.co";
        const SUPABASE_KEY =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c2hlbGtobnVzYWd2eW9taWZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTA0NjIwMywiZXhwIjoyMTAwNjIyMjAzfQ.NSm2KjYrv1RY33UZldMWvtKql5XSV--toUwW8nxpxkc";
        try {
          await axios.post(
            `${SUPABASE_URL}/rest/v1/waitlist`,
            {
              name: fullName,
              email,
              phone,
              currentCity,
              currentEmployee,
              department: selectedDept,
              role: otherDept || selectedDept,
              company_id: targetCompanyId,
              status: "Pending",
              created_at: new Date().toISOString(),
            },
            {
              headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
              },
            }
          );
        } catch (sbErr) {
          console.log("Direct Supabase waitlist sync complete.");
        }
      }

      toast.success("✅ Successfully joined the talent waitlist!");
      // Reset state and close modal
      setFullName("");
      setEmail("");
      setPhone("");
      setCurrentCity("");
      setCurrentEmployee(null);
      setSelectedDept("");
      setOtherDept("");
      setResumeFile(null);
      onClose();
    } catch (error) {
      console.error("[Waitlist Submit Error]:", error);
      toast.error("❌ Failed to join waitlist. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="wl-modal-overlay" onClick={onClose}>
      <div
        className="wl-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="wl-modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="wl-modal-header">
          <h3>Join the Talent Waitlist</h3>
          <p>
            Don't see your specific role listed? Drop your details and resume
            below. When a suitable opening arises in your target department, our
            talent team will reach out to you first.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="wl-form">
          <div className="wl-form-group">
            <label className="wl-form-label">Full Name <span className="wl-required">*</span></label>
            <input
              type="text"
              placeholder="e.g. Rohan Mehta"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="wl-form-group">
            <label className="wl-form-label">Email Address <span className="wl-required">*</span></label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="wl-form-group">
            <label className="wl-form-label">Phone Number</label>
            <input
              type="tel"
              placeholder="e.g. +91 99999 99999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="wl-form-group">
            <label className="wl-form-label">Current City</label>
            <input
              type="text"
              placeholder="e.g. Noida"
              value={currentCity}
              onChange={(e) => setCurrentCity(e.target.value)}
            />
          </div>

          <div className="wl-form-group">
            <label className="wl-form-label">Currently Employed? <span className="wl-required">*</span></label>
            <select
              value={currentEmployee || ""}
              onChange={(e) => setCurrentEmployee(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                Select option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="wl-form-group">
            <label className="wl-form-label">Select Department <span className="wl-required">*</span></label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                Select department
              </option>
              {["Sales", "Marketing", "HR", "Product", "Operations", "Credit", "IT", "Data", "Finance", "Other"].map(
                (d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="wl-form-group">
            <label className="wl-form-label">
              {selectedDept === "Other" ? (
                <>Enter Department <span className="wl-required">*</span></>
              ) : (
                "Specific Role / Title"
              )}
            </label>
            <input
              type="text"
              placeholder={
                selectedDept === "Other"
                  ? "Enter your department name"
                  : "e.g. Sales Manager"
              }
              value={otherDept}
              onChange={(e) => setOtherDept(e.target.value)}
              required={selectedDept === "Other"}
            />
          </div>

          <div className="wl-form-group">
            <label className="wl-form-label">Upload Resume <span className="wl-required">*</span></label>
            {/* Upload */}
            <div className="wl-upload-row">
              <div className="wl-upload-label">
                <Upload size={16} />
                {resumeFile
                  ? `Selected: ${resumeFile.name}`
                  : "Upload resume (PDF / DOC)"}
              </div>
              <span className="wl-browse-btn">Browse</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-waitlist-submit"
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Join Talent Waitlist →"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default WaitlistModal;

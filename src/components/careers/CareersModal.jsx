import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaBriefcase,
  FaClock,
  FaCommentDots,
  FaUserFriends,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaFileAlt,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaSeedling,
  FaLinkedin,
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
  FaCheck,
  FaPlus,
  FaTrash,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPlane
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

/* ─── STEP META ─── */
const STEPS = [
  { id: 1, label: "Personal Details", icon: <FaUser size={13} /> },
  { id: 2, label: "Work Experience", icon: <FaBriefcase size={13} /> },
  { id: 3, label: "Work Schedule", icon: <FaClock size={13} /> },
  { id: 4, label: "Tell Us More", icon: <FaCommentDots size={13} /> },
  { id: 5, label: "Referral", icon: <FaUserFriends size={13} /> },
  { id: 6, label: "Review", icon: <FaCheckCircle size={13} /> },
];

/* ─── SHARED FIELD ─── */
const Field = ({ label, req, error, hint, children }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <label style={{ fontSize: "0.78rem", fontWeight: 700, color: error ? "#ef4444" : "#374151", letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "Poppins,sans-serif" }}>
        {label}{req && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
      </label>
      {hint && <span style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "DM Sans,sans-serif" }}>{hint}</span>}
    </div>
    {children}
    {error && <p style={{ color: "#ef4444", fontSize: "0.72rem", marginTop: 5, fontFamily: "DM Sans,sans-serif", display: "flex", alignItems: "center", gap: 4 }}>⚠ {error}</p>}
  </div>
);

/* ─── INPUT ─── */
const Input = ({ id, type = "text", value, onChange, placeholder, focused, setFocused, error, maxLength }) => (
  <input
    id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength}
    onFocus={() => setFocused(id)} onBlur={() => setFocused("")}
    style={{
      width: "100%", padding: "12px 14px",
      border: `2px solid ${error ? "#fca5a5" : focused === id ? "#2335c9" : "#e5e7eb"}`,
      borderRadius: 12, background: focused === id ? "#fff" : "#f9fafb",
      color: "#111827", fontFamily: "DM Sans,sans-serif", fontSize: "0.9rem", fontWeight: 500,
      outline: "none", transition: "all 0.2s",
      boxShadow: focused === id ? "0 0 0 4px rgba(35, 53, 201,0.15)" : "none",
      boxSizing: "border-box",
    }}
  />
);

/* ─── SELECT ─── */
const Select = ({ value, onChange, focused, setFocused, id, error, children }) => (
  <select value={value} onChange={onChange}
    onFocus={() => setFocused && setFocused(id)} onBlur={() => setFocused && setFocused("")}
    style={{
      width: "100%", padding: "12px 14px",
      border: `2px solid ${error ? "#fca5a5" : focused === id ? "#2335c9" : "#e5e7eb"}`,
      borderRadius: 12, background: "#f9fafb",
      color: value ? "#111827" : "#9ca3af",
      fontFamily: "DM Sans,sans-serif", fontSize: "0.9rem", fontWeight: 500,
      outline: "none", transition: "all 0.2s", cursor: "pointer",
      boxShadow: focused === id ? "0 0 0 4px rgba(35, 53, 201,0.15)" : "none",
      appearance: "none", boxSizing: "border-box",
    }}
  >{children}</select>
);

/* ─── TEXTAREA ─── */
const Textarea = ({ id, value, onChange, placeholder, focused, setFocused, rows = 3 }) => (
  <textarea id={id} value={value} onChange={onChange} placeholder={placeholder} rows={rows}
    onFocus={() => setFocused && setFocused(id)} onBlur={() => setFocused && setFocused("")}
    style={{
      width: "100%", padding: "12px 14px",
      border: `2px solid ${focused === id ? "#2335c9" : "#e5e7eb"}`,
      borderRadius: 12, background: focused === id ? "#fff" : "#f9fafb",
      color: "#111827", fontFamily: "DM Sans,sans-serif", fontSize: "0.9rem",
      outline: "none", resize: "vertical", transition: "all 0.2s", minHeight: rows * 36,
      boxShadow: focused === id ? "0 0 0 4px rgba(35, 53, 201,0.15)" : "none",
      boxSizing: "border-box",
    }}
  />
);

/* ─── TOGGLE BUTTON ─── */
const ToggleBtn = ({ label, active, onClick }) => (
  <button type="button" onClick={onClick}
    style={{
      flex: 1, padding: "14px 18px", borderRadius: 14, cursor: "pointer",
      border: `2px solid ${active ? "#2335c9" : "#e5e7eb"}`,
      background: active ? "linear-gradient(135deg, #1e293b, #0f172a)" : "#f8fafc",
      color: active ? "#fff" : "#334155",
      fontWeight: 700, fontSize: "0.88rem", fontFamily: "Poppins, sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      transition: "all 0.2s", boxShadow: active ? "0 4px 14px rgba(30,41,59,0.25)" : "none",
    }}
  >
    {label}
  </button>
);

/* ════════════════════════════════════ MAIN ════════════════════════════════════ */
const CareersModal = ({ open, onClose, selectedJob, applicationStatuses, companyInfo }) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [dragOver, setDragOver] = useState(false);

  /* Step 1: Personal Details */
  const [prefix, setPrefix] = useState("Mr.");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [city, setCity] = useState("");
  const [relocate, setRelocate] = useState("");
  const [resume, setResume] = useState(null);
  const [certPlace, setCertPlace] = useState("");
  const [certSubject, setCertSubject] = useState("");
  const [certMarks, setCertMarks] = useState("");
  const [certFile, setCertFile] = useState(null);
  const [certDragOver, setCertDragOver] = useState(false);

  /* Step 2: Work Experience */
  const [hasExp, setHasExp] = useState(null); // true / false
  const [experiences, setExperiences] = useState([
    { id: 1, years: "", field: "", company: "", role: "", salary: "" }
  ]);

  /* Step 3: Work Schedule */
  const [shiftWilling, setShiftWilling] = useState(null); // true / false

  /* Step 4: Tell us more */
  const [whyJoin, setWhyJoin] = useState("");
  const [answers, setAnswers] = useState({});

  /* Step 5: Referral */
  const [hasReferral, setHasReferral] = useState(null); // true / false
  const [referralName, setReferralName] = useState("");
  const [referralDesignation, setReferralDesignation] = useState("");
  const [referralDepartment, setReferralDepartment] = useState("");
  const [referralCode, setReferralCode] = useState("");

  /* ── reset ── */
  useEffect(() => {
    if (!open) return;
    setStep(1); setSuccess(false); setErrors({}); setFocused("");
    setPrefix("Mr."); setName(""); setEmail(""); setPhone(""); setQualification(""); setCity(""); setRelocate(""); setResume(null);
    setCertPlace(""); setCertSubject(""); setCertMarks(""); setCertFile(null); setCertDragOver(false);
    setHasExp(null); setExperiences([{ id: 1, years: "", field: "", company: "", role: "", salary: "" }]);
    setShiftWilling(null);
    setWhyJoin(""); setAnswers({});
    setHasReferral(null); setReferralName(""); setReferralDesignation(""); setReferralDepartment(""); setReferralCode("");

    try {
      const c = JSON.parse(localStorage.getItem("customerInfo") || "{}");
      if (c.name) setName(c.name);
      if (c.email) setEmail(c.email);
      if (c.contact) setPhone(c.contact);
    } catch { }
  }, [open]);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => { const fn = e => e.key === "Escape" && onClose(); window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [onClose]);

  /* ── Multi-block Experience Handlers ── */
  const addExperienceBlock = () => {
    const nextId = experiences.length ? Math.max(...experiences.map(e => e.id)) + 1 : 1;
    setExperiences([...experiences, { id: nextId, years: "", field: "", company: "", role: "", salary: "" }]);
  };

  const removeExperienceBlock = (id) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const updateExperienceField = (id, field, value) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  /* ── validate ── */
  const validate = useCallback(() => {
    const e = {};
    if (step === 1) {
      if (!resume) e.resume = "Resume file required";
      if (!name.trim()) e.name = "Full name required";
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Valid email required";
      if (phone.replace(/\D/g, "").length !== 10) e.phone = "10-digit phone required";
      if (!qualification) e.qualification = "Highest qualification required";
      if (qualification === "Professional Certification (CFA, CA, etc.)") {
        if (!certPlace.trim()) e.certPlace = "Place of certificate required";
        if (!certSubject.trim()) e.certSubject = "Subject of certificate required";
        if (!certMarks.trim()) e.certMarks = "Marks obtained required";
        if (!certFile) e.certFile = "Certificate file required";
      }
      if (!city.trim()) e.city = "City required";
      if (!relocate) e.relocate = "Relocation preference required";
    }
    if (step === 2) {
      if (hasExp === null) e.hasExp = "Please indicate whether you have prior work experience";
      if (hasExp === true) {
        experiences.forEach((exp, idx) => {
          if (!exp.years) e[`exp_years_${exp.id}`] = "Required";
          if (!exp.field.trim()) e[`exp_field_${exp.id}`] = "Required";
          if (!exp.company?.trim()) e[`exp_company_${exp.id}`] = "Required";
          if (!exp.role.trim()) e[`exp_role_${exp.id}`] = "Required";
          if (!exp.salary.trim()) e[`exp_salary_${exp.id}`] = "Required";
        });
      }
    }
    if (step === 3) {
      if (shiftWilling === null) e.shiftWilling = "Please indicate if you are willing to work this shift structure";
    }
    if (step === 4) {
      const formQs = selectedJob?.applicationForm?.question || [];
      if (formQs.length > 0) {
        formQs.forEach((q, idx) => {
          if (!answers[idx] || !answers[idx].trim()) {
            e[`q_${idx}`] = "This question is required";
          }
        });
      }
    }
    if (step === 5) {
      if (hasReferral === null) e.hasReferral = "Please select whether you were referred";
      if (hasReferral === true) {
        if (!referralName.trim()) e.referralName = "Employee name required";
        if (!referralDesignation.trim()) e.referralDesignation = "Employee designation required";
        if (!referralDepartment) e.referralDepartment = "Employee department required";
      }
    }
    setErrors(e);
    return !Object.keys(e).length;
  }, [step, resume, name, email, phone, qualification, certPlace, certSubject, certMarks, certFile, city, relocate, hasExp, experiences, shiftWilling, answers, selectedJob, hasReferral, referralName, referralDesignation, referralDepartment, referralCode]);

  const [submitError, setSubmitError] = useState("");

  const next = () => { setSubmitError(""); if (validate()) setStep(s => Math.min(s + 1, 6)); };
  const back = () => { setSubmitError(""); setErrors({}); setStep(s => Math.max(s - 1, 1)); };

  /* ── submit ── */
  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    const targetCompanyId = companyInfo?._id || companyInfo?.id || (typeof selectedJob?.company_id === "object" ? selectedJob?.company_id?._id : selectedJob?.company_id) || "682858bb96c2ed0759146648";
    try {
      const baseURL = import.meta.env.VITE_ATS_BASE_URL || "https://ats-hhcw.onrender.com";
      let search;
      search = await axios.get(`${baseURL}/users/all-users?search=${email}`);

      let cid = search.data?.users?.[0]?._id || search.data?.users?.[0]?.id;
      if (!cid) {
        const fullCandidateName = `${prefix ? prefix + " " : ""}${name}`;
        const reg = await axios.post(`${baseURL}/auth/register`, {
          userName: fullCandidateName, email, password: import.meta.env.VITE_CANDIDATE_DEFAULT_PASS || "Password@123", gender: "Male",
          address: city || "N/A", role: "candidate", company_id: targetCompanyId
        });
        cid = reg.data.data;
      }
      const appliedStatus = (applicationStatuses || []).find(s => s.applicationStatus?.toLowerCase() === "applied" && (s.company_id === targetCompanyId || !s.company_id));

      const fullCandidateName = `${prefix ? prefix + " " : ""}${name}`;
      const fd = new FormData();
      fd.append("resume", resume);
      fd.append("jobID", selectedJob._id || selectedJob.id);
      fd.append("candidateID", cid);
      fd.append("applicationStatusId", appliedStatus?._id || appliedStatus?.id || "683d6e233722e19245a80cfe");
      fd.append("jobStatusId", selectedJob.status);
      fd.append("contactInfo", phone);
      fd.append("emailInfo", email);

      const expSummary = hasExp
        ? `Experienced. Details: ${experiences.map((exp, idx) => `[Block ${idx + 1}] ${exp.years} yrs in ${exp.field} at ${exp.company} as ${exp.role} (Salary: ${exp.salary})`).join(' | ')}`
        : "Fresher";
      fd.append("experience", expSummary);
      fd.append("fullName", fullCandidateName);
      fd.append("prefix", prefix);
      fd.append("qualification", qualification);
      if (qualification === "Professional Certification (CFA, CA, etc.)") {
        fd.append("certPlace", certPlace);
        fd.append("certSubject", certSubject);
        fd.append("certMarks", certMarks);
        if (certFile) {
          fd.append("certificate", certFile);
          fd.append("certFile", certFile);
        }
        fd.append("certificationDetails", JSON.stringify({
          place: certPlace,
          subject: certSubject,
          marks: certMarks,
          fileName: certFile?.name || ""
        }));
      }
      fd.append("city", city);
      fd.append("relocate", relocate);
      fd.append("hasExperience", hasExp ? "true" : "false");
      fd.append("experiences", JSON.stringify(experiences));
      fd.append("willingToWorkShift", shiftWilling ? "Yes, I'm willing" : "No, this doesn't work for me");
      fd.append("whyJoin", whyJoin);
      fd.append("hasReferral", hasReferral ? "true" : "false");
      fd.append("referralName", referralName);
      fd.append("referralDesignation", referralDesignation);
      fd.append("referralDepartment", referralDepartment);
      fd.append("referralCode", referralCode);
      fd.append("applicant_type", "Applied Directly");
      fd.append("company_id", targetCompanyId);

      const questionsList = selectedJob?.applicationForm?.question || [];
      fd.append("questions", JSON.stringify(questionsList));
      fd.append("answers", JSON.stringify(questionsList.map((_, i) => answers[i] || "")));

      const res = await axios.post(`${baseURL}/application/add-application`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      if (res.status === 200 || res.status === 201) setSuccess(true);
      else throw new Error("Submission failed");
    } catch (err) {
      console.error("Submit error:", err);
      const errMsg = err.response?.data?.message || err.response?.data?.error || err.message || "❌ Submission failed. Please try again.";
      setSubmitError(errMsg);
      toast.error(errMsg);
    } finally { setSubmitting(false); }
  };

  if (!open) return null;
  const qs = selectedJob?.applicationForm?.question || [];
  const fillPct = ((step - 1) / 5) * 100;
  const stepMeta = STEPS[step - 1];

  /* ──────────────────── LEFT PANEL ──────────────────── */
  const LeftPanel = () => (
    <div style={{
      width: 280, flexShrink: 0,
      background: "linear-gradient(160deg,#2335c9 0%,#1e2ead 50%,#1a28b0 100%)",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: "36px 28px", position: "relative", overflow: "hidden",
    }}>
      {/* blobs */}
      <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ position: "absolute", bottom: 60, left: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "0.88rem", fontFamily: "Poppins,sans-serif", border: "1px solid rgba(255,255,255,0.3)" }}>F2</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.85rem", fontFamily: "Poppins,sans-serif" }}>F2 Fintech</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.67rem", fontFamily: "DM Sans,sans-serif" }}>Pvt. Ltd.</div>
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", fontFamily: "Poppins,sans-serif", textTransform: "uppercase", marginBottom: 8 }}>Applying for</div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.15rem", fontFamily: "Poppins,sans-serif", lineHeight: 1.3, textTransform: "capitalize" }}>{selectedJob?.title || "Position"}</div>
          {selectedJob?.location && <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.75rem", fontFamily: "DM Sans,sans-serif", marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}><FaMapMarkerAlt size={12} /> {selectedJob.location}</div>}
          {selectedJob?.compensation && <div style={{ color: "#fff", fontSize: "0.82rem", fontFamily: "DM Sans,sans-serif", marginTop: 4, fontWeight: 700 }}>₹ {selectedJob.compensation}</div>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {STEPS.map((s) => {
            const done = s.id < step;
            const active = s.id === step;
            return (
              <div key={s.id} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12,
                background: active ? "rgba(255,255,255,0.22)" : "transparent",
                border: active ? "1px solid rgba(255,255,255,0.35)" : "1px solid transparent",
                transition: "all 0.2s",
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: done ? "#10b981" : active ? "#fff" : "rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.72rem", color: active ? "#2335c9" : "#fff", transition: "all 0.3s",
                }}>
                  {done ? <FaCheck size={10} color="#fff" /> : s.icon}
                </div>
                <span style={{ fontSize: "0.76rem", fontWeight: active ? 700 : 500, color: done ? "#6ee7b7" : active ? "#fff" : "rgba(255,255,255,0.8)", fontFamily: "DM Sans,sans-serif" }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", gap: 8, alignItems: "flex-start" }}>
          <FaLock size={13} color="#fff" style={{ marginTop: 2, flexShrink: 0 }} />
          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.72rem", fontFamily: "DM Sans,sans-serif", lineHeight: 1.6 }}>
            <strong>Your data is encrypted</strong> and shared only with F2 Fintech's hiring team.
          </div>
        </div>
      </div>
    </div>
  );

  /* ──────────────────── STEP 1: PERSONAL DETAILS ──────────────────── */
  const step1 = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ paddingBottom: 16, borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0f3ff", borderRadius: 20, padding: "4px 12px", marginBottom: 12 }}>
          <FaUser size={11} color="#2335c9" />
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2335c9", fontFamily: "Poppins,sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>Step 01 — Personal Details</span>
        </div>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#2335c9", fontFamily: "Poppins,sans-serif", margin: "0 0 6px", lineHeight: 1.25 }}>Let's start with the basics</h2>
        <p style={{ color: "#6b7280", fontSize: "0.85rem", fontFamily: "DM Sans,sans-serif", margin: 0, lineHeight: 1.65 }}>Tell us who you are and how we can reach you.</p>
      </div>

      {/* RESUME DROP ZONE */}
      <Field label="Upload Resume" req hint="PDF, DOCX, or RTF (Max 5MB)" error={errors.resume}>
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f && /\.(pdf|doc|docx|rtf)$/i.test(f.name)) setResume(f); }}
          onClick={() => document.getElementById("cv-input").click()}
          style={{
            border: `2px dashed ${errors.resume ? "#fca5a5" : resume ? "#10b981" : dragOver ? "#2335c9" : "#c3ceff"}`,
            borderRadius: 16, padding: "20px", textAlign: "center",
            cursor: "pointer", background: resume ? "#f0fdf4" : dragOver ? "#f0f3ff" : "#fafbff",
            transition: "all 0.25s",
          }}
        >
          <input type="file" id="cv-input" accept=".pdf,.doc,.docx,.rtf" style={{ display: "none" }}
            onChange={e => { if (e.target.files?.[0]) setResume(e.target.files[0]); }} />
          <div style={{ fontSize: "1.8rem", marginBottom: 6, display: "flex", justifyContent: "center" }}>
            {resume ? <FaCheckCircle color="#10b981" size={30} /> : <FaCloudUploadAlt color="#2335c9" size={32} />}
          </div>
          <p style={{ fontWeight: 700, fontFamily: "Poppins,sans-serif", fontSize: "0.88rem", color: resume ? "#059669" : "#2335c9", margin: "0 0 4px" }}>
            {resume ? resume.name : "Upload resume (Browse)"}
          </p>
          {!resume && <p style={{ color: "#9ca3af", fontSize: "0.73rem", fontFamily: "DM Sans,sans-serif", margin: 0 }}>PDF, DOCX, or RTF (Max 5MB)</p>}
        </div>
      </Field>

      {/* TITLE & FULL NAME */}
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 14 }}>
        <Field label="Title" req>
          <Select id="prefix" value={prefix} onChange={e => setPrefix(e.target.value)} focused={focused} setFocused={setFocused}>
            <option value="Mr.">Mr.</option>
            <option value="Miss">Miss</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Dr.">Dr.</option>
            <option value="Other">Other</option>
          </Select>
        </Field>
        <Field label="Full Name" req error={errors.name}>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Aisha Khan" focused={focused} setFocused={setFocused} error={errors.name} />
        </Field>
      </div>

      {/* EMAIL & PHONE */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Field label="Email Address" req error={errors.email}>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" focused={focused} setFocused={setFocused} error={errors.email} />
        </Field>
        <Field label="Phone Number" req error={errors.phone}>
          <Input id="phone" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="+91 00000 00000" focused={focused} setFocused={setFocused} error={errors.phone} maxLength={10} />
        </Field>
      </div>

      {/* HIGHEST QUALIFICATION */}
      <Field label="Highest Qualification" req error={errors.qualification}>
        <Select id="qualification" value={qualification} onChange={e => setQualification(e.target.value)} focused={focused} setFocused={setFocused} error={errors.qualification}>
          <option value="">Select your highest qualification</option>
          <option value="High School">High School</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
          <option value="MBA/PGBM">MBA/PGBM</option>
          <option value="Professional Certification (CFA, CA, etc.)">Professional Certification (CFA, CA, etc.)</option>
          <option value="Other">Other</option>
        </Select>
      </Field>

      {/* PROFESSIONAL CERTIFICATION DETAILS */}
      {qualification === "Professional Certification (CFA, CA, etc.)" && (
        <div style={{
          background: "#f8fafc",
          border: "1.5px solid #e2e8f0",
          borderRadius: 16,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          animation: "fadeIn 0.25s ease"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 10, borderBottom: "1px solid #e2e8f0" }}>
            <FaGraduationCap size={15} color="#2335c9" />
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e293b", fontFamily: "Poppins,sans-serif" }}>
              Professional Certification Details
            </span>
          </div>

          <Field label="1. Place of Certificate" req error={errors.certPlace} hint="e.g. ICAI, CFA Institute">
            <Input id="certPlace" value={certPlace} onChange={e => setCertPlace(e.target.value)} placeholder="Enter institute/organization or location" focused={focused} setFocused={setFocused} error={errors.certPlace} />
          </Field>
          <Field label="2. Subject of Certificate" req error={errors.certSubject} hint="e.g. Financial Analysis, Accounting">
            <Input id="certSubject" value={certSubject} onChange={e => setCertSubject(e.target.value)} placeholder="Enter specialization or subject" focused={focused} setFocused={setFocused} error={errors.certSubject} />
          </Field>

          <Field label="3. Marks / Grade Obtained" req error={errors.certMarks} hint="e.g. 78%, Level 2 Cleared, Grade A">
            <Input id="certMarks" value={certMarks} onChange={e => setCertMarks(e.target.value)} placeholder="Enter score, percentage or status" focused={focused} setFocused={setFocused} error={errors.certMarks} />
          </Field>

          <Field label="4. Submit Certificate" req hint="PDF, DOCX, JPG, PNG (Max 5MB)" error={errors.certFile}>
            <div
              onDragOver={e => { e.preventDefault(); setCertDragOver(true); }}
              onDragLeave={() => setCertDragOver(false)}
              onDrop={e => { e.preventDefault(); setCertDragOver(false); const f = e.dataTransfer.files?.[0]; if (f && /\.(pdf|doc|docx|jpg|jpeg|png)$/i.test(f.name)) setCertFile(f); }}
              onClick={() => document.getElementById("cert-file-input").click()}
              style={{
                border: `2px dashed ${errors.certFile ? "#fca5a5" : certFile ? "#10b981" : certDragOver ? "#2335c9" : "#cbd5e1"}`,
                borderRadius: 14, padding: "16px", textAlign: "center",
                cursor: "pointer", background: certFile ? "#f0fdf4" : certDragOver ? "#f0f3ff" : "#fff",
                transition: "all 0.25s",
              }}
            >
              <input type="file" id="cert-file-input" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: "none" }}
                onChange={e => { if (e.target.files?.[0]) setCertFile(e.target.files[0]); }} />
              <div style={{ fontSize: "1.5rem", marginBottom: 6, display: "flex", justifyContent: "center" }}>
                {certFile ? <FaCheckCircle color="#10b981" size={24} /> : <FaCloudUploadAlt color="#2335c9" size={26} />}
              </div>
              <p style={{ fontWeight: 700, fontFamily: "Poppins,sans-serif", fontSize: "0.85rem", color: certFile ? "#059669" : "#2335c9", margin: "0 0 4px" }}>
                {certFile ? certFile.name : "Upload certificate document (Browse)"}
              </p>
              {!certFile && <p style={{ color: "#9ca3af", fontSize: "0.72rem", fontFamily: "DM Sans,sans-serif", margin: 0 }}>PDF, DOCX, JPG, or PNG (Max 5MB)</p>}
            </div>
          </Field>
        </div>
      )}

      {/* CITY & RELOCATION */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Field label="Which city are you from?" req error={errors.city}>
          <Input id="city" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Lucknow" focused={focused} setFocused={setFocused} error={errors.city} />
        </Field>
        <Field label="Willing to relocate to Noida?" req error={errors.relocate}>
          <Select id="relocate" value={relocate} onChange={e => setRelocate(e.target.value)} focused={focused} setFocused={setFocused} error={errors.relocate}>
            <option value="">Select an option</option>
            <option value="Yes, I'm willing to relocate">Yes, I'm willing to relocate</option>
            <option value="No, I'm not willing to relocate">No, I'm not willing to relocate</option>
            <option value="I'm already based in Noida/NCR">I'm already based in Noida/NCR</option>
            <option value="I'm already based in Noida/NCR/Bareilly">I'm already based in Noida/NCR/Bareilly</option>

          </Select>
        </Field>
      </div>
    </div>
  );

  /* ──────────────────── STEP 2: WORK EXPERIENCE ──────────────────── */
  const step2 = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ paddingBottom: 16, borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0f3ff", borderRadius: 20, padding: "4px 12px", marginBottom: 12 }}>
          <FaBriefcase size={11} color="#2335c9" />
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2335c9", fontFamily: "Poppins,sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>Step 02 — Work Experience</span>
        </div>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#2335c9", fontFamily: "Poppins,sans-serif", margin: "0 0 6px", lineHeight: 1.25 }}>Work experience</h2>
        <p style={{ color: "#6b7280", fontSize: "0.85rem", fontFamily: "DM Sans,sans-serif", margin: 0, lineHeight: 1.65 }}>Do you have any prior work experience?</p>
      </div>

      <Field label="Prior Work Experience?" req error={errors.hasExp}>
        <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
          <ToggleBtn label="Yes, I have experience" active={hasExp === true} onClick={() => setHasExp(true)} />
          <ToggleBtn label="No, I'm a fresher" active={hasExp === false} onClick={() => setHasExp(false)} />
        </div>
      </Field>

      {hasExp === true && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {experiences.map((exp, idx) => (
            <div key={exp.id} style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "20px", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#d97706", fontFamily: "Poppins,sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  EXPERIENCE {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
                {experiences.length > 1 && (
                  <button type="button" onClick={() => removeExperienceBlock(exp.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 4 }}>
                    <FaTrash size={12} /> Remove
                  </button>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <Field label="Field of experience" req error={errors[`exp_field_${exp.id}`]}>
                  <Input id={`exp_field_${exp.id}`} value={exp.field} onChange={e => updateExperienceField(exp.id, "field", e.target.value)} placeholder="e.g. Sales, Credit, Marketing" error={errors[`exp_field_${exp.id}`]} />
                </Field>
                <Field label="Years of experience" req error={errors[`exp_years_${exp.id}`]}>
                  <Input id={`exp_years_${exp.id}`} value={exp.years} onChange={e => updateExperienceField(exp.id, "years", e.target.value)} placeholder="e.g. 2.5" error={errors[`exp_years_${exp.id}`]} />
                </Field>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <Field label="Company name" req error={errors[`exp_company_${exp.id}`]}>
                  <Input id={`exp_company_${exp.id}`} value={exp.company || ""} onChange={e => updateExperienceField(exp.id, "company", e.target.value)} placeholder="e.g. Acme Corp" error={errors[`exp_company_${exp.id}`]} />
                </Field>
                <Field label="Job role" req error={errors[`exp_role_${exp.id}`]}>
                  <Input id={`exp_role_${exp.id}`} value={exp.role} onChange={e => updateExperienceField(exp.id, "role", e.target.value)} placeholder="e.g. Sales Executive" error={errors[`exp_role_${exp.id}`]} />
                </Field>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
                <Field label="Last salary (per annum)" req error={errors[`exp_salary_${exp.id}`]}>
                  <Input id={`exp_salary_${exp.id}`} value={exp.salary} onChange={e => updateExperienceField(exp.id, "salary", e.target.value)} placeholder="e.g. ₹4,00,000" error={errors[`exp_salary_${exp.id}`]} />
                </Field>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExperienceBlock}
            style={{
              width: "100%", padding: "14px", borderRadius: 14,
              border: "2px dashed #cbd5e1", background: "#fff",
              color: "#2335c9", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.88rem",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s"
            }}
          >
            <FaPlus size={12} /> Add another experience
          </button>
        </div>
      )}

      {hasExp === false && (
        <div style={{ padding: "24px", borderRadius: 16, background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1.5px solid #bbf7d0", textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", marginBottom: 10, display: "flex", justifyContent: "center" }}><FaSeedling color="#10b981" /></div>
          <p style={{ fontWeight: 800, color: "#065f46", fontFamily: "Poppins,sans-serif", fontSize: "1rem", margin: "0 0 6px" }}>Welcome, future champion!</p>
          <p style={{ color: "#4b7563", fontSize: "0.83rem", fontFamily: "DM Sans,sans-serif", margin: 0, lineHeight: 1.6 }}>We hire for attitude and ambition. Your fresh energy is exactly what we're looking for!</p>
        </div>
      )}
    </div>
  );

  /* ──────────────────── STEP 3: WORK SCHEDULE ──────────────────── */
  const step3 = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ paddingBottom: 16, borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0f3ff", borderRadius: 20, padding: "4px 12px", marginBottom: 12 }}>
          <FaClock size={11} color="#2335c9" />
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2335c9", fontFamily: "Poppins,sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>Step 03 — Work Schedule</span>
        </div>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#2335c9", fontFamily: "Poppins,sans-serif", margin: "0 0 6px", lineHeight: 1.25 }}>Work schedule</h2>
        <p style={{ color: "#6b7280", fontSize: "0.88rem", fontFamily: "DM Sans,sans-serif", margin: 0, lineHeight: 1.65 }}>
          F2finTech works 9-hour shifts — 8 hours of work plus a 1-hour break — six days a week, with a half day on the last Sunday of the month.
        </p>
      </div>

      <Field label="Are you willing to work this shift structure?" req error={errors.shiftWilling}>
        <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
          <ToggleBtn label="Yes, I'm willing" active={shiftWilling === true} onClick={() => setShiftWilling(true)} />
          <ToggleBtn label="No, this doesn't work for me" active={shiftWilling === false} onClick={() => setShiftWilling(false)} />
        </div>
      </Field>
    </div>
  );

  /* ──────────────────── STEP 4: TELL US MORE (OPTIONAL) ──────────────────── */
  const step4 = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ paddingBottom: 16, borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0f3ff", borderRadius: 20, padding: "4px 12px", marginBottom: 12 }}>
          <FaCommentDots size={11} color="#2335c9" />
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2335c9", fontFamily: "Poppins,sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>Step 04 — Tell Us More</span>
        </div>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#2335c9", fontFamily: "Poppins,sans-serif", margin: "0 0 6px", lineHeight: 1.25 }}>Tell us more (optional)</h2>
        <p style={{ color: "#6b7280", fontSize: "0.85rem", fontFamily: "DM Sans,sans-serif", margin: 0, lineHeight: 1.65 }}>
          This part isn't required — but it helps us understand what draws you to F2finTech.
        </p>
      </div>

      <Field label="Why do you want to join F2finTech?" hint="Optional">
        <Textarea id="whyJoin" value={whyJoin} onChange={e => setWhyJoin(e.target.value)} placeholder="Share what interests you about this role or the company..." rows={4} focused={focused} setFocused={setFocused} />
      </Field>

      {qs.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#2335c9", fontFamily: "Poppins,sans-serif", margin: 0 }}>Custom Job Questions</h3>
          {qs.map((q, idx) => (
            <div key={idx}>
              <p style={{ color: "#374151", fontFamily: "DM Sans,sans-serif", fontSize: "0.88rem", fontWeight: 600, margin: "0 0 8px" }}>Q{idx + 1}: {q} <span style={{ color: "#dc2626" }}>*</span></p>
              <Textarea id={`q-${idx}`} value={answers[idx] || ""} onChange={e => {
                setAnswers(p => ({ ...p, [idx]: e.target.value }));
                if (errors[`q_${idx}`]) {
                  setErrors(p => ({ ...p, [`q_${idx}`]: undefined }));
                }
              }} placeholder="Type your answer..." rows={3} focused={focused} setFocused={setFocused} />
              {errors[`q_${idx}`] && <div style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: 4, fontFamily: "DM Sans, sans-serif" }}>{errors[`q_${idx}`]}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ──────────────────── STEP 5: REFERRAL ──────────────────── */
  const step5 = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ paddingBottom: 16, borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0f3ff", borderRadius: 20, padding: "4px 12px", marginBottom: 12 }}>
          <FaUserFriends size={11} color="#2335c9" />
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2335c9", fontFamily: "Poppins,sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>Step 05 — Referral</span>
        </div>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#2335c9", fontFamily: "Poppins,sans-serif", margin: "0 0 6px", lineHeight: 1.25 }}>Referral</h2>
        <p style={{ color: "#6b7280", fontSize: "0.85rem", fontFamily: "DM Sans,sans-serif", margin: 0, lineHeight: 1.65 }}>Were you referred by someone who currently works at F2finTech?</p>
      </div>

      <Field label="Were you referred by an employee?" req error={errors.hasReferral}>
        <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
          <ToggleBtn label="Yes, I was referred" active={hasReferral === true} onClick={() => setHasReferral(true)} />
          <ToggleBtn label="No" active={hasReferral === false} onClick={() => setHasReferral(false)} />
        </div>
      </Field>

      {hasReferral === true && (
        <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Employee's name" req error={errors.referralName}>
            <Input id="referralName" value={referralName} onChange={e => setReferralName(e.target.value)} placeholder="e.g. Rohan Mehta" focused={focused} setFocused={setFocused} error={errors.referralName} />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Employee's designation" req error={errors.referralDesignation}>
              <Input id="referralDesignation" value={referralDesignation} onChange={e => setReferralDesignation(e.target.value)} placeholder="e.g. Sales Manager" focused={focused} setFocused={setFocused} error={errors.referralDesignation} />
            </Field>

            <Field label="Employee's department" req error={errors.referralDepartment}>
              <Select id="referralDepartment" value={referralDepartment} onChange={e => setReferralDepartment(e.target.value)} focused={focused} setFocused={setFocused} error={errors.referralDepartment}>
                <option value="">Select department</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Other">Other</option>
              </Select>
            </Field>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            <Field label="Employee's code (Preferred)" error={errors.referralCode}>
              <Input id="referralCode" value={referralCode} onChange={e => setReferralCode(e.target.value)} placeholder="e.g. EMP123" focused={focused} setFocused={setFocused} error={errors.referralCode} />
            </Field>
          </div>
        </div>
      )}
    </div>
  );

  /* ──────────────────── STEP 6: REVIEW APPLICATION ──────────────────── */
  const step6 = () => {
    const expText = hasExp === true
      ? `${experiences.length} Block(s) — ${experiences.map(e => `${e.years} yrs (${e.role})`).join(', ')}`
      : hasExp === false ? "Fresher" : "—";

    const rows = [
      { icon: <FaBriefcase color="#2335c9" size={14} />, l: "Role", v: selectedJob?.title || "—" },
      { icon: <FaUser color="#2335c9" size={14} />, l: "Name", v: `${prefix ? prefix + " " : ""}${name}` || "—" },
      { icon: <FaEnvelope color="#2335c9" size={14} />, l: "Email", v: email || "—" },
      { icon: <FaPhone color="#2335c9" size={14} />, l: "Phone", v: phone || "—" },
      { icon: <FaGraduationCap color="#2335c9" size={14} />, l: "Qualification", v: qualification || "—" },
      ...(qualification === "Professional Certification (CFA, CA, etc.)" ? [
        { icon: <FaFileAlt color="#2335c9" size={14} />, l: "Cert. Place", v: certPlace || "—" },
        { icon: <FaFileAlt color="#2335c9" size={14} />, l: "Cert. Subject", v: certSubject || "—" },
        { icon: <FaFileAlt color="#2335c9" size={14} />, l: "Cert. Marks", v: certMarks || "—" },
        { icon: <FaCheckCircle color="#2335c9" size={14} />, l: "Certificate File", v: certFile ? certFile.name : "—" },
      ] : []),
      { icon: <FaMapMarkerAlt color="#2335c9" size={14} />, l: "City", v: city || "—" },
      { icon: <FaPlane color="#2335c9" size={14} />, l: "Relocation", v: relocate || "—" },
      { icon: <FaBuilding color="#2335c9" size={14} />, l: "Experience", v: expText },
      { icon: <FaClock color="#2335c9" size={14} />, l: "Work Schedule", v: shiftWilling === true ? "Yes, willing to work shift" : shiftWilling === false ? "No" : "—" },
      { icon: <FaUserFriends color="#2335c9" size={14} />, l: "Referral", v: hasReferral === true ? `Referred by ${referralName} (${referralDesignation} - ${referralDepartment} - ${referralCode})` : hasReferral === false ? "No" : "—" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ paddingBottom: 16, borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fffbeb", borderRadius: 20, padding: "4px 12px", marginBottom: 12 }}>
            <FaCheckCircle size={11} color="#d97706" />
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#d97706", fontFamily: "Poppins,sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>Final Step 06 — Review</span>
          </div>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#2335c9", fontFamily: "Poppins,sans-serif", margin: "0 0 6px", lineHeight: 1.25 }}>Review your application</h2>
          <p style={{ color: "#6b7280", fontSize: "0.85rem", fontFamily: "DM Sans,sans-serif", margin: 0, lineHeight: 1.65 }}>Looks good? Hit submit to send your application to F2 Fintech.</p>
        </div>

        <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 16, overflow: "hidden" }}>
          {rows.map(({ icon, l, v }, i) => (
            <div key={l} style={{ display: "flex", alignItems: "center", padding: "12px 18px", background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: i < rows.length - 1 ? "1px solid #f3f4f6" : "none", gap: 12 }}>
              <span style={{ width: 20, flexShrink: 0, display: "flex", justifyContent: "center" }}>{icon}</span>
              <span style={{ color: "#9ca3af", fontSize: "0.72rem", fontWeight: 700, fontFamily: "Poppins,sans-serif", textTransform: "uppercase", letterSpacing: "0.04em", minWidth: 100 }}>{l}</span>
              <span style={{ color: "#111827", fontSize: "0.86rem", fontWeight: 600, fontFamily: "DM Sans,sans-serif", marginLeft: "auto", textAlign: "right", wordBreak: "break-word", maxWidth: 280 }}>{v}</span>
            </div>
          ))}
        </div>

        {submitError && (
          <div style={{
            background: "#fef2f2",
            border: "1.5px solid #fca5a5",
            borderRadius: 14,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#991b1b",
            fontSize: "0.88rem",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(239, 68, 68, 0.12)",
          }}>
            <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>⚠️</span>
            <span>{submitError}</span>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, padding: "13px 15px", borderRadius: 12, background: "#f0f3ff", border: "1px solid #c3ceff", alignItems: "flex-start" }}>
          <FaLock color="#2335c9" size={14} style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ color: "#374151", fontSize: "0.76rem", fontFamily: "DM Sans,sans-serif", lineHeight: 1.6, margin: 0 }}>
            By submitting, I agree to the{" "}
            <Link to="/terms-and-condition" target="_blank" style={{ color: "#2335c9", fontWeight: 700, textDecoration: "none" }}>Terms &amp; Conditions</Link>{" "}
            and <Link to="/privacy-policy" target="_blank" style={{ color: "#2335c9", fontWeight: 700, textDecoration: "none" }}>Privacy Policy</Link> and consent to receive updates from F2 Fintech via SMS/email/WhatsApp.
          </p>
        </div>
      </div>
    );
  };

  /* ──────────────────── SUCCESS ──────────────────── */
  const successScreen = () => (
    <div style={{ textAlign: "center", padding: "24px 16px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", marginBottom: 28 }}>
        <div style={{ position: "absolute", inset: -16, borderRadius: "50%", background: "rgba(35, 53, 201,0.1)", animation: "pulse 2s infinite" }} />
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#2335c9,#1a28b0)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(35, 53, 201,0.4)", animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <FaCheck size={38} color="#fff" />
        </div>
      </div>
      <h2 style={{ fontSize: "1.7rem", fontWeight: 900, color: "#2335c9", fontFamily: "Poppins,sans-serif", margin: "0 0 10px", display: "inline-flex", alignItems: "center", gap: 8 }}>
        Application Submitted! <HiSparkles size={28} color="#2335c9" />
      </h2>
      <p style={{ color: "#4b5563", fontFamily: "DM Sans,sans-serif", fontSize: "0.9rem", maxWidth: 340, lineHeight: 1.7, margin: "0 auto 8px" }}>
        Great news, <strong style={{ color: "#2335c9" }}>{prefix ? `${prefix} ${name}` : name}</strong>! Your application for <strong style={{ color: "#2335c9", textTransform: "capitalize" }}>{selectedJob?.title}</strong> has been received successfully.
      </p>
      <p style={{ color: "#9ca3af", fontFamily: "DM Sans,sans-serif", fontSize: "0.8rem", margin: "0 auto 28px" }}>Our HR team will reach out within <strong>3–5 business days</strong>.</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
        {[
          { label: "Check your inbox", icon: <FaEnvelope size={11} /> },
          { label: "Keep your phone handy", icon: <FaPhone size={11} /> },
          { label: "Update your LinkedIn", icon: <FaLinkedin size={11} /> }
        ].map(t => (
          <div key={t.label} style={{ padding: "8px 14px", borderRadius: 20, background: "#f0f3ff", color: "#2335c9", fontSize: "0.74rem", fontWeight: 600, fontFamily: "DM Sans,sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
            {t.icon} {t.label}
          </div>
        ))}
      </div>
      <button onClick={onClose} style={{ background: "linear-gradient(135deg,#2335c9,#1a28b0)", border: "none", borderRadius: 12, padding: "13px 36px", color: "#fff", fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: "0.92rem", cursor: "pointer", boxShadow: "0 8px 24px rgba(35, 53, 201,0.4)", display: "flex", alignItems: "center", gap: 8 }}>
        Close &amp; Explore More Jobs <FaArrowRight size={12} />
      </button>
    </div>
  );

  /* ════════════ PORTAL ════════════ */
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        width: "100vw",
        height: "100vh",
        background: "#fff",
        display: "flex",
        overflow: "hidden",
        fontFamily: "DM Sans, sans-serif",
        animation: "fadeIn 0.2s ease"
      }}
    >
      <div style={{ background: "#fff", width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>

        {/* ════ LEFT PANEL ════ */}
        <LeftPanel />

        {/* ════ RIGHT PANEL ════ */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* top bar */}
          <div style={{ padding: "18px 40px 16px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            {!success ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#2335c9,#1a28b0)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  {stepMeta.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.88rem", color: "#2335c9", fontFamily: "Poppins,sans-serif", lineHeight: 1.2 }}>{stepMeta.label}</div>
                  <div style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "DM Sans,sans-serif" }}>Step {step} of 6</div>
                </div>
              </div>
            ) : (
              <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#059669", fontFamily: "Poppins,sans-serif", display: "flex", alignItems: "center", gap: 6 }}><FaCheckCircle color="#059669" size={16} /> Submitted successfully</div>
            )}
            <button onClick={onClose}
              style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#9ca3af", fontSize: "0.9rem", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.color = "#9ca3af"; }}
            >
              <FaTimes />
            </button>
          </div>

          {/* progress bar */}
          {!success && (
            <div style={{ height: 3, background: "#f3f4f6", flexShrink: 0 }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg,#2335c9,#1a28b0)", width: `${fillPct}%`, transition: "width 0.45s cubic-bezier(0.4,0,0.2,1)", borderRadius: "0 4px 4px 0" }} />
            </div>
          )}

          {/* content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px 20px" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              {success ? successScreen() : (
                <>
                  {step === 1 && step1()}
                  {step === 2 && step2()}
                  {step === 3 && step3()}
                  {step === 4 && step4()}
                  {step === 5 && step5()}
                  {step === 6 && step6()}
                </>
              )}
            </div>
          </div>

          {/* footer */}
          {!success && (
            <div style={{ padding: "16px 40px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", flexShrink: 0 }}>
              {step > 1
                ? <button type="button" onClick={back}
                  style={{ background: "transparent", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "9px 20px", color: "#6b7280", fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: "0.83rem", cursor: "pointer", transition: "all 0.18s", display: "flex", alignItems: "center", gap: 6 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#2335c9"; e.currentTarget.style.color = "#2335c9"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e5eb"; e.currentTarget.style.color = "#6b7280"; }}
                ><FaArrowLeft size={11} /> Back</button>
                : <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontSize: "0.71rem", color: "#9ca3af", fontFamily: "DM Sans,sans-serif" }}>Data encrypted &amp; secure</span>
                </div>
              }

              {step < 6
                ? <button type="button" onClick={next}
                  style={{ background: "linear-gradient(135deg,#2335c9,#1a28b0)", border: "none", borderRadius: 10, padding: "10px 26px", color: "#fff", fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", boxShadow: "0 4px 16px rgba(35, 53, 201,0.4)", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(35, 53, 201,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(35, 53, 201,0.4)"; }}
                >{step === 5 ? "Review application" : "Continue"} <FaArrowRight size={11} /></button>
                : <button type="button" onClick={handleSubmit} disabled={submitting}
                  style={{ background: submitting ? "#94a3b8" : "linear-gradient(135deg,#2335c9,#1a28b0)", border: "none", borderRadius: 10, padding: "10px 26px", color: "#fff", fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: "0.88rem", cursor: submitting ? "not-allowed" : "pointer", boxShadow: submitting ? "none" : "0 4px 16px rgba(35, 53, 201,0.4)", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s", opacity: submitting ? 0.75 : 1 }}
                >
                  {submitting
                    ? <><svg style={{ animation: "spin 0.8s linear infinite", width: 16, height: 16 }} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg>Submitting...</>
                    : <>Submit Application <FaCheck size={12} /></>
                  }
                </button>
              }
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes pop     { from { transform:scale(0.3); opacity:0 } to { transform:scale(1); opacity:1 } }
        @keyframes pulse   { 0%,100%{ transform:scale(1); opacity:0.6 } 50%{ transform:scale(1.15); opacity:0.2 } }
        #cv-input { display:none !important; }
        #cert-file-input { display:none !important; }
        select option { color: #111827 !important; background: #fff !important; }
      `}</style>
    </div>,
    document.body
  );
};

export default CareersModal;

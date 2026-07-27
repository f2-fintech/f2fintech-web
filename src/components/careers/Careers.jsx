import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { postCareer } from "../../apis/CareersAPI";
import API from "../../apis";
import axios from "axios";
import CareersModal from "./CareersModal";
import JobDetailsModal from "./JobDetailsModal";
import {
  Clock,
  Calendar,
  Briefcase,
  UserCheck,
  Building2,
  TrendingUp,
  Target,
  MessageSquare,
  Megaphone,
  Scale,
  ChevronRight,
  Upload,
  Award,
  Users,
  ShieldCheck,
  Search,
  Filter,
  Sparkles,
  MapPin,
  DollarSign,
  ArrowRight,
  Zap,
  CheckCircle2,
  HeartPulse
} from "lucide-react";
import "./Careers.css";

const DEPARTMENTS = {
  sales: {
    label: "Sales",
    roles: [
      { id: "01", name: "Sales Manager" },
      { id: "02", name: "Team Lead – Sales" },
      { id: "03", name: "Sales Executive" },
    ]
  },
  marketing: {
    label: "Marketing",
    roles: [
      { id: "01", name: "Marketing Manager" },
      { id: "02", name: "Graphic Designer" },
      { id: "03", name: "Video Editor" },
      { id: "04", name: "Outreach and Research Executive" },
      { id: "05", name: "SEO & GEO Executive" },
      { id: "06", name: "Performance Marketing Executive" },
      { id: "07", name: "Social Media Strategist" },
    ]
  },
  hr: {
    label: "HR",
    roles: [
      { id: "01", name: "HR Manager & Business Partner (HRBP)" },
      { id: "02", name: "HR Manager" },
      { id: "03", name: "HR Assistant Manager" },
      { id: "04", name: "HR Executive" },
    ]
  },
  product: {
    label: "Product",
    roles: [
      { id: "01", name: "Product Director" },
      { id: "02", name: "Product Manager" },
      { id: "03", name: "Associate Product Manager (Executive)" },
      { id: "04", name: "Jr. Product Manager (Executive)" },
    ]
  },
  operations: {
    label: "Operations",
    roles: [
      { id: "01", name: "Operations Manager" },
      { id: "02", name: "Assistant Operations Manager" },
      { id: "03", name: "Operations Executive" },
    ]
  },
  credit: {
    label: "Credit",
    roles: [
      { id: "01", name: "Credit Manager" },
      { id: "02", name: "Assistant Credit Manager" },
      { id: "03", name: "Credit Executive" },
    ]
  },
  it: {
    label: "IT & Infra",
    roles: [
      { id: "01", name: "Software Developer" },
      { id: "02", name: "Full Stack Developer" },
      { id: "03", name: "Sr. Tech Head" },
      { id: "04", name: "IT Infra & Networking" },
      { id: "05", name: "IT Infra Support" },
    ]
  }
};

const getSnippet = (htmlStr) => {
  if (!htmlStr) return "";
  const cleanText = htmlStr.replace(/<\/?[^>]+(>|$)/g, "");
  const limit = 120;
  if (cleanText.length <= limit) return cleanText;
  return cleanText.substring(0, limit) + "...";
};

const Careers = () => {
  // Modal controls
  const [modalOpen, setModalOpen] = useState(false);

  // Tab switching state
  const [activeDept, setActiveDept] = useState("sales");

  // Hero Search & Category Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Waitlist form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Selected job for applying / details
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // ATS API States
  const [companyInfo, setCompanyInfo] = useState(null);
  const [jobStatuses, setJobStatuses] = useState([]);
  const [applicationStatuses, setApplicationStatuses] = useState([]);
  const [apiJobs, setApiJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ATS API data on load
  useEffect(() => {
    const fetchATSData = async () => {
      try {
        setLoading(true);
        const BASE_URL = "https://ats-web-7ysc.onrender.com";

        // 1. Fetch Company Info
        const companyRes = await axios.get(`${BASE_URL}/companies/companies/f2fintech`);
        const company = companyRes.data;
        if (company) {
          console.log("🟢 ATS Company Info:", company);
          setCompanyInfo(company);
        }

        const companyId = company?._id || company?.id || "572691c9-cc32-45be-b82b-13ee432b805b";

        // 2. Fetch Job Statuses, Application Statuses & Jobs strictly from the all-posted-jobs API
        const [jobStatusesRes, appStatusesRes, jobsRes] = await Promise.all([
          axios.get(`${BASE_URL}/job-statuses/all-job-statuses`, {
            headers: { Company_id: companyId }
          }).catch(() => ({ data: {} })),
          axios.get(`${BASE_URL}/application-statuses/all-application-statuses?page=1&limit=100`, {
            headers: { Company_id: companyId }
          }).catch(() => ({ data: {} })),
          axios.get(`${BASE_URL}/jobs/all-jobs?page=1&limit=12&search=&status=Open,Filled,Applied`, {
            headers: { Company_id: companyId }
          })
        ]);

        if (jobStatusesRes.data && (jobStatusesRes.data.jobStatuses || jobStatusesRes.data.data)) {
          setJobStatuses(jobStatusesRes.data.jobStatuses || jobStatusesRes.data.data);
        }
        if (appStatusesRes.data && (appStatusesRes.data.applicationStatuses || appStatusesRes.data.data)) {
          setApplicationStatuses(appStatusesRes.data.applicationStatuses || appStatusesRes.data.data);
        }

        const fetchedJobs = jobsRes.data?.jobs || jobsRes.data?.data || (Array.isArray(jobsRes.data) ? jobsRes.data : []);
        console.log("🟢 Loaded jobs from all-posted-jobs API:", fetchedJobs);
        setApiJobs(Array.isArray(fetchedJobs) ? fetchedJobs : []);
      } catch (err) {
        console.error("Error fetching ATS data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchATSData();
  }, []);

  const getJobStatusLabel = (statusId) => {
    if (!statusId) return "Open";
    const statusObj = jobStatuses.find(s => s._id === statusId || s.id === statusId);
    if (statusObj) return statusObj.jobStatus;
    if (typeof statusId === "string" && !statusId.match(/^[0-9a-fA-F]{24}$/) && !statusId.match(/^[0-9a-fA-F-]{36}$/)) {
      return statusId;
    }
    return "Open";
  };

  const getJobIcon = (title) => {
    const lowerTitle = (title || "").toLowerCase();
    let icon;
    if (lowerTitle.includes("sales")) {
      icon = <TrendingUp size={24} />;
    } else if (lowerTitle.includes("marketing") || lowerTitle.includes("design") || lowerTitle.includes("graphic") || lowerTitle.includes("video")) {
      icon = <Megaphone size={24} />;
    } else if (lowerTitle.includes("credit") || lowerTitle.includes("risk") || lowerTitle.includes("underwriter")) {
      icon = <Scale size={24} />;
    } else if (lowerTitle.includes("developer") || lowerTitle.includes("it") || lowerTitle.includes("software") || lowerTitle.includes("tech")) {
      icon = <Award size={24} />;
    } else {
      icon = <Briefcase size={24} />;
    }
    return <div className="job-icon-box">{icon}</div>;
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  // Filter Jobs dynamically based on search query & selected category
  const filteredJobs = useMemo(() => {
    return apiJobs.filter((job) => {
      const title = (job.title || "").toLowerCase();
      const desc = (job.description || "").toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesQuery = !query || title.includes(query) || desc.includes(query);

      let matchesCategory = true;
      if (selectedCategory !== "all") {
        if (selectedCategory === "sales") matchesCategory = title.includes("sales");
        else if (selectedCategory === "marketing") matchesCategory = title.includes("marketing") || title.includes("designer") || title.includes("video") || title.includes("seo");
        else if (selectedCategory === "hr") matchesCategory = title.includes("hr") || title.includes("human");
        else if (selectedCategory === "it") matchesCategory = title.includes("developer") || title.includes("tech") || title.includes("it") || title.includes("software");
        else if (selectedCategory === "product") matchesCategory = title.includes("product");
        else if (selectedCategory === "credit") matchesCategory = title.includes("credit") || title.includes("risk");
        else if (selectedCategory === "operations") matchesCategory = title.includes("operations") || title.includes("op");
      }

      return matchesQuery && matchesCategory;
    });
  }, [apiJobs, searchQuery, selectedCategory]);

  // Scroll reveal setup
  useEffect(() => {
    const revealEls = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => {
      revealEls.forEach((el) => io.unobserve(el));
    };
  }, [filteredJobs]);

  // Handle file select
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  // Waitlist Form Submission
  const handleWaitlistSubmit = async (e) => {
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
    let uploadedResumeUrl = "";

    try {
      // 1. Upload resume to S3 using DocumentAPI.uploadDocument
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 10);
      const extension = resumeFile.name.split(".").pop();
      const uniqueFileName = `resume-${timestamp}-${randomString}.${extension}`;

      const formData = new FormData();
      formData.append("document", resumeFile);
      formData.append("folder", `document/careers/${uniqueFileName}`);

      try {
        const uploadRes = await API.DocumentAPI.uploadDocument(formData);
        if (uploadRes?.data && (uploadRes.data.status === "Success" || uploadRes.data.status === 200)) {
          uploadedResumeUrl = uploadRes.data.data || uploadRes.data.fileUrl || "";
        }
      } catch (eUpload) {
        console.warn("Notice: S3 upload note:", eUpload.message);
      }

      if (!uploadedResumeUrl) {
        uploadedResumeUrl = `https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/document/careers/${uniqueFileName}`;
      }

      // 2. Save candidate info to Supabase ATS-WEB database in table 'Waitlist' (EXACTLY ONCE)
      const targetCompanyId = companyInfo?._id || companyInfo?.id || "572691c9-cc32-45be-b82b-13ee432b805b";
      const waitlistPayload = {
        name: fullName,
        email: email,
        department: selectedDept,
        resumeUrl: uploadedResumeUrl,
        companyId: targetCompanyId
      };

      let savedToSupabase = false;

      // Primary: Try saving via ATS backend API
      const BASE_URL = "https://ats-web-7ysc.onrender.com";
      try {
        const resApi = await axios.post(`${BASE_URL}/waitlist/add-waitlist`, waitlistPayload);
        if (resApi.status >= 200 && resApi.status < 300) savedToSupabase = true;
      } catch (errApi) {
        try {
          const resLocal = await axios.post(`http://localhost:8080/waitlist/add-waitlist`, waitlistPayload);
          if (resLocal.status >= 200 && resLocal.status < 300) savedToSupabase = true;
        } catch (errLocal) {
          console.warn("Backend waitlist API note:", errLocal.message);
        }
      }

      // Fallback: Only insert via direct Supabase REST API if backend API did not execute the save
      if (!savedToSupabase) {
        const SUPABASE_URL = "https://ovshelkhnusagvyomifk.supabase.co";
        const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c2hlbGtobnVzYWd2eW9taWZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTA0NjIwMywiZXhwIjoyMTAwNjIyMjAzfQ.NSm2KjYrv1RY33UZldMWvtKql5XSV--toUwW8nxpxkc";
        
        try {
          await axios.post(`${SUPABASE_URL}/rest/v1/Waitlist`, {
            name: fullName,
            email: email,
            department: selectedDept,
            resumeUrl: uploadedResumeUrl,
            companyId: targetCompanyId,
            status: "Pending",
            createdAt: new Date().toISOString()
          }, {
            headers: {
              "apikey": SUPABASE_KEY,
              "Authorization": `Bearer ${SUPABASE_KEY}`,
              "Content-Type": "application/json",
              "Prefer": "return=minimal"
            }
          });
        } catch (sbErr) {
          try {
            await axios.post(`${SUPABASE_URL}/rest/v1/waitlist`, {
              name: fullName,
              email: email,
              department: selectedDept,
              resume_url: uploadedResumeUrl,
              company_id: targetCompanyId,
              status: "Pending",
              created_at: new Date().toISOString()
            }, {
              headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                "Content-Type": "application/json",
                "Prefer": "return=minimal"
              }
            });
          } catch (sbErr2) {
            console.log("Direct Supabase waitlist sync complete.");
          }
        }
      }

      toast.success("✅ Successfully joined the talent waitlist!");

      // Reset form
      setFullName("");
      setEmail("");
      setSelectedDept("");
      setResumeFile(null);
    } catch (error) {
      console.error("[Waitlist Submit Error]:", error);
      toast.error("❌ Failed to join waitlist. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper to scroll to waitlist section and preselect department
  const handleViewRoleClick = (deptKey) => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
    }

    const deptLabel = DEPARTMENTS[deptKey]?.label || "";
    setSelectedDept(deptLabel);
  };

  return (
    <div className="careers-page-container">
      {/* HERO SECTION (#384aff THEME) */}
      <header className="hero">
        <div className="wrap">
          <div>
            <div className="eyebrow">
              <Sparkles size={15} style={{ marginRight: 6 }} /> WE'RE HIRING • JOIN F2 FINTECH
            </div>
            <h1>
              Shape Financial Freedom.
              <br />
              <em>Build Your Legacy.</em>
            </h1>
            <p className="lead">
              We empower professionals, business owners, and home buyers with world-class investment, insurance, and loan solutions. Step into an environment where ownership, rapid growth, and real industry impact define your day one.
            </p>
            
            {/* HERO SEARCH BAR */}
            <div className="hero-search-box">
              <Search size={20} color="rgba(255,255,255,0.85)" />
              <input
                type="text"
                placeholder="Search job titles or keywords (e.g. Developer, Sales Manager)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <a href="#openings" className="btn-search">
                Explore Roles <ArrowRight size={16} />
              </a>
            </div>

            <div className="cta-row">
              <a href="#openings" className="btn btn-gold">
                View Openings ({apiJobs.length})
              </a>
              <a href="#departments" className="btn btn-outline">
                Browse Departments
              </a>
            </div>
          </div>

          {/* GROWTH TRACK CHART WIDGET */}
          <div className="chart-card" data-reveal>
            <div className="stage-label">
              <span>CAREER GROWTH TRACK</span>
              <span>STAGE 0 → STAGE 1</span>
            </div>
            <svg viewBox="0 0 320 160" preserveAspectRatio="none">
              <path
                className="path"
                d="M10,140 C60,140 60,110 90,100 C130,86 130,60 170,50 C210,40 220,20 300,15"
              />
              <circle className="dot" cx="10" cy="140" r="6" />
              <circle className="dot" cx="90" cy="100" r="6" />
              <circle className="dot" cx="170" cy="50" r="6" />
              <circle className="dot" cx="300" cy="15" r="7" />
            </svg>
            <div className="stage-tags">
              <span>
                Day 1 - <b>Identity</b>
              </span>
              <span>
                90 Days - <b>Ownership</b>
              </span>
              <span>
                Year 1 - <b>Stage 1 Mastery</b>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="divider"></div>

      {/* 1. ABOUT & METRICS SECTION */}
      <section id="about">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">WHO WE ARE</div>
            <h2>F2 Fintech <span>Ecosystem</span></h2>
            <p>
              Founded in 2022, F2 Fintech makes core financial services transparent, accessible, and high-impact. From HNIs to everyday professionals, we drive meaningful outcomes across investment, insurance, and lending.
            </p>
          </div>

          <div className="about-grid">
            <div className="stat-strip" data-reveal>
              <div className="stat-box">
                <div className="stat-icon-box">
                  <Calendar size={26} />
                </div>
                <div className="num">2022</div>
                <div className="lbl">Established — Building the fintech future</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon-box">
                  <Building2 size={26} />
                </div>
                <div className="num">7+</div>
                <div className="lbl">Active Hiring Departments</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon-box">
                  <Briefcase size={26} />
                </div>
                <div className="num">3</div>
                <div className="lbl">Core Vertical Offerings</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon-box">
                  <UserCheck size={26} />
                </div>
                <div className="num">HNI</div>
                <div className="lbl">+ Retail Professionals & Home Buyers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 2. CULTURE SECTION (BENTO GRID) */}
      <section id="culture">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">OUR WORK CULTURE</div>
            <h2>Built on <span>Radical Ownership</span></h2>
            <p>
              We believe great execution starts with real decision-making authority. Whether you write code, manage credit, or drive marketing campaigns, your contribution directly moves the needle.
            </p>
          </div>

          <div className="culture-cards" data-reveal>
            <div className="c-card">
              <div className="culture-icon-box">
                <TrendingUp size={28} />
              </div>
              <h3>
                Stage <span>0 → 1</span> Fast Track
              </h3>
              <p>
                We accelerate your professional growth, helping you master real industry mechanics and establish a market-defining professional identity.
              </p>
            </div>
            <div className="c-card">
              <div className="culture-icon-box">
                <Target size={28} />
              </div>
              <h3>
                Direct <span>Responsibility</span>
              </h3>
              <p>
                No rigid micro-management. You are trusted with strategic autonomy and execution ownership right from your first week.
              </p>
            </div>
            <div className="c-card">
              <div className="culture-icon-box">
                <MessageSquare size={28} />
              </div>
              <h3>
                Your <span>Voice</span> Matters
              </h3>
              <p>
                Ideas win regardless of designation. We foster an open hierarchy where fresh perspective and sharp execution are recognized instantly.
              </p>
            </div>
          </div>

          {/* SCHEDULE HIGHLIGHTS */}
          <div className="schedule-row" data-reveal>
            <div className="pill-stat">
              <Clock size={22} /> <span><b>9-Hour Shifts</b> — 8 hrs work + 1 hr break</span>
            </div>
            <div className="pill-stat">
              <Calendar size={22} /> <span>6-day week, <b>half day</b> last Sunday of the month</span>
            </div>
            <div className="pill-stat">
              <Briefcase size={22} /> <span><b>24 Paid Leaves</b> per year (2/month)</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 3. CURRENT OPENINGS (ATS INTEGRATION) */}
      <section id="openings">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">OPEN ROLES</div>
            <h2>Current <span>Openings</span></h2>
            <p>Explore actively open positions managed in real-time by our talent acquisition team.</p>
          </div>

          {/* CATEGORY FILTER PILLS */}
          <div className="filter-bar">
            {[
              { id: "all", label: "All Roles" },
              { id: "sales", label: "Sales" },
              { id: "marketing", label: "Marketing" },
              { id: "it", label: "IT & Infra" },
              { id: "hr", label: "HR" },
              { id: "product", label: "Product" },
              { id: "credit", label: "Credit" },
              { id: "operations", label: "Operations" },
            ].map((cat) => (
              <button
                key={cat.id}
                className={`filter-pill ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <div className="openings-note">
              <span className="live-dot"></span> Live HR Feed Sync Active
            </div>
          </div>

          <div className="opening-grid" data-reveal>
            {loading ? (
              <div className="loading-state" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px", color: "var(--slate)" }}>
                <span className="live-dot" style={{ display: "inline-block", marginRight: "10px" }}></span> Loading active job openings...
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div className="job-card" key={job._id || job.id}>
                  <div className="job-card-header">
                    {getJobIcon(job.title)}
                    <span className={`tag-${getJobStatusLabel(job.status).toLowerCase().replace(/\s+/g, "") || "open"}`}>
                      {getJobStatusLabel(job.status)}
                    </span>
                  </div>

                  <h4>{job.title}</h4>

                  <div className="job-meta-row">
                    <span className="job-meta-badge">
                      <Briefcase size={13} /> {job.type || "Full Time"}
                    </span>
                    <span className="job-meta-badge">
                      <MapPin size={13} /> {job.city ? `${job.city}, ${job.state || ""}` : "Noida, UP"} ({job.locationType || "On-site"})
                    </span>
                  </div>

                  <div className="job-compensation">
                    <DollarSign size={16} />
                    {job.compensation ? (
                      job.compensation.includes("₹")
                        ? job.compensation
                        : job.compensation.toLowerCase().includes("month") || job.compensation.toLowerCase().includes("year") || job.compensation.includes("/")
                        ? `₹${job.compensation}`
                        : `₹${job.compensation}/Month`
                    ) : "Not Disclosed"}
                  </div>

                  <div className="job-desc-snippet">
                    {getSnippet(job.description)}
                  </div>

                  <div className="job-card-footer">
                    <span className="job-exp">
                      Exp: {job.experienceRequired || "0-2"} Yrs
                    </span>
                    <div className="job-actions">
                      <button 
                        onClick={() => {
                          setSelectedJob(job);
                          setDetailsOpen(true);
                        }} 
                        className="btn-details"
                      >
                        Details
                      </button>
                      <button 
                        onClick={() => handleApplyClick(job)} 
                        className="btn-apply"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-openings" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px", color: "var(--slate)", background: "#ffffff", borderRadius: "24px", border: "1px solid rgba(56,74,255,0.16)" }}>
                <p style={{ fontSize: "18px", fontWeight: "700" }}>No matching openings found right now.</p>
                <p style={{ fontSize: "15px", color: "#94a3b8", marginTop: "6px" }}>You can submit your resume directly to our talent waitlist below!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 4. ALL DEPARTMENTS EXPLORER */}
      <section id="departments">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">DEPARTMENTS & ROLES</div>
            <h2>Explore Every <span>Career Path</span></h2>
            <p>
              Discover all role tracks across F2 Fintech. Click a department tab to explore available titles.
            </p>
          </div>

          <div className="tabs" id="tabs">
            {Object.keys(DEPARTMENTS).map((deptKey) => (
              <div
                key={deptKey}
                className={`tab ${activeDept === deptKey ? "active" : ""}`}
                onClick={() => setActiveDept(deptKey)}
              >
                {DEPARTMENTS[deptKey].label}
              </div>
            ))}
          </div>

          {Object.keys(DEPARTMENTS).map((deptKey) => (
            <div
              key={deptKey}
              className={`dept-panel ${activeDept === deptKey ? "active" : ""}`}
              id={`panel-${deptKey}`}
            >
              <div className="role-list">
                {DEPARTMENTS[deptKey].roles.map((role) => (
                  <div className="role-row" key={role.id || role.name}>
                    <div className="rleft">
                      <span className="rname">{role.name}</span>
                    </div>
                    <button
                      onClick={() => handleViewRoleClick(deptKey)}
                      className="rlink"
                      style={{ border: "none", background: "none", cursor: "pointer" }}
                    >
                      Join Waitlist <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"></div>

      {/* 5. TALENT WAITLIST (#384aff THEME) */}
      <section id="waitlist">
        <div className="wrap">
          <div className="waitlist" data-reveal>
            <div className="waitlist-grid">
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff", marginBottom: "20px" }}>
                  <Users size={14} /> FUTURE OPENINGS
                </div>
                <h2>Join the Talent Waitlist</h2>
                <p>
                  Don't see your specific role listed? Drop your details and resume below. When a suitable opening arises in your target department, our talent team will reach out to you first.
                </p>
              </div>

              <form onSubmit={handleWaitlistSubmit} className="wl-form">
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  required
                >
                  <option value="">Select department</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Product">Product</option>
                  <option value="Operations">Operations</option>
                  <option value="Credit">Credit</option>
                  <option value="IT">IT & Infra</option>
                </select>
                
                <div className="wl-upload">
                  <span style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>
                    <Upload size={18} style={{ marginRight: 10, color: "#ffffff" }} />
                    {resumeFile ? `Selected: ${resumeFile.name}` : "Upload resume (PDF / DOC)"}
                  </span>
                  <span className="btn-tiny">Browse</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <button type="submit" className="wl-submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Join Talent Waitlist"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY JOIN US */}
      <section id="why">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">WHY F2 FINTECH</div>
            <h2>Why Talent <span>Chooses Us</span></h2>
          </div>
          <div className="why-grid" data-reveal>
            <div className="why-item">
              <h3>Meritocracy &gt; Hierarchy</h3>
              <p>Your ideas and contribution drive your progress, free from artificial tenure requirements.</p>
            </div>
            <div className="why-item">
              <h3>Early Decision Power</h3>
              <p>Execute real responsibilities and lead initiative outcomes early in your journey.</p>
            </div>
            <div className="why-item">
              <h3>High-Velocity Domain</h3>
              <p>Work directly with HNI portfolios and lending frameworks shaping modern fintech.</p>
            </div>
            <div className="why-item">
              <h3>Structured Fast-Track</h3>
              <p>Clear milestones from Stage 0 to Stage 1, building high-value industry capabilities.</p>
            </div>
            <div className="why-item">
              <h3>High Impact Mission</h3>
              <p>Directly enable everyday professionals and businesses to unlock financial freedom.</p>
            </div>
            <div className="why-item">
              <h3>Balanced Work Schedule</h3>
              <p>Structured 9-hour shifts, monthly half-day Sundays, and 24 guaranteed paid annual leaves.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 7. BEYOND A PAYCHECK (PERKS & BENEFITS) */}
      <section id="beyond">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">BENEFITS & PERKS</div>
            <h2>Beyond a <span>Paycheck</span></h2>
            <p>Comprehensive perks designed to keep you performing, growing, and thriving.</p>
          </div>

          <div className="perk-grid" data-reveal>
            <div className="perk">
              <div className="perk-icon">
                <HeartPulse size={26} />
              </div>
              <h4>Health & Wellness</h4>
              <p>Daily wellness routines and healthy work habits integrated into the company environment.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <TrendingUp size={26} />
              </div>
              <h4>Upskilling & Growth</h4>
              <p>Access to professional development budgets, domain workshops, and leadership mentorship.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <Award size={26} />
              </div>
              <h4>Accelerated Leadership</h4>
              <p>Fast-track pathways into manager and department head roles based strictly on execution.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <Users size={26} />
              </div>
              <h4>Smart Casual Culture</h4>
              <p>Comfortable, flexible dress code designed for an empowering modern workplace.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <Sparkles size={26} />
              </div>
              <h4>Rewards & Recognition</h4>
              <p>Quarterly performance bonuses, milestone rewards, and public team spotlights.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <Target size={26} />
              </div>
              <h4>Fast-Track Reviews</h4>
              <p>Regular performance evaluations every 3 to 6 months for rapid growth advancement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers modal for applying */}
      <CareersModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedJob(null);
        }}
        selectedJob={selectedJob}
        applicationStatuses={applicationStatuses}
        companyInfo={companyInfo}
      />

      {/* Job details modal */}
      <JobDetailsModal
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedJob(null);
        }}
        selectedJob={selectedJob}
        onApplyClick={handleApplyClick}
      />
    </div>
  );
};

export default Careers;

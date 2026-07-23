import React, { useState, useEffect } from "react";
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
  ShieldCheck
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

  // Waitlist form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Selected job for applying
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
        // Fetch all 4 APIs in parallel
        const [companyRes, jobStatusesRes, appStatusesRes, jobsRes] = await Promise.all([
          axios.get("https://ats-hhcw.onrender.com/companies/companies/f2fintech"),
          axios.get("https://ats-hhcw.onrender.com/job-statuses/all-job-statuses?limit=100"),
          axios.get("https://ats-hhcw.onrender.com/application-statuses/all-application-statuses?page=1&limit=100"),
          axios.get("https://ats-hhcw.onrender.com/jobs/all-jobs?page=1&limit=12&search=&status=Open,Filled,Applied")
        ]);

        if (companyRes.data) {
          console.log("🟢 ATS Company Info:", companyRes.data);
          setCompanyInfo(companyRes.data);
        }
        if (jobStatusesRes.data && jobStatusesRes.data.jobStatuses) {
          console.log("🟢 ATS Job Statuses:", jobStatusesRes.data.jobStatuses);
          setJobStatuses(jobStatusesRes.data.jobStatuses);
        }
        if (appStatusesRes.data && appStatusesRes.data.applicationStatuses) {
          console.log("🟢 ATS Application Statuses:", appStatusesRes.data.applicationStatuses);
          setApplicationStatuses(appStatusesRes.data.applicationStatuses);
        }

        // Process and filter jobs
        let fetchedJobs = [];
        if (jobsRes.data && jobsRes.data.jobs) {
          console.log("🟢 ATS Jobs (Original Response):", jobsRes.data.jobs);
          fetchedJobs = jobsRes.data.jobs;
        }

        // Fallback: If no jobs are returned by the exact URL query, fetch all and filter client-side
        if (fetchedJobs.length === 0) {
          console.log("⚠️ Original jobs list was empty. Fetching fallback list...");
          const fallbackJobsRes = await axios.get("https://ats-hhcw.onrender.com/jobs/all-jobs?limit=100");
          if (fallbackJobsRes.data && fallbackJobsRes.data.jobs) {
            console.log("🟢 ATS Jobs (Fallback List):", fallbackJobsRes.data.jobs);
            const statusesList = jobStatusesRes.data?.jobStatuses || [];
            const allowedStatusNames = ["Open", "Filled", "Applied"];
            const f2fStatusIds = statusesList
              .filter(s => s.company_id === "682858bb96c2ed0759146648" && allowedStatusNames.includes(s.jobStatus.trim()))
              .map(s => s._id);

            fetchedJobs = fallbackJobsRes.data.jobs.filter(job => {
              const isF2F = job.company_id?.CompanyUserName === "f2fintech" || job.company_id?._id === "682858bb96c2ed0759146648";
              const hasAllowedStatus = f2fStatusIds.includes(job.status);
              return isF2F && hasAllowedStatus;
            });
            console.log("🟢 ATS Jobs Filtered Client-Side for f2fintech:", fetchedJobs);
          }
        } else {
          fetchedJobs = fetchedJobs.filter(job => job.company_id?.CompanyUserName === "f2fintech" || job.company_id?._id === "682858bb96c2ed0759146648");
          console.log("🟢 ATS Jobs Filtered for f2fintech:", fetchedJobs);
        }

        setApiJobs(fetchedJobs);
      } catch (err) {
        console.error("Error fetching ATS data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchATSData();
  }, []);

  const getJobStatusLabel = (statusId) => {
    const statusObj = jobStatuses.find(s => s._id === statusId);
    return statusObj ? statusObj.jobStatus : "Open";
  };

  const getJobIcon = (title) => {
    const lowerTitle = (title || "").toLowerCase();
    let icon;
    if (lowerTitle.includes("sales")) {
      icon = <TrendingUp size={20} />;
    } else if (lowerTitle.includes("marketing") || lowerTitle.includes("design") || lowerTitle.includes("graphic") || lowerTitle.includes("video")) {
      icon = <Megaphone size={20} />;
    } else if (lowerTitle.includes("credit") || lowerTitle.includes("risk") || lowerTitle.includes("underwriter")) {
      icon = <Scale size={20} />;
    } else if (lowerTitle.includes("developer") || lowerTitle.includes("it") || lowerTitle.includes("software") || lowerTitle.includes("tech")) {
      icon = <Award size={20} />;
    } else {
      icon = <Briefcase size={20} />;
    }
    return <div className="job-icon-box">{icon}</div>;
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

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
  }, []);

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
      // 1. Upload resume to S3
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 10);
      const extension = resumeFile.name.split(".").pop();
      const uniqueFileName = `resume-${timestamp}-${randomString}.${extension}`;

      const uploadRes = await API.DocumentAPI.uploadDocument({
        document: resumeFile,
        folder: `document/careers/${uniqueFileName}`,
      });

      if (uploadRes.data && uploadRes.data.status === "Success") {
        uploadedResumeUrl = uploadRes.data.data || uploadRes.data.fileUrl;
      } else {
        throw new Error("Resume upload failed");
      }

      // 2. Submit the details to /careers
      // Satisfy non-nullable DB fields: contact, state, city
      const payload = {
        name: fullName,
        email: email,
        position: `Waitlist - ${selectedDept}`,
        contact: "N/A",
        state: "N/A",
        city: "N/A",
        organization: "N/A",
        description: `Selected Department: ${selectedDept}\nUploaded Resume URL: ${uploadedResumeUrl}`,
      };

      await postCareer(payload);

      toast.success("✅ Successfully joined the waitlist!");
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

    // Map internal key to select value
    const deptLabel = DEPARTMENTS[deptKey]?.label || "";
    setSelectedDept(deptLabel);
  };

  return (
    <div className="careers-page-container">
      {/* HERO SECTION */}
      <header className="hero">
        <div className="wrap">
          <div>
            <div className="eyebrow">
              <Award size={14} style={{ marginRight: 6 }} /> Careers at F2finTech
            </div>
            <h1>
              Help people reach <em>financial freedom.</em>
              <br />
              Start with your own.
            </h1>
            <p className="lead">
              We work across investment, insurance, and loans - for HNI clients and everyday professionals alike. Join us, and we'll help you grow from Stage 0 to Stage 1: a real identity, real decisions, real understanding of how this industry works.
            </p>
            <div className="cta-row">
              <a href="#openings" className="btn btn-gold">
                View Current Openings
              </a>
              <a href="#departments" className="btn btn-outline">
                Browse All Roles
              </a>
            </div>
          </div>
          <div className="chart-card" data-reveal>
            <div className="stage-label">
              <span>GROWTH TRACK</span>
              <span>STAGE 0 → STAGE 1</span>
            </div>
            <svg viewBox="0 0 320 160" preserveAspectRatio="none">
              <path
                className="path"
                d="M10,140 C60,140 60,110 90,100 C130,86 130,60 170,50 C210,40 220,20 300,15"
              />
              <circle className="dot" cx="10" cy="140" r="5" />
              <circle className="dot" cx="90" cy="100" r="5" />
              <circle className="dot" cx="170" cy="50" r="5" />
              <circle className="dot" cx="300" cy="15" r="6" />
            </svg>
            <div className="stage-tags">
              <span>
                Day 1 - <b>Identity</b>
              </span>
              <span>
                90 Days - <b>Ownership</b>
              </span>
              <span>
                Year 1 - <b>Stage 1</b>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="divider"></div>

      {/* 1. ABOUT */}
      <section id="about">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">01 - Who we are</div>
            <h2>F2finTech</h2>
          </div>
          <div className="about-grid">
            <div data-reveal>
              <p>
                F2finTech, established in 2022, is a fintech company making financial services more accessible, transparent, and efficient - across investment, insurance, and loans. We work with HNI clients as well as everyday professionals, business owners, and home buyers, with one goal: helping people reach financial freedom.
              </p>
              <p>
                Our team spans sales, marketing, IT, HR, operations, credit, and product - all working toward that same mission, one client relationship at a time.
              </p>
            </div>
            <div className="stat-strip" data-reveal>
              <div className="stat-box">
                <div className="stat-icon-box">
                  <Calendar size={20} />
                </div>
                <div className="num">2022</div>
                <div className="lbl">Est. - where we started</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon-box">
                  <Building2 size={20} />
                </div>
                <div className="num">7</div>
                <div className="lbl">Departments hiring</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon-box">
                  <Briefcase size={20} />
                </div>
                <div className="num">3</div>
                <div className="lbl">Core offerings - investment, insurance, loans</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon-box">
                  <UserCheck size={20} />
                </div>
                <div className="num">HNI</div>
                <div className="lbl">+ everyday professionals & home buyers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 2. CULTURE */}
      <section id="culture">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">02 - How we work</div>
            <h2>A work culture built on ownership</h2>
            <p>
              We believe in giving people real ownership. Whether you're closing deals, managing credit, writing code, or crafting campaigns - your work shapes the company, and your opinions matter, regardless of designation.
            </p>
          </div>
          <div className="culture-cards" data-reveal>
            <div className="c-card">
              <div className="culture-icon-box">
                <TrendingUp size={24} />
              </div>
              <h3>
                Stage <span>0 → 1</span>
              </h3>
              <p>
                We take real interest in your growth - building your professional identity and understanding how the financial industry actually works.
              </p>
            </div>
            <div className="c-card">
              <div className="culture-icon-box">
                <Target size={24} />
              </div>
              <h3>
                Real <span>Responsibility</span>
              </h3>
              <p>
                You won't just be handed tasks. You'll get real decision-making power, early on - and be trusted to use it.
              </p>
            </div>
            <div className="c-card">
              <div className="culture-icon-box">
                <MessageSquare size={24} />
              </div>
              <h3>
                Your <span>Voice</span> Matters
              </h3>
              <p>
                Opinions and ideas count here regardless of designation. If you want to learn and grow, this is a great place to start.
              </p>
            </div>
          </div>
          <div className="schedule-row" data-reveal>
            <div className="pill-stat">
              <Clock size={16} /> <b>9-hr</b> shifts - 8 hrs work + 1 hr break
            </div>
            <div className="pill-stat">
              <Calendar size={16} /> 6-day week, <b>half day</b> last Sunday of the month
            </div>
            <div className="pill-stat">
              <Briefcase size={16} /> <b>2</b> paid leaves/month - 24/year
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 3. CURRENT OPENINGS */}
      <section id="openings">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">03 - Right now</div>
            <h2>Current Openings</h2>
            <p>Roles we're actively hiring for. This list is managed and updated directly by our HR team.</p>
          </div>
          <div className="openings-note">
            <span className="live-dot"></span> Live - updated by HR
          </div>
          <div className="opening-grid" data-reveal>
            {loading ? (
              <div className="loading-state" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--slate)" }}>
                <span className="live-dot" style={{ display: "inline-block", marginRight: "10px" }}></span> Loading active openings...
              </div>
            ) : apiJobs.length > 0 ? (
              apiJobs.map((job) => (
                <div className="job-card" key={job._id}>
                  <span className={`tag-${getJobStatusLabel(job.status).toLowerCase().replace(/\s+/g, "") || "open"}`}>
                    {getJobStatusLabel(job.status)}
                  </span>
                  {getJobIcon(job.title)}
                  <h4>{job.title}</h4>
                  <div className="job-subtitle">
                    {job.type} | {job.scheduleType || "Flexible"}
                  </div>
                  <div className="job-location">
                    {job.city ? `${job.city}, ${job.state || ""}, ${job.country || "IN"}` : "Noida, UP, IN"}
                  </div>
                  <div className="job-location-type">
                    {job.locationType || "On-site"}
                  </div>
                  <div className="job-compensation">
                    {job.compensation ? (job.compensation.includes("₹") ? job.compensation : `₹${job.compensation}/Month`) : "Not Disclosed"}
                  </div>

                  <div className="job-desc-snippet">
                    📯 {getSnippet(job.description)}
                  </div>

                  <div className="job-card-footer">
                    <span className="job-exp">
                      {job.experienceRequired || "0-2"} Years Experience.
                    </span>
                    <div className="job-actions">
                      <button 
                        onClick={() => {
                          setSelectedJob(job);
                          setDetailsOpen(true);
                        }} 
                        className="btn-details"
                      >
                        View Details
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
              <div className="no-openings" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--slate)" }}>
                <p>No active openings at the moment. You can still join our waitlist below!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* 4. ALL DEPARTMENTS */}
      <section id="departments">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">04 - Every path</div>
            <h2>All roles, across departments</h2>
            <p>
              Not open right now doesn't mean not available to you. Every role below can be applied to - click a department, then a role, and either apply directly or join the waitlist.
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
                  <div className="role-row" key={role.id}>
                    <div className="rleft">
                      <span className="ridx">{role.name ? role.id : ""}</span>
                      <span className="rname">{role.name}</span>
                    </div>
                    <button
                      onClick={() => handleViewRoleClick(deptKey)}
                      className="rlink"
                      style={{ border: "none", background: "none", cursor: "pointer" }}
                    >
                      View role <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"></div>

      {/* 5. WAITLIST */}
      <section id="waitlist">
        <div className="wrap">
          <div className="waitlist" data-reveal>
            <div className="waitlist-grid">
              <div>
                <h2>Don't see your role open?</h2>
                <p>
                  Join the waitlist. The moment a matching position opens up in your chosen department, our HR team will reach out to you directly.
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
                  <option value="IT">IT</option>
                </select>
                <div className="wl-upload">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Upload size={18} style={{ marginRight: 10, opacity: 0.8 }} />
                    {resumeFile ? `Selected: ${resumeFile.name}` : "Upload your resume (PDF/DOC)"}
                  </span>
                  <span className="btn-tiny">Choose file</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <button type="submit" className="wl-submit" disabled={submitting}>
                  {submitting ? "Joining..." : "Join the Waitlist"}
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
            <div className="eyebrow">06 - Why join us</div>
            <h2>A few reasons people stay</h2>
          </div>
          <div className="why-grid" data-reveal>
            <div className="why-item">
              <span className="idx">01</span>
              <h3>Team &gt; Titles</h3>
              <p>Your opinions and ideas are valued here, regardless of your designation or experience level.</p>
            </div>
            <div className="why-item">
              <span className="idx">02</span>
              <h3>Real decision-making, early</h3>
              <p>You get responsibility and decision-making power well before most companies would give it to you.</p>
            </div>
            <div className="why-item">
              <span className="idx">03</span>
              <h3>Learn how the industry works</h3>
              <p>Work directly with HNI clients and real portfolios across investment, insurance, and loans.</p>
            </div>
            <div className="why-item">
              <span className="idx">04</span>
              <h3>Structured growth</h3>
              <p>We help you move from Stage 0 to Stage 1 - building an identity and skillset, not just a job title.</p>
            </div>
            <div className="why-item">
              <span className="idx">05</span>
              <h3>Work with purpose</h3>
              <p>Everything we do points at one goal: helping people reach financial freedom, including our own team.</p>
            </div>
            <div className="why-item">
              <span className="idx">06</span>
              <h3>Fair hours, honest leave</h3>
              <p>9-hour shifts, a half-day last Sunday of the month, and 24 paid leaves a year.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* BEYOND A PAYCHECK */}
      <section id="beyond">
        <div className="wrap">
          <div className="sec-head" style={{ maxWidth: "640px" }}>
            <div className="eyebrow">07 - What we provide</div>
            <h2>Beyond a paycheck</h2>
            <p>Compensation is just the start. Here's what else comes with joining F2finTech.</p>
          </div>
          <div className="perk-grid" data-reveal>
            <div className="perk">
              <div className="perk-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </div>
              <h4>Health & Wellness</h4>
              <p>Daily exercise built into the routine, not an afterthought.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M21 7v6h-6" />
                </svg>
              </div>
              <h4>Upskilling & Growth</h4>
              <p>Real opportunities to build new skills and move forward.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l2.6 6.6L21 9l-5 4.4L17.4 20 12 16.4 6.6 20 8 13.4 3 9l6.4-.4z" />
                </svg>
              </div>
              <h4>Leadership</h4>
              <p>A clear path to lead, not just execute.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M6 3v18M6 3l9 4-9 4" />
                </svg>
              </div>
              <h4>No Formal Dress Code</h4>
              <p>Come as you are - no formal outfits on a daily basis.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="8" width="18" height="13" rx="1" />
                  <path d="M3 12h18M12 8v13M8 8a2.5 2.5 0 1 1 4-3 2.5 2.5 0 1 1 4 3" />
                </svg>
              </div>
              <h4>Rewards & Recognition</h4>
              <p>Good work gets noticed - and rewarded.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 20V10M12 10l-4 4M12 10l4 4M6 20h12" />
                </svg>
              </div>
              <h4>Promotion Every 3–6 Months</h4>
              <p>Regular opportunities to move up, not once-a-year reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers modal for applying specifically */}
      <CareersModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedJob(null);
        }}
        selectedJob={selectedJob}
        applicationStatuses={applicationStatuses}
      />

      {/* Job details modal */}
      <JobDetailsModal
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedJob(null);
        }}
        selectedJob={selectedJob}
        onApplyClick={(job) => {
          setSelectedJob(job);
          setModalOpen(true);
        }}
      />
    </div>
  );
};

export default Careers;

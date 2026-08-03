import React, { useState, useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { postCareer } from "../../apis/CareersAPI";
import API from "../../apis";
import axios from "axios";
import CareersModal from "./CareersModal";
import JobDetailsModal from "./JobDetailsModal";
import WaitlistModal from "./WaitlistModal";
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
  ChevronLeft,
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
  HeartPulse,
  BadgeCheck,
  Star,
} from "lucide-react";
import "./Careers.css";

/* ─── DEPARTMENTS DATA ─────────────────────────────────────── */
const DEPARTMENTS = {
  sales: {
    label: "Sales",
    roles: [
      { id: "01", name: "Sales Manager" },
      { id: "02", name: "Team Lead - Sales" },
      { id: "03", name: "Sales Executive" },
    ],
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
    ],
  },
  hr: {
    label: "HR",
    roles: [
      { id: "01", name: "HR Manager & Business Partner (HRBP)" },
      { id: "02", name: "HR Manager" },
      { id: "03", name: "HR Assistant Manager" },
      { id: "04", name: "HR Executive" },
    ],
  },
  product: {
    label: "Product",
    roles: [
      { id: "01", name: "Product Director" },
      { id: "02", name: "Product Manager" },
      { id: "03", name: "Associate Product Manager (Executive)" },
      { id: "04", name: "Jr. Product Manager (Executive)" },
    ],
  },
  operations: {
    label: "Operations",
    roles: [
      { id: "01", name: "Operations Manager" },
      { id: "02", name: "Assistant Operations Manager" },
      { id: "03", name: "Operations Executive" },
    ],
  },
  credit: {
    label: "Credit",
    roles: [
      { id: "01", name: "Credit Manager" },
      { id: "02", name: "Assistant Credit Manager" },
      { id: "03", name: "Credit Executive" },
    ],
  },
  it: {
    label: "IT & Infra",
    roles: [
      { id: "01", name: "Software Developer" },
      { id: "02", name: "Full Stack Developer" },
      { id: "03", name: "Sr. Tech Head" },
      { id: "04", name: "IT Infra & Networking" },
      { id: "05", name: "IT Infra Support" },
    ],
  },
  data: {
    label: "Data",
    roles: [
      { id: "01", name: "Data Analyst" },
      { id: "02", name: "Business Analyst" },
      { id: "03", name: "Data Scientist" },
      { id: "04", name: "Data Entry Operator" },
    ],
  },
  finance: {
    label: "Finance",
    roles: [
      { id: "01", name: "Finance Manager" },
      { id: "02", name: "Finance Assistant Manager" },
      { id: "03", name: "Finance Executive" },
    ],
  },
  other: { label: "Other", roles: [] },
};

/* ─── HELPERS ─────────────────────────────────────────────── */
const getSnippet = (htmlStr) => {
  if (!htmlStr) return "";
  const cleanText = htmlStr.replace(/<\/?[^>]+(>|$)/g, "");
  const limit = 110;
  if (cleanText.length <= limit) return cleanText;
  return cleanText.substring(0, limit) + "…";
};

/* ─── MARQUEE ITEMS ───────────────────────────────────────── */
const MARQUEE_ITEMS = [
  { icon: <BadgeCheck size={14} />, label: "India's Leading Fintech Platform" },
  { icon: <Star size={14} />, label: "11,000+ Happy Clients" },
  { icon: <Zap size={14} />, label: "1,100+ Cr Loans Disbursed" },
  { icon: <BadgeCheck size={14} />, label: "40+ Lender Partners" },
  { icon: <Users size={14} />, label: "7+ Hiring Departments" },
  { icon: <TrendingUp size={14} />, label: "IIM Lucknow Incubated Startup" },
  { icon: <ShieldCheck size={14} />, label: "Startup India Recognised" },
];

/* ─── TEAM PHOTOS (used in photo marquee) ─────────────────── */
const TEAM_PHOTOS = [
  "/abt1.webp",
  "/abt2.webp",
  "/abt3.webp",
  "/abt9.webp",
  "/abt2025-4.webp",
  "/abt2025-13.webp",
  "/abt2025-14.webp",
];

/* ─── CAROUSEL IMAGES ─────────────────────────────────────── */
const CAROUSEL_IMAGES = [
  "/abt1.webp",
  "/abt2.webp",
  "/abt3.webp",
  "/abt9.webp",
  "/abt2025-4.webp",
  "/abt2025-13.webp",
  "/abt2025-14.webp",
];

/* ============================================================
 * MAIN COMPONENT
 * ============================================================ */
const Careers = () => {
  // ── Modal controls ──
  const [modalOpen, setModalOpen] = useState(false);

  // ── Tab switching ──
  const [activeDept, setActiveDept] = useState("sales");

  // ── Search & filter ──
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ── Waitlist form ──
  const [selectedDept, setSelectedDept] = useState("");
  const [otherDept, setOtherDept] = useState("");
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);

  // ── Job selection ──
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // ── ATS API state ──
  const [companyInfo, setCompanyInfo] = useState(null);
  const [jobStatuses, setJobStatuses] = useState([]);
  const [applicationStatuses, setApplicationStatuses] = useState([]);
  const [apiJobs, setApiJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Hero Carousel ──
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselTimer = useRef(null);

  /* ── Start / reset carousel auto-play ── */
  const startCarouselTimer = () => {
    clearInterval(carouselTimer.current);
    carouselTimer.current = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4500);
  };

  useEffect(() => {
    startCarouselTimer();
    return () => clearInterval(carouselTimer.current);
  }, []);

  const goPrev = () => {
    setCarouselIdx((prev) =>
      prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1
    );
    startCarouselTimer();
  };
  const goNext = () => {
    setCarouselIdx((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    startCarouselTimer();
  };

  /* ── Fetch ATS data ── */
  useEffect(() => {
    const fetchATSData = async () => {
      try {
        setLoading(true);
        const BASE_URL = "https://ats-web-7ysc.onrender.com";

        const companyRes = await axios.get(
          `${BASE_URL}/companies/companies/f2fintech`
        );
        const company = companyRes.data;
        if (company) setCompanyInfo(company);

        const companyId =
          company?._id ||
          company?.id ||
          "572691c9-cc32-45be-b82b-13ee432b805b";

        const [jobStatusesRes, appStatusesRes, jobsRes] = await Promise.all([
          axios
            .get(`${BASE_URL}/job-statuses/all-job-statuses`, {
              headers: { Company_id: companyId },
            })
            .catch(() => ({ data: {} })),
          axios
            .get(
              `${BASE_URL}/application-statuses/all-application-statuses?page=1&limit=100`,
              { headers: { Company_id: companyId } }
            )
            .catch(() => ({ data: {} })),
          axios.get(
            `${BASE_URL}/jobs/all-jobs?page=1&limit=12&search=&status=Open,Filled,Applied`,
            { headers: { Company_id: companyId } }
          ),
        ]);

        if (
          jobStatusesRes.data &&
          (jobStatusesRes.data.jobStatuses || jobStatusesRes.data.data)
        ) {
          setJobStatuses(
            jobStatusesRes.data.jobStatuses || jobStatusesRes.data.data
          );
        }
        if (
          appStatusesRes.data &&
          (appStatusesRes.data.applicationStatuses || appStatusesRes.data.data)
        ) {
          setApplicationStatuses(
            appStatusesRes.data.applicationStatuses || appStatusesRes.data.data
          );
        }

        const fetchedJobs =
          jobsRes.data?.jobs ||
          jobsRes.data?.data ||
          (Array.isArray(jobsRes.data) ? jobsRes.data : []);

        const formattedJobs = (Array.isArray(fetchedJobs) ? fetchedJobs : []).map((job) => {
          if (!job.title) return job;
          const capitalizedTitle = job.title
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          return { ...job, title: capitalizedTitle };
        });

        setApiJobs(formattedJobs);
      } catch (err) {
        console.error("Error fetching ATS data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchATSData();
  }, []);

  /* ── Helpers ── */
  const getJobStatusLabel = (statusId) => {
    if (!statusId) return "Open";
    const statusObj = jobStatuses.find(
      (s) => s._id === statusId || s.id === statusId
    );
    if (statusObj) return statusObj.jobStatus;
    if (
      typeof statusId === "string" &&
      !statusId.match(/^[0-9a-fA-F]{24}$/) &&
      !statusId.match(/^[0-9a-fA-F-]{36}$/)
    )
      return statusId;
    return "Open";
  };

  const getStatusClass = (label) => {
    const l = (label || "").toLowerCase();
    if (l.includes("fill")) return "status-filled";
    if (l.includes("appli")) return "status-applied";
    return "status-open";
  };

  const getJobIcon = (title) => {
    const t = (title || "").toLowerCase();
    if (t.includes("sales")) return <TrendingUp size={22} />;
    if (
      t.includes("marketing") ||
      t.includes("design") ||
      t.includes("video")
    )
      return <Megaphone size={22} />;
    if (t.includes("credit") || t.includes("risk"))
      return <Scale size={22} />;
    if (
      t.includes("developer") ||
      t.includes("it") ||
      t.includes("software") ||
      t.includes("tech")
    )
      return <Award size={22} />;
    if (t.includes("hr") || t.includes("human")) return <Users size={22} />;
    if (t.includes("product")) return <Target size={22} />;
    return <Briefcase size={22} />;
  };

  /* ── Filter jobs ── */
  const filteredJobs = useMemo(() => {
    return apiJobs.filter((job) => {
      const title = (job.title || "").toLowerCase();
      const desc = (job.description || "").toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query || title.includes(query) || desc.includes(query);

      let matchesCategory = true;
      if (selectedCategory !== "all") {
        if (selectedCategory === "sales")
          matchesCategory = title.includes("sales");
        else if (selectedCategory === "marketing")
          matchesCategory =
            title.includes("marketing") ||
            title.includes("designer") ||
            title.includes("video") ||
            title.includes("seo");
        else if (selectedCategory === "hr")
          matchesCategory =
            title.includes("hr") || title.includes("human");
        else if (selectedCategory === "it")
          matchesCategory =
            title.includes("developer") ||
            title.includes("tech") ||
            title.includes("it") ||
            title.includes("software");
        else if (selectedCategory === "product")
          matchesCategory = title.includes("product");
        else if (selectedCategory === "credit")
          matchesCategory =
            title.includes("credit") || title.includes("risk");
        else if (selectedCategory === "operations")
          matchesCategory =
            title.includes("operations") || title.includes("op");
        else if (selectedCategory === "data")
          matchesCategory =
            title.includes("data") || title.includes("analyst");
        else if (selectedCategory === "finance")
          matchesCategory =
            title.includes("finance") || title.includes("financial") || title.includes("account");
      }

      return matchesQuery && matchesCategory;
    });
  }, [apiJobs, searchQuery, selectedCategory]);

  /* ── Scroll reveal ── */
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
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => revealEls.forEach((el) => io.unobserve(el));
  }, [filteredJobs]);

  /* ── File select ── */
  /* ── Preselect dept and open waitlist modal ── */
  const handleViewRoleClick = (deptKey, roleName = "") => {
    if (deptKey === "other") {
      setSelectedDept("Other");
      setOtherDept("");
    } else {
      const deptLabel = DEPARTMENTS[deptKey]?.label || "";
      setSelectedDept(deptLabel);
      setOtherDept(roleName);
    }
    setWaitlistModalOpen(true);
  };

  /* ── Apply click ── */
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  /* ============================================================
   * RENDER
   * ============================================================ */
  return (
    <div className="careers-page-container">

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <header className="careers-hero">



        {/* ── Hero Main Layout ── */}
        <div className="hero-main-content">
          {/* Left — text */}
          <div className="hero-text-col">
            <div className="hero-eyebrow">
              <Sparkles size={13} /> WE'RE HIRING · JOIN F2 FINTECH
            </div>

            <h1 className="hero-h1">
              Shape Financial Freedom.
              <br />
              <em>Build Your Legacy.</em>
            </h1>

            <p className="hero-lead">
              We empower professionals, business owners, and home buyers with
              world-class investment, insurance, and loan solutions. Step into
              an environment where ownership, rapid growth, and real industry
              impact define your day one.
            </p>

            {/* Search */}
            <div className="hero-search-box">
              <Search size={18} color="#64748b" />
              <input
                type="text"
                placeholder="Search job titles or keywords…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="btn-search"
                onClick={() =>
                  document
                    .getElementById("openings")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Search <ArrowRight size={15} />
              </button>
            </div>

            {/* CTAs */}
            <div className="hero-cta-row">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() =>
                  document
                    .getElementById("openings")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Openings ({apiJobs.length})
              </button>
              <button
                type="button"
                className="btn-hero-outline"
                onClick={() =>
                  document
                    .getElementById("departments")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Browse Departments
              </button>
            </div>
          </div>

          {/* Right — image carousel */}
          <div className="hero-carousel-col">
            <div className="hero-carousel">
              {/* Slides */}
              {CAROUSEL_IMAGES.map((src, idx) => (
                <div
                  key={src}
                  className={`hc-slide${carouselIdx === idx ? " active" : ""}`}
                >
                  <img src={src} alt={`F2 Fintech team ${idx + 1}`} />
                </div>
              ))}

              {/* Overlay gradient */}
              <div className="hc-overlay" />

              {/* Live badge */}
              <div className="hc-live-badge">
                <span className="live-pulse" />
                LIVE OPENINGS
              </div>

              {/* Dot navigation */}
              <div className="hc-dots">
                {CAROUSEL_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    className={`hc-dot${carouselIdx === idx ? " active" : ""}`}
                    onClick={() => {
                      setCarouselIdx(idx);
                      startCarouselTimer();
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>


              {/* Stat chips */}
              <div className="hc-stat-chips">
                <div className="hc-chip">
                  <Briefcase size={12} />
                  <span className="chip-val">{apiJobs.length || "12"}+</span> Open Roles
                </div>
                <div className="hc-chip">
                  <Building2 size={12} />
                  <span className="chip-val">7+</span> Departments
                </div>
                <div className="hc-chip">
                  <TrendingUp size={12} />
                  <span className="chip-val">100%</span> Growth
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="c-divider" />

      {/* ══════════════════════════════════════════════════════
          ABOUT / METRICS
      ══════════════════════════════════════════════════════ */}
      <section id="about">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">WHO WE ARE</div>
            <h2>F2 Fintech <span>Ecosystem</span></h2>
            <p>
              Founded in 2022, F2 Fintech makes core financial services
              transparent, accessible, and high-impact — from HNIs to everyday
              professionals, driving meaningful outcomes in investment,
              insurance, and lending.
            </p>
          </div>

          <div className="about-metrics-grid" data-reveal>
            {[
              { icon: <Calendar size={24} />, num: "2022", lbl: "Established — Fintech Future" },
              { icon: <Building2 size={24} />, num: "7+", lbl: "Active Hiring Departments" },
              { icon: <Briefcase size={24} />, num: "3", lbl: "Core Vertical Offerings" },
              { icon: <UserCheck size={24} />, num: "HNI", lbl: "+ Retail & Home Buyers" },
            ].map((m) => (
              <div className="about-metric-card" key={m.lbl}>
                <div className="metric-icon-box">{m.icon}</div>
                <div className="metric-num">{m.num}</div>
                <div className="metric-lbl">{m.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="c-divider" />

      {/* ══════════════════════════════════════════════════════
          CULTURE SECTION
      ══════════════════════════════════════════════════════ */}
      <section id="culture">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">OUR WORK CULTURE</div>
            <h2>Built on <span>Radical Ownership</span></h2>
            <p>
              We believe great execution starts with real decision-making
              authority. Your contribution directly moves the needle — from day
              one.
            </p>
          </div>

          <div className="culture-cards-grid" data-reveal>
            {[
              {
                icon: <TrendingUp size={28} />,
                title: <>Stage <span>0 → 1</span> Fast Track</>,
                desc:
                  "We accelerate your professional growth, helping you master real industry mechanics and establish a market-defining professional identity.",
              },
              {
                icon: <Target size={28} />,
                title: <>Direct <span>Responsibility</span></>,
                desc:
                  "No rigid micro-management. You are trusted with strategic autonomy and execution ownership right from your first week.",
              },
              {
                icon: <MessageSquare size={28} />,
                title: <>Your <span>Voice</span> Matters</>,
                desc:
                  "Ideas win regardless of designation. We foster an open hierarchy where fresh perspective and sharp execution are recognised instantly.",
              },
            ].map((c, i) => (
              <div className="culture-card" key={i}>
                <div className="culture-icon-wrap">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Schedule pills */}
          <div className="schedule-pills" data-reveal>
            <div className="schedule-pill">
              <Clock size={18} />
              <span><b>9-Hour Shifts</b> — 8 hrs work + 1 hr break</span>
            </div>
            <div className="schedule-pill">
              <Calendar size={18} />
              <span>6-day week, <b>half day</b> last Sunday of the month</span>
            </div>
            <div className="schedule-pill">
              <Briefcase size={18} />
              <span><b>24 Paid Leaves</b> per year (2/month)</span>
            </div>
          </div>
        </div>
      </section>

      <div className="c-divider" />

      {/* ══════════════════════════════════════════════════════
          CURRENT OPENINGS
      ══════════════════════════════════════════════════════ */}
      <section id="openings">
        <div className="wrap">
          <div className="openings-header">
            <div className="openings-title-area">
              <div className="openings-eyebrow-row">
                <span className="eyebrow">OPEN ROLES</span>
                <span className="openings-live-badge-inline">
                  <span className="live-pulse" />
                  Live HR Feed Active
                </span>
              </div>
              <h2>Current <span>Openings</span></h2>
              <p>
                Explore actively open positions managed in real-time by our
                talent acquisition team.
              </p>
            </div>

            {/* Category filter */}
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
                { id: "data", label: "Data" },
                { id: "finance", label: "Finance" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-pill${selectedCategory === cat.id ? " active" : ""
                    }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs grid */}
          <div className="openings-grid" data-reveal>
            {loading ? (
              <div className="jobs-loading" style={{ gridColumn: "1 / -1" }}>
                <span className="live-pulse" />
                Loading active job openings…
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                const statusLabel = getJobStatusLabel(job.status);
                const statusClass = getStatusClass(statusLabel);

                // Parse experience
                let expArr = [];
                try {
                  const raw = job.experienceRequired;
                  if (Array.isArray(raw)) expArr = raw;
                  else if (typeof raw === "string") {
                    const parsed = JSON.parse(raw);
                    expArr = Array.isArray(parsed) ? parsed : [parsed];
                  }
                } catch {
                  expArr = job.experienceRequired
                    ? [job.experienceRequired]
                    : [];
                }

                const skillArr = Array.isArray(job.skillsRequired)
                  ? job.skillsRequired
                  : job.skillsRequired
                    ? [job.skillsRequired]
                    : [];

                return (
                  <div className="job-card" key={job._id || job.id}>
                    {/* Card top */}
                    <div className="job-card-top">
                      <div className="job-icon-box">
                        {getJobIcon(job.title)}
                      </div>
                      <span
                        className={`job-status-badge ${statusClass}`}
                      >
                        {statusLabel}
                      </span>
                    </div>

                    <h4>{job.title}</h4>

                    {/* Meta row */}
                    <div className="job-meta-row">
                      <span className="job-meta-pill">
                        <Briefcase size={11} />
                        {job.type || "Full Time"}
                      </span>
                      <span className="job-meta-pill">
                        <MapPin size={11} />
                        {job.city
                          ? `${job.city}, ${job.state || ""}`
                          : "Noida, UP"}
                      </span>
                      {job.scheduleType && (
                        <span className="job-meta-pill">
                          <Clock size={11} />
                          {job.scheduleType}
                        </span>
                      )}
                    </div>

                    {/* Salary */}
                    <div className="job-salary">
                      <DollarSign size={14} />
                      {job.compensation
                        ? job.compensation.includes("₹")
                          ? job.compensation
                          : `₹${job.compensation}`
                        : "Not Disclosed"}
                    </div>

                    {/* Tags */}
                    {skillArr.length > 0 && (
                      <div className="job-tags-container">
                        <div className="job-tags-label">Experience Required:</div>
                        <div className="job-tags">
                          {skillArr.slice(0, 4).map((sk, i) => {
                            const rawExp = expArr[i];
                            let cleanExp = "";
                            if (rawExp) {
                              const expStr = String(rawExp).toLowerCase()
                                .replace(/\s*yrs\s*/g, "")
                                .replace(/\s*exp\s*/g, "")
                                .replace(/\s*years\s*/g, "")
                                .replace(/\s*year\s*/g, "")
                                .trim();
                              cleanExp = ` (${expStr} Yrs)`;
                            }
                            return (
                              <span className="job-tag job-tag--skill-exp" key={`sk-${i}`}>
                                <Award size={10} />
                                {sk}{cleanExp}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Description snippet */}
                    <p className="job-desc-text">
                      {getSnippet(job.description)}
                    </p>

                    {/* Footer actions */}
                    <div className="job-card-footer">
                      <button
                        className="btn-details"
                        onClick={() => {
                          setSelectedJob(job);
                          setDetailsOpen(true);
                        }}
                      >
                        Details
                      </button>
                      <button
                        className="btn-apply"
                        onClick={() => handleApplyClick(job)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-openings">
                <p>No matching openings found right now.</p>
                <p>
                  Submit your resume directly to our talent waitlist below!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Marquee Strip ── */}
      {/* <div className="hero-marquee-wrap">
        <div className="hero-marquee-track">
          {[...Array(4)].flatMap((_, rep) =>
            MARQUEE_ITEMS.map((item, j) => (
              <div key={`${rep}-${j}`} className="hero-marquee-item">
                <span className="mq-icon">{item.icon}</span>
                <span>{item.label}</span>
                <span className="hero-marquee-dot">•</span>
              </div>
            ))
          )}
        </div>
      </div> */}

      {/* ══════════════════════════════════════════════════════
          DEPARTMENTS EXPLORER
      ══════════════════════════════════════════════════════ */}
      <section id="departments">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">DEPARTMENTS & ROLES</div>
            <h2>Explore Every <span>Career Path</span></h2>
            <p>
              Discover all role tracks across F2 Fintech. Click a department
              tab to explore available titles.
            </p>
          </div>

          {/* Tabs */}
          <div className="dept-tabs-wrap">
            {Object.keys(DEPARTMENTS).map((deptKey) => (
              <button
                key={deptKey}
                className={`dept-tab${activeDept === deptKey ? " active" : ""
                  }`}
                onClick={() => setActiveDept(deptKey)}
              >
                {DEPARTMENTS[deptKey].label}
              </button>
            ))}
          </div>

          {/* Panels */}
          {Object.keys(DEPARTMENTS).map((deptKey) => (
            <div
              key={deptKey}
              className={`dept-panel${activeDept === deptKey ? " active" : ""
                }`}
            >
              {deptKey === "other" ? (
                <div className="other-dept-cta">
                  <h3>Can't find your department?</h3>
                  <button
                    className="btn-other-wl"
                    onClick={() => handleViewRoleClick("other")}
                  >
                    Join Talent Waitlist
                  </button>
                </div>
              ) : (
                <div className="role-list">
                  {DEPARTMENTS[deptKey].roles.map((role) => (
                    <div className="role-row" key={role.id || role.name}>
                      <span className="role-name">{role.name}</span>
                      <button
                        className="btn-join-wl"
                        onClick={() =>
                          handleViewRoleClick(deptKey, role.name)
                        }
                      >
                        Join Waitlist <ChevronRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="c-divider" />

      {/* ══════════════════════════════════════════════════════
          TALENT WAITLIST
      ══════════════════════════════════════════════════════ */}
      {/* <section id="waitlist">
        <div className="wrap">
          <div className="waitlist-card" data-reveal>
            <div className="waitlist-inner">

              <div className="waitlist-info">
                <div className="waitlist-badge">
                  <Users size={13} /> FUTURE OPENINGS
                </div>
                <h2>Join the Talent Waitlist</h2>
                <p>
                  Don't see your specific role listed? Drop your details and
                  resume. When a suitable opening arises in your target
                  department, our talent team will reach out to you first.
                </p>
              </div>

              <div className="waitlist-action-col">
                <button
                  type="button"
                  className="btn-waitlist-trigger"
                  onClick={() => {
                    setSelectedDept("");
                    setOtherDept("");
                    setWaitlistModalOpen(true);
                  }}
                >
                  Join Waitlist Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <div className="c-divider" />

      {/* ══════════════════════════════════════════════════════
          WHY JOIN US
      ══════════════════════════════════════════════════════ */}
      <section id="why">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">WHY F2 FINTECH</div>
            <h2>Why Talent <span>Chooses Us</span></h2>
          </div>
          <div className="why-grid" data-reveal>
            {[
              {
                n: "01",
                h: "Meritocracy > Hierarchy",
                p: "Your ideas and contribution drive your progress, free from artificial tenure requirements.",
              },
              {
                n: "02",
                h: "Early Decision Power",
                p: "Execute real responsibilities and lead initiative outcomes early in your journey.",
              },
              {
                n: "03",
                h: "High-Velocity Domain",
                p: "Work directly with HNI portfolios and lending frameworks shaping modern fintech.",
              },
              {
                n: "04",
                h: "Structured Fast-Track",
                p: "Clear milestones from Stage 0 to Stage 1, building high-value industry capabilities.",
              },
              {
                n: "05",
                h: "High Impact Mission",
                p: "Directly enable everyday professionals and businesses to unlock financial freedom.",
              },
              {
                n: "06",
                h: "Balanced Work Schedule",
                p: "Structured 9-hour shifts, monthly half-day Sundays, and 24 guaranteed paid annual leaves.",
              },
            ].map((w) => (
              <div className="why-item" key={w.n}>
                <div className="why-num">{w.n}</div>
                <h3>{w.h}</h3>
                <p>{w.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="c-divider" />

      {/* ══════════════════════════════════════════════════════
          PERKS & BENEFITS
      ══════════════════════════════════════════════════════ */}
      <section id="beyond">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">BENEFITS & PERKS</div>
            <h2>Beyond a <span>Paycheck</span></h2>
            <p>
              Comprehensive perks designed to keep you performing, growing,
              and thriving.
            </p>
          </div>

          <div className="perk-grid" data-reveal>
            {[
              {
                icon: <HeartPulse size={26} />,
                h: "Health & Wellness",
                p: "Daily wellness routines and healthy work habits integrated into the company environment.",
              },
              {
                icon: <TrendingUp size={26} />,
                h: "Upskilling & Growth",
                p: "Access to professional development budgets, domain workshops, and leadership mentorship.",
              },
              {
                icon: <Award size={26} />,
                h: "Accelerated Leadership",
                p: "Fast-track pathways into manager and department head roles based strictly on execution.",
              },
              {
                icon: <Users size={26} />,
                h: "Smart Casual Culture",
                p: "Comfortable, flexible dress code designed for an empowering modern workplace.",
              },
              {
                icon: <Sparkles size={26} />,
                h: "Rewards & Recognition",
                p: "Quarterly performance bonuses, milestone rewards, and public team spotlights.",
              },
              {
                icon: <Target size={26} />,
                h: "Fast-Track Reviews",
                p: "Regular performance evaluations every 3 to 6 months for rapid growth advancement.",
              },
            ].map((perk) => (
              <div className="perk-card" key={perk.h}>
                <div className="perk-icon-wrap">{perk.icon}</div>
                <h4>{perk.h}</h4>
                <p>{perk.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="c-divider" />

      {/* ══════════════════════════════════════════════════════
          TEAM PHOTO MARQUEE
      ══════════════════════════════════════════════════════ */}
      <div className="team-photo-marquee">
        <div className="tpm-label">Our Team & Culture</div>
        <div className="tpm-track-wrap">
          <div className="tpm-track">
            {[...TEAM_PHOTOS, ...TEAM_PHOTOS, ...TEAM_PHOTOS, ...TEAM_PHOTOS].map(
              (src, idx) => (
                <div className="tpm-photo" key={idx}>
                  <img src={src} alt={`F2 Fintech team ${idx + 1}`} />
                </div>
              )
            )}
          </div>
        </div>
      </div>



      {/* ── Modals ── */}
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

      <JobDetailsModal
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedJob(null);
        }}
        selectedJob={selectedJob}
        onApplyClick={handleApplyClick}
      />

      <WaitlistModal
        open={waitlistModalOpen}
        onClose={() => setWaitlistModalOpen(false)}
        companyInfo={companyInfo}
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        otherDept={otherDept}
        setOtherDept={setOtherDept}
      />
    </div>
  );
};

export default Careers;

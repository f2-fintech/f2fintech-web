import React, { useState, useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { postCareer } from "../../apis/CareersAPI";
import API from "../../apis";
import axios from "axios";
import CareersModal from "./CareersModal";
import JobDetailsModal from "./JobDetailsModal";
import WaitlistModal from "./WaitlistModal";
import RoleDetailsModal from "./RoleDetailsModal";
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
      {
        id: "01",
        name: "Sales Manager",
        description:
          "As a Sales Manager at F2 Fintech, you will lead and drive the sales strategy across our loan, card, and investment product lines, ensuring the team consistently meets business and revenue targets. You will manage a team of Team Leads and Sales Executives, build strong channel partnerships, and play a key role in scaling our sales operations across the region.",
        responsibilities: [
          "Own end-to-end sales targets for assigned products/territory",
          "Lead, mentor, and manage multiple Team Leads and their sales pods",
          "Build and maintain relationships with DSAs, connectors, and channel partners",
          "Design lead allocation strategies and sales incentive structures",
          "Track team performance, disbursal numbers, and conversion ratios",
          "Report sales performance and market insights to leadership",
          "Identify growth opportunities and drive process improvements",
        ],
      },
      {
        id: "02",
        name: "Team Lead - Sales",
        description:
          "As a Team Lead - Sales, you will manage a team of Sales Executives, ensuring smooth day-to-day execution of sales activities and consistent achievement of targets. You will act as the bridge between the Sales Manager and the on-ground sales team, driving performance through coaching, monitoring, and hands-on support.",
        responsibilities: [
          "Manage and mentor a team of Sales Executives",
          "Distribute and track leads across the team",
          "Coach team members on pitching, objection handling, and closures",
          "Monitor daily login, conversion, and disbursal numbers",
          "Resolve escalations related to documentation or process delays",
          "Ensure team adherence to compliance and process guidelines",
          "Report team performance to the Sales Manager",
        ],
      },
      {
        id: "03",
        name: "Sales Executive",
        description:
          "As a Sales Executive, you will be the first point of contact for customers exploring loans, cards, or investment products with F2 Fintech. Your role is to understand customer needs, guide them through eligibility and documentation, and ensure a smooth, timely closure of their application.",
        responsibilities: [
          "Connect with leads via calls/meetings and explain product features & eligibility",
          "Guide customers through documentation and KYC requirements",
          "Follow up consistently to move applications toward disbursal",
          "Maintain accurate records of leads and application status",
          "Meet daily/monthly login and conversion targets",
          "Provide a smooth and transparent customer experience",
          "Escalate complex cases to the Team Lead when required",
        ],
      },
    ],
  },
  marketing: {
    label: "Marketing",
    roles: [
      {
        id: "01",
        name: "Marketing Manager",
        description:
          "As Marketing Manager at F2 Fintech, you will own the overall marketing strategy across digital, content, and brand initiatives, ensuring consistent growth in visibility and lead generation for our loan, card, and investment products. You will lead a cross-functional marketing team and align campaigns with business goals.",
        responsibilities: [
          "Define and execute the overall marketing strategy and calendar",
          "Lead and manage the marketing team (design, content, SEO, performance, social)",
          "Track campaign performance and marketing ROI",
          "Manage marketing budgets and vendor/agency relationships",
          "Collaborate with Sales and Product teams to align messaging",
          "Drive brand positioning and market research initiatives",
          "Report marketing performance and growth insights to leadership",
        ],
      },
      {
        id: "02",
        name: "Graphic Designer",
        description:
          "As a Graphic Designer, you will create visually compelling designs for F2 Fintech's digital and offline marketing needs, helping communicate our brand and offerings clearly and attractively across platforms.",
        responsibilities: [
          "Design creatives for social media, website, and ad campaigns",
          "Create brand assets, banners, brochures, and marketing collateral",
          "Ensure design consistency with brand guidelines",
          "Collaborate with the marketing team on campaign concepts",
          "Work on both digital and print design requirements",
          "Manage multiple design projects within timelines",
        ],
      },
      {
        id: "03",
        name: "Video Editor",
        description:
          "As a Video Editor, you will produce engaging video content for F2 Fintech's marketing campaigns, social media, and brand communication, helping tell our story through compelling visuals.",
        responsibilities: [
          "Edit and produce videos for social media, ads, and campaigns",
          "Add graphics, transitions, sound, and effects to raw footage",
          "Collaborate with the marketing team on video concepts and scripts",
          "Optimize videos for different platforms (Instagram, YouTube, etc.)",
          "Maintain a consistent visual style aligned with the brand",
          "Manage video project timelines and revisions",
        ],
      },
      {
        id: "04",
        name: "Outreach and Research Executive",
        description:
          "As an Outreach and Research Executive, you will identify potential partnerships, collaborations, and market opportunities for F2 Fintech through research and proactive outreach, supporting the marketing and growth strategy.",
        responsibilities: [
          "Conduct market and competitor research",
          "Identify and reach out to potential partners, influencers, or platforms",
          "Build and maintain outreach databases and contact lists",
          "Track outreach responses and follow up consistently",
          "Support campaign planning with research-backed insights",
          "Report outreach outcomes and opportunities to the marketing team",
        ],
      },
      {
        id: "05",
        name: "SEO & GEO Executive",
        description:
          "As an SEO & GEO Executive, you will improve F2 Fintech's visibility on search engines and generative AI platforms, driving organic traffic and inquiries through optimized content and technical SEO practices.",
        responsibilities: [
          "Conduct keyword research and on-page SEO optimization",
          "Optimize content for search engines and AI-driven discovery (GEO)",
          "Track rankings, organic traffic, and search performance",
          "Collaborate with content teams for SEO-friendly content",
          "Perform technical SEO audits and fix website issues",
          "Stay updated on search algorithm and AI search trends",
        ],
      },
      {
        id: "06",
        name: "Performance Marketing Executive",
        description:
          "As a Performance Marketing Executive, you will plan and execute paid marketing campaigns across platforms to drive quality leads and conversions for F2 Fintech's products.",
        responsibilities: [
          "Plan and manage paid campaigns (Google, Meta, etc.)",
          "Optimize campaigns for cost-per-lead and conversion targets",
          "Analyze campaign data and prepare performance reports",
          "A/B test ad creatives, audiences, and landing pages",
          "Manage advertising budgets across channels",
          "Collaborate with design and content teams for ad creatives",
        ],
      },
      {
        id: "07",
        name: "Social Media Strategist",
        description:
          "As a Social Media Strategist, you will build and execute F2 Fintech's social media presence, creating engaging content strategies that grow our audience and strengthen brand trust.",
        responsibilities: [
          "Plan and execute the social media content calendar",
          "Develop platform-specific strategies (Instagram, LinkedIn, etc.)",
          "Monitor engagement, growth metrics, and trends",
          "Collaborate with design and video teams for content creation",
          "Manage community engagement and responses",
          "Report on social media performance and growth",
        ],
      },
    ],
  },
  hr: {
    label: "HR",
    roles: [
      {
        id: "01",
        name: "HR Manager & Business Partner (HRBP)",
        description:
          "As HR Manager & Business Partner at F2 Fintech, you will act as a strategic partner to business leaders, aligning HR practices with organizational goals while overseeing core HR functions like talent management, employee relations, and policy implementation.",
        responsibilities: [
          "Partner with business leaders to align HR strategy with company goals",
          "Drive talent management, succession planning, and org development",
          "Oversee employee relations, engagement, and grievance handling",
          "Guide performance management and appraisal cycles",
          "Ensure compliance with labor laws and HR policies",
          "Support leadership on workforce planning and restructuring",
          "Mentor and guide the HR team on people practices",
        ],
      },
      {
        id: "02",
        name: "HR Manager",
        description:
          "As HR Manager, you will oversee the end-to-end HR functions at F2 Fintech, ensuring smooth recruitment, employee engagement, and HR operations while building a positive and productive workplace culture.",
        responsibilities: [
          "Manage recruitment, onboarding, and offboarding processes",
          "Drive employee engagement and retention initiatives",
          "Oversee payroll, attendance, and HR compliance",
          "Handle employee grievances and conflict resolution",
          "Design and implement HR policies and processes",
          "Coordinate performance appraisal cycles",
          "Report HR metrics and updates to leadership",
        ],
      },
      {
        id: "03",
        name: "HR Assistant Manager",
        description:
          "As HR Assistant Manager, you will support the HR Manager in executing key HR functions, ensuring smooth day-to-day operations across recruitment, employee engagement, and compliance.",
        responsibilities: [
          "Assist in end-to-end recruitment and interview coordination",
          "Support onboarding and induction processes for new hires",
          "Maintain employee records and HR documentation",
          "Coordinate employee engagement activities and events",
          "Assist in policy implementation and compliance tracking",
          "Handle first-level employee queries and escalations",
          "Support HR reporting and data management",
        ],
      },
      {
        id: "04",
        name: "HR Executive",
        description:
          "As HR Executive, you will handle the operational aspects of HR at F2 Fintech, supporting recruitment, employee documentation, and day-to-day HR administration.",
        responsibilities: [
          "Source, screen, and schedule candidate interviews",
          "Manage onboarding formalities and documentation",
          "Maintain and update employee records and HR databases",
          "Assist with attendance, leave, and payroll coordination",
          "Support in organizing employee engagement activities",
          "Address basic employee queries and escalate when needed",
          "Ensure HR processes comply with company policies",
        ],
      },
    ],
  },
  product: {
    label: "Product",
    roles: [
      {
        id: "01",
        name: "Product Director",
        description:
          "As Product Director at F2 Fintech, you will define and drive the overall product vision and strategy across our loan, card, and investment offerings, ensuring our platform stays competitive, customer-focused, and aligned with business goals.",
        responsibilities: [
          "Define product vision, strategy, and roadmap across offerings",
          "Lead and mentor the product management team",
          "Align product strategy with business and revenue goals",
          "Drive key decisions on new product launches and market fit",
          "Collaborate with leadership, tech, and business teams",
          "Monitor market trends and competitor products",
          "Own overall product performance and growth metrics",
        ],
      },
      {
        id: "02",
        name: "Product Manager",
        description:
          "As Product Manager, you will own the end-to-end lifecycle of specific products at F2 Fintech, from ideation to launch, ensuring the product meets user needs and business objectives.",
        responsibilities: [
          "Define product requirements and prioritize the roadmap",
          "Work closely with tech, design, and business teams for execution",
          "Conduct market and user research to identify opportunities",
          "Track product metrics and drive data-informed improvements",
          "Manage product launches and feature rollouts",
          "Gather and act on user feedback",
          "Report product performance to leadership",
        ],
      },
      {
        id: "03",
        name: "Associate Product Manager (Executive)",
        description:
          "As Associate Product Manager, you will support the Product Manager in executing the product roadmap, working closely with cross-functional teams to deliver features and improvements.",
        responsibilities: [
          "Assist in gathering and documenting product requirements",
          "Coordinate with tech and design teams on feature execution",
          "Track feature performance and user feedback",
          "Support in preparing product specs and user stories",
          "Conduct competitor and market research",
          "Assist in testing and validating new features before launch",
        ],
      },
      {
        id: "04",
        name: "Jr. Product Manager (Executive)",
        description:
          "As Jr. Product Manager, you will support the product team in day-to-day execution tasks, gaining hands-on exposure to product management processes at F2 Fintech.",
        responsibilities: [
          "Assist in documenting product requirements and user stories",
          "Support coordination between tech, design, and business teams",
          "Help track feature progress and report status updates",
          "Assist in analyzing product data and user feedback",
          "Support QA/testing of new features before release",
          "Learn and contribute to product roadmap planning",
        ],
      },
    ],
  },
  operations: {
    label: "Operations",
    roles: [
      {
        id: "01",
        name: "Operations Manager",
        description:
          "As Operations Manager at F2 Fintech, you will oversee the end-to-end loan and product processing operations, ensuring smooth, compliant, and efficient workflows from application to disbursal across all business lines.",
        responsibilities: [
          "Own end-to-end operational processes for loans, cards, and investment products",
          "Lead and manage the operations team, including Assistant Managers and Executives",
          "Ensure timely and accurate processing of applications and disbursals",
          "Drive process efficiency, TAT improvement, and quality control",
          "Coordinate with Sales, Credit, and Tech teams to resolve bottlenecks",
          "Ensure compliance with internal policies and regulatory requirements",
          "Report operational metrics and issues to leadership",
        ],
      },
      {
        id: "02",
        name: "Assistant Operations Manager",
        description:
          "As Assistant Operations Manager, you will support the Operations Manager in overseeing daily operational activities, ensuring smooth processing and coordination across teams.",
        responsibilities: [
          "Assist in managing day-to-day operational workflows",
          "Supervise Operations Executives and monitor their output",
          "Ensure accuracy and timeliness in application processing",
          "Coordinate with other departments to resolve pending cases",
          "Track TAT, error rates, and process compliance",
          "Support process improvement initiatives",
          "Escalate critical issues to the Operations Manager",
        ],
      },
      {
        id: "03",
        name: "Operations Executive",
        description:
          "As Operations Executive, you will handle day-to-day processing tasks, ensuring applications and documentation move smoothly through the operational pipeline.",
        responsibilities: [
          "Process and verify loan/card/investment applications",
          "Maintain accurate records and documentation",
          "Coordinate with Sales and Credit teams for pending cases",
          "Track application status and follow up for closures",
          "Ensure adherence to process timelines (TAT)",
          "Flag discrepancies or issues to the Assistant Operations Manager",
          "Support day-to-day administrative operational tasks",
        ],
      },
    ],
  },
  credit: {
    label: "Credit",
    roles: [
      {
        id: "01",
        name: "Credit Manager",
        description:
          "As Credit Manager at F2 Fintech, you will lead the credit assessment and risk evaluation process across loan and card products, ensuring sound lending decisions that balance business growth with risk management.",
        responsibilities: [
          "Own the end-to-end credit appraisal and underwriting process",
          "Assess borrower creditworthiness, income, and risk profiles",
          "Approve or reject applications based on credit policy",
          "Lead and guide the credit team, including Assistant Managers and Executives",
          "Define and refine credit policies and risk parameters",
          "Monitor portfolio quality and delinquency trends",
          "Coordinate with Operations and Sales for smooth case processing",
          "Report credit performance and risk insights to leadership",
        ],
      },
      {
        id: "02",
        name: "Assistant Credit Manager",
        description:
          "As Assistant Credit Manager, you will support the Credit Manager in evaluating loan applications and managing credit risk, ensuring accurate and timely credit decisions.",
        responsibilities: [
          "Assist in reviewing and assessing loan/card applications",
          "Verify financial documents, income proof, and credit reports",
          "Support underwriting decisions based on credit policy",
          "Supervise Credit Executives and review their case assessments",
          "Track portfolio quality and flag risk concerns",
          "Coordinate with Operations for documentation and disbursal",
          "Escalate complex cases to the Credit Manager",
        ],
      },
      {
        id: "03",
        name: "Credit Executive",
        description:
          "As Credit Executive, you will handle day-to-day credit evaluation tasks, verifying applicant documents and supporting the underwriting process.",
        responsibilities: [
          "Review and verify applicant financial documents and credit reports",
          "Conduct preliminary credit checks and risk assessments",
          "Coordinate with Sales and Operations for missing documentation",
          "Maintain accurate records of credit decisions",
          "Flag discrepancies or high-risk cases to the Assistant Credit Manager",
          "Support timely processing of credit approvals",
        ],
      },
    ],
  },
  it: {
    label: "IT & Infra",
    roles: [
      {
        id: "01",
        name: "Software Developer",
        description:
          "As a Software Developer at F2 Fintech, you will design, build, and maintain software applications that power our loan, card, and investment platforms, ensuring reliable and scalable technology solutions.",
        responsibilities: [
          "Write clean, efficient, and maintainable code",
          "Develop and maintain features across web/backend systems",
          "Debug and resolve technical issues and bugs",
          "Collaborate with Product and QA teams on requirements and testing",
          "Participate in code reviews and follow best practices",
          "Contribute to system design and architecture discussions",
          "Stay updated with relevant tech stacks and tools",
        ],
      },
      {
        id: "02",
        name: "Full Stack Developer",
        description:
          "As a Full Stack Developer, you will work across both front-end and back-end systems to build and enhance F2 Fintech's digital platforms, ensuring seamless user experience and robust functionality.",
        responsibilities: [
          "Develop and maintain front-end and back-end components",
          "Build and integrate APIs and databases",
          "Ensure application performance, security, and scalability",
          "Collaborate with designers and product managers on feature builds",
          "Debug issues across the full technology stack",
          "Participate in code reviews and testing",
          "Stay current with modern frameworks and tools",
        ],
      },
      {
        id: "03",
        name: "Sr. Tech Head",
        description:
          "As Sr. Tech Head at F2 Fintech, you will lead the technology function, driving the technical strategy, architecture, and execution across all products and platforms.",
        responsibilities: [
          "Define and own the overall technology strategy and roadmap",
          "Lead and mentor the engineering and infra teams",
          "Oversee system architecture, scalability, and security decisions",
          "Drive technology decisions aligned with business goals",
          "Ensure timely and quality delivery of tech projects",
          "Manage technical risk, uptime, and infrastructure reliability",
          "Collaborate with Product and leadership on tech-driven growth",
        ],
      },
      {
        id: "04",
        name: "IT Infra & Networking",
        description:
          "As IT Infra & Networking, you will manage F2 Fintech's IT infrastructure and network systems, ensuring smooth, secure, and reliable connectivity and system performance across the organization.",
        responsibilities: [
          "Set up, maintain, and monitor network and server infrastructure",
          "Ensure system uptime, security, and data backup processes",
          "Manage IT infrastructure planning and scaling",
          "Troubleshoot network and connectivity issues",
          "Implement and maintain security protocols and access controls",
          "Coordinate with vendors for infra-related requirements",
          "Support infrastructure needs for new projects/tools",
        ],
      },
      {
        id: "05",
        name: "IT Infra Support",
        description:
          "As IT Infra Support, you will provide day-to-day technical support, ensuring smooth functioning of systems, devices, and network access for the team.",
        responsibilities: [
          "Provide first-level technical support for hardware/software issues",
          "Assist in system setup, installations, and maintenance",
          "Troubleshoot network connectivity and access issues",
          "Maintain IT asset records and inventory",
          "Support employees with device and access-related queries",
          "Escalate complex infra issues to the IT Infra & Networking team",
        ],
      },
    ],
  },
  data: {
    label: "Data",
    roles: [
      {
        id: "01",
        name: "Data Analyst",
        description:
          "As a Data Analyst at F2 Fintech, you will analyze business and customer data to generate insights that support decision-making across sales, credit, and product teams.",
        responsibilities: [
          "Collect, clean, and analyze data from multiple sources",
          "Build dashboards and reports to track key business metrics",
          "Identify trends, patterns, and insights to support decision-making",
          "Collaborate with cross-functional teams to understand data needs",
          "Ensure data accuracy and consistency across reports",
          "Present findings and recommendations to stakeholders",
        ],
      },
      {
        id: "02",
        name: "Business Analyst",
        description:
          "As a Business Analyst, you will bridge the gap between business needs and data-driven solutions, helping teams make informed decisions through analysis and process insights.",
        responsibilities: [
          "Gather and analyze business requirements from stakeholders",
          "Evaluate processes and identify improvement opportunities",
          "Build reports and models to support business decisions",
          "Work closely with Product, Operations, and Data teams",
          "Track key business metrics and performance indicators",
          "Present actionable insights and recommendations to leadership",
        ],
      },
      {
        id: "03",
        name: "Data Scientist",
        description:
          "As a Data Scientist, you will build models and algorithms that drive smarter decision-making across F2 Fintech's credit, risk, and product functions.",
        responsibilities: [
          "Develop and deploy predictive models and algorithms",
          "Analyze large datasets to uncover patterns and insights",
          "Build and improve credit risk/scoring models",
          "Collaborate with tech and product teams on data-driven features",
          "Validate model performance and iterate for accuracy",
          "Present data-driven recommendations to stakeholders",
        ],
      },
      {
        id: "04",
        name: "Data Entry Operator",
        description:
          "As a Data Entry Operator, you will handle accurate and timely data entry, supporting various teams with clean and organized data.",
        responsibilities: [
          "Enter and update data accurately into systems/databases",
          "Verify data for accuracy and completeness",
          "Maintain confidentiality and integrity of data records",
          "Organize and manage data files and documentation",
          "Support teams with data retrieval and basic reports",
          "Flag discrepancies or errors for correction",
        ],
      },
    ],
  },
  finance: {
    label: "Finance",
    roles: [
      {
        id: "01",
        name: "Finance Manager",
        description:
          "As Finance Manager at F2 Fintech, you will oversee the company's financial planning, reporting, and compliance, ensuring sound financial management to support business growth and decision-making.",
        responsibilities: [
          "Own financial planning, budgeting, and forecasting",
          "Oversee accounting, reporting, and compliance processes",
          "Manage cash flow, fund management, and financial risk",
          "Ensure timely and accurate financial statements and audits",
          "Lead and guide the finance team, including Assistant Managers and Executives",
          "Coordinate with leadership on financial strategy and investment decisions",
          "Ensure compliance with statutory, tax, and regulatory requirements",
        ],
      },
      {
        id: "02",
        name: "Finance Assistant Manager",
        description:
          "As Finance Assistant Manager, you will support the Finance Manager in managing accounting, reporting, and compliance activities, ensuring accurate and timely financial operations.",
        responsibilities: [
          "Assist in budgeting, forecasting, and financial reporting",
          "Review accounting entries and reconciliations",
          "Support statutory compliance and audit processes",
          "Supervise Finance Executives and review their work",
          "Track cash flow and fund utilization",
          "Coordinate with other departments for financial data and approvals",
          "Escalate critical financial issues to the Finance Manager",
        ],
      },
      {
        id: "03",
        name: "Finance Executive",
        description:
          "As Finance Executive, you will handle day-to-day financial and accounting tasks, ensuring accurate record-keeping and smooth financial operations.",
        responsibilities: [
          "Process invoices, payments, and expense reports",
          "Maintain accurate books of accounts and financial records",
          "Assist in reconciliations and month-end closing activities",
          "Support statutory compliance and documentation requirements",
          "Coordinate with vendors and internal teams for financial matters",
          "Flag discrepancies and support the Finance Assistant Manager",
        ],
      },
    ],
  },
  other: {
    label: "Other",
    roles: [
      {
        id: "01",
        name: "Executive Assistant",
        description:
          "As Executive Assistant at F2 Fintech, you will provide dedicated support to leadership, managing schedules, communication, and key operational tasks to ensure smooth day-to-day functioning.",
        responsibilities: [
          "Manage calendars, meetings, and travel arrangements for leadership",
          "Handle correspondence, emails, and communication on behalf of leadership",
          "Prepare reports, presentations, and meeting notes",
          "Coordinate with internal teams to follow up on action items",
          "Maintain confidentiality of sensitive information",
          "Assist in organizing events, meetings, and reviews",
          "Handle ad-hoc administrative and coordination tasks",
        ],
      },
      {
        id: "02",
        name: "Administrative Assistant",
        description:
          "As Administrative Assistant, you will support daily office administration, ensuring smooth operational and administrative processes across the organization.",
        responsibilities: [
          "Manage day-to-day office administrative tasks",
          "Maintain records, files, and documentation",
          "Coordinate office supplies, vendors, and facility needs",
          "Assist in scheduling meetings and maintaining calendars",
          "Support other departments with administrative requirements",
          "Handle basic correspondence and communication",
        ],
      },
      {
        id: "03",
        name: "Administrative Executive",
        description:
          "As Administrative Executive, you will handle office operations and administrative support, ensuring the workplace runs efficiently on a day-to-day basis.",
        responsibilities: [
          "Oversee daily administrative and facility operations",
          "Manage vendor coordination, procurement, and office upkeep",
          "Maintain employee and office-related documentation",
          "Support onboarding logistics and workplace requirements",
          "Coordinate travel, events, and internal logistics",
          "Assist departments with administrative and operational needs",
        ],
      },
    ],
  },
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

  // ── Role details modal ──
  const [roleDetailsOpen, setRoleDetailsOpen] = useState(false);
  const [selectedRoleData, setSelectedRoleData] = useState(null);

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
  /* ── View role details ── */
  const handleViewDetailsClick = (deptKey, role) => {
    const deptLabel = DEPARTMENTS[deptKey]?.label || "";
    setSelectedRoleData({
      name: role.name,
      description: role.description,
      responsibilities: role.responsibilities || [],
      deptKey: deptKey,
      deptLabel: deptLabel,
    });
    setRoleDetailsOpen(true);
  };

  /* ── Preselect dept and open waitlist modal ── */
  const handleViewRoleClick = (deptKey, roleName = "") => {
    if (deptKey === "other") {
      setSelectedDept("Other");
      setOtherDept(roleName);
    } else {
      let deptLabel = DEPARTMENTS[deptKey]?.label || "";
      if (deptLabel === "IT & Infra") deptLabel = "IT";
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
              transparent, accessible, and high-impact - from HNIs to everyday
              professionals, driving meaningful outcomes in investment,
              insurance, and lending.
            </p>
          </div>

          <div className="about-metrics-grid" data-reveal>
            {[
              { icon: <Calendar size={24} />, num: "2022", lbl: "Established - Fintech Future" },
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
              authority. Your contribution directly moves the needle - from day
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
              <span><b>9-Hour Shifts</b> - 8 hrs work + 1 hr break</span>
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

                let skillArr = [];
                try {
                  const raw = job.skillsRequired;
                  if (Array.isArray(raw)) skillArr = raw;
                  else if (typeof raw === "string") {
                    const parsed = JSON.parse(raw);
                    skillArr = Array.isArray(parsed) ? parsed : [parsed];
                  }
                } catch {
                  skillArr = job.skillsRequired ? [job.skillsRequired] : [];
                }

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
                                {Array.isArray(sk) ? sk.join(", ") : (typeof sk === 'string' ? sk.replace(/react js node js/ig, "react js, node js") : sk)}{cleanExp}
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
              <div className="role-list">
                {DEPARTMENTS[deptKey].roles.map((role) => (
                  <div className="role-row" key={role.id || role.name}>
                    <span className="role-name">{role.name}</span>
                    <button
                      className="btn-view-role"
                      onClick={() =>
                        handleViewDetailsClick(deptKey, role)
                      }
                    >
                      View role &rarr;
                    </button>
                  </div>
                ))}
              </div>
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

      <RoleDetailsModal
        open={roleDetailsOpen}
        onClose={() => {
          setRoleDetailsOpen(false);
          setSelectedRoleData(null);
        }}
        roleData={selectedRoleData}
        onJoinWaitlist={handleViewRoleClick}
      />
    </div>
  );
};

export default Careers;

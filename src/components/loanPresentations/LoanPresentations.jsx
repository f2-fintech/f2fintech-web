import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Modal,
  IconButton,
  Divider,
  Paper,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Presentation Decks Data based on the official PPT files in /PPT
export const LOAN_DECKS = [
  {
    id: "business-loan",
    fileName: "Business_Loan_F2Fintech.pptx",
    fileUrl: "/PPT/Business_Loan_F2Fintech.pptx",
    title: "Business Loan Presentation",
    tagline: "Funding ideas, operations and sustainable growth",
    category: "Business Finance",
    audience: "Eligible entrepreneurs, proprietors and registered businesses",
    fileSize: "38.8 KB",
    slidesCount: 6,
    icon: BusinessCenterIcon,
    badgeColor: "#2563eb",
    gradient: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
    glowColor: "rgba(37, 99, 235, 0.15)",
    applyRoute: "/business-loan",
    description:
      "A comprehensive pitch deck designed for MSMEs, startups, and growing enterprises. Covers working capital needs, required vintage, 5-stage application process, document checklist, and effective cost comparison.",
    keyTakeaways: [
      "Working capital, inventory & machinery Capex",
      "Vintage & cash-flow assessment roadmap",
      "KYC, GST, ITR & bank statement checklist",
      "APR & total cost transparency guidelines",
    ],
    slides: [
      {
        slideNumber: 1,
        badge: "BUSINESS FINANCE",
        title: "Business Loan",
        subtitle: "Funding ideas, operations and growth",
        type: "cover",
        note: "LOAN OVERVIEW • OFFICIAL PRESENTATION DECK\nIllustrative information only. Eligibility and terms depend on participating lenders.",
        stats: [
          { label: "Target Profile", value: "MSMEs & Proprietors" },
          { label: "Funding Scope", value: "Working Capital & Capex" },
          { label: "Format", value: "PowerPoint Deck (.PPTX)" },
        ],
      },
      {
        slideNumber: 2,
        badge: "INTRODUCING BUSINESS LOAN",
        title: "Strategic Capital For Growth",
        subtitle: "Funding ideas, operations and sustainable business scale",
        type: "cards",
        cards: [
          {
            tag: "WHO IT MAY SUIT",
            title: "Eligible Entrepreneurs",
            text: "Sole proprietors, partnerships, LLPs, and private limited companies seeking growth or liquidity.",
          },
          {
            tag: "COMMON NEED",
            title: "Operations & Working Capital",
            text: "Procure inventory, acquire heavy machinery, finance new projects, or bridge temporary cash-flow mismatches.",
          },
          {
            tag: "KEY IDEA",
            title: "Prudent Structure & Cost",
            text: "Compare multiple lender offers carefully and align repayments with your operating revenue cycles.",
          },
        ],
        footerNote: "A clear overview to help applicants understand the complete borrowing journey before they apply.",
      },
      {
        slideNumber: 3,
        badge: "AT A GLANCE",
        title: "What You Must Know",
        subtitle: "Product features and availability depend on the participating lending partner.",
        type: "grid",
        items: [
          {
            num: "01",
            title: "Options Based on Business Profile",
            desc: "Loan sizes and tenures evaluated on annual turnover, business vintage, and credit score.",
          },
          {
            num: "02",
            title: "Eligible Business Expenses",
            desc: "Deploy funds across raw materials, supplier payments, payroll, technology, and operations.",
          },
          {
            num: "03",
            title: "Requirements Vary by Lender",
            desc: "Different banks and NBFCs enforce varying turnover thresholds, collateral, or guarantor policies.",
          },
        ],
        footerNote: "Always review applicable lender disclosures and loan sanctions before accepting an offer.",
      },
      {
        slideNumber: 4,
        badge: "APPLICATION JOURNEY",
        title: "From Enquiry To Decision",
        subtitle: "A structured 5-stage pathway from preliminary enquiry to funds disbursement.",
        type: "steps",
        steps: [
          { step: "1", title: "Define funding purpose and required amount" },
          { step: "2", title: "Review business vintage and historical cash flow" },
          { step: "3", title: "Collect business, banking, and tax records" },
          { step: "4", title: "Submit application for lender underwriting assessment" },
          { step: "5", title: "Compare sanctioned terms, APR, and repayment schedules" },
        ],
        footerNote: "Approval is subject to lender credit assessment, verification, and applicable underwriting criteria.",
      },
      {
        slideNumber: 5,
        badge: "PREPARATION CHECKLIST",
        title: "Documents Applicants May Need",
        subtitle: "The final documentation list is tailored by the lender based on the applicant's profile.",
        type: "checklist",
        items: [
          "PAN Card & KYC documents for promoters, directors, and the business entity",
          "Business Registration Proof (GST Certificate, Udyam / MSME, COI, Partnership Deed)",
          "Last 6 to 12 months official bank statements reflecting business turnover",
          "Audited Financial Statements, Balance Sheets, P&L, ITR, or GST returns if applicable",
        ],
        securityTip:
          "Keep information accurate and up-to-date. Submit documents only through official, encrypted channels. Never disclose OTPs, banking passwords, or UPI PINs to anyone.",
      },
      {
        slideNumber: 6,
        badge: "MAKE AN INFORMED CHOICE",
        title: "Compare The Full Cost",
        subtitle: "Do not choose a business loan based on headline interest rate alone.",
        type: "comparison",
        checks: [
          "Total repayment and effective annual percentage cost (APR)",
          "Turnover requirements, credit track record, and vintage criteria",
          "Collateral, property charge, or personal guarantee requirements",
          "Repayment frequency, processing charges, and foreclosure terms",
        ],
        responsibleAdvice:
          "Borrow against a realistic cash-flow projection and a well-defined business milestone.",
        disclaimer:
          "F2Fintech presentation deck • Availability, eligibility, interest rates, fees, and approval terms are determined by the relevant participating lender.",
      },
    ],
  },
  {
    id: "doctor-loan",
    fileName: "Doctor_Loan_F2Fintech.pptx",
    fileUrl: "/PPT/Doctor_Loan_F2Fintech.pptx",
    title: "Doctor Loan Presentation",
    tagline: "Specialized finance for medical professionals and practices",
    category: "Professional Finance",
    audience: "Eligible doctors, clinics, nursing homes, and healthcare practitioners",
    fileSize: "38.8 KB",
    slidesCount: 6,
    icon: LocalHospitalIcon,
    badgeColor: "#059669",
    gradient: "linear-gradient(135deg, #047857 0%, #10b981 100%)",
    glowColor: "rgba(16, 185, 129, 0.15)",
    applyRoute: "/doctor-loan",
    description:
      "A specialized presentation crafted for MBBS, BDS, MD, and healthcare practitioners. Details clinic setup loans, medical equipment leasing, practice expansion lines, qualification checks, and responsible financing.",
    keyTakeaways: [
      "Clinic setup, diagnostics & medical machinery finance",
      "MBBS / BDS / Medical council registration verification",
      "Flexible OD limits & customized doctor tenures",
      "Minimal documentation with expedited underwriting",
    ],
    slides: [
      {
        slideNumber: 1,
        badge: "PROFESSIONAL FINANCE",
        title: "Doctor Loan",
        subtitle: "Finance for medical professionals and practices",
        type: "cover",
        note: "LOAN OVERVIEW • OFFICIAL PRESENTATION DECK\nIllustrative information only. Eligibility and terms depend on participating lenders.",
        stats: [
          { label: "Target Profile", value: "Doctors, Clinics & Hospitals" },
          { label: "Funding Scope", value: "Clinic Setup & Medical Tech" },
          { label: "Format", value: "PowerPoint Deck (.PPTX)" },
        ],
      },
      {
        slideNumber: 2,
        badge: "INTRODUCING DOCTOR LOAN",
        title: "Empowering Medical Excellence",
        subtitle: "Finance for medical professionals, specialized clinics and practices",
        type: "cards",
        cards: [
          {
            tag: "WHO IT MAY SUIT",
            title: "Healthcare Practitioners",
            text: "Eligible doctors, specialized surgeons, dental practitioners, clinics, and diagnostic centers.",
          },
          {
            tag: "COMMON NEED",
            title: "Clinic & Equipment Financing",
            text: "Setup new consultation premises, procure advanced medical machinery, or expand diagnostic capabilities.",
          },
          {
            tag: "KEY IDEA",
            title: "Tailored Professional Credit",
            text: "Compare specialized medical loan schemes and select repayment terms synchronized with practice revenue.",
          },
        ],
        footerNote: "A clear overview to help medical applicants understand the journey before they apply.",
      },
      {
        slideNumber: 3,
        badge: "AT A GLANCE",
        title: "Essential Parameters",
        subtitle: "Product features and availability depend on the participating lending partner.",
        type: "grid",
        items: [
          {
            num: "01",
            title: "Options For Medical Professionals",
            desc: "Custom credit limits tailored for general practitioners, specialists, and multi-specialty clinics.",
          },
          {
            num: "02",
            title: "Diverse Funding Applications",
            desc: "Can be deployed for medical technology, premises acquisition, hospital renovation, or working capital.",
          },
          {
            num: "03",
            title: "Personal Or Practice Use",
            desc: "Lenders provide flexibility between practice equipment financing and personal term loans.",
          },
        ],
        footerNote: "Always review applicable lender disclosures and loan sanctions before accepting an offer.",
      },
      {
        slideNumber: 4,
        badge: "APPLICATION JOURNEY",
        title: "From Enquiry To Decision",
        subtitle: "A smooth, doctor-friendly workflow designed for busy medical professionals.",
        type: "steps",
        steps: [
          { step: "1", title: "Identify the funding need (equipment, premises, or cash-flow)" },
          { step: "2", title: "Check lender criteria & experience thresholds for doctors" },
          { step: "3", title: "Prepare medical qualification proofs and practice income records" },
          { step: "4", title: "Submit details for fast-track lender underwriting review" },
          { step: "5", title: "Evaluate cost, tenure, EMI options, and repayment terms" },
        ],
        footerNote: "Approval is subject to lender credit assessment, verification, and medical registration checks.",
      },
      {
        slideNumber: 5,
        badge: "PREPARATION CHECKLIST",
        title: "Documents Applicants May Need",
        subtitle: "The final documentation list is tailored by the lender based on practice vintage.",
        type: "checklist",
        items: [
          "PAN Card & Identity/Address KYC documents",
          "Medical Degree / Registration Certificate from State or National Medical Council",
          "Income proof, ITR acknowledgments, and last 6-12 months bank statements",
          "Clinic establishment license, lease agreements, or property ownership papers if applicable",
        ],
        securityTip:
          "Keep information accurate and up-to-date. Submit documents only through official, encrypted channels. Never disclose OTPs, banking passwords, or UPI PINs to anyone.",
      },
      {
        slideNumber: 6,
        badge: "MAKE AN INFORMED CHOICE",
        title: "Compare The Full Cost",
        subtitle: "Do not choose a medical loan based on headline interest rate alone.",
        type: "comparison",
        checks: [
          "Professional eligibility rules and experience requirements",
          "Practice vintage and gross receipt assessment norms",
          "Effective interest rates, processing charges, and tenure flexibility",
          "Collateral-free options vs asset-backed equipment hypothecation",
        ],
        responsibleAdvice:
          "Select a financing structure that accelerates practice growth without straining clinic cash reserves.",
        disclaimer:
          "F2Fintech presentation deck • Availability, eligibility, interest rates, fees, and approval terms are determined by the relevant participating lender.",
      },
    ],
  },
  {
    id: "home-loan",
    fileName: "Home_Loan_F2Fintech.pptx",
    fileUrl: "/PPT/Home_Loan_F2Fintech.pptx",
    title: "Home Loan Presentation",
    tagline: "A considered, transparent path toward your dream home",
    category: "Home Finance",
    audience: "Eligible individuals purchasing, constructing, or renovating residential property",
    fileSize: "38.7 KB",
    slidesCount: 6,
    icon: HomeWorkIcon,
    badgeColor: "#d97706",
    gradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)",
    glowColor: "rgba(245, 158, 11, 0.15)",
    applyRoute: "/home-loan",
    description:
      "A complete guide for residential homebuyers. Clarifies property valuation, down payment planning, fixed vs floating interest rates, title verification, and comparison of India's leading mortgage lenders.",
    keyTakeaways: [
      "Purchase, self-construction & home expansion loans",
      "Down payment, stamp duty & total cost budgeting",
      "Legal verification, technical inspection & property title",
      "Fixed vs floating rate analysis with prepayment rules",
    ],
    slides: [
      {
        slideNumber: 1,
        badge: "HOME FINANCE",
        title: "Home Loan",
        subtitle: "A considered path toward your own home",
        type: "cover",
        note: "LOAN OVERVIEW • OFFICIAL PRESENTATION DECK\nIllustrative information only. Eligibility and terms depend on participating lenders.",
        stats: [
          { label: "Target Profile", value: "Salaried & Self-Employed" },
          { label: "Funding Scope", value: "Purchase, Build & Balance Transfer" },
          { label: "Format", value: "PowerPoint Deck (.PPTX)" },
        ],
      },
      {
        slideNumber: 2,
        badge: "INTRODUCING HOME LOAN",
        title: "Your Gateway To Homeownership",
        subtitle: "A considered, structured path toward acquiring or building your own home",
        type: "cards",
        cards: [
          {
            tag: "WHO IT MAY SUIT",
            title: "Prospective Homeowners",
            text: "Salaried professionals and self-employed individuals purchasing, constructing, or extending a residential home.",
          },
          {
            tag: "COMMON NEED",
            title: "Property Acquisition & Build",
            text: "Finance ready-to-move apartments, under-construction projects, plot purchase + construction, or home renovation.",
          },
          {
            tag: "KEY IDEA",
            title: "Long-Term Financial Fit",
            text: "Compare multiple housing finance companies (HFCs) and select a sustainable tenure with comfortable EMIs.",
          },
        ],
        footerNote: "A clear overview to help applicants understand the complete home finance journey before they apply.",
      },
      {
        slideNumber: 3,
        badge: "AT A GLANCE",
        title: "Core Loan Realities",
        subtitle: "Product features and availability depend on the participating lending partner.",
        type: "grid",
        items: [
          {
            num: "01",
            title: "Options From Top Lenders",
            desc: "Access competitive interest rates from India's premier public, private, and housing finance lenders.",
          },
          {
            num: "02",
            title: "Tenure Choices Up To 30 Years",
            desc: "Flexible tenure options to calibrate monthly EMIs according to your household income capacity.",
          },
          {
            num: "03",
            title: "Expert Guided Application",
            desc: "Dedicated support through legal title verification, property appraisal, and sanction letter terms.",
          },
        ],
        footerNote: "Always review applicable lender disclosures and loan sanctions before accepting an offer.",
      },
      {
        slideNumber: 4,
        badge: "APPLICATION JOURNEY",
        title: "From Enquiry To Sanction",
        subtitle: "The structured journey from initial property selection to final disbursement.",
        type: "steps",
        steps: [
          { step: "1", title: "Estimate property budget, loan amount, and required down payment" },
          { step: "2", title: "Check credit profile (CIBIL score 750+) and preliminary eligibility" },
          { step: "3", title: "Prepare applicant income records and property legal papers" },
          { step: "4", title: "Complete lender credit appraisal, technical inspection, and legal check" },
          { step: "5", title: "Review sanction letter terms, sign agreement, and disburse" },
        ],
        footerNote: "Approval is subject to lender credit assessment, property valuation, and clean title verification.",
      },
      {
        slideNumber: 5,
        badge: "PREPARATION CHECKLIST",
        title: "Documents Applicants May Need",
        subtitle: "The final documentation list depends on employment type and property classification.",
        type: "checklist",
        items: [
          "PAN Card, Aadhaar Card, and valid identity/address proof",
          "Last 3-6 months salary slips or 3 years ITR with computation of income",
          "Last 6-12 months salary/operative bank account statements",
          "Property Documents: Sale agreement, Allotment letter, Title deeds, approved building plans, and NOCs",
        ],
        securityTip:
          "Keep information accurate and up-to-date. Submit documents only through official, encrypted channels. Never disclose OTPs, banking passwords, or UPI PINs to anyone.",
      },
      {
        slideNumber: 6,
        badge: "MAKE AN INFORMED CHOICE",
        title: "Compare Total Borrowing Cost",
        subtitle: "Do not choose a home loan on headline interest rate alone.",
        type: "comparison",
        checks: [
          "Fixed vs floating interest rate mechanisms and repo-rate benchmark linkages",
          "Required down payment (LTV ratio typically 75% to 90% of agreement value)",
          "Processing charges, administrative, legal, and property valuation fees",
          "Prepayment / foreclosure conditions and mandatory property insurance policies",
        ],
        responsibleAdvice:
          "Evaluate total borrowing cost across the entire loan tenure, not merely promotional headline rates.",
        disclaimer:
          "F2Fintech presentation deck • Availability, eligibility, interest rates, fees, and approval terms are determined by the relevant participating lender.",
      },
    ],
  },
  {
    id: "personal-loan",
    fileName: "Personal_Loan_F2Fintech.pptx",
    fileUrl: "/PPT/Personal_Loan_F2Fintech.pptx",
    title: "Personal Loan Presentation",
    tagline: "Flexible, unsecured finance for life's important milestones",
    category: "Personal Finance",
    audience: "Salaried professionals and eligible self-employed individuals",
    fileSize: "38.7 KB",
    slidesCount: 6,
    icon: PersonIcon,
    badgeColor: "#7c3aed",
    gradient: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
    glowColor: "rgba(139, 92, 246, 0.15)",
    applyRoute: "/personal-loan",
    description:
      "A consumer-friendly deck demystifying collateral-free personal loans. Details end-use flexibility (medical, education, home renovation, travel), same-day digital processing, CIBIL score prerequisites, and APR cost transparency.",
    keyTakeaways: [
      "100% unsecured capital with multi-purpose flexibility",
      "Instant digital eligibility and same-day sanction options",
      "Transparent breakdown of APR, processing fee & GST",
      "Tailored EMIs from 12 to 60 months",
    ],
    slides: [
      {
        slideNumber: 1,
        badge: "PERSONAL FINANCE",
        title: "Personal Loan",
        subtitle: "Flexible finance for life's important moments",
        type: "cover",
        note: "LOAN OVERVIEW • OFFICIAL PRESENTATION DECK\nIllustrative information only. Eligibility and terms depend on participating lenders.",
        stats: [
          { label: "Target Profile", value: "Salaried Employees & Professionals" },
          { label: "Funding Scope", value: "Multi-Purpose Unsecured Capital" },
          { label: "Format", value: "PowerPoint Deck (.PPTX)" },
        ],
      },
      {
        slideNumber: 2,
        badge: "INTRODUCING PERSONAL LOAN",
        title: "Unsecured Capital When You Need It",
        subtitle: "Flexible financing designed to support life's planned milestones or sudden contingencies",
        type: "cards",
        cards: [
          {
            tag: "WHO IT MAY SUIT",
            title: "Salaried & Self-Employed",
            text: "Salaried executives, corporate employees, CAs, and professionals with stable verifiable monthly cash flows.",
          },
          {
            tag: "COMMON NEED",
            title: "Diverse Personal Objectives",
            text: "Planned events, higher education, medical treatments, wedding expenses, home upgrades, or debt consolidation.",
          },
          {
            tag: "KEY IDEA",
            title: "Balanced Monthly Budget",
            text: "Compare personalized loan offers and choose an EMI tenure that fits comfortably into your regular cash inflow.",
          },
        ],
        footerNote: "A clear overview to help applicants understand the complete journey before they apply.",
      },
      {
        slideNumber: 3,
        badge: "AT A GLANCE",
        title: "Key Loan Attributes",
        subtitle: "Product features and availability depend on the participating lending partner.",
        type: "grid",
        items: [
          {
            num: "01",
            title: "Flexible Use of Funds",
            desc: "Zero restrictions on fund utilization—use capital wherever you need it without lender end-use monitoring.",
          },
          {
            num: "02",
            title: "Digital-First Experience",
            desc: "Paperless KYC, instant bank statement verification, and fast algorithmic pre-approval.",
          },
          {
            num: "03",
            title: "50+ Lending Partners",
            desc: "Access competitive interest rates from top banks and NBFCs through F2 Fintech's network.",
          },
        ],
        footerNote: "Always review applicable lender disclosures and loan sanctions before accepting an offer.",
      },
      {
        slideNumber: 4,
        badge: "APPLICATION JOURNEY",
        title: "From Enquiry To Disbursal",
        subtitle: "A streamlined digital journey from initial assessment to funds in your account.",
        type: "steps",
        steps: [
          { step: "1", title: "Check basic eligibility and credit score profile" },
          { step: "2", title: "Share application details and employment credentials" },
          { step: "3", title: "Complete digital KYC and bank statement verification" },
          { step: "4", title: "Review the lender's sanction letter and repayment schedule" },
          { step: "5", title: "Accept terms, setup e-Mandate, and receive funds" },
        ],
        footerNote: "Approval is subject to lender credit assessment, verification, and income validation.",
      },
      {
        slideNumber: 5,
        badge: "PREPARATION CHECKLIST",
        title: "Documents Applicants May Need",
        subtitle: "The final documentation list is set by the participating lender.",
        type: "checklist",
        items: [
          "PAN Card and official Identity Proof (Passport, Driving License, Voter ID)",
          "Current Address Proof (Aadhaar, Utility Bills, Rent Agreement)",
          "Last 3 months salary slips or income proof for self-employed applicants",
          "Last 3-6 months operative bank statements showing salary credits",
        ],
        securityTip:
          "Keep information accurate and up-to-date. Submit documents only through official, encrypted channels. Never disclose OTPs, banking passwords, or UPI PINs to anyone.",
      },
      {
        slideNumber: 6,
        badge: "MAKE AN INFORMED CHOICE",
        title: "Compare Full Financial Impact",
        subtitle: "Do not choose a personal loan based on headline interest rate alone.",
        type: "comparison",
        checks: [
          "Interest rate mechanism (reducing balance vs flat rate) and total APR",
          "Upfront processing fees, documentation charges, and GST impact",
          "Repayment tenure and monthly debt-to-income (FOIR) ratio",
          "Prepayment penalties, part-payment terms, and late fee clauses",
        ],
        responsibleAdvice:
          "Choose an EMI amount that fits comfortably within your monthly budget to maintain high CIBIL health.",
        disclaimer:
          "F2Fintech presentation deck • Availability, eligibility, interest rates, fees, and approval terms are determined by the relevant participating lender.",
      },
    ],
  },
  {
    id: "gold-loan",
    fileName: "Gold_Loan_F2Fintech.pptx",
    fileUrl: "/PPT/Gold_Loan_F2Fintech.pptx",
    title: "Gold Loan Presentation",
    tagline: "Instant liquidity backed by eligible gold assets",
    category: "Secured Finance",
    audience: "Applicants who own eligible gold jewellery accepted by institutional lenders",
    fileSize: "38.8 KB",
    slidesCount: 6,
    icon: MonetizationOnIcon,
    badgeColor: "#eab308",
    gradient: "linear-gradient(135deg, #ca8a04 0%, #eab308 100%)",
    glowColor: "rgba(234, 179, 8, 0.15)",
    applyRoute: "/secured-loan",
    description:
      "An informative deck outlining asset-backed borrowing against gold jewelry. Details purity appraisals (18K to 22K), RBI loan-to-value (LTV) limits, doorstep or branch appraisal flows, secure bank vault storage, and asset release protocols.",
    keyTakeaways: [
      "Low interest rates backed by pledged gold collateral",
      "Immediate valuation with minimal income documentation",
      "Flexible repayment: bullet repayment or monthly interest",
      "Insured, high-security vault custody & instant release",
    ],
    slides: [
      {
        slideNumber: 1,
        badge: "SECURED FINANCE",
        title: "Gold Loan",
        subtitle: "Understand borrowing against eligible gold assets",
        type: "cover",
        note: "LOAN OVERVIEW • OFFICIAL PRESENTATION DECK\nIllustrative information only. Eligibility and terms depend on participating lenders.",
        stats: [
          { label: "Target Profile", value: "Gold Asset Owners" },
          { label: "Funding Scope", value: "Rapid Secured Liquidity" },
          { label: "Format", value: "PowerPoint Deck (.PPTX)" },
        ],
      },
      {
        slideNumber: 2,
        badge: "INTRODUCING GOLD LOAN",
        title: "Unlocking The Value Of Gold",
        subtitle: "Understand structured borrowing against eligible gold jewellery and ornaments",
        type: "cards",
        cards: [
          {
            tag: "WHO IT MAY SUIT",
            title: "Gold Jewellery Owners",
            text: "Individuals possessing gold ornaments (typically 18 karat and above) seeking fast liquidity with minimal hassle.",
          },
          {
            tag: "COMMON NEED",
            title: "Urgent Or Working Capital",
            text: "Access emergency funds, agricultural inputs, business liquidity, or short-term bridge financing.",
          },
          {
            tag: "KEY IDEA",
            title: "Low Cost & High Security",
            text: "Take advantage of lower interest rates due to physical collateral, while assets remain securely insured.",
          },
        ],
        footerNote: "A clear overview to help applicants understand the complete journey before they apply.",
      },
      {
        slideNumber: 3,
        badge: "AT A GLANCE",
        title: "Key Loan Dynamics",
        subtitle: "Product features and availability depend on the participating lending partner.",
        type: "grid",
        items: [
          {
            num: "01",
            title: "Loan Amount Linked To Purity",
            desc: "Loan quantum strictly determined by gross weight, net gold weight, purity karat, and market price.",
          },
          {
            num: "02",
            title: "Purity & Integrity Checks",
            desc: "Carried out by certified appraisers using non-destructive gold testing techniques.",
          },
          {
            num: "03",
            title: "Secured Physical Custody",
            desc: "Pledged gold is sealed in tamper-proof bags and stored in high-security bank vaults with insurance.",
          },
        ],
        footerNote: "Always review applicable lender disclosures and loan sanctions before accepting an offer.",
      },
      {
        slideNumber: 4,
        badge: "APPLICATION JOURNEY",
        title: "From Appraisal To Release",
        subtitle: "A swift, hassle-free process from appraisal to fund transfer and subsequent release.",
        type: "steps",
        steps: [
          { step: "1", title: "Check accepted gold items (ornaments 18k - 22k; bullion restrictions apply)" },
          { step: "2", title: "Submit KYC documents and present gold for professional appraisal" },
          { step: "3", title: "Review valuation report and sanctioned Loan-To-Value (LTV) terms" },
          { step: "4", title: "Select repayment structure (Bullet, Monthly Interest, or Regular EMI)" },
          { step: "5", title: "Repay principal + interest and reclaim pledged ornaments securely" },
        ],
        footerNote: "Approval is subject to lender physical verification, purity assessment, and KYC validation.",
      },
      {
        slideNumber: 5,
        badge: "PREPARATION CHECKLIST",
        title: "Documents Applicants May Need",
        subtitle: "Gold loans require minimal documentation compared to unsecured borrowing.",
        type: "checklist",
        items: [
          "PAN Card and valid government Identity / Address proof (Aadhaar, Passport, Voter ID)",
          "Physical gold jewellery or ornaments for certified appraisal",
          "Ownership declaration or purchase invoice if available/requested by lender",
          "Active bank account details for instant NEFT/RTGS loan disbursement",
        ],
        securityTip:
          "Keep information accurate and up-to-date. Submit documents only through official, encrypted channels. Never disclose OTPs, banking passwords, or UPI PINs to anyone.",
      },
      {
        slideNumber: 6,
        badge: "MAKE AN INFORMED CHOICE",
        title: "Compare Terms & Safeguards",
        subtitle: "Do not choose a gold loan on headline interest rate alone.",
        type: "comparison",
        checks: [
          "Gold valuation methodology and eligible purity thresholds",
          "Sanctioned Loan-to-Value (LTV) ratio under prevailing RBI guidelines",
          "Interest rate slabs, processing charges, and renewal fee structures",
          "Default rules, auction notice timelines, and safe asset-release protocols",
        ],
        responsibleAdvice:
          "Understand the consequences of missed payments before pledging family heirlooms or personal gold.",
        disclaimer:
          "F2Fintech presentation deck • Availability, eligibility, interest rates, fees, and approval terms are determined by the relevant participating lender.",
      },
    ],
  },
];

const CATEGORIES = [
  "All Decks",
  "Business Finance",
  "Professional Finance",
  "Home Finance",
  "Personal Finance",
  "Secured Finance",
];

const LoanPresentations = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const [selectedCategory, setSelectedCategory] = useState("All Decks");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalDeck, setActiveModalDeck] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Filtered decks based on Category and Search
  const filteredDecks = useMemo(() => {
    return LOAN_DECKS.filter((deck) => {
      const matchesCategory =
        selectedCategory === "All Decks" || deck.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        deck.title.toLowerCase().includes(query) ||
        deck.tagline.toLowerCase().includes(query) ||
        deck.category.toLowerCase().includes(query) ||
        deck.description.toLowerCase().includes(query) ||
        deck.keyTakeaways.some((k) => k.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle direct file download
  const handleDownload = (e, fileUrl, fileName, title) => {
    if (e) e.stopPropagation();
    try {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloading ${title} (.pptx)...`, {
        position: "bottom-center",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Failed to start download. Please try again.");
    }
  };

  // Open modal
  const openSlideViewer = (deck, slideIdx = 0) => {
    setActiveModalDeck(deck);
    setActiveSlideIndex(slideIdx);
  };

  // Close modal
  const closeSlideViewer = () => {
    setActiveModalDeck(null);
    setActiveSlideIndex(0);
  };

  // Slide navigation in modal
  const handleNextSlide = () => {
    if (!activeModalDeck) return;
    setActiveSlideIndex((prev) =>
      prev < activeModalDeck.slides.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Keyboard navigation for slide modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeModalDeck) return;
      if (e.key === "ArrowRight") handleNextSlide();
      if (e.key === "ArrowLeft") handlePrevSlide();
      if (e.key === "Escape") closeSlideViewer();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalDeck]);

  const activeSlide = activeModalDeck?.slides?.[activeSlideIndex];

  return (
    <Box
      sx={{
        backgroundColor: isDark ? "#0b0f19" : "#f8fafc",
        minHeight: "100vh",
        pb: { xs: 8, md: 12 },
        color: isDark ? "#f1f5f9" : "#0f172a",
        overflowX: "hidden",
      }}
    >
      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          pt: { xs: 7, md: 9 },
          pb: { xs: 6, md: 8 },
          background: isDark
            ? "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.18) 0%, rgba(11,15,25,0) 70%), #0b0f19"
            : "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.1) 0%, rgba(248,250,252,0) 70%), #ffffff",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
        }}
      >
        <Container maxWidth="lg">
          {/* Back link */}
          <Box sx={{ mb: 3 }}>
            <Button
              onClick={() => navigate("/")}
              startIcon={<ArrowBackIcon />}
              sx={{
                color: isDark ? "#94a3b8" : "#64748b",
                textTransform: "none",
                fontSize: "0.95rem",
                fontFamily: "Poppins",
                "&:hover": {
                  color: "#3244e6",
                  backgroundColor: "transparent",
                  transform: "translateX(-3px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Back to Home
            </Button>
          </Box>

          {/* Eyebrow badge */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2.5 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.7,
                borderRadius: "9999px",
                backgroundColor: isDark ? "rgba(50,68,230,0.15)" : "#eef2ff",
                border: "1px solid rgba(50,68,230,0.25)",
                boxShadow: "0 2px 8px rgba(50,68,230,0.08)",
              }}
            >
              <AutoAwesomeOutlinedIcon
                sx={{ fontSize: "1.1rem", color: "#3244e6" }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "0.78rem", sm: "0.85rem" },
                  fontWeight: 650,
                  letterSpacing: "0.06em",
                  color: "#3244e6",
                  textTransform: "uppercase",
                  fontFamily: "Poppins",
                }}
              >
                F2 Fintech Resource Library • Official PPT Decks
              </Typography>
            </Box>
          </Box>

          {/* Main Title */}
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.4rem" },
              fontWeight: 800,
              fontFamily: "DM Sans, Poppins, sans-serif",
              textAlign: "center",
              lineHeight: { xs: 1.2, md: 1.15 },
              mb: 2.5,
              color: isDark ? "#ffffff" : "#0f172a",
              "& span": {
                background: "linear-gradient(135deg, #3244e6 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              },
            }}
          >
            Company Loan <span>Presentations & Pitch Decks</span>
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              maxWidth: 780,
              mx: "auto",
              textAlign: "center",
              fontSize: { xs: "0.98rem", sm: "1.1rem" },
              lineHeight: 1.65,
              color: isDark ? "#94a3b8" : "#475569",
              fontFamily: "Poppins",
              mb: 4.5,
            }}
          >
            Download official F2 Fintech PowerPoint (<strong>.PPTX</strong>) company loan decks or explore them
            interactively. Master loan journeys, eligibility criteria, documentation checklists, and cost comparison frameworks.
          </Typography>

          {/* Highlight Stats Bar */}
          <Grid
            container
            spacing={2}
            sx={{
              maxWidth: 960,
              mx: "auto",
              mb: 4,
            }}
          >
            {[
              {
                icon: FilePresentIcon,
                title: "5 Master Decks",
                desc: "Business, Doctor, Home, Personal & Gold",
              },
              {
                icon: SlideshowIcon,
                title: "30 Slide Overviews",
                desc: "Comprehensive 6-slide journeys per deck",
              },
              {
                icon: DownloadIcon,
                title: "100% Free Download",
                desc: "PowerPoint & Google Slides compatible",
              },
              {
                icon: VerifiedUserOutlinedIcon,
                title: "RBI-Aligned Framework",
                desc: "Transparent checklists & full-cost analysis",
              },
            ].map((stat, idx) => (
              <Grid item xs={6} md={3} key={idx}>
                <Box
                  sx={{
                    p: { xs: 1.75, sm: 2 },
                    borderRadius: "16px",
                    backgroundColor: isDark ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
                    boxShadow: isDark
                      ? "none"
                      : "0 2px 10px rgba(0,0,0,0.03)",
                    textAlign: "center",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <stat.icon
                    sx={{
                      fontSize: "1.75rem",
                      color: "#3244e6",
                      mb: 0.5,
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                      color: isDark ? "#fff" : "#0f172a",
                      fontFamily: "Poppins",
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      color: isDark ? "#94a3b8" : "#64748b",
                      fontFamily: "Poppins",
                    }}
                  >
                    {stat.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Search & Filter Bar */}
          <Box
            sx={{
              maxWidth: 820,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Search Input */}
            <TextField
              fullWidth
              placeholder="Search presentations by loan name, keyword, or document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#3244e6" }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery("")}>
                      <ClearIcon sx={{ fontSize: "1.1rem" }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9999px",
                  backgroundColor: isDark ? "rgba(15, 23, 42, 0.8)" : "#ffffff",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
                  fontFamily: "Poppins",
                  fontSize: "0.95rem",
                  "& fieldset": {
                    borderColor: isDark ? "rgba(255,255,255,0.12)" : "#cbd5e1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3244e6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3244e6",
                  },
                },
              }}
            />

            {/* Category Filter Pills */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <Chip
                    key={cat}
                    label={cat}
                    clickable
                    onClick={() => setSelectedCategory(cat)}
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: active ? 650 : 500,
                      fontSize: "0.84rem",
                      px: 1,
                      py: 2,
                      borderRadius: "9999px",
                      backgroundColor: active
                        ? "#3244e6"
                        : isDark
                        ? "rgba(30, 41, 59, 0.5)"
                        : "#f1f5f9",
                      color: active ? "#ffffff" : isDark ? "#cbd5e1" : "#475569",
                      border: `1px solid ${
                        active
                          ? "#3244e6"
                          : isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0"
                      }`,
                      "&:hover": {
                        backgroundColor: active
                          ? "#2535c5"
                          : isDark
                          ? "rgba(50, 68, 230, 0.15)"
                          : "#e2e8f0",
                      },
                      transition: "all 0.2s ease",
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* DECKS SHOWCASE SECTION */}
      <Container maxWidth="lg" sx={{ mt: { xs: 5, md: 7 } }}>
        {filteredDecks.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 3,
              borderRadius: "20px",
              backgroundColor: isDark ? "rgba(30, 41, 59, 0.3)" : "#ffffff",
              border: `1px dashed ${isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1"}`,
            }}
          >
            <SlideshowIcon sx={{ fontSize: "3rem", color: "#94a3b8", mb: 1 }} />
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: isDark ? "#f1f5f9" : "#0f172a",
                fontFamily: "Poppins",
                mb: 1,
              }}
            >
              No loan presentations found
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: isDark ? "#94a3b8" : "#64748b",
                fontFamily: "Poppins",
                mb: 2.5,
              }}
            >
              Try adjusting your search query or reset the category filter.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Decks");
              }}
              sx={{
                borderRadius: "9999px",
                textTransform: "none",
                fontFamily: "Poppins",
                borderColor: "#3244e6",
                color: "#3244e6",
              }}
            >
              Reset Filters
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3.5}>
            {filteredDecks.map((deck) => {
              const IconComponent = deck.icon;
              return (
                <Grid item xs={12} md={6} key={deck.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "22px",
                      backgroundColor: isDark ? "#111827" : "#ffffff",
                      border: `1px solid ${
                        isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"
                      }`,
                      boxShadow: isDark
                        ? "0 4px 20px rgba(0,0,0,0.3)"
                        : "0 6px 24px rgba(148, 163, 184, 0.12)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: isDark
                          ? "0 12px 30px rgba(0,0,0,0.5)"
                          : "0 16px 36px rgba(50, 68, 230, 0.14)",
                        borderColor: deck.badgeColor,
                      },
                    }}
                  >
                    {/* Top Accent Strip */}
                    <Box
                      sx={{
                        height: 5,
                        background: deck.gradient,
                        width: "100%",
                      }}
                    />

                    <CardContent
                      sx={{
                        p: { xs: 2.5, sm: 3.5 },
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      {/* Header row: Icon + Category + Format Badge */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: "14px",
                              backgroundColor: deck.glowColor,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <IconComponent
                              sx={{ fontSize: "1.7rem", color: deck.badgeColor }}
                            />
                          </Box>
                          <Box>
                            <Chip
                              size="small"
                              label={deck.category}
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.72rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                                backgroundColor: isDark
                                  ? "rgba(255,255,255,0.06)"
                                  : "#f1f5f9",
                                color: deck.badgeColor,
                                border: `1px solid ${deck.badgeColor}30`,
                                fontFamily: "Poppins",
                              }}
                            />
                          </Box>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <Chip
                            size="small"
                            label=".PPTX"
                            sx={{
                              fontWeight: 750,
                              fontSize: "0.7rem",
                              backgroundColor: "#e0e7ff",
                              color: "#3730a3",
                              fontFamily: "Poppins",
                            }}
                          />
                          <Chip
                            size="small"
                            label={`${deck.slidesCount} Slides`}
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              backgroundColor: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "#f8fafc",
                              color: isDark ? "#94a3b8" : "#64748b",
                              fontFamily: "Poppins",
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Deck Title & Tagline */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 750,
                          fontSize: { xs: "1.3rem", sm: "1.45rem" },
                          fontFamily: "DM Sans, Poppins, sans-serif",
                          color: isDark ? "#ffffff" : "#0f172a",
                          mb: 0.75,
                        }}
                      >
                        {deck.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: deck.badgeColor,
                          fontFamily: "Poppins",
                          mb: 2,
                        }}
                      >
                        "{deck.tagline}"
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontSize: "0.88rem",
                          lineHeight: 1.6,
                          color: isDark ? "#94a3b8" : "#475569",
                          fontFamily: "Poppins",
                          mb: 2.5,
                        }}
                      >
                        {deck.description}
                      </Typography>

                      {/* Target Audience Pill */}
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: "12px",
                          backgroundColor: isDark
                            ? "rgba(30, 41, 59, 0.4)"
                            : "#f8fafc",
                          border: `1px solid ${
                            isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"
                          }`,
                          mb: 2.5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            color: isDark ? "#cbd5e1" : "#64748b",
                            fontFamily: "Poppins",
                            mb: 0.25,
                          }}
                        >
                          Target Borrowers:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: isDark ? "#f1f5f9" : "#1e293b",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                          }}
                        >
                          {deck.audience}
                        </Typography>
                      </Box>

                      {/* Key Slide Journey Pills */}
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          sx={{
                            fontSize: "0.78rem",
                            fontWeight: 650,
                            color: isDark ? "#94a3b8" : "#64748b",
                            fontFamily: "Poppins",
                            mb: 1,
                            textTransform: "uppercase",
                            letterSpacing: "0.03em",
                          }}
                        >
                          Included in this Presentation:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                          {deck.keyTakeaways.map((takeaway, tIdx) => (
                            <Box
                              key={tIdx}
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 0.5,
                                px: 1.2,
                                py: 0.4,
                                borderRadius: "8px",
                                backgroundColor: isDark
                                  ? "rgba(255,255,255,0.04)"
                                  : "#f1f5f9",
                                border: `1px solid ${
                                  isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"
                                }`,
                              }}
                            >
                              <CheckCircleIcon
                                sx={{
                                  fontSize: "0.95rem",
                                  color: deck.badgeColor,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "0.78rem",
                                  color: isDark ? "#cbd5e1" : "#334155",
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                }}
                              >
                                {takeaway}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      {/* Actions Footer */}
                      <Box
                        sx={{
                          mt: "auto",
                          pt: 2,
                          borderTop: `1px solid ${
                            isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"
                          }`,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1.2,
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Download button */}
                        <Button
                          variant="contained"
                          startIcon={<DownloadIcon />}
                          onClick={(e) =>
                            handleDownload(e, deck.fileUrl, deck.fileName, deck.title)
                          }
                          sx={{
                            background: deck.gradient,
                            color: "#ffffff",
                            textTransform: "none",
                            borderRadius: "12px",
                            fontFamily: "Poppins",
                            fontWeight: 650,
                            fontSize: "0.88rem",
                            px: 2.2,
                            py: 1,
                            boxShadow: `0 4px 14px ${deck.glowColor}`,
                            "&:hover": {
                              opacity: 0.95,
                              transform: "translateY(-1px)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          Download PPTX ({deck.fileSize})
                        </Button>

                        {/* Preview button */}
                        <Button
                          variant="outlined"
                          startIcon={<VisibilityOutlinedIcon />}
                          onClick={() => openSlideViewer(deck, 0)}
                          sx={{
                            color: isDark ? "#ffffff" : "#0f172a",
                            borderColor: isDark
                              ? "rgba(255,255,255,0.2)"
                              : "#cbd5e1",
                            textTransform: "none",
                            borderRadius: "12px",
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "0.88rem",
                            px: 2,
                            py: 1,
                            "&:hover": {
                              borderColor: deck.badgeColor,
                              color: deck.badgeColor,
                              backgroundColor: deck.glowColor,
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          Preview Slides
                        </Button>

                        {/* Apply Loan Link */}
                        <Button
                          component={Link}
                          to={deck.applyRoute}
                          endIcon={<ArrowForwardIcon sx={{ fontSize: "1rem !important" }} />}
                          sx={{
                            color: "#3244e6",
                            textTransform: "none",
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            p: 0,
                            minWidth: "auto",
                            "&:hover": {
                              backgroundColor: "transparent",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Apply For Loan
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>

      {/* WHY DOWNLOAD OUR PPT DECKS SECTION */}
      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            p: { xs: 3.5, sm: 5, md: 6 },
            borderRadius: "28px",
            background: isDark
              ? "linear-gradient(145deg, #111827 0%, #1e293b 100%)"
              : "linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
            boxShadow: isDark
              ? "0 20px 40px rgba(0,0,0,0.4)"
              : "0 16px 36px rgba(148, 163, 184, 0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", maxWidth: 700, mx: "auto", mb: 5 }}>
            <Chip
              size="small"
              label="EXECUTIVE RESOURCE"
              sx={{
                fontWeight: 700,
                fontSize: "0.72rem",
                color: "#3244e6",
                backgroundColor: isDark ? "rgba(50, 68, 230, 0.15)" : "#eef2ff",
                fontFamily: "Poppins",
                mb: 1.5,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.7rem", md: "2.3rem" },
                fontFamily: "DM Sans, Poppins, sans-serif",
                color: isDark ? "#ffffff" : "#0f172a",
                mb: 1.5,
              }}
            >
              Why Download Our Presentation Decks?
            </Typography>
            <Typography
              sx={{
                fontSize: "0.95rem",
                color: isDark ? "#94a3b8" : "#64748b",
                fontFamily: "Poppins",
                lineHeight: 1.6,
              }}
            >
              Engineered for founders, chartered accountants, finance heads, and borrowers who need clean, boardroom-ready documentation and structured financial clarity.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              {
                icon: AutoAwesomeOutlinedIcon,
                title: "100% Editable & Customizable",
                desc: "Supplied as native .pptx files. Easily customize with your company branding, logo, or financial data in PowerPoint, Google Slides, or Apple Keynote.",
                color: "#3244e6",
              },
              {
                icon: SpeedOutlinedIcon,
                title: "Accelerated Loan Readiness",
                desc: "Eliminate guesswork with structured checklists for KYC, GST records, vintage proofs, and bank statements before approaching 50+ lenders.",
                color: "#059669",
              },
              {
                icon: SecurityOutlinedIcon,
                title: "Transparent Cost Breakdown",
                desc: "Understand effective APR, reducing balance vs flat interest rates, collateral requirements, foreclosure terms, and processing fee structures.",
                color: "#d97706",
              },
              {
                icon: FilePresentIcon,
                title: "Ideal for Client Advisory",
                desc: "Perfect for DSAs, financial advisors, realtors, and CAs to educate clients about borrowing flows, eligibility rules, and timeline expectations.",
                color: "#7c3aed",
              },
            ].map((feature, fIdx) => (
              <Grid item xs={12} sm={6} md={3} key={fIdx}>
                <Box
                  sx={{
                    p: 2.75,
                    borderRadius: "18px",
                    backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "#ffffff",
                    border: `1px solid ${
                      isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"
                    }`,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      backgroundColor: `${feature.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <feature.icon
                      sx={{ fontSize: "1.5rem", color: feature.color }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.02rem",
                      color: isDark ? "#ffffff" : "#0f172a",
                      fontFamily: "Poppins",
                      mb: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      color: isDark ? "#94a3b8" : "#64748b",
                      fontFamily: "Poppins",
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* QUICK COMPARISON TABLE */}
      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", maxWidth: 680, mx: "auto", mb: 4 }}>
          <Chip
            size="small"
            label="AT A GLANCE"
            sx={{
              fontWeight: 700,
              fontSize: "0.72rem",
              color: "#3244e6",
              backgroundColor: isDark ? "rgba(50, 68, 230, 0.15)" : "#eef2ff",
              fontFamily: "Poppins",
              mb: 1.5,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.6rem", md: "2.1rem" },
              fontFamily: "DM Sans, Poppins, sans-serif",
              color: isDark ? "#ffffff" : "#0f172a",
              mb: 1,
            }}
          >
            Loan Presentations Comparison Matrix
          </Typography>
          <Typography
            sx={{
              fontSize: "0.92rem",
              color: isDark ? "#94a3b8" : "#64748b",
              fontFamily: "Poppins",
            }}
          >
            Compare key parameters across the 5 downloadable loan presentations.
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "20px",
            backgroundColor: isDark ? "#111827" : "#ffffff",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
            boxShadow: isDark
              ? "0 4px 24px rgba(0,0,0,0.3)"
              : "0 4px 20px rgba(0,0,0,0.04)",
            overflow: "auto",
          }}
        >
          <Table sx={{ minWidth: 680 }}>
            <TableHead
              sx={{
                backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: "0.88rem",
                  }}
                >
                  Loan Deck
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: "0.88rem",
                  }}
                >
                  Target Audience
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: "0.88rem",
                  }}
                >
                  Collateral Mode
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: "0.88rem",
                  }}
                >
                  Slides
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: "0.88rem",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LOAN_DECKS.map((d) => (
                <TableRow
                  key={d.id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    borderColor: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: 650,
                      fontFamily: "Poppins",
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      fontSize: "0.88rem",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "8px",
                          backgroundColor: d.glowColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <d.icon sx={{ fontSize: "1.2rem", color: d.badgeColor }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 650, fontSize: "0.88rem", fontFamily: "Poppins" }}>
                          {d.title}
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "Poppins" }}>
                          {d.fileName}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Poppins",
                      color: isDark ? "#94a3b8" : "#475569",
                      fontSize: "0.84rem",
                    }}
                  >
                    {d.audience}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    <Chip
                      size="small"
                      label={
                        d.id === "gold-loan"
                          ? "Secured (Gold)"
                          : d.id === "home-loan"
                          ? "Property Mortgage"
                          : "Collateral-Free / Hybrid"
                      }
                      sx={{
                        fontSize: "0.74rem",
                        fontWeight: 600,
                        fontFamily: "Poppins",
                        backgroundColor:
                          d.id === "gold-loan" || d.id === "home-loan"
                            ? isDark
                              ? "rgba(217, 119, 6, 0.15)"
                              : "#fef3c7"
                            : isDark
                            ? "rgba(16, 185, 129, 0.15)"
                            : "#d1fae5",
                        color:
                          d.id === "gold-loan" || d.id === "home-loan"
                            ? "#b45309"
                            : "#047857",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Poppins",
                      color: isDark ? "#94a3b8" : "#64748b",
                      fontSize: "0.84rem",
                    }}
                  >
                    6 Slides (.pptx)
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => openSlideViewer(d, 0)}
                        sx={{
                          textTransform: "none",
                          fontFamily: "Poppins",
                          fontSize: "0.78rem",
                          borderRadius: "8px",
                          borderColor: isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1",
                          color: isDark ? "#fff" : "#0f172a",
                        }}
                      >
                        Preview
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={(e) =>
                          handleDownload(e, d.fileUrl, d.fileName, d.title)
                        }
                        sx={{
                          textTransform: "none",
                          fontFamily: "Poppins",
                          fontSize: "0.78rem",
                          borderRadius: "8px",
                          backgroundColor: "#3244e6",
                          color: "#fff",
                        }}
                      >
                        Download
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <Container maxWidth="md" sx={{ mt: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Chip
            size="small"
            label="HELP & GUIDANCE"
            sx={{
              fontWeight: 700,
              fontSize: "0.72rem",
              color: "#3244e6",
              backgroundColor: isDark ? "rgba(50, 68, 230, 0.15)" : "#eef2ff",
              fontFamily: "Poppins",
              mb: 1.5,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.7rem", md: "2.2rem" },
              fontFamily: "DM Sans, Poppins, sans-serif",
              color: isDark ? "#ffffff" : "#0f172a",
              mb: 1,
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            sx={{
              fontSize: "0.95rem",
              color: isDark ? "#94a3b8" : "#64748b",
              fontFamily: "Poppins",
            }}
          >
            Everything you need to know about using and sharing these loan presentation decks.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {[
            {
              q: "Can I open, edit, and re-brand these PowerPoint files?",
              a: "Yes. All decks are provided in open .pptx format. You can customize slide layouts, replace placeholder figures with your actual business financials, add your company logo, and present to boards, investors, or bank credit officers.",
            },
            {
              q: "Are these loan decks free to download and share?",
              a: "Absolutely. These presentations are public educational and advisory resources created by F2 Fintech to help Indian entrepreneurs, medical professionals, salaried employees, and CAs understand borrowing journeys without opaque jargon.",
            },
            {
              q: "How does F2 Fintech help me after I review a presentation?",
              a: "Once you have selected the appropriate loan structure, you can apply directly on F2 Fintech. Our platform connects you with 50+ leading banks and NBFCs across India (including HDFC, ICICI, Bajaj Finserv, Axis Bank, Tata Capital, and more) to negotiate competitive interest rates and minimal processing fees.",
            },
            {
              q: "Which presentation should I download if I need urgent funding?",
              a: "For immediate liquidity without collateral, review the Personal Loan or Business Loan deck. If you own gold jewelry and require the lowest interest rates with same-day cash disbursement, consult the Gold Loan deck.",
            },
            {
              q: "What software can I use to view these .pptx files?",
              a: "You can view and edit these decks on Microsoft PowerPoint (Windows, Mac, iOS, Android), Google Slides (100% free online), Apple Keynote, LibreOffice Impress, or directly preview them right here in your browser using our interactive slide viewer.",
            },
          ].map((faq, idx) => (
            <Accordion
              key={idx}
              elevation={0}
              sx={{
                borderRadius: "16px !important",
                backgroundColor: isDark ? "#111827" : "#ffffff",
                border: `1px solid ${
                  isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"
                }`,
                "&:before": { display: "none" },
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#3244e6" }} />}
                sx={{
                  px: 2.5,
                  py: 1,
                  "& .MuiAccordionSummary-content": {
                    margin: "12px 0",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 650,
                    fontSize: "0.98rem",
                    color: isDark ? "#ffffff" : "#0f172a",
                    fontFamily: "Poppins",
                  }}
                >
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                <Typography
                  sx={{
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                    color: isDark ? "#94a3b8" : "#475569",
                    fontFamily: "Poppins",
                  }}
                >
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* BOTTOM CTA BANNER */}
      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: "28px",
            background: "linear-gradient(135deg, #1e3a8a 0%, #3244e6 60%, #0284c7 100%)",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(50, 68, 230, 0.25)",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Subtle Background Circles */}
          <Box
            sx={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              pointerEvents: "none",
            }}
          />

          <Grid container spacing={3} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
            <Grid item xs={12} md={8}>
              <Chip
                size="small"
                label="READY TO FINANCE YOUR GOAL?"
                sx={{
                  fontWeight: 750,
                  fontSize: "0.72rem",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  fontFamily: "Poppins",
                  mb: 2,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", md: "2.4rem" },
                  fontFamily: "DM Sans, Poppins, sans-serif",
                  lineHeight: 1.25,
                  mb: 1.5,
                }}
              >
                Compare Offers From 50+ Banks on F2 Fintech
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "Poppins",
                  maxWidth: 620,
                  lineHeight: 1.6,
                }}
              >
                Whether you need an unsecured business loan, home loan balance transfer, doctor overdraft limit, or personal credit—get pre-approved with India's trusted loan partner.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} sx={{ textAlign: { xs: "center", md: "right" } }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, alignItems: { xs: "center", md: "flex-end" } }}>
                <Button
                  component={Link}
                  to="/application-form"
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#3244e6",
                    fontWeight: 750,
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    px: 3.5,
                    py: 1.3,
                    borderRadius: "9999px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Apply For Loan Now
                </Button>
                <Button
                  onClick={() =>
                    (window.location.href = "https://finwise-eligibility.netlify.app/")
                  }
                  sx={{
                    color: "#ffffff",
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    fontSize: "0.9rem",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Check Instant Eligibility →
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* INTERACTIVE FULLSCREEN / MODAL SLIDE VIEWER */}
      <Modal
        open={Boolean(activeModalDeck)}
        onClose={closeSlideViewer}
        aria-labelledby="slide-deck-viewer-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 1.5, sm: 3, md: 4 },
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(10, 15, 29, 0.85)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1040,
            maxHeight: "92vh",
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            borderRadius: "24px",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#cbd5e1"}`,
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            outline: "none",
            overflow: "hidden",
          }}
        >
          {/* Modal Header Bar */}
          <Box
            sx={{
              px: { xs: 2.5, sm: 3.5 },
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${
                isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"
              }`,
              backgroundColor: isDark ? "#111827" : "#f8fafc",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <SlideshowIcon sx={{ color: "#3244e6", fontSize: "1.6rem" }} />
              <Box>
                <Typography
                  id="slide-deck-viewer-title"
                  sx={{
                    fontWeight: 750,
                    fontSize: { xs: "0.95rem", sm: "1.1rem" },
                    fontFamily: "DM Sans, Poppins, sans-serif",
                    color: isDark ? "#ffffff" : "#0f172a",
                    lineHeight: 1.2,
                  }}
                >
                  {activeModalDeck?.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: isDark ? "#94a3b8" : "#64748b",
                    fontFamily: "Poppins",
                  }}
                >
                  {activeModalDeck?.category} • {activeModalDeck?.fileName}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {/* Slide Counter Badge */}
              <Chip
                size="small"
                label={`Slide ${activeSlideIndex + 1} of ${
                  activeModalDeck?.slides?.length || 6
                }`}
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 650,
                  fontSize: "0.78rem",
                  backgroundColor: "#3244e6",
                  color: "#ffffff",
                }}
              />

              {/* Download Button in modal header */}
              <Tooltip title="Download this presentation (.pptx)">
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={(e) =>
                    handleDownload(
                      e,
                      activeModalDeck.fileUrl,
                      activeModalDeck.fileName,
                      activeModalDeck.title
                    )
                  }
                  sx={{
                    display: { xs: "none", sm: "inline-flex" },
                    textTransform: "none",
                    fontFamily: "Poppins",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    borderColor: isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1",
                    color: isDark ? "#fff" : "#0f172a",
                  }}
                >
                  Download .pptx
                </Button>
              </Tooltip>

              {/* Close Button */}
              <IconButton
                onClick={closeSlideViewer}
                size="small"
                sx={{
                  color: isDark ? "#94a3b8" : "#64748b",
                  "&:hover": { color: "#ef4444" },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* SLIDE CANVAS (16:9 Aspect Presentation Frame) */}
          <Box
            sx={{
              p: { xs: 2.5, sm: 4 },
              flexGrow: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: isDark ? "#090d16" : "#f1f5f9",
            }}
          >
            {activeSlide && (
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: { xs: "auto", md: "16 / 9" },
                  minHeight: { xs: 380, sm: 420 },
                  borderRadius: "18px",
                  background: isDark
                    ? "linear-gradient(135deg, #111827 0%, #1e293b 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"
                  }`,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  p: { xs: 2.5, sm: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Slide Top Bar */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pb: 1.5,
                    borderBottom: `1px solid ${
                      isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9"
                    }`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        letterSpacing: "0.06em",
                        color: "#3244e6",
                        fontFamily: "DM Sans, Poppins, sans-serif",
                      }}
                    >
                      F2FINTECH
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: isDark ? "#64748b" : "#94a3b8",
                        fontFamily: "Poppins",
                      }}
                    >
                      |
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 650,
                        letterSpacing: "0.06em",
                        color: isDark ? "#94a3b8" : "#64748b",
                        textTransform: "uppercase",
                        fontFamily: "Poppins",
                      }}
                    >
                      {activeSlide.badge}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: isDark ? "#64748b" : "#94a3b8",
                      fontFamily: "Poppins",
                    }}
                  >
                    0{activeSlide.slideNumber}
                  </Typography>
                </Box>

                {/* SLIDE CONTENT PER TYPE */}
                <Box sx={{ my: "auto", py: 2 }}>
                  {/* TYPE: COVER */}
                  {activeSlide.type === "cover" && (
                    <Box sx={{ textAlign: "center", py: { xs: 2, md: 3 } }}>
                      <Chip
                        size="small"
                        label="LOAN OVERVIEW • OFFICIAL DECK"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.72rem",
                          letterSpacing: "0.05em",
                          color: "#3244e6",
                          backgroundColor: isDark
                            ? "rgba(50, 68, 230, 0.15)"
                            : "#eef2ff",
                          fontFamily: "Poppins",
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "1.9rem", sm: "2.6rem", md: "3rem" },
                          fontFamily: "DM Sans, Poppins, sans-serif",
                          color: isDark ? "#ffffff" : "#0f172a",
                          mb: 1.5,
                        }}
                      >
                        {activeSlide.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "1.05rem", sm: "1.25rem" },
                          color: activeModalDeck.badgeColor,
                          fontWeight: 600,
                          fontFamily: "Poppins",
                          mb: 3,
                        }}
                      >
                        {activeSlide.subtitle}
                      </Typography>

                      {/* Stat boxes */}
                      {activeSlide.stats && (
                        <Grid
                          container
                          spacing={2}
                          sx={{ maxWidth: 640, mx: "auto", mb: 2 }}
                        >
                          {activeSlide.stats.map((s, idx) => (
                            <Grid item xs={12} sm={4} key={idx}>
                              <Box
                                sx={{
                                  p: 1.5,
                                  borderRadius: "12px",
                                  backgroundColor: isDark
                                    ? "rgba(15, 23, 42, 0.6)"
                                    : "#ffffff",
                                  border: `1px solid ${
                                    isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"
                                  }`,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "0.72rem",
                                    color: isDark ? "#94a3b8" : "#64748b",
                                    fontFamily: "Poppins",
                                  }}
                                >
                                  {s.label}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.88rem",
                                    fontWeight: 700,
                                    color: isDark ? "#fff" : "#0f172a",
                                    fontFamily: "Poppins",
                                  }}
                                >
                                  {s.value}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Box>
                  )}

                  {/* TYPE: CARDS */}
                  {activeSlide.type === "cards" && (
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 750,
                          fontSize: { xs: "1.4rem", sm: "1.85rem" },
                          fontFamily: "DM Sans, Poppins, sans-serif",
                          color: isDark ? "#ffffff" : "#0f172a",
                          mb: 0.5,
                        }}
                      >
                        {activeSlide.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: isDark ? "#94a3b8" : "#64748b",
                          fontFamily: "Poppins",
                          mb: 2.5,
                        }}
                      >
                        {activeSlide.subtitle}
                      </Typography>

                      <Grid container spacing={2}>
                        {activeSlide.cards?.map((card, cIdx) => (
                          <Grid item xs={12} md={4} key={cIdx}>
                            <Box
                              sx={{
                                p: 2.2,
                                height: "100%",
                                borderRadius: "14px",
                                backgroundColor: isDark
                                  ? "rgba(15, 23, 42, 0.5)"
                                  : "#ffffff",
                                border: `1px solid ${
                                  isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"
                                }`,
                              }}
                            >
                              <Chip
                                size="small"
                                label={card.tag}
                                sx={{
                                  fontSize: "0.68rem",
                                  fontWeight: 700,
                                  color: activeModalDeck.badgeColor,
                                  backgroundColor: isDark
                                    ? "rgba(255,255,255,0.05)"
                                    : "#f1f5f9",
                                  fontFamily: "Poppins",
                                  mb: 1,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "0.98rem",
                                  color: isDark ? "#fff" : "#0f172a",
                                  fontFamily: "Poppins",
                                  mb: 0.75,
                                }}
                              >
                                {card.title}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.82rem",
                                  lineHeight: 1.55,
                                  color: isDark ? "#94a3b8" : "#475569",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {card.text}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* TYPE: GRID */}
                  {activeSlide.type === "grid" && (
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 750,
                          fontSize: { xs: "1.4rem", sm: "1.85rem" },
                          fontFamily: "DM Sans, Poppins, sans-serif",
                          color: isDark ? "#ffffff" : "#0f172a",
                          mb: 0.5,
                        }}
                      >
                        {activeSlide.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: isDark ? "#94a3b8" : "#64748b",
                          fontFamily: "Poppins",
                          mb: 2.5,
                        }}
                      >
                        {activeSlide.subtitle}
                      </Typography>

                      <Grid container spacing={2}>
                        {activeSlide.items?.map((item, iIdx) => (
                          <Grid item xs={12} md={4} key={iIdx}>
                            <Box
                              sx={{
                                p: 2.2,
                                height: "100%",
                                borderRadius: "14px",
                                backgroundColor: isDark
                                  ? "rgba(15, 23, 42, 0.5)"
                                  : "#ffffff",
                                border: `1px solid ${
                                  isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"
                                }`,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 800,
                                  fontSize: "1.5rem",
                                  color: activeModalDeck.badgeColor,
                                  fontFamily: "DM Sans, Poppins, sans-serif",
                                  mb: 0.75,
                                }}
                              >
                                {item.num}
                              </Typography>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "0.98rem",
                                  color: isDark ? "#fff" : "#0f172a",
                                  fontFamily: "Poppins",
                                  mb: 0.75,
                                }}
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.82rem",
                                  lineHeight: 1.55,
                                  color: isDark ? "#94a3b8" : "#475569",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {item.desc}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* TYPE: STEPS */}
                  {activeSlide.type === "steps" && (
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 750,
                          fontSize: { xs: "1.4rem", sm: "1.85rem" },
                          fontFamily: "DM Sans, Poppins, sans-serif",
                          color: isDark ? "#ffffff" : "#0f172a",
                          mb: 0.5,
                        }}
                      >
                        {activeSlide.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: isDark ? "#94a3b8" : "#64748b",
                          fontFamily: "Poppins",
                          mb: 2.5,
                        }}
                      >
                        {activeSlide.subtitle}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.2,
                        }}
                      >
                        {activeSlide.steps?.map((st, sIdx) => (
                          <Box
                            key={sIdx}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              p: 1.5,
                              borderRadius: "12px",
                              backgroundColor: isDark
                                ? "rgba(15, 23, 42, 0.5)"
                                : "#ffffff",
                              border: `1px solid ${
                                isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"
                              }`,
                            }}
                          >
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                backgroundColor: activeModalDeck.badgeColor,
                                color: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 750,
                                fontSize: "0.85rem",
                                flexShrink: 0,
                                fontFamily: "Poppins",
                              }}
                            >
                              {st.step}
                            </Box>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                color: isDark ? "#f1f5f9" : "#1e293b",
                                fontFamily: "Poppins",
                              }}
                            >
                              {st.title}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* TYPE: CHECKLIST */}
                  {activeSlide.type === "checklist" && (
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 750,
                          fontSize: { xs: "1.4rem", sm: "1.85rem" },
                          fontFamily: "DM Sans, Poppins, sans-serif",
                          color: isDark ? "#ffffff" : "#0f172a",
                          mb: 0.5,
                        }}
                      >
                        {activeSlide.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: isDark ? "#94a3b8" : "#64748b",
                          fontFamily: "Poppins",
                          mb: 2.5,
                        }}
                      >
                        {activeSlide.subtitle}
                      </Typography>

                      <Grid container spacing={1.5} sx={{ mb: 2 }}>
                        {activeSlide.items?.map((itemText, iIdx) => (
                          <Grid item xs={12} sm={6} key={iIdx}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 1.5,
                                p: 1.5,
                                borderRadius: "12px",
                                backgroundColor: isDark
                                  ? "rgba(15, 23, 42, 0.5)"
                                  : "#ffffff",
                                border: `1px solid ${
                                  isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"
                                }`,
                                height: "100%",
                              }}
                            >
                              <CheckCircleIcon
                                sx={{
                                  fontSize: "1.2rem",
                                  color: activeModalDeck.badgeColor,
                                  mt: 0.2,
                                  flexShrink: 0,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "0.85rem",
                                  lineHeight: 1.5,
                                  color: isDark ? "#f1f5f9" : "#1e293b",
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                }}
                              >
                                {itemText}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>

                      {activeSlide.securityTip && (
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: "10px",
                            backgroundColor: isDark
                              ? "rgba(217, 119, 6, 0.12)"
                              : "#fffbeb",
                            border: `1px solid ${
                              isDark ? "rgba(217, 119, 6, 0.3)" : "#fde68a"
                            }`,
                            display: "flex",
                            alignItems: "center",
                            gap: 1.2,
                          }}
                        >
                          <SecurityOutlinedIcon
                            sx={{ color: "#d97706", fontSize: "1.3rem" }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.78rem",
                              color: isDark ? "#fbbf24" : "#92400e",
                              fontFamily: "Poppins",
                              fontWeight: 500,
                            }}
                          >
                            <strong>Safety Reminder:</strong> {activeSlide.securityTip}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* TYPE: COMPARISON */}
                  {activeSlide.type === "comparison" && (
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 750,
                          fontSize: { xs: "1.4rem", sm: "1.85rem" },
                          fontFamily: "DM Sans, Poppins, sans-serif",
                          color: isDark ? "#ffffff" : "#0f172a",
                          mb: 0.5,
                        }}
                      >
                        {activeSlide.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: isDark ? "#94a3b8" : "#64748b",
                          fontFamily: "Poppins",
                          mb: 2.5,
                        }}
                      >
                        {activeSlide.subtitle}
                      </Typography>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={7}>
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: "14px",
                              backgroundColor: isDark
                                ? "rgba(15, 23, 42, 0.5)"
                                : "#ffffff",
                              border: `1px solid ${
                                isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"
                              }`,
                              height: "100%",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                color: activeModalDeck.badgeColor,
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                                fontFamily: "Poppins",
                                mb: 1.5,
                              }}
                            >
                              Check These Terms:
                            </Typography>
                            {activeSlide.checks?.map((chk, cIdx) => (
                              <Box
                                key={cIdx}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.2,
                                  mb: 1,
                                }}
                              >
                                <CheckCircleIcon
                                  sx={{
                                    fontSize: "1rem",
                                    color: activeModalDeck.badgeColor,
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: "0.82rem",
                                    color: isDark ? "#cbd5e1" : "#334155",
                                    fontFamily: "Poppins",
                                  }}
                                >
                                  {chk}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={5}>
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: "14px",
                              backgroundColor: isDark
                                ? "rgba(50, 68, 230, 0.12)"
                                : "#eef2ff",
                              border: `1px solid rgba(50, 68, 230, 0.25)`,
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                color: "#3244e6",
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                                fontFamily: "Poppins",
                                mb: 1,
                              }}
                            >
                              Borrow Responsibly:
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.86rem",
                                lineHeight: 1.6,
                                color: isDark ? "#f1f5f9" : "#1e293b",
                                fontFamily: "Poppins",
                                fontWeight: 500,
                              }}
                            >
                              {activeSlide.responsibleAdvice}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Box>

                {/* Slide Bottom Bar */}
                <Box
                  sx={{
                    pt: 1.5,
                    borderTop: `1px solid ${
                      isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      color: isDark ? "#64748b" : "#94a3b8",
                      fontFamily: "Poppins",
                    }}
                  >
                    {activeSlide.footerNote ||
                      activeSlide.disclaimer ||
                      "F2Fintech Sample Presentation • All terms subject to participating lender assessment."}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "#3244e6",
                      fontFamily: "Poppins",
                    }}
                  >
                    f2fintech.com
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* Modal Bottom Controls & Thumbnail Strip */}
          <Box
            sx={{
              px: { xs: 2.5, sm: 3.5 },
              py: 2,
              borderTop: `1px solid ${
                isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"
              }`,
              backgroundColor: isDark ? "#111827" : "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {/* Slide Navigation Buttons */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ChevronLeftIcon />}
                disabled={activeSlideIndex === 0}
                onClick={handlePrevSlide}
                sx={{
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  borderRadius: "10px",
                }}
              >
                Previous Slide
              </Button>

              {/* Thumbnails / Indicators */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  overflowX: "auto",
                  py: 0.5,
                }}
              >
                {activeModalDeck?.slides?.map((sl, sIdx) => {
                  const isCurrent = sIdx === activeSlideIndex;
                  return (
                    <Box
                      key={sIdx}
                      onClick={() => setActiveSlideIndex(sIdx)}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: isCurrent
                          ? "#3244e6"
                          : isDark
                          ? "rgba(255,255,255,0.06)"
                          : "#f1f5f9",
                        color: isCurrent
                          ? "#ffffff"
                          : isDark
                          ? "#94a3b8"
                          : "#64748b",
                        fontSize: "0.75rem",
                        fontWeight: isCurrent ? 700 : 500,
                        fontFamily: "Poppins",
                        whiteSpace: "nowrap",
                        transition: "all 0.15s ease",
                        "&:hover": {
                          backgroundColor: isCurrent
                            ? "#3244e6"
                            : isDark
                            ? "rgba(255,255,255,0.12)"
                            : "#e2e8f0",
                        },
                      }}
                    >
                      Slide {sIdx + 1}
                    </Box>
                  );
                })}
              </Box>

              <Button
                variant="contained"
                endIcon={<ChevronRightIcon />}
                disabled={
                  activeSlideIndex ===
                  (activeModalDeck?.slides?.length || 6) - 1
                }
                onClick={handleNextSlide}
                sx={{
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  borderRadius: "10px",
                  backgroundColor: "#3244e6",
                }}
              >
                Next Slide
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default LoanPresentations;

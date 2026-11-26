import jsPDF from "jspdf";

const ACCOUNT_TYPE_MAP = {
  "01": "AUTO LOAN",
  "02": "HOUSING LOAN",
  "03": "PROPERTY LOAN",
  "04": "LOAN AGAINST SHARES",
  "05": "PERSONAL LOAN",
  "06": "CONSUMER LOAN",
  "07": "GOLD LOAN",
  "08": "EDUCATION LOAN",
  "09": "PROFESSIONAL LOAN",
  "10": "CREDIT CARDS",
  "11": "LEASING",
  "12": "OVERDRAFT",
  "13": "TWO-WHEELER LOAN",
  "14": "NON-FUNDED CREDIT",
  "15": "LOAN AGAINST DEPOSIT",
  "31": "SECURED CREDIT CARD",
  "32": "USED CAR LOAN",
  "33": "CONSTRUCTION EQUIP LOAN",
  "34": "TRACTOR LOAN",
  "35": "CORPORATE CREDIT CARD",
  "36": "KISAN CREDIT CARD",
  "37": "LOAN ON CREDIT CARD",
  "38": "PMJDY OVERDRAFT",
  "39": "MUDRA / MICROFINANCE",
  "40": "MICROFINANCE BUSINESS",
  "41": "MICROFINANCE PERSONAL",
  "42": "MICROFINANCE HOUSING",
  "50": "BUSINESS LOAN",
  "51": "BUSINESS LOAN (SECURED)",
  "52": "BUSINESS LOAN (PSL)",
  "53": "AGRICULTURE LOAN",
  "54": "BUSINESS LOAN (OTHER)",
  "61": "SHORT-TERM LOAN",
  "69": "SHORT-TERM PERSONAL LOAN",
};

const ACCOUNT_STATUS_MAP = {
  "11": "ACTIVE",
  "12": "CLOSED",
  "13": "CLOSED",
  "14": "CLOSED",
  "15": "CLOSED",
  "16": "CLOSED",
  "17": "CLOSED",
  "21": "ACTIVE",
  "22": "ACTIVE",
  "53": "WRITTEN OFF",
  "61": "RESTRUCTURED",
  "71": "ACTIVE",
  "78": "SETTLED",
  "80": "SETTLED",
  "82": "SUIT FILED",
  "83": "WILFUL DEFAULT",
  "84": "PAST DUE / DEFAULT",
  "89": "WRITTEN OFF",
  "93": "SUIT FILED",
  "97": "SUIT FILED",
};

const GENDER_MAP = { "1": "Male", "2": "Female", "3": "Transgender" };
const PHONE_TYPE_MAP = { "01": "Mobile", "02": "Home", "03": "Office", "00": "Phone" };
const MONTHS_DESC = [
  { num: "12", label: "Dec" },
  { num: "11", label: "Nov" },
  { num: "10", label: "Oct" },
  { num: "09", label: "Sep" },
  { num: "08", label: "Aug" },
  { num: "07", label: "Jul" },
  { num: "06", label: "Jun" },
  { num: "05", label: "May" },
  { num: "04", label: "Apr" },
  { num: "03", label: "Mar" },
  { num: "02", label: "Feb" },
  { num: "01", label: "Jan" },
];

const COLORS = {
  brandBlue: [0, 102, 161],
  darkNavy: [15, 38, 70],
  textDark: [30, 41, 59],
  textMid: [71, 85, 105],
  textLight: [100, 116, 139],
  border: [203, 213, 225],
  lightBg: [244, 247, 250],
  sectionBarBg: [241, 245, 249],
  green: [22, 163, 74],
  pillGreen: [0, 153, 102],
  pillOrange: [245, 124, 0],
  pillRed: [211, 47, 47],
  white: [255, 255, 255],
};

const toNumber = (val) => {
  if (val === undefined || val === null || val === "") return 0;
  const num = Number(String(val).replace(/,/g, "").trim());
  return Number.isNaN(num) ? 0 : num;
};

const formatINR = (val, dashIfEmpty = false) => {
  if (val === undefined || val === null || String(val).trim() === "") {
    return dashIfEmpty ? "-" : "0";
  }
  const num = Number(String(val).replace(/,/g, "").trim());
  if (Number.isNaN(num)) return String(val);
  return num.toLocaleString("en-IN");
};

const formatExperianDate = (raw, fallback = "-") => {
  if (!raw) return fallback;
  const s = String(raw).trim();
  if (/^\d{8}$/.test(s)) {
    return `${s.slice(6, 8)}-${s.slice(4, 6)}-${s.slice(0, 4)}`;
  }
  return s || fallback;
};

const toList = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val !== "object") return [];
  const keys = Object.keys(val);
  if (keys.length === 0) return [];
  if (keys.every((k) => /^\d+$/.test(k))) {
    return keys
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => val[k])
      .filter(Boolean);
  }
  return [val];
};

const findScoreDeep = (node, depth = 0) => {
  if (!node || typeof node !== "object" || depth > 8) return null;
  const scoreKeys = [
    "bureauscore",
    "credit_score",
    "creditscore",
    "bureau_score",
    "cibil_score",
    "experian_score",
  ];
  if (!Array.isArray(node)) {
    for (const [k, v] of Object.entries(node)) {
      if (scoreKeys.includes(k.toLowerCase()) && v !== undefined && v !== null && v !== "") {
        const parsed = parseInt(String(v).trim(), 10);
        if (!Number.isNaN(parsed) && parsed >= 300 && parsed <= 900) return parsed;
      }
    }
    for (const v of Object.values(node)) {
      if (v && typeof v === "object") {
        const found = findScoreDeep(v, depth + 1);
        if (found !== null) return found;
      }
    }
  } else {
    for (const item of node) {
      const found = findScoreDeep(item, depth + 1);
      if (found !== null) return found;
    }
  }
  return null;
};

const resolveAccountType = (code) => {
  const clean = String(code || "").trim().padStart(2, "0");
  return ACCOUNT_TYPE_MAP[clean] || ACCOUNT_TYPE_MAP[String(code || "").trim()] || `LOAN (${code || "-"})`;
};

const resolveAccountStatus = (acc) => {
  const code = String(acc.Account_Status || "").trim();
  const hasClosed = Boolean(acc.Date_Closed && String(acc.Date_Closed).trim());
  if (ACCOUNT_STATUS_MAP[code]) return ACCOUNT_STATUS_MAP[code];
  if (hasClosed) return "CLOSED";
  if (toNumber(acc.Amount_Past_Due) > 0) return "PAST DUE";
  return code ? `STATUS ${code}` : "ACTIVE";
};

const resolveSuitFiled = (code) => {
  const s = String(code || "").trim();
  if (!s || s === "00" || s === "0") return "No Suit filed";
  if (s === "01") return "Suit filed";
  if (s === "02") return "Wilful default";
  if (s === "03") return "Suit filed (Wilful default)";
  return s;
};

const extractExperianReport = (reportData, meta = {}) => {
  const responseData = reportData?.response?.data || reportData?.data || {};
  const root =
    responseData?.credit_report ||
    reportData?.credit_report ||
    reportData?.INProfileResponse ||
    responseData?.INProfileResponse ||
    reportData ||
    {};

  const caisAccount = root?.CAIS_Account || {};
  const rawAccounts = toList(caisAccount?.CAIS_Account_DETAILS);
  const caisSummary = caisAccount?.CAIS_Summary || {};
  const creditAcc = caisSummary?.Credit_Account || {};
  const balSummary = caisSummary?.Total_Outstanding_Balance || {};
  const header = root?.CreditProfileHeader || root?.Header || {};
  const appDetails = root?.Current_Application?.Current_Application_Details || {};
  const applicant = appDetails?.Current_Applicant_Details || {};

  let fallbackName = "";
  let fallbackPan = "";
  let fallbackMobile = "";
  let fallbackEmail = "";
  let fallbackDob = "";
  let fallbackGender = "";
  let fallbackPassport = "";
  let fallbackVoter = "";
  let fallbackDl = "";
  let fallbackRation = "";
  let fallbackUid = "";

  const accounts = rawAccounts.map((acc) => {
    const holder = toList(acc?.CAIS_Holder_Details)[0] || {};
    const phone = toList(acc?.CAIS_Holder_Phone_Details)[0] || {};
    const addr = toList(acc?.CAIS_Holder_Address_Details)[0] || {};
    const idDet = toList(acc?.CAIS_Holder_ID_Details)[0] || {};

    const holderFullName = [
      holder.First_Name_Non_Normalized,
      holder.Middle_Name_1_Non_Normalized,
      holder.Surname_Non_Normalized,
    ]
      .map((v) => String(v || "").trim())
      .filter(Boolean)
      .join(" ");

    const fullAddress = [
      addr.First_Line_Of_Address_non_normalized,
      addr.Second_Line_Of_Address_non_normalized,
      addr.Third_Line_Of_Address_non_normalized,
      addr.City_non_normalized,
      addr.ZIP_Postal_Code_non_normalized,
    ]
      .map((v) => String(v || "").trim())
      .filter(Boolean)
      .join(" ");

    const panVal = holder.Income_TAX_PAN || idDet.Income_TAX_PAN || "";
    const emailVal = phone.EMailId || idDet.EMailId || "";
    const mobileVal = phone.Mobile_Telephone_Number || phone.Telephone_Number || "";
    const dobVal = formatExperianDate(holder.Date_of_birth, "-");
    const genderVal = GENDER_MAP[String(holder.Gender_Code || "").trim()] || "-";

    if (!fallbackName && holderFullName) fallbackName = holderFullName;
    if (!fallbackPan && panVal) fallbackPan = panVal;
    if (!fallbackMobile && mobileVal) fallbackMobile = mobileVal;
    if (!fallbackEmail && emailVal) fallbackEmail = emailVal;
    if (!fallbackDob && dobVal !== "-") fallbackDob = dobVal;
    if (!fallbackGender && genderVal !== "-") fallbackGender = genderVal;
    if (!fallbackPassport && (holder.Passport_Number || idDet.Passport_Number)) {
      fallbackPassport = holder.Passport_Number || idDet.Passport_Number;
    }
    if (!fallbackVoter && (holder.Voter_ID_Number || idDet.Voter_ID_Number)) {
      fallbackVoter = holder.Voter_ID_Number || idDet.Voter_ID_Number;
    }
    if (!fallbackDl && idDet.Driver_License_Number) fallbackDl = idDet.Driver_License_Number;
    if (!fallbackRation && idDet.Ration_Card_Number) fallbackRation = idDet.Ration_Card_Number;
    if (!fallbackUid && idDet.Universal_ID_Number) fallbackUid = idDet.Universal_ID_Number;

    // Build year -> month -> DPD map from CAIS_Account_History
    const historyRows = toList(acc?.CAIS_Account_History);
    const historyMap = {};
    const yearSet = new Set();
    historyRows.forEach((h) => {
      const yr = String(h.Year || "").trim();
      const mo = String(h.Month || "").trim().padStart(2, "0");
      if (!yr || !mo) return;
      yearSet.add(yr);
      if (!historyMap[yr]) historyMap[yr] = {};
      const dpdRaw = String(h.Days_Past_Due ?? "").trim();
      const assetRaw = String(h.Asset_Classification ?? "").trim();
      if (dpdRaw !== "") {
        historyMap[yr][mo] = dpdRaw;
      } else if (assetRaw && assetRaw !== "?") {
        historyMap[yr][mo] = assetRaw;
      }
    });

    const sortedYears = Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
    const currentYear = String(new Date().getFullYear());
    const yearsToShow =
      sortedYears.length >= 3
        ? sortedYears.slice(0, 3)
        : [
            sortedYears[0] || currentYear,
            String(Number(sortedYears[0] || currentYear) - 1),
            String(Number(sortedYears[0] || currentYear) - 2),
          ];

    const statusLabel = resolveAccountStatus(acc);

    return {
      lender: acc.Subscriber_Name || "Lender",
      accountType: resolveAccountType(acc.Account_Type),
      accountNo: acc.Account_Number || "-",
      ownership: acc.AccountHoldertypeCode === "2" ? "Joint" : "Individual",
      dateReported: formatExperianDate(acc.Date_Reported),
      accountStatus: statusLabel,
      isClosed: statusLabel === "CLOSED",
      dateOpened: formatExperianDate(acc.Open_Date),
      dateClosed: formatExperianDate(acc.Date_Closed),
      lastPaymentDate: formatExperianDate(acc.Date_of_Last_Payment),
      sanctionAmt: acc.Highest_Credit_or_Original_Loan_Amount,
      currentBalance: acc.Current_Balance,
      amountOverdue: acc.Amount_Past_Due,
      creditLimit: acc.Credit_Limit_Amount,
      emi: acc.Scheduled_Monthly_Payment_Amount,
      repaymentTenure: acc.Repayment_Tenure,
      rateOfInterest: acc.Rate_of_Interest,
      valueOfCollateral: acc.Value_of_Collateral,
      typeOfCollateral: acc.Type_of_Collateral || "-",
      suitFiled: resolveSuitFiled(acc.SuitFiled_WilfulDefault),
      totalWriteOff: acc.Written_Off_Amt_Total,
      principalWriteOff: acc.Written_Off_Amt_Principal,
      settlementAmt: acc.Settlement_Amount,
      facilityStatus: acc.Written_off_Settled_Status || "-",
      consumerName: holderFullName || meta.name || responseData.name || "-",
      address: fullAddress || "-",
      dob: dobVal !== "-" ? dobVal : fallbackDob || "-",
      gender: genderVal !== "-" ? genderVal : fallbackGender || "-",
      email: emailVal || fallbackEmail || "-",
      phoneType: PHONE_TYPE_MAP[String(phone.Telephone_Type || "01").trim()] || "Mobile",
      phoneNumber: mobileVal || responseData.mobile || meta.mobile || "-",
      idType: panVal ? "PAN" : "-",
      idNumber: panVal || responseData.pan || meta.pan || "-",
      historyYears: yearsToShow,
      historyMap,
    };
  });

  const rawScore =
    meta.creditScore ||
    root?.SCORE?.BureauScore ||
    responseData?.credit_score ||
    responseData?.score ||
    findScoreDeep(reportData);
  const parsedScore =
    rawScore !== undefined && rawScore !== null
      ? parseInt(String(rawScore).trim(), 10)
      : NaN;
  const creditScore =
    !Number.isNaN(parsedScore) && parsedScore >= 300 && parsedScore <= 900
      ? String(parsedScore)
      : "N/A";

  const appName = [applicant.First_Name, applicant.Middle_Name1, applicant.Last_Name]
    .map((v) => String(v || "").trim())
    .filter(Boolean)
    .join(" ");

  const caps = root?.TotalCAPS_Summary || root?.CAPS?.CAPS_Summary || {};
  const enquiries = toList(root?.CAPS?.CAPS_Application_Details).map((e) => ({
    institution: e.Subscriber_Name || "-",
    date: formatExperianDate(e.Date_of_Request),
    reason: resolveAccountType(e.Enquiry_Reason),
    amount: formatINR(e.Amount_Financed, true),
  }));

  const computedActive = accounts.filter((a) => !a.isClosed).length;
  const computedClosed = accounts.filter((a) => a.isClosed).length;
  const computedBal = accounts.reduce((s, a) => s + toNumber(a.currentBalance), 0);

const formatTenDigitTxnId = (rawId) => {
  const s = String(rawId || "").trim();
  if (!s || s === "-") return "-";
  if (/^\d{10}$/.test(s)) return s;
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ (c + i), 0x85ebca6b) >>> 0;
  }
  const combined = (h1 & 0x1fffff) * 4294967296 + h2;
  return String(1000000000 + (combined % 9000000000));
};

  return {
    ern: header.ReportNumber || "-",
    txnId: formatTenDigitTxnId(meta.transactionId || header.ReportNumber || "-"),
    reportCreated: formatExperianDate(
      header.ReportDate || root?.Header?.ReportDate,
      new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
    ),
    applicant: {
      name: responseData.name || appName || meta.name || fallbackName || "-",
      mobile: responseData.mobile || applicant.MobilePhoneNumber || meta.mobile || fallbackMobile || "-",
      telephone: applicant.Telephone_Number_Applicant_1st || "-",
      pan: responseData.pan || applicant.IncomeTaxPan || meta.pan || fallbackPan || "-",
      email: applicant.EMailId || fallbackEmail || "-",
      passport: applicant.Passport_number || fallbackPassport || "-",
      voter: applicant.Voter_s_Identity_Card || fallbackVoter || "-",
      aadhaar: applicant.Universal_ID_Number || fallbackUid || "-",
      drivingLicense: applicant.Driver_License_Number || fallbackDl || "-",
      rationCard: applicant.Ration_Card_Number || fallbackRation || "-",
    },
    creditScore,
    summary: {
      totalAccounts: creditAcc.CreditAccountTotal ?? accounts.length,
      activeAccounts: creditAcc.CreditAccountActive ?? computedActive,
      closedAccounts: creditAcc.CreditAccountClosed ?? computedClosed,
      defaultAccounts: creditAcc.CreditAccountDefault ?? "0",
      totalBalance: balSummary.Outstanding_Balance_All ?? balSummary.Total_Outstanding_Balance ?? computedBal,
      sfWdWoAmt: creditAcc.CADSuitFiledCurrentBalance ?? "0",
      securedAmt: balSummary.Outstanding_Balance_Secured ?? "0",
      unsecuredAmt: balSummary.Outstanding_Balance_UnSecured ?? "0",
      enq7: caps.TotalCAPSLast7Days ?? caps.CAPSLast7Days ?? "0",
      enq30: caps.TotalCAPSLast30Days ?? caps.CAPSLast30Days ?? "0",
      enq90: caps.TotalCAPSLast90Days ?? caps.CAPSLast90Days ?? "0",
      enq180: caps.TotalCAPSLast180Days ?? caps.CAPSLast180Days ?? "0",
    },
    accounts,
    enquiries,
  };
};

// ─── Drawing Primitives ───────────────────────────────────────────────────────
const drawGreenCheckBadge = (doc, cx, cy, radius = 2.1) => {
  doc.setFillColor(...COLORS.green);
  doc.circle(cx, cy, radius, "F");
  doc.setDrawColor(...COLORS.white);
  doc.setLineWidth(0.45);
  doc.line(cx - radius * 0.45, cy + radius * 0.05, cx - radius * 0.1, cy + radius * 0.4);
  doc.line(cx - radius * 0.1, cy + radius * 0.4, cx + radius * 0.5, cy - radius * 0.35);
};

const drawExperianMosaicLogo = (doc, x, y) => {
  // Subtle colored dot-mosaic mark + "experian." wordmark matching reference layout
  const dots = [
    [0, 0, [0, 102, 161]],
    [2.1, 0, [0, 153, 204]],
    [4.2, 0.9, [106, 27, 154]],
    [0, 2.1, [194, 24, 91]],
    [2.1, 2.1, [0, 102, 161]],
    [4.2, 3.0, [0, 153, 204]],
    [0, 4.2, [106, 27, 154]],
    [2.1, 4.2, [194, 24, 91]],
  ];
  dots.forEach(([dx, dy, col]) => {
    doc.setFillColor(...col);
    doc.roundedRect(x + dx, y + dy, 1.4, 1.4, 0.3, 0.3, "F");
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13.5);
  doc.setTextColor(...COLORS.brandBlue);
  doc.text("experian.", x + 7.5, y + 4.3);
};

const drawPageHeader = (doc, report, pageW, margin) => {
  drawExperianMosaicLogo(doc, margin, 9);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.brandBlue);
  doc.text("Experian Credit Report", pageW - margin, 12.5, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.textDark);
  doc.text(`Experian Report Number (ERN) : ${report.ern}`, pageW - margin, 17, { align: "right" });
  doc.text(`Unique Transaction ID : ${report.txnId}`, pageW - margin, 20.5, { align: "right" });
  doc.text(`Report Created : ${report.reportCreated}`, pageW - margin, 24, { align: "right" });
};

const drawSectionHeading = (doc, title, subtitle, x, y, width) => {
  doc.setFillColor(...COLORS.sectionBarBg);
  doc.rect(x, y, width, 6.2, "F");
  drawGreenCheckBadge(doc, x + 3.2, y + 3.1, 2.0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(...COLORS.darkNavy);
  doc.text(title, x + 7.5, y + 4.2);

  let nextY = y + 9.2;
  if (subtitle) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.8);
    doc.setTextColor(...COLORS.textLight);
    const lines = doc.splitTextToSize(subtitle, width);
    doc.text(lines, x, nextY);
    nextY += lines.length * 3.2 + 1.2;
  }
  return nextY;
};

const drawAccountSummaryHeader = (doc, x, y, cols) => {
  doc.setFillColor(...COLORS.lightBg);
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.25);
  const totalW = cols.reduce((s, c) => s + c.w, 0);
  doc.rect(x, y, totalW, 7.8, "FD");

  let cx = x;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.1);
  doc.setTextColor(...COLORS.textDark);
  cols.forEach((col) => {
    doc.line(cx, y, cx, y + 7.8);
    const lines = doc.splitTextToSize(col.label, col.w - 1.5);
    doc.text(lines.slice(0, 2), cx + 1, y + 3.1);
    cx += col.w;
  });
  doc.line(cx, y, cx, y + 7.8);
  return y + 7.8;
};

const drawDetailCard = (doc, acct, index, x, y, width) => {
  // Top header row: TYPE  Lender  ...  ✓ Acct N
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.6);
  doc.setTextColor(...COLORS.brandBlue);
  doc.text(`${acct.accountType}    ${acct.lender}`.slice(0, 82), x, y + 3.5);

  drawGreenCheckBadge(doc, x + width - 13.5, y + 2.5, 1.8);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.darkNavy);
  doc.text(`Acct ${index + 1}`, x + width, y + 3.5, { align: "right" });

  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.25);
  doc.line(x, y + 5.2, x + width, y + 5.2);

  // Consumer Name + Address 1
  let curY = y + 8.5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.setTextColor(...COLORS.textDark);
  doc.text(acct.consumerName, x, curY);
  curY += 3.5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.3);
  doc.text("Address 1", x, curY);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.textMid);
  const addrText = doc.splitTextToSize(acct.address, width - 18)[0] || "-";
  doc.text(addrText, x + 13, curY);
  curY += 4.2;

  // Subheading: Credit Account details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.brandBlue);
  doc.text("Credit Account details", x, curY);
  curY += 1.6;

  // 3-column bordered box
  const boxH = 35.5;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(x, curY, width, boxH, 1.5, 1.5, "FD");

  const colW = width / 3;
  const colsData = [
    {
      heading: "Account terms",
      rows: [
        ["Account Number", acct.accountNo, true],
        ["Date Opened", acct.dateOpened],
        ["Date Closed", acct.dateClosed],
        ["Ownership", acct.ownership],
        ["Rate of Interest", acct.rateOfInterest || "-"],
        ["Value of Collateral", formatINR(acct.valueOfCollateral, true)],
        ["Type of Collateral", acct.typeOfCollateral || "-"],
      ],
    },
    {
      heading: "Account description",
      rows: [
        ["Date Reported", acct.dateReported],
        ["Loan Type", acct.accountType.slice(0, 22)],
        ["Account Status", acct.accountStatus, true, acct.isClosed ? COLORS.pillRed : COLORS.pillGreen],
        ["Sanctioned Amt", formatINR(acct.sanctionAmt, true), true],
        ["Current Balance", formatINR(acct.currentBalance, true), true],
        ["Amount Overdue", formatINR(acct.amountOverdue, false)],
        ["Last Payment Date", acct.lastPaymentDate],
        ["SuitFiled Wilful Default", acct.suitFiled],
      ],
    },
    {
      heading: "Account details",
      rows: [
        ["Credit Limit Amt", formatINR(acct.creditLimit, true)],
        ["EMI", formatINR(acct.emi, true)],
        ["Repayment Tenure", acct.repaymentTenure !== undefined && acct.repaymentTenure !== "" ? String(acct.repaymentTenure) : "-"],
        ["Total Write-off Amt", formatINR(acct.totalWriteOff, true)],
        ["Principal Write-off", formatINR(acct.principalWriteOff, true)],
        ["Settlement Amt", formatINR(acct.settlementAmt, true)],
        ["Credit Facility Status", acct.facilityStatus || "-"],
      ],
    },
  ];

  colsData.forEach((col, cIdx) => {
    const cx = x + cIdx * colW + 2.5;
    const rightX = x + (cIdx + 1) * colW - 2.5;
    let ry = curY + 4.2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...COLORS.darkNavy);
    doc.text(col.heading, cx, ry);
    ry += 3.8;

    col.rows.forEach(([label, val, isBold, customColor]) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.0);
      doc.setTextColor(...COLORS.textMid);
      doc.text(label, cx, ry);

      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setTextColor(...(customColor || COLORS.textDark));
      doc.text(String(val ?? "-").slice(0, 24), rightX, ry, { align: "right" });
      ry += 3.65;
    });
  });

  curY += boxH + 3.5;

  // Payment History Grid (3 Years x 12 Months)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.brandBlue);
  doc.text("Payment History", x, curY);
  curY += 1.6;

  const yearColW = 14;
  const monthColW = (width - yearColW) / 12;
  const rowH = 5.6;

  // Header row
  doc.setFillColor(...COLORS.lightBg);
  doc.setDrawColor(...COLORS.border);
  doc.rect(x, curY, width, rowH, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.3);
  doc.setTextColor(...COLORS.darkNavy);
  doc.text("DPD", x + yearColW / 2, curY + 3.9, { align: "center" });

  MONTHS_DESC.forEach((m, mIdx) => {
    const mx = x + yearColW + mIdx * monthColW;
    doc.line(mx, curY, mx, curY + rowH);
    doc.text(m.label, mx + monthColW / 2, curY + 3.9, { align: "center" });
  });
  curY += rowH;

  acct.historyYears.forEach((yr) => {
    doc.setFillColor(255, 255, 255);
    doc.rect(x, curY, width, rowH, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.3);
    doc.setTextColor(...COLORS.darkNavy);
    doc.text(String(yr), x + yearColW / 2, curY + 3.9, { align: "center" });

    MONTHS_DESC.forEach((m, mIdx) => {
      const mx = x + yearColW + mIdx * monthColW;
      doc.line(mx, curY, mx, curY + rowH);
      const val = acct.historyMap?.[yr]?.[m.num];
      if (val !== undefined && val !== "") {
        const numericVal = parseInt(val, 10);
        let pillColor = COLORS.pillGreen;
        if (!Number.isNaN(numericVal)) {
          if (numericVal >= 90) pillColor = COLORS.pillRed;
          else if (numericVal > 0) pillColor = COLORS.pillOrange;
        } else if (["B", "D", "L", "SUB", "DBT", "LSS"].includes(val.toUpperCase())) {
          pillColor = COLORS.pillRed;
        } else if (["M", "SMA"].includes(val.toUpperCase())) {
          pillColor = COLORS.pillOrange;
        }
        const pw = Math.max(5.4, String(val).length * 2.1 + 3);
        const ph = 3.8;
        const px = mx + (monthColW - pw) / 2;
        const py = curY + (rowH - ph) / 2;
        doc.setFillColor(...pillColor);
        doc.roundedRect(px, py, pw, ph, 1.8, 1.8, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(5.8);
        doc.setTextColor(...COLORS.white);
        doc.text(String(val), mx + monthColW / 2, curY + 3.9, { align: "center" });
      }
    });
    curY += rowH;
  });

  curY += 2.2;

  // Consumer Personal details on the Credit Account
  const personalBoxH = 14.5;
  doc.setFillColor(...COLORS.lightBg);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(x, curY, width, personalBoxH, 1.2, 1.2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.2);
  doc.setTextColor(...COLORS.brandBlue);
  doc.text("Consumer Personal details on the Credit Account", x + 2.5, curY + 3.6);

  const pCols = [
    [
      ["Date of Birth", acct.dob],
      ["Gender", acct.gender],
      ["Email address", acct.email],
    ],
    [
      ["Phone Type", acct.phoneType],
      ["Phone Number", acct.phoneNumber],
    ],
    [
      ["ID Type", acct.idType],
      ["ID Number", acct.idNumber],
    ],
  ];

  pCols.forEach((rows, idx) => {
    const px = x + idx * colW + 2.5;
    const pr = x + (idx + 1) * colW - 2.5;
    let py = curY + 7.2;
    rows.forEach(([l, v]) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.8);
      doc.setTextColor(...COLORS.textMid);
      doc.text(l, px, py);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...COLORS.textDark);
      doc.text(String(v || "-").slice(0, 28), pr, py, { align: "right" });
      py += 3.1;
    });
  });

  return curY + personalBoxH;
};

/**
 * Generates an official-layout Experian Credit Report PDF matching the multi-page Experian template,
 * triggers browser download, and returns `{ blobUrl, fileName }`.
 */
export const generateExperianPdfBlobUrl = (reportData, meta = {}) => {
  const report = extractExperianReport(reportData, meta);
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 10;
  const contentW = pageW - margin * 2;

  // ── PAGE 1: Header + Current Application + Score + Summary + Account Summary Table
  drawPageHeader(doc, report, pageW, margin);
  let y = 29;

  // 1. CURRENT APPLICATION INFORMATION
  y = drawSectionHeading(
    doc,
    "CURRENT APPLICATION INFORMATION",
    "These are the details you give us when you apply for your Experian Credit Report.",
    margin,
    y,
    contentW
  );

  const appGrid = [
    [
      ["Name", report.applicant.name],
      ["Mobile Phone", report.applicant.mobile],
      ["Passport Number", report.applicant.passport],
      ["Email", report.applicant.email],
    ],
    [
      ["Telephone", report.applicant.telephone],
      ["PAN", report.applicant.pan],
      ["Voter ID", report.applicant.voter],
      ["Aadhaar Number", report.applicant.aadhaar],
    ],
    [
      ["Driving License", report.applicant.drivingLicense],
      ["Ration Card", report.applicant.rationCard],
    ],
  ];

  const appColW = contentW / 3;
  appGrid.forEach((rows, idx) => {
    const ax = margin + idx * appColW;
    const valOffset = 22;
    const maxValW = appColW - valOffset - 2.5;
    let ay = y + 1;
    rows.forEach(([label, val]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.4);
      doc.setTextColor(...COLORS.textDark);
      doc.text(label, ax, ay);
      doc.setFont("helvetica", "normal");
      const valLines = doc.splitTextToSize(String(val || "-"), maxValW);
      doc.text(valLines.slice(0, 2), ax + valOffset, ay);
      ay += valLines.length > 1 ? 6.2 : 3.9;
    });
  });
  y += 20.5;

  // 2. EXPERIAN CREDIT SCORE
  y = drawSectionHeading(
    doc,
    "EXPERIAN CREDIT SCORE",
    "Your Experian Credit Report is summarized in the form of Experian Credit Score which ranges from 300 - 900.",
    margin,
    y,
    contentW
  );

  const scoreBoxH = 26;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, y, contentW, scoreBoxH, 1.5, 1.5, "FD");

  // Left score panel
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.6);
  doc.setTextColor(...COLORS.textMid);
  doc.text("YOUR EXPERIAN", margin + 23, y + 6, { align: "center" });
  doc.text("CREDIT SCORE", margin + 23, y + 9.2, { align: "center" });

  doc.setFontSize(22);
  doc.setTextColor(...COLORS.darkNavy);
  doc.text(report.creditScore, margin + 23, y + 18.5, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(6.5);
  doc.setTextColor(...COLORS.textLight);
  doc.text("Range: 300 - 900", margin + 23, y + 23, { align: "center" });

  // Vertical divider
  doc.line(margin + 46, y + 3, margin + 46, y + scoreBoxH - 3);

  // Right Score Factors
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.darkNavy);
  doc.text("Score Factors", margin + 52, y + 6);

  const factors = [
    ["1.", "Recency :", "Recent Credit Account Defaults"],
    ["2.", "Leverage :", "Credit Accounts with on-time re-payment history"],
    ["3.", "Coverage :", "Non-delinquent and delinquent Credit Accounts"],
    ["4.", "Delinquency Status :", "Defaults on Credit Accounts (current & recent periodic intervals)"],
  ];
  let fy = y + 10.5;
  factors.forEach(([num, title, desc]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...COLORS.textDark);
    doc.text(`${num}  ${title}`, margin + 52, fy);
    doc.setFont("helvetica", "normal");
    doc.text(desc, margin + 82, fy);
    fy += 3.9;
  });

  y += scoreBoxH + 5;

  // 3. REPORT SUMMARY
  y = drawSectionHeading(doc, "REPORT SUMMARY", null, margin, y, contentW);
  const sumH = 24;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(margin, y, contentW, sumH, 1.5, 1.5, "FD");
  doc.line(margin + appColW, y, margin + appColW, y + sumH);
  doc.line(margin + appColW * 2, y, margin + appColW * 2, y + sumH);

  const summaryCols = [
    {
      title: "Credit Account Summary",
      rows: [
        ["Total number of Accounts", String(report.summary.totalAccounts)],
        ["Active Accounts", String(report.summary.activeAccounts)],
        ["Closed Accounts", String(report.summary.closedAccounts)],
        ["Defaults / CC/CO", String(report.summary.defaultAccounts)],
      ],
    },
    {
      title: "Current Balance Amount Summary",
      rows: [
        ["Total Current Bal. amt", formatINR(report.summary.totalBalance)],
        ["SF/WD/WO/Settled amt", formatINR(report.summary.sfWdWoAmt)],
        ["Secured Accounts amt", formatINR(report.summary.securedAmt)],
        ["Unsecured Accounts amt", formatINR(report.summary.unsecuredAmt)],
      ],
    },
    {
      title: "Credit Enquiry Summary",
      rows: [
        ["Last 7 days credit enquiries", String(report.summary.enq7)],
        ["Last 30 days credit enquiries", String(report.summary.enq30)],
        ["Last 90 days credit enquiries", String(report.summary.enq90)],
        ["Last 180 days credit enquiries", String(report.summary.enq180)],
      ],
    },
  ];

  summaryCols.forEach((col, idx) => {
    const sx = margin + idx * appColW + 2.5;
    const sr = margin + (idx + 1) * appColW - 2.5;
    let sy = y + 4.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(...COLORS.darkNavy);
    doc.text(col.title, sx, sy);
    sy += 4.5;
    col.rows.forEach(([l, v]) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.3);
      doc.setTextColor(...COLORS.textMid);
      doc.text(l, sx, sy);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...COLORS.textDark);
      doc.text(v, sr, sy, { align: "right" });
      sy += 4.1;
    });
  });

  y += sumH + 5;

  // 4. SUMMARY: CREDIT ACCOUNT INFORMATION (Table)
  y = drawSectionHeading(
    doc,
    "SUMMARY: CREDIT ACCOUNT INFORMATION",
    "This section displays summary of all your reported credit accounts found in the Experian Credit Bureau database.",
    margin,
    y,
    contentW
  );

  const summaryTableCols = [
    { label: "", w: 11 },
    { label: "Lender", w: 33 },
    { label: "Account type", w: 23 },
    { label: "Account No", w: 28 },
    { label: "Ownership", w: 14 },
    { label: "Date Reported", w: 15 },
    { label: "Account Status", w: 13 },
    { label: "Date Opened", w: 14 },
    { label: "Sanction Amt / Highest Credit", w: 16 },
    { label: "Current Balance", w: 12 },
    { label: "Amount Overdue", w: 11 },
  ];

  y = drawAccountSummaryHeader(doc, margin, y, summaryTableCols);

  report.accounts.forEach((acct, idx) => {
    const rowH = 7.4;
    if (y + rowH > pageH - 16) {
      doc.addPage();
      drawPageHeader(doc, report, pageW, margin);
      y = 29;
      y = drawAccountSummaryHeader(doc, margin, y, summaryTableCols);
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...COLORS.border);
    doc.rect(margin, y, contentW, rowH, "FD");

    const cells = [
      `Acct ${idx + 1}`,
      acct.lender,
      acct.accountType,
      acct.accountNo,
      acct.ownership,
      acct.dateReported,
      acct.accountStatus,
      acct.dateOpened,
      formatINR(acct.sanctionAmt, true),
      formatINR(acct.currentBalance, true),
      formatINR(acct.amountOverdue, false),
    ];

    let cx = margin;
    cells.forEach((cellVal, cIdx) => {
      const col = summaryTableCols[cIdx];
      doc.line(cx, y, cx, y + rowH);
      const isRight = cIdx >= 8;
      doc.setFont("helvetica", cIdx === 0 || cIdx === 6 ? "bold" : "normal");
      doc.setFontSize(5.8);
      if (cIdx === 6) {
        doc.setTextColor(...(acct.isClosed ? COLORS.pillRed : COLORS.pillGreen));
      } else {
        doc.setTextColor(...COLORS.textDark);
      }

      const wrapped = doc.splitTextToSize(String(cellVal), col.w - 1.5);
      if (isRight) {
        doc.text(wrapped[0] || "-", cx + col.w - 1, y + 4.4, { align: "right" });
      } else {
        doc.text(wrapped.slice(0, 2), cx + 1, y + 3.2);
      }
      cx += col.w;
    });
    doc.line(cx, y, cx, y + rowH);
    y += rowH;
  });

  // ── PAGES 2..N: CREDIT ACCOUNT INFORMATION DETAILS (2 accounts per page) ──
  if (report.accounts.length > 0) {
    doc.addPage();
    drawPageHeader(doc, report, pageW, margin);
    y = 29;
    y = drawSectionHeading(
      doc,
      "CREDIT ACCOUNT INFORMATION DETAILS",
      "This section has information based on the details provided to Experian by all our member banks, credit / financial institutions and other credit grantors with whom you have a credit / loan account.",
      margin,
      y,
      contentW
    );

    report.accounts.forEach((acct, idx) => {
      const cardEstimatedH = 114;
      if (y + cardEstimatedH > pageH - 12) {
        doc.addPage();
        drawPageHeader(doc, report, pageW, margin);
        y = 29;
      }
      const endY = drawDetailCard(doc, acct, idx, margin, y, contentW);
      y = endY + 7;
    });
  }

  // ── FINAL PAGE: CREDIT ENQUIRIES + CONTACTING US + LEGEND ──────────────────
  doc.addPage();
  drawPageHeader(doc, report, pageW, margin);
  y = 29;

  // CREDIT ENQUIRIES
  doc.setFillColor(...COLORS.sectionBarBg);
  doc.rect(margin, y, contentW, 6.2, "F");
  drawGreenCheckBadge(doc, margin + 3.2, y + 3.1, 2.0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(...COLORS.darkNavy);
  doc.text("CREDIT ENQUIRIES", margin + 7.5, y + 4.2);
  if (report.enquiries.length === 0) {
    doc.setFontSize(7.5);
    doc.text("No Records Found", pageW - margin - 2, y + 4.2, { align: "right" });
  }
  y += 9;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(6.8);
  doc.setTextColor(...COLORS.textLight);
  doc.text(
    "This section shows the names of the credit institutions that have processed a credit / loan application for you.",
    margin,
    y
  );
  y += 4.5;

  if (report.enquiries.length > 0) {
    report.enquiries.forEach((e, idx) => {
      if (y + 6 > pageH - 20) {
        doc.addPage();
        drawPageHeader(doc, report, pageW, margin);
        y = 29;
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.8);
      doc.setTextColor(...COLORS.textDark);
      doc.text(
        `${idx + 1}. ${e.institution}   |   ${e.reason}   |   Date: ${e.date}   |   Amount: ${e.amount}`,
        margin + 2,
        y
      );
      y += 4.5;
    });
    y += 3;
  }

  // CONTACTING US
  y = drawSectionHeading(doc, "CONTACTING US", null, margin, y, contentW);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.7);
  doc.setTextColor(...COLORS.textDark);
  const contactText = doc.splitTextToSize(
    "If you find a discrepancy in your report, it is important to quickly raise it with your lender. Under the Credit Information Companies (Regulation) Act 2005 and as per the guidelines set by the Reserve Bank of India, Experian Credit Information Company of India Private Limited is not authorized to change any data in your credit information report without authorisation from your lender. However, we would be happy to help you with this process. If you would like us to help please visit https://consumer.experian.in/ECV-OLN/ to raise a dispute regarding the discrepancy.",
    contentW
  );
  doc.text(contactText, margin, y);
  y += contactText.length * 3.4 + 4;

  // LEGEND
  y = drawSectionHeading(doc, "LEGEND", null, margin, y, contentW);
  const legendItems = [
    ["Active:", "Credit Accounts that do not have 'Date Closed' populated."],
    ["Closed:", "Credit accounts that have 'Date Closed' populated."],
    ["CO:", "Entity ceased while account was open."],
    ["CC:", "Entity ceased while account was closed."],
    ["DPD:", "Days Past Due. Number of days that have passed from the agreed payment due date of EMI."],
    ["  o  DPD '0':", "The number '0' in the circle indicates that the Payment is made as agreed and the credit account is up to date."],
    ["  o  DPD > 0:", "The number in the circle indicates the 'Days Past Due' reported by the respective lender."],
    ["S:", "Standard: An account which is overdue for less than 90 days is considered as a Standard asset as per RBI guidelines."],
    ["M:", "Special Mention: These accounts are 'Standard' assets but for some discrepancy the lending organization would like to monitor this account closely."],
    ["B:", "Substandard: An account which is overdue by 90 days for a period of less than or equal to 12 months is classified as Substandard asset as per RBI guidelines."],
    ["D:", "Doubtful: An account which is overdue by 90 days for more than 12 months is classified as doubtful asset as per RBI guidelines."],
    ["L:", "Loss: An account where loss has been identified but the amount has not been written off, wholly or partially is classified as Loss asset as per RBI guidelines."],
  ];

  legendItems.forEach(([key, desc]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...COLORS.darkNavy);
    doc.text(key, margin + 2, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.textDark);
    const lines = doc.splitTextToSize(desc, contentW - 22);
    doc.text(lines, margin + 20, y);
    y += lines.length * 3.3 + 1.2;
  });

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.textMid);
  doc.text("< - - - - - - - - - - - - - - - -   END OF REPORT   - - - - - - - - - - - - - - - - >", pageW / 2, y, { align: "center" });

  // Footers on every page
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p += 1) {
    doc.setPage(p);
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.2);
    doc.line(margin, pageH - 11, pageW - margin, pageH - 11);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...COLORS.textLight);
    doc.text("Generated via F2 Fintech · Experian Bureau V2 Report", margin, pageH - 6.5);
    doc.text(`Page ${p} of ${totalPages}`, pageW - margin, pageH - 6.5, { align: "right" });
  }

  const blob = doc.output("blob");
  const blobUrl = URL.createObjectURL(blob);
  const safeName = String(report.applicant.name || meta.mobile || "Report")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  const fileName = `Experian_Credit_Report_${safeName || "Customer"}.pdf`;

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return { blobUrl, fileName };
};

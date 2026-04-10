import jsPDF from "jspdf";

// â”€â”€â”€ Helper: Extract nested report data safely â”€â”€â”€
const extractReportData = (apiResponse) => {
  const cir =
    apiResponse?.data?.cCRResponse?.cIRReportDataLst?.[0]?.cIRReportData || {};
  return {
    personalInfo: cir.iDAndContactInfo?.personalInfo || {},
    identityInfo: cir.iDAndContactInfo?.identityInfo || {},
    addressInfo: cir.iDAndContactInfo?.addressInfo || [],
    phoneInfo: cir.iDAndContactInfo?.phoneInfo || [],
    accounts: cir.retailAccountDetails || [],
    summary: cir.retailAccountsSummary || {},
    scoreDetails: cir.scoreDetails || [],
    enquirySummary: cir.enquirySummary || {},
    otherKeyInd: cir.otherKeyInd || {},
    recentActivities: cir.recentActivities || {},
  };
};

// â”€â”€â”€ Helper: Score category â”€â”€â”€
const getScoreCategory = (score) => {
  const s = parseInt(score, 10);
  if (isNaN(s)) return { label: "N/A", color: [150, 150, 150] };
  if (s >= 750) return { label: "Excellent", color: [34, 139, 34] };
  if (s >= 700) return { label: "Good", color: [46, 139, 87] };
  if (s >= 650) return { label: "Fair", color: [255, 165, 0] };
  if (s >= 550) return { label: "Needs Work", color: [255, 140, 0] };
  return { label: "Poor", color: [220, 53, 69] };
};

// â”€â”€â”€ Helper: Format date string â”€â”€â”€
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

// â”€â”€â”€ Helper: Phone type label â”€â”€â”€
const phoneTypeLabel = (code) => {
  const map = { M: "Mobile", H: "Home", O: "Office", R: "Residence" };
  return map[code] || code || "Phone";
};

// â”€â”€â”€ Color Palette â”€â”€â”€
const C = {
  primary: [25, 55, 109],       // Deep navy
  accent: [59, 91, 219],        // Bright blue
  headerBg: [25, 55, 109],
  white: [255, 255, 255],
  lightBg: [245, 247, 252],
  cardBg: [255, 255, 255],
  border: [220, 225, 235],
  textDark: [30, 30, 50],
  textMid: [90, 100, 120],
  textLight: [150, 155, 170],
  green: [34, 139, 34],
  orange: [255, 165, 0],
  red: [220, 53, 69],
  yellow: [255, 193, 7],
  lightGreen: [232, 245, 233],
  lightRed: [255, 235, 238],
  lightBlue: [232, 240, 254],
  lightOrange: [255, 243, 224],
  divider: [230, 233, 240],
};

// â”€â”€â”€ Draw score gauge arc â”€â”€â”€
const drawScoreGauge = (doc, cx, cy, radius, score) => {
  const s = parseInt(score, 10) || 0;

  // Arc segments: Poor(300-550), Fair(550-650), Good(650-750), Excellent(750-900)
  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI;
  const totalRange = 600; // 300 to 900

  // Draw background arc segments
  const segments = [
    { from: 0, to: 250 / totalRange, color: C.red },         // 300-550
    { from: 250 / totalRange, to: 350 / totalRange, color: C.orange },   // 550-650
    { from: 350 / totalRange, to: 450 / totalRange, color: C.yellow },   // 650-750
    { from: 450 / totalRange, to: 1, color: C.green },         // 750-900
  ];

  const arcWidth = 14;
  const steps = 100;

  segments.forEach((seg) => {
    doc.setDrawColor(...seg.color);
    doc.setLineWidth(arcWidth);
    const segStart = startAngle + seg.from * Math.PI;
    const segEnd = startAngle + seg.to * Math.PI;
    const segSteps = Math.max(Math.floor(steps * (seg.to - seg.from)), 10);
    const stepAngle = (segEnd - segStart) / segSteps;

    for (let i = 0; i < segSteps; i++) {
      const a1 = segStart + i * stepAngle;
      const a2 = segStart + (i + 1) * stepAngle;
      const x1 = cx + radius * Math.cos(a1);
      const y1 = cy + radius * Math.sin(a1);
      const x2 = cx + radius * Math.cos(a2);
      const y2 = cy + radius * Math.sin(a2);
      doc.line(x1, y1, x2, y2);
    }
  });

  // Draw needle
  const normalised = Math.min(Math.max((s - 300) / totalRange, 0), 1);
  const needleAngle = startAngle + normalised * Math.PI;
  const needleLen = radius - 20;
  const nx = cx + needleLen * Math.cos(needleAngle);
  const ny = cy + needleLen * Math.sin(needleAngle);

  doc.setDrawColor(50, 50, 60);
  doc.setLineWidth(2.5);
  doc.line(cx, cy, nx, ny);

  // Needle hub circle
  doc.setFillColor(50, 50, 60);
  doc.circle(cx, cy, 5, "F");
  doc.setFillColor(...C.white);
  doc.circle(cx, cy, 2.5, "F");

  // Score text in center
  const { label, color } = getScoreCategory(s);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(...C.textDark);
  doc.text(String(s), cx, cy + 18, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(...color);
  doc.text(label, cx, cy + 30, { align: "center" });
};

// â”€â”€â”€ Draw header bar on each page â”€â”€â”€
const drawHeader = (doc, pageNum, totalPages, reportDate, refNo) => {
  const w = doc.internal.pageSize.getWidth();
  // Header background
  doc.setFillColor(...C.headerBg);
  doc.rect(0, 0, w, 28, "F");

  // Brand name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...C.white);
  doc.text("F2 Fintech", 14, 13);

  // Credit Health Report badge
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("CREDIT", w - 65, 9);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Health Report", w - 65, 19);

  // Right side info
  if (refNo) {
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 210, 230);
    doc.text(`Ref: ${refNo}`, w - 14, 9, { align: "right" });
  }
  if (reportDate) {
    doc.setFontSize(7);
    doc.text(`Report Date: ${reportDate}`, w - 14, 15, { align: "right" });
  }
};

// â”€â”€â”€ Draw footer â”€â”€â”€
const drawFooter = (doc, pageNum, totalPages) => {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Gradient-like footer bar
  doc.setFillColor(245, 247, 252);
  doc.rect(0, h - 18, w, 18, "F");
  doc.setDrawColor(...C.divider);
  doc.setLineWidth(0.3);
  doc.line(0, h - 18, w, h - 18);

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...C.textLight);
  doc.text("Powered by F2 Fintech | This is a computer-generated report", 14, h - 7);
  doc.text(`Page ${pageNum} of ${totalPages}`, w - 14, h - 7, {
    align: "right",
  });
};

// â”€â”€â”€ Draw section title â”€â”€â”€
const drawSectionTitle = (doc, title, y, icon) => {
  const w = doc.internal.pageSize.getWidth();
  // Icon circle
  doc.setFillColor(...C.accent);
  doc.circle(22, y + 1, 5, "F");
  if (icon) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...C.white);
    doc.text(icon, 22, y + 3.5, { align: "center" });
  }

  // Title text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...C.primary);
  doc.text(title, 34, y + 5);

  // Underline
  doc.setDrawColor(...C.accent);
  doc.setLineWidth(0.8);
  doc.line(34, y + 9, 34 + doc.getTextWidth(title), y + 9);

  return y + 18;
};

// â”€â”€â”€ Draw info row â”€â”€â”€
const drawInfoRow = (doc, label, value, x, y, labelWidth = 55) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C.textMid);
  doc.text(label, x, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...C.textDark);
  doc.text(String(value || "N/A"), x + labelWidth, y);

  return y + 8;
};

// â”€â”€â”€ Draw a card / rounded rect â”€â”€â”€
const drawCard = (doc, x, y, w, h, fillColor = C.cardBg) => {
  doc.setFillColor(...fillColor);
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.3);
  doc.roundedRect(x, y, w, h, 3, 3, "FD");
};

// â”€â”€â”€ Draw stat box â”€â”€â”€
const drawStatBox = (doc, x, y, w, h, label, value, color = C.accent) => {
  drawCard(doc, x, y, w, h);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...color);
  doc.text(String(value), x + w / 2, y + h / 2 - 1, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...C.textMid);

  // Word-wrap label text
  const maxLabelWidth = w - 6;
  const lines = doc.splitTextToSize(label, maxLabelWidth);
  const lineHeight = 4;
  const startY = y + h / 2 + 7;
  lines.forEach((line, i) => {
    doc.text(line, x + w / 2, startY + i * lineHeight, { align: "center" });
  });
};

// â”€â”€â”€ Draw impact badge â”€â”€â”€
const drawImpactBadge = (doc, x, y, level) => {
  const colors = {
    High: { bg: C.lightRed, text: C.red },
    Medium: { bg: C.lightOrange, text: C.orange },
    Low: { bg: C.lightGreen, text: C.green },
  };
  const c = colors[level] || colors.Low;

  doc.setFillColor(...c.bg);
  doc.roundedRect(x, y - 4, 28, 8, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...c.text);
  doc.text(`${level} Impact`, x + 14, y + 1, { align: "center" });
};

// â”€â”€â”€ Draw tip box â”€â”€â”€
const drawTipBox = (doc, x, y, w, tips) => {
  const lineHeight = 6;
  const padding = 8;
  const headerH = 10;
  const boxH = headerH + tips.length * lineHeight + padding * 2;

  drawCard(doc, x, y, w, boxH, [250, 252, 255]);

  // Tip header
  doc.setFillColor(...C.accent);
  doc.circle(x + 12, y + 10, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...C.white);
  doc.text("ðŸ’¡", x + 12, y + 12, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...C.primary);
  doc.text("Tip", x + 20, y + 12);

  // Tips text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...C.textMid);

  let ty = y + headerH + padding;
  const maxWidth = w - 20;
  tips.forEach((tip) => {
    const lines = doc.splitTextToSize(`"¢ ${tip}`, maxWidth);
    lines.forEach((line) => {
      doc.text(line, x + 10, ty);
      ty += 4.5;
    });
    ty += 2;
  });

  return y + boxH + 5;
};

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MAIN EXPORT: Generate the Credit Health Report PDF
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
export const generateCreditReportPDF = async (apiResponse) => {
  const report = extractReportData(apiResponse);
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();  // 210
  const H = doc.internal.pageSize.getHeight(); // 297
  const margin = 14;
  const contentW = W - margin * 2;

  const scoreVal = report.scoreDetails?.[0]?.value || "N/A";
  const { label: scoreLabel, color: scoreColor } = getScoreCategory(scoreVal);
  const reportDate = formatDate(new Date().toISOString());
  const refNo = apiResponse?.data?.reportOrderNumber || "";
  const fullName = report.personalInfo?.name?.fullName?.trim() || "User";
  const totalPages = 6;

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // PAGE 1: Cover Page
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  drawHeader(doc, 1, totalPages, reportDate, "");
  drawFooter(doc, 1, totalPages);

  // Greeting
  let y = 50;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...C.primary);
  doc.text(`Hey ${fullName},`, W / 2, y, { align: "center" });
  y += 12;
  doc.setFontSize(20);
  doc.text("Here is your Credit Health Report", W / 2, y, { align: "center" });

  // Score gauge
  y += 15;
  drawScoreGauge(doc, W / 2, y + 55, 55, scoreVal);

  // Score range labels
  y += 95;
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...C.textLight);
  doc.text("300", W / 2 - 60, y);
  doc.text("900", W / 2 + 55, y);

  // Report date badge
  y += 15;
  const badgeText = `Report Date: ${reportDate}`;
  const badgeW = doc.getTextWidth(badgeText) + 16;
  drawCard(doc, W / 2 - badgeW / 2, y, badgeW, 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...C.primary);
  doc.text(badgeText, W / 2, y + 7, { align: "center" });

  // Score message
  y += 20;
  const messages = {
    Excellent: { title: "Excellent Score!", desc: "You have a great credit profile. You are eligible for the best loan offers with lowest interest rates." },
    Good: { title: "Good Score!", desc: "Your credit health is good. You are eligible for most loan and credit card offers. Keep it up!" },
    Fair: { title: "You can do better!", desc: "Your credit health needs attention. You will be ineligible for most loan and credit card offers. Check your Credit Health Report & learn to build an excellent score." },
    "Needs Work": { title: "Needs Improvement", desc: "Your credit score needs significant work. Focus on timely payments and reducing outstanding debts." },
    Poor: { title: "Needs Immediate Attention", desc: "Your credit score is low. Please review your credit report for errors and work on improving your payment history." },
    "N/A": { title: "Score Unavailable", desc: "Credit score could not be determined. This may happen if you have a very limited credit history." },
  };
  const msg = messages[scoreLabel] || messages["N/A"];

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...scoreColor);
  doc.text(msg.title, W / 2, y, { align: "center" });

  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C.textMid);
  const descLines = doc.splitTextToSize(msg.desc, contentW - 40);
  descLines.forEach((line) => {
    doc.text(line, W / 2, y, { align: "center" });
    y += 5;
  });

  // Reference details
  y += 10;
  if (refNo) {
    drawInfoRow(doc, "Report Order Number:", refNo, W / 2 - 50, y, 55);
    y += 8;
  }
  if (apiResponse?.reference_id) {
    drawInfoRow(doc, "Reference ID:", String(apiResponse.reference_id), W / 2 - 50, y, 55);
  }

  // Bottom branding bar
  doc.setFillColor(245, 247, 252);
  doc.rect(0, H - 32, W, 14, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...C.textLight);
  doc.text(
    "Report Order Number: A unique ID for this credit report. Reference ID: Transaction tracking number.",
    W / 2,
    H - 23,
    { align: "center" }
  );

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // PAGE 2: Table of Contents
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  doc.addPage();
  drawHeader(doc, 2, totalPages, reportDate, refNo);
  drawFooter(doc, 2, totalPages);

  y = 45;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...C.primary);
  doc.text("Here is what's covered in your report", margin, y);

  y += 15;
  const tocItems = [
    { icon: "P", title: "Personal Details", desc: "Your name, date of birth, PAN, addresses & mobile numbers" },
    { icon: "C", title: "Credit Report at a Glance", desc: "Overview of your credit profile with key statistics" },
    { icon: "F", title: "Credit Factors", desc: "Important factors that affect your Credit Score" },
    { icon: "A", title: "Account Details", desc: "In-depth analysis of each credit account and its impact" },
    { icon: "E", title: "Credit Enquiries", desc: "Overview of all enquiries done by Banks & NBFCs" },
    { icon: "S", title: "Score Insights", desc: "Key indicators and recent activity summary" },
  ];

  tocItems.forEach((item) => {
    drawCard(doc, margin, y, contentW, 25);

    // Icon circle
    const iconColors = {
      P: [25, 118, 210],
      C: [46, 125, 50],
      F: [156, 39, 176],
      A: [255, 87, 34],
      E: [0, 150, 136],
      S: [233, 30, 99],
    };
    const ic = iconColors[item.icon] || C.accent;
    doc.setFillColor(...ic);
    doc.circle(margin + 14, y + 12.5, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...C.white);
    doc.text(item.icon, margin + 14, y + 15, { align: "center" });

    // Title & description
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...C.textDark);
    doc.text(item.title, margin + 28, y + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    doc.text(item.desc, margin + 28, y + 17);

    // Arrow
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...C.accent);
    doc.text("View More "º", W - margin - 5, y + 13, { align: "right" });

    y += 30;
  });

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // PAGE 3: Personal Details
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  doc.addPage();
  drawHeader(doc, 3, totalPages, reportDate, refNo);
  drawFooter(doc, 3, totalPages);

  y = drawSectionTitle(doc, "Profile Details", 38, "P");

  // Name card
  drawCard(doc, margin, y, contentW, 50);
  y += 8;

  // Avatar circle
  doc.setFillColor(255, 193, 7);
  doc.circle(margin + 14, y + 8, 9, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...C.white);
  doc.text(fullName.charAt(0).toUpperCase(), margin + 14, y + 12, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...C.textDark);
  doc.text(fullName, margin + 30, y + 10);

  y += 22;
  const leftCol = margin + 10;
  const rightCol = margin + contentW / 2 + 5;

  // Info grid
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...C.textLight);
  doc.text("Gender", leftCol, y);
  doc.text("DOB", rightCol, y);
  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...C.textDark);
  doc.text(report.personalInfo?.gender || "N/A", leftCol, y);
  doc.text(formatDate(report.personalInfo?.dateOfBirth), rightCol, y);

  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...C.textLight);
  doc.text("Age", leftCol, y);
  doc.text("PAN Card Number", rightCol, y);
  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...C.textDark);
  doc.text(`${report.personalInfo?.age?.age || "N/A"} years`, leftCol, y);
  doc.text(report.identityInfo?.pANId?.[0]?.idNumber || "N/A", rightCol, y);

  // Tip box beside personal info
  y += 15;
  const halfW = contentW / 2 - 3;
  const tipY = y;
  drawTipBox(doc, margin + halfW + 6, tipY - 52, halfW, [
    "Details here are from your latest credit bureau records.",
    "Verify that your PAN, name, and contact info are correct.",
    "A wrong address or phone number could be a mistake or a sign of identity theft.",
  ]);

  // Phone numbers section
  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...C.primary);
  doc.text("Phone Numbers", margin + 6, y);
  y += 8;

  if (report.phoneInfo.length > 0) {
    // Table header
    drawCard(doc, margin, y, contentW / 2 - 3, 10, C.lightBg);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    doc.text("Type", margin + 8, y + 7);
    doc.text("Number", margin + 55, y + 7);
    y += 12;

    report.phoneInfo.forEach((phone) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...C.textDark);
      doc.text(phoneTypeLabel(phone.typeCode), margin + 8, y);
      doc.setFont("helvetica", "bold");
      doc.text(phone.number || "N/A", margin + 55, y);
      doc.setDrawColor(...C.divider);
      doc.setLineWidth(0.2);
      doc.line(margin + 5, y + 3, margin + contentW / 2 - 8, y + 3);
      y += 8;
    });
  }

  // Address section
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...C.primary);
  doc.text("Address Details", margin + 6, y);
  y += 8;

  if (report.addressInfo.length > 0) {
    // Table header
    drawCard(doc, margin, y, contentW, 10, C.lightBg);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    doc.text("Address", margin + 5, y + 7);
    doc.text("State", margin + 120, y + 7);
    doc.text("PIN", margin + 145, y + 7);
    doc.text("Reported", margin + contentW - 20, y + 7);
    y += 13;

    report.addressInfo.forEach((addr) => {
      const addrLines = doc.splitTextToSize(addr.address || "N/A", 108);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...C.textDark);
      addrLines.forEach((line, i) => {
        doc.text(line, margin + 5, y + i * 4);
      });

      doc.text(addr.state || "N/A", margin + 120, y);
      doc.text(addr.postal || "N/A", margin + 145, y);
      doc.setFontSize(7);
      doc.setTextColor(...C.textMid);
      doc.text(formatDate(addr.reportedDate), margin + contentW - 20, y);

      doc.setDrawColor(...C.divider);
      doc.setLineWidth(0.2);
      const lineY = y + Math.max(addrLines.length * 4, 4) + 2;
      doc.line(margin + 3, lineY, W - margin - 3, lineY);
      y = lineY + 5;
    });
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // PAGE 4: Credit Summary & Factors
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  doc.addPage();
  drawHeader(doc, 4, totalPages, reportDate, refNo);
  drawFooter(doc, 4, totalPages);

  y = drawSectionTitle(doc, "Credit Report at a Glance", 38, "C");

  // Summary stats grid (2 rows x 4 cols)
  const boxW = (contentW - 15) / 4;
  const boxH = 32;
  const summaryStats = [
    { label: "Total Accounts", value: report.summary.noOfAccounts || "0" },
    { label: "Active Accounts", value: report.summary.noOfActiveAccounts || "0", color: C.green },
    { label: "Closed Accounts", value: String(parseInt(report.summary.noOfAccounts || 0) - parseInt(report.summary.noOfActiveAccounts || 0)) },
    { label: "Past Due Accounts", value: report.summary.noOfPastDueAccounts || "0", color: parseInt(report.summary.noOfPastDueAccounts || 0) > 0 ? C.red : C.green },
    { label: "Total Balance", value: `Rs.${parseFloat(report.summary.totalBalanceAmount || 0).toLocaleString("en-IN")}` },
    { label: "Total Sanction", value: `Rs.${parseFloat(report.summary.totalSanctionAmount || 0).toLocaleString("en-IN")}` },
    { label: "Total Past Due", value: `Rs.${parseFloat(report.summary.totalPastDue || 0).toLocaleString("en-IN")}`, color: parseFloat(report.summary.totalPastDue || 0) > 0 ? C.red : C.green },
    { label: "Zero Balance A/c", value: report.summary.noOfZeroBalanceAccounts || "0" },
  ];

  summaryStats.forEach((stat, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const sx = margin + col * (boxW + 5);
    const sy = y + row * (boxH + 5);
    drawStatBox(doc, sx, sy, boxW, boxH, stat.label, stat.value, stat.color || C.accent);
  });

  y += (boxH + 5) * 2 + 10;

  // Account timeline
  if (report.summary.oldestAccount) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    doc.text(`Oldest Account: ${report.summary.oldestAccount}`, margin + 5, y);
    y += 5;
    doc.text(`Most Recent Account: ${report.summary.recentAccount || "N/A"}`, margin + 5, y);
    y += 12;
  }

  // Credit Factors Section
  y = drawSectionTitle(doc, "Credit Factors", y, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...C.textMid);
  doc.text("Important factors that affect your Credit Score, based on your latest credit report.", margin + 5, y);
  y += 10;

  // Compute credit factor values from available data
  const noOfAccounts = parseInt(report.summary.noOfAccounts || 0);
  const noOfActive = parseInt(report.summary.noOfActiveAccounts || 0);
  const writeOffs = parseInt(report.summary.noOfWriteOffs || 0);
  const ageOfOldest = parseInt(report.otherKeyInd?.ageOfOldestTrade || 0);
  const totalInquiries = parseInt(report.enquirySummary?.total || 0);

  const factors = [
    {
      title: "Payment History",
      impact: "High",
      desc: "Summary of on-time and delayed payments of all your credit accounts",
      value: writeOffs > 0 ? `${writeOffs} Write-offs` : "No Write-offs",
      valueColor: writeOffs > 0 ? C.red : C.green,
    },
    {
      title: "Credit Utilisation",
      impact: "High",
      desc: "Ratio of credit used to the available credit limit",
      value: report.summary.totalCreditLimit !== "0.0" ? `Limit: Rs.${parseFloat(report.summary.totalCreditLimit || 0).toLocaleString("en-IN")}` : "No Credit Cards",
      valueColor: C.accent,
    },
    {
      title: "Length of Credit History",
      impact: "Medium",
      desc: "Length of the oldest active credit account",
      value: ageOfOldest > 0 ? `${Math.floor(ageOfOldest / 12)} yrs ${ageOfOldest % 12} months` : "N/A",
      valueColor: C.accent,
    },
    {
      title: "Credit Enquiries",
      impact: "Low",
      desc: "Total checks done by lenders in your credit applications",
      value: `${totalInquiries} Enquiries`,
      valueColor: totalInquiries > 5 ? C.orange : C.green,
    },
    {
      title: "Credit Mix",
      impact: "Low",
      desc: "Types of credit products handled in the past",
      value: `${noOfAccounts} Accounts (${noOfActive} Active)`,
      valueColor: C.accent,
    },
  ];

  factors.forEach((factor) => {
    drawCard(doc, margin, y, contentW, 22);

    // Icon circle with first letter
    const factorColors = {
      "Payment History": [233, 30, 99],
      "Credit Utilisation": [255, 152, 0],
      "Length of Credit History": [156, 39, 176],
      "Credit Enquiries": [0, 150, 136],
      "Credit Mix": [63, 81, 181],
    };
    const fc = factorColors[factor.title] || C.accent;
    doc.setFillColor(...fc);
    doc.circle(margin + 10, y + 11, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...C.white);
    doc.text(factor.title.charAt(0), margin + 10, y + 13, { align: "center" });

    // Title + badge
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...C.textDark);
    doc.text(factor.title, margin + 20, y + 9);
    drawImpactBadge(doc, margin + 20 + doc.getTextWidth(factor.title) + 4, y + 7, factor.impact);

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.textMid);
    doc.text(factor.desc, margin + 20, y + 16);

    // Value on right
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...factor.valueColor);
    doc.text(factor.value, W - margin - 5, y + 12, { align: "right" });

    y += 26;
  });

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // PAGE 5: Account Details
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  doc.addPage();
  drawHeader(doc, 5, totalPages, reportDate, refNo);
  drawFooter(doc, 5, totalPages);

  y = drawSectionTitle(doc, "Account Details", 38, "A");

  if (report.accounts.length === 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...C.textMid);
    doc.text("No credit accounts found in this report.", margin + 5, y);
  } else {
    report.accounts.forEach((account, idx) => {
      // Check if we need a new page
      if (y > H - 80) {
        doc.addPage();
        drawHeader(doc, 5, totalPages, reportDate, refNo);
        drawFooter(doc, 5, totalPages);
        y = 40;
      }

      const cardH = 85;
      drawCard(doc, margin, y, contentW, cardH);

      // Account header
      const isOpen = account.open === "Yes";
      const headerBgColor = isOpen ? C.lightGreen : C.lightRed;
      doc.setFillColor(...headerBgColor);
      doc.roundedRect(margin + 2, y + 2, contentW - 4, 14, 2, 2, "F");

      // Institution icon
      const iconBgColor = isOpen ? C.green : C.red;
      doc.setFillColor(...iconBgColor);
      doc.circle(margin + 12, y + 9, 5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...C.white);
      doc.text(String(idx + 1), margin + 12, y + 11, { align: "center" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...C.textDark);
      doc.text(account.institution || "Unknown", margin + 22, y + 11);

      // Status badge
      const statusColor = isOpen ? C.green : C.textMid;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...statusColor);
      doc.text(account.accountStatus || (isOpen ? "Active" : "Closed"), W - margin - 8, y + 11, { align: "right" });

      // Account details grid
      let dy = y + 22;
      const col1 = margin + 8;
      const col2 = margin + contentW / 3;
      const col3 = margin + (contentW / 3) * 2;

      const detailPairs = [
        [
          { label: "Account Type", value: account.accountType || "N/A" },
          { label: "Ownership", value: account.ownershipType || "N/A" },
          { label: "Account No.", value: account.accountNumber || "N/A" },
        ],
        [
          { label: "Sanction Amount", value: `Rs.${parseInt(account.sanctionAmount || 0).toLocaleString("en-IN")}` },
          { label: "Current Balance", value: `Rs.${parseInt(account.balance || 0).toLocaleString("en-IN")}` },
          { label: "Past Due", value: `Rs.${parseInt(account.pastDueAmount || 0).toLocaleString("en-IN")}` },
        ],
        [
          { label: "Date Opened", value: formatDate(account.dateOpened) },
          { label: "Date Closed", value: formatDate(account.dateClosed) },
          { label: "Last Payment", value: formatDate(account.lastPaymentDate) },
        ],
        [
          { label: "Interest Rate", value: account.interestRate ? `${account.interestRate}%` : "N/A" },
          { label: "Tenure", value: account.repaymentTenure || "N/A" },
          { label: "EMI", value: account.installmentAmount ? `Rs.${parseInt(account.installmentAmount).toLocaleString("en-IN")}` : "N/A" },
        ],
      ];

      detailPairs.forEach((row) => {
        const cols = [col1, col2, col3];
        row.forEach((item, ci) => {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(7);
          doc.setTextColor(...C.textLight);
          doc.text(item.label, cols[ci], dy);

          doc.setFont("helvetica", "bold");
          doc.setFontSize(8.5);
          doc.setTextColor(...C.textDark);
          doc.text(item.value, cols[ci], dy + 5);
        });
        dy += 14;
      });

      // Payment history mini-bar (if available)
      if (account.history48Months && account.history48Months.length > 0) {
        dy += 2;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...C.textMid);
        doc.text("Payment History:", col1, dy);

        const barStartX = col1 + 30;
        const barW = 4;
        const maxBars = Math.min(account.history48Months.length, 24);

        account.history48Months.slice(0, maxBars).forEach((h, hi) => {
          const bx = barStartX + hi * (barW + 1.5);
          let bColor = C.green;
          if (h.paymentStatus === "CLSD") bColor = [180, 180, 190];
          else if (h.assetClassificationStatus === "LOSS") bColor = C.red;
          else if (h.paymentStatus && parseInt(h.paymentStatus) > 0) bColor = C.orange;

          doc.setFillColor(...bColor);
          doc.roundedRect(bx, dy - 4, barW, 6, 1, 1, "F");
        });
      }

      y += cardH + 8;
    });
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // PAGE 6: Enquiry Summary & Disclaimer
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  doc.addPage();
  drawHeader(doc, 6, totalPages, reportDate, refNo);
  drawFooter(doc, 6, totalPages);

  y = drawSectionTitle(doc, "Credit Enquiries", 38, "E");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...C.textMid);
  doc.text("Overview of all enquiries done by Banks & NBFCs in your credit profile.", margin + 5, y);
  y += 12;

  // Enquiry stats
  const enqBoxW = (contentW - 15) / 4;
  const enqStats = [
    { label: "Total Enquiries", value: report.enquirySummary.total || "0" },
    { label: "Last 30 Days", value: report.enquirySummary.past30Days || "0" },
    { label: "Last 12 Months", value: report.enquirySummary.past12Months || "0" },
    { label: "Last 24 Months", value: report.enquirySummary.past24Months || "0" },
  ];

  enqStats.forEach((stat, i) => {
    const sx = margin + i * (enqBoxW + 5);
    drawStatBox(doc, sx, y, enqBoxW, 32, stat.label, stat.value,
      parseInt(stat.value) > 3 ? C.orange : C.green
    );
  });

  y += 45;

  // Key Indicators Section
  y = drawSectionTitle(doc, "Key Indicators", y, "S");

  const keyIndicators = [
    { label: "Age of Oldest Trade", value: report.otherKeyInd.ageOfOldestTrade ? `${report.otherKeyInd.ageOfOldestTrade} months` : "N/A" },
    { label: "Number of Open Trades", value: report.otherKeyInd.numberOfOpenTrades || "0" },
    { label: "All Lines Ever Written Off", value: `Rs.${parseFloat(report.otherKeyInd.allLinesEVERWritten || 0).toLocaleString("en-IN")}` },
    { label: "Written Off (Last 9 Months)", value: report.otherKeyInd.allLinesEVERWrittenIn9Months || "0" },
    { label: "Written Off (Last 6 Months)", value: report.otherKeyInd.allLinesEVERWrittenIn6Months || "0" },
  ];

  drawCard(doc, margin, y, contentW / 2 - 3, keyIndicators.length * 10 + 8);
  let ky = y + 8;
  keyIndicators.forEach((ki) => {
    ky = drawInfoRow(doc, ki.label, ki.value, margin + 8, ky, 60);
  });

  // Recent Activities
  drawCard(doc, margin + contentW / 2 + 3, y, contentW / 2 - 3, keyIndicators.length * 10 + 8);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...C.primary);
  doc.text("Recent Activities", margin + contentW / 2 + 10, y + 8);

  let ry = y + 16;
  const ra = report.recentActivities;
  const recentItems = [
    { label: "Accounts Opened", value: ra.accountsOpened || "0" },
    { label: "Accounts Updated", value: ra.accountsUpdated || "0" },
    { label: "Accounts Delinquent", value: ra.accountsDeliquent || "0" },
    { label: "Total Inquiries", value: ra.totalInquiries || "0" },
  ];

  recentItems.forEach((item) => {
    ry = drawInfoRow(doc, item.label, item.value, margin + contentW / 2 + 10, ry, 55);
  });

  // Score Factors (from API)
  if (report.scoreDetails?.[0]?.scoringElements?.length > 0) {
    y = ky + 15;
    y = drawSectionTitle(doc, "Score Factors", y, "S");


    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    doc.text("Factors that influenced your credit score calculation:", margin + 5, y);
    y += 8;

    report.scoreDetails[0].scoringElements.forEach((elem, i) => {
      drawCard(doc, margin, y, contentW, 14);

      const elemBgColor = i % 2 === 0 ? C.lightBlue : C.lightGreen;
      doc.setFillColor(...elemBgColor);
      doc.circle(margin + 10, y + 7, 4, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      const elemTextColor = i % 2 === 0 ? C.accent : C.green;
      doc.setTextColor(...elemTextColor);
      doc.text(String(elem.seq || i + 1), margin + 10, y + 9, { align: "center" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...C.textDark);
      doc.text(elem.description || "N/A", margin + 20, y + 9);

      y += 17;
    });
  }

  // Disclaimer
  y = H - 60;
  doc.setDrawColor(...C.divider);
  doc.setLineWidth(0.3);
  doc.line(margin, y, W - margin, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...C.primary);
  doc.text("Disclaimer", margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...C.textMid);
  const disclaimerText = [
    "This Credit Health Report is generated by F2 Fintech based on data obtained from credit bureaus. The information",
    "presented is for informational purposes only and should not be construed as financial advice. F2 Fintech does not guarantee",
    "the accuracy, completeness, or timeliness of the data. Users should verify their credit information directly with the",
    "respective credit bureau for any discrepancies. This is a computer-generated document and does not require a signature.",
  ];
  disclaimerText.forEach((line) => {
    doc.text(line, margin, y);
    y += 4;
  });

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SAVE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const fileName = `Credit_Health_Report_${fullName.replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
};


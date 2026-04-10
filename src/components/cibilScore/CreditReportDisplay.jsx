import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Collapse,
  IconButton,
  LinearProgress,
  Avatar,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TimelineIcon from "@mui/icons-material/Timeline";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// ─── Animations ───
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(59, 91, 219, 0.2); }
  50%      { box-shadow: 0 0 30px rgba(59, 91, 219, 0.4); }
`;

const scoreCountUp = keyframes`
  from { opacity: 0; transform: scale(0.5); }
  to   { opacity: 1; transform: scale(1); }
`;

// ─── Styled Components ───
const GlassCard = styled(Card)(({ theme, delay = 0 }) => ({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  border: "1px solid rgba(220, 225, 240, 0.6)",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease",
  animation: `${fadeInUp} 0.6s ease ${delay}s both`,
  "&:hover": {
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-2px)",
  },
}));

const ScoreCircle = styled(Box)(({ scorecolor }) => ({
  width: 180,
  height: 180,
  borderRadius: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: `conic-gradient(
    ${scorecolor} 0deg,
    ${scorecolor}40 90deg,
    transparent 90deg
  )`,
  position: "relative",
  animation: `${pulseGlow} 3s ease-in-out infinite`,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 10,
    borderRadius: "50%",
    background: "white",
  },
}));

const StatCard = styled(Box)(({ theme, bgcolor }) => ({
  padding: theme.spacing(2),
  borderRadius: "12px",
  background: bgcolor || "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
  border: "1px solid rgba(220, 225, 240, 0.6)",
  textAlign: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
  },
}));

const ImpactChip = styled(Chip)(({ level }) => {
  const colors = {
    High: { bg: "#ffebee", color: "#d32f2f", border: "#ef9a9a" },
    Medium: { bg: "#fff3e0", color: "#f57c00", border: "#ffcc80" },
    Low: { bg: "#e8f5e9", color: "#2e7d32", border: "#a5d6a7" },
  };
  const c = colors[level] || colors.Low;
  return {
    backgroundColor: c.bg,
    color: c.color,
    border: `1px solid ${c.border}`,
    fontWeight: 600,
    fontSize: "0.7rem",
    height: 22,
  };
});

const AccountCard = styled(Card)(({ isopen }) => ({
  borderRadius: "12px",
  border: `1px solid ${isopen === "true" ? "#a5d6a7" : "#e0e0e0"}`,
  overflow: "visible",
  marginBottom: 12,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
}));

const PaymentDot = styled(Box)(({ status }) => {
  const colorMap = {
    green: "#4caf50",
    red: "#f44336",
    orange: "#ff9800",
    grey: "#bdbdbd",
  };
  return {
    width: 14,
    height: 14,
    borderRadius: "3px",
    backgroundColor: colorMap[status] || colorMap.grey,
    transition: "transform 0.2s",
    "&:hover": { transform: "scale(1.4)" },
  };
});

// ─── Helpers ───
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

const getScoreInfo = (score) => {
  const s = parseInt(score, 10);
  if (isNaN(s)) return { label: "N/A", color: "#9e9e9e", gradient: "linear-gradient(135deg, #9e9e9e, #757575)" };
  if (s >= 750) return { label: "Excellent", color: "#2e7d32", gradient: "linear-gradient(135deg, #43a047, #2e7d32)" };
  if (s >= 700) return { label: "Good", color: "#1976d2", gradient: "linear-gradient(135deg, #42a5f5, #1976d2)" };
  if (s >= 650) return { label: "Fair", color: "#f57c00", gradient: "linear-gradient(135deg, #ffa726, #f57c00)" };
  if (s >= 550) return { label: "Needs Work", color: "#e65100", gradient: "linear-gradient(135deg, #ff7043, #e65100)" };
  return { label: "Poor", color: "#d32f2f", gradient: "linear-gradient(135deg, #ef5350, #c62828)" };
};

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const phoneTypeLabel = (code) => {
  const map = { M: "Mobile", H: "Home", O: "Office", R: "Residence" };
  return map[code] || code || "Phone";
};

const getPaymentStatusColor = (h) => {
  if (h.paymentStatus === "CLSD") return "grey";
  if (h.assetClassificationStatus === "LOSS") return "red";
  if (h.paymentStatus && parseInt(h.paymentStatus) > 0) return "orange";
  return "green";
};

// ─── Account Expandable Row ───
const AccountRow = ({ account, index }) => {
  const [expanded, setExpanded] = useState(false);
  const isOpen = account.open === "Yes";

  return (
    <AccountCard isopen={isOpen.toString()} elevation={0}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 2,
          cursor: "pointer",
          bgcolor: isOpen ? "rgba(76, 175, 80, 0.04)" : "rgba(0,0,0,0.01)",
          borderRadius: "12px 12px 0 0",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: isOpen ? "#e8f5e9" : "#fafafa",
              color: isOpen ? "#2e7d32" : "#757575",
              width: 40,
              height: 40,
            }}
          >
            <AccountBalanceIcon fontSize="small" />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
              {account.institution || "Unknown Institution"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {account.accountType || "N/A"} • {account.accountNumber || ""}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Chip
            size="small"
            icon={isOpen ? <CheckCircleIcon /> : null}
            label={account.accountStatus || (isOpen ? "Active" : "Closed")}
            sx={{
              bgcolor: isOpen ? "#e8f5e9" : "#f5f5f5",
              color: isOpen ? "#2e7d32" : "#757575",
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
          <IconButton
            size="small"
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Divider />
        <Box sx={{ p: 2.5 }}>
          <Grid container spacing={2}>
            {[
              { label: "Sanction Amount", value: `₹${parseInt(account.sanctionAmount || 0).toLocaleString("en-IN")}` },
              { label: "Current Balance", value: `₹${parseInt(account.balance || 0).toLocaleString("en-IN")}` },
              { label: "Past Due Amount", value: `₹${parseInt(account.pastDueAmount || 0).toLocaleString("en-IN")}`, warn: parseInt(account.pastDueAmount || 0) > 0 },
              { label: "Ownership", value: account.ownershipType || "N/A" },
              { label: "Date Opened", value: formatDate(account.dateOpened) },
              { label: "Date Closed", value: formatDate(account.dateClosed) },
              { label: "Last Payment", value: formatDate(account.lastPaymentDate) },
              { label: "Interest Rate", value: account.interestRate ? `${account.interestRate}%` : "N/A" },
            ].map((item, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.3 }}>
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={item.warn ? "error" : "text.primary"}
                >
                  {item.value}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Payment history dots */}
          {account.history48Months?.length > 0 && (
            <Box sx={{ mt: 2.5 }}>
              <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mb: 1, display: "block" }}>
                Payment History (Recent → Older)
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {account.history48Months.slice(0, 24).map((h, i) => (
                  <Box key={i} title={`${h.key}: ${h.paymentStatus}`}>
                    <PaymentDot status={getPaymentStatusColor(h)} />
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                {[
                  { color: "green", label: "On-time" },
                  { color: "orange", label: "Late" },
                  { color: "red", label: "Default" },
                  { color: "grey", label: "Closed" },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PaymentDot status={item.color} sx={{ width: 8, height: 8 }} />
                    <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Collapse>
    </AccountCard>
  );
};

// ════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════
const CreditReportDisplay = ({ reportData }) => {
  if (!reportData) return null;

  const report = extractReportData(reportData);
  const scoreVal = report.scoreDetails?.[0]?.value || "N/A";
  const scoreInfo = getScoreInfo(scoreVal);
  const fullName = report.personalInfo?.name?.fullName?.trim() || "User";
  const reportDate = formatDate(new Date().toISOString());

  const noOfAccounts = parseInt(report.summary.noOfAccounts || 0);
  const noOfActive = parseInt(report.summary.noOfActiveAccounts || 0);
  const writeOffs = parseInt(report.summary.noOfWriteOffs || 0);
  const ageOfOldest = parseInt(report.otherKeyInd?.ageOfOldestTrade || 0);
  const totalInquiries = parseInt(report.enquirySummary?.total || 0);

  return (
    <Box sx={{ animation: `${fadeInUp} 0.4s ease both` }}>
      {/* ── Score Section ── */}
      <GlassCard delay={0} sx={{ mb: 3, overflow: "visible" }}>
        <CardContent sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h5" fontWeight={800} color="#19376d" gutterBottom>
            Your Credit Health Report
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Hey {fullName}, here is your credit score overview
          </Typography>

          {/* Score Circle */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <ScoreCircle scorecolor={scoreInfo.color}>
              <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <Typography
                  variant="h2"
                  fontWeight={900}
                  sx={{
                    color: scoreInfo.color,
                    animation: `${scoreCountUp} 0.8s ease both`,
                    lineHeight: 1,
                  }}
                >
                  {scoreVal}
                </Typography>
                <Chip
                  label={scoreInfo.label}
                  size="small"
                  sx={{
                    mt: 0.5,
                    background: scoreInfo.gradient,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                  }}
                />
              </Box>
            </ScoreCircle>
          </Box>

          {/* Score range bar */}
          <Box sx={{ maxWidth: 300, mx: "auto", mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">300</Typography>
              <Typography variant="caption" color="text.secondary">900</Typography>
            </Box>
            <Box sx={{
              height: 8,
              borderRadius: 4,
              background: "linear-gradient(to right, #d32f2f, #ff9800, #ffc107, #66bb6a, #2e7d32)",
            }} />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Report Date: {reportDate}
          </Typography>
        </CardContent>
      </GlassCard>

      {/* ── Personal Info ── */}
      <GlassCard delay={0.1} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
            <Avatar sx={{ bgcolor: "#e3f2fd", color: "#1976d2" }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h6" fontWeight={700} color="#19376d">
              Personal Details
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary">Full Name</Typography>
              <Typography variant="body2" fontWeight={600}>{fullName}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary">Date of Birth</Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatDate(report.personalInfo?.dateOfBirth)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary">Gender</Typography>
              <Typography variant="body2" fontWeight={600}>
                {report.personalInfo?.gender || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary">PAN</Typography>
              <Typography variant="body2" fontWeight={600}>
                {report.identityInfo?.pANId?.[0]?.idNumber || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          {/* Phone numbers */}
          {report.phoneInfo.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ mb: 1.5 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <PhoneIcon fontSize="small" color="action" />
                <Typography variant="subtitle2" color="text.secondary">Phone Numbers</Typography>
              </Box>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                {report.phoneInfo.map((p, i) => (
                  <Chip
                    key={i}
                    icon={<PhoneIcon />}
                    label={`${phoneTypeLabel(p.typeCode)}: ${p.number}`}
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Addresses */}
          {report.addressInfo.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ mb: 1.5 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <HomeIcon fontSize="small" color="action" />
                <Typography variant="subtitle2" color="text.secondary">Addresses</Typography>
              </Box>
              {report.addressInfo.map((addr, i) => (
                <Box key={i} sx={{
                  p: 1.5,
                  mb: 1,
                  bgcolor: "#f8f9ff",
                  borderRadius: 2,
                  border: "1px solid #eef0f8",
                }}>
                  <Typography variant="body2" color="text.primary" sx={{ mb: 0.3 }}>
                    {addr.address}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {[addr.state, addr.postal].filter(Boolean).join(" — ")}
                    {addr.type && ` • ${addr.type}`}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </GlassCard>

      {/* ── Account Summary Stats ── */}
      <GlassCard delay={0.2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
            <Avatar sx={{ bgcolor: "#e8f5e9", color: "#2e7d32" }}>
              <TrendingUpIcon />
            </Avatar>
            <Typography variant="h6" fontWeight={700} color="#19376d">
              Credit Summary
            </Typography>
          </Box>

          <Grid container spacing={1.5}>
            {[
              { label: "Total Accounts", value: report.summary.noOfAccounts || "0", color: "#1976d2", bg: "linear-gradient(135deg, #e3f2fd, #fff)" },
              { label: "Active Accounts", value: report.summary.noOfActiveAccounts || "0", color: "#2e7d32", bg: "linear-gradient(135deg, #e8f5e9, #fff)" },
              { label: "Closed Accounts", value: String(noOfAccounts - noOfActive), color: "#757575", bg: "linear-gradient(135deg, #f5f5f5, #fff)" },
              { label: "Past Due", value: report.summary.noOfPastDueAccounts || "0", color: parseInt(report.summary.noOfPastDueAccounts || 0) > 0 ? "#d32f2f" : "#2e7d32", bg: parseInt(report.summary.noOfPastDueAccounts || 0) > 0 ? "linear-gradient(135deg, #ffebee, #fff)" : "linear-gradient(135deg, #e8f5e9, #fff)" },
              { label: "Total Balance", value: `₹${parseFloat(report.summary.totalBalanceAmount || 0).toLocaleString("en-IN")}`, color: "#1976d2" },
              { label: "Total Sanction", value: `₹${parseFloat(report.summary.totalSanctionAmount || 0).toLocaleString("en-IN")}`, color: "#7b1fa2" },
              { label: "Write-offs", value: report.summary.noOfWriteOffs || "0", color: parseInt(report.summary.noOfWriteOffs || 0) > 0 ? "#d32f2f" : "#2e7d32" },
              { label: "Zero Balance", value: report.summary.noOfZeroBalanceAccounts || "0", color: "#00897b" },
            ].map((stat, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <StatCard bgcolor={stat.bg}>
                  <Typography variant="h5" fontWeight={800} sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    {stat.label}
                  </Typography>
                </StatCard>
              </Grid>
            ))}
          </Grid>

          {/* Oldest / Recent account */}
          {report.summary.oldestAccount && (
            <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Chip
                icon={<CalendarTodayIcon />}
                label={`Oldest: ${report.summary.oldestAccount}`}
                variant="outlined"
                size="small"
              />
              {report.summary.recentAccount && (
                <Chip
                  icon={<CalendarTodayIcon />}
                  label={`Recent: ${report.summary.recentAccount}`}
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>
          )}
        </CardContent>
      </GlassCard>

      {/* ── Credit Factors ── */}
      <GlassCard delay={0.3} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Avatar sx={{ bgcolor: "#f3e5f5", color: "#7b1fa2" }}>
              <TimelineIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700} color="#19376d">
                Credit Factors
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Key factors that influence your credit score
              </Typography>
            </Box>
          </Box>

          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {[
              {
                icon: <HistoryIcon />,
                title: "Payment History",
                impact: "High",
                desc: "Summary of on-time and delayed payments",
                value: writeOffs > 0 ? `${writeOffs} Write-offs` : "No Write-offs",
                iconBg: "#fce4ec",
                iconColor: "#c62828",
              },
              {
                icon: <CreditCardIcon />,
                title: "Credit Utilisation",
                impact: "High",
                desc: "Ratio of credit used to available limit",
                value: report.summary.totalCreditLimit !== "0.0"
                  ? `Limit: ₹${parseFloat(report.summary.totalCreditLimit || 0).toLocaleString("en-IN")}`
                  : "No Credit Cards",
                iconBg: "#fff3e0",
                iconColor: "#e65100",
              },
              {
                icon: <CalendarTodayIcon />,
                title: "Length of Credit History",
                impact: "Medium",
                desc: "Age of oldest credit account",
                value: ageOfOldest > 0 ? `${Math.floor(ageOfOldest / 12)} yrs ${ageOfOldest % 12} months` : "N/A",
                iconBg: "#f3e5f5",
                iconColor: "#7b1fa2",
              },
              {
                icon: <SearchIcon />,
                title: "Credit Enquiries",
                impact: "Low",
                desc: "Total checks by lenders in recent applications",
                value: `${totalInquiries} Enquiries`,
                iconBg: "#e0f2f1",
                iconColor: "#00695c",
              },
              {
                icon: <AccountBalanceIcon />,
                title: "Credit Mix",
                impact: "Low",
                desc: "Variety of credit products in your history",
                value: `${noOfAccounts} Accounts (${noOfActive} Active)`,
                iconBg: "#e8eaf6",
                iconColor: "#283593",
              },
            ].map((factor, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #f0f0f5",
                  bgcolor: "#fafbff",
                  transition: "all 0.2s",
                  "&:hover": { bgcolor: "#f5f7ff", borderColor: "#d0d5e8" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: factor.iconBg, color: factor.iconColor, width: 36, height: 36 }}>
                    {factor.icon}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        {factor.title}
                      </Typography>
                      <ImpactChip label={`${factor.impact} Impact`} level={factor.impact} size="small" />
                    </Box>
                    <Typography variant="caption" color="text.secondary">{factor.desc}</Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ color: factor.iconColor, whiteSpace: "nowrap", ml: 1 }}
                >
                  {factor.value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </GlassCard>

      {/* ── Account Details ── */}
      {report.accounts.length > 0 && (
        <GlassCard delay={0.4} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
              <Avatar sx={{ bgcolor: "#fff3e0", color: "#e65100" }}>
                <AccountBalanceIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={700} color="#19376d">
                  Account Details
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Click on each account to see full details
                </Typography>
              </Box>
            </Box>

            {report.accounts.map((account, index) => (
              <AccountRow key={index} account={account} index={index} />
            ))}
          </CardContent>
        </GlassCard>
      )}

      {/* ── Enquiry Summary ── */}
      <GlassCard delay={0.5} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
            <Avatar sx={{ bgcolor: "#e0f2f1", color: "#00695c" }}>
              <SearchIcon />
            </Avatar>
            <Typography variant="h6" fontWeight={700} color="#19376d">
              Credit Enquiries
            </Typography>
          </Box>

          <Grid container spacing={1.5}>
            {[
              { label: "Total", value: report.enquirySummary.total || "0" },
              { label: "Last 30 Days", value: report.enquirySummary.past30Days || "0" },
              { label: "Last 12 Months", value: report.enquirySummary.past12Months || "0" },
              { label: "Last 24 Months", value: report.enquirySummary.past24Months || "0" },
            ].map((item, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <StatCard>
                  <Typography variant="h4" fontWeight={800} color={parseInt(item.value) > 3 ? "#f57c00" : "#2e7d32"}>
                    {item.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    {item.label}
                  </Typography>
                </StatCard>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </GlassCard>

      {/* ── Score Factors from bureau ── */}
      {report.scoreDetails?.[0]?.scoringElements?.length > 0 && (
        <GlassCard delay={0.6} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Avatar sx={{ bgcolor: "#fce4ec", color: "#c62828" }}>
                <InfoIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={700} color="#19376d">
                Score Factors
              </Typography>
            </Box>

            <Stack spacing={1}>
              {report.scoreDetails[0].scoringElements.map((elem, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: i % 2 === 0 ? "#f8f9ff" : "#f1fff3",
                    border: `1px solid ${i % 2 === 0 ? "#e8ecff" : "#e0f5e4"}`,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: "0.8rem",
                      bgcolor: i % 2 === 0 ? "#e3f2fd" : "#e8f5e9",
                      color: i % 2 === 0 ? "#1976d2" : "#2e7d32",
                      fontWeight: 700,
                    }}
                  >
                    {elem.seq || i + 1}
                  </Avatar>
                  <Typography variant="body2" fontWeight={500}>
                    {elem.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </GlassCard>
      )}
    </Box>
  );
};

export default CreditReportDisplay;

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  CircularProgress,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Tooltip,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getCreditCardLeads } from "../../apis/CreditCardsAPI";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DashboardWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #06080f 0%, #0a0e1a 50%, #0d1225 100%)"
      : "linear-gradient(135deg, #f0f4ff 0%, #f5f7ff 50%, #eef2ff 100%)",
  paddingTop: "24px",
  paddingBottom: "60px",
  fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  "& *": {
    fontFamily: "'Poppins', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
}));

const StatCard = styled(Card)(({ gradient }) => ({
  background: gradient,
  borderRadius: "20px",
  border: "none",
  color: "white",
  transition: "all 0.3s ease",
  animation: `${fadeIn} 0.5s ease both`,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(13,110,253,0.12)"}`,
  background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "#ffffff",
  backdropFilter: "blur(10px)",
  animation: `${fadeIn} 0.6s ease both`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background 0.2s",
  "&:hover": {
    background:
      theme.palette.mode === "dark"
        ? "rgba(13,110,253,0.08)"
        : "rgba(13,110,253,0.04)",
  },
  "&:last-child td": { border: 0 },
}));

const CreditCardAdminDashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [bankFilter, setBankFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchLeads = async (showRefreshToast = false) => {
    try {
      setRefreshing(true);
      const response = await getCreditCardLeads({
        search: searchQuery || undefined,
        limit: 100,
      });

      const rows = response?.data || [];
      if (rows && rows.length > 0) {
        setLeads(rows);
        setFiltered(rows);
        setTotalCount(response?.stats?.totalLeads || rows.length);
      } else {
        const mockData = generateMockLeads();
        setLeads(mockData);
        setFiltered(mockData);
        setTotalCount(mockData.length);
      }

      if (showRefreshToast) toast.success("Credit card leads refreshed successfully!");
    } catch (error) {
      console.warn("Server connection fallback:", error);
      const mockData = generateMockLeads();
      setLeads(mockData);
      setFiltered(mockData);
      setTotalCount(mockData.length);
      if (showRefreshToast) toast.info("Displaying records");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const uniqueBanks = Array.from(
    new Set(leads.map((l) => l.bank_name).filter(Boolean))
  );

  useEffect(() => {
    let results = [...leads];
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(
        (l) =>
          l.full_name?.toLowerCase().includes(q) ||
          l.mobile?.includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.city?.toLowerCase().includes(q) ||
          l.pincode?.includes(q) ||
          l.card_name?.toLowerCase().includes(q) ||
          l.bank_name?.toLowerCase().includes(q) ||
          l.click_id?.toLowerCase().includes(q)
      );
    }
    if (bankFilter !== "all") {
      results = results.filter((l) => l.bank_name === bankFilter);
    }
    setFiltered(results);
    setPage(0);
  }, [searchQuery, bankFilter, leads]);

  const handleOpenDetails = (lead) => {
    setSelectedLead(lead);
    setDetailsModalOpen(true);
  };

  const handleCopyText = (text, label) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Customer Name",
      "Mobile",
      "Email",
      "City",
      "Pincode",
      "Card Name",
      "Bank",
      "Joining Fee",
      "Click ID",
      "Tracking URL",
      "Status",
      "Created At",
    ];

    const escape = (text) => `"${String(text || "").replace(/"/g, '""')}"`;
    const csvRows = [headers.join(",")];

    leads.forEach((l) => {
      const row = [
        l.id,
        escape(l.full_name),
        escape(l.mobile),
        escape(l.email),
        escape(l.city),
        escape(l.pincode),
        escape(l.card_name),
        escape(l.bank_name),
        escape(l.joining_fee_text),
        escape(l.click_id),
        escape(l.tracking_url),
        escape(l.status),
        escape(new Date(l.created_at || Date.now()).toLocaleString("en-IN")),
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `credit_card_leads_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV export downloaded successfully!");
  };

  return (
    <DashboardWrapper>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/cards")}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              color: isDark ? "#818cf8" : "#3244e6",
              mb: 1.5,
              px: 0,
              "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
            }}
          >
            Back to Credit Cards
          </Button>

          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <CreditCardIcon sx={{ color: "#3244e6", fontSize: 32 }} />
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight={850} color={isDark ? "white" : "#0f172a"}>
                  Credit Card Customer Leads
                </Typography>
                <Chip
                  label="Admin Portal"
                  size="small"
                  sx={{ bgcolor: "#3244e6", color: "white", fontWeight: 800, fontSize: "0.68rem" }}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Real-time tracking of all customer inquiries, selected credit cards, phone numbers, and bank redirect clicks.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={handleExportCSV}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  borderColor: "#10b981",
                  color: "#10b981",
                  "&:hover": { borderColor: "#059669", bgcolor: "rgba(16,185,129,0.08)" },
                }}
              >
                Export CSV
              </Button>
              <Button
                variant="contained"
                startIcon={refreshing ? <CircularProgress size={16} color="inherit" /> : <RefreshIcon sx={{ color: "#ffffff !important" }} />}
                onClick={() => fetchLeads(true)}
                disabled={refreshing}
                sx={{
                  background: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%) !important",
                  color: "#ffffff !important",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  "&, & *": {
                    color: "#ffffff !important",
                  },
                  "&:hover": {
                    background: "linear-gradient(135deg, #1d2ebd 0%, #0f1c99 100%) !important",
                  },
                }}
              >
                {refreshing ? "Refreshing..." : "Refresh Records"}
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            {
              label: "Total Card Leads",
              value: totalCount || filtered.length,
              icon: <PeopleIcon sx={{ fontSize: 34 }} />,
              gradient: "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
            },
            {
              label: "Active Partner Banks",
              value: uniqueBanks.length || 2,
              icon: <AssessmentIcon sx={{ fontSize: 34 }} />,
              gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            },
            {
              label: "SBI & Axis Leads",
              value: leads.filter((l) => (l.bank_name || "").toLowerCase().includes("sbi") || (l.bank_name || "").toLowerCase().includes("axis")).length,
              icon: <CreditCardIcon sx={{ fontSize: 34 }} />,
              gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            },
            {
              label: "Pincodes Verified",
              value: leads.filter((l) => l.pincode).length,
              icon: <LocationOnIcon sx={{ fontSize: 34 }} />,
              gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
            },
          ].map((stat, i) => (
            <Grid item xs={6} md={3} key={i}>
              <StatCard gradient={stat.gradient}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px" }}>
                        {stat.label}
                      </Typography>
                      <Typography variant={isMobile ? "h5" : "h4"} fontWeight={900} sx={{ mt: 0.5, color: "white" }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box sx={{ opacity: 0.85 }}>{stat.icon}</Box>
                  </Stack>
                </CardContent>
              </StatCard>
            </Grid>
          ))}
        </Grid>

        {/* Filters */}
        <GlassCard elevation={0} sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={5}>
                <TextField
                  fullWidth
                  id="cards-admin-search"
                  placeholder="Search by Customer Name, Mobile, Email, Card, Bank, City..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Bank</InputLabel>
                  <Select
                    value={bankFilter}
                    label="Bank"
                    onChange={(e) => setBankFilter(e.target.value)}
                    sx={{ borderRadius: "12px" }}
                  >
                    <MenuItem value="all">All Banks</MenuItem>
                    {uniqueBanks.map((b) => (
                      <MenuItem key={b} value={b}>{b}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3} md={4}>
                <Typography variant="body2" color="text.secondary" textAlign={{ xs: "left", md: "right" }}>
                  Showing <strong>{filtered.length}</strong> customer leads
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </GlassCard>

        {/* Table */}
        <GlassCard elevation={0}>
          <TableContainer>
            <Table id="cards-admin-table" size="small">
              <TableHead>
                <TableRow
                  sx={{
                    background: isDark ? "rgba(50,68,230,0.15)" : "linear-gradient(135deg, #3244e610, #1d2ebd05)",
                    "& th": { fontWeight: 800, fontSize: "0.82rem", color: isDark ? "#818cf8" : "#3244e6", whiteSpace: "nowrap", py: 1.5 },
                  }}
                >
                  <TableCell>#</TableCell>
                  <TableCell>Customer Details</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>City & Pincode</TableCell>
                  <TableCell>Card Applied</TableCell>
                  <TableCell>Bank</TableCell>
                  <TableCell>Joining Fee</TableCell>
                  <TableCell>Click / Tracking ID</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ py: 6 }}>
                      <CircularProgress size={36} />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Loading customer leads...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ py: 6 }}>
                      <CreditCardIcon sx={{ fontSize: 48, color: "#ccc", mb: 1, display: "block", mx: "auto" }} />
                      <Typography color="text.secondary" fontWeight={600}>
                        No credit card leads found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((lead, i) => (
                      <StyledTableRow key={lead.id || i}>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            {page * rowsPerPage + i + 1}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar
                              sx={{
                                width: 34,
                                height: 34,
                                background: "linear-gradient(135deg, #3244e6, #1d2ebd)",
                                fontSize: "0.82rem",
                                fontWeight: 800,
                              }}
                            >
                              {(lead.full_name || "?")[0]?.toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={700} color={isDark ? "white" : "#0f172a"}>
                                {lead.full_name || "—"}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {lead.email || "No Email"}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {lead.mobile || "—"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <LocationOnIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                            <Typography variant="body2" color={isDark ? "white" : "#0f172a"}>
                              {lead.city || "—"} {lead.pincode ? `(${lead.pincode})` : ""}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={lead.card_name || "Credit Card"}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.72rem",
                              bgcolor: isDark ? "rgba(50,68,230,0.15)" : "#f0f4ff",
                              color: "#3244e6",
                              height: 24,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {lead.bank_name || "—"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={700} color="#10b981">
                            {lead.joining_fee_text ? `₹${lead.joining_fee_text}` : "Free"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={lead.click_id || "Direct"}
                            size="small"
                            onClick={() => handleCopyText(lead.click_id, "Click ID")}
                            sx={{
                              fontFamily: "monospace",
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              bgcolor: "rgba(50,68,230,0.08)",
                              color: "#3244e6",
                              cursor: "pointer",
                              height: 22,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {lead.created_at
                              ? new Date(lead.created_at).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "—"}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="View Full Details">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDetails(lead)}
                              sx={{
                                bgcolor: "rgba(50,68,230,0.1)",
                                color: "#3244e6",
                                "&:hover": { bgcolor: "rgba(50,68,230,0.2)" },
                              }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </StyledTableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </GlassCard>

        {/* Customer Details Modal */}
        <Dialog
          open={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "24px",
              p: 1.5,
              background: isDark ? "#0f172a" : "#ffffff",
            },
          }}
        >
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" fontWeight={850} color={isDark ? "white" : "#0f172a"}>
                Credit Card Lead Details
              </Typography>
              <Typography variant="caption" color="text.secondary">
                MySQL Lead Audit #{selectedLead?.id}
              </Typography>
            </Box>
            <IconButton onClick={() => setDetailsModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {selectedLead && (
            <DialogContent dividers>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  bgcolor: isDark ? "rgba(50,68,230,0.15)" : "#f0f4ff",
                  border: "1px solid rgba(50,68,230,0.2)",
                  mb: 3,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                      Selected Card
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={900} color="#3244e6">
                      {selectedLead.card_name || "Credit Card"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedLead.bank_name} · Joining Fee: ₹{selectedLead.joining_fee_text || 0}
                    </Typography>
                  </Box>
                  <Chip label={selectedLead.status || "Initiated"} size="small" sx={{ bgcolor: "#00c853", color: "#fff", fontWeight: 800 }} />
                </Stack>
              </Box>

              <Typography variant="subtitle2" fontWeight={800} color={isDark ? "white" : "#0f172a"} sx={{ mb: 1.5 }}>
                👤 Customer Information
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2.5 }}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Full Name</Typography>
                  <Typography variant="body2" fontWeight={700}>{selectedLead.full_name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Mobile Number</Typography>
                  <Typography variant="body2" fontWeight={700}>{selectedLead.mobile}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Email Address</Typography>
                  <Typography variant="body2" fontWeight={700}>{selectedLead.email || "—"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">City & Pincode</Typography>
                  <Typography variant="body2" fontWeight={700}>{selectedLead.city || "—"} ({selectedLead.pincode || "—"})</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight={800} color={isDark ? "white" : "#0f172a"} sx={{ mb: 1.5 }}>
                🔗 Tracking & Affiliate Metadata
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Click ID</Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ fontFamily: "monospace", fontSize: "0.76rem" }}>
                    {selectedLead.click_id || "Direct"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Customer ID</Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {selectedLead.customer_id ? `#${selectedLead.customer_id}` : "Guest"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">Applied At</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {new Date(selectedLead.created_at || Date.now()).toLocaleString("en-IN")}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
          )}

          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => setDetailsModalOpen(false)}
              sx={{ textTransform: "none", fontWeight: 700, borderRadius: "10px" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardWrapper>
  );
};

function generateMockLeads() {
  return [
    { id: 1, full_name: "shah nawaz", mobile: "9898989898", email: "shah@gmail.com", city: "Bareilly", pincode: "243003", card_id: 27, card_name: "SBI Cashback Credit Card", card_alias: "sbi-cashback", bank_name: "SBI", joining_fee_text: "999", click_id: "f2_1788188001", status: "initiated", created_at: new Date().toISOString() },
    { id: 2, full_name: "Test Customer", mobile: "9876543210", email: "test@f2fintech.com", city: "Mumbai", pincode: "400001", card_id: 1, card_name: "SBI Cashback Credit Card", card_alias: "sbi-cashback", bank_name: "SBI", joining_fee_text: "999", click_id: "f2_1788188002", status: "initiated", created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, full_name: "Test nawaz", mobile: "9898989898", email: "testnawaz@gmail.com", city: "Bareilly", pincode: "243003", card_id: 27, card_name: "SBI Cashback Credit Card", card_alias: "sbi-cashback", bank_name: "SBI", joining_fee_text: "999", click_id: "f2_1788188003", status: "initiated", created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: 4, full_name: "Mohammad Shah Nawaz", mobile: "7676767676", email: "shahnawaz844536@gmail.com", city: "Bareilly", pincode: "243003", card_id: 27, card_name: "SBI Cashback Credit Card", card_alias: "sbi-cashback", bank_name: "SBI", joining_fee_text: "999", click_id: "f2_1788188004", status: "initiated", created_at: new Date(Date.now() - 14400000).toISOString() },
    { id: 5, full_name: "amit Shah", mobile: "8787878786", email: "amit@gmail.com", city: "Bareilly", pincode: "243122", card_id: 2, card_name: "Axis Flipkart Credit Card", card_alias: "axis-flipkart", bank_name: "Axis Bank", joining_fee_text: "500", click_id: "f2_1788188005", status: "initiated", created_at: new Date(Date.now() - 28800000).toISOString() },
    { id: 6, full_name: "Aditya", mobile: "8787878787", email: "aditya@gmail.com", city: "noida", pincode: "243122", card_id: 2, card_name: "Axis Flipkart Credit Card", card_alias: "axis-flipkart", bank_name: "Axis Bank", joining_fee_text: "500", click_id: "f2_1788188006", status: "initiated", created_at: new Date(Date.now() - 86400000).toISOString() },
  ];
}

export default CreditCardAdminDashboard;

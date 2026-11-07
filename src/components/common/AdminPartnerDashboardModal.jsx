import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TablePagination,
  Chip,
  CircularProgress,
  InputAdornment,
  Stack,
  Card,
  CardContent,
  Grid,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";
import BadgeIcon from "@mui/icons-material/Badge";

export default function AdminPartnerDashboardModal({
  open,
  onClose,
  title = "Partner Applications Dashboard",
  type = "realtor", // "realtor" | "dsa"
  fetchDataApi,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedApp, setSelectedApp] = useState(null);

  const loadData = async () => {
    if (!fetchDataApi) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchDataApi();
      if (res && res.data) {
        const dataList = Array.isArray(res.data) ? res.data : res.data.data || [];
        setApplications(dataList);
      } else if (Array.isArray(res)) {
        setApplications(res);
      } else {
        setApplications([]);
      }
    } catch (err) {
      console.error(`Error loading ${type} applications:`, err);
      setError(err.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadData();
      setPage(0);
      setSearchQuery("");
      setSelectedApp(null);
    }
  }, [open]);

  // Search filtering
  const filteredApplications = applications.filter((app) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      (app.name && app.name.toLowerCase().includes(query)) ||
      (app.email && app.email.toLowerCase().includes(query)) ||
      (app.mobile && app.mobile.toLowerCase().includes(query)) ||
      (app.city && app.city.toLowerCase().includes(query)) ||
      (app.company_gst && app.company_gst.toLowerCase().includes(query)) ||
      (app.experience && app.experience.toLowerCase().includes(query))
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return dateStr;
    }
  };

  const formatDateParts = (dateStr) => {
    if (!dateStr) return { date: "N/A", time: "" };
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return { date: dateStr, time: "" };
      const date = d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const time = d.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return { date, time };
    } catch {
      return { date: dateStr, time: "" };
    }
  };

  const formatCapitalizedName = (name) => {
    if (!name) return "N/A";
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Stats calculation
  const totalApps = applications.length;
  const gstApps = applications.filter((a) => a.company_gst && a.company_gst.trim().length > 0).length;
  const docsApps = applications.filter(
    (a) => a.aadhaar_doc || a.pan_doc || a.bank_proof_doc || a.photo_doc || a.rera_gst_doc
  ).length;
  const latestDate = applications.length > 0 ? formatDate(applications[0]?.created_at) : "N/A";

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            borderRadius: "24px",
            background: isDark ? "#0f172a" : "#ffffff",
            color: isDark ? "#ffffff" : "#0f172a",
            boxShadow: isDark
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
              : "0 25px 50px -12px rgba(50, 68, 230, 0.15)",
            backgroundImage: "none",
            maxHeight: "92vh",
          },
        }}
      >
        {/* MODAL HEADER */}
        <DialogTitle
          sx={{
            p: { xs: 2.5, sm: 3 },
            pb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                background: isDark
                  ? "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
                  : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isDark
                  ? "0 6px 16px rgba(56, 189, 248, 0.3)"
                  : "0 6px 16px rgba(50, 68, 230, 0.25)",
              }}
            >
              <DashboardIcon sx={{ color: "#ffffff", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", sm: "1.35rem" },
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: isDark ? "rgba(255,255,255,0.6)" : "#64748b",
                }}
              >
                Admin Panel • Database table: `{type}`
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Refresh Data">
              <IconButton
                onClick={loadData}
                disabled={loading}
                sx={{
                  color: isDark ? "#38bdf8" : "#3244e6",
                  border: `1px solid ${isDark ? "rgba(56, 189, 248, 0.3)" : "rgba(50, 68, 230, 0.2)"}`,
                  borderRadius: "12px",
                  "&:hover": {
                    background: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(50, 68, 230, 0.08)",
                  },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={onClose}
              sx={{
                color: isDark ? "rgba(255,255,255,0.7)" : "#64748b",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                borderRadius: "12px",
                "&:hover": {
                  background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        {/* MODAL CONTENT */}
        <DialogContent sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 2.5, sm: 3 } }}>
          {/* STATS CARDS */}
          <Grid container spacing={2} sx={{ mt: 0.5, mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  borderRadius: "16px",
                  background: isDark ? "rgba(30, 41, 59, 0.6)" : "#f8fafc",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                  boxShadow: "none",
                }}
              >
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Typography
                    variant="caption"
                    sx={{ color: isDark ? "rgba(255,255,255,0.6)" : "#64748b", fontWeight: 500 }}
                  >
                    Total Applications
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: isDark ? "#38bdf8" : "#3244e6", mt: 0.5 }}
                  >
                    {totalApps}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  borderRadius: "16px",
                  background: isDark ? "rgba(30, 41, 59, 0.6)" : "#f8fafc",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                  boxShadow: "none",
                }}
              >
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Typography
                    variant="caption"
                    sx={{ color: isDark ? "rgba(255,255,255,0.6)" : "#64748b", fontWeight: 500 }}
                  >
                    Docs Uploaded
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: isDark ? "#10b981" : "#059669", mt: 0.5 }}
                  >
                    {docsApps}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  borderRadius: "16px",
                  background: isDark ? "rgba(30, 41, 59, 0.6)" : "#f8fafc",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                  boxShadow: "none",
                }}
              >
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Typography
                    variant="caption"
                    sx={{ color: isDark ? "rgba(255,255,255,0.6)" : "#64748b", fontWeight: 500 }}
                  >
                    Latest Submission
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: isDark ? "#f59e0b" : "#d97706", mt: 1, fontSize: "0.85rem" }}
                  >
                    {latestDate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* SEARCH BAR & CONTROLS */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            spacing={2}
            sx={{ mb: 2.5 }}
          >
            <TextField
              size="small"
              placeholder="Search by Name, Email, Mobile, City, or GST..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: isDark ? "#94a3b8" : "#64748b" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "12px",
                  background: isDark ? "rgba(30, 41, 59, 0.6)" : "#f8fafc",
                  fontSize: "0.9rem",
                  "& fieldset": {
                    borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
                  },
                },
              }}
              sx={{ flexGrow: 1, maxWidth: { sm: 450 } }}
            />

            <Chip
              label={`Showing ${filteredApplications.length} of ${totalApps} entries`}
              variant="outlined"
              sx={{
                borderRadius: "10px",
                borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
                fontWeight: 600,
                color: isDark ? "rgba(255,255,255,0.8)" : "#475569",
              }}
            />
          </Stack>

          {/* TABLE / LOADING / ERROR */}
          {loading ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
              <CircularProgress size={48} sx={{ color: isDark ? "#38bdf8" : "#3244e6", mb: 2 }} />
              <Typography sx={{ color: isDark ? "rgba(255,255,255,0.7)" : "#64748b" }}>
                Fetching latest applications from database...
              </Typography>
            </Box>
          ) : error ? (
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: "16px",
                background: isDark ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.05)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                my: 2,
              }}
            >
              <Typography color="error" variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                {error}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={loadData}
                startIcon={<RefreshIcon />}
                sx={{ borderRadius: "10px", textTransform: "none", mt: 1 }}
              >
                Try Again
              </Button>
            </Box>
          ) : filteredApplications.length === 0 ? (
            <Box
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: "16px",
                background: isDark ? "rgba(30, 41, 59, 0.4)" : "#f8fafc",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                my: 2,
              }}
            >
              <DescriptionIcon sx={{ fontSize: 56, color: isDark ? "#475569" : "#cbd5e1", mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: isDark ? "#94a3b8" : "#64748b" }}>
                No Applications Found
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? "#64748b" : "#94a3b8", mt: 0.5 }}>
                {searchQuery
                  ? "No results matched your search criteria."
                  : `No applications have been submitted to the ${type} table yet.`}
              </Typography>
            </Box>
          ) : (
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                background: "transparent",
              }}
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          background: isDark ? "#1e293b" : "#f1f5f9",
                          color: isDark ? "#e2e8f0" : "#1e293b",
                          fontWeight: 700,
                          py: 1.5,
                        }}
                      >
                        #
                      </TableCell>
                      <TableCell
                        sx={{
                          background: isDark ? "#1e293b" : "#f1f5f9",
                          color: isDark ? "#e2e8f0" : "#1e293b",
                          fontWeight: 700,
                          py: 1.5,
                        }}
                      >
                        Applicant Name
                      </TableCell>
                      <TableCell
                        sx={{
                          background: isDark ? "#1e293b" : "#f1f5f9",
                          color: isDark ? "#e2e8f0" : "#1e293b",
                          fontWeight: 700,
                          py: 1.5,
                        }}
                      >
                        Contact Info
                      </TableCell>
                      <TableCell
                        sx={{
                          background: isDark ? "#1e293b" : "#f1f5f9",
                          color: isDark ? "#e2e8f0" : "#1e293b",
                          fontWeight: 700,
                          py: 1.5,
                        }}
                      >
                        City / Experience
                      </TableCell>
                      <TableCell
                        sx={{
                          background: isDark ? "#1e293b" : "#f1f5f9",
                          color: isDark ? "#e2e8f0" : "#1e293b",
                          fontWeight: 700,
                          py: 1.5,
                        }}
                      >
                        Company GST
                      </TableCell>
                      <TableCell
                        sx={{
                          background: isDark ? "#1e293b" : "#f1f5f9",
                          color: isDark ? "#e2e8f0" : "#1e293b",
                          fontWeight: 700,
                          py: 1.5,
                        }}
                      >
                        Submitted At
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          background: isDark ? "#1e293b" : "#f1f5f9",
                          color: isDark ? "#e2e8f0" : "#1e293b",
                          fontWeight: 700,
                          py: 1.5,
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredApplications
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const rowIndex = page * rowsPerPage + index + 1;

                        return (
                          <TableRow
                            key={row.id || index}
                            hover
                            sx={{
                              "&:nth-of-type(odd)": {
                                background: isDark ? "rgba(30, 41, 59, 0.3)" : "rgba(248, 250, 252, 0.8)",
                              },
                              "&:hover": {
                                background: isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(50, 68, 230, 0.04)",
                              },
                              transition: "background 0.2s",
                            }}
                          >
                            <TableCell sx={{ color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                              {rowIndex}
                            </TableCell>

                            <TableCell>
                              <Box>
                                <Typography
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: "0.92rem",
                                    color: isDark ? "#ffffff" : "#0f172a",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {formatCapitalizedName(row.name)}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center" mt={0.3}>
                                  {row.gender && (
                                    <Chip
                                      label={row.gender}
                                      size="small"
                                      sx={{
                                        height: 18,
                                        fontSize: "0.68rem",
                                        fontWeight: 600,
                                        borderRadius: "4px",
                                        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                                      }}
                                    />
                                  )}
                                  {row.age && (
                                    <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                                      Age: {row.age}
                                    </Typography>
                                  )}
                                </Stack>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    color: isDark ? "#38bdf8" : "#2563eb",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <PhoneIcon sx={{ fontSize: 14 }} /> {row.mobile || row.phone || "N/A"}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    color: isDark ? "#94a3b8" : "#64748b",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    mt: 0.3,
                                  }}
                                >
                                  <EmailIcon sx={{ fontSize: 14 }} /> {row.email || "N/A"}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Typography sx={{ fontSize: "0.85rem", color: isDark ? "#e2e8f0" : "#334155" }}>
                                {row.city || "N/A"}
                              </Typography>
                              {row.experience && (
                                <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b", display: "block" }}>
                                  Exp: {row.experience}
                                </Typography>
                              )}
                            </TableCell>

                            <TableCell>
                              {row.company_gst ? (
                                <Chip
                                  label={row.company_gst}
                                  size="small"
                                  color="secondary"
                                  variant="outlined"
                                  sx={{ fontWeight: 600, fontSize: "0.75rem", borderRadius: "6px" }}
                                />
                              ) : (
                                <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#94a3b8" }}>
                                  Not Provided
                                </Typography>
                              )}
                            </TableCell>

                            <TableCell>
                              {(() => {
                                const { date, time } = formatDateParts(row.created_at);
                                return (
                                  <Box>
                                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: isDark ? "#e2e8f0" : "#334155" }}>
                                      {date}
                                    </Typography>
                                    {time && (
                                      <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b", display: "block" }}>
                                        {time}
                                      </Typography>
                                    )}
                                  </Box>
                                );
                              })()}
                            </TableCell>

                            <TableCell align="center">
                              <Button
                                size="small"
                                variant="contained"
                                startIcon={<VisibilityIcon sx={{ fontSize: "16px !important", color: "#ffffff" }} />}
                                onClick={() => setSelectedApp(row)}
                                sx={{
                                  color: "#ffffff !important",
                                  borderRadius: "8px",
                                  textTransform: "none",
                                  fontSize: "0.78rem",
                                  fontWeight: 600,
                                  px: 1.5,
                                  py: 0.5,
                                  background: isDark
                                    ? "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)"
                                    : "linear-gradient(135deg, #3244e6 0%, #1d2ebd 100%)",
                                  boxShadow: "none",
                                  "&:hover": {
                                    color: "#ffffff !important",
                                    boxShadow: "0 4px 12px rgba(50,68,230,0.3)",
                                  },
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={filteredApplications.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  color: isDark ? "#e2e8f0" : "#334155",
                  borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                }}
              />
            </Paper>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: 2.5,
            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderRadius: "12px",
              px: 3,
              py: 1,
              fontWeight: 600,
              textTransform: "none",
              borderColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
              color: isDark ? "#ffffff" : "#0f172a",
            }}
          >
            Close Dashboard
          </Button>
        </DialogActions>
      </Dialog>

      {/* SINGLE APPLICATION DETAIL MODAL */}
      {selectedApp && (
        <Dialog
          open={Boolean(selectedApp)}
          onClose={() => setSelectedApp(null)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: "20px",
              background: isDark ? "#1e293b" : "#ffffff",
              color: isDark ? "#ffffff" : "#0f172a",
              p: 1,
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 1,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <BadgeIcon sx={{ color: isDark ? "#38bdf8" : "#3244e6" }} />
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                Application Details (#{selectedApp.id})
              </Typography>
            </Stack>
            <IconButton onClick={() => setSelectedApp(null)} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {/* Applicant Basic Info */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  background: isDark ? "rgba(30, 41, 59, 0.8)" : "#f8fafc",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#38bdf8" : "#3244e6", mb: 1 }}>
                  Personal Information
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                      Full Name
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, textTransform: "capitalize" }}>
                      {formatCapitalizedName(selectedApp.name)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                      Gender / Age
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedApp.gender || "N/A"} {selectedApp.age ? `(${selectedApp.age} yrs)` : ""}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                      Mobile / Phone
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedApp.mobile || selectedApp.phone || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                      Email Address
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, wordBreak: "break-all" }}>
                      {selectedApp.email || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Business Details */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  background: isDark ? "rgba(30, 41, 59, 0.8)" : "#f8fafc",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#a855f7" : "#7c3aed", mb: 1 }}>
                  Business & Professional Info
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                      Company GST / Firm
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedApp.company_gst || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                      City / Location
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedApp.city || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                      Experience Level
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedApp.experience || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Uploaded Documents */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  background: isDark ? "rgba(30, 41, 59, 0.8)" : "#f8fafc",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#10b981" : "#059669", mb: 1 }}>
                  Uploaded Documents
                </Typography>
                <Stack spacing={1}>
                  {[
                    { label: "Aadhaar Card", value: selectedApp.aadhaar_doc },
                    { label: "PAN Card", value: selectedApp.pan_doc },
                    { label: "Bank Proof / Statement", value: selectedApp.bank_proof_doc },
                    { label: "Passport Photo", value: selectedApp.photo_doc },
                    { label: "RERA / GST Certificate", value: selectedApp.rera_gst_doc },
                  ].map((doc, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 0.8,
                        px: 1.5,
                        borderRadius: "8px",
                        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {doc.label}
                      </Typography>
                      {doc.value ? (
                        <Button
                          size="small"
                          variant="outlined"
                          color="success"
                          href={doc.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ textTransform: "none", fontSize: "0.75rem", py: 0.2 }}
                        >
                          View Document
                        </Button>
                      ) : (
                        <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#94a3b8" }}>
                          Not Uploaded
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Timestamp */}
              <Box sx={{ textAlign: "right", px: 1 }}>
                <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#94a3b8" }}>
                  Submitted on: {formatDate(selectedApp.created_at)}
                </Typography>
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setSelectedApp(null)} sx={{ textTransform: "none", fontWeight: 600 }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

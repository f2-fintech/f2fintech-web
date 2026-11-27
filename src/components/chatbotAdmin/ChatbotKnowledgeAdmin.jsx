import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Archive, CheckCircle, Edit, Refresh, Sync } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ChatbotAPI } from "../../apis/ChatbotAPI";

const STATUS_COLOR = {
  approved: "success",
  pending_approval: "warning",
  draft: "default",
  archived: "error",
};

const KB_CATEGORIES = [
  "company_info",
  "loan_category",
  "policy",
  "faq",
  "application_guide",
  "support",
  "blog_summary",
];

export default function ChatbotKnowledgeAdmin() {
  const [tab, setTab] = useState(0);
  const [knowledgeRows, setKnowledgeRows] = useState([]);
  const [catalogRows, setCatalogRows] = useState([]);
  const [formConfigs, setFormConfigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const [kbDialogOpen, setKbDialogOpen] = useState(false);
  const [editingKb, setEditingKb] = useState(null);
  const [kbForm, setKbForm] = useState({
    title: "",
    category: "faq",
    content_en: "",
    content_hi: "",
    keywords: "",
    source_ref: "admin_portal",
    submitForApproval: true,
  });

  const [catDialogOpen, setCatDialogOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [catForm, setCatForm] = useState({
    provider_name: "",
    loan_category_slug: "personal-loan",
    rate_min: "",
    rate_max: "",
    rate_range_text: "",
    processing_fee_text: "",
    prepayment_charges: "",
    foreclosure_charges: "",
    submitForApproval: true,
  });

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [kbRes, catRes, cfgRes] = await Promise.all([
        ChatbotAPI.adminListKnowledge(),
        ChatbotAPI.adminListCatalog(),
        ChatbotAPI.adminListFormConfigs(),
      ]);
      setKnowledgeRows(kbRes.data || []);
      setCatalogRows(catRes.data || []);
      setFormConfigs(cfgRes.data || []);
    } catch (err) {
      setError(
        err.status === 401 || err.status === 403
          ? "Admin authentication required. Please sign in with an authorized F2Fintech Admin account."
          : err.message || "Failed to load admin chatbot configuration."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const openNewKb = () => {
    setEditingKb(null);
    setKbForm({
      title: "",
      category: "faq",
      content_en: "",
      content_hi: "",
      keywords: "",
      source_ref: "admin_portal",
      submitForApproval: true,
    });
    setKbDialogOpen(true);
  };

  const openEditKb = (row) => {
    setEditingKb(row);
    setKbForm({
      title: row.title || "",
      category: row.category || "faq",
      content_en: row.content_en || "",
      content_hi: row.content_hi || "",
      keywords: row.keywords || "",
      source_ref: row.source_ref || "admin_portal",
      submitForApproval: true,
    });
    setKbDialogOpen(true);
  };

  const handleSaveKb = async () => {
    setError(null);
    setNotice(null);
    try {
      if (editingKb) {
        await ChatbotAPI.adminUpdateKnowledge(editingKb.id, kbForm);
        setNotice("Knowledge entry updated (awaiting approval before live bot usage).");
      } else {
        await ChatbotAPI.adminCreateKnowledge(kbForm);
        setNotice("Knowledge entry created.");
      }
      setKbDialogOpen(false);
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApproveKb = async (id) => {
    setError(null);
    setNotice(null);
    try {
      const res = await ChatbotAPI.adminApproveKnowledge(id);
      setNotice(
        res.vectorSynced
          ? "Entry approved & synced to Upstash Vector store."
          : "Entry approved in MySQL (vector sync skipped or offline)."
      );
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleArchiveKb = async (id) => {
    setError(null);
    setNotice(null);
    try {
      await ChatbotAPI.adminArchiveKnowledge(id);
      setNotice("Entry archived & removed from live retrieval.");
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditCatalog = (row) => {
    setEditingCat(row);
    setCatForm({
      provider_name: row.provider_name || "",
      loan_category_slug: row.loan_category_slug || "personal-loan",
      rate_min: row.rate_min ?? "",
      rate_max: row.rate_max ?? "",
      rate_range_text: row.rate_range_text || "",
      processing_fee_text: row.processing_fee_text || "",
      prepayment_charges: row.prepayment_charges || "",
      foreclosure_charges: row.foreclosure_charges || "",
      submitForApproval: true,
    });
    setCatDialogOpen(true);
  };

  const handleSaveCatalog = async () => {
    setError(null);
    setNotice(null);
    try {
      const payload = {
        ...catForm,
        rate_min: catForm.rate_min !== "" ? Number(catForm.rate_min) : null,
        rate_max: catForm.rate_max !== "" ? Number(catForm.rate_max) : null,
      };
      await ChatbotAPI.adminUpsertCatalog(payload, editingCat?.id || null);
      setCatDialogOpen(false);
      setNotice("Catalog product saved.");
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApproveCatalog = async (id) => {
    setError(null);
    setNotice(null);
    try {
      await ChatbotAPI.adminApproveCatalog(id);
      setNotice("Catalog product approved for live comparisons & recommendations.");
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={800} color="#0f172a">
            F2Fintech AI Chatbot — Knowledge & Catalog Control
          </Typography>
          <Typography variant="body2" color="#64748b">
            Manage verified internal knowledge, loan product terms, and form configs (Draft → Approved → Vector Sync)
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/admin/chatbot-analytics" variant="outlined" sx={{ textTransform: "none" }}>
            Analytics Dashboard
          </Button>
          <Button
            startIcon={<Refresh />}
            variant="outlined"
            onClick={loadAll}
            disabled={loading}
            sx={{ textTransform: "none" }}
          >
            Refresh
          </Button>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={openNewKb}
            sx={{ bgcolor: "#3244e6", "&:hover": { bgcolor: "#1d2ebd" }, textTransform: "none" }}
          >
            Add KB Entry
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {notice && <Alert severity="success" sx={{ mb: 2 }}>{notice}</Alert>}

      <Paper elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: "1px solid #e2e8f0", px: 2 }}>
          <Tab label={`Knowledge Base (${knowledgeRows.length})`} sx={{ textTransform: "none", fontWeight: 700 }} />
          <Tab label={`Loan Catalog (${catalogRows.length})`} sx={{ textTransform: "none", fontWeight: 700 }} />
          <Tab label={`Application Form Configs (${formConfigs.length})`} sx={{ textTransform: "none", fontWeight: 700 }} />
        </Tabs>

        {tab === 0 && (
          <TableContainer sx={{ maxHeight: 580 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Source</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Ver</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {knowledgeRows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={row.status}
                        color={STATUS_COLOR[row.status] || "default"}
                        sx={{ fontWeight: 700, fontSize: "0.7rem" }}
                      />
                    </TableCell>
                    <TableCell>{row.source_ref || "—"}</TableCell>
                    <TableCell>v{row.version || 1}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.8} justifyContent="flex-end">
                        <Button size="small" startIcon={<Edit />} onClick={() => openEditKb(row)} sx={{ textTransform: "none" }}>
                          Edit
                        </Button>
                        {row.status !== "approved" && (
                          <Button
                            size="small"
                            color="success"
                            variant="contained"
                            startIcon={<Sync />}
                            onClick={() => handleApproveKb(row.id)}
                            sx={{ textTransform: "none" }}
                          >
                            Approve & Sync
                          </Button>
                        )}
                        {row.status !== "archived" && (
                          <Button
                            size="small"
                            color="error"
                            startIcon={<Archive />}
                            onClick={() => handleArchiveKb(row.id)}
                            sx={{ textTransform: "none" }}
                          >
                            Archive
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === 1 && (
          <TableContainer sx={{ maxHeight: 580 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Provider</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Rate</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Fee</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {catalogRows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{row.provider_name}</TableCell>
                    <TableCell>{row.loan_category_slug}</TableCell>
                    <TableCell>{row.rate_range_text || `${row.rate_min ?? "?"}%`}</TableCell>
                    <TableCell>{row.processing_fee_text || "Not Available"}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={row.status}
                        color={STATUS_COLOR[row.status] || "default"}
                        sx={{ fontWeight: 700, fontSize: "0.7rem" }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.8} justifyContent="flex-end">
                        <Button size="small" startIcon={<Edit />} onClick={() => openEditCatalog(row)} sx={{ textTransform: "none" }}>
                          Edit
                        </Button>
                        {row.status !== "approved" && (
                          <Button
                            size="small"
                            color="success"
                            variant="contained"
                            startIcon={<CheckCircle />}
                            onClick={() => handleApproveCatalog(row.id)}
                            sx={{ textTransform: "none" }}
                          >
                            Approve
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === 2 && (
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {formConfigs.map((cfg) => (
                <Grid item xs={12} md={6} key={cfg.loan_type}>
                  <Paper elevation={0} sx={{ p: 2, borderRadius: 2.5, border: "1px solid #e2e8f0" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {cfg.display_name} ({cfg.loan_type})
                      </Typography>
                      <Chip size="small" label={cfg.loan_category} color="primary" variant="outlined" />
                    </Stack>
                    <Typography variant="caption" color="#475569" display="block">
                      Mandatory Docs ({(cfg.mandatory_documents_json || []).length}):{" "}
                      {(cfg.mandatory_documents_json || []).map((d) => d.label).join(", ")}
                    </Typography>
                    <Typography variant="caption" color="#64748b" display="block" sx={{ mt: 0.5 }}>
                      Optional Docs ({(cfg.optional_documents_json || []).length}):{" "}
                      {(cfg.optional_documents_json || []).map((d) => d.label).join(", ") || "None"}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>

      {/* KB Modal */}
      <Dialog open={kbDialogOpen} onClose={() => setKbDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingKb ? "Edit Knowledge Entry" : "New F2Fintech Knowledge Entry"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={kbForm.title}
              onChange={(e) => setKbForm({ ...kbForm, title: e.target.value })}
            />
            <TextField
              select
              label="Category"
              fullWidth
              value={kbForm.category}
              onChange={(e) => setKbForm({ ...kbForm, category: e.target.value })}
            >
              {KB_CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Verified Content (English)"
              multiline
              rows={5}
              fullWidth
              value={kbForm.content_en}
              onChange={(e) => setKbForm({ ...kbForm, content_en: e.target.value })}
            />
            <TextField
              label="Verified Content (Hindi - Optional)"
              multiline
              rows={3}
              fullWidth
              value={kbForm.content_hi}
              onChange={(e) => setKbForm({ ...kbForm, content_hi: e.target.value })}
            />
            <TextField
              label="Keywords (comma-separated)"
              fullWidth
              value={kbForm.keywords}
              onChange={(e) => setKbForm({ ...kbForm, keywords: e.target.value })}
            />
            <TextField
              label="Source Reference"
              fullWidth
              value={kbForm.source_ref}
              onChange={(e) => setKbForm({ ...kbForm, source_ref: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setKbDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveKb} sx={{ bgcolor: "#3244e6" }}>
            Save Draft
          </Button>
        </DialogActions>
      </Dialog>

      {/* Catalog Modal */}
      <Dialog open={catDialogOpen} onClose={() => setCatDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Loan Catalog Product</DialogTitle>
        <DialogContent>
          <Stack spacing={1.8} sx={{ mt: 1 }}>
            <TextField
              label="Provider Name"
              fullWidth
              value={catForm.provider_name}
              onChange={(e) => setCatForm({ ...catForm, provider_name: e.target.value })}
            />
            <Stack direction="row" spacing={1.5}>
              <TextField
                label="Min Rate (%)"
                type="number"
                fullWidth
                value={catForm.rate_min}
                onChange={(e) => setCatForm({ ...catForm, rate_min: e.target.value })}
              />
              <TextField
                label="Max Rate (%)"
                type="number"
                fullWidth
                value={catForm.rate_max}
                onChange={(e) => setCatForm({ ...catForm, rate_max: e.target.value })}
              />
            </Stack>
            <TextField
              label="Rate Range Text"
              fullWidth
              value={catForm.rate_range_text}
              onChange={(e) => setCatForm({ ...catForm, rate_range_text: e.target.value })}
            />
            <TextField
              label="Processing Fee Text"
              fullWidth
              value={catForm.processing_fee_text}
              onChange={(e) => setCatForm({ ...catForm, processing_fee_text: e.target.value })}
            />
            <TextField
              label="Prepayment Charges"
              fullWidth
              value={catForm.prepayment_charges}
              onChange={(e) => setCatForm({ ...catForm, prepayment_charges: e.target.value })}
            />
            <TextField
              label="Foreclosure Charges"
              fullWidth
              value={catForm.foreclosure_charges}
              onChange={(e) => setCatForm({ ...catForm, foreclosure_charges: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCatDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCatalog} sx={{ bgcolor: "#3244e6" }}>
            Save Draft
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

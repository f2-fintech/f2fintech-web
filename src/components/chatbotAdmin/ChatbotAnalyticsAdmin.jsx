import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChatbotAPI } from "../../apis/ChatbotAPI";

function KpiCard({ label, value, color = "#3244e6" }) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 2.5, border: "1px solid #e2e8f0" }}>
      <Typography variant="caption" fontWeight={700} color="#64748b">
        {label}
      </Typography>
      <Typography variant="h5" fontWeight={800} sx={{ color, mt: 0.4 }}>
        {value ?? 0}
      </Typography>
    </Paper>
  );
}

export default function ChatbotAnalyticsAdmin() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadAnalytics = useCallback(async (windowDays) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ChatbotAPI.adminGetAnalytics(windowDays);
      setData(res);
    } catch (err) {
      setError(
        err.status === 401 || err.status === 403
          ? "Admin authentication required. Please sign in as an F2Fintech Admin."
          : err.message || "Failed to load chatbot analytics."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics(days);
  }, [days, loadAnalytics]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={800} color="#0f172a">
            F2Fintech AI Chatbot Analytics
          </Typography>
          <Typography variant="body2" color="#64748b">
            Aggregated usage, funnel metrics, CSAT & unresolved topic monitoring (Privacy-Safe — Zero Customer PII)
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.2} alignItems="center">
          <TextField
            select
            size="small"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value={7}>Last 7 Days</MenuItem>
            <MenuItem value={30}>Last 30 Days</MenuItem>
            <MenuItem value={90}>Last 90 Days</MenuItem>
          </TextField>

          <Button component={Link} to="/admin/chatbot-knowledge" variant="outlined" sx={{ textTransform: "none" }}>
            Knowledge Base
          </Button>
          <Button
            startIcon={<Refresh />}
            variant="contained"
            onClick={() => loadAnalytics(days)}
            disabled={loading}
            sx={{ bgcolor: "#3244e6", textTransform: "none" }}
          >
            Refresh
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={4} md={2}>
          <KpiCard label="Total Sessions" value={kpis.totalConversations} />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <KpiCard label="Comparisons Run" value={kpis.comparisonsRun} color="#0284c7" />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <KpiCard label="Recommendations" value={kpis.recommendationsGenerated} color="#7c3aed" />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <KpiCard label="Apps Completed" value={kpis.applicationsCompleted} color="#059669" />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <KpiCard label="Doc Upload Fails" value={kpis.documentUploadFailures} color="#dc2626" />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <KpiCard
            label="Positive CSAT"
            value={kpis.csatPositivePercent !== null && kpis.csatPositivePercent !== undefined ? `${kpis.csatPositivePercent}%` : "N/A"}
            color="#10b981"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: "1px solid #e2e8f0", height: 340 }}>
            <Typography variant="subtitle2" fontWeight={700} color="#0f172a" sx={{ mb: 2 }}>
              Loan Categories Explored
            </Typography>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={charts.loanCategoriesExplored || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3244e6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: "1px solid #e2e8f0", height: 340 }}>
            <Typography variant="subtitle2" fontWeight={700} color="#0f172a" sx={{ mb: 2 }}>
              Most Compared Loan Providers
            </Typography>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={charts.providerComparisons || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="provider" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: "1px solid #e2e8f0" }}>
            <Typography variant="subtitle2" fontWeight={700} color="#0f172a" sx={{ mb: 1.5 }}>
              Top Frequently Asked Topics ({(charts.frequentlyAskedTopics || []).length})
            </Typography>
            {(charts.frequentlyAskedTopics || []).length === 0 ? (
              <Typography variant="body2" color="#64748b">No FAQ events logged in this period yet.</Typography>
            ) : (
              <Stack spacing={0.8}>
                {charts.frequentlyAskedTopics.map((item, idx) => (
                  <Stack key={idx} direction="row" justifyContent="space-between" sx={{ py: 0.6, borderBottom: "1px dashed #e2e8f0" }}>
                    <Typography variant="body2" color="#334155">{item.topic}</Typography>
                    <Typography variant="body2" fontWeight={700} color="#3244e6">{item.count}</Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: "1px solid #e2e8f0" }}>
            <Typography variant="subtitle2" fontWeight={700} color="#b91c1c" sx={{ mb: 1.5 }}>
              Unresolved Queries (Content Gap Signals: {kpis.unresolvedQueriesCount || 0})
            </Typography>
            {(charts.unresolvedTopics || []).length === 0 ? (
              <Typography variant="body2" color="#64748b">Zero unresolved queries logged in this period.</Typography>
            ) : (
              <Stack spacing={0.8}>
                {charts.unresolvedTopics.map((item, idx) => (
                  <Stack key={idx} direction="row" justifyContent="space-between" sx={{ py: 0.6, borderBottom: "1px dashed #fee2e2" }}>
                    <Typography variant="body2" color="#7f1d1d">{item.topic}</Typography>
                    <Typography variant="body2" fontWeight={700} color="#dc2626">{item.count}</Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}


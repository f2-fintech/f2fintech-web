import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Users, Award, ShieldCheck } from "lucide-react";
import { indiaStatesData, indiaCitiesData } from "./IndiaMapData";

// Active states/UTs list matching user request (exactly 28 states)
const activeStates = [
  "up", "mh", "tg", "ka", "rj", "ap", "hr", "mp", "br", "tn",
  "kl", "wb", "pb", "ct", "as", "ut", "jh", "ga", "sk", "ar",
  "mz", "hp", "or", "tr", "mn", "gj", "nl", "ml"
];

// Helper function to resolve flag colors for active states (Saffron, White, Green)
const getStateFlagColor = (stateId) => {
  const flagColors = ["#FF9933", "#FFFFFF", "#138808"];
  const allStates = ["jk", ...activeStates];
  const idx = allStates.indexOf(stateId);
  return idx !== -1 ? flagColors[idx % 3] : "#FFFFFF";
};

// Mock statistical data for each state to make it interactive and premium
const stateStats = {
  up: { name: "Uttar Pradesh", disbursals: "₹200 Cr+", clients: "1,979", rating: "4.9/5", hub: "Lucknow / Noida" },
  mh: { name: "Maharashtra", disbursals: "₹170 Cr+", clients: "1,732", rating: "4.9/5", hub: "Mumbai / Pune / Thane" },
  tg: { name: "Telangana", disbursals: "₹134 Cr+", clients: "1,338", rating: "4.8/5", hub: "Hyderabad" },
  ka: { name: "Karnataka", disbursals: "₹85 Cr+", clients: "829", rating: "4.9/5", hub: "Bangalore" },
  rj: { name: "Rajasthan", disbursals: "₹63 Cr+", clients: "645", rating: "4.8/5", hub: "Jaipur" },
  ap: { name: "Andhra Pradesh", disbursals: "₹63 Cr+", clients: "643", rating: "4.8/5", hub: "Visakhapatnam / Vijayawada" },
  hr: { name: "Haryana", disbursals: "₹60 Cr+", clients: "638", rating: "4.7/5", hub: "Gurugram" },
  mp: { name: "Madhya Pradesh", disbursals: "₹58 Cr+", clients: "592", rating: "4.8/5", hub: "Bhopal / Indore" },
  br: { name: "Bihar", disbursals: "₹58 Cr+", clients: "590", rating: "4.7/5", hub: "Patna" },
  tn: { name: "Tamil Nadu", disbursals: "₹47 Cr+", clients: "499", rating: "4.9/5", hub: "Chennai / Coimbatore" },
  kl: { name: "Kerala", disbursals: "₹35 Cr+", clients: "378", rating: "4.8/5", hub: "Kochi" },
  wb: { name: "West Bengal", disbursals: "₹35 Cr+", clients: "376", rating: "4.8/5", hub: "Kolkata" },
  pb: { name: "Punjab", disbursals: "₹28 Cr+", clients: "292", rating: "4.7/5", hub: "Chandigarh Hub" },
  ct: { name: "Chhattisgarh", disbursals: "₹17 Cr+", clients: "184", rating: "4.7/5", hub: "Raipur" },
  as: { name: "Assam", disbursals: "₹15.5 Cr+", clients: "166", rating: "4.6/5", hub: "Guwahati" },
  ut: { name: "Uttarakhand", disbursals: "₹12 Cr+", clients: "126", rating: "4.7/5", hub: "Dehradun" },
  jk: { name: "Jammu and Kashmir", disbursals: "Upcoming", clients: "Upcoming Hub", rating: "5.0/5", hub: "Srinagar / Jammu" },
  jh: { name: "Jharkhand", disbursals: "₹9 Cr+", clients: "96", rating: "4.7/5", hub: "Ranchi" },
  ga: { name: "Goa", disbursals: "₹3 Cr+", clients: "35", rating: "4.8/5", hub: "Panaji" },
  sk: { name: "Sikkim", disbursals: "₹1.5 Cr+", clients: "18", rating: "4.8/5", hub: "Gangtok" },
  ar: { name: "Arunachal Pradesh", disbursals: "₹1 Cr+", clients: "13", rating: "4.6/5", hub: "Itanagar" },
  mz: { name: "Mizoram", disbursals: "₹1 Cr+", clients: "13", rating: "4.6/5", hub: "Aizawl" },
  hp: { name: "Himachal Pradesh", disbursals: "₹1 Cr+", clients: "13", rating: "4.7/5", hub: "Shimla" },
  or: { name: "Odisha", disbursals: "₹1 Cr+", clients: "13", rating: "4.7/5", hub: "Bhubaneswar" },
  tr: { name: "Tripura", disbursals: "₹0.8 Cr+", clients: "10", rating: "4.6/5", hub: "Agartala" },
  mn: { name: "Manipur", disbursals: "₹0.6 Cr+", clients: "8", rating: "4.6/5", hub: "Imphal" },
  gj: { name: "Gujarat", disbursals: "₹0.4 Cr+", clients: "5", rating: "4.8/5", hub: "Ahmedabad" },
  nl: { name: "Nagaland", disbursals: "₹0.1 Cr+", clients: "3", rating: "4.5/5", hub: "Kohima" },
  ml: { name: "Meghalaya", disbursals: "₹0.1 Cr+", clients: "3", rating: "4.6/5", hub: "Shillong" }
};

// Helper function to resolve custom label positions for dense/overlapping map regions
const getLabelOffset = (city) => {
  const w = city.name.length * 6 + 12;
  let align = "top"; // default

  if (city.name === "Gurugram") align = "left";
  if (city.name === "Noida") align = "right";

  if (city.name === "Thane") align = "top";
  if (city.name === "Mumbai") align = "left";
  if (city.name === "Pune") align = "right";

  if (city.name === "Chandigarh Hub") align = "left";
  if (city.name === "Dehradun") align = "right";

  if (city.name === "Shillong") align = "left";
  if (city.name === "Guwahati") align = "top";
  if (city.name === "Kohima") align = "right";
  if (city.name === "Imphal") align = "left";
  if (city.name === "Agartala") align = "left";
  if (city.name === "Aizawl") align = "right";

  if (city.name === "Indore") align = "left";
  if (city.name === "Bhopal") align = "right";

  if (city.name === "Bangalore") align = "left";
  if (city.name === "Chennai") align = "right";

  if (city.name === "Kochi") align = "bottom";

  switch (align) {
    case "left":
      return { tx: -(w / 2 + 8), ty: -2 };
    case "right":
      return { tx: (w / 2 + 8), ty: -2 };
    case "bottom":
      return { tx: 0, ty: 15 };
    case "top":
    default:
      return { tx: 0, ty: -13 };
  }
};

export default function IndiaPresence() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [hoveredState, setHoveredState] = useState(null);

  // Active state data if hovered state is active
  const activeHoverData = hoveredState && activeStates.includes(hoveredState) ? stateStats[hoveredState] : null;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "#f8fafc", position: "relative", overflow: "hidden" }}>
      {/* CSS Keyframe Animation for pulsing dots */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .pulsing-circle {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          transform-origin: 0px 0px;
        }
        `
      }} />

      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 } }}>
          <Chip
            label="OUR FOOTPRINT"
            sx={{
              background: "rgba(50, 68, 230, 0.08)",
              color: "#3244e6",
              fontWeight: 800,
              fontSize: "0.85rem",
              borderRadius: "50px",
              mb: 2,
              fontFamily: "Poppins, sans-serif",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
              fontWeight: 650,
              lineHeight: 1.2,
              color: "#1e293b",
              mb: 2,
              letterSpacing: "-0.04em",
            }}
          >
            National Loan Disbursement{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #1f1681ff 0%, #102e7aff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block",
              }}
            >
              Presence
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.3rem" },
              color: "#64748b",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
              px: { xs: 2, sm: 0 },
            }}
          >
            Empowering professionals, doctors, and businesses across India with disbursals spanning 28 states.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* LEFT COLUMN: INTERACTIVE MAP & SELECTOR */}
          <Grid item xs={12} md={7.5} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>

            {/* Mobile Dropdown Selector */}
            {isMobile && (
              <Box sx={{ mb: 3.5, width: "100%", maxWidth: "450px", px: { xs: 2, sm: 0 } }}>
                <FormControl fullWidth size="medium" sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    bgcolor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(50, 68, 230, 0.04)',
                    '& fieldset': {
                      borderColor: 'rgba(50, 68, 230, 0.15)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3244e6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3244e6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#64748b',
                    fontWeight: 500,
                    fontFamily: "Poppins, sans-serif",
                    '&.Mui-focused': {
                      color: '#3244e6',
                    }
                  }
                }}>
                  <InputLabel id="state-select-label">Select State / UT to View Details</InputLabel>
                  <Select
                    labelId="state-select-label"
                    value={hoveredState || ""}
                    label="Select State / UT to View Details"
                    onChange={(e) => {
                      const val = e.target.value;
                      setHoveredState(val || null);
                    }}
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <MenuItem value="" sx={{ fontFamily: "Poppins, sans-serif" }}>
                      <em>National Summary (All India)</em>
                    </MenuItem>
                    {activeStates
                      .map((id) => ({ id, name: stateStats[id]?.name || id }))
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((item) => (
                        <MenuItem key={item.id} value={item.id} sx={{ fontFamily: "Poppins, sans-serif" }}>
                          {item.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>
            )}

            <Box
              sx={{
                width: "100%",
                maxWidth: "600px",
                position: "relative",
                filter: "drop-shadow(0 20px 40px rgba(50, 68, 230, 0.06))",
                px: { xs: 1, sm: 0 },
              }}
            >
              <svg
                viewBox="0 0 612 696"
                width="100%"
                height="100%"
                style={{
                  display: "block",
                  overflow: "visible",
                }}
              >
                {/* MAP SHADOW (Backside offset map) */}
                <g id="states-shadow-group" transform="translate(15, 10)" style={{ pointerEvents: "none" }}>
                  {indiaStatesData.map((state) => (
                    <path
                      key={`shadow-${state.id}`}
                      d={state.path}
                      fill="#e2e8f0"
                      stroke="#cbd5e1"
                      strokeWidth="0.5"
                    />
                  ))}
                </g>

                {/* MAP PATHS */}
                <g id="states-group">
                  {indiaStatesData.map((state) => {
                    const isActive = activeStates.includes(state.id);
                    const isHovered = hoveredState === state.id;

                    let fill = "#cbd5e1"; // Solid inactive state color (slate 300) for clean contrast
                    let stroke = "#94a3b8"; // Inactive border
                    let strokeWidth = "0.75";

                    if (isActive || state.id === "jk") {
                      // Active state colors matching website theme
                      fill = isHovered ? "#2535cf" : "rgba(50, 68, 230, 0.85)";
                      stroke = "#ffffff";
                      strokeWidth = isHovered ? "1.5" : "1";
                    }

                    return (
                      <path
                        key={state.id}
                        d={state.path}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        style={{
                          cursor: isActive ? "pointer" : "default",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={() => isActive && !isMobile && setHoveredState(state.id)}
                        onMouseLeave={() => isActive && !isMobile && setHoveredState(null)}
                        onClick={() => {
                          if (isActive) {
                            if (hoveredState === state.id) {
                              setHoveredState(null);
                            } else {
                              setHoveredState(state.id);
                            }
                          }
                        }}
                      />
                    );
                  })}
                </g>

                {/* CITY MARKERS */}
                <g id="cities-group" style={{ pointerEvents: "none" }}>
                  {indiaCitiesData
                    .filter((city) => city.state !== "Delhi" && city.state !== "Jammu and Kashmir")
                    .map((city) => {
                      const { tx, ty } = getLabelOffset(city);
                      return (
                        <g key={city.name} transform={`translate(${city.x}, ${city.y})`}>
                          {/* Pulsing White Rings */}
                          <circle
                            r="9"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="2.5"
                            className="pulsing-circle"
                          />
                          {/* Central White Dot */}
                          <circle
                            r="3.5"
                            fill="#ffffff"
                            stroke="#ffffff"
                            strokeWidth="0.75"
                          />
                          {/* Tiny city label */}
                          <g transform={`translate(${tx}, ${ty})`}>
                            <rect
                              x={-(city.name.length * 3 + 6)}
                              y="-9"
                              width={city.name.length * 6 + 12}
                              height="14"
                              rx="4"
                              fill="rgba(15, 23, 42, 0.85)"
                              stroke="rgba(255, 255, 255, 0.15)"
                              strokeWidth="0.5"
                            />
                            <text
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="7.5"
                              fontWeight="700"
                              fontFamily="'DM Sans', sans-serif"
                            >
                              {city.name}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                </g>
              </svg>
            </Box>
          </Grid>

          {/* RIGHT COLUMN: INFOGRAPHIC & HOVER DATA CARD */}
          <Grid item xs={12} md={4.5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5, px: { xs: 2, sm: 0 } }}>
              {/* Dynamic Interactive States Details Card */}
              <Card
                sx={{
                  borderRadius: "24px",
                  border: "1px solid rgba(50, 68, 230, 0.1)",
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 20px 40px rgba(50, 68, 230, 0.04)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                  <AnimatePresence mode="wait">
                    {activeHoverData ? (
                      <motion.div
                        key={hoveredState}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: "12px",
                                bgcolor: "rgba(50, 68, 230, 0.1)",
                                color: "#3244e6",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <MapPin size={24} />
                            </Box>
                            <Box>
                              <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "1.3rem", sm: "1.5rem" } }}>
                                {activeHoverData.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                                F2 Fintech Active State
                              </Typography>
                            </Box>
                          </Box>
                          <Chip
                            label="Reset"
                            size="small"
                            onClick={() => setHoveredState(null)}
                            sx={{
                              bgcolor: "rgba(50, 68, 230, 0.08)",
                              color: "#3244e6",
                              fontWeight: 700,
                              cursor: "pointer",
                              fontSize: "0.75rem",
                              borderRadius: "8px",
                              '&:hover': {
                                bgcolor: "rgba(50, 68, 230, 0.15)",
                              }
                            }}
                          />
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2.5}>
                          <Grid item xs={6}>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, display: "block", mb: 0.5 }}>
                              LOANS DISBURSED
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: "#3244e6", fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                              {activeHoverData.disbursals}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, display: "block", mb: 0.5 }}>
                              HAPPY CLIENTS
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                              {activeHoverData.clients}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ mt: 1.5 }}>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, display: "block", mb: 0.5 }}>
                              APPROVAL RATE
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: "#10b981", fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                              {activeHoverData.rating}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ mt: 1.5 }}>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, display: "block", mb: 0.5 }}>
                              MAJOR HUB
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 750, color: "#334155", fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
                              {activeHoverData.hub}
                            </Typography>
                          </Grid>
                        </Grid>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: "12px",
                              bgcolor: "rgba(50, 68, 230, 0.1)",
                              color: "#3244e6",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TrendingUp size={24} />
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a" }}>
                              National Summary
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                              {isMobile ? "Select a state above or tap the map to view" : "Hover states on the map to see details"}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography sx={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, mb: 3 }}>
                          F2 Fintech operates a fast, digital loan validation pipeline across India, serving doctors, professionals and business owners .
                        </Typography>

                        <Divider sx={{ mb: 2.5 }} />

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "0.85rem", fontWeight: 750, color: "#475569" }}>
                              Total Disbursals
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: "#3244e6" }}>
                              ₹11,00 Cr+
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "0.85rem", fontWeight: 750, color: "#475569" }}>
                              Happy Customers
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a" }}>
                              11,237
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "0.85rem", fontWeight: 750, color: "#475569" }}>
                              Covered States
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a" }}>
                              28 States
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Side Statistics Indicators (CountUp theme matching list) */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { icon: <Users size={20} />, title: "11,237+ Happy Customers", desc: "Digital verification pipeline guarantees swift process.", color: "#10b981", bg: "rgba(16, 185, 129, 0.08)" },
                  { icon: <Award size={20} />, title: "40+ Premier Lending Partners", desc: "Direct linked with leading banks and NBFCs.", color: "#3244e6", bg: "rgba(50, 68, 230, 0.08)" },
                  { icon: <ShieldCheck size={20} />, title: "28 States Disbursed", desc: "Serving Tier-1, Tier-2, and Tier-3 hubs across India.", color: "#ec4899", bg: "rgba(236, 72, 153, 0.08)" }
                ].map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      p: 2.5,
                      bgcolor: "#ffffff",
                      borderRadius: "16px",
                      border: "1px solid rgba(0, 0, 0, 0.04)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.01)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        bgcolor: item.bg,
                        color: item.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem", mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: "#64748b", fontSize: "0.82rem", lineHeight: 1.4 }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

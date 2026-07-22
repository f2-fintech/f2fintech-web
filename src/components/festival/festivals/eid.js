/**
 * Eid — Professional Config for F2 Fintech
 * ● CSS crescent moon (top-right corner, glowing gold)
 * ● Gold ✦ star accents at fixed positions with gentle twinkle
 * ● No falling elements — purely ambient, elegant
 */
const eid = {
  id: "eid",
  label: "Eid Mubarak",
  banner: {
    text: "🌙 Eid Mubarak! ⭐",
    subtext: "Wishing you peace, happiness, and prosperity on this blessed day!",
    gradient: "linear-gradient(135deg, #0b3014, #1b5e20, #004d40, #2e7d32)",
  },
  // No spawnInterval — Eid uses only fixed ambient elements
  cssVars: {
    "--festival-accent-1": "#2ECC71",
    "--festival-accent-2": "#D4AF37",
    "--festival-accent-3": "#1ABC9C",
  },
};

export default eid;

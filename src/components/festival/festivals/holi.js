/**
 * Holi — Professional Config for F2 Fintech
 * ● Large, blurred color ink-splash circles (no emojis)
 * ● Deep, saturated professional color palette
 * ● Very few elements — elegant drift, not cartoon rain
 */
const holi = {
  id: "holi",
  label: "Happy Holi",
  banner: {
    text: "✦ Happy Holi ✦",
    subtext: "May the vibrant spirit of Holi bring joy, color and prosperity to your life",
    gradient: "linear-gradient(135deg, #1a0030 0%, #0d1a50 35%, #003320 65%, #1a0a00 100%)",
  },
  spawnInterval: 4000, // new splash every 4s — slow, elegant
  cssVars: {
    "--festival-accent-1": "#C62828",
    "--festival-accent-2": "#1565C0",
    "--festival-accent-3": "#E65100",
  },
};

export default holi;

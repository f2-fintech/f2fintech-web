/**
 * Diwali — Professional Config for F2 Fintech
 * ● CSS diya shapes with animated flame — positioned like a real Diwali decoration
 * ● Geometric firework bursts (CSS line-based, not emoji)
 * ● Warm gold & amber palette
 */
const diwali = {
  id: "diwali",
  label: "Happy Diwali",
  banner: {
    text: "🪔 Happy Diwali! 🪔",
    subtext: "May the light of Diwali fill your life with happiness & success!",
    gradient: "linear-gradient(135deg, #c0392b, #d35400, #f39c12, #8e44ad)",
  },
  fireworkInterval: 4500, // new burst every 4.5s — purposeful, not noisy
  cssVars: {
    "--festival-accent-1": "#f39c12",
    "--festival-accent-2": "#e67e22",
    "--festival-accent-3": "#8e44ad",
  },
};

export default diwali;

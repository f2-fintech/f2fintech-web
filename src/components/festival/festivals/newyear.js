/**
 * New Year — Professional Config for F2 Fintech
 * ● Metallic confetti — gold, silver, rose gold only (no random colors)
 * ● Occasional geometric firework accents
 * ● Premium, champagne-celebration aesthetic
 */
const newyear = {
  id: "newyear",
  label: "Happy New Year",
  banner: {
    text: "✦ Happy New Year ✦",
    subtext: "Wishing you growth, prosperity and new milestones in the year ahead",
    gradient: "linear-gradient(135deg, #050510 0%, #0e0e28 45%, #050510 100%)",
  },
  spawnInterval: 3000, // 3 confetti pieces every 3s
  fireworkInterval: 6000, // firework burst every 6s
  cssVars: {
    "--festival-accent-1": "#FFD700",
    "--festival-accent-2": "#C0C0C0",
    "--festival-accent-3": "#B76E79",
  },
};

export default newyear;

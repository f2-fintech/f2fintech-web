/**
 * Christmas — Professional Config for F2 Fintech
 * ● Elegant white snowflakes (CSS ❄ ❅ ❆ symbols, not emoji)
 * ● Santa + three reindeer silhouette gliding across every 18s
 * ● Very low density — brand-appropriate
 */
const christmas = {
  id: "christmas",
  label: "Merry Christmas",
  banner: {
    text: "🎄 Merry Christmas! 🎅",
    subtext: "May your Christmas be filled with joy, warmth & endless blessings!",
    gradient: "linear-gradient(135deg, #1a472a, #2d6a4f, #c0392b, #e74c3c)",
  },
  snowflakeCount: 12,    // initial pool — gentle, not overwhelming
  spawnInterval: 3500,  // new snowflake every 3.5s
  santaInterval: 18000, // Santa traversal every 18s
  cssVars: {
    "--festival-accent-1": "#c0392b",
    "--festival-accent-2": "#1a472a",
    "--festival-accent-3": "#d4af37",
  },
};

export default christmas;

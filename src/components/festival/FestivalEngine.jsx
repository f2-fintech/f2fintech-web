/**
 * FestivalEngine.jsx — Professional Edition
 * ==========================================
 * Premium, brand-appropriate festival overlays for F2 Fintech.
 *
 * Design Principles:
 *  • No scattered emoji particles — CSS-crafted shapes only
 *  • Low density — never distracting from the brand
 *  • Elegant, slow-moving animations (8–25 second durations)
 *  • Fixed overlay with pointer-events: none — zero interaction interference
 *
 * To activate: edit src/config/festivalConfig.js → ACTIVE_FESTIVAL
 */

import { useEffect, useRef } from "react";
import "./FestivalEngine.css";
import { ACTIVE_FESTIVAL } from "../../config/festivalConfig";

import holi         from "./festivals/holi";
import christmas    from "./festivals/christmas";
import diwali       from "./festivals/diwali";
import newyear      from "./festivals/newyear";
import eid          from "./festivals/eid";
import independence from "./festivals/independence";

const FESTIVAL_MAP = { holi, christmas, diwali, newyear, eid, independence };

// ── Utilities ────────────────────────────────────────────────────────────────
const rand    = (min, max)      => Math.random() * (max - min) + min;
const randInt = (min, max)      => Math.floor(rand(min, max + 1));
const pick    = (arr)           => arr[randInt(0, arr.length - 1)];
const css     = (obj)           => Object.entries(obj).map(([k, v]) => `${k}:${v}`).join(";");
const applyCssVars  = (vars={}) => Object.entries(vars).forEach(([k,v]) => document.documentElement.style.setProperty(k,v));
const removeCssVars = (vars={}) => Object.keys(vars).forEach(k => document.documentElement.style.removeProperty(k));

// ══════════════════════════════════════════════════════════════════════════════
// CHRISTMAS — White snowflakes + Premium Santa Sleigh & Cart
// ══════════════════════════════════════════════════════════════════════════════
const SNOW_CHARS = ["❄", "❅", "❆"];

function spawnSnowflake(container) {
  const el = document.createElement("span");
  el.className = "festival-snowflake";
  el.textContent = pick(SNOW_CHARS);
  const duration = rand(12000, 22000);
  el.style.cssText = css({
    left:                `${rand(0, 100)}%`,
    "font-size":         `${rand(10, 20)}px`,
    "animation-duration":`${duration}ms`,
    opacity:             rand(0.22, 0.52),
    "--dx1":        `${rand(-35, 35)}px`,
    "--dx2":        `${rand(-20, 20)}px`,
  });
  container.appendChild(el);
  setTimeout(() => el.remove(), duration + 600);
}

function spawnSantaSleigh(container) {
  const sleigh = document.createElement("div");
  sleigh.className = "festival-santa-scene";
  const duration = rand(15000, 22000);
  
  sleigh.innerHTML = `
    <svg viewBox="0 0 340 90" width="300" height="80">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFEFA6" />
          <stop offset="50%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#917218" />
        </linearGradient>
        <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E74C3C" />
          <stop offset="100%" stop-color="#C0392B" />
        </linearGradient>
      </defs>
      
      <!-- Reindeer 2 (Rudolph - Front) -->
      <g transform="translate(220, 10)">
        <rect x="15" y="32" width="4" height="18" fill="#5c3a1e" rx="1"/>
        <rect x="23" y="30" width="4" height="18" fill="#8e5a30" rx="1"/>
        <rect x="42" y="32" width="4" height="18" fill="#5c3a1e" rx="1"/>
        <rect x="48" y="30" width="4" height="18" fill="#8e5a30" rx="1"/>
        <ellipse cx="32" cy="28" rx="20" ry="10" fill="#8e5a30"/>
        <path d="M42,24 L52,12 L58,15 L48,28 Z" fill="#8e5a30"/>
        <ellipse cx="56" cy="12" rx="7" ry="6" fill="#8e5a30"/>
        <path d="M58,14 L65,14 L62,10 L58,10 Z" fill="#8e5a30"/>
        <circle cx="65" cy="13" r="2.5" fill="#ff0000" filter="drop-shadow(0 0 3px #ff0000)"/>
        <path d="M51,9 L47,5 L50,9 Z" fill="#5c3a1e"/>
        <path d="M52,8 C53,4 51,1 48,0 M52,8 C55,5 58,2 56,0 M51,4 L48,5" stroke="#e6c280" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        <path d="M44,20 L48,24" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/>
        <circle cx="47" cy="23" r="2.5" fill="url(#goldGrad)"/>
      </g>

      <!-- Reindeer 1 (Middle) -->
      <g transform="translate(130, 18)">
        <rect x="15" y="32" width="4" height="18" fill="#5c3a1e" rx="1"/>
        <rect x="23" y="30" width="4" height="18" fill="#8e5a30" rx="1"/>
        <rect x="42" y="32" width="4" height="18" fill="#5c3a1e" rx="1"/>
        <rect x="48" y="30" width="4" height="18" fill="#8e5a30" rx="1"/>
        <ellipse cx="32" cy="28" rx="20" ry="10" fill="#8e5a30"/>
        <path d="M42,24 L52,12 L58,15 L48,28 Z" fill="#8e5a30"/>
        <ellipse cx="56" cy="12" rx="7" ry="6" fill="#8e5a30"/>
        <path d="M58,14 L64,14 L62,10 L58,10 Z" fill="#8e5a30"/>
        <circle cx="64" cy="12" r="1.5" fill="#000000"/>
        <path d="M51,9 L47,5 L50,9 Z" fill="#5c3a1e"/>
        <path d="M52,8 C53,4 51,1 48,0 M52,8 C55,5 58,2 56,0 M51,4 L48,5" stroke="#e6c280" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        <path d="M44,20 L48,24" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/>
        <circle cx="47" cy="23" r="2.5" fill="url(#goldGrad)"/>
      </g>

      <!-- Connection Reins -->
      <path d="M70,52 Q130,58 190,44 T270,30" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.6"/>

      <!-- Sleigh -->
      <g transform="translate(10, 15)">
        <path d="M5,52 L85,52 C100,52 105,42 105,32 M92,52 C98,52 105,47 105,44" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M5,52 C-5,52 -8,44 0,38" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <line x1="25" y1="46" x2="25" y2="52" stroke="url(#goldGrad)" stroke-width="3"/>
        <line x1="75" y1="46" x2="75" y2="52" stroke="url(#goldGrad)" stroke-width="3"/>
        <path d="M10,22 C5,22 0,27 0,36 C0,45 10,47 30,47 L80,47 C88,47 94,38 94,28 C94,24 88,22 80,22 Z" fill="url(#redGrad)"/>
        <path d="M10,22 C5,22 0,27 0,36 C0,45 10,47 30,47 L80,47 C88,47 94,38 94,28" stroke="url(#goldGrad)" stroke-width="2" fill="none"/>
        <path d="M22,25 L45,25 L45,35 L20,35 Z" fill="#27ae60"/>

        <!-- Toy Sack -->
        <g transform="translate(56, 12)">
          <path d="M10,15 C5,15 0,20 0,26 C0,33 10,35 18,32 C22,26 22,15 10,15 Z" fill="#a0522d"/>
          <path d="M5,17 Q10,15 12,18" stroke="#f1c40f" stroke-width="2" fill="none"/>
          <rect x="3" y="8" width="10" height="10" fill="#f1c40f" rx="1"/>
          <rect x="7" y="8" width="2" height="10" fill="#e74c3c"/>
        </g>

        <!-- Detailed Santa Claus -->
        <g transform="translate(20, 2)">
          <path d="M12,14 C10,14 7,17 7,21 C7,25 12,30 16,26 C20,30 25,25 25,21 C25,17 22,14 20,14 Z" fill="#ffffff"/>
          <circle cx="16" cy="15" r="6.5" fill="#ffdbac"/>
          <circle cx="12" cy="16" r="1.5" fill="#ff7f7f" opacity="0.6"/>
          <circle cx="20" cy="16" r="1.5" fill="#ff7f7f" opacity="0.6"/>
          <circle cx="13.5" cy="13.5" r="1" fill="#000000"/>
          <circle cx="18.5" cy="13.5" r="1" fill="#000000"/>
          <path d="M11,18 Q16,20 21,18 Q16,17 11,18 Z" fill="#ffffff"/>
          <path d="M10.5,12 C10.5,8 21.5,8 21.5,12 Z" fill="#ffffff"/>
          <path d="M12.5,9 L16,1 L22,6 Z" fill="#e74c3c"/>
          <circle cx="22" cy="6" r="2.5" fill="#ffffff"/>
          <path d="M4,24 C4,24 16,22 28,24 L30,36 L2,36 Z" fill="#e74c3c"/>
          <rect x="14" y="24" width="4" height="12" fill="#ffffff"/>
          <rect x="2.5" y="30" width="27" height="3" fill="#111111"/>
          <rect x="13.5" y="28.5" width="6" height="6" fill="url(#goldGrad)" rx="0.5"/>
          <rect x="15" y="30" width="3" height="3" fill="#111111"/>
          <path d="M22,26 Q28,26 31,30" stroke="#e74c3c" stroke-width="4.5" stroke-linecap="round" fill="none"/>
          <circle cx="31" cy="30" r="2.5" fill="#ffffff"/>
        </g>
      </g>
    </svg>
  `;
  sleigh.style.cssText = css({
    top:                 `${rand(12, 28)}%`,
    "animation-duration":`${duration}ms`,
  });
  container.appendChild(sleigh);
  setTimeout(() => sleigh.remove(), duration + 1000);
}

const GIFT_COLORS = [
  { lid: "#e74c3c", body: "#c0392b", bow: "#ffffff" }, // Red gift with white bow
  { lid: "#2ecc71", body: "#27ae60", bow: "#f1c40f" }, // Green gift with gold bow
  { lid: "#3498db", body: "#2980b9", bow: "#ffffff" }, // Blue gift with white bow
  { lid: "#f1c40f", body: "#d35400", bow: "#e74c3c" }, // Gold gift with red bow
  { lid: "#9b59b6", body: "#8e44ad", bow: "#f1c40f" }  // Purple gift with gold bow
];

function spawnChristmasGift(container) {
  const el = document.createElement("div");
  el.className = "festival-christmas-gift";
  const duration = rand(8000, 15000);
  const theme = pick(GIFT_COLORS);
  const size = rand(22, 32); // Slightly larger for better visibility
  el.style.cssText = css({
    left:                `${rand(0, 100)}%`,
    width:               `${size}px`,
    height:              `${size}px`,
    "animation-duration":`${duration}ms`,
  });

  el.innerHTML = `
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <!-- Bow loop left -->
      <path d="M14,11 C10,5 15,3 18,9 C20,9 20,11 18,11 Z" fill="${theme.bow}" stroke="${theme.body}" stroke-width="0.5"/>
      <!-- Bow loop right -->
      <path d="M26,11 C30,5 25,3 22,9 C20,9 20,11 22,11 Z" fill="${theme.bow}" stroke="${theme.body}" stroke-width="0.5"/>
      <!-- Bow center knot -->
      <circle cx="20" cy="10.5" r="2.5" fill="${theme.bow}" stroke="${theme.body}" stroke-width="0.5"/>
      <!-- Gift box lid -->
      <rect x="6" y="11" width="28" height="6" fill="${theme.lid}" rx="1"/>
      <!-- Gift box body -->
      <rect x="8" y="17" width="24" height="18" fill="${theme.body}" rx="1"/>
      <!-- Ribbon vertical -->
      <rect x="18" y="11" width="4" height="24" fill="${theme.bow}"/>
      <!-- Ribbon horizontal -->
      <rect x="8" y="23" width="24" height="4" fill="${theme.bow}"/>
      <!-- Lid shadow on body -->
      <rect x="8" y="17" width="24" height="2" fill="#000000" opacity="0.18"/>
    </svg>
  `;
  container.appendChild(el);
  setTimeout(() => el.remove(), duration + 500);
}

// ══════════════════════════════════════════════════════════════════════════════
// DIWALI — Premium SVG Diyas + Rockets that explode
// ══════════════════════════════════════════════════════════════════════════════
const FIREWORK_COLORS = [
  "#f39c12", "#e67e22", "#e74c3c", "#8e44ad",
  "#f1c40f", "#1abc9c", "#FF6B6B", "#3498db",
];

function createDiyas(container) {
  [
    { bottom: "15px", left:  "4%"  },
    { bottom: "15px", left:  "12%" },
    { bottom: "15px", right: "4%"  },
    { bottom: "15px", right: "12%" },
  ].forEach((pos) => {
    const el = document.createElement("div");
    el.className = "festival-diya";
    el.style.cssText = css(pos);
    el.innerHTML = `
      <svg viewBox="0 0 60 50" width="48" height="40">
        <defs>
          <linearGradient id="diyaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f39c12"/>
            <stop offset="100%" stop-color="#d35400"/>
          </linearGradient>
          <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="35%" stop-color="#f1c40f"/>
            <stop offset="100%" stop-color="#e67e22"/>
          </linearGradient>
        </defs>
        <!-- Flame -->
        <path class="diya-flame" d="M30,5 C33,16 38,24 30,30 C22,24 27,16 30,5 Z" fill="url(#flameGrad)" />
        <!-- Diya Bowl -->
        <path d="M5,27 C5,27 0,38 15,48 C30,55 45,48 45,48 C60,38 55,27 55,27 C55,27 45,30 30,30 C15,30 5,27 5,27 Z" fill="url(#diyaGrad)"/>
      </svg>
    `;
    container.appendChild(el);
  });
}

function spawnDiwaliRocket(container) {
  const rocket = document.createElement("div");
  rocket.className = "festival-diwali-rocket";
  const startX = rand(15, 85);
  const riseHeight = rand(45, 75);
  const duration = rand(900, 1400);

  rocket.style.cssText = css({
    left: `${startX}%`,
    bottom: `0px`,
    "--rocket-rise": `-${riseHeight}vh`,
    "animation-duration": `${duration}ms`,
  });

  rocket.innerHTML = `
    <svg viewBox="0 0 20 60" width="16" height="48">
      <!-- Stick -->
      <line x1="10" y1="30" x2="10" y2="60" stroke="#d4af37" stroke-width="1.5"/>
      <!-- Rocket Body -->
      <rect x="6" y="12" width="8" height="22" fill="#c0392b" rx="1"/>
      <rect x="8" y="14" width="4" height="18" fill="#ffffff" opacity="0.3"/>
      <!-- Nose cone -->
      <polygon points="10,0 5,12 15,12" fill="#f1c40f"/>
      <!-- Spark tail -->
      <path d="M10,34 Q8,40 10,48 T10,58" stroke="#f39c12" stroke-width="2.5" fill="none" opacity="0.9"/>
    </svg>
  `;

  container.appendChild(rocket);

  // Trigger firework explosion at the apex of launch
  setTimeout(() => {
    const rect = rocket.getBoundingClientRect();
    rocket.remove();
    explodeFirework(container, rect.left, rect.top);
  }, duration);
}

function explodeFirework(container, xPx, yPx) {
  const c1 = pick(FIREWORK_COLORS);
  const c2 = pick(FIREWORK_COLORS);
  const sparkCount = randInt(12, 18);

  const wrapper = document.createElement("div");
  wrapper.className = "festival-fw-wrapper";
  wrapper.style.cssText = css({ left: `${xPx}px`, top: `${yPx}px` });

  // Explosion flash
  const flash = document.createElement("div");
  flash.style.cssText = `
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffffff 10%, ${c1} 60%, transparent 100%);
    animation: festival-flash 450ms ease-out forwards;
    transform: translate(-50%, -50%);
  `;
  wrapper.appendChild(flash);

  // Sparks lines
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement("div");
    spark.className = "festival-fw-line";
    const len = rand(35, 75);
    spark.style.cssText = css({
      transform:           `rotate(${(360 / sparkCount) * i}deg)`,
      background:          `linear-gradient(to top, ${c1}, ${c2})`,
      "--fw-len":          `${len}px`,
      "animation-duration":`${rand(800, 1200)}ms`,
    });
    wrapper.appendChild(spark);
  }

  container.appendChild(wrapper);
  setTimeout(() => wrapper.remove(), 1400);
}

// ══════════════════════════════════════════════════════════════════════════════
// HOLI — High-Quality SVG Color Splat Splashes
// ══════════════════════════════════════════════════════════════════════════════
const HOLI_COLORS = [
  "#d32f2f", // Red
  "#1976d2", // Blue
  "#388e3c", // Green
  "#f57c00", // Orange
  "#7b1fa2", // Purple
  "#00796b", // Teal
  "#c2185b", // Pink
];

const HOLI_SPLATS = [
  "M25,50 C20,35 10,40 5,30 C0,20 15,10 25,15 C35,5 40,20 50,15 C60,10 70,25 75,35 C80,45 65,55 55,50 C45,65 30,60 25,50 Z",
  "M30,40 C15,35 12,20 20,10 C28,0 45,5 50,18 C55,10 70,12 72,25 C74,38 60,42 55,50 C50,58 35,55 30,40 Z",
  "M40,30 C30,15 15,18 20,30 C25,42 10,50 25,58 C40,66 50,50 60,55 C70,60 80,45 75,35 C70,25 55,20 40,30 Z"
];

function spawnHoliSplash(container) {
  const el = document.createElement("div");
  el.className = "festival-holi-blob";
  const color = pick(HOLI_COLORS);
  const size  = rand(80, 130);
  const duration = rand(3000, 4500);
  const top = rand(22, 78);
  const left = rand(15, 85);

  el.style.cssText = css({
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}px`,
    height: `${size}px`,
    animation: `festival-holi-burst 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, festival-holi-fade 1.8s ease-in 1.4s forwards`
  });

  const path = pick(HOLI_SPLATS);
  el.innerHTML = `
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="${path}" fill="${color}" opacity="0.8" />
      <circle cx="12" cy="22" r="4" fill="${color}" opacity="0.75" />
      <circle cx="82" cy="28" r="3.5" fill="${color}" opacity="0.75" />
      <circle cx="78" cy="78" r="5" fill="${color}" opacity="0.75" />
      <circle cx="18" cy="74" r="3" fill="${color}" opacity="0.75" />
    </svg>
  `;

  container.appendChild(el);
  setTimeout(() => el.remove(), duration);
}

// ══════════════════════════════════════════════════════════════════════════════
// NEW YEAR — Metallic confetti (gold / silver / rose gold) + fireworks
// ══════════════════════════════════════════════════════════════════════════════
const NYE_COLORS = ["#FFD700", "#C0C0C0", "#B76E79", "#D4AF37", "#A8A9AD", "#E8C060"];

function spawnConfetti(container) {
  const el = document.createElement("div");
  el.className = "festival-confetti-piece";
  const color    = pick(NYE_COLORS);
  const duration = rand(7000, 12000);
  const delay    = rand(0, 1200);
  el.style.cssText = css({
    left:                `${rand(0, 100)}%`,
    width:               `${rand(4, 7)}px`,
    height:              `${rand(10, 18)}px`,
    background:          color,
    transform:           `rotate(${rand(-50, 50)}deg)`,
    "animation-duration":`${duration}ms`,
    "animation-delay":   `${delay}ms`,
    opacity:             0.88,
    "box-shadow":        `0 0 3px ${color}88`,
  });
  container.appendChild(el);
  setTimeout(() => el.remove(), duration + delay + 300);
}

// ══════════════════════════════════════════════════════════════════════════════
// EID — Beautiful detailed SVG Crescent Moon + Swinging Side Lanterns + Stars
// ══════════════════════════════════════════════════════════════════════════════
function createEidAccents(container) {
  const moon = document.createElement("div");
  moon.className = "festival-eid-moon";
  moon.innerHTML = `
    <svg viewBox="0 0 120 120" width="110" height="110">
      <defs>
        <linearGradient id="eidGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFEFA6" />
          <stop offset="50%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#917218" />
        </linearGradient>
        <filter id="eidGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <!-- Elegant Crescent Moon -->
      <path d="M85,25 C58,25 32,48 32,80 C32,103 48,118 68,118 C50,108 42,90 45,71 C48,51 66,35 85,33 C82,29 87,26 85,25 Z" fill="url(#eidGold)" filter="url(#eidGlow)"/>
      <!-- Detailed Islamic Star -->
      <polygon points="56,52 59,58 65,59 60,64 61,70 56,66 51,70 52,64 47,59 53,58" fill="url(#eidGold)"/>
      <!-- Hanging Mini Lantern -->
      <line x1="85" y1="25" x2="85" y2="46" stroke="#D4AF37" stroke-width="1.2" stroke-dasharray="2,2"/>
      <g transform="translate(78, 46)">
        <path d="M7,0 L0,4 L0,13 L7,17 L14,13 L14,4 Z" fill="url(#eidGold)"/>
        <path d="M0,4 C0,0 14,0 14,4 Z" fill="#FFEFA6"/>
        <line x1="7" y1="17" x2="7" y2="24" stroke="#D4AF37" stroke-width="1.5"/>
      </g>
    </svg>
  `;
  container.appendChild(moon);

  // Swaying decorative side lanterns
  [
    { top: "0px", left: "6%" },
    { top: "0px", right: "20%" },
  ].forEach((pos) => {
    const hanging = document.createElement("div");
    hanging.className = "festival-lantern";
    hanging.style.cssText = css({
      ...pos,
      position: "fixed",
      "transform-origin": "top center",
      animation: "festival-lantern-sway 3s ease-in-out infinite alternate"
    });
    hanging.innerHTML = `
      <svg viewBox="0 0 40 160" width="32" height="128">
        <line x1="20" y1="0" x2="20" y2="80" stroke="#D4AF37" stroke-width="1.5"/>
        <g transform="translate(10, 80)">
          <path d="M10,0 C0,0 20,0 10,-10 Z" fill="#D4AF37"/>
          <path d="M0,0 L20,0 L16,12 L4,12 Z" fill="#FFEFA6" opacity="0.95"/>
          <rect x="2" y="12" width="16" height="28" fill="url(#eidGold)" rx="2"/>
          <circle cx="10" cy="26" r="4.5" fill="#ffffff" filter="url(#eidGlow)"/>
          <path d="M4,40 L16,40 L10,48 Z" fill="#D4AF37"/>
          <line x1="10" y1="48" x2="10" y2="62" stroke="#D4AF37" stroke-width="2"/>
        </g>
      </svg>
    `;
    container.appendChild(hanging);
  });

  // Twinkling gold stars
  [
    { top: "18%", left: "12%" },
    { top: "28%", right: "10%" },
    { top: "14%", left: "46%" },
    { top: "34%", left: "66%" },
    { top: "26%", left: "28%" }
  ].forEach((pos, i) => {
    const star = document.createElement("div");
    star.className = "festival-eid-star";
    star.style.cssText = css({
      ...pos,
      "animation-delay": `${i * 380}ms`
    });
    star.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path d="M12,0 L14.5,8.5 L23,11 L14.5,13.5 L12,22 L9.5,13.5 L1,11 L9.5,8.5 Z" fill="#FFEFA6" filter="url(#eidGlow)"/>
      </svg>
    `;
    container.appendChild(star);
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// INDEPENDENCE DAY — Detailed Waving Flag SVG + Petals
// ══════════════════════════════════════════════════════════════════════════════
const TIRANGA = ["#FF9933", "#ffffff", "#138808"];

function createIndianFlag(container) {
  const flag = document.createElement("div");
  flag.className = "festival-flag-container";
  flag.innerHTML = `
    <svg viewBox="0 0 160 120" width="105" height="78">
      <!-- Flag pole -->
      <line x1="20" y1="12" x2="20" y2="108" stroke="#bbbbbb" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="20" cy="12" r="4.5" fill="#FFD700"/>
      <!-- Flag cloth -->
      <g class="festival-flag-cloth">
        <!-- Saffron -->
        <path d="M22,18 C40,15 60,21 80,18 C100,15 120,21 138,18 L138,38 C120,41 100,35 80,38 C60,41 40,35 22,38 Z" fill="#FF9933"/>
        <!-- White -->
        <path d="M22,38 C40,35 60,41 80,38 C100,35 120,41 138,38 L138,58 C120,61 100,55 80,58 C60,61 40,55 22,58 Z" fill="#ffffff"/>
        <!-- Green -->
        <path d="M22,58 C40,55 60,61 80,58 C100,55 120,61 138,58 L138,78 C120,81 100,75 80,78 C60,81 40,75 22,78 Z" fill="#138808"/>
        <!-- Ashoka Chakra (Blue) -->
        <circle cx="80" cy="48" r="7.5" stroke="#000080" stroke-width="1.2" fill="none"/>
        <circle cx="80" cy="48" r="1.5" fill="#000080"/>
        <!-- spokes -->
        <path d="M80,40.5 L80,55.5 M72.5,48 L87.5,48 M74.5,42.5 L85.5,53.5 M74.5,53.5 L85.5,42.5" stroke="#000080" stroke-width="0.8"/>
      </g>
    </svg>
  `;
  container.appendChild(flag);
}

function spawnPetal(container) {
  const el    = document.createElement("div");
  el.className = "festival-tiranga-petal";
  const color    = pick(TIRANGA);
  const isWhite  = color === "#ffffff";
  const w        = rand(12, 18);
  const h        = rand(6, 9);
  const duration = rand(9500, 14500);
  const delay    = rand(0, 1800);
  el.style.cssText = css({
    left:                `${rand(0, 100)}%`,
    width:               `${w}px`,
    height:              `${h}px`,
    background:          isWhite ? "rgba(255,255,255,0.65)" : color,
    opacity:             isWhite ? 0.65 : 0.8,
    "--dx":         `${rand(-45, 45)}px`,
    "animation-duration":`${duration}ms`,
    "animation-delay":   `${delay}ms`,
    "box-shadow":        `0 1px 3px rgba(0,0,0,0.06)`,
  });
  container.appendChild(el);
  setTimeout(() => el.remove(), duration + delay + 500);
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function FestivalEngine() {
  const overlayRef   = useRef(null);
  const intervalsRef = useRef([]);
  const timeoutsRef  = useRef([]);

  const config = FESTIVAL_MAP[ACTIVE_FESTIVAL];

  useEffect(() => {
    if (!config) return;
    const container = overlayRef.current;
    if (!container) return;

    applyCssVars(config.cssVars);

    const addTimeout  = (fn, ms) => { const id = setTimeout(fn, ms);  timeoutsRef.current.push(id); };
    const addInterval = (fn, ms) => { const id = setInterval(fn, ms); intervalsRef.current.push(id); };

    // ── Christmas ─────────────────────────────────────────────────────────
    if (config.id === "christmas") {
      // Gentle initial snowflake pool
      for (let i = 0; i < (config.snowflakeCount || 12); i++) {
        addTimeout(() => spawnSnowflake(container), rand(0, 10000));
      }
      addInterval(() => spawnSnowflake(container), config.spawnInterval || 3500);

      // Falling gifts
      for (let i = 0; i < 4; i++) {
        addTimeout(() => spawnChristmasGift(container), rand(500, 8000));
      }
      addInterval(() => spawnChristmasGift(container), 2500);

      // Santa — first pass after 1.5s, repeat every 12 seconds (frequent and visible!)
      addTimeout(() => spawnSantaSleigh(container), 1500);
      addInterval(() => spawnSantaSleigh(container), 12000);
    }

    // ── Diwali ────────────────────────────────────────────────────────────
    if (config.id === "diwali") {
      createDiyas(container);
      addTimeout(() => spawnDiwaliRocket(container), 1500);
      addTimeout(() => spawnDiwaliRocket(container), 3500);
      addInterval(() => spawnDiwaliRocket(container), config.fireworkInterval || 5000);
    }

    // ── Holi ──────────────────────────────────────────────────────────────
    if (config.id === "holi") {
      for (let i = 0; i < 3; i++) {
        addTimeout(() => spawnHoliSplash(container), rand(500, 4000));
      }
      addInterval(() => spawnHoliSplash(container), config.spawnInterval || 4000);
    }

    // ── New Year ──────────────────────────────────────────────────────────
    if (config.id === "newyear") {
      // Initial metallic confetti burst
      for (let i = 0; i < 10; i++) {
        addTimeout(() => spawnConfetti(container), rand(0, 2500));
      }
      addInterval(() => {
        spawnConfetti(container);
        spawnConfetti(container);
        spawnConfetti(container);
      }, config.spawnInterval || 3000);
      // Occasional rocket/firework accents
      addTimeout(() => spawnDiwaliRocket(container), 2000);
      addInterval(() => spawnDiwaliRocket(container), config.fireworkInterval || 6000);
    }

    // ── Eid ───────────────────────────────────────────────────────────────
    if (config.id === "eid") {
      createEidAccents(container);
      // No periodic spawning — Eid is all fixed ambient elements
    }

    // ── Independence Day ──────────────────────────────────────────────────
    if (config.id === "independence") {
      createIndianFlag(container);
      for (let i = 0; i < 8; i++) {
        addTimeout(() => spawnPetal(container), rand(0, 4000));
      }
      addInterval(() => {
        spawnPetal(container);
        spawnPetal(container);
      }, config.spawnInterval || 3500);
    }

    return () => {
      intervalsRef.current.forEach(clearInterval);
      timeoutsRef.current.forEach(clearTimeout);
      intervalsRef.current = [];
      timeoutsRef.current  = [];
      removeCssVars(config.cssVars);
    };
  }, [config]);

  if (!config) return null;

  return (
    <>
      {/* Professional banner — slides in, auto-fades after 8s */}
      <div
        className="festival-banner"
        style={{ background: config.banner.gradient }}
        role="banner"
        aria-label={config.label}
      >
        <p className="festival-banner-text">{config.banner.text}</p>
        <p className="festival-banner-sub">{config.banner.subtext}</p>
      </div>

      {/* Floating element canvas */}
      <div ref={overlayRef} className="festival-overlay" aria-hidden="true" />
    </>
  );
}

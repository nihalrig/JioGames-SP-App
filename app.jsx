const { useState, useEffect, useRef, useCallback } = React;

// ─── Premium Design Tokens ───
const C = {
  bg: "#06060a",
  bgElevated: "#0b0b12",
  card: "#0f0f18",
  cardHover: "#141420",
  surface: "#12121c",
  surfaceLight: "#1a1a28",
  glass: "rgba(15,15,24,0.72)",
  glassBorder: "rgba(255,255,255,0.06)",
  jioBlue: "#3535f3",
  jioBlueGlow: "rgba(53,53,243,0.2)",
  accent: "#00e676",
  accentGlow: "rgba(0,230,118,0.15)",
  accentMuted: "#00c853",
  gold: "#c9a84c",
  goldGlow: "rgba(201,168,76,0.15)",
  goldMuted: "#a68a3a",
  red: "#ef4444",
  purple: "#8b5cf6",
  cyan: "#22d3ee",
  text: "#eaeaf2",
  textSec: "#8686a0",
  textDim: "#4a4a62",
  textMicro: "#3a3a50",
  border: "rgba(255,255,255,0.04)",
  borderLight: "rgba(255,255,255,0.07)",
  borderAccent: "rgba(255,255,255,0.1)",
  overlay: "rgba(6,6,10,0.85)",
  shadow: "0 8px 32px rgba(0,0,0,0.5)",
  shadowLg: "0 16px 64px rgba(0,0,0,0.6)",
};

const FONT = {
  display: "'Outfit', sans-serif",
  body: "'DM Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ─── Cinematic Game Art Data ───
const GAME_ART = {
  "FC Mobile": { colors: ["#1b5e20", "#004d40", "#00c853"], icon: "⚽", pattern: "sport" },
  "Stardew Valley": { colors: ["#33691e", "#827717", "#c6ff00"], icon: "✦", pattern: "organic" },
  "GTA San Andreas": { colors: ["#e65100", "#bf360c", "#ff6d00"], icon: "★", pattern: "urban" },
  "Dead Cells": { colors: ["#b71c1c", "#880e4f", "#ff1744"], icon: "†", pattern: "sharp" },
  "Minecraft": { colors: ["#1b5e20", "#33691e", "#4caf50"], icon: "◆", pattern: "grid" },
  "Monument Valley": { colors: ["#ad1457", "#6a1b9a", "#ec407a"], icon: "△", pattern: "geo" },
  "Alto's Odyssey": { colors: ["#e64a19", "#ff7043", "#ffab91"], icon: "◇", pattern: "wave" },
  "Balatro": { colors: ["#0d47a1", "#1565c0", "#42a5f5"], icon: "♠", pattern: "sharp" },
  "Vampire Survivors": { colors: ["#4a148c", "#6a1b9a", "#ce93d8"], icon: "✧", pattern: "organic" },
  "Slay the Spire": { colors: ["#1b5e20", "#2e7d32", "#66bb6a"], icon: "▲", pattern: "sharp" },
  "Hades": { colors: ["#bf360c", "#d84315", "#ff7043"], icon: "☉", pattern: "sharp" },
  "Celeste": { colors: ["#01579b", "#0277bd", "#4fc3f7"], icon: "◈", pattern: "geo" },
  "Hollow Knight": { colors: ["#263238", "#37474f", "#78909c"], icon: "◎", pattern: "organic" },
  "Gris": { colors: ["#880e4f", "#c2185b", "#f48fb1"], icon: "◯", pattern: "wave" },
  "Inside": { colors: ["#212121", "#37474f", "#546e7a"], icon: "●", pattern: "urban" },
  "Limbo": { colors: ["#1a1a1a", "#212121", "#424242"], icon: "◐", pattern: "organic" },
  "Ori": { colors: ["#004d40", "#00695c", "#80cbc4"], icon: "✿", pattern: "organic" },
  "Baba Is You": { colors: ["#3e2723", "#4e342e", "#8d6e63"], icon: "□", pattern: "grid" },
  "Halo Infinite": { colors: ["#0d47a1", "#1565c0", "#1e88e5"], icon: "◇", pattern: "sharp" },
  "Forza Horizon 5": { colors: ["#e65100", "#f57c00", "#ffb74d"], icon: "▷", pattern: "wave" },
  "Elden Ring": { colors: ["#f57f17", "#f9a825", "#ffee58"], icon: "◈", pattern: "sharp" },
  "Rise of Tomb Raider": { colors: ["#4e342e", "#6d4c41", "#a1887f"], icon: "▲", pattern: "geo" },
  "Cyberpunk 2077": { colors: ["#f9a825", "#fdd835", "#fff176"], icon: "◆", pattern: "urban" },
  "God of War": { colors: ["#b71c1c", "#c62828", "#ef5350"], icon: "Ω", pattern: "sharp" },
  "Spider-Man": { colors: ["#c62828", "#d32f2f", "#ef5350"], icon: "◈", pattern: "urban" },
  "Hogwarts Legacy": { colors: ["#4a148c", "#6a1b9a", "#ab47bc"], icon: "✧", pattern: "geo" },
  "Hitman": { colors: ["#b71c1c", "#c62828", "#212121"], icon: "◎", pattern: "sharp" },
  "WRC 9": { colors: ["#1b5e20", "#2e7d32", "#4caf50"], icon: "▷", pattern: "wave" },
  "Mafia DE": { colors: ["#e65100", "#bf360c", "#ff8a65"], icon: "★", pattern: "urban" },
  "Sniper GW 3": { colors: ["#1b5e20", "#33691e", "#689f38"], icon: "◎", pattern: "sharp" },
  "Far Cry 3: Blood Dragon": { colors: ["#880e4f", "#ad1457", "#f06292"], icon: "◆", pattern: "urban" },
  "Just Cause 3": { colors: ["#d84315", "#e64a19", "#ff8a65"], icon: "✦", pattern: "sharp" },
  "Sleeping Dogs DE": { colors: ["#37474f", "#455a64", "#78909c"], icon: "龍", pattern: "urban" },
  "Willy Morgan": { colors: ["#1565c0", "#1e88e5", "#64b5f6"], icon: "◇", pattern: "geo" },
  "Emily's Honeymoon": { colors: ["#0097a7", "#00acc1", "#4dd0e1"], icon: "◯", pattern: "wave" },
  "Whispered World": { colors: ["#1b5e20", "#2e7d32", "#81c784"], icon: "✿", pattern: "organic" },
  "Tools Up!": { colors: ["#7b1fa2", "#8e24aa", "#ce93d8"], icon: "◆", pattern: "grid" },
  "In Sound Mind": { colors: ["#4527a0", "#5e35b1", "#9575cd"], icon: "◐", pattern: "organic" },
  "Fruit Ninja": { colors: ["#c62828", "#d32f2f", "#ef5350"], icon: "✦", pattern: "sharp" },
  "Temple Run": { colors: ["#e65100", "#ef6c00", "#ffa726"], icon: "▲", pattern: "geo" },
  "Subway Surfers": { colors: ["#01579b", "#0277bd", "#4fc3f7"], icon: "◇", pattern: "urban" },
  "2048": { colors: ["#e65100", "#f57c00", "#ffb74d"], icon: "□", pattern: "grid" },
  "Snake.io": { colors: ["#1b5e20", "#2e7d32", "#66bb6a"], icon: "◈", pattern: "wave" },
  "Flappy Bird": { colors: ["#33691e", "#558b2f", "#9ccc65"], icon: "◇", pattern: "wave" },
  "Indian Theft Aura Simulator": { colors: ["#b71c1c", "#c62828", "#e53935"], icon: "★", pattern: "urban" },
  "Indian Bikes Driving 3D": { colors: ["#e65100", "#ff8f00", "#ffb300"], icon: "▷", pattern: "wave" },
  "Ludo King": { colors: ["#1565c0", "#1e88e5", "#42a5f5"], icon: "◆", pattern: "grid" },
  "Crossy Road": { colors: ["#558b2f", "#689f38", "#9ccc65"], icon: "◇", pattern: "grid" },
  "Wordle": { colors: ["#37474f", "#455a64", "#607d8b"], icon: "□", pattern: "grid" },
  "Poppy Playtime Ch.1": { colors: ["#0d47a1", "#1565c0", "#42a5f5"], icon: "◎", pattern: "sharp" },
  "Mini Metro": { colors: ["#b71c1c", "#c62828", "#ef5350"], icon: "◯", pattern: "geo" },
  "Papers, Please": { colors: ["#3e2723", "#4e342e", "#795548"], icon: "□", pattern: "grid" },
  "Human Fall Flat": { colors: ["#0277bd", "#0288d1", "#4fc3f7"], icon: "◯", pattern: "wave" },
  "Disney Dreamlight": { colors: ["#4a148c", "#6a1b9a", "#ce93d8"], icon: "✧", pattern: "wave" },
  "Disney Speedstorm": { colors: ["#6a1b9a", "#7b1fa2", "#ba68c8"], icon: "▷", pattern: "wave" },
  "Castle of Illusion": { colors: ["#0d47a1", "#1565c0", "#64b5f6"], icon: "◆", pattern: "geo" },
  "DuckTales": { colors: ["#e65100", "#f57f17", "#fdd835"], icon: "◇", pattern: "wave" },
  "Aladdin": { colors: ["#01579b", "#0277bd", "#4fc3f7"], icon: "✧", pattern: "geo" },
  "The Bunker": { colors: ["#1a1a1a", "#263238", "#455a64"], icon: "◐", pattern: "urban" },
  "Murder on Express": { colors: ["#3e2723", "#5d4037", "#8d6e63"], icon: "◎", pattern: "geo" },
  "Amnesia Rebirth": { colors: ["#0d1b2a", "#1a237e", "#283593"], icon: "◐", pattern: "organic" },
  "Layers of Fear": { colors: ["#1a1a1a", "#3e2723", "#5d4037"], icon: "◯", pattern: "organic" },
  "Memoria": { colors: ["#3e2723", "#5d4037", "#8d6e63"], icon: "◈", pattern: "geo" },
  "Albatroz": { colors: ["#1b5e20", "#2e7d32", "#66bb6a"], icon: "◇", pattern: "organic" },
  "Fallback Uprising": { colors: ["#0d47a1", "#1565c0", "#42a5f5"], icon: "◆", pattern: "sharp" },
  "Rollerdrome": { colors: ["#b71c1c", "#c62828", "#ef5350"], icon: "◎", pattern: "wave" },
  "Dungeons 3": { colors: ["#bf360c", "#d84315", "#ff7043"], icon: "◆", pattern: "sharp" },
  "Vikings: Wolves": { colors: ["#3e2723", "#4e342e", "#795548"], icon: "▲", pattern: "sharp" },
  "Railway Empire": { colors: ["#0d47a1", "#1565c0", "#42a5f5"], icon: "▷", pattern: "geo" },
  "Hitman Absolution": { colors: ["#b71c1c", "#c62828", "#212121"], icon: "◎", pattern: "sharp" },
  "Assassin's Creed": { colors: ["#263238", "#37474f", "#78909c"], icon: "▲", pattern: "sharp" },
};

function getGameArt(title) {
  return GAME_ART[title] || { colors: ["#1a1a28", "#2a2a3a", "#3a3a4a"], icon: "◆", pattern: "geo" };
}

// ─── Data ───
const mobileBanners = [
  { id: 1, title: "FC Mobile", subtitle: "Sports • Multiplayer", rating: "U/A 7+", tagline: "Build Your Ultimate Team", colors: ["#004d40", "#00251a", "#0b0b0f"] },
  { id: 2, title: "Stardew Valley", subtitle: "Simulation • Single Player", rating: "U/A 12+", tagline: "Farm, Forage, and Make Friends", colors: ["#33691e", "#1b3a0a", "#0b0b0f"] },
  { id: 3, title: "GTA San Andreas", subtitle: "Action • Open World", rating: "U/A 18+", tagline: "Return to the Streets of San Andreas", colors: ["#bf360c", "#4e1500", "#0b0b0f"] },
];

const allScreenBanners = [
  { id: 40, title: "Halo Infinite", subtitle: "FPS • Multiplayer", rating: "U/A 16+", tagline: "The Legendary Spartan Returns", colors: ["#0d47a1", "#051e3e", "#0b0b0f"], sentiment: "Very Positive", reviews: "34,567", players: "42.1k" },
  { id: 41, title: "Forza Horizon 5", subtitle: "Racing • Open World", rating: "U/A 7+", tagline: "Your Ultimate Racing Playground", colors: ["#e65100", "#4e1b00", "#0b0b0f"], sentiment: "Overwhelmingly Positive", reviews: "78,234", players: "56.3k" },
  { id: 42, title: "Elden Ring", subtitle: "RPG • Single Player", rating: "U/A 18+", tagline: "Rise, Tarnished. Become the Elden Lord", colors: ["#f57f17", "#4e2800", "#0b0b0f"], sentiment: "Overwhelmingly Positive", reviews: "156,234", players: "89.1k" },
];

const storeItems = [
  { id: 50, title: "FC Mobile Coins", desc: "10,000 Coins Pack", price: "₹499", color: "#1db954", tag: "Popular" },
  { id: 51, title: "GTA Cash Card", desc: "Bull Shark $500K", price: "₹799", color: "#ff6d00", tag: "Best Value" },
  { id: 52, title: "Minecraft Minecoins", desc: "1720 Minecoins", price: "₹599", color: "#4caf50" },
  { id: 53, title: "Dead Cells DLC", desc: "The Bad Seed", price: "₹299", color: "#e53935", tag: "New" },
  { id: 54, title: "Stardew Valley", desc: "Expansion Pass", price: "₹399", color: "#7cb342" },
  { id: 55, title: "Cloud Pro Pass", desc: "1 Month Subscription", price: "₹999", color: "#8b5cf6", tag: "Subscribe" },
];

const storeCoupons = [
  { id: 60, title: "20% OFF", desc: "First Mobile Pro month", code: "MOBILEPRO20", color: C.gold },
  { id: 61, title: "₹100 OFF", desc: "Any store purchase ₹500+", code: "JIO100", color: C.accent },
  { id: 62, title: "Free Trial", desc: "7 days Cloud Pro Pass", code: "CLOUDTRIAL", color: C.cyan },
];

// ─── Store: Brands ───
const storeBrands = [
  { id: "b1", name: "BGMI", icon: "🎯", color: "#ff9800", bg: "#1a1200" },
  { id: "b2", name: "Roblox", icon: "◆", color: "#e53935", bg: "#1a0505" },
  { id: "b3", name: "App Store", icon: "", color: "#0091ea", bg: "#0a1520" },
  { id: "b4", name: "Steam", icon: "◎", color: "#1b2838", bg: "#0d1520" },
  { id: "b5", name: "Google Play", icon: "▶", color: "#4caf50", bg: "#0a1a0a" },
  { id: "b6", name: "PlayStation", icon: "◈", color: "#0070d1", bg: "#001428" },
  { id: "b7", name: "Xbox", icon: "✕", color: "#107c10", bg: "#061a06" },
  { id: "b8", name: "Valorant", icon: "◤", color: "#ff4655", bg: "#1a0508" },
];

// ─── Store: Top-Ups ───
const storeTopUps = [
  { id: "t1", name: "BGMI India", icon: "🎯", color: "#ff9800" },
  { id: "t2", name: "Marvel Rivals", icon: "◆", color: "#e53935" },
  { id: "t3", name: "MOBA Legends", icon: "⚔", color: "#6366f1" },
  { id: "t4", name: "Road to Valor", icon: "⚔", color: "#d84315" },
  { id: "t5", name: "Ludo Club", icon: "🎲", color: "#1e88e5" },
  { id: "t6", name: "AFK Journey", icon: "◎", color: "#7c4dff" },
  { id: "t7", name: "Teen Patti Gold", icon: "♠", color: "#e53935" },
];

// ─── Store: Vouchers ───
const storeVouchers = [
  { id: "v1", name: "Google Play", cat: "platform", icon: "▶", color: "#4caf50", bg: "#fff" },
  { id: "v2", name: "App Store Code", cat: "platform", icon: "", color: "#0091ea", bg: "#e3f2fd" },
  { id: "v3", name: "Steam", cat: "platform", icon: "◎", color: "#1b2838", bg: "#e8eaf6" },
  { id: "v4", name: "PlayStation", cat: "platform", icon: "◈", color: "#0070d1", bg: "#e3f2fd" },
  { id: "v5", name: "Xbox", cat: "platform", icon: "✕", color: "#107c10", bg: "#e8f5e9" },
  { id: "v6", name: "Valorant", cat: "platform", icon: "◤", color: "#ff4655", bg: "#fce4ec" },
  { id: "v7", name: "Pizza Hut", cat: "gift-cards", icon: "🍕", color: "#e53935", discount: "4%" },
  { id: "v8", name: "FC Mobile", cat: "games", icon: "⚽", color: "#1db954" },
  { id: "v9", name: "Rainbow Six", cat: "games", icon: "◎", color: "#2196f3" },
  { id: "v10", name: "McDonald's", cat: "gift-cards", icon: "🍔", color: "#ffc107", discount: "4%" },
  { id: "v11", name: "Baskin Robbins", cat: "gift-cards", icon: "🍦", color: "#e91e63", discount: "4%" },
  { id: "v12", name: "Domino's Pizza", cat: "gift-cards", icon: "🍕", color: "#0d47a1", discount: "4%" },
];

// ─── Store: PC Games ───
const storePCGames = [
  { id: "g1", name: "Skyrim Special Ed.", price: "₹381", original: "₹1,799", discount: "-78%", color: "#546e7a", icon: "⚔" },
  { id: "g2", name: "Doom Eternal", price: "₹380", original: "₹1,799", discount: "-78%", color: "#e53935", icon: "☠" },
  { id: "g3", name: "DOOM Eternal Deluxe", price: "₹677", original: "₹3,199", discount: "-78%", color: "#b71c1c", icon: "☠" },
  { id: "g4", name: "Fallout 76", price: "₹529", original: "₹2,499", discount: "-78%", color: "#ffc107", icon: "☢" },
  { id: "g5", name: "Elder Scrolls Online", price: "₹499", original: "₹1,999", discount: "-75%", color: "#8d6e63", icon: "⚔" },
  { id: "g6", name: "Fallout 3 GOTY", price: "₹264", original: "₹1,199", discount: "-78%", color: "#4caf50", icon: "☢" },
];

// ─── Store: All items for search ───
const ALL_STORE_ITEMS = [
  ...storeBrands.map(b => ({ ...b, storeCategory: "brands", title: b.name })),
  ...storeTopUps.map(t => ({ ...t, storeCategory: "topups", title: t.name })),
  ...storeVouchers.map(v => ({ ...v, storeCategory: "vouchers", title: v.name })),
  ...storePCGames.map(g => ({ ...g, storeCategory: "games", title: g.name })),
];

// ─── Cinematic Game Art Component (BRIGHTER) ───
function CinematicArt({ title, size = "md", style: extraStyle }) {
  const art = getGameArt(title);
  const [c1, c2, c3] = art.colors;

  const patternSvg = {
    sharp: `<line x1="0" y1="100%" x2="100%" y2="0" stroke="${c3}" stroke-width="0.8" opacity="0.25"/>
            <line x1="20%" y1="100%" x2="80%" y2="0" stroke="${c2}" stroke-width="0.5" opacity="0.18"/>`,
    geo: `<polygon points="50,10 90,40 75,85 25,85 10,40" fill="none" stroke="${c3}" stroke-width="0.6" opacity="0.2"/>`,
    organic: `<circle cx="70%" cy="30%" r="25%" fill="none" stroke="${c2}" stroke-width="0.5" opacity="0.18"/>
              <circle cx="30%" cy="75%" r="18%" fill="none" stroke="${c3}" stroke-width="0.4" opacity="0.14"/>`,
    wave: `<path d="M0,60 Q25,30 50,60 T100,60" fill="none" stroke="${c3}" stroke-width="0.6" opacity="0.2"/>`,
    grid: `<line x1="33%" y1="0" x2="33%" y2="100%" stroke="${c3}" stroke-width="0.5" opacity="0.12"/>
           <line x1="66%" y1="0" x2="66%" y2="100%" stroke="${c3}" stroke-width="0.5" opacity="0.12"/>`,
    urban: `<rect x="15%" y="20%" width="30%" height="50%" fill="none" stroke="${c2}" stroke-width="0.5" opacity="0.15" rx="2"/>`,
    sport: `<circle cx="50%" cy="50%" r="20%" fill="none" stroke="${c3}" stroke-width="0.8" opacity="0.18"/>`,
  };

  const iconSize = size === "lg" ? 36 : size === "circle" ? 22 : 28;

  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: `linear-gradient(145deg, ${c1}55 0%, ${C.bg} 55%, ${c2}30 100%)`,
      ...extraStyle,
    }}>
      {/* Ambient glow — boosted */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 60% 20%, ${c1}55 0%, transparent 55%),
                      radial-gradient(ellipse at 30% 80%, ${c2}35 0%, transparent 45%)`,
      }} />
      {/* SVG pattern — boosted opacity */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 100 100" preserveAspectRatio="none"
        dangerouslySetInnerHTML={{ __html: patternSvg[art.pattern] || "" }}
      />
      {/* Accent line */}
      <div style={{
        position: "absolute", top: 0, left: "55%",
        width: 1, height: "120%", transform: "rotate(25deg)", transformOrigin: "top left",
        background: `linear-gradient(180deg, transparent, ${c3}30, transparent)`,
      }} />
      {/* Icon glyph — larger, more visible */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -55%)",
        fontSize: iconSize, opacity: 0.6,
        color: c3, fontWeight: 300,
        filter: `drop-shadow(0 0 20px ${c1}60)`,
        letterSpacing: 2,
      }}>{art.icon}</div>
      {/* Bottom gradient — lighter to show more art */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
        background: `linear-gradient(180deg, transparent 0%, ${C.bg}cc 100%)`,
      }} />
    </div>
  );
}

// ─── Micro Components ───
function SectionTitle({ children, action, onAction }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      padding: "0 20px", marginBottom: 14,
    }}>
      <span style={{
        fontFamily: FONT.display, fontSize: 17, fontWeight: 700,
        color: C.text, letterSpacing: -0.3,
      }}>{children}</span>
      {action && (
        <span onClick={onAction} style={{
          fontFamily: FONT.body, fontSize: 11, fontWeight: 500,
          color: C.textDim, letterSpacing: 0.5, cursor: "pointer",
          textTransform: "uppercase",
        }}>{action} →</span>
      )}
    </div>
  );
}

// ─── Banner Carousel ───
function BannerCarousel({ banners, onGameSelect }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const next = useCallback(() => setActive(p => (p + 1) % banners.length), [banners.length]);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const banner = banners[active];
  const art = getGameArt(banner.title);
  const [c1, c2] = banner.colors || art.colors;

  return (
    <div style={{ position: "relative", marginBottom: 8 }}>
      <div style={{
        height: 440, position: "relative", overflow: "hidden",
        background: C.bg, transition: "background 0.8s ease",
      }}>
        {/* Cinematic gradient — boosted */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 20%, ${c1}70 0%, transparent 55%),
                        radial-gradient(ellipse at 80% 60%, ${c2}45 0%, transparent 45%),
                        linear-gradient(160deg, ${c1}35 0%, ${C.bg} 60%)`,
          transition: "all 0.8s ease",
        }} />
        {/* SVG lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }}
          viewBox="0 0 400 440" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c1} stopOpacity="0"/>
              <stop offset="50%" stopColor={c1} stopOpacity="0.6"/>
              <stop offset="100%" stopColor={c1} stopOpacity="0"/>
            </linearGradient>
          </defs>
          {[80, 160, 240, 320].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="440" stroke="url(#lineGrad)" strokeWidth="0.5"/>
          ))}
        </svg>
        {/* Large glyph — more visible */}
        <div style={{
          position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
          fontSize: 180, opacity: 0.18, color: c1,
          filter: `drop-shadow(0 0 100px ${c1})`,
          transition: "all 0.6s ease", fontWeight: 200,
        }}>{art.icon}</div>
        {/* Bottom gradient */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
          background: `linear-gradient(180deg, transparent 0%, ${C.bg}cc 50%, ${C.bg} 100%)`,
        }} />
        {/* Content */}
        <div style={{
          position: "absolute", bottom: 36, left: 0, right: 0,
          textAlign: "center", padding: "0 30px",
        }}>
          <div style={{
            fontFamily: FONT.display, fontSize: 30, fontWeight: 800,
            color: C.text, letterSpacing: -0.5, lineHeight: 1.1,
          }}>{banner.title}</div>
          <div style={{
            fontFamily: FONT.body, fontSize: 12, color: C.textSec,
            marginTop: 10, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 8, letterSpacing: 0.5,
          }}>
            <span style={{
              padding: "2px 8px", borderRadius: 4,
              background: "rgba(255,255,255,0.06)", fontSize: 10,
              color: C.textDim, fontWeight: 500, letterSpacing: 0.8,
            }}>{banner.rating}</span>
            <span>{banner.subtitle}</span>
          </div>
          <div style={{
            fontFamily: FONT.body, fontSize: 13, color: C.textSec,
            marginTop: 6, fontWeight: 400, letterSpacing: 0.2, opacity: 0.7,
          }}>{banner.tagline}</div>
          <button onClick={() => onGameSelect && onGameSelect(banner)} style={{
            marginTop: 20, padding: "13px 52px", borderRadius: 30,
            border: "none", background: C.accent,
            color: "#000", fontFamily: FONT.display, fontWeight: 700,
            fontSize: 14, letterSpacing: 1, cursor: "pointer",
            boxShadow: `0 4px 24px ${C.accentGlow}, 0 0 0 1px rgba(0,230,118,0.1)`,
            textTransform: "uppercase",
          }}>Play Now</button>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 20 }}>
            {banners.map((_, i) => (
              <span key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 24 : 6, height: 3, borderRadius: 2,
                background: i === active ? C.accent : "rgba(255,255,255,0.15)",
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)", cursor: "pointer",
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Navigation ───
function BottomNav({ active, onNav }) {
  const tabs = [
    { id: "mobile", label: "Mobile", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2.5" strokeLinecap="round"/></svg> },
    { id: "allscreen", label: "All Screen", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
    { id: "store", label: "Store", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
  ];
  return (
    <nav style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: 68, display: "flex", alignItems: "center",
      background: "rgba(6,6,10,0.92)", backdropFilter: "blur(32px) saturate(180%)",
      borderTop: `1px solid ${C.border}`, zIndex: 100, padding: "0 12px",
      borderRadius: "0 0 40px 40px",
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button key={tab.id} onClick={() => onNav(tab.id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 0",
            background: "none", border: "none", cursor: "pointer",
          }}>
            <div style={{ color: isActive ? C.accent : C.textDim, transition: "color 0.25s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>{tab.svg}</div>
            <span style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: isActive ? 600 : 400, color: isActive ? C.text : C.textDim, letterSpacing: 0.4 }}>{tab.label}</span>
            {isActive && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.accent, marginTop: -2, boxShadow: `0 0 8px ${C.accentGlow}` }}/>}
          </button>
        );
      })}
    </nav>
  );
}

// ─── JioGames Logo ───
function JioLogo() {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: `linear-gradient(135deg, ${C.accent} 0%, #00c853 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 2px 12px ${C.accentGlow}`,
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="6" stroke="#000" strokeWidth="2.2"/>
        <circle cx="8.5" cy="12" r="1.5" fill="#000"/><circle cx="15.5" cy="12" r="1.5" fill="#000"/>
        <rect x="0" y="10" width="5" height="4" rx="2" stroke="#000" strokeWidth="1.8" fill="none"/>
        <rect x="19" y="10" width="5" height="4" rx="2" stroke="#000" strokeWidth="1.8" fill="none"/>
      </svg>
    </div>
  );
}

// ─── Searchable Game Index ───
const ALL_GAMES = [
  // Mobile games
  { id: 10, title: "FC Mobile", genre: "Sports", passType: "mobile" },
  { id: 11, title: "Stardew Valley", genre: "Simulation", passType: "mobile" },
  { id: 12, title: "GTA San Andreas", genre: "Action", passType: "mobile" },
  { id: 13, title: "Dead Cells", genre: "Roguelike", passType: "mobile" },
  { id: 14, title: "Minecraft", genre: "Sandbox", passType: "mobile" },
  { id: 15, title: "Monument Valley", genre: "Puzzle", passType: "mobile" },
  { id: 16, title: "Alto's Odyssey", genre: "Runner", passType: "mobile" },
  { id: 100, title: "Balatro", genre: "Roguelike", passType: "mobile" },
  { id: 101, title: "Vampire Survivors", genre: "Action", passType: "mobile" },
  { id: 102, title: "Slay the Spire", genre: "Card Game", passType: "mobile" },
  { id: 103, title: "Hades", genre: "Roguelike", passType: "mobile" },
  { id: 104, title: "Celeste", genre: "Platformer", passType: "mobile" },
  { id: 105, title: "Hollow Knight", genre: "Metroidvania", passType: "mobile" },
  { id: 110, title: "Gris", genre: "Art Platformer", passType: "mobile" },
  { id: 111, title: "Inside", genre: "Puzzle", passType: "mobile" },
  { id: 112, title: "Limbo", genre: "Puzzle", passType: "mobile" },
  { id: 113, title: "Ori", genre: "Platformer", passType: "mobile" },
  { id: 114, title: "Baba Is You", genre: "Puzzle", passType: "mobile" },
  { id: 120, title: "Indian Theft Aura Simulator", genre: "Action", passType: "mobile" },
  { id: 121, title: "Indian Bikes Driving 3D", genre: "Racing", passType: "mobile" },
  { id: 122, title: "Ludo King", genre: "Board", passType: "mobile" },
  { id: 123, title: "Fruit Ninja", genre: "Casual", passType: "mobile" },
  { id: 124, title: "Temple Run", genre: "Runner", passType: "mobile" },
  { id: 125, title: "Subway Surfers", genre: "Runner", passType: "mobile" },
  { id: 126, title: "Crossy Road", genre: "Arcade", passType: "mobile" },
  { id: 127, title: "Wordle", genre: "Word", passType: "mobile" },
  { id: 130, title: "Poppy Playtime Ch.1", genre: "Horror", passType: "mobile" },
  { id: 131, title: "Mini Metro", genre: "Strategy", passType: "mobile" },
  { id: 132, title: "Papers, Please", genre: "Simulation", passType: "mobile" },
  { id: 133, title: "Human Fall Flat", genre: "Puzzle", passType: "mobile" },
  // All Screen games
  { id: 200, title: "Willy Morgan", genre: "Adventure", passType: "allscreen", rating: "U/A 12+", sentiment: "Positive", reviews: "1,245", players: "2.1k" },
  { id: 201, title: "Emily's Honeymoon", genre: "Casual", passType: "allscreen", rating: "U/A 7+", sentiment: "Mostly Positive", reviews: "892", players: "3.4k" },
  { id: 202, title: "Whispered World", genre: "Adventure", passType: "allscreen", rating: "U/A 12+", sentiment: "Very Positive", reviews: "3,456", players: "1.8k" },
  { id: 203, title: "Tools Up!", genre: "Party", passType: "allscreen", rating: "U/A 7+", sentiment: "Positive", reviews: "2,103", players: "5.6k" },
  { id: 204, title: "In Sound Mind", genre: "Horror", passType: "allscreen", rating: "U/A 18+", sentiment: "Very Positive", reviews: "4,521", players: "3.2k" },
  { id: 210, title: "Hitman", genre: "Stealth", passType: "allscreen", rating: "U/A 18+", sentiment: "Very Positive", reviews: "11,234", players: "15.2k" },
  { id: 211, title: "Rise of Tomb Raider", genre: "Adventure", passType: "allscreen", rating: "U/A 16+", sentiment: "Very Positive", reviews: "45,892", players: "22.1k" },
  { id: 212, title: "WRC 9", genre: "Racing", passType: "allscreen", rating: "U/A 7+", sentiment: "Mostly Positive", reviews: "3,678", players: "4.5k" },
  { id: 213, title: "Mafia DE", genre: "Action", passType: "allscreen", rating: "U/A 18+", sentiment: "Very Positive", reviews: "18,923", players: "12.8k" },
  { id: 214, title: "Sniper GW 3", genre: "FPS", passType: "allscreen", rating: "U/A 18+", sentiment: "Mostly Positive", reviews: "8,456", players: "6.3k" },
  { id: 215, title: "Far Cry 3: Blood Dragon", genre: "FPS", passType: "allscreen", rating: "U/A 18+", sentiment: "Overwhelmingly Positive", reviews: "22,134", players: "9.7k" },
  { id: 216, title: "Just Cause 3", genre: "Action", passType: "allscreen", rating: "U/A 16+", sentiment: "Mostly Positive", reviews: "31,567", players: "18.4k" },
  { id: 217, title: "Sleeping Dogs DE", genre: "Action", passType: "allscreen", rating: "U/A 18+", sentiment: "Very Positive", reviews: "24,891", players: "11.2k" },
  { id: 218, title: "Cyberpunk 2077", genre: "RPG", passType: "allscreen", rating: "U/A 18+", sentiment: "Very Positive", reviews: "89,234", players: "45.6k" },
  { id: 219, title: "God of War", genre: "Action", passType: "allscreen", rating: "U/A 18+", sentiment: "Overwhelmingly Positive", reviews: "67,812", players: "38.9k" },
  { id: 230, title: "Hitman Absolution", genre: "Stealth", passType: "allscreen", rating: "U/A 18+", sentiment: "Very Positive", reviews: "11,813", players: "13.4k" },
  { id: 232, title: "The Bunker", genre: "Horror", passType: "allscreen", rating: "U/A 18+", sentiment: "Mostly Positive", reviews: "2,345", players: "1.5k" },
  { id: 233, title: "Assassin's Creed", genre: "Action", passType: "allscreen", rating: "U/A 18+", sentiment: "Very Positive", reviews: "34,567", players: "28.3k" },
  { id: 234, title: "Elden Ring", genre: "RPG", passType: "allscreen", rating: "U/A 18+", sentiment: "Overwhelmingly Positive", reviews: "156,234", players: "89.1k" },
  { id: 240, title: "Far Cry 3: Blood Dragon", genre: "FPS", passType: "allscreen", rating: "U/A 18+", sentiment: "Overwhelmingly Positive", reviews: "22,134", players: "9.7k" },
  { id: 242, title: "Dungeons 3", genre: "Strategy", passType: "allscreen", rating: "U/A 12+", sentiment: "Very Positive", reviews: "5,678", players: "4.1k" },
  { id: 243, title: "Vikings: Wolves", genre: "Action RPG", passType: "allscreen", rating: "U/A 18+", sentiment: "Mostly Positive", reviews: "1,234", players: "2.3k" },
  { id: 244, title: "Railway Empire", genre: "Simulation", passType: "allscreen", rating: "U/A 7+", sentiment: "Very Positive", reviews: "6,789", players: "3.8k" },
  { id: 260, title: "Disney Dreamlight", genre: "Life Sim", passType: "allscreen", rating: "U/A 7+", sentiment: "Very Positive", reviews: "12,345", players: "21.3k" },
  { id: 261, title: "Disney Speedstorm", genre: "Racing", passType: "allscreen", rating: "U/A 7+", sentiment: "Mostly Positive", reviews: "8,901", players: "14.5k" },
  { id: 262, title: "Castle of Illusion", genre: "Platformer", passType: "allscreen", rating: "U/A 7+", sentiment: "Very Positive", reviews: "5,678", players: "7.2k" },
  { id: 263, title: "DuckTales", genre: "Platformer", passType: "allscreen", rating: "U/A 7+", sentiment: "Very Positive", reviews: "4,321", players: "6.1k" },
  { id: 264, title: "Aladdin", genre: "Platformer", passType: "allscreen", rating: "U/A 7+", sentiment: "Very Positive", reviews: "3,456", players: "5.4k" },
  { id: 270, title: "The Bunker", genre: "Horror", passType: "allscreen", rating: "U/A 18+", sentiment: "Mostly Positive", reviews: "2,345", players: "1.5k" },
  { id: 273, title: "Amnesia Rebirth", genre: "Horror", passType: "allscreen", rating: "U/A 18+", sentiment: "Very Positive", reviews: "9,876", players: "6.8k" },
  { id: 274, title: "Layers of Fear", genre: "Horror", passType: "allscreen", rating: "U/A 18+", sentiment: "Very Positive", reviews: "7,654", players: "4.9k" },
  { id: 221, title: "Murder on Express", genre: "Mystery", passType: "allscreen", rating: "U/A 16+", sentiment: "Positive", reviews: "1,892", players: "1.1k" },
  { id: 250, title: "Memoria", genre: "Adventure", passType: "allscreen", rating: "U/A 12+", sentiment: "Very Positive", reviews: "3,456", players: "2.1k" },
  { id: 253, title: "Rollerdrome", genre: "Action", passType: "allscreen", rating: "U/A 16+", sentiment: "Very Positive", reviews: "7,891", players: "5.6k" },
];

// Deduplicate by title for search
const SEARCH_INDEX = [];
const _seen = new Set();
ALL_GAMES.forEach(g => {
  if (!_seen.has(g.title)) { _seen.add(g.title); SEARCH_INDEX.push(g); }
});

// ─── Search Overlay ───
function SearchOverlay({ onClose, onSelect, context }) {
  const [query, setQuery] = useState("");
  const [animIn, setAnimIn] = useState(false);
  const inputRef = useRef(null);
  const isStore = context === "store";
  const isMobile = context === "mobile";
  const isAllScreen = context === "allscreen";

  // Filter search index by tab context
  const contextIndex = isStore ? [] : SEARCH_INDEX.filter(g =>
    isMobile ? g.passType === "mobile" : isAllScreen ? g.passType === "allscreen" : true
  );

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 30);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const q = query.toLowerCase().trim();

  // Store search: search across all store items
  const storeResults = q.length === 0 ? [] : ALL_STORE_ITEMS.filter(item =>
    item.title.toLowerCase().includes(q) || (item.storeCategory || "").includes(q)
  );
  // Game search — filtered by tab
  const gameResults = q.length === 0 ? [] : contextIndex.filter(g =>
    g.title.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q)
  );
  const results = isStore ? storeResults : gameResults;

  const genres = [...new Set(contextIndex.map(g => g.genre))].slice(0, 8);
  const storeCategories = ["Brands", "Top-Ups", "Vouchers", "Games"];

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 200,
      background: C.bg, opacity: animIn ? 1 : 0,
      transition: "opacity 0.25s ease",
      display: "flex", flexDirection: "column",
    }}>
      {/* Search bar */}
      <div style={{ padding: "52px 16px 12px", display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 12, background: C.surface, flexShrink: 0,
          border: `1px solid ${C.border}`, color: C.textSec, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: 10,
          background: C.surface, borderRadius: 14, padding: "0 14px",
          border: `1px solid ${C.borderLight}`, height: 44,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={isStore ? "Search store, vouchers, brands..." : isMobile ? "Search mobile games..." : isAllScreen ? "Search all screen games..." : "Search games, genres..."}
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              fontFamily: FONT.body, fontSize: 14, color: C.text,
              caretColor: C.accent,
            }}
          />
          {query && (
            <span onClick={() => setQuery("")} style={{
              color: C.textDim, cursor: "pointer", fontSize: 18, lineHeight: 1,
            }}>&times;</span>
          )}
        </div>
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
        {q.length === 0 ? (
          <div>
            <div style={{ fontFamily: FONT.display, fontSize: 13, fontWeight: 700, color: C.textDim, letterSpacing: 0.8, textTransform: "uppercase", padding: "16px 0 10px" }}>{isStore ? "Browse Store" : "Browse by Genre"}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(isStore ? storeCategories : genres).map(cat => (
                <span key={cat} onClick={() => setQuery(cat.toLowerCase())} style={{
                  padding: "8px 16px", borderRadius: 20,
                  background: C.surface, border: `1px solid ${C.borderLight}`,
                  fontFamily: FONT.body, fontSize: 12, color: C.textSec,
                  cursor: "pointer", fontWeight: 500,
                }}>{cat}</span>
              ))}
            </div>
            {isStore ? (
              <>
                <div style={{ fontFamily: FONT.display, fontSize: 13, fontWeight: 700, color: C.textDim, letterSpacing: 0.8, textTransform: "uppercase", padding: "24px 0 10px" }}>Popular in Store</div>
                {ALL_STORE_ITEMS.filter((_,i) => i % 4 === 0).slice(0, 6).map((item, i) => (
                  <div key={item.id} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                    borderBottom: `1px solid ${C.border}`, cursor: "pointer",
                    animation: `fadeUp 0.25s ease ${i * 0.04}s both`,
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: item.color || C.textSec, flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: C.text }}>{item.title}</div>
                      <div style={{ fontFamily: FONT.body, fontSize: 10, color: C.textDim, marginTop: 2, textTransform: "capitalize" }}>{item.storeCategory}</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div style={{ fontFamily: FONT.display, fontSize: 13, fontWeight: 700, color: C.textDim, letterSpacing: 0.8, textTransform: "uppercase", padding: "24px 0 10px" }}>Popular</div>
                {contextIndex.slice(0, 6).map((game, i) => (
                  <div key={game.id} onClick={() => onSelect(game)} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                    borderBottom: `1px solid ${C.border}`, cursor: "pointer",
                    animation: `fadeUp 0.25s ease ${i * 0.04}s both`,
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: `1px solid ${C.border}` }}>
                      <CinematicArt title={game.title} size="sm" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{game.title}</div>
                      <div style={{ fontFamily: FONT.body, fontSize: 11, color: C.textDim, marginTop: 2 }}>{game.genre} {game.passType === "allscreen" ? "• All Screen" : "• Mobile"}</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                ))}
              </>
            )}
          </div>
        ) : results.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>{isStore ? "🛒" : "🎮"}</div>
            <div style={{ fontFamily: FONT.display, fontSize: 16, fontWeight: 700, color: C.textSec }}>{isStore ? "No store items found" : "No games found"}</div>
            <div style={{ fontFamily: FONT.body, fontSize: 12, color: C.textDim, marginTop: 6 }}>Try a different search term</div>
          </div>
        ) : (
          <div>
            <div style={{ fontFamily: FONT.body, fontSize: 11, color: C.textDim, padding: "12px 0 8px", letterSpacing: 0.3 }}>
              {results.length} result{results.length !== 1 ? "s" : ""}
            </div>
            {results.map((item, i) => {
              const isStoreItem = !!item.storeCategory;
              const art = isStoreItem ? null : getGameArt(item.title);
              return (
                <div key={`${item.id}-${i}`} onClick={() => !isStoreItem && onSelect(item)} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                  borderBottom: `1px solid ${C.border}`, cursor: "pointer",
                  animation: `fadeUp 0.2s ease ${i * 0.03}s both`,
                }}>
                  {isStoreItem ? (
                    <div style={{ width: 50, height: 50, borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: item.color || C.textSec, flexShrink: 0 }}>{item.icon}</div>
                  ) : (
                    <div style={{ width: 50, height: 50, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: `1px solid ${art.colors[0]}25` }}>
                      <CinematicArt title={item.title} size="sm" />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                      {isStoreItem ? (
                        <span style={{ fontFamily: FONT.body, fontSize: 10, color: C.textDim, letterSpacing: 0.3, textTransform: "capitalize", fontWeight: 500 }}>{item.storeCategory}</span>
                      ) : (
                        <>
                          <span style={{ fontFamily: FONT.body, fontSize: 10, color: C.textDim, letterSpacing: 0.3, textTransform: "uppercase", fontWeight: 500 }}>{item.genre}</span>
                          <span style={{ width: 3, height: 3, borderRadius: "50%", background: C.textMicro }} />
                          <span style={{ fontFamily: FONT.body, fontSize: 9, fontWeight: 600, letterSpacing: 0.5, color: item.passType === "allscreen" ? C.cyan : C.accent }}>{item.passType === "allscreen" ? "ALL SCREEN" : "MOBILE"}</span>
                        </>
                      )}
                    </div>
                    {!isStoreItem && item.sentiment && (
                      <div style={{ fontFamily: FONT.body, fontSize: 10, color: C.accent, marginTop: 2, fontWeight: 500 }}>
                        {item.sentiment} ({item.reviews})
                      </div>
                    )}
                    {isStoreItem && item.price && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                        <span style={{ fontFamily: FONT.display, fontSize: 11, fontWeight: 700, color: C.accent }}>{item.price}</span>
                        {item.original && <span style={{ fontFamily: FONT.body, fontSize: 9, color: C.textDim, textDecoration: "line-through" }}>{item.original}</span>}
                        {item.discount && <span style={{ fontFamily: FONT.body, fontSize: 8, fontWeight: 700, color: C.accent, background: `${C.accent}18`, padding: "1px 4px", borderRadius: 3 }}>{item.discount}</span>}
                      </div>
                    )}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── App Header ───
function AppHeader({ onProfile, onSubscribe, onSearch }) {
  return (
    <div style={{ position: "absolute", top: 42, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", zIndex: 50 }}>
      <JioLogo />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={onSearch} style={{ width: 36, height: 36, borderRadius: 12, background: C.glass, backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.glassBorder}`, cursor: "pointer", color: C.textSec }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <button onClick={onSubscribe} style={{ padding: "8px 14px", borderRadius: 8, background: `linear-gradient(135deg, ${C.gold}15, ${C.gold}08)`, border: `1px solid ${C.gold}20`, fontFamily: FONT.display, fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 0.8, cursor: "pointer", textTransform: "uppercase" }}>Subscribe</button>
        <button onClick={onProfile} style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #8b5cf6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(139,92,246,0.3)", cursor: "pointer", color: "#fff", fontFamily: FONT.display, fontSize: 13, fontWeight: 800, letterSpacing: 1 }}>N</button>
      </div>
    </div>
  );
}

// ─── Featured Card (first rail — expands on hover for trailer preview) ───
function FeaturedCard({ game, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const art = getGameArt(game.title);
  const [c1] = art.colors;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect && onSelect(game)}
      style={{
        minWidth: hovered ? 220 : 138,
        width: hovered ? 220 : 138,
        height: hovered ? 200 : 155,
        borderRadius: 14, overflow: "hidden",
        background: C.card,
        border: `1px solid ${hovered ? `${c1}40` : C.border}`,
        cursor: "pointer", flexShrink: 0,
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.6), 0 0 30px ${c1}15` : "none",
        position: "relative", zIndex: hovered ? 10 : 1,
      }}
    >
      <div style={{
        height: hovered ? 150 : 100, position: "relative", overflow: "hidden",
        transition: "height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}>
        <CinematicArt title={game.title} size="md" />
        {/* Trailer preview hint on hover */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.25)",
            animation: "fadeUp 0.3s ease",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="6,3 20,12 6,21"/></svg>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "10px 11px 9px" }}>
        <div style={{
          fontFamily: FONT.body, fontSize: 12, fontWeight: 600,
          color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{game.title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 3 }}>
          <span style={{ fontFamily: FONT.body, fontSize: 10, color: C.textDim, letterSpacing: 0.3, textTransform: "uppercase", fontWeight: 500 }}>{game.genre}</span>
          {hovered && (
            <span style={{
              fontFamily: FONT.body, fontSize: 9, color: C.accent, fontWeight: 600,
              letterSpacing: 0.5, animation: "fadeUp 0.2s ease",
            }}>PREVIEW</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Game Card ───
function GameCard({ game, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect && onSelect(game)}
      style={{
        minWidth: 138, borderRadius: 14, overflow: "hidden", background: C.card,
        border: `1px solid ${hovered ? C.borderAccent : C.border}`,
        cursor: "pointer", flexShrink: 0,
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.5)` : "none",
        transform: hovered ? "translateY(-2px)" : "none",
      }}>
      <div style={{ height: 100, position: "relative", overflow: "hidden" }}>
        <CinematicArt title={game.title} size="md" />
        {game.tag && (
          <div style={{ position: "absolute", top: 8, right: 8, padding: "3px 8px", borderRadius: 4, background: `${game.tagColor || C.gold}dd`, fontFamily: FONT.body, fontSize: 8, fontWeight: 700, color: "#000", letterSpacing: 0.6, zIndex: 2, textTransform: "uppercase" }}>{game.tag}</div>
        )}
      </div>
      <div style={{ padding: "10px 11px 9px" }}>
        <div style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{game.title}</div>
        <div style={{ fontFamily: FONT.body, fontSize: 10, color: C.textDim, marginTop: 3, letterSpacing: 0.3, textTransform: "uppercase", fontWeight: 500 }}>{game.genre}</div>
      </div>
    </div>
  );
}

// ─── Circle Card ───
function CircleCard({ game, onSelect }) {
  return (
    <div onClick={() => onSelect && onSelect(game)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 80, flexShrink: 0, cursor: "pointer" }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", border: `2px solid ${C.surfaceLight}`, overflow: "hidden", boxShadow: `0 4px 16px rgba(0,0,0,0.4)` }}>
        <CinematicArt title={game.title} size="circle" />
      </div>
      <span style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 500, color: C.textSec, textAlign: "center", maxWidth: 76, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{game.title}</span>
    </div>
  );
}

// ─── Expandable Card ───
function ExpandableCard({ game, rank, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect && onSelect(game)}
      style={{
        minWidth: rank ? 130 : 152, width: rank ? 130 : 152, borderRadius: 14, overflow: "hidden",
        background: C.card, border: `1px solid ${hovered ? C.borderAccent : C.border}`,
        cursor: "pointer", flexShrink: 0,
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: hovered ? C.shadow : "none", transform: hovered ? "translateY(-2px)" : "none",
      }}>
      <div style={{ height: rank ? 130 : 115, position: "relative", overflow: "hidden" }}>
        <CinematicArt title={game.title} />
        {rank && (
          <div style={{ position: "absolute", bottom: -6, left: 8, fontFamily: FONT.display, fontSize: 52, fontWeight: 900, color: "rgba(255,255,255,0.08)", lineHeight: 1, WebkitTextStroke: "1px rgba(255,255,255,0.06)", zIndex: 2 }}>{rank}</div>
        )}
      </div>
      <div style={{ padding: "10px 10px 8px" }}>
        <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{game.title}</div>
        <div style={{ fontFamily: FONT.body, fontSize: 9, color: C.textDim, marginTop: 3, letterSpacing: 0.3, textTransform: "uppercase", fontWeight: 500 }}>{game.genre}</div>
      </div>
    </div>
  );
}

// ─── Game Rail (smart left arrow) ───
function GameRail({ title, games, action, showRank, expandable, circle, featured, onGameSelect }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeft(scrollRef.current.scrollLeft > 30);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });

  return (
    <div style={{ marginBottom: 28, position: "relative" }}>
      <SectionTitle action={action}>{title}</SectionTitle>
      <div style={{ position: "relative" }}>
        {/* Left arrow — only when scrolled */}
        {showLeft && (
          <button onClick={() => scroll(-1)} style={{
            position: "absolute", left: 4, top: "50%", transform: "translateY(-50%)",
            zIndex: 10, width: 28, height: 28, borderRadius: "50%",
            background: C.glass, backdropFilter: "blur(12px)",
            border: `1px solid ${C.glassBorder}`, color: C.textSec,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 14, fontWeight: 300,
            animation: "fadeUp 0.2s ease",
          }}>‹</button>
        )}
        {/* Right arrow — always visible */}
        <button onClick={() => scroll(1)} style={{
          position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)",
          zIndex: 10, width: 28, height: 28, borderRadius: "50%",
          background: C.glass, backdropFilter: "blur(12px)",
          border: `1px solid ${C.glassBorder}`, color: C.textSec,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: 14, fontWeight: 300,
        }}>›</button>
        <div ref={scrollRef} style={{
          display: "flex", gap: circle ? 14 : 10, padding: "0 20px", overflowX: "auto", scrollBehavior: "smooth",
          alignItems: featured ? "flex-start" : undefined,
        }}>
          {games.map((game, i) => {
            if (expandable) return <ExpandableCard key={game.id} game={game} rank={showRank ? i + 1 : null} onSelect={onGameSelect} />;
            if (circle) return <CircleCard key={game.id} game={game} onSelect={onGameSelect} />;
            if (featured) return <FeaturedCard key={game.id} game={game} onSelect={onGameSelect} />;
            return <GameCard key={game.id} game={game} onSelect={onGameSelect} />;
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Game Ratings Map ───
const MOBILE_RATINGS = {
  "FC Mobile": { stars: 4.3, downloads: "50M+", ratings: "2.1M" },
  "Stardew Valley": { stars: 4.8, downloads: "10M+", ratings: "890K" },
  "GTA San Andreas": { stars: 4.5, downloads: "100M+", ratings: "5.2M" },
  "Dead Cells": { stars: 4.6, downloads: "5M+", ratings: "312K" },
  "Minecraft": { stars: 4.5, downloads: "500M+", ratings: "12.3M" },
  "Monument Valley": { stars: 4.7, downloads: "50M+", ratings: "1.8M" },
  "Alto's Odyssey": { stars: 4.6, downloads: "10M+", ratings: "456K" },
  "Balatro": { stars: 4.9, downloads: "1M+", ratings: "89K" },
  "Vampire Survivors": { stars: 4.7, downloads: "5M+", ratings: "234K" },
  "Slay the Spire": { stars: 4.8, downloads: "2M+", ratings: "178K" },
  "Hades": { stars: 4.9, downloads: "3M+", ratings: "267K" },
  "Celeste": { stars: 4.8, downloads: "2M+", ratings: "145K" },
  "Hollow Knight": { stars: 4.7, downloads: "5M+", ratings: "389K" },
  "Gris": { stars: 4.6, downloads: "1M+", ratings: "67K" },
  "Inside": { stars: 4.5, downloads: "2M+", ratings: "98K" },
  "Limbo": { stars: 4.4, downloads: "10M+", ratings: "456K" },
  "Ori": { stars: 4.8, downloads: "1M+", ratings: "78K" },
  "Baba Is You": { stars: 4.7, downloads: "500K+", ratings: "34K" },
  "Indian Theft Aura Simulator": { stars: 3.8, downloads: "50M+", ratings: "1.2M" },
  "Indian Bikes Driving 3D": { stars: 3.5, downloads: "100M+", ratings: "2.8M" },
  "Ludo King": { stars: 4.2, downloads: "500M+", ratings: "9.1M" },
  "Fruit Ninja": { stars: 4.3, downloads: "100M+", ratings: "3.4M" },
  "Temple Run": { stars: 4.3, downloads: "500M+", ratings: "8.7M" },
  "Subway Surfers": { stars: 4.4, downloads: "1B+", ratings: "15.2M" },
  "Crossy Road": { stars: 4.3, downloads: "200M+", ratings: "4.5M" },
  "Wordle": { stars: 4.5, downloads: "10M+", ratings: "567K" },
  "Poppy Playtime Ch.1": { stars: 4.1, downloads: "50M+", ratings: "1.1M" },
  "Mini Metro": { stars: 4.5, downloads: "1M+", ratings: "45K" },
  "Papers, Please": { stars: 4.6, downloads: "500K+", ratings: "23K" },
  "Human Fall Flat": { stars: 4.2, downloads: "10M+", ratings: "678K" },
};

// ─── "You May Also Like" suggestions by genre ───
const GENRE_SUGGESTIONS = {
  "Sports": ["Ludo King", "Temple Run", "Subway Surfers"],
  "Simulation": ["Minecraft", "Mini Metro", "Papers, Please"],
  "Action": ["GTA San Andreas", "Dead Cells", "Hades"],
  "Roguelike": ["Dead Cells", "Slay the Spire", "Vampire Survivors"],
  "Sandbox": ["Stardew Valley", "Minecraft", "Human Fall Flat"],
  "Puzzle": ["Monument Valley", "Baba Is You", "Limbo"],
  "Runner": ["Temple Run", "Subway Surfers", "Crossy Road"],
  "Platformer": ["Celeste", "Hollow Knight", "Ori"],
  "Card Game": ["Balatro", "Slay the Spire", "Vampire Survivors"],
  "Metroidvania": ["Hollow Knight", "Dead Cells", "Celeste"],
  "Art Platformer": ["Gris", "Inside", "Limbo"],
  "Board": ["Ludo King", "Wordle", "Human Fall Flat"],
  "Casual": ["Fruit Ninja", "Crossy Road", "Wordle"],
  "Racing": ["Temple Run", "Subway Surfers", "Alto's Odyssey"],
  "Arcade": ["Crossy Road", "Fruit Ninja", "Temple Run"],
  "Word": ["Wordle", "Baba Is You", "Mini Metro"],
  "Horror": ["Inside", "Limbo", "Dead Cells"],
  "Strategy": ["Mini Metro", "Slay the Spire", "Papers, Please"],
};

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= full ? C.gold : (i === full + 1 && hasHalf ? `url(#halfStar)` : "none")} stroke={i <= full || (i === full + 1 && hasHalf) ? C.gold : C.textDim} strokeWidth="1.5">
          {i === full + 1 && hasHalf && (
            <defs>
              <linearGradient id="halfStar">
                <stop offset="50%" stopColor={C.gold} />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          )}
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const INSTANT_GAME_TITLES = new Set([
  "Indian Theft Aura Simulator", "Indian Bikes Driving 3D", "Ludo King",
  "Fruit Ninja", "Temple Run", "Subway Surfers", "Crossy Road", "Wordle",
]);

// ─── Game Overviews ───
const GAME_OVERVIEWS = {
  "GTA San Andreas": "Five years ago, Carl Johnson escaped the pressures of life in Los Santos. Now he must go on a journey that takes him across the state, to save his family and take control of the streets.",
  "FC Mobile": "Build your Ultimate Team and take on the world. Experience authentic football with real players, leagues, and tournaments in the palm of your hand.",
  "Stardew Valley": "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools, you set out to begin your new life. Can you learn to live off the land?",
  "Dead Cells": "A roguelike-metroidvania action-platformer. Explore an ever-changing castle, fight increasingly difficult enemies, and uncover the secrets within.",
  "Minecraft": "Create, explore, survive, and repeat. The world is yours — mine resources, craft tools, and build anything you can imagine in an infinite procedurally generated world.",
  "Monument Valley": "Guide the silent princess Ida through mysterious monuments, discovering impossible paths and optical illusions as you unravel the secrets of the Sacred Geometry.",
  "Hitman": "Enter the world of assassination. Agent 47 travels the globe, tracking elite targets across exotic locations in this critically acclaimed stealth experience.",
  "Hitman Absolution": "Agent 47 undertakes his most personal contract to date. Betrayed by the Agency and hunted by the police, he finds himself pursuing redemption in a corrupt world.",
  "Hades": "Defy the god of the dead as you hack and slash out of the Underworld. Hades combines fast-paced action with rich story and character progression.",
  "Celeste": "Help Madeline survive her inner demons on her journey to the top of Celeste Mountain. A tight, hand-crafted platforming experience about overcoming struggles.",
  "Hollow Knight": "Descend into the forgotten kingdom of Hallownest. A beautifully hand-drawn 2D adventure through vast, ruined caverns teeming with strange creatures.",
  "Cyberpunk 2077": "An open-world action-adventure set in Night City. A sprawling megalopolis obsessed with power, glamour, and body modification. You play as V, a mercenary outlaw.",
  "God of War": "Kratos is a father again. Journeying with his son Atreus through the Norse wilds, they must fight to fulfill a deeply personal quest.",
  "Elden Ring": "Rise, Tarnished. The Golden Order has been broken. Explore the Lands Between, a vast realm ruled by demigods, in this open-world action RPG.",
};

const DEFAULT_OVERVIEW = "Dive into an immersive gaming experience with stunning visuals, engaging gameplay, and hours of content. Available exclusively on JioGames — start your adventure today.";

// ─── GAME DETAIL PAGE ───
function GameDetailPage({ game, onClose, passType, onSubscribe, onGameSelect }) {
  const [animIn, setAnimIn] = useState(false);
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeMedia, setActiveMedia] = useState(0);
  useEffect(() => { setTimeout(() => setAnimIn(true), 30); }, []);
  const art = getGameArt(game.title);
  const [c1, c2, c3] = art.colors;
  const overview = GAME_OVERVIEWS[game.title] || DEFAULT_OVERVIEW;
  const isMobile = passType !== "allscreen";
  const isInstant = game.isInstant || INSTANT_GAME_TITLES.has(game.title);
  const mobileRating = isMobile ? (MOBILE_RATINGS[game.title] || { stars: 4.2, downloads: "1M+", ratings: "50K" }) : null;
  const suggestions = isMobile ? (GENRE_SUGGESTIONS[game.genre] || ["Minecraft", "Hades", "Celeste"]).filter(t => t !== game.title).slice(0, 4) : [];

  return (
    <div style={{ opacity: animIn ? 1 : 0, transition: "opacity 0.35s ease", minHeight: "100%" }}>
      {/* Trailer area — expanded */}
      <div style={{ position: "relative", height: 400, overflow: "hidden", background: "#000" }}>
        {/* Cinematic backdrop */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, ${c1}50 0%, transparent 55%),
                        radial-gradient(ellipse at 80% 70%, ${c2}30 0%, transparent 45%),
                        linear-gradient(160deg, ${c1}20 0%, #000 70%)`,
        }} />
        <div style={{
          position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
          fontSize: 160, opacity: 0.12, color: c3,
          filter: `drop-shadow(0 0 60px ${c1})`,
        }}>{art.icon}</div>
        {/* Play button */}
        {!trailerPlaying && (
          <div onClick={() => setTrailerPlaying(true)} style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 3,
          }}>
            <div style={{
              width: 68, height: 68, borderRadius: "50%",
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1.5px solid rgba(255,255,255,0.18)",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><polygon points="8,5 20,12 8,19"/></svg>
            </div>
            <span style={{
              fontFamily: FONT.body, fontSize: 11, color: "rgba(255,255,255,0.45)",
              marginTop: 10, letterSpacing: 1.2, fontWeight: 500, textTransform: "uppercase",
            }}>Watch Trailer</span>
          </div>
        )}
        {/* Trailer playing state */}
        {trailerPlaying && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 3,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 36 }}>
                {[18, 28, 14, 24, 20, 30, 16, 26].map((h, i) => (
                  <div key={i} style={{
                    width: 4, borderRadius: 2, background: C.accent,
                    height: h, opacity: 0.7,
                    animation: `pulse 0.8s ease ${i * 0.1}s infinite alternate`,
                  }} />
                ))}
              </div>
              <span style={{ fontFamily: FONT.body, fontSize: 11, color: C.textSec, letterSpacing: 0.5 }}>
                Trailer playing...
              </span>
            </div>
          </div>
        )}
        {/* Bottom gradient */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
          background: `linear-gradient(180deg, transparent 0%, ${C.bg} 100%)`, zIndex: 2,
        }} />
        {/* Letterbox bars */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#000", zIndex: 4 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#000", zIndex: 4 }} />
        {/* Back */}
        <button onClick={onClose} style={{
          position: "absolute", top: 46, left: 16, zIndex: 10,
          width: 36, height: 36, borderRadius: 12,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        {/* Share + Wishlist (mobile games) */}
        {isMobile && (
          <div style={{ position: "absolute", top: 46, right: 16, zIndex: 10, display: "flex", gap: 8 }}>
            <button style={{
              width: 36, height: 36, borderRadius: 12,
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </button>
            <button onClick={() => setWishlisted(!wishlisted)} style={{
              width: 36, height: 36, borderRadius: 12,
              background: wishlisted ? `${C.gold}20` : "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)",
              border: wishlisted ? `1px solid ${C.gold}40` : "1px solid rgba(255,255,255,0.08)",
              color: wishlisted ? C.gold : "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease",
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted ? C.gold : "none"} stroke={wishlisted ? C.gold : "currentColor"} strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Game info */}
      <div style={{ padding: "0 20px", marginTop: -20, position: "relative", zIndex: 5 }}>
        <div style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>{game.title}</div>
        {game.sentiment ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, flexWrap: "wrap", fontFamily: FONT.body, fontSize: 12, color: C.textSec }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round"/></svg>
              <span style={{ color: C.accent, fontWeight: 600 }}>{game.sentiment}</span>
              <span style={{ color: C.textDim }}>({game.reviews})</span>
            </span>
            <span style={{ color: C.textMicro }}>•</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              <span>{game.players}</span>
            </span>
            <span style={{ color: C.textMicro }}>•</span>
            <span style={{ padding: "2px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.15)", fontSize: 10, color: C.textSec, fontWeight: 600, letterSpacing: 0.8 }}>{game.rating || "U/A 12+"}</span>
          </div>
        ) : (
          <div>
            {/* Genre + Rating badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginTop: 8,
              fontFamily: FONT.body, fontSize: 12, color: C.textSec,
            }}>
              <span style={{ padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", fontSize: 10, color: C.textDim, fontWeight: 500, letterSpacing: 0.8 }}>{game.rating || "U/A 12+"}</span>
              <span>{game.genre || game.subtitle}</span>
            </div>
            {/* Star rating row */}
            {mobileRating && (
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginTop: 12,
                fontFamily: FONT.body, fontSize: 12, color: C.textSec,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <StarRating rating={mobileRating.stars} />
                  <span style={{ fontFamily: FONT.display, fontSize: 14, fontWeight: 700, color: C.text }}>{mobileRating.stars}</span>
                </div>
                <span style={{ width: 1, height: 14, background: C.border }} />
                <span style={{ fontSize: 11, color: C.textDim }}>{mobileRating.ratings} ratings</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overview — hide for instant games */}
      {!isInstant && (
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ fontFamily: FONT.display, fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: -0.3, marginBottom: 8 }}>Overview</div>
          <p style={{ fontFamily: FONT.body, fontSize: 13, color: C.textSec, lineHeight: 1.7, margin: 0 }}>{overview}</p>
        </div>
      )}

      {/* Media Gallery — vertical stack */}
      <div style={{ padding: "24px 20px 0" }}>
        {/* Trailer card */}
        <div onClick={() => setTrailerPlaying(true)} style={{
          width: "100%", borderRadius: 16, overflow: "hidden", position: "relative",
          aspectRatio: "16/9", cursor: "pointer", marginBottom: 10,
          background: `linear-gradient(135deg, ${c1}45 0%, ${c2}25 50%, ${C.bg} 100%)`,
          border: `1px solid ${c1}20`,
        }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, opacity: 0.15, color: c3, filter: `drop-shadow(0 0 40px ${c1})` }}>{art.icon}</div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(255,255,255,0.2)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="8,5 20,12 8,19"/></svg>
            </div>
          </div>
        </div>
        {/* Image cards */}
        {[1, 2, 3].map(i => {
          const angle = i * 50 + 20;
          const mix1 = i === 1 ? c1 : i === 2 ? c2 : c3;
          const mix2 = i === 1 ? c2 : i === 2 ? c3 : c1;
          return (
            <div key={i} style={{
              width: "100%", borderRadius: 16, overflow: "hidden", position: "relative",
              aspectRatio: "16/9", marginBottom: 10, cursor: "pointer",
              background: `linear-gradient(${angle}deg, ${mix1}35 0%, ${mix2}18 40%, ${C.bg} 100%)`,
              border: `1px solid ${mix1}15`,
            }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 44, opacity: 0.15, color: mix1, filter: `drop-shadow(0 0 30px ${mix1})` }}>{art.icon}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ padding: "20px 20px 0" }}>
        {isInstant ? (
          <button style={{
            width: "100%", padding: "16px 0", borderRadius: 30, border: "none",
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentMuted})`,
            color: "#000", fontFamily: FONT.display, fontWeight: 700, fontSize: 15,
            letterSpacing: 0.8, cursor: "pointer", textTransform: "uppercase",
            boxShadow: `0 4px 24px ${C.accentGlow}`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000"><polygon points="8,5 20,12 8,19"/></svg>
            Play Now
          </button>
        ) : (
          <button onClick={() => onSubscribe && onSubscribe(passType === "allscreen" ? 1 : 0)} style={{
            width: "100%", padding: "13px 0", borderRadius: 26, border: "none",
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentMuted})`,
            color: "#000", fontFamily: FONT.display, fontWeight: 700, fontSize: 14,
            letterSpacing: 1, cursor: "pointer", textTransform: "uppercase",
            boxShadow: `0 4px 24px ${C.accentGlow}`,
          }}>{passType === "allscreen" ? "Subscribe to All Screen Pass" : "Subscribe to Mobile Pass"}</button>
        )}
      </div>

      {/* You May Also Like — mobile only */}
      {isMobile && suggestions.length > 0 && (
        <div style={{ padding: "24px 0 0" }}>
          <div style={{ padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontFamily: FONT.display, fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>You May Also Like</span>
          </div>
          <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 20px 24px", scrollbarWidth: "none" }}>
            {suggestions.map((title, i) => {
              const sArt = getGameArt(title);
              const sGameBase = ALL_GAMES.find(g => g.title === title) || { id: 900 + i, title, genre: "Game", passType: "mobile" };
              const sGame = INSTANT_GAME_TITLES.has(title) ? { ...sGameBase, isInstant: true } : sGameBase;
              return (
                <div key={title} onClick={() => onGameSelect && onGameSelect(sGame)} style={{
                  flexShrink: 0, width: 130, cursor: "pointer",
                  animation: `fadeUp 0.3s ease ${i * 0.06}s both`,
                }}>
                  <div style={{
                    width: 130, height: 170, borderRadius: 14, overflow: "hidden",
                    position: "relative",
                    background: `linear-gradient(145deg, ${sArt.colors[0]}40 0%, ${sArt.colors[1]}20 50%, ${sArt.colors[2]}10 100%)`,
                    border: `1px solid ${sArt.colors[0]}20`,
                  }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 48, opacity: 0.35, color: sArt.colors[2],
                      filter: `drop-shadow(0 0 20px ${sArt.colors[0]})`,
                    }}>{sArt.icon}</div>
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "28px 10px 10px",
                      background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                    }}>
                      <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: "#fff", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
                      <div style={{ fontFamily: FONT.body, fontSize: 9, color: "rgba(255,255,255,0.5)", marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>{sGame.genre}</div>
                    </div>
                  </div>
                  {MOBILE_RATINGS[title] && (
                    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 6, padding: "0 2px" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill={C.gold} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      <span style={{ fontFamily: FONT.body, fontSize: 10, color: C.textSec, fontWeight: 500 }}>{MOBILE_RATINGS[title].stars}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── MOBILE TAB ───
function MobileTab({ onGameSelect }) {
  const [animIn, setAnimIn] = useState(false);
  useEffect(() => { setTimeout(() => setAnimIn(true), 60); }, []);

  const topMobile = [
    { id: 10, title: "FC Mobile", genre: "Sports", color: "#0fa94e" },
    { id: 11, title: "Stardew Valley", genre: "Simulation", color: "#7cb342" },
    { id: 12, title: "GTA San Andreas", genre: "Action", color: "#ff6d00" },
    { id: 13, title: "Dead Cells", genre: "Roguelike", color: "#e53935" },
    { id: 14, title: "Minecraft", genre: "Sandbox", color: "#4caf50" },
    { id: 15, title: "Monument Valley", genre: "Puzzle", color: "#ec407a" },
    { id: 16, title: "Alto's Odyssey", genre: "Runner", color: "#ff7043" },
  ];
  const recentlyAdded = [
    { id: 100, title: "Balatro", genre: "Roguelike", color: "#1565c0" },
    { id: 101, title: "Vampire Survivors", genre: "Action", color: "#6a1b9a" },
    { id: 102, title: "Slay the Spire", genre: "Card Game", color: "#2e7d32" },
    { id: 103, title: "Hades", genre: "Roguelike", color: "#d84315" },
    { id: 104, title: "Celeste", genre: "Platformer", color: "#0277bd" },
    { id: 105, title: "Hollow Knight", genre: "Metroidvania", color: "#37474f" },
  ];
  const editorsPick = [
    { id: 110, title: "Gris", genre: "Art Platformer", color: "#e91e63" },
    { id: 111, title: "Inside", genre: "Puzzle", color: "#263238" },
    { id: 112, title: "Limbo", genre: "Puzzle", color: "#212121" },
    { id: 113, title: "Ori", genre: "Platformer", color: "#00897b" },
    { id: 114, title: "Baba Is You", genre: "Puzzle", color: "#5d4037" },
  ];
  const comingSoon = [
    { id: 130, title: "Poppy Playtime Ch.1", genre: "Horror", color: "#1565c0" },
    { id: 131, title: "Mini Metro", genre: "Strategy", color: "#e53935" },
    { id: 132, title: "Papers, Please", genre: "Simulation", color: "#4e342e" },
    { id: 133, title: "Human Fall Flat", genre: "Puzzle", color: "#0288d1" },
  ];
  const instantGames = [
    { id: 120, title: "Indian Theft Aura Simulator", genre: "Action", color: "#e53935" },
    { id: 121, title: "Indian Bikes Driving 3D", genre: "Racing", color: "#ff8f00" },
    { id: 122, title: "Ludo King", genre: "Board", color: "#1e88e5" },
    { id: 123, title: "Fruit Ninja", genre: "Casual", color: "#c62828" },
    { id: 124, title: "Temple Run", genre: "Runner", color: "#ef6c00" },
    { id: 125, title: "Subway Surfers", genre: "Runner", color: "#0277bd" },
    { id: 126, title: "Crossy Road", genre: "Arcade", color: "#7cb342" },
    { id: 127, title: "Wordle", genre: "Word", color: "#546e7a" },
  ];

  return (
    <div style={{ opacity: animIn ? 1 : 0, transition: "opacity 0.5s ease" }}>
      <BannerCarousel banners={mobileBanners} onGameSelect={(b) => onGameSelect({ ...b, genre: b.subtitle })} />
      <div style={{ marginTop: 8 }}>
        <GameRail title="Top Mobile Games" games={topMobile} action="See All" featured onGameSelect={onGameSelect} />
        <GameRail title="Recently Added" games={recentlyAdded} action="See All" onGameSelect={onGameSelect} />
        <GameRail title="Editor's Pick" games={editorsPick} circle onGameSelect={onGameSelect} />
        <GameRail title="Coming Soon" games={comingSoon} action="See All" onGameSelect={onGameSelect} />
        <GameRail title="Instant Games" games={instantGames} action="See All" onGameSelect={onGameSelect} />
      </div>
      <div style={{ height: 120 }} />
    </div>
  );
}

// ─── ALL SCREEN TAB ───
function AllScreenTab({ onGameSelect }) {
  const [animIn, setAnimIn] = useState(false);
  useEffect(() => { setTimeout(() => setAnimIn(true), 60); }, []);

  const newReleases = [
    { id: 200, title: "Willy Morgan", genre: "Adventure", color: "#4a90d9", rating: "U/A 12+", sentiment: "Positive", reviews: "1,245", players: "2.1k" },
    { id: 201, title: "Emily's Honeymoon", genre: "Casual", color: "#29b6f6", rating: "U/A 7+", sentiment: "Mostly Positive", reviews: "892", players: "3.4k" },
    { id: 202, title: "Whispered World", genre: "Adventure", color: "#2e7d32", rating: "U/A 12+", sentiment: "Very Positive", reviews: "3,456", players: "1.8k" },
    { id: 203, title: "Tools Up!", genre: "Party", color: "#ab47bc", rating: "U/A 7+", sentiment: "Positive", reviews: "2,103", players: "5.6k" },
    { id: 204, title: "In Sound Mind", genre: "Horror", color: "#7e57c2", rating: "U/A 18+", sentiment: "Very Positive", reviews: "4,521", players: "3.2k" },
  ];
  const top10 = [
    { id: 210, title: "Hitman", genre: "Stealth", color: "#c62828", rating: "U/A 18+", sentiment: "Very Positive", reviews: "11,234", players: "15.2k" },
    { id: 211, title: "Rise of Tomb Raider", genre: "Adventure", color: "#6d4c41", rating: "U/A 16+", sentiment: "Very Positive", reviews: "45,892", players: "22.1k" },
    { id: 212, title: "WRC 9", genre: "Racing", color: "#2e7d32", rating: "U/A 7+", sentiment: "Mostly Positive", reviews: "3,678", players: "4.5k" },
    { id: 213, title: "Mafia DE", genre: "Action", color: "#e65100", rating: "U/A 18+", sentiment: "Very Positive", reviews: "18,923", players: "12.8k" },
    { id: 214, title: "Sniper GW 3", genre: "FPS", color: "#33691e", rating: "U/A 18+", sentiment: "Mostly Positive", reviews: "8,456", players: "6.3k" },
    { id: 215, title: "Far Cry 3: Blood Dragon", genre: "FPS", color: "#d81b60", rating: "U/A 18+", sentiment: "Overwhelmingly Positive", reviews: "22,134", players: "9.7k" },
    { id: 216, title: "Just Cause 3", genre: "Action", color: "#e64a19", rating: "U/A 16+", sentiment: "Mostly Positive", reviews: "31,567", players: "18.4k" },
    { id: 217, title: "Sleeping Dogs DE", genre: "Action", color: "#455a64", rating: "U/A 18+", sentiment: "Very Positive", reviews: "24,891", players: "11.2k" },
    { id: 218, title: "Cyberpunk 2077", genre: "RPG", color: "#f9a825", rating: "U/A 18+", sentiment: "Very Positive", reviews: "89,234", players: "45.6k" },
    { id: 219, title: "God of War", genre: "Action", color: "#b71c1c", rating: "U/A 18+", sentiment: "Overwhelmingly Positive", reviews: "67,812", players: "38.9k" },
  ];
  const editorsPick = [
    { id: 220, title: "Just Cause 3", genre: "Action", color: "#e64a19", rating: "U/A 16+", sentiment: "Mostly Positive", reviews: "31,567", players: "18.4k" },
    { id: 221, title: "Murder on Express", genre: "Mystery", color: "#5d4037", rating: "U/A 16+", sentiment: "Positive", reviews: "1,892", players: "1.1k" },
    { id: 222, title: "Sleeping Dogs DE", genre: "Action", color: "#455a64", rating: "U/A 18+", sentiment: "Very Positive", reviews: "24,891", players: "11.2k" },
    { id: 223, title: "Mafia DE", genre: "Action", color: "#e65100", rating: "U/A 18+", sentiment: "Very Positive", reviews: "18,923", players: "12.8k" },
    { id: 224, title: "Sniper GW 3", genre: "FPS", color: "#33691e", rating: "U/A 18+", sentiment: "Mostly Positive", reviews: "8,456", players: "6.3k" },
  ];
  const recommended = [
    { id: 230, title: "Hitman Absolution", genre: "Stealth", color: "#c62828", rating: "U/A 18+", sentiment: "Very Positive", reviews: "11,813", players: "13.4k" },
    { id: 231, title: "Mafia DE", genre: "Action", color: "#e65100", rating: "U/A 18+", sentiment: "Very Positive", reviews: "18,923", players: "12.8k" },
    { id: 232, title: "The Bunker", genre: "Horror", color: "#263238", rating: "U/A 18+", sentiment: "Mostly Positive", reviews: "2,345", players: "1.5k" },
    { id: 233, title: "Assassin's Creed", genre: "Action", color: "#37474f", rating: "U/A 18+", sentiment: "Very Positive", reviews: "34,567", players: "28.3k" },
    { id: 234, title: "Elden Ring", genre: "RPG", color: "#f9a825", rating: "U/A 18+", sentiment: "Overwhelmingly Positive", reviews: "156,234", players: "89.1k" },
  ];
  const bonusGames = [
    { id: 240, title: "Far Cry 3: Blood Dragon", genre: "FPS", color: "#d81b60", rating: "U/A 18+", sentiment: "Overwhelmingly Positive", reviews: "22,134", players: "9.7k" },
    { id: 241, title: "In Sound Mind", genre: "Horror", color: "#7e57c2", rating: "U/A 18+", sentiment: "Very Positive", reviews: "4,521", players: "3.2k" },
    { id: 242, title: "Dungeons 3", genre: "Strategy", color: "#bf360c", rating: "U/A 12+", sentiment: "Very Positive", reviews: "5,678", players: "4.1k" },
    { id: 243, title: "Vikings: Wolves", genre: "Action RPG", color: "#4e342e", rating: "U/A 18+", sentiment: "Mostly Positive", reviews: "1,234", players: "2.3k" },
    { id: 244, title: "Railway Empire", genre: "Simulation", color: "#0d47a1", rating: "U/A 7+", sentiment: "Very Positive", reviews: "6,789", players: "3.8k" },
  ];
  const comingSoon = [
    { id: 250, title: "Memoria", genre: "Adventure", color: "#5d4037", tag: "26 Mar", tagColor: "#ffb300", rating: "U/A 12+", sentiment: "Very Positive", reviews: "3,456", players: "2.1k" },
    { id: 251, title: "Albatroz", genre: "Adventure", color: "#2e7d32", tag: "26 Mar", tagColor: "#ffb300", rating: "U/A 12+", sentiment: "Positive", reviews: "890", players: "1.2k" },
    { id: 252, title: "Fallback Uprising", genre: "Action", color: "#1565c0", tag: "26 Mar", tagColor: "#ffb300", rating: "U/A 16+", sentiment: "Positive", reviews: "1,567", players: "3.4k" },
    { id: 253, title: "Rollerdrome", genre: "Action", color: "#c62828", tag: "26 Mar", tagColor: "#ffb300", rating: "U/A 16+", sentiment: "Very Positive", reviews: "7,891", players: "5.6k" },
  ];
  const disneyAdventures = [
    { id: 260, title: "Disney Dreamlight", genre: "Life Sim", color: "#6a1b9a", rating: "U/A 7+", sentiment: "Very Positive", reviews: "12,345", players: "21.3k" },
    { id: 261, title: "Disney Speedstorm", genre: "Racing", color: "#7b1fa2", rating: "U/A 7+", sentiment: "Mostly Positive", reviews: "8,901", players: "14.5k" },
    { id: 262, title: "Castle of Illusion", genre: "Platformer", color: "#1565c0", rating: "U/A 7+", sentiment: "Very Positive", reviews: "5,678", players: "7.2k" },
    { id: 263, title: "DuckTales", genre: "Platformer", color: "#f57f17", rating: "U/A 7+", sentiment: "Very Positive", reviews: "4,321", players: "6.1k" },
    { id: 264, title: "Aladdin", genre: "Platformer", color: "#0277bd", rating: "U/A 7+", sentiment: "Very Positive", reviews: "3,456", players: "5.4k" },
  ];
  const horrorMystery = [
    { id: 270, title: "The Bunker", genre: "Horror", color: "#263238", rating: "U/A 18+", sentiment: "Mostly Positive", reviews: "2,345", players: "1.5k" },
    { id: 271, title: "In Sound Mind", genre: "Horror", color: "#7e57c2", rating: "U/A 18+", sentiment: "Very Positive", reviews: "4,521", players: "3.2k" },
    { id: 272, title: "Murder on Express", genre: "Mystery", color: "#5d4037", rating: "U/A 16+", sentiment: "Positive", reviews: "1,892", players: "1.1k" },
    { id: 273, title: "Amnesia Rebirth", genre: "Horror", color: "#1a237e", rating: "U/A 18+", sentiment: "Very Positive", reviews: "9,876", players: "6.8k" },
    { id: 274, title: "Layers of Fear", genre: "Horror", color: "#3e2723", rating: "U/A 18+", sentiment: "Very Positive", reviews: "7,654", players: "4.9k" },
  ];

  return (
    <div style={{ opacity: animIn ? 1 : 0, transition: "opacity 0.5s ease" }}>
      <BannerCarousel banners={allScreenBanners} onGameSelect={(b) => onGameSelect({ ...b, genre: b.subtitle })} />
      <GameRail title="New Releases" games={newReleases} action="See All" featured onGameSelect={onGameSelect} />
      <GameRail title="Top 10 Games" games={top10} action="See All" expandable showRank onGameSelect={onGameSelect} />
      <GameRail title="Editor's Pick" games={editorsPick} circle onGameSelect={onGameSelect} />
      <GameRail title="Recommended for You" games={recommended} action="See All" onGameSelect={onGameSelect} />
      <GameRail title="Bonus Games" games={bonusGames} action="See All" onGameSelect={onGameSelect} />
      <GameRail title="Coming Soon" games={comingSoon} action="See All" onGameSelect={onGameSelect} />
      <GameRail title="Disney Adventures" games={disneyAdventures} action="See All" onGameSelect={onGameSelect} />
      <GameRail title="Horror & Mystery" games={horrorMystery} action="See All" onGameSelect={onGameSelect} />
      <div style={{ height: 120 }} />
    </div>
  );
}

// ─── STORE TAB ───
function StoreTab() {
  const [animIn, setAnimIn] = useState(false);
  const [subTab, setSubTab] = useState("home");
  const [voucherFilter, setVoucherFilter] = useState("all");
  useEffect(() => { setTimeout(() => setAnimIn(true), 60); }, []);

  const subTabs = [
    { id: "home", label: "Home", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg> },
    { id: "topups", label: "Top-Ups", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
    { id: "vouchers", label: "Vouchers", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
    { id: "games", label: "Games", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="6.01" y2="12" strokeWidth="3" strokeLinecap="round"/><line x1="18" y1="12" x2="18.01" y2="12" strokeWidth="3" strokeLinecap="round"/></svg> },
  ];

  const filteredVouchers = voucherFilter === "all" ? storeVouchers :
    storeVouchers.filter(v => v.cat === voucherFilter);

  return (
    <div style={{ opacity: animIn ? 1 : 0, transition: "opacity 0.5s ease", paddingTop: 80 }}>
      {/* Header */}
      <div style={{ padding: "0 20px 6px" }}>
        <div style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>JioGames Store</div>
        <div style={{ fontFamily: FONT.body, fontSize: 11, color: C.textDim, marginTop: 2, letterSpacing: 0.3 }}>Powered by JioMart</div>
      </div>

      {/* Sub-tab navigation */}
      <div style={{ display: "flex", gap: 0, padding: "12px 20px 0", borderBottom: `1px solid ${C.border}` }}>
        {subTabs.map(st => {
          const active = subTab === st.id;
          return (
            <button key={st.id} onClick={() => { setSubTab(st.id); setVoucherFilter("all"); }} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
              padding: "8px 0 10px", background: "none", border: "none",
              borderBottom: active ? `2px solid ${C.accent}` : "2px solid transparent",
              cursor: "pointer", transition: "all 0.2s ease",
            }}>
              <div style={{ color: active ? C.accent : C.textDim, display: "flex", alignItems: "center", justifyContent: "center" }}>{st.icon}</div>
              <span style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: active ? 600 : 400, color: active ? C.text : C.textDim, letterSpacing: 0.3 }}>{st.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── HOME TAB ─── */}
      {subTab === "home" && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          {/* Promo banner */}
          <div style={{ margin: "16px 20px 0", borderRadius: 16, overflow: "hidden", position: "relative", height: 130, background: "linear-gradient(135deg, #1b2838 0%, #2a475e 50%, #1b2838 100%)", border: `1px solid ${C.border}` }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px" }}>
              <div style={{ fontFamily: FONT.display, fontSize: 10, fontWeight: 600, color: C.accent, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Steam Spring Sale</div>
              <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>Up to 78% Off</div>
              <div style={{ fontFamily: FONT.body, fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>Refresh your game collection</div>
            </div>
            <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 60, opacity: 0.1, color: "#fff" }}>◎</div>
          </div>

          {/* Recharge Hub */}
          <div style={{ marginTop: 24 }}><SectionTitle action="See All">Recharge Hub</SectionTitle></div>
          <div style={{ display: "flex", gap: 10, padding: "0 20px", overflowX: "auto", scrollbarWidth: "none" }}>
            {[
              { name: "App Store Code", icon: "", color: "#0091ea", amounts: ["₹100", "₹200", "₹500"] },
              { name: "Google Play", icon: "▶", color: "#4caf50", amounts: ["₹100", "₹200", "₹500"] },
              { name: "Steam Wallet", icon: "◎", color: "#1b2838", amounts: ["₹150", "₹250", "₹500"] },
            ].map((item, i) => (
              <div key={i} style={{ flexShrink: 0, width: 140, cursor: "pointer", animation: `fadeUp 0.25s ease ${i * 0.05}s both` }}>
                <div style={{
                  width: 140, height: 100, borderRadius: 14,
                  background: C.card, border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36, color: item.color,
                }}>{item.icon}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: C.text, marginTop: 8 }}>{item.name}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 11, color: C.accent, marginTop: 2, fontWeight: 600 }}>{item.amounts[0]}</div>
              </div>
            ))}
          </div>

          {/* Popular Top-Ups */}
          <div style={{ marginTop: 24 }}><SectionTitle action="See All" onAction={() => setSubTab("topups")}>Popular Top-Ups</SectionTitle></div>
          <div style={{ display: "flex", gap: 10, padding: "0 20px", overflowX: "auto", scrollbarWidth: "none" }}>
            {[
              { name: "156+16 Diamonds", game: "MOBA Legends", price: "₹293", icon: "⚔", color: "#6366f1", badge: "10% Bonus" },
              { name: "BGMI - 60 UC", game: "BGMI", price: "₹75", icon: "🎯", color: "#ff9800" },
              { name: "Valorant 475 VP", game: "Valorant", price: "₹399", icon: "◤", color: "#ff4655" },
            ].map((item, i) => (
              <div key={i} style={{ flexShrink: 0, width: 160, cursor: "pointer", animation: `fadeUp 0.25s ease ${i * 0.05}s both` }}>
                <div style={{
                  width: 160, height: 120, borderRadius: 14, position: "relative", overflow: "hidden",
                  background: `linear-gradient(145deg, ${item.color}25 0%, ${item.color}08 100%)`,
                  border: `1px solid ${item.color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 40, color: item.color,
                }}>
                  {item.icon}
                  {item.badge && (
                    <div style={{ position: "absolute", top: 8, right: 8, padding: "2px 8px", borderRadius: 6, background: C.accent, fontFamily: FONT.body, fontSize: 8, fontWeight: 700, color: "#000", letterSpacing: 0.3 }}>{item.badge}</div>
                  )}
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: C.text, marginTop: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                <div style={{ fontFamily: FONT.display, fontSize: 12, fontWeight: 700, color: C.text, marginTop: 2 }}>{item.price}</div>
              </div>
            ))}
          </div>

          {/* Console Gaming Essentials */}
          <div style={{ marginTop: 24 }}><SectionTitle>Console Gaming Essentials</SectionTitle></div>
          <div style={{ display: "flex", gap: 10, padding: "0 20px", overflowX: "auto", scrollbarWidth: "none" }}>
            {[
              { name: "Rs 1000 PS Wallet Code", icon: "◈", color: "#0070d1", price: "₹1,000" },
              { name: "6 Months Game Pass", icon: "✕", color: "#107c10", price: "₹2,249", badge: "Core" },
              { name: "Rs 500 Nintendo eShop", icon: "◆", color: "#e4000f", price: "₹500" },
            ].map((item, i) => (
              <div key={i} style={{ flexShrink: 0, width: 160, cursor: "pointer", animation: `fadeUp 0.25s ease ${i * 0.05}s both` }}>
                <div style={{
                  width: 160, height: 120, borderRadius: 14, position: "relative", overflow: "hidden",
                  background: C.card, border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 40, color: item.color,
                }}>
                  {item.icon}
                  {item.badge && (
                    <div style={{ position: "absolute", top: 8, right: 8, padding: "2px 8px", borderRadius: 6, background: `${item.color}25`, border: `1px solid ${item.color}40`, fontFamily: FONT.body, fontSize: 8, fontWeight: 700, color: item.color, letterSpacing: 0.3 }}>{item.badge}</div>
                  )}
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: C.text, marginTop: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                <div style={{ fontFamily: FONT.display, fontSize: 12, fontWeight: 700, color: C.text, marginTop: 2 }}>{item.price}</div>
              </div>
            ))}
          </div>

          {/* Platforms You Love */}
          <div style={{ marginTop: 24 }}><SectionTitle>Platforms You Love</SectionTitle></div>
          <div style={{ display: "flex", gap: 14, padding: "0 20px", overflowX: "auto", scrollbarWidth: "none" }}>
            {storeBrands.map((b, i) => (
              <div key={b.id} onClick={() => setSubTab("topups")} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                flexShrink: 0, cursor: "pointer", animation: `fadeUp 0.2s ease ${i * 0.03}s both`,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: C.card, border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, color: b.color,
                }}>{b.icon}</div>
                <span style={{ fontFamily: FONT.body, fontSize: 9, color: C.textDim, fontWeight: 500, whiteSpace: "nowrap" }}>{b.name}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 100 }} />
        </div>
      )}

      {/* ─── TOP-UPS TAB ─── */}
      {subTab === "topups" && (
        <div style={{ animation: "fadeUp 0.25s ease", padding: "16px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {storeTopUps.map((t, i) => (
              <div key={t.id} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                cursor: "pointer", animation: `fadeUp 0.25s ease ${i * 0.04}s both`,
              }}>
                <div style={{
                  width: "100%", aspectRatio: "1", borderRadius: 16,
                  background: `linear-gradient(145deg, ${t.color}20 0%, ${t.color}08 100%)`,
                  border: `1px solid ${t.color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36, color: t.color,
                  position: "relative", overflow: "hidden",
                }}>
                  {t.icon}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 8px 8px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 600, color: "#fff", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 100 }} />
        </div>
      )}

      {/* ─── VOUCHERS TAB ─── */}
      {subTab === "vouchers" && (
        <div style={{ animation: "fadeUp 0.25s ease" }}>
          {/* Filter chips */}
          <div style={{ display: "flex", gap: 8, padding: "14px 20px", overflowX: "auto", scrollbarWidth: "none" }}>
            {[{ id: "all", label: "All" }, { id: "platform", label: "Platform" }, { id: "gift-cards", label: "Gift Cards" }, { id: "games", label: "Games" }].map(f => (
              <button key={f.id} onClick={() => setVoucherFilter(f.id)} style={{
                padding: "6px 16px", borderRadius: 20, flexShrink: 0,
                background: voucherFilter === f.id ? C.accent : "transparent",
                border: voucherFilter === f.id ? "none" : `1px solid ${C.borderLight}`,
                color: voucherFilter === f.id ? "#000" : C.textSec,
                fontFamily: FONT.body, fontSize: 11, fontWeight: voucherFilter === f.id ? 600 : 400,
                cursor: "pointer", letterSpacing: 0.3,
              }}>{f.label}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, padding: "0 20px" }}>
            {filteredVouchers.map((v, i) => (
              <div key={v.id} style={{
                cursor: "pointer", animation: `fadeUp 0.25s ease ${i * 0.04}s both`,
                position: "relative",
              }}>
                <div style={{
                  width: "100%", aspectRatio: "1", borderRadius: 16,
                  background: v.cat === "gift-cards" ? C.surface : C.card,
                  border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: v.cat === "gift-cards" ? 32 : 28, color: v.color,
                  position: "relative", overflow: "hidden",
                }}>
                  {v.icon}
                  {v.discount && (
                    <div style={{
                      position: "absolute", top: 6, left: 6,
                      padding: "2px 7px", borderRadius: 6,
                      background: C.accent, fontFamily: FONT.body,
                      fontSize: 8, fontWeight: 700, color: "#000",
                      letterSpacing: 0.3,
                    }}>{v.discount} Discount</div>
                  )}
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 10, color: C.textSec, marginTop: 6, textAlign: "center", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.name}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 100 }} />
        </div>
      )}

      {/* ─── GAMES TAB ─── */}
      {subTab === "games" && (
        <div style={{ animation: "fadeUp 0.25s ease", padding: "16px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {storePCGames.map((g, i) => {
              const art = getGameArt(g.name);
              return (
                <div key={g.id} style={{
                  borderRadius: 16, overflow: "hidden", cursor: "pointer",
                  background: C.card, border: `1px solid ${C.border}`,
                  animation: `fadeUp 0.25s ease ${i * 0.05}s both`,
                }}>
                  <div style={{
                    width: "100%", aspectRatio: "1", position: "relative",
                    background: `linear-gradient(145deg, ${art.colors[0]}30 0%, ${art.colors[1]}15 50%, ${art.colors[2]}08 100%)`,
                  }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 48, opacity: 0.3, color: art.colors[2],
                      filter: `drop-shadow(0 0 30px ${art.colors[0]})`,
                    }}>{g.icon}</div>
                    {/* Steam badge */}
                    <div style={{
                      position: "absolute", bottom: 8, right: 8,
                      width: 26, height: 26, borderRadius: 8,
                      background: "rgba(27,40,56,0.9)", border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: "#66c0f4",
                    }}>◎</div>
                  </div>
                  <div style={{ padding: "10px 12px 12px" }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{g.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                      <span style={{ fontFamily: FONT.display, fontSize: 13, fontWeight: 700, color: C.text }}>{g.price}</span>
                      <span style={{ fontFamily: FONT.body, fontSize: 10, color: C.textDim, textDecoration: "line-through" }}>{g.original}</span>
                      <span style={{
                        padding: "2px 6px", borderRadius: 4,
                        background: `${C.accent}18`, fontFamily: FONT.body,
                        fontSize: 9, fontWeight: 700, color: C.accent,
                      }}>{g.discount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ height: 100 }} />
        </div>
      )}
    </div>
  );
}

// ─── Collapsible Section ───
function CollapsibleSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ padding: "0 20px", marginBottom: 12 }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "14px 0", background: "none", border: "none", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
        <span style={{ fontFamily: FONT.display, fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: 0.5, textTransform: "uppercase" }}>{title}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2" style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.25s ease" }}><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div style={{ maxHeight: open ? 600 : 0, overflow: "hidden", transition: "max-height 0.35s ease", paddingTop: open ? 12 : 0 }}>{children}</div>
    </div>
  );
}

// ─── Subscribe Screen ───
function SubscribeScreen({ onClose, initialPlan }) {
  const [animIn, setAnimIn] = useState(false);
  const [openPlan, setOpenPlan] = useState(initialPlan != null ? initialPlan : 0);
  useEffect(() => { setTimeout(() => setAnimIn(true), 50); }, []);

  const plans = [
    { name: "Mobile Pass", color: C.accent, desc: "150+ mobile games. No ads. Instant play.", price: "₹99", features: ["150+ Mobile Games", "Ad-Free Gameplay", "No In-App Purchases", "Instant Play on Mobile"] },
    { name: "All Screen Pass", color: C.accent, desc: "Full JioGames catalog across Mobile, PC & Browser.", price: "₹199", features: ["500+ PC Games", "150+ Mobile Games", "Bonus Games — Up to 5 exclusive titles each month", "Access to Ubisoft titles (available on purchase)", "Play across Mobile, PC & Browser"] },
    { name: "Connect & Play Pass", color: C.gold, desc: "Play supported Steam games you already own across devices.", price: "₹299", features: ["Stream 500+ supported games you Own", "Up to 80 hrs Steam Gameplay (Buy extra hours anytime)", "Play on Mobile, Web & TV"] },
  ];

  return (
    <div style={{ opacity: animIn ? 1 : 0, transition: "opacity 0.4s ease" }}>
      <div style={{ position: "relative", height: 200, overflow: "hidden", background: `linear-gradient(180deg, ${C.accent}08 0%, ${C.bg} 100%)` }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, display: "flex", gap: 6, padding: "8px 10px", opacity: 0.25, overflow: "hidden" }}>
          {["Halo Infinite", "FC Mobile", "Rise of Tomb Raider", "God of War", "Minecraft", "Elden Ring", "Dead Cells", "Cyberpunk 2077"].map((t, i) => (
            <div key={i} style={{ minWidth: 60, height: 80, borderRadius: 10, overflow: "hidden" }}><CinematicArt title={t} size="sm" /></div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 24px 24px", textAlign: "center", background: `linear-gradient(180deg, transparent 0%, ${C.bg} 60%)` }}>
          <div style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>Choose your Plan</div>
          <div style={{ fontFamily: FONT.body, fontSize: 13, color: C.textDim, marginTop: 8, lineHeight: 1.5 }}>Game more. Spend less. No ads, no drama.</div>
        </div>
        <button onClick={onClose} style={{ position: "absolute", top: 46, right: 16, zIndex: 10, width: 36, height: 36, borderRadius: 12, background: C.glass, backdropFilter: "blur(12px)", border: `1px solid ${C.glassBorder}`, color: C.textSec, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style={{ padding: "8px 20px" }}>
        {plans.map((plan, i) => {
          const isOpen = openPlan === i;
          const isGold = plan.color === C.gold;
          return (
            <div key={i} style={{ borderRadius: 18, overflow: "hidden", background: isGold ? `linear-gradient(135deg, ${C.gold}08, ${C.card})` : `linear-gradient(135deg, ${C.accent}06, ${C.card})`, border: `1px solid ${isGold ? `${C.gold}15` : `${C.accent}10`}`, marginBottom: 12 }}>
              <button onClick={() => setOpenPlan(isOpen ? -1 : i)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "18px", background: "none", border: "none", cursor: "pointer" }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: FONT.display, fontSize: 17, fontWeight: 800, color: C.text, letterSpacing: 0.3 }}>{plan.name}</div>
                  {!isOpen && <div style={{ fontFamily: FONT.body, fontSize: 11, color: C.textDim, marginTop: 4 }}>{plan.desc}</div>}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s ease", flexShrink: 0, marginLeft: 12 }}><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div style={{ maxHeight: isOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
                <div style={{ padding: "0 18px 20px" }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontFamily: FONT.body, fontSize: 13, color: C.text, lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                  <button style={{ width: "100%", padding: "14px 0", borderRadius: 30, border: "none", background: isGold ? `linear-gradient(135deg, ${C.gold}, ${C.goldMuted})` : `linear-gradient(135deg, ${C.accent}, ${C.accentMuted})`, color: "#000", fontFamily: FONT.display, fontWeight: 700, fontSize: 14, letterSpacing: 0.8, cursor: "pointer", boxShadow: isGold ? `0 4px 20px ${C.goldGlow}` : `0 4px 20px ${C.accentGlow}`, textTransform: "uppercase", marginTop: 4 }}>Starting at {plan.price}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height: 100 }} />
    </div>
  );
}

// ─── Profile Tab ───
function ProfileMenuItem({ icon, label, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: `${color || C.accent}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 15, color: color || C.accent }}>{icon}</span>
      </div>
      <span style={{ flex: 1, fontFamily: FONT.body, fontSize: 14, color: C.textSec, fontWeight: 500 }}>{label}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  );
}

function ProfileTab({ onClose, onSubscribe }) {
  const [animIn, setAnimIn] = useState(false);
  useEffect(() => { setTimeout(() => setAnimIn(true), 60); }, []);

  return (
    <div style={{ opacity: animIn ? 1 : 0, transition: "opacity 0.4s ease", paddingTop: 80 }}>
      <button onClick={onClose} style={{ position: "absolute", top: 46, left: 16, zIndex: 60, width: 36, height: 36, borderRadius: 12, background: C.surface, border: `1px solid ${C.border}`, color: C.textSec, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      {/* Profile header */}
      <div style={{ padding: "0 20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 56, height: 56, borderRadius: 28, background: "linear-gradient(135deg, #8b5cf6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontFamily: FONT.display, fontWeight: 800, color: "#fff", boxShadow: "0 4px 24px rgba(139,92,246,0.25)" }}>NS</div>
        <div>
          <div style={{ fontFamily: FONT.display, fontSize: 18, fontWeight: 800, color: C.text, letterSpacing: 0.5 }}>Nihal Singh</div>
          <div style={{ fontFamily: FONT.body, fontSize: 11, color: C.textDim, marginTop: 2 }}>nihal@jiogames.com</div>
        </div>
      </div>

      {/* My Plans */}
      <CollapsibleSection title="My Plans">
        <div style={{ padding: "4px 0 8px" }}>
          {/* Mobile Pass card */}
          <div style={{
            borderRadius: 16, overflow: "hidden",
            background: `linear-gradient(135deg, ${C.surface} 0%, ${C.card} 100%)`,
            border: `1px solid ${C.border}`, padding: "18px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: `linear-gradient(135deg, ${C.accent}15, ${C.accent}05)`,
                border: `1px solid ${C.accent}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.display, fontSize: 15, fontWeight: 700, color: C.text }}>Mobile Pass</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.textDim }} />
                  <span style={{ fontFamily: FONT.body, fontSize: 11, color: C.textDim, fontWeight: 500 }}>Not Active</span>
                </div>
              </div>
            </div>
            <button onClick={() => onSubscribe && onSubscribe(0)} style={{
              width: "100%", padding: "12px 0", borderRadius: 12, border: "none",
              background: C.accent, color: "#000",
              fontFamily: FONT.display, fontWeight: 700, fontSize: 13,
              letterSpacing: 0.8, cursor: "pointer", textTransform: "uppercase",
              boxShadow: `0 4px 20px ${C.accentGlow}`,
            }}>Subscribe</button>
          </div>
          {/* View other plans */}
          <div onClick={() => onSubscribe && onSubscribe(null)} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "14px 0", cursor: "pointer", marginTop: 4,
          }}>
            <span style={{ fontFamily: FONT.body, fontSize: 12, color: C.accent, fontWeight: 500 }}>View other plans</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      </CollapsibleSection>

      {/* My Address */}
      <CollapsibleSection title="My Address">
        <ProfileMenuItem icon="📍" label="Saved Addresses" color={C.accent} />
      </CollapsibleSection>

      {/* My Orders & Rewards */}
      <CollapsibleSection title="My Orders & Rewards">
        <ProfileMenuItem icon="📦" label="Order History" color={C.accent} />
        <ProfileMenuItem icon="🎫" label="My QR Codes" color={C.accent} />
        <ProfileMenuItem icon="🎁" label="My Rewards" color={C.gold} />
      </CollapsibleSection>

      {/* My Linked Stores */}
      <CollapsibleSection title="My Linked Stores">
        <div style={{ padding: "4px 0" }}>
          {[
            { name: "Steam", icon: "◎", color: "#66c0f4", bgGrad: "#1b2838" },
            { name: "Epic Games", icon: "◆", color: "#fff", bgGrad: "#2a2a2a" },
          ].map((store, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
              borderRadius: 14, marginBottom: 8,
              background: `linear-gradient(135deg, ${store.bgGrad}40, ${store.bgGrad}15)`,
              border: `1px solid ${store.color}12`, cursor: "pointer",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: store.bgGrad, border: `1px solid ${store.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, color: store.color,
              }}>{store.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.display, fontSize: 14, fontWeight: 700, color: C.text }}>{store.name}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 10, color: C.textDim, marginTop: 2 }}>Link your account</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={store.color} strokeWidth="1.5" style={{ opacity: 0.6 }}>
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Esports */}
      <CollapsibleSection title="Esports">
        <ProfileMenuItem icon="🏆" label="My Tournaments" color={C.accent} />
        <ProfileMenuItem icon="👥" label="My Teams" color={C.accent} />
        <ProfileMenuItem icon="⚔" label="Join Tournament" color={C.accent} />
      </CollapsibleSection>

      {/* App Settings */}
      <CollapsibleSection title="App Settings">
        <ProfileMenuItem icon="⚙" label="Settings" color={C.textDim} />
        <ProfileMenuItem icon="🔔" label="Notifications" color={C.textDim} />
        <ProfileMenuItem icon="ℹ" label="Contact Us" color={C.textDim} />
        <ProfileMenuItem icon="🔒" label="Privacy Policy" color={C.accent} />
        <ProfileMenuItem icon="📄" label="Terms & Conditions" color={C.accent} />
      </CollapsibleSection>

      {/* Logout */}
      <div style={{ padding: "16px 20px" }}>
        <div onClick={() => {}} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", cursor: "pointer" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `${C.red}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </div>
          <span style={{ fontFamily: FONT.body, fontSize: 14, color: C.red, fontWeight: 500 }}>Logout</span>
        </div>
      </div>
      <div style={{ height: 100 }} />
    </div>
  );
}

// ─── MAIN APP ───
function JioGamesApp() {
  const [tab, setTab] = useState("mobile");
  const [selectedGame, setSelectedGame] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [subscribePlan, setSubscribePlan] = useState(null);
  const scrollRef = useRef(null);

  const handleNav = (id) => {
    setTab(id);
    setSelectedGame(null);
    setShowSearch(false);
    setSubscribePlan(null);
    scrollRef.current?.scrollTo(0, 0);
  };

  const handleSubscribeFromGame = (planIndex) => {
    setSelectedGame(null);
    setTab("subscribe");
    setSubscribePlan(planIndex);
    scrollRef.current?.scrollTo(0, 0);
  };

  const handleGameSelect = (game) => {
    setSelectedGame({ ...game, passType: game.passType || tab });
    setShowSearch(false);
    scrollRef.current?.scrollTo(0, 0);
  };

  return (
    <div style={{
      width: "100%", maxWidth: 393, margin: "0 auto",
      height: "100vh", maxHeight: 852,
      background: C.bg, color: C.text,
      position: "relative", overflow: "hidden",
      borderRadius: 44, border: "1px solid rgba(255,255,255,0.03)",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 32px 100px rgba(0,0,0,0.9)",
      fontFamily: FONT.body,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        button { font-family: ${FONT.body}; }
        button:hover { opacity: 0.9; }
      `}</style>

      {/* Status bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 28px 0", fontSize: 13, fontWeight: 600, color: C.text, fontFamily: FONT.body, zIndex: 60 }}>
        <span>5:35</span>
        <div style={{ width: 115, height: 30, borderRadius: 16, background: "#000", margin: "0 auto", position: "relative", top: -1 }} />
        <div style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 11, color: C.textSec }}>
          <span style={{ fontFamily: FONT.mono, fontSize: 10, fontWeight: 500, letterSpacing: 0.5 }}>5G</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="10" x2="23" y2="14"/></svg>
        </div>
      </div>

      {showSearch && (
        <SearchOverlay onClose={() => setShowSearch(false)} onSelect={handleGameSelect} context={tab} />
      )}

      <div ref={scrollRef} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflowY: "auto", overflowX: "hidden", paddingBottom: 68 }}>
        {(tab === "mobile" || tab === "allscreen" || tab === "store") && !selectedGame && (
          <div style={{ position: "relative", zIndex: 50, padding: "46px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <JioLogo />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={() => setShowSearch(true)} style={{ width: 36, height: 36, borderRadius: 12, background: C.glass, backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.glassBorder}`, cursor: "pointer", color: C.textSec }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
              <button onClick={() => handleNav("subscribe")} style={{ padding: "8px 14px", borderRadius: 8, background: `linear-gradient(135deg, ${C.gold}15, ${C.gold}08)`, border: `1px solid ${C.gold}20`, fontFamily: FONT.display, fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 0.8, cursor: "pointer", textTransform: "uppercase" }}>Subscribe</button>
              <button onClick={() => handleNav("profile")} style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #8b5cf6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(139,92,246,0.3)", cursor: "pointer", color: "#fff", fontFamily: FONT.display, fontSize: 13, fontWeight: 800, letterSpacing: 1 }}>N</button>
            </div>
          </div>
        )}
        {selectedGame ? (
          <GameDetailPage game={selectedGame} onClose={() => setSelectedGame(null)} passType={selectedGame.passType || tab} onSubscribe={handleSubscribeFromGame} onGameSelect={handleGameSelect} />
        ) : (
          <>
            {tab === "mobile" && <MobileTab onGameSelect={handleGameSelect} />}
            {tab === "allscreen" && <AllScreenTab onGameSelect={handleGameSelect} />}
            {tab === "store" && <StoreTab />}
            {tab === "profile" && <ProfileTab onClose={() => handleNav("mobile")} onSubscribe={(plan) => { setTab("subscribe"); setSubscribePlan(plan); scrollRef.current?.scrollTo(0, 0); }} />}
            {tab === "subscribe" && <SubscribeScreen onClose={() => handleNav("mobile")} initialPlan={subscribePlan} />}
          </>
        )}
      </div>

      {tab !== "subscribe" && tab !== "profile" && <BottomNav active={tab} onNav={handleNav} />}
    </div>
  );
}

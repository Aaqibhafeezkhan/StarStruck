# Contributing to StarStruck ✨

First off, thank you for considering contributing to **StarStruck**! We welcome all contributions, whether it's adding your favorite IDE theme, designing a new card style, or polishing the documentation.

---

## 🎨 Quickest Contribution: Add a Theme in 3 Minutes

Adding a new color palette is the easiest way to make your first open-source contribution to this project!

### Step 1: Open `src/themes/index.js`

Add your color palette object:

```javascript
export const rosePine = {
  id: "rose-pine",
  name: "Rosé Pine",
  bg: "#191724",
  cardBg: "#1f1d2e",
  border: "#403d52",
  primary: "#ebbcba",
  secondary: "#9ccfd8",
  accent: "#f6c177",
  warning: "#eb6f92",
  text: "#e0def4",
  mutedText: "#6e6a86",
  terminalHeader: "#13111b",
  glow: "rgba(235, 188, 186, 0.45)"
};
```

### Step 2: Register it in the `themes` object

```javascript
export const themes = {
  dracula,
  synthwave,
  "tokyo-night": tokyoNight,
  // ...
  "rose-pine": rosePine
};
```

### Step 3: Test and Preview

Run the demo generator to see how your theme looks on all cards:

```bash
npm test
node bin/cli.js demo
```

Inspect the generated SVGs in `examples/`. If they look great, commit and open a Pull Request!

---

## 🎴 Designing a New Card Layout

Want to build a new card widget (e.g., LeetCode stats, Spotify card, Language radar)?
1. Create your card in `src/cards/yourCard.js`.
2. Follow the pattern used in `rpgCard.js` or `terminalCard.js` using `renderSvgWrapper()`.
3. Register your card type in `src/index.js` under `CARD_TYPES`.
4. Add a test in `tests/generator.test.js`.

---

## 🛠️ Development Setup

```bash
# 1. Fork the repo and clone your fork:
git clone https://github.com/<your-username>/StarStruck.git
cd StarStruck

# 2. Run tests:
npm test

# 3. Test the CLI locally:
node bin/cli.js generate -u octocat -c rpg -t synthwave
```

---

## 📜 Code of Conduct

Be kind, respectful, and encouraging to fellow developers! We celebrate all levels of contributors.

export const dracula = {
  id: "dracula",
  name: "Dracula",
  bg: "#282a36",
  cardBg: "#21222c",
  border: "#6272a4",
  primary: "#ff79c6",
  secondary: "#bd93f9",
  accent: "#50fa7b",
  warning: "#f1fa8c",
  text: "#f8f8f2",
  mutedText: "#6272a4",
  terminalHeader: "#191a21",
  glow: "rgba(189, 147, 249, 0.45)"
};

export const synthwave = {
  id: "synthwave",
  name: "Synthwave '84",
  bg: "#241734",
  cardBg: "#1a1025",
  border: "#fe4450",
  primary: "#ff7edb",
  secondary: "#36f9f6",
  accent: "#fede5d",
  warning: "#fe4450",
  text: "#f3e7fc",
  mutedText: "#8d79a5",
  terminalHeader: "#120a1b",
  glow: "rgba(255, 126, 219, 0.55)"
};

export const tokyoNight = {
  id: "tokyo-night",
  name: "Tokyo Night",
  bg: "#1a1b26",
  cardBg: "#16161e",
  border: "#292e42",
  primary: "#7aa2f7",
  secondary: "#bb9af7",
  accent: "#7dcfff",
  warning: "#e0af68",
  text: "#c0caf5",
  mutedText: "#565f89",
  terminalHeader: "#13141c",
  glow: "rgba(122, 162, 247, 0.45)"
};

export const catppuccin = {
  id: "catppuccin",
  name: "Catppuccin Mocha",
  bg: "#1e1e2e",
  cardBg: "#181825",
  border: "#313244",
  primary: "#cba6f7",
  secondary: "#89b4fa",
  accent: "#a6e3a1",
  warning: "#fab387",
  text: "#cdd6f4",
  mutedText: "#6c7086",
  terminalHeader: "#11111b",
  glow: "rgba(203, 166, 247, 0.45)"
};

export const nord = {
  id: "nord",
  name: "Nord",
  bg: "#2e3440",
  cardBg: "#242933",
  border: "#434c5e",
  primary: "#88c0d0",
  secondary: "#81a1c1",
  accent: "#a3be8c",
  warning: "#ebcb8b",
  text: "#eceff4",
  mutedText: "#4c566a",
  terminalHeader: "#1f232b",
  glow: "rgba(136, 192, 208, 0.4)"
};

export const matrix = {
  id: "matrix",
  name: "The Matrix",
  bg: "#0d1117",
  cardBg: "#050806",
  border: "#00ff66",
  primary: "#00ff66",
  secondary: "#00cc55",
  accent: "#39ff14",
  warning: "#aaff00",
  text: "#c8e6c9",
  mutedText: "#2e7d32",
  terminalHeader: "#020403",
  glow: "rgba(0, 255, 102, 0.55)"
};

export const cyberpunk = {
  id: "cyberpunk",
  name: "Cyberpunk 2077",
  bg: "#0b0e14",
  cardBg: "#121721",
  border: "#fcee0a",
  primary: "#fcee0a",
  secondary: "#00f0ff",
  accent: "#ff003c",
  warning: "#fcee0a",
  text: "#e0f8ff",
  mutedText: "#52627a",
  terminalHeader: "#070a0e",
  glow: "rgba(252, 238, 10, 0.5)"
};

export const oneDark = {
  id: "one-dark",
  name: "One Dark Pro",
  bg: "#282c34",
  cardBg: "#21252b",
  border: "#3b4048",
  primary: "#61afef",
  secondary: "#c678dd",
  accent: "#98c379",
  warning: "#e5c07b",
  text: "#abb2bf",
  mutedText: "#5c6370",
  terminalHeader: "#1b1d23",
  glow: "rgba(97, 175, 239, 0.4)"
};

export const solarizedDark = {
  id: "solarized-dark",
  name: "Solarized Dark",
  bg: "#002b36",
  cardBg: "#073642",
  border: "#586e75",
  primary: "#268bd2",
  secondary: "#2aa198",
  accent: "#859900",
  warning: "#b58900",
  text: "#839496",
  mutedText: "#586e75",
  terminalHeader: "#00212b",
  glow: "rgba(38, 139, 210, 0.45)"
};

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

export const themes = {
  dracula,
  synthwave,
  "tokyo-night": tokyoNight,
  catppuccin,
  nord,
  matrix,
  cyberpunk,
  "one-dark": oneDark,
  "solarized-dark": solarizedDark,
  "rose-pine": rosePine
};

export function getTheme(themeName = "dracula") {
  const normalized = String(themeName).toLowerCase().trim();
  return themes[normalized] || themes.dracula;
}

export function listThemes() {
  return Object.keys(themes);
}

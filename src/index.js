import { getTheme, listThemes, themes } from "./themes/index.js";
import { fetchGitHubStats, getMockStats } from "./fetcher/github.js";
import { calculateRank } from "./utils/calculateRank.js";
import { renderRpgCard } from "./cards/rpgCard.js";
import { renderTerminalCard } from "./cards/terminalCard.js";
import { renderStatsCard } from "./cards/statsCard.js";
import { renderStreakCard } from "./cards/streakCard.js";

export const CARD_TYPES = {
  rpg: renderRpgCard,
  terminal: renderTerminalCard,
  stats: renderStatsCard,
  streak: renderStreakCard,
};

export async function generateCard({
  type = "rpg",
  username = "octocat",
  theme: themeName = "dracula",
  token,
  hideWatermark = false,
  repoUrl = "https://github.com/AkulTyagi/StarStruck",
  customStats = null,
  isDemo = false
} = {}) {
  const cardRenderer = CARD_TYPES[type.toLowerCase()] || CARD_TYPES.rpg;
  const theme = getTheme(themeName);

  let stats;
  if (customStats) {
    stats = customStats;
  } else if (isDemo) {
    stats = getMockStats(username);
  } else {
    stats = await fetchGitHubStats(username, token);
  }

  const svg = cardRenderer(stats, theme, {
    repoUrl,
    hideWatermark
  });

  return {
    svg,
    stats,
    theme,
    type
  };
}

export {
  getTheme,
  listThemes,
  themes,
  fetchGitHubStats,
  getMockStats,
  calculateRank,
  renderRpgCard,
  renderTerminalCard,
  renderStatsCard,
  renderStreakCard
};

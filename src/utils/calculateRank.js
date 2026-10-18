import { clamp } from "./formatters.js";

const RANKS = [
  { minLevel: 1, title: "Novice Scripter", icon: "🌱" },
  { minLevel: 6, title: "Code Apprentice", icon: "📜" },
  { minLevel: 12, title: "Byte Weaver", icon: "🧵" },
  { minLevel: 20, title: "Git Vanguard", icon: "🛡️" },
  { minLevel: 30, title: "Bugbane Hunter", icon: "🏹" },
  { minLevel: 45, title: "Full-Stack Sorcerer", icon: "🔮" },
  { minLevel: 60, title: "Kernel Paladin", icon: "⚔️" },
  { minLevel: 75, title: "Void Architect", icon: "🌌" },
  { minLevel: 90, title: "Legendary Code Sage", icon: "🧙‍♂️" },
  { minLevel: 100, title: "Mythic Grandmaster", icon: "👑" },
];

export function calculateRank(stats = {}) {
  const commits = Number(stats.totalCommits || 0);
  const stars = Number(stats.totalStars || 0);
  const prs = Number(stats.totalPRs || 0);
  const repos = Number(stats.publicRepos || 0);
  const followers = Number(stats.followers || 0);
  const streak = Number(stats.currentStreak || 0);

  // Gamified XP formula:
  const totalXp = Math.floor(
    commits * 3 +
    stars * 12 +
    prs * 18 +
    repos * 10 +
    followers * 5 +
    streak * 8
  );

  // Level curve: Level N requires 15 * N^1.75 XP
  // Solve approximately or via level boundaries:
  let level = 1;
  while (calculateLevelXp(level + 1) <= totalXp && level < 150) {
    level++;
  }

  const currentLevelBaseXp = calculateLevelXp(level);
  const nextLevelXp = calculateLevelXp(level + 1);
  const levelDiff = nextLevelXp - currentLevelBaseXp;
  const currentProgressXp = totalXp - currentLevelBaseXp;
  const progressPercent = levelDiff > 0 ? clamp(Math.round((currentProgressXp / levelDiff) * 100), 2, 100) : 100;

  // Find Rank Title
  let currentRank = RANKS[0];
  for (const rank of RANKS) {
    if (level >= rank.minLevel) {
      currentRank = rank;
    }
  }

  // Badges earned
  const badges = [];
  if (stars >= 16) badges.push({ name: "Starstruck", icon: "⭐" });
  if (commits >= 100) badges.push({ name: "Century Committer", icon: "⚡" });
  if (prs >= 10) badges.push({ name: "PR Machine", icon: "🚀" });
  if (streak >= 7) badges.push({ name: "Streak Keeper", icon: "🔥" });
  if (repos >= 10) badges.push({ name: "Repo Hoarder", icon: "📦" });

  return {
    level,
    title: currentRank.title,
    icon: currentRank.icon,
    totalXp,
    currentProgressXp,
    levelDiff,
    progressPercent,
    badges
  };
}

function calculateLevelXp(level) {
  if (level <= 1) return 0;
  return Math.floor(25 * Math.pow(level, 1.8));
}

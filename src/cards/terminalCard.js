import { formatNumber, escapeXml } from "../utils/formatters.js";
import { calculateRank } from "../utils/calculateRank.js";
import { renderSvgWrapper } from "../utils/svgHelpers.js";

export function renderTerminalCard(stats, theme, options = {}) {
  const width = 540;
  const height = 270;
  const rank = calculateRank(stats);

  const username = escapeXml(stats.username);
  const title = escapeXml(rank.title);
  const level = rank.level;
  const stars = formatNumber(stats.totalStars);
  const commits = formatNumber(stats.totalCommits);
  const prs = formatNumber(stats.totalPRs);
  const streak = stats.currentStreak || 0;

  // Language list string
  const langs = (stats.topLanguages || [])
    .slice(0, 3)
    .map((l) => l.name)
    .join(", ") || "TypeScript, Rust, Python";

  // ASCII Progress Bar
  const totalBlocks = 12;
  const filledBlocks = Math.round((rank.progressPercent / 100) * totalBlocks);
  const emptyBlocks = Math.max(0, totalBlocks - filledBlocks);
  const asciiBar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  const content = `
    <!-- Terminal Header Window Bar -->
    <rect x="1" y="1" width="${width - 2}" height="32" rx="16" fill="${theme.terminalHeader}" />
    <!-- Fix rounded bottom on header -->
    <rect x="1" y="16" width="${width - 2}" height="16" fill="${theme.terminalHeader}" />

    <!-- Terminal Window Controls -->
    <g transform="translate(18, 12)">
      <circle cx="0" cy="5" r="5" fill="#ff5f56" />
      <circle cx="16" cy="5" r="5" fill="#ffbd2e" />
      <circle cx="32" cy="5" r="5" fill="#27c93f" />
    </g>

    <!-- Terminal Title -->
    <text x="${width / 2}" y="21" text-anchor="middle" class="text-muted mono" font-size="11" font-weight="500">
      ${username}@starstruck: ~ (zsh)
    </text>

    <!-- Terminal Body -->
    <g transform="translate(26, 52)" class="mono">
      <!-- Left Column: Stylized Terminal Logo -->
      <g transform="translate(4, 10)">
        <rect width="64" height="64" rx="12" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.5" />
        <text x="32" y="38" text-anchor="middle" fill="${theme.primary}" font-size="28" font-weight="800">&gt;_</text>
        <text x="32" y="54" text-anchor="middle" fill="${theme.accent}" font-size="9" font-weight="700">DEV</text>
      </g>

      <!-- Right Column: Neofetch Output -->
      <g transform="translate(90, 0)">
        <text x="0" y="16" font-size="13" font-weight="700" fill="${theme.primary}">
          ${username}<tspan fill="${theme.mutedText}">@github</tspan>
        </text>
        <line x1="0" y1="24" x2="390" y2="24" stroke="${theme.border}" stroke-width="1" stroke-dasharray="3 3" />

        <g transform="translate(0, 42)" font-size="12">
          <text x="0" y="0" fill="${theme.secondary}" font-weight="600">ROLE:</text>
          <text x="80" y="0" fill="${theme.text}">${rank.icon} ${title}</text>

          <text x="0" y="20" fill="${theme.secondary}" font-weight="600">LEVEL:</text>
          <text x="80" y="20" fill="${theme.accent}">${level} <tspan fill="${theme.primary}">${asciiBar}</tspan> <tspan fill="${theme.mutedText}">(${rank.progressPercent}%)</tspan></text>

          <text x="0" y="40" fill="${theme.secondary}" font-weight="600">STARS:</text>
          <text x="80" y="40" fill="${theme.text}">${stars} ⭐ <tspan fill="${theme.mutedText}">(PRs: ${prs} 🚀)</tspan></text>

          <text x="0" y="60" fill="${theme.secondary}" font-weight="600">COMMITS:</text>
          <text x="80" y="60" fill="${theme.text}">${commits} ⚡ <tspan fill="${theme.mutedText}">(Streak: ${streak}d 🔥)</tspan></text>

          <text x="0" y="80" fill="${theme.secondary}" font-weight="600">LANGS:</text>
          <text x="80" y="80" fill="${theme.text}">${escapeXml(langs)}</text>

          <text x="0" y="102" fill="${theme.primary}" font-weight="700">&gt;</text>
          <text x="14" y="102" fill="${theme.accent}">Ready to ship.<tspan class="cursor" fill="${theme.primary}">█</tspan></text>
        </g>
      </g>
    </g>
  `;

  return renderSvgWrapper({
    width,
    height,
    content,
    theme,
    repoUrl: options.repoUrl,
    hideWatermark: options.hideWatermark
  });
}

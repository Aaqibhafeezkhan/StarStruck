import { formatNumber, escapeXml } from "../utils/formatters.js";
import { calculateRank } from "../utils/calculateRank.js";
import { renderSvgWrapper } from "../utils/svgHelpers.js";

export function renderRpgCard(stats, theme, options = {}) {
  const width = 540;
  const height = 260;
  const rank = calculateRank(stats);

  const name = escapeXml(stats.name || stats.username);
  const username = escapeXml(stats.username);
  const title = escapeXml(rank.title);
  const level = rank.level;
  const progressPercent = rank.progressPercent;
  const totalXp = formatNumber(rank.totalXp);
  const currentLevelXp = formatNumber(rank.currentProgressXp);
  const nextLevelXp = formatNumber(rank.levelDiff);

  const stars = formatNumber(stats.totalStars);
  const commits = formatNumber(stats.totalCommits);
  const prs = formatNumber(stats.totalPRs);
  const repos = formatNumber(stats.publicRepos);

  // Badges rendering
  const badgesHtml = rank.badges
    .slice(0, 3)
    .map((b, i) => {
      const x = 32 + i * 155;
      return `
        <g transform="translate(${x}, 205)">
          <rect width="145" height="26" rx="8" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
          <text x="12" y="17" class="text-body" font-size="12">${b.icon}</text>
          <text x="32" y="17" class="text-subtitle" font-size="11" font-weight="600">${escapeXml(b.name)}</text>
        </g>
      `;
    })
    .join("");

  const content = `
    <!-- Header: Avatar Crest & Title -->
    <g transform="translate(30, 28)">
      <!-- Level Crest Badge -->
      <g transform="translate(0, 2)">
        <circle cx="28" cy="28" r="28" fill="${theme.cardBg}" stroke="url(#accentGrad)" stroke-width="2.5" filter="url(#glow)" />
        <text x="28" y="24" text-anchor="middle" class="text-muted" font-size="9" font-weight="700">LVL</text>
        <text x="28" y="42" text-anchor="middle" class="text-title" font-size="18" font-weight="800">${level}</text>
      </g>

      <!-- Player Info -->
      <g transform="translate(72, 14)">
        <text x="0" y="16" class="text-title" font-size="18">${name} <tspan class="text-muted" font-size="13" font-weight="400">@${username}</tspan></text>
        <g transform="translate(0, 26)">
          <text x="0" y="12" class="text-subtitle" font-size="13" font-weight="600">${rank.icon} ${title}</text>
          <text x="380" y="12" text-anchor="end" class="text-muted mono" font-size="11">XP: ${currentLevelXp} / ${nextLevelXp} (${progressPercent}%)</text>
        </g>
      </g>
    </g>

    <!-- XP Progress Bar -->
    <g transform="translate(32, 98)">
      <rect width="476" height="10" rx="5" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1" />
      <rect width="${Math.max(12, Math.floor((476 * progressPercent) / 100))}" height="10" rx="5" fill="url(#xpGrad)" filter="url(#glow)" />
    </g>

    <!-- Stat Grid Bento -->
    <g transform="translate(32, 122)">
      <!-- Stars -->
      <g transform="translate(0, 0)">
        <rect width="112" height="66" rx="10" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1" />
        <text x="14" y="26" font-size="14">⭐</text>
        <text x="36" y="26" class="text-muted" font-size="11" font-weight="600">STARS</text>
        <text x="14" y="52" class="text-title mono" font-size="20">${stars}</text>
      </g>

      <!-- Commits -->
      <g transform="translate(121, 0)">
        <rect width="112" height="66" rx="10" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1" />
        <text x="14" y="26" font-size="14">⚡</text>
        <text x="36" y="26" class="text-muted" font-size="11" font-weight="600">COMMITS</text>
        <text x="14" y="52" class="text-title mono" font-size="20">${commits}</text>
      </g>

      <!-- PRs -->
      <g transform="translate(242, 0)">
        <rect width="112" height="66" rx="10" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1" />
        <text x="14" y="26" font-size="14">🚀</text>
        <text x="36" y="26" class="text-muted" font-size="11" font-weight="600">PRS</text>
        <text x="14" y="52" class="text-title mono" font-size="20">${prs}</text>
      </g>

      <!-- Repos -->
      <g transform="translate(363, 0)">
        <rect width="113" height="66" rx="10" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1" />
        <text x="14" y="26" font-size="14">📦</text>
        <text x="36" y="26" class="text-muted" font-size="11" font-weight="600">REPOS</text>
        <text x="14" y="52" class="text-title mono" font-size="20">${repos}</text>
      </g>
    </g>

    <!-- Badges Container -->
    ${badgesHtml}
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

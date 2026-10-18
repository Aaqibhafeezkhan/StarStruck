import { formatNumber, escapeXml } from "../utils/formatters.js";
import { calculateRank } from "../utils/calculateRank.js";
import { renderSvgWrapper } from "../utils/svgHelpers.js";

export function renderStatsCard(stats, theme, options = {}) {
  const width = 500;
  const height = 230;
  const rank = calculateRank(stats);

  const name = escapeXml(stats.name || stats.username);
  const username = escapeXml(stats.username);
  const stars = formatNumber(stats.totalStars);
  const commits = formatNumber(stats.totalCommits);
  const prs = formatNumber(stats.totalPRs);
  const repos = formatNumber(stats.publicRepos);
  const followers = formatNumber(stats.followers);

  const content = `
    <!-- Header -->
    <g transform="translate(28, 24)">
      <text x="0" y="18" class="text-title" font-size="18">${name} <tspan class="text-muted" font-size="13" font-weight="400">@${username}</tspan></text>
      <text x="0" y="38" class="text-subtitle" font-size="12" font-weight="600">${rank.icon} ${escapeXml(rank.title)} · Level ${rank.level}</text>
    </g>

    <!-- Bento Grid Container -->
    <g transform="translate(28, 76)">
      <!-- Box 1: Stars -->
      <g transform="translate(0, 0)">
        <rect width="104" height="110" rx="14" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.2" />
        <circle cx="28" cy="28" r="14" fill="${theme.bg}" />
        <text x="28" y="33" text-anchor="middle" font-size="13">⭐</text>
        <text x="16" y="74" class="text-title mono" font-size="22">${stars}</text>
        <text x="16" y="94" class="text-muted" font-size="11" font-weight="600">STARS</text>
      </g>

      <!-- Box 2: Commits -->
      <g transform="translate(114, 0)">
        <rect width="104" height="110" rx="14" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.2" />
        <circle cx="28" cy="28" r="14" fill="${theme.bg}" />
        <text x="28" y="33" text-anchor="middle" font-size="13">⚡</text>
        <text x="16" y="74" class="text-title mono" font-size="22">${commits}</text>
        <text x="16" y="94" class="text-muted" font-size="11" font-weight="600">COMMITS</text>
      </g>

      <!-- Box 3: PRs -->
      <g transform="translate(228, 0)">
        <rect width="104" height="110" rx="14" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.2" />
        <circle cx="28" cy="28" r="14" fill="${theme.bg}" />
        <text x="28" y="33" text-anchor="middle" font-size="13">🚀</text>
        <text x="16" y="74" class="text-title mono" font-size="22">${prs}</text>
        <text x="16" y="94" class="text-muted" font-size="11" font-weight="600">PRS</text>
      </g>

      <!-- Box 4: Repos & Followers -->
      <g transform="translate(342, 0)">
        <rect width="102" height="110" rx="14" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.2" />
        <circle cx="28" cy="28" r="14" fill="${theme.bg}" />
        <text x="28" y="33" text-anchor="middle" font-size="13">📦</text>
        <text x="16" y="74" class="text-title mono" font-size="22">${repos}</text>
        <text x="16" y="94" class="text-muted" font-size="11" font-weight="600">REPOS</text>
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

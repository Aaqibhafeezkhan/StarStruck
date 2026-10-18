import { formatNumber, escapeXml } from "../utils/formatters.js";
import { renderSvgWrapper } from "../utils/svgHelpers.js";

export function renderStreakCard(stats, theme, options = {}) {
  const width = 480;
  const height = 195;

  const currentStreak = stats.currentStreak || 0;
  const totalCommits = formatNumber(stats.totalCommits || 0);
  const username = escapeXml(stats.username);

  // Decorative activity dots
  const dots = Array.from({ length: 14 }).map((_, i) => {
    const x = i * 22;
    const isLit = i < (currentStreak % 14 || 7);
    const fill = isLit ? theme.accent : theme.cardBg;
    const stroke = isLit ? theme.primary : theme.border;
    return `<circle cx="${x + 6}" cy="6" r="5" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />`;
  }).join("");

  const content = `
    <!-- Flame Badge & Main Streak -->
    <g transform="translate(32, 28)">
      <!-- Flame Icon Frame -->
      <g transform="translate(0, 4)">
        <circle cx="34" cy="34" r="34" fill="${theme.cardBg}" stroke="${theme.primary}" stroke-width="2" filter="url(#glow)" />
        <text x="34" y="44" text-anchor="middle" font-size="32">🔥</text>
      </g>

      <!-- Streak Text -->
      <g transform="translate(86, 10)">
        <text x="0" y="24" class="text-title mono" font-size="34" font-weight="800">
          ${currentStreak} <tspan font-size="16" class="text-subtitle" font-weight="600">DAYS</tspan>
        </text>
        <text x="0" y="48" class="text-muted" font-size="13" font-weight="600">
          CURRENT COMMIT STREAK · @${username}
        </text>
      </g>
    </g>

    <!-- Sub-stats & Dots Bar -->
    <g transform="translate(32, 120)">
      <line x1="0" y1="0" x2="416" y2="0" stroke="${theme.border}" stroke-width="1" />
      <g transform="translate(0, 16)">
        <text x="0" y="12" class="text-subtitle" font-size="12" font-weight="600">Active Cycle</text>
        <!-- Activity Dots -->
        <g transform="translate(90, 4)">
          ${dots}
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

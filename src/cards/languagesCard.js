import { escapeXml } from "../utils/formatters.js";
import { renderSvgWrapper } from "../utils/svgHelpers.js";

const LANGUAGE_COLORS = {
  "1c-enterprise": "#814CCC", abap: "#E8274B", ada: "#02f88c", apl: "#5A8164",
  assembly: "#6E4C13", awk: "#c30e9b", c: "#555555", "c#": "#178600",
  "c++": "#f34b7d", clojure: "#db5855", coffeescript: "#244776", crystal: "#000100",
  css: "#563d7c", cuda: "#3A4E3A", dart: "#00B4AB", dockerfile: "#384d54",
  elixir: "#6e4a7e", elm: "#60B5CC", erlang: "#B83998", fortran: "#4d41b1",
  fsharp: "#b845fc", go: "#00ADD8", graphql: "#e10098", groovy: "#4298b8",
  haskell: "#5e5086", html: "#e34c26", java: "#b07219", javascript: "#f1e05a",
  julia: "#a270ba", kotlin: "#A97BFF", lua: "#000080", makefile: "#427819",
  matlab: "#e16737", objectivec: "#438eff", ocaml: "#ef7a08", perl: "#0298c3",
  php: "#4F5D95", powershell: "#012456", python: "#3572A5", r: "#198CE7",
  ruby: "#701516", rust: "#dea584", scala: "#c22d40", shell: "#89e051",
  solidity: "#AA6746", sql: "#e38c00", svelte: "#ff3e00", swift: "#F05138",
  typescript: "#3178c6", vue: "#41b883", wasm: "#04133b", zig: "#ec915c"
};

function getLanguageEntries(topLanguages = []) {
  if (!Array.isArray(topLanguages)) return [];
  return topLanguages
    .filter((language) => language && typeof language.name === "string" && language.name.trim())
    .map((language) => ({
      name: language.name.trim(),
      count: Number.isFinite(Number(language.count)) ? Math.max(0, Number(language.count)) : 0
    }))
    .filter((language) => language.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export function renderLanguagesCard(stats, theme, options = {}) {
  const width = 520;
  const height = 290;
  const username = escapeXml(stats.username || "developer");
  const languages = getLanguageEntries(stats.topLanguages);
  const total = languages.reduce((sum, language) => sum + language.count, 0);

  const rows = languages.length
    ? languages.map((language, index) => {
      const percentage = (language.count / total) * 100;
      const displayPercentage = percentage.toFixed(1).replace(/\.0$/, "");
      const y = 104 + index * 34;
      const color = LANGUAGE_COLORS[language.name.toLowerCase()] || theme.primary;
      const barWidth = Math.max(0, Math.min(100, percentage)) * 4.44;
      return `
        <g transform="translate(0, ${y})">
          <circle cx="7" cy="-4" r="4" fill="${color}" />
          <text x="20" y="0" class="text-body" font-size="12" font-weight="600">${escapeXml(language.name)}</text>
          <text x="464" y="0" class="text-muted mono" text-anchor="end" font-size="11">${displayPercentage}%</text>
          <rect x="20" y="8" width="444" height="7" rx="3.5" fill="${theme.cardBg}" />
          <rect x="20" y="8" width="${barWidth}" height="7" rx="3.5" fill="${color}" />
        </g>
      `;
    }).join("")
    : `<text x="250" y="154" text-anchor="middle" class="text-muted" font-size="13">No language data available yet</text>`;

  const content = `
    <g transform="translate(28, 26)">
      <text x="0" y="18" class="text-title" font-size="18">Top Languages</text>
      <text x="0" y="39" class="text-muted" font-size="11">LANGUAGE BREAKDOWN · @${username}</text>
      <line x1="0" y1="55" x2="464" y2="55" stroke="${theme.border}" stroke-width="1" />
      ${rows}
      <text x="0" y="252" class="text-muted" font-size="10">Based on repository language counts</text>
    </g>
  `;
  return renderSvgWrapper({
    width, height, content, theme,
    repoUrl: options.repoUrl,
    hideWatermark: options.hideWatermark
  });
}

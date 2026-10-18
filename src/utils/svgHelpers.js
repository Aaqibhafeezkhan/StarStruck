export function renderSvgWrapper({
  width = 500,
  height = 250,
  content = "",
  theme,
  styles = "",
  repoUrl = "https://github.com/AkulTyagi/StarStruck",
  hideWatermark = false
}) {
  const watermark = hideWatermark
    ? ""
    : `
      <g transform="translate(${width - 120}, ${height - 18})">
        <a href="${repoUrl}" target="_blank">
          <text class="watermark" x="0" y="0">⚡ StarStruck</text>
        </a>
      </g>
    `;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="GitHub Profile Card">
  <defs>
    <!-- Soft Glow Filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Card Background Gradient -->
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.cardBg}" stop-opacity="0.95" />
      <stop offset="100%" stop-color="${theme.bg}" stop-opacity="0.98" />
    </linearGradient>

    <!-- Accent Gradient -->
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.primary}" />
      <stop offset="100%" stop-color="${theme.secondary}" />
    </linearGradient>

    <!-- XP Bar Gradient -->
    <linearGradient id="xpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.secondary}" />
      <stop offset="50%" stop-color="${theme.primary}" />
      <stop offset="100%" stop-color="${theme.accent}" />
    </linearGradient>
  </defs>

  <style>
    .card-bg {
      fill: url(#cardGrad);
      stroke: ${theme.border};
      stroke-width: 1.5;
      rx: 16;
    }
    .text-title {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-weight: 700;
      fill: ${theme.primary};
      letter-spacing: -0.2px;
    }
    .text-subtitle {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-weight: 500;
      fill: ${theme.secondary};
    }
    .text-body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-weight: 400;
      fill: ${theme.text};
    }
    .text-muted {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-weight: 400;
      fill: ${theme.mutedText};
    }
    .mono {
      font-family: "JetBrains Mono", "Fira Code", "Courier New", monospace;
    }
    .watermark {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      font-weight: 600;
      fill: ${theme.mutedText};
      opacity: 0.65;
      transition: opacity 0.2s ease;
    }
    .watermark:hover {
      opacity: 1;
      fill: ${theme.primary};
    }
    @keyframes pulse {
      0% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
      100% { opacity: 0.7; transform: scale(1); }
    }
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .cursor {
      animation: blink 1s infinite;
    }
    ${styles}
  </style>

  <!-- Base Card -->
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" class="card-bg" />

  <!-- Inner Content -->
  ${content}

  <!-- Watermark & Backlink -->
  ${watermark}
</svg>`;
}

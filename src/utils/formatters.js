export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return "0";
  const abs = Math.abs(num);
  if (abs >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (abs >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toLocaleString();
}

export function escapeXml(unsafe = "") {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

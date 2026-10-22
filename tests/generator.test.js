import test from "node:test";
import assert from "node:assert/strict";
import {
  generateCard,
  listThemes,
  getTheme,
  calculateRank
} from "../src/index.js";
import { formatNumber } from "../src/utils/formatters.js";

test("Theme System", () => {
  const themes = listThemes();
  assert.ok(themes.includes("dracula"));
  assert.ok(themes.includes("synthwave"));
  assert.ok(themes.includes("tokyo-night"));
  assert.ok(themes.includes("catppuccin"));
  assert.ok(themes.includes("kanagawa"));

  const kanagawaTheme = getTheme("kanagawa");
  assert.equal(kanagawaTheme.name, "Kanagawa Wave");
  assert.equal(kanagawaTheme.bg, "#1f1f28");
  assert.equal(kanagawaTheme.cardBg, "#16161d");
  assert.equal(kanagawaTheme.border, "#2a2a37");
  assert.equal(kanagawaTheme.primary, "#7e9cd8");
  assert.equal(kanagawaTheme.secondary, "#957fb8");
  assert.equal(kanagawaTheme.accent, "#76946a");
  assert.equal(kanagawaTheme.warning, "#e6c384");
  assert.equal(kanagawaTheme.text, "#dcd7ba");
  assert.equal(kanagawaTheme.mutedText, "#727169");
  assert.equal(kanagawaTheme.terminalHeader, "#0f0f15");
  assert.equal(kanagawaTheme.glow, "rgba(126, 156, 216, 0.45)");

  const defaultTheme = getTheme("non-existent-theme");
  assert.equal(defaultTheme.id, "dracula");
});

test("Formatters - formatNumber", () => {
  assert.equal(formatNumber(0), "0");
  assert.equal(formatNumber(950), "950");
  assert.equal(formatNumber(1200), "1.2k");
  assert.equal(formatNumber(15400), "15.4k");
  assert.equal(formatNumber(1200000), "1.2M");
});

test("Calculate Rank Progression", () => {
  const beginnerRank = calculateRank({
    totalCommits: 5,
    totalStars: 0,
    totalPRs: 0,
    publicRepos: 2
  });
  assert.equal(beginnerRank.level, 1);
  assert.equal(beginnerRank.title, "Novice Scripter");

  const highLevelRank = calculateRank({
    totalCommits: 2500,
    totalStars: 450,
    totalPRs: 200,
    publicRepos: 35,
    followers: 1200,
    currentStreak: 45
  });
  assert.ok(highLevelRank.level > 20);
  assert.ok(highLevelRank.badges.some((b) => b.name === "Starstruck"));
});

test("Generate RPG Card SVG", async () => {
  const { svg, type } = await generateCard({
    type: "rpg",
    username: "octocat",
    theme: "dracula",
    isDemo: true
  });
  assert.equal(type, "rpg");
  assert.ok(svg.includes("<svg"));
  assert.ok(svg.includes("</svg>"));
  assert.ok(svg.includes("LVL"));
  assert.ok(svg.includes("⚡ StarStruck"));
});

test("Generate Terminal Card SVG", async () => {
  const { svg, type } = await generateCard({
    type: "terminal",
    username: "octocat",
    theme: "matrix",
    isDemo: true
  });
  assert.equal(type, "terminal");
  assert.ok(svg.includes("@starstruck: ~ (zsh)"));
  assert.ok(svg.includes("ROLE:"));
});

test("Generate Stats Card SVG", async () => {
  const { svg, type } = await generateCard({
    type: "stats",
    username: "octocat",
    theme: "synthwave",
    isDemo: true
  });
  assert.equal(type, "stats");
  assert.ok(svg.includes("COMMITS"));
  assert.ok(svg.includes("STARS"));
});

test("Generate Streak Card SVG", async () => {
  const { svg, type } = await generateCard({
    type: "streak",
    username: "octocat",
    theme: "tokyo-night",
    isDemo: true
  });
  assert.equal(type, "streak");
  assert.ok(svg.includes("CURRENT COMMIT STREAK"));
  assert.ok(svg.includes("🔥"));
});

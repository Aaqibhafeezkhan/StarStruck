#!/usr/bin/env node

import { parseArgs } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";
import { generateCard, listThemes, getMockStats } from "../src/index.js";

const HELP_TEXT = `
✨ StarStruck CLI — Dynamic, Gamified GitHub Profile Cards

USAGE:
  starstruck [command] [options]
  npx starstruck generate --username <user> [options]

COMMANDS:
  generate         Generate an SVG card for a GitHub user
  demo             Generate preview sample cards across themes
  themes           List all available color themes

OPTIONS:
  -u, --username <user>    GitHub username (required for 'generate')
  -c, --card <type>        Card type: rpg | terminal | stats | streak (default: rpg)
  -t, --theme <name>       Theme name: dracula, synthwave, tokyo-night, catppuccin, nord, matrix, cyberpunk, one-dark (default: dracula)
  -o, --output <path>      Output SVG file path (default: <card>-<theme>.svg)
  --out-dir <dir>          Directory to save demo files (default: ./examples)
  --token <pat>            Optional access token for higher rate limits (or GITHUB_TOKEN env)
  --hide-watermark         Hide the subtle StarStruck backlink
  -h, --help               Show this help message

EXAMPLES:
  # Generate an RPG card with Synthwave theme
  npx starstruck generate -u octocat -c rpg -t synthwave -o profile-rpg.svg

  # Generate a Matrix terminal card
  npx starstruck generate -u octocat -c terminal -t matrix

  # Generate all demo cards for testing
  npx starstruck demo
`;

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] && !args[0].startsWith("-") ? args[0] : "generate";
  const rawArgs = command === args[0] ? args.slice(1) : args;

  let parsed;
  try {
    parsed = parseArgs({
      args: rawArgs,
      options: {
        username: { type: "string", short: "u" },
        card: { type: "string", short: "c", default: "rpg" },
        theme: { type: "string", short: "t", default: "dracula" },
        output: { type: "string", short: "o" },
        "out-dir": { type: "string", default: "./examples" },
        token: { type: "string" },
        "hide-watermark": { type: "boolean", default: false },
        help: { type: "boolean", short: "h", default: false }
      },
      allowPositionals: true
    });
  } catch (err) {
    console.error(`❌ Error parsing arguments: ${err.message}`);
    console.log(HELP_TEXT);
    process.exit(1);
  }

  const { values } = parsed;

  if (values.help || args.includes("--help") || args.includes("-h")) {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  if (command === "themes") {
    console.log("\n🎨 Available StarStruck Themes:\n");
    for (const t of listThemes()) {
      console.log(`  • ${t}`);
    }
    console.log("\nTip: Use with --theme <name>\n");
    process.exit(0);
  }

  if (command === "demo") {
    const outDir = path.resolve(process.cwd(), values["out-dir"] || "./examples");
    await fs.mkdir(outDir, { recursive: true });

    console.log(`\n🚀 Generating StarStruck demo gallery in ${outDir}...\n`);

    const samples = [
      { card: "rpg", theme: "dracula", file: "rpg-dracula.svg" },
      { card: "terminal", theme: "matrix", file: "terminal-matrix.svg" },
      { card: "stats", theme: "synthwave", file: "stats-synthwave.svg" },
      { card: "streak", theme: "tokyo-night", file: "streak-tokyo-night.svg" },
      { card: "rpg", theme: "cyberpunk", file: "rpg-cyberpunk.svg" },
      { card: "terminal", theme: "catppuccin", file: "terminal-catppuccin.svg" }
    ];

    for (const s of samples) {
      const { svg } = await generateCard({
        type: s.card,
        username: "octocat",
        theme: s.theme,
        isDemo: true
      });
      const dest = path.join(outDir, s.file);
      await fs.writeFile(dest, svg, "utf-8");
      console.log(`  ✓ Created ${s.file} (${s.card} | ${s.theme})`);
    }

    console.log(`\n✨ Successfully generated ${samples.length} demo cards!\n`);
    process.exit(0);
  }

  if (command === "generate") {
    const username = values.username;
    if (!username) {
      console.error("\n❌ Error: --username (-u) is required to generate a card.");
      console.log("Example: npx starstruck generate -u octocat\n");
      process.exit(1);
    }

    const cardType = values.card || "rpg";
    const themeName = values.theme || "dracula";
    const outFile = values.output || `${cardType}-${themeName}.svg`;

    console.log(`\n⚡ Fetching stats for @${username}...`);
    try {
      const { svg, stats } = await generateCard({
        type: cardType,
        username,
        theme: themeName,
        token: values.token || process.env.GITHUB_TOKEN,
        hideWatermark: values["hide-watermark"]
      });

      const outPath = path.resolve(process.cwd(), outFile);
      await fs.writeFile(outPath, svg, "utf-8");

      console.log(`\n🎉 Success! Card rendered for ${stats.name} (@${stats.username})`);
      console.log(`📁 Saved to: ${outFile}`);
      console.log(`🎨 Theme: ${themeName} | 🎴 Card: ${cardType}\n`);
    } catch (err) {
      console.error(`\n❌ Failed to generate card: ${err.message}\n`);
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});

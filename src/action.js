import fs from "node:fs/promises";
import path from "node:path";
import { generateCard, CARD_TYPES } from "./index.js";

async function run() {
  try {
    const username =
      process.env.INPUT_USERNAME ||
      process.env.GITHUB_REPOSITORY_OWNER ||
      process.env.GITHUB_ACTOR;

    if (!username) {
      throw new Error("Missing username input in GitHub Action.");
    }

    const cardType = (process.env.INPUT_CARD || "rpg").toLowerCase();
    const theme = (process.env.INPUT_THEME || "dracula").toLowerCase();
    const outDir = path.resolve(process.cwd(), process.env.INPUT_OUTPUT_DIR || ".starstruck");
    const hideWatermark = process.env.INPUT_HIDE_WATERMARK === "true";
    const token = process.env.GITHUB_TOKEN;

    await fs.mkdir(outDir, { recursive: true });

    console.log(`✨ StarStruck Action starting for @${username}...`);
    console.log(`📁 Target directory: ${outDir}`);

    const cardsToGenerate =
      cardType === "all" ? Object.keys(CARD_TYPES) : [cardType];

    for (const card of cardsToGenerate) {
      console.log(`🎨 Rendering [${card}] card with theme [${theme}]...`);
      const { svg } = await generateCard({
        type: card,
        username,
        theme,
        token,
        hideWatermark
      });

      const fileName = `${card}-${theme}.svg`;
      const filePath = path.join(outDir, fileName);
      await fs.writeFile(filePath, svg, "utf-8");

      // Also write standard alias like 'rpg-card.svg'
      const aliasPath = path.join(outDir, `${card}-card.svg`);
      await fs.writeFile(aliasPath, svg, "utf-8");

      console.log(`✓ Saved ${fileName} and ${card}-card.svg`);
    }

    console.log("🎉 StarStruck Action completed successfully!");
  } catch (err) {
    console.error("❌ Action failed:", err.message);
    process.exit(1);
  }
}

run();

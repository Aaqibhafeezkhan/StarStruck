<div align="center">

# ✨ StarStruck

### *Turn your GitHub profile into a sleek, gamified dev dashboard with dynamic SVG cards, retro themes, and zero rate limits.*

[![GitHub Action](https://img.shields.io/badge/GitHub%20Action-Node20-blue?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/AkulTyagi/StarStruck)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20(Pure%20Node)-success?style=for-the-badge)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)
[![Tests](https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge)](tests/generator.test.js)

<p align="center">
  <a href="#-quickstart-github-action">Quickstart</a> •
  <a href="#-card-styles">Card Styles</a> •
  <a href="#-themes">Themes</a> •
  <a href="#-cli-usage">CLI</a> •
  <a href="#-why-starstruck">Why StarStruck?</a> •
  <a href="#-contributing">Add a Theme</a>
</p>

---

</div>

## 🎴 Live Previews

### 1. ⚔️ RPG Character & Level Card
> Features your dynamic Developer Level, RPG Rank (e.g., *Void Architect*, *Bugbane Hunter*), animated glowing XP progression bar, and achievement shields.

<p align="center">
  <img src="examples/rpg-dracula.svg" alt="StarStruck RPG Card (Dracula)" width="600" />
</p>

---

### 2. 💻 Retro Neofetch Terminal Card
> Nostalgic CRT / Neofetch cyberpunk terminal with command prompt, ASCII badges, memory/stat logs, and a blinking cursor.

<p align="center">
  <img src="examples/terminal-matrix.svg" alt="StarStruck Terminal Card (Matrix)" width="600" />
</p>

---

### 3. 🍱 Bento-Grid Stats Card
> Modern minimalist glassmorphism card designed for clean, high-aesthetic profile layouts.

<p align="center">
  <img src="examples/stats-synthwave.svg" alt="StarStruck Bento Stats Card (Synthwave)" width="550" />
</p>

---

### 4. 🔥 Commit Streak & Flame Card
> Real-time commit streak counter with glowing flame emblem and activity cycle dots.

<p align="center">
  <img src="examples/streak-tokyo-night.svg" alt="StarStruck Streak Card (Tokyo Night)" width="520" />
</p>

---

## ⚡ Why StarStruck?

Most GitHub profile stat generators rely on shared 3rd-party servers (Vercel/Heroku) that constantly hit rate limits, crash, or suffer from cold-start latency. 

**StarStruck generates native SVGs directly inside your repository via GitHub Actions or CLI:**

| Feature | StarStruck ✨ | Traditional External Cards ❌ |
| :--- | :---: | :---: |
| **Uptime** | **100% Guaranteed** (Hosted on GitHub CDN) | Frequently down due to server crashes |
| **Rate Limits** | **Zero Rate Limits** (Uses your GITHUB_TOKEN) | Daily 403 API rate limit errors |
| **Load Speed** | **Instant** (Cached repository asset) | 2–5 second cold-start delays |
| **Gamification** | **RPG Levels, Ranks & Badges** | Boring plain numbers |
| **Dependencies** | **Zero Runtime Dependencies** | Bloated heavy node bundles |
| **Extensible** | **Add themes in 3 minutes via PR** | Hard to configure |

---

## 🚀 Quickstart: GitHub Action (Recommended)

Generate and auto-update your cards every 24 hours directly in your profile repo (`<your-username>/<your-username>`):

### Step 1: Create a workflow file
In your profile repository, add `.github/workflows/starstruck.yml`:

```yaml
name: Update Profile Cards

on:
  schedule:
    - cron: '0 0 * * *' # Runs daily at midnight
  workflow_dispatch:     # Allows manual trigger

jobs:
  generate-cards:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Generate StarStruck Cards
        uses: AkulTyagi/StarStruck@main
        with:
          username: ${{ github.repository_owner }}
          card: 'all'            # Options: rpg | terminal | stats | streak | all
          theme: 'synthwave'     # Options: dracula, synthwave, tokyo-night, catppuccin, nord, matrix, cyberpunk, one-dark
          output_dir: '.starstruck'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Commit & Push Updated SVGs
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add .starstruck/
          git commit -m "chore: update StarStruck cards [skip ci]" || exit 0
          git push
```

### Step 2: Add the card to your `README.md`

```markdown
<!-- ✨ StarStruck RPG Card -->
<p align="center">
  <img src="https://raw.githubusercontent.com/<YOUR_USERNAME>/<YOUR_USERNAME>/main/.starstruck/rpg-card.svg" alt="Dev RPG Card" />
</p>
```

---

## 💻 CLI Usage

You can also generate cards locally without installing anything:

```bash
# Generate an RPG card
npx starstruck generate -u octocat -c rpg -t synthwave -o my-rpg-card.svg

# Generate a Matrix Terminal card
npx starstruck generate -u octocat -c terminal -t matrix

# Generate a Bento Stats card
npx starstruck generate -u octocat -c stats -t dracula

# Preview all themes and styles locally
npx starstruck demo
```

### CLI Flags
- `-u, --username`: GitHub username *(required)*
- `-c, --card`: Card type (`rpg` | `terminal` | `stats` | `streak`) *(default: rpg)*
- `-t, --theme`: Theme palette *(default: dracula)*
- `-o, --output`: Custom output path
- `--hide-watermark`: Remove the subtle StarStruck link

---

## 🎨 Themes

StarStruck comes preloaded with 11 iconic developer color palettes:

| Theme | Preview Flag | Style |
| :--- | :--- | :--- |
| **Dracula** | `-t dracula` | Iconic dark violet, pink, and pastel green |
| **Synthwave '84** | `-t synthwave` | Vibrant neon magenta, retro cyan, and warm gold |
| **Tokyo Night** | `-t tokyo-night` | Deep indigo, soft lavender, and electric cyan |
| **Catppuccin Mocha** | `-t catppuccin` | Cozy dark slate, peach, and lavender |
| **The Matrix** | `-t matrix` | Cyber black with glowing radioactive green |
| **Cyberpunk 2077** | `-t cyberpunk` | High-contrast neon yellow and cyan accents |
| **Nord** | `-t nord` | Calm arctic blues and frosty grays |
| **One Dark Pro** | `-t one-dark` | Classic Atom dark slate and balanced syntax colors |
| **Solarized Dark**   | `-t solarized-dark` | Classic low-contrast teal base with blue, cyan, and green accents |
| **Rosé Pine** | `-t rose-pine` | Cozy dark plum, soft rose, cool foam, and warm gold |
| **Kanagawa Wave** | `-t kanagawa` | Japanese woodblock-inspired deep indigo, wave blue, oni violet, and autumn green |

---

## 🤝 Contributing: Add Your Favorite Theme in 3 Minutes!

We love community contributions! Adding a new color theme takes just a few lines of JSON:

1. Fork this repository.
2. Add your palette to [`src/themes/index.js`](src/themes/index.js).
3. Run `npm test` and `node bin/cli.js demo` to preview your changes.
4. Open a Pull Request!

Check out our [Contributing Guide](CONTRIBUTING.md) for full instructions.

---

## ⭐ Star History & Community

If StarStruck made your GitHub profile look cooler, **give this repository a star!** ⭐

Every star helps other developers discover zero-rate-limit profile cards.

---

<p align="center">
  Crafted with ✨ by <a href="https://github.com/AkulTyagi">Akul Tyagi</a> and amazing open-source contributors.<br/>
  Distributed under the <a href="LICENSE">MIT License</a>.
</p>

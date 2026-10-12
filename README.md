# Pract

An AI-style mock interview simulator designed with the restraint, typography, and specularity of modern developer tools (Linear, Raycast, Vercel).

Pure client-side execution using HTML5, CSS3, Vanilla JavaScript (ES6+), and GSAP. Zero frameworks, no page reloads, and zero telemetry.

🔗 **Live Deployment**: **[https://firstlight-io.github.io/pract/](https://firstlight-io.github.io/pract/)**

---

## ✨ Features

- **Linear-Tier Aesthetic**: Specular lighting, pitch-black obsidian palette (`#040406`), tight typography with `Inter` and `IBM Plex Mono`.
- **Keyboard-First Navigation**:
  - <kbd>1</kbd>–<kbd>4</kbd> to launch interview tracks from the home screen
  - <kbd>⌘</kbd>+<kbd>↵</kbd> or <kbd>Ctrl</kbd>+<kbd>↵</kbd> to submit answers
  - <kbd>Esc</kbd> to open/close the exit modal or dismiss actions
- **Heuristic Evaluation Engine**:
  - **Keyword Coverage**: Regex boundary parsing compares your answers against expected domain-specific terminology.
  - **Depth Assessment**: Evaluates word count against optimal interview depth thresholds (too short vs. optimal vs. verbose).
  - **Speech Filler Detection**: Scans and flags crutches (`um`, `uh`, `like`, `actually`, `basically`, `literally`, `you know`) and deducts penalties.
  - **Visual Composition Bar**: Segmented horizontal breakdown (Keywords + Depth + Fluency vs. Penalties).
- **Session Protection**:
  - Contextual breadcrumbs in the navigation bar with a live session indicator.
  - A frosted exit modal (`backdrop-filter: blur(14px)`) replaces browser popups, safely pausing and resuming countdown timers.
- **Transcript Utilities**: Full response drawer with one-click clipboard copying.
- **Session Digest**: Aggregated readiness scores with an animated SVG radial gauge and a question-by-question audit log.

---

## 🚀 Getting Started

Visit the live app at **[https://firstlight-io.github.io/pract/](https://firstlight-io.github.io/pract/)** or run it locally without dependencies:

```bash
# Clone the repository
git clone https://github.com/firstlight-io/pract.git
cd pract

# Start a local static server
python3 -m http.server 8080
```

Navigate to `http://localhost:8080` in your browser.

---

## 🛠 Tech Stack

- **Markup**: Semantic HTML5
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphic Backdrop Filters)
- **Scripting**: Vanilla JavaScript (ES6 Modules/Classes, DOM Manipulation)
- **Animation**: [GSAP 3.12](https://greensock.com/gsap/) for view transitions, counters, and SVG stroke offsets
- **Typography**: Inter & IBM Plex Mono via Google Fonts

---

## 📄 License

MIT License.

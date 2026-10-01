# Design — Peekr VR (peekrvr.github.io)

All three pages (`index.html` · `press.html` · `privacy.html`) read this file.
Do not regenerate per page — amend here first.

## Idea — "the browser window is the headset"
Peekr is used inside a dark room on a Quest 3: panels float in front of you,
curved, above a horizon; a yellow laser picks things. The site borrows only
things that exist in the product:

- **Curved panel** — the hero key visual is the real `trailer_poster.jpg`
  sliced into 14 strips on a CSS 3D cylinder (concave, edges toward you).
  Pointer movement turns the "head" a few degrees. No WebGL, zero extra bytes.
- **Horizon** — the app's opening animation / environment has a horizon with a
  maroon glow (v1.1.0 release notes: 「地平線の背景」). One radial glow sits under
  the panel. Nothing else glows.
- **Laser yellow** — the controller ray in every screenshot is yellow. Yellow is
  therefore the *pointer*: focus rings, the active step marker, link hover.
  It never fills a surface.
- **Panels turn to face you** — screenshots in the walkthrough are tilted and
  straighten as they reach the middle of the viewport (CSS
  `animation-timeline: view()`, progressive; static elsewhere and under
  reduced motion).
- **Zoom is shown, not claimed** — a 7-second silent loop cut from the real
  trailer (23.0–26.6 s, ping-pong, 133 KB, lazy, starts only when visible).

## Genre / structure
- Genre: atmospheric (dark, cinematic, one bloom).
- Theme: custom (tuned) — anchored on the existing brand sky blue `#9ED6FA`.
- Macrostructure: **Feature Stack** on `index` (per-step sticky text + scrolling
  panels). `press` = fact document. `privacy` = long document (text untouched).
- Nav: N9 edge-aligned (wordmark left, language + store right). Footer: Ft5 statement.

## Theme (tokens in `assets/tokens.css`)
| token | value | role |
|---|---|---|
| `--color-void` | oklch(16% 0.035 252) | page |
| `--color-paper-2` | oklch(20.5% 0.04 252) | raised band |
| `--color-paper-3` | oklch(25% 0.045 252) | panel edge |
| `--color-rule` | oklch(36% 0.04 252) | hairlines |
| `--color-ink` | oklch(95% 0.012 240) | text |
| `--color-ink-2` | oklch(80% 0.03 240) | secondary text |
| `--color-accent` | oklch(85.5% 0.085 230) | brand sky (≈ #9ED6FA) — CTA fill, links |
| `--color-accent-ink` | oklch(19% 0.045 252) | text on accent |
| `--color-laser` | oklch(89% 0.17 100) | pointer: focus, markers |
| `--color-horizon` | oklch(40% 0.12 12) | horizon glow only |

## Typography
- Display: **Shippori Mincho B1 ExtraBold**, roman, self-hosted woff2 subset
  (only the glyphs used in headings). Mincho = the register of manga tankōbon
  covers. `word-break: auto-phrase` for Japanese line breaks.
- Body: OS Japanese sans (Hiragino Sans / Yu Gothic UI / Meiryo) — zero bytes.
- Outlier (≤2 roles): **JetBrains Mono** ASCII subset — file extensions and
  version/spec keys only.
- No third-party requests at all (no Google Fonts CDN, no analytics) — the
  product promise is "no data collection"; the site keeps it.

## Space / motion
- 4-pt named scale (`--space-*`). Section padding varies on purpose.
- Easing `--ease-out: cubic-bezier(0.16,1,0.3,1)`; durations 120 / 220 / 420 ms.
- One load moment (hero panel settles). Head-look on fine pointers only.
- `prefers-reduced-motion: reduce` → no head-look, no panel tilt, video does not autoplay.

## CTA voice
- Primary: accent-filled pill, label 「Meta Horizon Store で入手」/ "Get it on the Meta Horizon Store", `nowrap`.
- Secondary: text link with laser-yellow underline on hover.

## Shared across pages
Wordmark (`assets/logo.png` + "Peekr VR"), tokens, fonts, focus ring, footer statement voice.
Legal page body text is never edited — only wrapped.

# BerlinWebs — Website

Static website for BerlinWebs (digital agency, Berlin). No build step, no frameworks — plain HTML/CSS/JS, German + English, with dark/light mode.

## Deployment

**`site/` is the complete deploy folder.** Everything in it is ready for any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, ...) — just point the "publish directory" / "root directory" at `site/`. No build command needed.

Everything outside `site/` (README, `source/`) is project context only and is not deployed.

## Structure

```
├── site/                                # ← Deploy folder (everything here is live)
│   ├── index.html                       # Homepage (DE)
│   ├── kontakt/index.html
│   ├── leistungen/
│   │   ├── website-e-commerce/index.html
│   │   ├── branding/index.html
│   │   ├── seo-sea/index.html
│   │   ├── analyse/index.html
│   │   └── social-media/index.html
│   ├── impressum/index.html
│   ├── datenschutz/index.html
│   ├── en/                              # English version (own URLs)
│   │   ├── index.html
│   │   ├── contact/index.html
│   │   ├── services/{website-ecommerce,branding,seo-sea,analytics,social-media}/index.html
│   │   ├── legal-notice/index.html
│   │   └── privacy-policy/index.html
│   ├── robots.txt
│   └── assets/
│       ├── style.css                    # all styling (dark+light theme via CSS variables)
│       ├── main.js                      # mobile menu, theme toggle, contact form (mailto)
│       ├── fonts/                       # Space Grotesk + JetBrains Mono, self-hosted
│       ├── logo-white.png               # full logo (footer)
│       ├── mark-white.png               # icon mark (nav) — inverted via CSS for light mode
│       ├── favicon.png
│       └── images/                      # ← drop new photos here (see below)
│
├── source/                              # Not deployed — raw source material
│   └── berlinwebs-logo-original.png     # original logo file (source for the assets above)
│
└── README.md
```

## Adding new images

Drop images into `site/assets/images/` (e.g. team photos, project screenshots). Then let me know where each one should go (e.g. the "Photo coming soon" placeholder in the About section) — the HTML files need `<img>` tags added for that.

## Languages (DE/EN)

Every German page has an English counterpart under `/en/...` with its own clean URL (e.g. `/kontakt/` ↔ `/en/contact/`). The language switcher in the nav links to the matching page on the other side. `hreflang` tags are set on both versions.

When editing one language version, remember to update the other — otherwise they drift apart.

## Dark/Light mode

Toggled via the sun/moon button in the nav. The choice is saved in `localStorage`; without a saved choice it follows the system setting (`prefers-color-scheme`). All colors run through CSS variables in `assets/style.css` (`:root` / `[data-theme="light"]`) — new components should use these variables instead of hardcoded colors so both modes keep working.

## Contact form

The form on the contact page has no backend — on submit it opens the visitor's email client with a pre-filled message to `info@berlinwebs.de` (see `assets/main.js`). For real server-side delivery you'd need a form service (e.g. Formspree) or a custom backend.

## Legal pages

The Impressum and privacy policy contain real details (address, VAT ID, contact person). If company details change, update both language versions (`impressum/` + `en/legal-notice/`, `datenschutz/` + `en/privacy-policy/`) — the English version is marked as a translation; the German version is legally binding.

## Running locally

No build needed, but **don't** open `index.html` directly in the browser (`file://`) — the pages use absolute paths (`/assets/...`) that require a real server:

```bash
cd site
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

## Status

This is a deliberately simple, quickly-built interim version (design system: dark theme with purple/cyan gradient, Space Grotesk + JetBrains Mono) meant to be replaced by a final redesign once that's ready.

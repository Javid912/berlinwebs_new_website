# BerlinWebs — Website

Static website for BerlinWebs (Berlin — custom software & automation, plus website/branding/SEO/social-media marketing as a secondary line). Plain HTML/CSS/JS, German + English, with dark/light mode — no frontend framework, no npm dependencies. There **is** a build step now (see below): it exists to stop the nav/footer from having to be hand-edited identically across 20 pages, nothing more.

## Deployment

**`site/` is the complete deploy folder** — everything the server needs, nothing it doesn't. Hosted on **STRATO Hosting Pro**, not a git-connected platform, so "deploy" means syncing `site/` onto the webspace over SFTP.

Pushing to **`main`** (the default branch) does this automatically via `.github/workflows/deploy.yml`: a `check` job rebuilds every page from source and fails the run if the result wouldn't match what's committed under `site/` (catching a stale build or a hand-edit made directly to a generated file), then a `deploy` job SFTP-uploads `site/` to STRATO. One-time setup before it can deploy — full steps are in the comments at the top of that file:

1. In the STRATO Kundenlogin, under your package → "Datenbanken und Webspace" → "SFTP & SSH", create an SFTP access and note its host/port/username.
2. Add 4 repo secrets (Settings → Secrets and variables → Actions) — never in this file or in chat: `STRATO_SFTP_HOST`, `STRATO_SFTP_USERNAME`, `STRATO_SFTP_PASSWORD`, `STRATO_SFTP_REMOTE_PATH`.

Until those are set, pushes to `main` will build-check successfully but the deploy step will fail; that's expected, not a bug. (The workflow comments also cover switching from a password to an SSH key later, which STRATO supports and is more secure.)

Everything outside `site/` (`build/`, `source/`, this README) is project source/tooling and is not deployed.

## Building

`site/`'s 20 page files (the DE/EN pairs under `leistungen/`, `en/services/`, etc.) are **generated** — don't hand-edit them, edits get silently overwritten by the next build and flagged by CI in the meantime. Edit the source instead:

- **`build/pages/<same path>.html`** — the actual page content, identical in shape to its `site/` counterpart except the `<header>...</header>` and `<footer>...</footer>` blocks are replaced by `<!--NAV-->` / `<!--FOOTER-->` markers.
- **`build/partials/`** — the shared nav (4 variants: DE/EN × homepage/sub-page, since the homepage's own nav links in-page with `#work` while every other page links back with `/index.html#work`) and footer (2 variants: DE/EN, identical on every page). Edit these once and every page picks it up.
- **`build/pages.json`** — the manifest pairing each DE page with its EN counterpart (`alt`) and marking home vs. sub-page; this is what makes the lang-switch link and nav variant selection automatic. Add an entry here (and a matching `build/pages/...` source) when adding a new page.

Regenerate `site/` after any change under `build/`:

```bash
npm run build          # or: node build/build.js
npm run build:check    # dry run — same check CI runs, exits 1 on drift
```

Non-page files — `assets/`, `robots.txt`, `sitemap.xml`, `.htaccess` — aren't templated and are still edited directly in `site/`.

## Structure

```
├── site/                                # ← Deploy folder (everything here is live)
│   ├── index.html                       # Homepage (DE)
│   ├── kontakt/index.html
│   ├── leistungen/
│   │   ├── individuelle-software/index.html   # lead service: custom software & automation
│   │   ├── website-e-commerce/index.html
│   │   ├── branding/index.html
│   │   ├── seo-sea/index.html
│   │   ├── analyse/index.html           # web analytics (GA4, Search Console, Looker Studio) — not BI dashboards
│   │   └── social-media/index.html
│   ├── impressum/index.html
│   ├── datenschutz/index.html
│   ├── en/                              # English version (own URLs)
│   │   ├── index.html
│   │   ├── contact/index.html
│   │   ├── services/{custom-software,website-ecommerce,branding,seo-sea,analytics,social-media}/index.html
│   │   ├── legal-notice/index.html
│   │   └── privacy-policy/index.html
│   ├── robots.txt
│   ├── sitemap.xml                      # every page, both languages, hreflang pairs
│   ├── .htaccess                        # canonicalizes to berlinwebs.de (redirects .com + www)
│   └── assets/
│       ├── style.css                    # all styling (dark+light theme via CSS variables)
│       ├── main.js                      # mobile menu, theme toggle, contact form (mailto), image carousel
│       ├── fonts/                       # Barlow + Barlow Condensed, self-hosted
│       ├── logo-white.png               # full logo (footer)
│       ├── mark-white.png               # icon mark (nav) — inverted via CSS for light mode
│       ├── favicon.png
│       ├── og-image.jpg / og-image-en.jpg     # social-share preview image, DE/EN
│       └── images/
│           └── cleany/                  # real screenshots for the Cleany24 case study (redacted)
│
├── build/                                # Source for the 20 generated site/ pages — see "Building" below
│   ├── build.js                         # node build/build.js  /  --check
│   ├── pages.json                       # DE↔EN pairing + home/sub-page flag, per page
│   ├── pages/                           # page content, header/footer replaced by markers
│   └── partials/                        # nav ×4 (de/en × home/sub), footer ×2 (de/en)
│
├── source/                              # Not deployed — raw source material
│   ├── berlinwebs-logo-original.png     # original logo file (source for the assets above)
│   └── cleany-screenshots-original/     # unredacted originals (07-admin.png is gitignored — real customer data)
│
├── .github/workflows/deploy.yml         # build-check on every push/PR; FTPS deploy to prod on push to main
├── package.json                         # npm run build / build:check / dev — no dependencies
└── README.md
```

## Adding new images

Drop images into `site/assets/images/` (e.g. team photos, project screenshots). Then let me know where each one should go — the HTML files need `<img>` tags added for that. The About section currently has no team photo; a placeholder box was deliberately removed rather than shipped (an admission of "not done yet" reads worse than no photo at all) — send a real one when you have it.

## Languages (DE/EN)

Every German page has an English counterpart under `/en/...` with its own clean URL (e.g. `/kontakt/` ↔ `/en/contact/`), paired in `build/pages.json`. The nav's language switcher is generated from that pairing, so it can no longer drift. Everything else per page — `hreflang` tags, title/description/OG tags, JSON-LD, and the body content itself — is still two independently-written files (`build/pages/kontakt/index.html` and `build/pages/en/contact/index.html`); when editing one language's content, remember to update the other.

## Dark/Light mode

Toggled via the sun/moon button in the nav. The choice is saved in `localStorage`; without a saved choice it follows the system setting (`prefers-color-scheme`). All colors run through CSS variables in `assets/style.css` (`:root` / `[data-theme="light"]`) — new components should use these variables instead of hardcoded colors so both modes keep working.

## Contact form

The form on the contact page has no backend — on submit it opens the visitor's email client with a pre-filled message to `info@berlinwebs.de` (see `assets/main.js`). For real server-side delivery you'd need a form service (e.g. Formspree) or a custom backend.

## Legal pages

The Impressum and privacy policy contain real details (address, VAT ID, contact person). If company details change, update both language versions in `build/pages/` (`impressum/` + `en/legal-notice/`, `datenschutz/` + `en/privacy-policy/`) and rebuild — the English version is marked as a translation; the German version is legally binding.

A full content review of both is still outstanding — see To Do below.

## Running locally

**Don't** open `index.html` directly in the browser (`file://`) — the pages use absolute paths (`/assets/...`) that require a real server:

```bash
npm run dev          # or: python3 -m http.server 8000 --directory site
```

Then open, e.g.:
- `http://localhost:8000/index.html` — homepage, German
- `http://localhost:8000/en/index.html` — homepage, English
- `http://localhost:8000/leistungen/individuelle-software/index.html` — the custom-software service page (German)

Every other page follows the same pattern: the DE path under `site/`, the EN mirror under `site/en/...` (see Structure above for the exact mapping).

## Status

Positioning: software/automation studio first (custom web apps, backends, data models — proven by the live Cleany24 case study), with website/branding/SEO/social-media marketing kept as a real, secondary service line. This replaced an earlier "digital marketing agency with an upcoming BI/reporting product" framing — that product was never built and is gone from the site entirely, not just relabeled.

Design system is deliberately simple (dark/light theme, Barlow + Barlow Condensed) and meant to be revisited once a final redesign is ready — but the content and structure are the real site, not a placeholder.

## To do

- [ ] **Legal pages** — full review of Impressum/Datenschutz + `en/legal-notice`/`en/privacy-policy` (VAT ID, any other details beyond the Geschäftsführer→Inhaber fix already made).
- [ ] **STRATO deploy secrets** — add `STRATO_SFTP_HOST`/`STRATO_SFTP_USERNAME`/`STRATO_SFTP_PASSWORD`/`STRATO_SFTP_REMOTE_PATH` as repo secrets, verify the first real deploy from `main`. Optional hardening after that: switch to SSH-key auth (see comments in `.github/workflows/deploy.yml`).
- [ ] **Merge `feature/hero-illustration` → `main`**, delete the old branch, once reviewed.
- [ ] **Team photo** — About section's placeholder was removed rather than shipped; add a real one when available (see "Adding new images").
- [ ] **Cleany24 testimonial** — ask the client for a written quote + LinkedIn recommendation.
- [ ] **Second reference project** — one real case study is doing a lot of work on the site; a second (even an unpaid internal tool, labelled as such) would help.
- [ ] Repo-root clutter — `BerlinWebs Website Suggestions.html`, `style .rtf` — decide keep/gitignore/delete.

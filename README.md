# BerlinWebs — Digitalagentur Website

Geklonte Version von [revival-pixel-spark.lovable.app](https://revival-pixel-spark.lovable.app) — einer Website für eine digitale Marketingagentur mit Fokus auf KMUs.

## Struktur

```
├── index.html                          # Startseite (Hero, Leistungen, Aktivitäten)
├── kontakt.html                        # Kontaktseite
├── leistungen/
│   ├── website-e-commerce.html         # Website & E-Commerce
│   ├── branding.html                   # Branding & Grafikdesign
│   ├── seo-sea.html                    # SEO & SEA
│   ├── analyse.html                    # Analyse & Optimierung
│   └── social-media.html               # Social Media Marketing
├── assets/
│   ├── styles-B9OdP5sD.css            # Tailwind CSS Bundle
│   ├── illustrations-C10TPZpX.js      # SVG Illustrations (React-Komponenten)
│   ├── illustrations-original.js      # Backup der Original-Illustration
│   ├── index-v-QcuYOK.js             # Framework-Core
│   ├── jsx-runtime-CY_MMzgk.js       # React JSX Runtime
│   ├── routes-B70-hdCS.js            # Routing & Seitenlogik
│   └── leistungen.*.js                # Page-spezifische Chunks
└── hero-concept.html                   # Demo: neue animierte Hero-Illustration
```

## Seiten & Inhalte

| Seite | Inhalt |
|-------|--------|
| **Startseite** | Hero mit "Ihr Partner für Wachstum", Leistungsübersicht, 4-Schritte-Prozess, Büro-Infos |
| **Website & E-Commerce** | UX/UI Design, Corporate Websites, E-Commerce Shops, Landing Pages |
| **Branding & Grafikdesign** | Visuelle Identitäten, Markenauftritt |
| **SEO & SEA** | Sichtbarkeitsstrategien, Google Ranking |
| **Analyse & Optimierung** | Webanalyse, Conversion-Optimierung |
| **Social Media Marketing** | Storytelling, Community-Aufbau |
| **Kontakt** | Beratungsanfrage, Büros in Berlin & Frankfurt |

## Technik

- **Framework:** React 19 (SPA) mit Vite
- **Styling:** Tailwind CSS v4
- **Fonts:** Inter, Inter Tight, JetBrains Mono
- **Illustrationen:** Inline SVG Komponenten (React)
- **Deployment:** Lovable.app

## Illustrationen (SVG Komponenten)

Die Datei `assets/illustrations-C10TPZpX.js` exportiert mehrere SVG-basierte React-Komponenten für die Hero-Grafik und Service-Karten. Ein Backup der Originale liegt in `illustrations-original.js`.

Eine Demo mit neuer animierter Konzept-Illustration (Star-Schema Dashboard) ist in `hero-concept.html` zu finden — diese ersetzt die statische "FIG. 01 / GROWTH FIELD"-Grafik durch ein datengetriebenes Netzwerk mit:
- Zentralem Dashboard mit Metriken & Charts
- Datenbank, Website, Mobile App & Social Media als Knoten
- Animierten Datenflüssen zwischen den Knoten
- Gleichem visuellen Stil (monochrom + Akzentfarbe)

## Lokal ausführen

Einfach `index.html` im Browser öffnen (alle Assets sind statisch heruntergeladen).

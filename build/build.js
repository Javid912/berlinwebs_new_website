#!/usr/bin/env node
// Regenerates site/ from build/pages/ + build/partials/.
//
// The nav header and footer used to be hand-duplicated in all 20 page
// files (DE + EN) — every nav/footer change meant editing 20 files and
// hoping none drifted (one already had, quietly, before this build step
// existed). Now each page source in build/pages/ carries the marker
// comments <!--NAV--> and <!--FOOTER--> instead of the real markup; this
// script substitutes in the shared partial for that page's language and
// section (home vs. sub-page use very slightly different nav anchors —
// in-page "#work" on the homepage itself vs. "/index.html#work" from
// everywhere else), and writes the result into site/.
//
// site/ stays the deploy folder — nothing else about deployment changes.
// Only the 20 page HTML files are generated; assets/, robots.txt,
// sitemap.xml and .htaccess are hand-maintained directly in site/ as
// before.
//
// Usage:
//   node build/build.js           # regenerate site/
//   node build/build.js --check   # regenerate in memory, exit 1 if it
//                                  # would differ from what's on disk
//                                  # (CI: catches hand-edits to site/ or
//                                  # a source page nobody rebuilt)

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BUILD_DIR = __dirname;
const SITE_DIR = path.join(ROOT, "site");

const pages = JSON.parse(fs.readFileSync(path.join(BUILD_DIR, "pages.json"), "utf8"));
const partialCache = {};

function readPartial(name) {
  if (!(name in partialCache)) {
    partialCache[name] = fs.readFileSync(path.join(BUILD_DIR, "partials", name + ".html"), "utf8");
  }
  return partialCache[name];
}

function renderPage(page) {
  const srcPath = path.join(BUILD_DIR, "pages", page.src);
  const source = fs.readFileSync(srcPath, "utf8");

  const navName = `nav-${page.lang}-${page.home ? "home" : "sub"}`;
  const footerName = `footer-${page.lang}`;

  const selfHref = "/" + page.src;
  const altHref = "/" + page.alt;

  const nav = readPartial(navName)
    .replace("{{SELF_HREF}}", selfHref)
    .replace("{{ALT_HREF}}", altHref);
  const footer = readPartial(footerName);

  if (!source.includes("<!--NAV-->")) {
    throw new Error(`${page.src}: missing <!--NAV--> marker`);
  }
  if (!source.includes("<!--FOOTER-->")) {
    throw new Error(`${page.src}: missing <!--FOOTER--> marker`);
  }

  return source.replace("<!--NAV-->", nav).replace("<!--FOOTER-->", footer);
}

function main() {
  const check = process.argv.includes("--check");
  let mismatches = [];
  let written = 0;

  for (const page of pages) {
    const rendered = renderPage(page);
    const outPath = path.join(SITE_DIR, page.src);

    if (check) {
      const existing = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : null;
      if (existing !== rendered) mismatches.push(page.src);
      continue;
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, rendered);
    written++;
  }

  if (check) {
    if (mismatches.length) {
      console.error("site/ is out of date with build/pages/ + build/partials/ for:");
      for (const m of mismatches) console.error("  - " + m);
      console.error("\nRun `node build/build.js` and commit the result.");
      process.exit(1);
    }
    console.log(`OK — site/ matches the build output for all ${pages.length} pages.`);
    return;
  }

  console.log(`Wrote ${written} page(s) to site/.`);
}

main();

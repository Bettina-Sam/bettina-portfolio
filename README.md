# Bettina Anne Sam — Portfolio ✈️

An interactive portfolio: particle entrance, paper-plane cursor, a journey you play like a game, a physics toolbox, a gravity button, and an installable app (PWA).

Plain **HTML + CSS + JavaScript**. No framework, no build step. Three.js loads from a CDN.

## Folder structure

```
bettina-portfolio/
├── index.html              ← the page
├── css/styles.css          ← all styles
├── js/icons.js             ← brand logos (Simple Icons)
├── js/main.js              ← all animations and interactions
├── assets/images/          ← hero photo + achievement photos (.webp)
├── assets/resume/          ← résumé PDF (download buttons point here)
├── assets/og-image.png     ← link preview image for LinkedIn/WhatsApp
├── icons/                  ← logo, favicon, app icons
├── manifest.webmanifest    ← makes it installable
├── sw.js                   ← offline support
├── vercel.json             ← Vercel settings (headers, clean URLs)
├── robots.txt, sitemap.xml ← for search engines
└── package.json            ← only for running it locally
```

## Run it on your computer

Opening `index.html` by double-clicking won't fully work (the particle portrait needs a local server). Instead:

```bash
cd bettina-portfolio
npx serve .        # or: npm run dev
```

Then open http://localhost:3000 (Node.js needs to be installed).

## Common edits

| What | Where |
|---|---|
| Text, sections, links | `index.html` |
| Projects (names, links, GitHub) | `js/main.js`, search for `const P=[` |
| Certificates | `js/main.js`, search for `const CERTS=[` |
| Toolbox bubbles | `js/main.js`, search for `const S=[['React'` |
| Colours and fonts | top of `css/styles.css` (`:root`) |
| Résumé | replace `assets/resume/Bettina_Anne_Sam_Resume.pdf` (keep the same name) |
| Photos | replace files in `assets/images/` (keep the same names) |

After changing files, bump `CACHE` in `sw.js` (`betty-v1` → `betty-v2`) so returning visitors get the new version.

## If your Vercel URL is different

Search `index.html` for `https://bettina-portfolio.netlify.app` and replace it with your real URL (3 places: og:image, og:url, canonical). Do the same in `robots.txt` and `sitemap.xml`.

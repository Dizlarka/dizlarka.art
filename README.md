# dizlarka.art

Single-page landing site for the artist **Leah Larisa Bunshaft (Dizlarka)**.

Plain static site (no build step, no Hugo). Hosted on GitHub Pages at the custom
domain **dizlarka.art**.

## Structure
- `index.html` — the page
- `assets/css/style.css` — styles
- `assets/js/main.js` — image lightbox + click-to-load YouTube players
- `assets/img/` — web-optimised images and video posters
- `assets/favicon.svg` — favicon
- `robots.txt` — allows crawling, points to the sitemap
- `sitemap.xml` — single canonical URL for search engines
- `CNAME` — custom domain for GitHub Pages
- `.nojekyll` — serve files as-is (skip Jekyll)
- `.github/workflows/deploy.yml` — CI: verify + deploy to GitHub Pages on push to `main`

Original source material (photos, videos, layout sketch) lives in a local
`prepare/` folder that is git-ignored and not part of the published site.

## Local preview
    python3 -m http.server 8000
    # open http://localhost:8000

## Videos
Videos are embedded from YouTube (click a poster to load the player), so the large
source files are not committed to the repo.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment

No build step. Push to `master` branch → GitHub Pages serves it live at `mattchilds.xyz`.

```bash
git push origin master
```

Before deploying, regenerate sitemap (`robots.txt` is static):

```bash
npm run sitemap
```

Preview locally with any static server:

```bash
npx live-server
```

## Site Context

Personal portfolio for Matt Childs — currently CTO of a B2B SaaS company, previously VP of Engineering at another B2B SaaS company. The site is a 2013-era Bootstrap/jQuery site that is being fully redesigned.

**Target aesthetic:** Minimal and elevated. Design references:

- [patrickcollison.com](https://patrickcollison.com/) — sparse text-forward layout
- Financial Times / Monocle magazine — editorial feel, serif typefaces, considered whitespace
- Micro-animations and subtle transitions are welcome, but restraint is the default

**Design principles for this redesign:**

- Less is more — no portfolio grids, no Bootstrap columns
- Typeface hierarchy and consistent spacing as the primary design tools
- Serif body type with strong typographic scale
- Subtle motion (CSS transitions/animations) rather than JS-heavy effects
- No frameworks — plain HTML, CSS custom properties, minimal vanilla JS

## Architecture

Single-page static site. The only file that matters for content is `index.html`. All other HTML files (`avocado/`, `memrise/`, `transport/`, `blog.html`, `enriching-your-career-through-personal-interests/`) are legacy portfolio case studies that are no longer linked.

**Files in active use:**

- `index.html` — main page
- `css/styles.css` — all styles (currently includes bundled normalize.css + custom styles)
- `CNAME` — sets custom domain (`mattchilds.xyz`)
- `feed.xml` — RSS feed for writing (update when adding articles)
- `humans.txt` — credits and contact
- `.well-known/security.txt` — vulnerability reporting (update Expires annually)

**Files that can be removed in the redesign:**

- `js/vendor/` — jQuery, Bootstrap, Modernizr (no longer needed)
- `css/animate.css` — replaced with CSS custom animations
- All `portfolio-*.png`, `blog*.svg`, social icon PNGs, legacy font files in `type/` and `social-icons/`
- Legacy case study directories

# EliteTech Deals

Premium black & gold affiliate marketplace static site. Ready for GitHub Pages or Cloudflare Pages.

To preview locally, open `index.html` in your browser or use a static server, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Deploy: push to GitHub and enable GitHub Pages from the `main` branch, or point Cloudflare Pages to this repo.

# Affiliate setup

This project includes a simple affiliate wiring system. Edit `assets/js/affiliates-config.js` and replace the placeholder IDs with your real affiliate tags/IDs for each platform.

Supported (configurable) platforms:
- Amazon (param `tag`)
- Walmart (param `wmlspartner`)
- CJ (param `sid`)
- Impact (param `afftrack`)
- ShareASale (param `afftrack`)
- eBay Partner Network (param `campid`)

The frontend automatically appends basic UTM parameters (`utm_source=elitetech`, `utm_medium=affiliate`, `utm_campaign`) and the affiliate ID when a link has `data-aff-url` and `data-aff-platform` attributes.

Example: in `index.html` product links use `data-aff-url` and `data-aff-platform` and will be rewritten at runtime.

Includes support for affiliate programs: Amazon Associates, Walmart, CJ, Impact, ShareASale, eBay Partner Network.
# Elitetechdeals
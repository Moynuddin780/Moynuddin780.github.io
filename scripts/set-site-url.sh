#!/usr/bin/env bash
# Point the site at its real public address (SEO tags, link-preview card, sitemap, robots.txt).
#   scripts/set-site-url.sh https://moynuddin780.github.io
#   scripts/set-site-url.sh https://masum.dev
set -euo pipefail
cd "$(dirname "$0")/.."

NEW="${1:-}"
[[ "$NEW" =~ ^https?://[^/]+(/.*)?$ ]] || { echo "usage: $0 https://your-address   (include https://)"; exit 1; }
NEW="${NEW%/}"
OLD="$(grep -oE 'url: "https?://[^"]+"' data.js | head -1 | sed -E 's/url: "(.*)"/\1/; s:/$::')"
[ -n "$OLD" ] || { echo "could not find site.url in data.js"; exit 1; }

if [ "$OLD" = "$NEW" ]; then echo "Already set to $NEW"; else
  for f in index.html data.js robots.txt sitemap.xml 404.html; do
    [ -f "$f" ] && sed -i "s|$OLD|$NEW|g" "$f"
  done
  echo "Site address changed: $OLD  →  $NEW"
fi
echo
echo "Now rebuild the résumé so its links point to the same address:"
if [ -d ../_resume-build ]; then
  echo "  (cd ../_resume-build && npm install && SITE_URL=$NEW npm run build) && cp \"../Updated Resume/Moynuddin-Al-Masum-Resume.pdf\" assets/resume/"
else
  echo "  (the résumé generator lives in the Resume/_resume-build folder: npm install && SITE_URL=$NEW npm run build)"
fi

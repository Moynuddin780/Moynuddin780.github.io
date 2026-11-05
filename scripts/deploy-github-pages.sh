#!/usr/bin/env bash
# Publish this folder to GitHub Pages in one command.
#   1. Create an EMPTY public repo on GitHub named  <your-username>.github.io   (e.g. Moynuddin780.github.io)
#   2. Run:  scripts/deploy-github-pages.sh https://github.com/Moynuddin780/Moynuddin780.github.io.git
#   3. On GitHub: Settings → Pages → Build and deployment → Source: "GitHub Actions"
# Uses your own git login (credential helper / SSH key). Nothing is sent anywhere else.
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE="${1:-}"
[ -n "$REMOTE" ] || { echo "usage: $0 <git remote url>"; exit 1; }

# This folder must be its own repository (it may sit inside a bigger one on your machine)
[ -e .git ] || git init -q -b main
git add -A
git commit -q -m "Publish portfolio" || echo "(nothing new to commit)"
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"
# A repo created with “Add a README” already has a commit; keep its history but let these files win
if git ls-remote --exit-code --heads origin main >/dev/null 2>&1; then
  git fetch -q origin main
  git merge -q -s ours --allow-unrelated-histories origin/main -m "Keep remote history" || true
fi
git push -u origin main
echo
echo "Pushed. Open the repo → Settings → Pages and choose Source: GitHub Actions (first time only)."
echo "The site goes live a minute or two later at: $(grep -oE 'url: "https?://[^"]+"' data.js | head -1 | sed -E 's/url: "(.*)"/\1/')"

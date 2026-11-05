# Moynuddin Al Masum — Portfolio

A fast, static portfolio site: no framework, no build step, no monthly cost.
All content lives in **one file — [`data.js`](data.js)**. Videos, certificate and résumé are plain files under `assets/`.

```
portfolio/
├── index.html                page shell + SEO / link-preview tags
├── data.js                   ← ALL content (profile, experience, projects, certificate, skills)
├── 404.html  robots.txt  sitemap.xml
├── assets/
│   ├── css/  js/             design + the renderer (you rarely touch these)
│   ├── fonts/                self-hosted Inter (no Google Fonts request)
│   ├── img/                  photo, link-preview card, project posters, certificate preview
│   ├── video/                demo + explainer videos (H.264 MP4, web-optimised)
│   ├── docs/                 internship certificate PDF
│   └── resume/               Moynuddin-Al-Masum-Resume.pdf
├── scripts/                  serve.mjs · set-site-url.sh · deploy-github-pages.sh · og-template.html
├── .github/workflows/        GitHub Pages deploy
├── netlify.toml              Netlify / Cloudflare-style headers + caching
└── Dockerfile  nginx.conf    self-hosting
```

## 1. Preview on your computer

```bash
node scripts/serve.mjs            # http://localhost:8080  (videos seek properly)
PORT=3000 node scripts/serve.mjs
HOST=0.0.0.0 node scripts/serve.mjs   # open it from your phone on the same Wi-Fi
```

(`python3 -m http.server` also works, but video seeking will not.)

## 2. Put it on the internet (so anyone can visit)

The site is plain files, so any static host works. Pick **one**:

### A. GitHub Pages — free, `https://moynuddin780.github.io`  *(the address the résumé links already use)*

1. On GitHub create an **empty, public** repository named exactly **`Moynuddin780.github.io`**.
2. From this folder:
   ```bash
   scripts/deploy-github-pages.sh https://github.com/Moynuddin780/Moynuddin780.github.io.git
   ```
   (it uses your own git login — nothing else leaves your machine)
3. GitHub → repository **Settings → Pages → Build and deployment → Source: “GitHub Actions”** (first time only).
4. About a minute later the site is live. Every later `git push` redeploys it.

> The repo is ~25 MB (mostly the three videos), well inside GitHub’s limits (1 GB repo, 100 MB per file).

### B. Netlify — drag and drop

Open <https://app.netlify.com/drop> and drop this folder. You get `something.netlify.app`; rename it under *Site settings*. `netlify.toml` already sets headers and caching.

### C. Your own server (Docker + nginx)

```bash
docker build -t portfolio .
docker run -d --name portfolio --restart unless-stopped -p 80:80 portfolio
```
Put it behind your usual TLS proxy (Caddy / Traefik / nginx / Cloudflare) for HTTPS.

### If the final address is not `moynuddin780.github.io`

```bash
scripts/set-site-url.sh https://your-address
# then regenerate the résumé so its links match:
(cd ../_resume-build && npm install && SITE_URL=https://your-address npm run build) && cp "../Updated Resume/Moynuddin-Al-Masum-Resume.pdf" assets/resume/
```
This rewrites the canonical / `og:` tags, `sitemap.xml`, `robots.txt` and `data.js`. After deploying, paste the URL into
<https://www.linkedin.com/post-inspector/> once so LinkedIn refreshes the preview card.

## 3. Update your content

Everything is in `data.js` (each section has a comment explaining its fields). Projects appear **in the order they are written**.

### Add a project with a video

1. Put the video in `assets/video/` — keep it small (H.264 MP4, ≤ 1600 px wide):
   ```bash
   ffmpeg -i input.mov -vf "scale='min(1600,iw)':-2,fps=30" -c:v libx264 -preset slow -crf 27 \
          -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 64k assets/video/my-demo.mp4
   ffmpeg -ss 15 -i input.mov -frames:v 1 -vf scale=1280:-2 -q:v 3 assets/img/projects/my-demo.jpg    # poster
   ```
2. Copy a project block in `data.js` and set:
   ```js
   media: [
     { type: "video",    src: "assets/video/my-demo.mp4", poster: "assets/img/projects/my-demo.jpg", label: "Demo video" },
     { type: "linkedin", id: "7367163744394612737", label: "LinkedIn post" },   // the number at the end of the post URL
   ],
   ```
   With two or more items the project page shows tabs; the media sits **beside** the project text on desktop and above it on phones.

**Videos play by themselves.** A project's first local video plays silently inside its card while the card is on screen
(it loads only when you scroll near it, pauses when it leaves the screen or a project is open, and does not autoplay for
visitors whose system asks for reduced motion). Clicking the card opens the project page as before — its video also starts
(silently; the player's controls unmute it). LinkedIn / Drive items cannot autoplay, so they show their poster with a play badge.
`position: "left top"` on a video decides which part of the picture stays visible when the card crops it.

> **Before you publish a screen recording**, scrub it: camera-config pages and browser password prompts can show RTSP URLs with passwords.

### The explainer section

`explainers` in `data.js` renders its own section ("Tracking, explained" — the object-detection-with-memorization video) — a video beside the idea written out
in numbered steps. Fields: `title`, `kicker`, `summary`, `video { src, poster, label, duration }`, `steps [{ title, text }]`, `note`, `tags`.
Empty list `[]` hides the section; its heading is `headings.explainer` / `headings.explainerIntro`.

### Other things

| To change… | Edit in `data.js` |
| --- | --- |
| Job / internship | `experience` (`links: { certificate: "#internship-certificate" }` adds the certificate button) |
| Certificate | `certifications` — put the PDF in `assets/docs/` and a preview image in `assets/img/` |
| Résumé | overwrite `assets/resume/Moynuddin-Al-Masum-Resume.pdf` |
| Photo | overwrite `assets/img/profile.jpg` (4:5, ≥ 800×1000) |
| Link-preview card | edit `scripts/og-template.html`, then run the Chrome command written at its top |
| Colours / font | CSS variables at the top of `assets/css/style.css` (`--font-sans` is Inter, then the system sans-serif) |

Shareable deep links (the résumé uses them): `/#project-smart-hall`, `/#project-ccplc`, `/#project-bup-attendance`, `/#internship-certificate`.

If the page shows a red error box there is a typo in `data.js` (a missing comma or quote) — the box names the line.

## Features

- Opens in the **light** theme for everyone; the dark theme is a toggle (remembered on that device); responsive from 320 px phones up
- Project videos autoplay (muted) in the cards while on screen; project filters; each project opens a detail view with the **video / LinkedIn post beside the text**, metrics, stack and previous/next
- LinkedIn posts are embedded with LinkedIn’s official embed, with an “open on LinkedIn” fallback
- Certificate viewer (opens from the experience entry, the certificate card, or `/#internship-certificate`)
- No third-party requests except the LinkedIn / Google Drive embeds you open; strict Content-Security-Policy in `netlify.toml` and `nginx.conf`
- SEO: meta tags, Open Graph / Twitter card, sitemap, robots.txt, `Person` structured data
- Keyboard and screen-reader friendly, respects “reduce motion”

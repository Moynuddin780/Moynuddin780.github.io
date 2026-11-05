#!/usr/bin/env node
/* Tiny static server for previewing the portfolio — no dependencies, supports video seeking (Range).
     node scripts/serve.mjs            → http://localhost:8080
     PORT=3000 node scripts/serve.mjs
     HOST=0.0.0.0 node scripts/serve.mjs   (share on your Wi-Fi / LAN)
     CSP=1 node scripts/serve.mjs          (send the same Content-Security-Policy as the production configs) */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || "127.0.0.1";
const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; media-src 'self'; font-src 'self'; frame-src https://www.linkedin.com https://drive.google.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.loom.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'";
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".mp4": "video/mp4", ".webm": "video/webm", ".pdf": "application/pdf", ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".ico": "image/x-icon",
};

http.createServer((req, res) => {
  let rel;
  try { rel = decodeURIComponent(new URL(req.url, "http://x").pathname); } catch { res.writeHead(400).end("Bad request"); return; }
  let file = path.join(root, rel);
  if (!file.startsWith(root)) { res.writeHead(403).end("Forbidden"); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  let status = 200;
  if (!fs.existsSync(file)) { file = path.join(root, "404.html"); status = 404; }
  const stat = fs.statSync(file);
  const headers = { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream", "Accept-Ranges": "bytes", "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff" };
  if (process.env.CSP) headers["Content-Security-Policy"] = CSP;
  const range = status === 200 && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || "");
  if (range) {
    let start = range[1] === "" ? stat.size - Number(range[2]) : Number(range[1]);
    let end = range[1] === "" || range[2] === "" ? stat.size - 1 : Math.min(Number(range[2]), stat.size - 1);
    if (start > end || start >= stat.size) { res.writeHead(416, { "Content-Range": `bytes */${stat.size}` }).end(); return; }
    res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${stat.size}`, "Content-Length": end - start + 1 });
    if (req.method === "HEAD") return void res.end();
    fs.createReadStream(file, { start, end }).pipe(res);
    return;
  }
  res.writeHead(status, { ...headers, "Content-Length": stat.size });
  if (req.method === "HEAD") return void res.end();
  fs.createReadStream(file).pipe(res);
}).listen(port, host, () => console.log(`Portfolio preview → http://${host === "0.0.0.0" ? "localhost" : host}:${port}   (Ctrl+C to stop)`));

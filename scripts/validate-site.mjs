import assert from "node:assert/strict";
import fs from "node:fs";
const get = p => fs.readFileSync(p,"utf8");
const h=get("index.html"), c=get("assets/css/portfolio.css"), j=get("assets/js/portfolio.js"), r=get("README.md");
const ids=new Set([...h.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const a of h.matchAll(/href="#([^"]+)"/g))assert.ok(ids.has(a[1]),"Broken anchor: "+a[1]);
for(const a of h.matchAll(/(?:src|href)="(assets\/[^"]+)"/g))assert.ok(fs.existsSync(a[1]),"Missing asset: "+a[1]);
for(const img of h.matchAll(/<img\b[^>]*>/g)){assert.match(img[0],/\balt="[^"]+"/);assert.match(img[0],/\bwidth="/);assert.match(img[0],/\bheight="/)}
for(const tag of ['rel="canonical"','property="og:title"','property="og:image"','name="description"','application/ld+json','id="main-content"','aria-expanded="false"'])assert.ok(h.includes(tag),tag);
for(const p of ["robots.txt","sitemap.xml","assets/img/favicon.svg"])assert.ok(fs.existsSync(p));
const publicText=h+"\n"+r;
assert.doesNotMatch(publicText,/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
assert.doesNotMatch(publicText,/(?:\+81[\s-]?80|080[\s-]?8501|598-0071|Tsuruhara|Izumisano)/i);
assert.match(j,/Escape/);assert.match(c,/prefers-reduced-motion/);assert.match(c,/:focus-visible/);
console.log("Portfolio static checks passed");

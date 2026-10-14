import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const origin = "https://www.ethark.sa";
const output = resolve("dist/sitemap.xml");
const fallback = resolve("public/sitemap.xml");
const escapeXml = value => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[ch]));
const basePaths = ["/", "/about", "/terms", "/privacy", "/blog"];
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

async function main() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn("[sitemap] Supabase environment unavailable; retaining static sitemap.");
    return;
  }
  try {
    const endpoint = new URL("/rest/v1/blog_posts", supabaseUrl);
    endpoint.searchParams.set("select", "slug,updated_at,published_at");
    endpoint.searchParams.set("status", "eq.published");
    endpoint.searchParams.set("published_at", "lte." + new Date().toISOString());
    endpoint.searchParams.set("order", "published_at.desc");
    endpoint.searchParams.set("limit", "1000");
    const response = await fetch(endpoint, {
      headers: { apikey: supabaseKey, Authorization: "Bearer " + supabaseKey, Accept: "application/json" },
      signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) throw new Error("Supabase HTTP " + response.status);
    const posts = await response.json();
    if (!Array.isArray(posts)) throw new Error("Unexpected Supabase response");
    const urls = [
      ...basePaths.map(path => ({ loc: origin + path })),
      ...posts.filter(post => typeof post.slug === "string" && post.slug.trim()).map(post => ({
        loc: origin + "/blog/" + encodeURIComponent(post.slug),
        lastmod: post.updated_at || post.published_at
      }))
    ];
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.map(url => '  <url><loc>' + escapeXml(url.loc) + '</loc>' +
        (url.lastmod && !Number.isNaN(Date.parse(url.lastmod)) ? '<lastmod>' + new Date(url.lastmod).toISOString().slice(0, 10) + '</lastmod>' : '') +
        '</url>').join("\n") + '\n</urlset>\n';
    await writeFile(output, xml, "utf8");
    console.log("[sitemap] Generated " + urls.length + " URLs (" + posts.length + " published articles).");
  } catch (error) {
    console.warn("[sitemap] Generation failed; retaining static sitemap:", error.message);
    // Vite has already copied public/sitemap.xml into dist, so indexing remains available.
    await readFile(fallback, "utf8");
  }
}
await main();

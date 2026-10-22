const ORIGIN = "https://www.ethark.sa";
const BASE = ["/", "/about", "/terms", "/privacy", "/blog"];
const escapeXml = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]));
const validSlug = value => typeof value === "string" && /^[a-zA-Z0-9_-]+$/.test(value);
const render = posts => '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  [...BASE.map(path => ({loc:ORIGIN+path})), ...posts.filter(p => validSlug(p.slug)).map(p => ({loc:ORIGIN+"/blog/"+p.slug,lastmod:p.updated_at || p.published_at}))]
  .map(item => '  <url><loc>'+escapeXml(item.loc)+'</loc>'+(item.lastmod && !Number.isNaN(Date.parse(item.lastmod)) ? '<lastmod>'+new Date(item.lastmod).toISOString().slice(0,10)+'</lastmod>' : '')+'</url>').join('\n')+'\n</urlset>\n';
export default async function handler(req,res) {
  res.setHeader("Content-Type","application/xml; charset=utf-8");
  res.setHeader("Cache-Control","public, s-maxage=300, stale-while-revalidate=600");
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) { res.status(503).send("Sitemap temporarily unavailable"); return; }
  try {
    const endpoint = new URL("/rest/v1/blog_posts",url);
    endpoint.searchParams.set("select","slug,updated_at,published_at");
    endpoint.searchParams.set("status","eq.published");
    endpoint.searchParams.set("published_at","lte."+new Date().toISOString());
    endpoint.searchParams.set("limit","1000");
    const response = await fetch(endpoint,{headers:{apikey:key,Authorization:"Bearer "+key,Accept:"application/json"},signal:AbortSignal.timeout(10000)});
    if (!response.ok) throw new Error("Supabase HTTP "+response.status);
    const posts=await response.json();
    if (!Array.isArray(posts)) throw new Error("Unexpected response");
    res.status(200).send(render(posts));
  } catch(error) {
    console.error("[sitemap]",error.message);
    res.status(503).send("Sitemap temporarily unavailable");
  }
}

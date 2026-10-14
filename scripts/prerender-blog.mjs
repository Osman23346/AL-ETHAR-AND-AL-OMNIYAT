import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const origin = "https://www.ethark.sa";
const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeJson = value => JSON.stringify(value).replace(/</g, "\\u003c");
const excerpt = p => (p.excerpt || p.content?.replace(/\s+/g," ").slice(0,155) || "").trim();
const validSlug = s => typeof s === "string" && /^[a-zA-Z0-9_-]+$/.test(s);
function articleHtml(text) {
  return String(text || "").split(/\r?\n/).map(line => {
    const v=line.trim();
    if (!v) return "";
    if (v.startsWith("### ")) return "<h3>"+esc(v.slice(4))+"</h3>";
    if (v.startsWith("## ")) return "<h2>"+esc(v.slice(3))+"</h2>";
    if (v.startsWith("# ")) return "<h2>"+esc(v.slice(2))+"</h2>";
    if (/^[-•] /.test(v)) return "<p>• "+esc(v.slice(2))+"</p>";
    return "<p>"+esc(v.replace(/\*\*/g,""))+"</p>";
  }).join("\n");
}
async function main() {
  if (!url || !key) { console.warn("[prerender] No Supabase config, SPA fallback retained."); return; }
  try {
    const endpoint = new URL("/rest/v1/blog_posts", url);
    endpoint.searchParams.set("select","title,slug,excerpt,content,cover_image_url,image_alt,seo_title,seo_description,published_at,updated_at");
    endpoint.searchParams.set("status","eq.published");
    endpoint.searchParams.set("published_at","lte."+new Date().toISOString());
    endpoint.searchParams.set("limit","1000");
    const response=await fetch(endpoint,{headers:{apikey:key,Authorization:"Bearer "+key},signal:AbortSignal.timeout(12000)});
    if (!response.ok) throw new Error("Supabase HTTP "+response.status);
    const posts=await response.json();
    if (!Array.isArray(posts)) throw new Error("Invalid posts response");
    const template=await readFile(resolve("dist/index.html"),"utf8");
    for (const post of posts) {
      if (!validSlug(post.slug)) { console.warn("[prerender] Skipping unsafe slug"); continue; }
      const canonical=origin+"/blog/"+post.slug;
      const title=post.seo_title || post.title+" | رؤى إيثارك";
      const description=post.seo_description || excerpt(post);
      const image=post.cover_image_url;
      const ld={"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description,datePublished:post.published_at || undefined,dateModified:post.updated_at || post.published_at || undefined,image:image || undefined,inLanguage:"ar-SA",mainEntityOfPage:canonical,author:{"@type":"Organization",name:"إيثارك"},publisher:{"@type":"Organization",name:"إيثارك",url:origin}};
      const tags=[
        '<meta name="description" content="'+esc(description)+'" />',
        '<meta name="robots" content="index,follow" />',
        '<link rel="canonical" href="'+esc(canonical)+'" />',
        '<meta property="og:type" content="article" />',
        '<meta property="og:locale" content="ar_SA" />',
        '<meta property="og:title" content="'+esc(title)+'" />',
        '<meta property="og:description" content="'+esc(description)+'" />',
        '<meta property="og:url" content="'+esc(canonical)+'" />',
        image ? '<meta property="og:image" content="'+esc(image)+'" />' : "",
        '<script type="application/ld+json">'+safeJson(ld)+'</script>'
      ].filter(Boolean).join("\n");
      let html=template.replace(/<title>[\s\S]*?<\/title>/i,"<title>"+esc(title)+"</title>")
        .replace(/<meta\s+name="description"[\s\S]*?\/>/i,"")
        .replace("</head>",tags+"\n</head>");
      const content='<main lang="ar" dir="rtl" style="max-width:900px;margin:3rem auto;padding:1rem;font-family:system-ui,sans-serif"><nav><a href="/">إيثارك</a> / <a href="/blog">رؤى إيثارك</a></nav><article><h1>'+esc(post.title)+'</h1><p>'+esc(excerpt(post))+'</p>'+(image?'<img src="'+esc(image)+'" alt="'+esc(post.image_alt || post.title)+'" style="max-width:100%;height:auto" />':"")+articleHtml(post.content)+'</article></main>';
      html=html.replace('<div id="root"></div>','<div id="root">'+content+'</div>');
      const dir=resolve("dist/blog");
      await mkdir(dir,{recursive:true});
      await writeFile(join(dir,post.slug+".html"),html,"utf8");
    }
    console.log("[prerender] Generated "+posts.length+" article HTML pages.");
  } catch(error) {
    console.warn("[prerender] Could not generate article HTML; SPA fallback remains:",error.message);
  }
}
await main();

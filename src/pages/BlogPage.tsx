import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
type Category = { name: string; slug: string };
type Post = { id: string; title: string; slug: string; excerpt: string | null; content: string; cover_image_url: string | null; image_alt: string | null; seo_title: string | null; seo_description: string | null; published_at: string | null; blog_categories?: Category | null };
function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    let el = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!el) { el = document.createElement("meta"); el.name = "description"; document.head.appendChild(el); }
    el.content = description;
  }, [title, description]);
  return null;
}
export default function BlogPage({ slug }: { slug?: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    const run = async () => {
      let query = supabase.from("blog_posts").select("id,title,slug,excerpt,content,cover_image_url,image_alt,seo_title,seo_description,published_at)").eq("status","published").lte("published_at",new Date().toISOString()).order("published_at",{ascending:false});
      if (slug) query = query.eq("slug",slug);
      const { data, error } = await query;
      if (alive) { if (error) { console.error("Blog query failed", error); setError("تعذر تحميل المقالات حاليًا (" + error.code + ")"); } else setPosts((data || []) as unknown as Post[]); setLoading(false); }
    };
    void run(); return () => { alive = false; };
  }, [slug]);
  const post = slug ? posts[0] : undefined;
  return <div dir="rtl" style={{fontFamily:"Tajawal,Arial,sans-serif",background:"#f8faf8",color:"#193d33",minHeight:"100vh"}}>
    <style>{`.blog-public{max-width:1080px;margin:auto;padding:35px 20px}.blog-public a{color:#176a4f;text-decoration:none}.blog-public .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}.blog-public .card{background:white;border:1px solid #e4ece7;border-radius:18px;overflow:hidden}.blog-public .card-body{padding:20px}.blog-public .cover{width:100%;height:210px;object-fit:cover}.blog-public .article{background:white;border-radius:18px;padding:clamp(20px,5vw,55px);line-height:2;font-size:18px;white-space:pre-wrap;overflow-wrap:anywhere}.blog-public h1{font-size:clamp(30px,4vw,46px);line-height:1.5}.blog-public .muted{color:#73837a;font-size:14px}`}</style>
    <Meta title={post?.seo_title || post?.title || "رؤى إيثارك | مقالات ريادة الأعمال ومساحات العمل"} description={post?.seo_description || post?.excerpt || "مقالات إيثارك عن ريادة الأعمال وحاضنات الأعمال والمكاتب المشتركة وقاعات الاجتماعات في ينبع الصناعية."} />
    <div className="blog-public"><header style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap"}}><a href="/" style={{fontSize:24,fontWeight:800}}>إيثارك <span style={{fontSize:13}}>ETHARK</span></a><a href="/blog">رؤى إيثارك</a></header>
      {loading ? <p>جارٍ تحميل المقالات...</p> : error ? <p role="alert">{error}</p> : slug ? !post ? <><h1>المقال غير متاح</h1><a href="/blog">العودة إلى المدونة</a></> : <article><p className="muted">{post.blog_categories?.name || "رؤى إيثارك"} {post.published_at ? " • " + new Date(post.published_at).toLocaleDateString("ar-SA") : ""}</p><h1>{post.title}</h1>{post.cover_image_url && <img src={post.cover_image_url} alt={post.image_alt || post.title} style={{width:"100%",maxHeight:480,objectFit:"cover",borderRadius:18,marginBottom:24}} />}<div className="article">{post.content}</div><p><a href="/blog">← جميع المقالات</a></p></article> : <><p className="muted">معرفة تنمو مع أعمالك</p><h1>رؤى إيثارك</h1><p>أفكار ومقالات عن مساحات العمل وريادة الأعمال وحاضنات الأعمال.</p><div className="cards">{posts.map(p=><a className="card" href={"/blog/"+encodeURIComponent(p.slug)} key={p.id}>{p.cover_image_url && <img className="cover" src={p.cover_image_url} alt={p.image_alt || p.title} />}<div className="card-body"><p className="muted">{p.blog_categories?.name || "مقالات"}</p><h2>{p.title}</h2><p>{p.excerpt}</p><span>اقرأ المقال ←</span></div></a>)}</div>{!posts.length && <p>ترقبوا مقالاتنا قريبًا.</p>}</>}
    </div>
  </div>;
}

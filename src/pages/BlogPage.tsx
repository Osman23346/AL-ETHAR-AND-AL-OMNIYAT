import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpLeft, CalendarDays, Clock3, Search } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Footer from "../components/layout/Footer";
import "./blog.css";

type Post = { id: string; title: string; slug: string; excerpt: string | null; content: string; cover_image_url: string | null; image_alt: string | null; seo_title: string | null; seo_description: string | null; published_at: string | null };
const origin = "https://www.ethark.sa";
const excerptOf = (post: Post) => post.excerpt || post.content.slice(0, 155).replace(/\s+/g, " ");
const dateOf = (date: string | null) => date ? new Date(date).toLocaleDateString("ar-SA", {year:"numeric",month:"long",day:"numeric"}) : "";
const readTime = (post: Post) => Math.max(1,Math.ceil(post.content.trim().split(/\s+/).length/220));
const setMeta = (name: string, content: string, property = false) => {
  const attr = property ? "property" : "name";
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr,name); document.head.appendChild(el); }
  el.content = content;
};
function Seo({ post, slug, loading }: { post?: Post; slug?: string; loading: boolean }) {
  useEffect(() => {
    if (loading) return;
    const title = post?.seo_title || (post ? post.title + " | رؤى إيثارك" : "رؤى إيثارك | مقالات ريادة الأعمال ومساحات العمل");
    const description = post?.seo_description || (post ? excerptOf(post) : "مقالات وأفكار من إيثارك عن ريادة الأعمال ومساحات العمل المشتركة وحلول نمو الأعمال في ينبع الصناعية.");
    const url = origin + (slug ? "/blog/" + encodeURIComponent(slug) : "/blog");
    document.title = title;
    setMeta("description", description);
    setMeta("robots", slug && !post ? "noindex,follow" : "index,follow");
    setMeta("og:title",title,true); setMeta("og:description",description,true);
    setMeta("og:type",post ? "article" : "website",true);
    setMeta("og:url",url,true); setMeta("og:locale","ar_SA",true);
    setMeta("twitter:card",post?.cover_image_url ? "summary_large_image" : "summary");
    if (post?.cover_image_url) { setMeta("og:image",post.cover_image_url,true); setMeta("twitter:image",post.cover_image_url); }
    else { document.head.querySelector('meta[property="og:image"]')?.remove(); document.head.querySelector('meta[name="twitter:image"]')?.remove(); }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel="canonical"; document.head.appendChild(canonical); }
    canonical.href=url;
    document.getElementById("ethark-blog-jsonld")?.remove();
    if (post) {
      const script=document.createElement("script");script.id="ethark-blog-jsonld";script.type="application/ld+json";
      script.textContent=JSON.stringify({"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description,image:post.cover_image_url || undefined,datePublished:post.published_at || undefined,inLanguage:"ar-SA",mainEntityOfPage:url,author:{"@type":"Organization",name:"إيثارك"},publisher:{"@type":"Organization",name:"إيثارك",url:origin}});
      document.head.appendChild(script);
    }
  },[post,slug,loading]);
  return null;
}
const headingsOf = (content: string) => content.split(/\r?\n/).map((line,i)=>({line:line.trim(),i})).filter(({line})=>/^#{1,3} /.test(line)).map(({line,i})=>({id:`section-${i}`,title:line.replace(/^#{1,3} /,"")}));
function ArticleBody({ text }: { text: string }) {
  return <div className="ethark-article-body">{text.split(/\r?\n/).map((line,i) => {
    const value=line.trim(); if (!value) return <div className="ethark-paragraph-space" key={i} />;
    if (value.startsWith("### ")) return <h3 id={`section-${i}`} key={i}>{value.slice(4)}</h3>;
    if (value.startsWith("## ")) return <h2 id={`section-${i}`} key={i}>{value.slice(3)}</h2>;
    if (value.startsWith("# ")) return <h2 id={`section-${i}`} key={i}>{value.slice(2)}</h2>;
    if (/^[-•] /.test(value)) return <p className="ethark-bullet" key={i}>{value.slice(2)}</p>;
    return <p key={i}>{value.replace(/\*\*/g,"")}</p>;
  })}</div>;
}
export default function BlogPage({ slug }: { slug?: string }) {
  const [posts,setPosts]=useState<Post[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [search,setSearch]=useState("");
  useEffect(() => {
    let active=true;
    const run=async()=>{
      const {data,error}=await supabase.from("blog_posts").select("id,title,slug,excerpt,content,cover_image_url,image_alt,seo_title,seo_description,published_at").eq("status","published").lte("published_at",new Date().toISOString()).order("published_at",{ascending:false});
      if (!active) return;
      if(error){console.error("Blog fetch:",error);setError("تعذر تحميل المقالات حاليًا");}
      else setPosts((data || []) as Post[]);
      setLoading(false);
    };
    void run();return()=>{active=false;};
  },[]);
  const post=slug ? posts.find(p=>p.slug===slug) : undefined;
  const others=posts.filter(p=>p.id!==post?.id).slice(0,3);
  const filtered=posts.filter(p=>(p.title+" "+(p.excerpt||"")).toLowerCase().includes(search.trim().toLowerCase()));
  return <div className="ethark-blog" dir="rtl">
    <Seo post={post} slug={slug} loading={loading}/>
    <header className="ethark-blog-header"><div className="ethark-blog-container ethark-blog-nav">
      <a href="/" className="ethark-blog-brand" aria-label="إيثارك - الرئيسية"><img src="/ethark-logo-transparent.png" alt=""/><span><strong>إيثارك</strong><small>ETHARK</small></span></a>
      <nav aria-label="التنقل"><a href="/">الرئيسية</a><a href="/#about">عن إيثارك</a><a href="/#spaces">المساحات</a><a href="/#services">الخدمات</a><a href="/blog" aria-current={!slug ? "page" : undefined}>رؤى إيثارك</a></nav>
      <a className="ethark-blog-nav-cta" href="/#contact">تواصل معنا <ArrowUpLeft size={17}/></a>
    </div></header>
    <main>
      {loading ? <div className="ethark-blog-container ethark-blog-status" role="status">جارٍ تحميل المقالات...</div> :
       error ? <div className="ethark-blog-container ethark-blog-status" role="alert">{error}</div> :
       slug ? !post ? <section className="ethark-blog-container ethark-blog-status"><h1>هذا المقال غير متاح</h1><a href="/blog">العودة إلى رؤى إيثارك</a></section> :
       <>
        <section className="ethark-blog-article-top"><div className="ethark-blog-container">
          <div className="ethark-blog-breadcrumb"><a href="/">الرئيسية</a><span>/</span><a href="/blog">رؤى إيثارك</a><span>/</span><span>{post.title}</span></div>
          <span className="ethark-blog-eyebrow">رؤى إيثارك · المعرفة تصنع الفرص</span>
          <h1>{post.title}</h1>
          <p className="ethark-blog-intro">{excerptOf(post)}</p>
          <div className="ethark-blog-byline"><span><CalendarDays size={16}/>{dateOf(post.published_at)}</span><span><Clock3 size={16}/>{readTime(post)} دقائق قراءة</span><span>فريق إيثارك</span></div>
        </div></section>
        <div className="ethark-blog-container ethark-blog-article-wrap">
          {post.cover_image_url && <img className="ethark-blog-article-cover" src={post.cover_image_url} alt={post.image_alt || post.title}/>}
          <div className="ethark-blog-editorial-layout"><aside className="ethark-blog-toc"><h2>محتويات المقال</h2><nav aria-label="فهرس المقال">{headingsOf(post.content).map((h,i)=><a key={h.id} href={`#${h.id}`}><span>{String(i+1).padStart(2,"0")}</span>{h.title}</a>)}</nav><div className="ethark-blog-share"><strong>مشاركة المقال</strong><a href={`https://wa.me/?text=${encodeURIComponent(post.title+" "+window.location.href)}`} target="_blank" rel="noreferrer">واتساب</a><button type="button" onClick={()=>void navigator.clipboard?.writeText(window.location.href)}>نسخ الرابط</button></div></aside><article className="ethark-blog-article-paper"><ArticleBody text={post.content}/></article><aside className="ethark-blog-aside"><h2>مقالات ذات صلة</h2>{others.map(p=><a href={"/blog/"+encodeURIComponent(p.slug)} key={p.id}>{p.cover_image_url && <img src={p.cover_image_url} alt="" loading="lazy"/>}<span>{p.title}</span></a>)}<div className="ethark-blog-aside-cta"><strong>مساحة لأعمالك، منصة لنموك</strong><p>اكتشف خدمات إيثارك ومساحات العمل المناسبة لك.</p><a href="/#services">استكشف الخدمات</a></div></aside></div>
          <section className="ethark-blog-article-cta"><div><span>خطوتك القادمة تبدأ من هنا</span><h2>مساحة أعمالك، منصة نموك</h2><p>اكتشف مساحات العمل والخدمات التي تناسب طموح مشروعك.</p></div><a href="/#services">استكشف خدماتنا <ArrowLeft size={18}/></a></section>
          {others.length>0 && <section className="ethark-blog-related"><div className="ethark-blog-section-heading"><h2>قد يهمك أيضًا</h2><a href="/blog">جميع المقالات <ArrowLeft size={17}/></a></div><div className="ethark-blog-grid">{others.map(p=><ArticleCard key={p.id} post={p}/>)}</div></section>}
        </div>
       </> :
       <>
        <section className="ethark-blog-hero"><div className="ethark-blog-container"><span className="ethark-blog-eyebrow">مدونة إيثارك · أفكار تلهم أعمالك</span><h1>رؤى تصنع الفرق<br/><em>وفرص تنمو معك</em></h1><p>مساحة للمعرفة والأفكار العملية حول ريادة الأعمال، وبيئات العمل، وتطوير المشاريع في ينبع الصناعية.</p><a href="#articles">استكشف المقالات <ArrowLeft size={18}/></a></div></section>
        <section className="ethark-blog-container ethark-blog-listing" id="articles"><div className="ethark-blog-section-heading"><div><span className="ethark-blog-eyebrow">مكتبة المعرفة</span><h2>أحدث المقالات</h2></div><label className="ethark-blog-search"><Search size={19}/><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث في المقالات..." aria-label="البحث في المقالات"/></label></div>
        <div className="ethark-blog-grid">{filtered.map(p=><ArticleCard key={p.id} post={p}/>)}</div>
        {filtered.length===0 && <p className="ethark-blog-empty">{search ? "لم نعثر على مقالات مطابقة لبحثك." : "ترقبوا مقالاتنا قريبًا."}</p>}
        </section>
       </>}
    </main>
    <Footer/>
  </div>;
}
function ArticleCard({post}:{post:Post}){
  return <a className="ethark-blog-card" href={"/blog/"+encodeURIComponent(post.slug)}>
    <div className="ethark-blog-card-image">{post.cover_image_url ? <img src={post.cover_image_url} alt={post.image_alt || post.title} loading="lazy"/> : <div className="ethark-blog-image-fallback">إيثارك</div>}</div>
    <div className="ethark-blog-card-content"><span className="ethark-blog-card-category">ريادة الأعمال · مساحات العمل</span><h3>{post.title}</h3><p>{excerptOf(post)}</p><div className="ethark-blog-card-foot"><span>{dateOf(post.published_at)}</span><span>اقرأ المقال <ArrowLeft size={17}/></span></div></div>
  </a>;
}

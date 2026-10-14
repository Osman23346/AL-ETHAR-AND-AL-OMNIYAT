import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Category = { id: string; name: string };
type Post = { id: string; title: string; slug: string; excerpt: string | null; content: string; category_id: string | null; cover_image_url: string | null; image_alt: string | null; keywords: string[]; seo_title: string | null; seo_description: string | null; status: string; published_at: string | null; created_at: string };
type Draft = { title: string; slug: string; excerpt: string; content: string; category_id: string; cover_image_url: string; image_alt: string; keywords: string; seo_title: string; seo_description: string; status: "draft" | "published" };
const empty: Draft = { title: "", slug: "", excerpt: "", content: "", category_id: "", cover_image_url: "", image_alt: "", keywords: "", seo_title: "", seo_description: "", status: "draft" };
const slugify = (s: string) => s.trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, "-").replace(/-+/g, "-");

export default function BlogManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(empty);
  const [formOpen, setFormOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const load = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([
      supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("blog_categories").select("id,name").order("name")
    ]);
    if (p.error || c.error) setMessage(p.error?.message || c.error?.message || "تعذر التحميل");
    else { setPosts((p.data || []) as Post[]); setCategories((c.data || []) as Category[]); }
    setLoading(false);
  };
  useEffect(() => { void load(); }, []);
  const update = (key: keyof Draft, value: string) => setDraft(v => ({ ...v, [key]: value }));
  const start = (post?: Post) => {
    setEditing(post?.id || null);
    setDraft(post ? {
      title: post.title, slug: post.slug, excerpt: post.excerpt || "", content: post.content,
      category_id: post.category_id || "", cover_image_url: post.cover_image_url || "", image_alt: post.image_alt || "",
      keywords: (post.keywords || []).join("، "), seo_title: post.seo_title || "",
      seo_description: post.seo_description || "", status: post.status === "published" ? "published" : "draft"
    } : { ...empty });
    setFormOpen(true); setMessage("");
  };
  const save = async () => {
    if (!draft.title.trim() || !draft.content.trim() || !draft.slug.trim()) { setMessage("العنوان والمحتوى والرابط مطلوبة"); return; }
    setBusy(true); setMessage("");
    const payload = {
      title: draft.title.trim(), slug: slugify(draft.slug), excerpt: draft.excerpt.trim() || null,
      content: draft.content, category_id: draft.category_id || null, cover_image_url: draft.cover_image_url || null,
      image_alt: draft.image_alt || null, keywords: draft.keywords.split(/[,،]/).map(x => x.trim()).filter(Boolean),
      seo_title: draft.seo_title || null, seo_description: draft.seo_description || null,
      status: draft.status,
      published_at: draft.status === "published" ? (posts.find(p => p.id === editing)?.published_at || new Date().toISOString()) : null,
      updated_at: new Date().toISOString()
    };
    const result = editing ? await supabase.from("blog_posts").update(payload).eq("id", editing) : await supabase.from("blog_posts").insert(payload);
    setBusy(false);
    if (result.error) { setMessage(result.error.message); return; }
    setFormOpen(false); setMessage("تم حفظ المقال بنجاح"); await load();
  };
  const remove = async (post: Post) => {
    if (!window.confirm("حذف المقال: " + post.title + "؟")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (error) setMessage(error.message); else { setMessage("تم حذف المقال"); await load(); }
  };
  const upload = async (file?: File) => {
    if (!file) return;
    if (!["image/jpeg","image/png","image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) { setMessage("الصور المسموحة JPG أو PNG أو WebP بحجم أقصى 5MB"); return; }
    setBusy(true);
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const path = "blog/" + crypto.randomUUID() + "." + ext;
    const { error } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
    if (error) setMessage(error.message);
    else update("cover_image_url", supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl);
    setBusy(false);
  };
  const addCategory = async () => {
    const name = categoryName.trim();
    if (!name) return;
    const { error } = await supabase.from("blog_categories").insert({ name, slug: slugify(name) });
    if (error) setMessage(error.message); else { setCategoryName(""); await load(); }
  };
  const field = (label: string, key: keyof Draft, multiline = false) => <label className="blog-field"><span>{label}</span>{multiline ? <textarea rows={key === "content" ? 12 : 3} value={draft[key]} onChange={e => update(key,e.target.value)} /> : <input value={draft[key]} onChange={e => update(key,e.target.value)} />}</label>;
  return <section className="blog-admin" dir="rtl">
    <style>{`.blog-admin{padding:22px;color:#16342f}.blog-admin h1{margin:0 0 10px}.blog-admin button{cursor:pointer;border:1px solid #d3ded8;border-radius:10px;padding:10px 16px;background:white;color:#164c3d}.blog-admin .primary{background:#17664e;color:white}.blog-admin .toolbar{display:flex;gap:12px;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:20px}.blog-admin .blog-card{background:white;border:1px solid #e0e7e3;border-radius:16px;padding:18px;margin-bottom:12px}.blog-admin .blog-field{display:flex;flex-direction:column;gap:6px;font-weight:600;min-width:0}.blog-admin input,.blog-admin textarea,.blog-admin select{width:100%;box-sizing:border-box;border:1px solid #cbd8d1;border-radius:9px;padding:11px;font:inherit;background:white;color:#14372e}.blog-admin .fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.blog-admin .wide{grid-column:1/-1}.blog-admin .actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:15px}.blog-admin .notice{padding:12px;background:#f0f5f1;border-radius:8px;margin:12px 0;overflow-wrap:anywhere}.blog-admin .post-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.blog-admin .muted{color:#62736a;font-size:13px}@media(max-width:700px){.blog-admin{padding:12px}.blog-admin .fields{grid-template-columns:1fr}}`}</style>
    <div className="toolbar"><div><h1>المقالات والمدونة</h1><p>إدارة مقالات رؤى إيثارك ومسوداتها</p></div><button className="primary" onClick={() => start()}>+ مقال جديد</button></div>
    {message && <p className="notice" role="status">{message}</p>}
    {formOpen ? <div className="blog-card">
      <h2>{editing ? "تعديل المقال" : "إضافة مقال جديد"}</h2>
      <div className="fields">
        <div onBlur={() => { if (!draft.slug && draft.title) update("slug",slugify(draft.title)); }}>{field("عنوان المقال", "title")}</div>
        {field("رابط المقال (Slug)", "slug")}
        <label className="blog-field"><span>التصنيف</span><select value={draft.category_id} onChange={e=>update("category_id",e.target.value)}><option value="">بدون تصنيف</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <label className="blog-field"><span>حالة المقال</span><select value={draft.status} onChange={e=>update("status",e.target.value)}><option value="draft">مسودة</option><option value="published">منشور</option></select></label>
        <div className="wide">{field("ملخص المقال", "excerpt", true)}</div>
        <div className="wide">{field("محتوى المقال", "content", true)}</div>
        <label className="blog-field"><span>رفع الصورة الرئيسية (حتى 5MB)</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>void upload(e.target.files?.[0])} /></label>
        {field("وصف الصورة (Alt)", "image_alt")}
        <div className="wide">{field("رابط الصورة", "cover_image_url")}{draft.cover_image_url && <img src={draft.cover_image_url} alt={draft.image_alt || "معاينة"} style={{maxWidth:260,marginTop:10,borderRadius:10}} />}</div>
        {field("الكلمات المفتاحية (افصل بفاصلة)", "keywords")}
        {field("عنوان SEO", "seo_title")}
        <div className="wide">{field("وصف SEO", "seo_description", true)}</div>
      </div>
      <div className="actions"><button className="primary" disabled={busy} onClick={()=>void save()}>{busy ? "جارٍ الحفظ..." : "حفظ المقال"}</button><button onClick={()=>setFormOpen(false)}>إلغاء</button></div>
    </div> : <>
      <div className="blog-card"><strong>التصنيفات</strong><div className="actions"><input style={{maxWidth:300}} value={categoryName} onChange={e=>setCategoryName(e.target.value)} placeholder="اسم تصنيف جديد" /><button onClick={()=>void addCategory()}>إضافة تصنيف</button></div><p className="muted">{categories.map(c=>c.name).join(" • ") || "لا توجد تصنيفات"}</p></div>
      {loading ? <p>جارٍ تحميل المقالات...</p> : posts.length === 0 ? <p>لا توجد مقالات بعد. ابدأ بإضافة أول مقال.</p> : posts.map(p=><div className="blog-card post-row" key={p.id}><div><strong>{p.title}</strong><p className="muted">{p.status === "published" ? "منشور" : "مسودة"} • {new Date(p.created_at).toLocaleDateString("ar-SA")}</p></div><div className="actions"><button onClick={()=>start(p)}>تعديل</button><button onClick={()=>void remove(p)}>حذف</button></div></div>)}
    </>}
  </section>;
}

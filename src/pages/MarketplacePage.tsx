import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpLeft, BriefcaseBusiness, GraduationCap, Handshake, Laptop, Search, Sparkles, Wallet, Building2, Users, X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Footer from "../components/layout/Footer";
import "./marketplace.css";

type Category = { id: string; name_ar: string; slug: string; description: string | null; icon: string | null; sort_order: number };
type Listing = { id: string; category_id: string; partner_id: string; title: string; slug: string; description: string | null; image_url: string | null; listing_type: string; price_description: string | null; is_featured: boolean; published_at: string | null };
const fallbackCategories = [
  {slug:"software-tools",name_ar:"الأدوات والبرامج",icon:Laptop,description:"أدوات ومنصات تدعم أعمالك."},
  {slug:"jobs-talent",name_ar:"الوظائف والمواهب",icon:BriefcaseBusiness,description:"فرص وظيفية ومواهب مؤهلة."},
  {slug:"courses-training",name_ar:"التدريب والدورات",icon:GraduationCap,description:"طوّر مهاراتك ومعرفتك."},
  {slug:"funding-investment",name_ar:"التمويل والاستثمار",icon:Wallet,description:"فرص تمويل وبرامج دعم."},
  {slug:"professional-services",name_ar:"الخدمات المهنية",icon:Handshake,description:"استشارات وخدمات متخصصة."},
  {slug:"partnerships",name_ar:"الشراكات",icon:Users,description:"ابحث عن شركاء محتملين."},
  {slug:"workspaces",name_ar:"مساحات العمل",icon:Building2,description:"مكاتب وقاعات لاجتماعاتك."},
  {slug:"incubators-support",name_ar:"الحاضنات والدعم",icon:Sparkles,description:"برامج ومبادرات للنمو."},
];
export default function MarketplacePage() {
  const [categories,setCategories]=useState<Category[]>([]);
  const [listings,setListings]=useState<Listing[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("all");
  const [selected,setSelected]=useState<Listing | null>(null);
  useEffect(()=>{
    document.title="سوق إيثارك | فرص وأدوات لنمو أعمالك";
    let active=true;
    Promise.all([
      supabase.from("marketplace_public_categories").select("id,name_ar,slug,description,icon,sort_order").order("sort_order"),
      supabase.from("marketplace_public_listings").select("id,category_id,partner_id,title,slug,description,image_url,listing_type,price_description,is_featured,published_at").order("published_at",{ascending:false})
    ]).then(([c,l])=>{
      if(!active)return;
      if(c.error || l.error){setError("تعذر الاتصال بسوق إيثارك حاليًا. يرجى المحاولة لاحقًا.");}
      else {setCategories((c.data||[]) as Category[]);setListings((l.data||[]) as Listing[]);}
      setLoading(false);
    }).catch(()=>{if(active){setError("تعذر تحميل السوق.");setLoading(false);}});
    return()=>{active=false;};
  },[]);
  const visible=useMemo(()=>listings.filter(l=>(category==="all"||l.category_id===category)&&[l.title,l.description||""].join(" ").toLowerCase().includes(query.trim().toLowerCase())),[listings,category,query]);
  const activeCategory=categories.find(c=>c.id===category);
  return <div className="em" dir="rtl">
    <header className="em-nav"><div className="em-container em-nav-inner"><a href="/" className="em-brand"><img src="/ethark-logo-transparent.png" alt=""/><span><strong>إيثارك</strong><small>ETHARK</small></span></a><nav><a href="/">الرئيسية</a><a href="/blog">رؤى إيثارك</a><a href="/marketplace" aria-current="page">سوق إيثارك</a></nav><a className="em-nav-cta" href="/#contact">تواصل معنا <ArrowUpLeft size={17}/></a></div></header>
    <main>
      <section className="em-hero"><div className="em-container"><span className="em-eyebrow"><Sparkles size={16}/> فرصتك القادمة تبدأ هنا</span><h1>كل ما يحتاجه مشروعك،<br/><em>في مكان واحد.</em></h1><p>اكتشف الأدوات والخدمات والفرص التي تساعدك على تأسيس أعمالك وتطويرها. سوق إيثارك يجمع لك خيارات مختارة لرحلة نمو أكثر سهولة.</p><label className="em-hero-search"><Search size={20}/><input type="search" aria-label="ابحث في سوق إيثارك" placeholder="ابحث عن خدمة أو فرصة..." value={query} onChange={e=>setQuery(e.target.value)}/><a href="#results" aria-label="عرض نتائج البحث"><ArrowLeft size={20}/></a></label><div className="em-hero-tags"><span>أدوات رقمية</span><span>تدريب</span><span>شراكات</span><span>فرص أعمال</span></div></div><div className="em-hero-orb" aria-hidden="true"><div className="em-orb-mark"><img src="/ethark-logo-transparent.png" alt=""/><strong>إيثارك</strong><span>سوق الأعمال</span></div></div></section>
      <section className="em-container em-section" id="explore"><div className="em-section-heading"><div><span className="em-overline">اكتشف ما يناسبك</span><h2>مجالات تدعم طموحك</h2><p>اختر المجال الذي تبحث عنه لتجد الفرص المتاحة.</p></div><a className="em-all-link" href="#results">عرض الفرص <ArrowLeft size={17}/></a></div><div className="em-categories"><button className={category==="all"?"active":""} onClick={()=>setCategory("all")}><Sparkles size={22}/><span>جميع الفرص<small>تصفح كل الفرص المتاحة.</small></span><i aria-hidden="true"><ArrowLeft size={16}/></i></button>{fallbackCategories.map(item=>{const Icon=item.icon;const found=categories.find(c=>c.slug===item.slug);return <button key={item.slug} disabled={!found} className={category===found?.id?"active":""} onClick={()=>found&&setCategory(found.id)}><Icon size={22}/><span>{found?.name_ar||item.name_ar}<small>{item.description}</small></span><i aria-hidden="true"><ArrowLeft size={16}/></i>{!found&&<b className="em-soon">قريبًا</b>}</button>;})}</div><div className="em-highlights"><a href="#results" className="em-highlight"><span className="em-highlight-icon"><Sparkles size={27}/></span><strong>فرص وخدمات نوعية</strong><small>من شركاء موثوقين لدعم رحلتك.</small><span className="em-highlight-action">تصفح الفرص <ArrowLeft size={16}/></span></a><a href="#results" className="em-highlight"><span className="em-highlight-icon"><Laptop size={27}/></span><strong>أدوات رقمية فعّالة</strong><small>حلول تقنية تساعدك على التطور.</small><span className="em-highlight-action">اكتشف الأدوات <ArrowLeft size={16}/></span></a><a href="/#spaces" className="em-highlight"><span className="em-highlight-icon"><Building2 size={27}/></span><strong>مساحات عمل ملهمة</strong><small>مكاتب وقاعات مجهزة لدعم أعمالك.</small><span className="em-highlight-action">تعرّف على المساحات <ArrowLeft size={16}/></span></a></div></section>
      <section className="em-results" id="results"><div className="em-container"><div className="em-results-heading"><div><span className="em-overline">فرص مختارة لك</span><h2>{activeCategory?.name_ar||"استكشف السوق"}</h2></div><label className="em-search"><Search size={20}/><input type="search" placeholder="ابحث عن خدمة أو فرصة..." value={query} onChange={e=>setQuery(e.target.value)}/></label></div>
      {loading?<p className="em-state" role="status">جارٍ تحميل الفرص...</p>:error?<p className="em-state" role="alert">{error}</p>:visible.length===0?<div className="em-empty"><Sparkles size={30}/><h3>{query?"لا توجد نتائج مطابقة":"فرص جديدة في الطريق"}</h3><p>{query?"جرّب كلمة بحث مختلفة.":"نعمل على إضافة شركاء وفرص نوعية. تابعنا قريبًا."}</p></div>:<div className="em-grid">{visible.map(item=><article className="em-card" key={item.id}><div className="em-card-media">{item.image_url?<img src={item.image_url} alt="" loading="lazy"/>:<span><Sparkles size={36}/></span>}{item.is_featured&&<b>مميز</b>}</div><div className="em-card-body"><small>{categories.find(c=>c.id===item.category_id)?.name_ar||"فرص أعمال"}</small><h3>{item.title}</h3><p>{item.description||"اكتشف تفاصيل هذه الفرصة."}</p><div className="em-card-foot"><span>{item.price_description||"التفاصيل عند التواصل"}</span><button onClick={()=>setSelected(item)}>التفاصيل <ArrowLeft size={16}/></button></div></div></article>)}</div>}</div></section>
      <section className="em-container em-bottom"><div><span className="em-overline">ننمو معًا</span><h2>لديك خدمة أو فرصة تناسب مجتمع الأعمال؟</h2><p>تواصل مع فريق إيثارك لبحث فرص التعاون وإضافة خدماتك إلى السوق.</p></div><a href="/#contact">تواصل معنا <ArrowUpLeft size={18}/></a></section><section className="em-benefits em-container"><div><Sparkles size={23}/><strong>فرص متنوعة</strong><small>في مجالات الأعمال والنمو</small></div><div><Handshake size={23}/><strong>شركاء موثوقون</strong><small>فرص تعاون واكتشاف</small></div><div><Search size={23}/><strong>سهولة الوصول</strong><small>ابحث وتواصل مباشرة</small></div><div><Users size={23}/><strong>دعم مجتمع الأعمال</strong><small>لرحلة نمو أكثر استدامة</small></div></section>
    </main><Footer/>
    {selected&&<div className="em-modal-backdrop" onClick={()=>setSelected(null)}><div className="em-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={e=>e.stopPropagation()}><button className="em-close" onClick={()=>setSelected(null)} aria-label="إغلاق"><X size={20}/></button><span className="em-overline">سوق إيثارك</span><h2>{selected.title}</h2><p>{selected.description||"للمزيد من المعلومات، تواصل مع فريق إيثارك."}</p>{selected.price_description&&<strong>{selected.price_description}</strong>}<a href="/#contact" className="em-primary">استفسر عن الفرصة <ArrowUpLeft size={17}/></a></div></div>}
  </div>;
}
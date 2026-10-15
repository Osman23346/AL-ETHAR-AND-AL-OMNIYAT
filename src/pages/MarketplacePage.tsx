import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpLeft, BriefcaseBusiness, GraduationCap, Handshake, Laptop, Search, Sparkles, Wallet, Building2, Users, Lightbulb, ShoppingBag, Star, TrendingUp, Menu, X, CalendarDays } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import MarketplaceImage from "../components/MarketplaceImage";
import Footer from "../components/layout/Footer";
import "./marketplace.css";

type Category={id:string;name_ar:string;slug:string;description:string|null;icon:string|null;sort_order:number};
type Listing={id:string;category_id:string;partner_id:string|null;title:string;slug:string;description:string|null;image_url:string|null;listing_type:string;price_description:string|null;is_featured:boolean;published_at:string|null};
type Partner={id:string;name:string;logo_url:string|null};
const categoriesUI=[
 {slug:"software-tools",title:"البرامج والأدوات",desc:"المحاسبة، إدارة المشاريع، التسويق، المتاجر والذكاء الاصطناعي",icon:Laptop},
 {slug:"jobs-talent",title:"التوظيف والكفاءات",desc:"البحث عن موظفين، مستقلين، خبراء وشركات توظيف",icon:Users},
 {slug:"courses-training",title:"الدورات والتدريب",desc:"ورش العمل، الشهادات المهنية وبرامج التطوير",icon:GraduationCap},
 {slug:"funding-investment",title:"التمويل والاستثمار",desc:"المستثمرون، مسرعات الأعمال، المنح وفرص التمويل",icon:TrendingUp},
 {slug:"professional-services",title:"الخدمات المهنية",desc:"الخدمات القانونية والمحاسبية والاستشارية والتسويقية",icon:BriefcaseBusiness},
 {slug:"partnerships",title:"الشراكات والفرص",desc:"شركاء الأعمال، الموردون والامتياز التجاري",icon:Handshake},
 {slug:"workspaces",title:"المكاتب والمساحات",desc:"المكاتب المشتركة والخاصة وقاعات الاجتماعات",icon:Building2},
 {slug:"incubators-support",title:"الحاضنات وبرامج الدعم",desc:"برامج الاحتضان والإرشاد والتمكين ودعم المشاريع",icon:Lightbulb}
];
const editorialImages=[
 "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85",
 "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=85",
 "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=85",
 "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85"
];
export default function MarketplacePage(){
 const [categories,setCategories]=useState<Category[]>([]);
 const [listings,setListings]=useState<Listing[]>([]);
 const [partners,setPartners]=useState<Partner[]>([]);
 const [query,setQuery]=useState("");
 const [category,setCategory]=useState("all");
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState("");
 const [page,setPage]=useState(0);
 const [mobileMenu,setMobileMenu]=useState(false);
 useEffect(()=>{
  document.title="سوق إيثارك | كل ما يحتاجه مشروعك في مكان واحد";
  let alive=true;
  Promise.all([
   supabase.from("marketplace_public_categories").select("id,name_ar,slug,description,icon,sort_order").order("sort_order"),
   supabase.from("marketplace_public_listings").select("id,category_id,partner_id,title,slug,description,image_url,listing_type,price_description,is_featured,published_at").order("published_at",{ascending:false}),
   supabase.from("marketplace_public_partners").select("id,name,logo_url")
  ]).then(([c,l,p])=>{
   if(!alive)return;
   if(c.error||l.error){setError("تعذر تحميل بيانات السوق حاليًا. حاول مرة أخرى لاحقًا.");}
   else{setCategories((c.data||[]) as Category[]);setListings((l.data||[]) as Listing[]);}
   if(!p.error)setPartners((p.data||[]) as Partner[]);
   setLoading(false);
  }).catch(()=>{if(alive){setError("تعذر الاتصال بالسوق.");setLoading(false);}});
  return()=>{alive=false;};
 },[]);
 const visible=useMemo(()=>listings.filter(l=>(category==="all"||l.category_id===category)&&[l.title,l.description||""].join(" ").toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())),[listings,category,query]);
 const featured=useMemo(()=>[...visible].sort((a,b)=>Number(b.is_featured)-Number(a.is_featured)),[visible]);
 const pages=Math.max(1,Math.ceil(featured.length/4));
 const shown=featured.slice(Math.min(page,pages-1)*4,Math.min(page,pages-1)*4+4);
 const choose=(id:string)=>{setCategory(id);setPage(0);document.getElementById("offers")?.scrollIntoView({behavior:"smooth",block:"start"});};
 const nav=<><a href="/">الرئيسية</a><a href="/about">عن إيثارك</a><a href="/#spaces">المساحات</a><a href="/#services">الخدمات</a><a className="active" href="/marketplace">سوق إيثارك</a><a href="/blog">المدونة</a><a href="/#contact">تواصل معنا</a></>;
 return <div className="em em-v2" dir="rtl">
  <header className="em2-header"><div className="em2-shell em2-nav"><a href="/" className="em2-brand"><img src="/ethark-logo-transparent.png" alt="شعار إيثارك"/><span><strong>إيثارك</strong><small>ETHARK</small></span></a><nav className="em2-links" aria-label="القائمة الرئيسية">{nav}</nav><div className="em2-nav-actions"><a className="em2-tour" href="/#contact"><CalendarDays size={17}/> احجز جولة</a><button className="em2-menu-btn" aria-label={mobileMenu?"إغلاق القائمة":"فتح القائمة"} aria-expanded={mobileMenu} onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</button></div></div>{mobileMenu&&<nav className="em2-mobile-nav" aria-label="قائمة الجوال" onClick={()=>setMobileMenu(false)}>{nav}</nav>}</header>
  <main>
   <section className="em2-hero"><div className="em2-shell em2-hero-inner"><div className="em2-hero-copy"><div className="em2-title-line"><ShoppingBag size={47} strokeWidth={1.7}/><div><h1>سوق إيثارك</h1><span>ETHARK MARKETPLACE</span></div></div><h2>كل ما يحتاجه مشروعك في مكان واحد</h2><p>اكتشف الأدوات والبرامج والكوادر والفرص والخدمات التي تساعدك على الانطلاق والنمو، من جهات موثوقة وشركاء معتمدين.</p></div><form className="em2-search" onSubmit={e=>{e.preventDefault();document.getElementById("offers")?.scrollIntoView({behavior:"smooth"});}}><Search size={23}/><input type="search" aria-label="ابحث في سوق إيثارك" placeholder="ابحث عن موظف، برنامج، دورة، مستثمر أو خدمة..." value={query} onChange={e=>{setQuery(e.target.value);setPage(0);}}/><button type="submit">بحث</button></form><div className="em2-popular"><strong>الأكثر بحثًا:</strong>{["برامج المحاسبة","التسويق الرقمي","فرص استثمار","وظائف وتقنيين","دورات تدريبية","خدمات قانونية"].map(t=><button key={t} onClick={()=>{setQuery(t);setCategory("all");setPage(0);document.getElementById("offers")?.scrollIntoView({behavior:"smooth"});}}>{t}</button>)}</div></div></section>
   <section className="em2-shell em2-category-section"><div className="em2-section-head"><div><h2>تصفح حسب الفئة</h2><p>اختر ما يناسب مرحلة مشروعك</p></div></div><div className="em2-categories">{categoriesUI.map(item=>{const found=categories.find(c=>c.slug===item.slug);const Icon=item.icon;return <button key={item.slug} className={"em2-category"+(category===found?.id?" selected":"")} disabled={!found} onClick={()=>found&&choose(found.id)}><span className="em2-category-icon"><Icon size={27}/></span><span className="em2-category-copy"><strong>{found?.name_ar||item.title}</strong><small>{item.desc}</small></span>{!found&&<span className="em2-soon">قريبًا</span>}</button>;})}</div></section>
   <section id="offers" className="em2-shell em2-offers"><div className="em2-section-head em2-offers-head"><div><h2><Star size={24} fill="currentColor"/> {category==="all"?"عروض مميزة":categories.find(c=>c.id===category)?.name_ar||"العروض المتاحة"}</h2><p>فرص وخدمات مختارة من شركائنا</p></div><button className="em2-outline" onClick={()=>{setCategory("all");setQuery("");setPage(0);}}>عرض جميع العروض <ArrowLeft size={17}/></button></div>
    {loading?<p className="em2-message" role="status">جارٍ تحميل الفرص...</p>:error?<p className="em2-message" role="alert">{error}</p>:featured.length===0?<div className="em2-empty"><Sparkles size={34}/><h3>{query?"لا توجد نتائج مطابقة":"الفرص الجديدة في الطريق"}</h3><p>{query?"جرّب عبارة بحث أخرى أو استعرض كل التصنيفات.":"نعمل على إضافة فرص وخدمات حقيقية من شركائنا. تصفح المجالات المتاحة وتابع الجديد."}</p>{(query||category!=="all")&&<button onClick={()=>{setQuery("");setCategory("all");}}>عرض جميع الفرص</button>}<div className="em2-editorial">{categoriesUI.slice(0,4).map((c,i)=><div className="em2-editorial-card" key={c.slug}><img src={editorialImages[i]} alt="" loading="lazy"/><span>{c.title}</span></div>)}</div></div>:<><div className="em2-offer-grid">{shown.map((item,i)=><article className="em2-offer-card" key={item.id}><div className="em2-offer-media"><MarketplaceImage src={item.image_url} alt={item.title}/><span className="em2-offer-badge">{item.is_featured?"مميز":categories.find(c=>c.id===item.category_id)?.name_ar||"فرصة"}</span></div><div className="em2-offer-body"><h3>{item.title}</h3><p>{item.description||"اكتشف تفاصيل الفرصة والخدمات المتاحة."}</p><div className="em2-offer-bottom"><small>{item.price_description||"التفاصيل عند التواصل"}</small><a href={"/marketplace/"+encodeURIComponent(item.slug)}>انتقل إلى العرض <ArrowUpLeft size={15}/></a></div></div></article>)}</div>{pages>1&&<div className="em2-pagination"><button aria-label="الصفحة السابقة" onClick={()=>setPage(Math.max(0,page-1))} disabled={page===0}><ArrowRight/></button>{Array.from({length:Math.min(pages,7)},(_,i)=><button key={i} className={"em2-dot"+(i===page?" active":"")} aria-label={"صفحة "+(i+1)} onClick={()=>setPage(i)}/>)}<button aria-label="الصفحة التالية" onClick={()=>setPage(Math.min(pages-1,page+1))} disabled={page>=pages-1}><ArrowLeft/></button></div>}</>}
   </section>
   {partners.length>0&&<section className="em2-partners"><div className="em2-shell"><div className="em2-section-head"><div><h2>شركاؤنا في سوق إيثارك</h2><p>نفخر بالتعاون مع جهات تدعم رواد الأعمال</p></div></div><div className="em2-partner-grid">{partners.map(p=><div className="em2-partner-card" key={p.id}>{p.logo_url?<MarketplaceImage src={p.logo_url} alt={p.name}/>:<strong>{p.name}</strong>}</div>)}</div></div></section>}
   <section className="em2-join"><div className="em2-shell em2-join-inner"><div className="em2-join-brand"><img src="/ethark-logo-transparent.png" alt=""/><span>إيثارك <small>ETHARK</small></span></div><div className="em2-join-perks"><span><TrendingUp size={29}/> نمو مستدام</span><span><Users size={29}/> وصول أوسع</span><span><BriefcaseBusiness size={29}/> فرص أكثر</span></div><div className="em2-join-copy"><h2>انضم إلى سوق إيثارك كشريك</h2><p>اعرض خدماتك ومنتجاتك على مجتمع رواد الأعمال والشركات الناشئة في بيئة موثوقة وداعمة للنمو.</p><a href="/#contact">سجّل كشريك <ArrowLeft size={18}/></a></div></div></section>
  </main><div className="em2-footer"><Footer/></div>
 </div>;
}
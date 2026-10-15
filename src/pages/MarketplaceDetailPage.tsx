import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpLeft, CalendarDays, Handshake, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Footer from "../components/layout/Footer";
import "./marketplace.css";

type Listing={id:string;title:string;slug:string;description:string|null;image_url:string|null;price_description:string|null;published_at:string|null;category_id:string;partner_id:string};
type Category={id:string;name_ar:string};
type Partner={id:string;name:string;description:string|null;logo_url:string|null;website_url:string|null};
export default function MarketplaceDetailPage({slug}:{slug:string}){
 const [listing,setListing]=useState<Listing|null>(null);
 const [category,setCategory]=useState<Category|null>(null);
 const [partner,setPartner]=useState<Partner|null>(null);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState("");
 useEffect(()=>{
  let active=true;
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)){setError("هذا الرابط غير صالح.");setLoading(false);return;}
  (async()=>{
   const {data,error:e}=await supabase.from("marketplace_public_listings").select("id,title,slug,description,image_url,price_description,published_at,category_id,partner_id").eq("slug",slug).maybeSingle();
   if(!active)return;
   if(e){setError("تعذر تحميل تفاصيل الفرصة. حاول مرة أخرى.");setLoading(false);return;}
   if(!data){setError("هذه الفرصة غير متاحة حاليًا.");setLoading(false);return;}
   const item=data as Listing;
   setListing(item);document.title=item.title+" | سوق إيثارك";
   const [c,p]=await Promise.all([
    supabase.from("marketplace_public_categories").select("id,name_ar").eq("id",item.category_id).maybeSingle(),
    supabase.from("marketplace_public_partners").select("id,name,description,logo_url,website_url").eq("id",item.partner_id).maybeSingle()
   ]);
   if(!active)return;
   if(!c.error)setCategory(c.data as Category|null);
   if(!p.error)setPartner(p.data as Partner|null);
   setLoading(false);
  })().catch(()=>{if(active){setError("تعذر تحميل التفاصيل.");setLoading(false);}});
  return()=>{active=false;};
 },[slug]);
 return <div className="em" dir="rtl"><header className="em-nav"><div className="em-container em-nav-inner"><a href="/" className="em-brand"><img src="/ethark-logo-transparent.png" alt=""/><span><strong>إيثارك</strong><small>ETHARK</small></span></a><nav><a href="/">الرئيسية</a><a href="/marketplace" aria-current="page">سوق إيثارك</a></nav><a href="/marketplace" className="em-nav-cta"><ArrowRight size={18}/> العودة للسوق</a></div></header><main><div className="em-detail-hero"><div className="em-container"><a className="em-detail-back" href="/marketplace"><ArrowRight size={18}/> جميع الفرص</a><span className="em-eyebrow"><Sparkles size={16}/> سوق إيثارك</span><h1>{listing?.title||"تفاصيل الفرصة"}</h1><p>اكتشف التفاصيل والجهة المقدمة لهذه الفرصة.</p></div></div><div className="em-container em-detail-content">{loading?<p className="em-state" role="status">جارٍ تحميل تفاصيل الفرصة...</p>:error?<div className="em-empty"><Sparkles size={34}/><h2>{error}</h2><a className="em-primary" href="/marketplace">العودة إلى السوق <ArrowRight size={17}/></a></div>:listing&&<div className="em-detail-grid"><article className="em-detail-main">{listing.image_url&&<img className="em-detail-image" src={listing.image_url} alt="" loading="lazy"/>}<span className="em-overline">{category?.name_ar||"فرصة أعمال"}</span><h2>{listing.title}</h2><p className="em-detail-description">{listing.description||"للمزيد من المعلومات عن هذه الفرصة، تواصل مع فريق إيثارك."}</p>{listing.published_at&&<div className="em-detail-date"><CalendarDays size={17}/> تاريخ النشر: {new Intl.DateTimeFormat("ar-SA",{year:"numeric",month:"long",day:"numeric"}).format(new Date(listing.published_at))}</div>}</article><aside className="em-detail-aside"><span className="em-overline">معلومات الفرصة</span>{listing.price_description&&<div className="em-detail-fact"><small>السعر أو التكلفة</small><strong>{listing.price_description}</strong></div>}{partner&&<div className="em-detail-partner"><Handshake size={22}/><small>الجهة المقدمة</small><strong>{partner.name}</strong>{partner.description&&<p>{partner.description}</p>}</div>}<a className="em-primary" href="/#contact">استفسر عن الفرصة <ArrowUpLeft size={18}/></a><p className="em-detail-note">يمكنك التواصل مع فريق إيثارك لمعرفة المزيد عن الفرصة.</p></aside></div>}</div><section className="em-container em-bottom"><div><span className="em-overline">فرص أكثر</span><h2>واصل اكتشاف فرص الأعمال</h2><p>تصفح بقية التصنيفات والخدمات المتاحة في سوق إيثارك.</p></div><a href="/marketplace">العودة إلى السوق <ArrowRight size={18}/></a></section></main><Footer/></div>;
}
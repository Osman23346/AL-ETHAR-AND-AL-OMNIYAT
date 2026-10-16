import {useState} from "react";
import {supabase} from "../lib/supabaseClient";
import "./employee-registry.css";
type Tax={output_tax:number;input_tax:number;net_tax:number};
export default function VatReport(){
 const [from,setFrom]=useState(new Date(new Date().getFullYear(),new Date().getMonth(),1).toLocaleDateString("en-CA"));
 const [to,setTo]=useState(new Date().toLocaleDateString("en-CA"));
 const [data,setData]=useState<Tax|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState("");
 async function load(){setError("");if(from>to){setError("نطاق التاريخ غير صحيح");return;}setBusy(true);const r=await supabase.rpc("accounting_admin_tax_summary",{p_from:from,p_to:to});setBusy(false);if(r.error){setError(r.error.message);return;}setData((r.data||[])[0]||null);}
 const money=(n:number)=>Number(n||0).toLocaleString("ar-SA",{minimumFractionDigits:2,maximumFractionDigits:2});
 return <div className="staff-registry" dir="rtl"><section className="staff-panel"><h2>ملخص حسابات ضريبة القيمة المضافة</h2><p>هذا التقرير من حركة حسابي ضريبة المخرجات والمدخلات في القيود المرحّلة، ولا يُعد إقرارًا ضريبيًا رسميًا.</p><div className="staff-form"><label>من تاريخ<input type="date" value={from} onChange={e=>setFrom(e.target.value)}/></label><label>إلى تاريخ<input type="date" value={to} onChange={e=>setTo(e.target.value)}/></label></div><div className="staff-actions"><button className="staff-save" disabled={busy} onClick={()=>void load()}>{busy?"جارٍ التحميل":"عرض ملخص الضريبة"}</button></div>{error&&<p className="staff-error">{error}</p>}{data&&<div><p>ضريبة المخرجات: {money(data.output_tax)} ر.س</p><p>ضريبة المدخلات: {money(data.input_tax)} ر.س</p><h3>صافي حركة الضريبة: {money(data.net_tax)} ر.س</h3><p>يجب مراجعة أهلية خصم المدخلات والتسويات وتصنيفات العمليات قبل تقديم الإقرار.</p></div>}</section></div>;
}

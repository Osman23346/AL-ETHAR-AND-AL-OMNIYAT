import {useEffect,useState} from "react";
import {supabase} from "../lib/supabaseClient";
type Role={user_id:string;role:string;assigned_at:string};
export default function AccountingPermissions(){
const [user,setUser]=useState(""),[role,setRole]=useState("viewer"),[rows,setRows]=useState<Role[]>([]),[message,setMessage]=useState("");
async function load(){const r=await supabase.rpc("accounting_admin_roles");if(r.error)setMessage(r.error.message);else setRows(r.data||[]);}
useEffect(()=>{void load();},[]);
async function save(){if(!/^[0-9a-f-]{36}$/i.test(user)){setMessage("أدخل معرف مستخدم صحيحًا من نظام الإدارة");return;}if(!window.confirm("تعيين صلاحية المحاسبة لهذا المستخدم؟"))return;const r=await supabase.rpc("accounting_admin_role_assign",{p_user:user,p_role:role});setMessage(r.error?.message||"تم حفظ الدور");if(!r.error){setUser("");void load();}}
return <div dir="rtl"><h2>صلاحيات المحاسبة</h2><p>المستخدم يجب أن يكون مضافًا مسبقًا إلى مسؤولي الإدارة. المشاهد لا يمكنه تعديل القيود، وإقفال الفترة متاح للمدير فقط. مسؤولو الإدارة دون دور محاسبي محدد يحتفظون بصلاحياتهم الحالية.</p><label>معرف المستخدم (UUID) <input value={user} onChange={e=>setUser(e.target.value)} placeholder="معرف من حسابات الإدارة"/></label><label>الدور <select value={role} onChange={e=>setRole(e.target.value)}><option value="manager">مدير المحاسبة</option><option value="accountant">محاسب</option><option value="viewer">مشاهد</option></select></label><button onClick={()=>void save()}>حفظ الصلاحية</button><p>{message}</p><h3>المستخدمون المعيّنون</h3>{rows.map(r=><p key={r.user_id}>{r.user_id} — {r.role}</p>)}</div>;
}
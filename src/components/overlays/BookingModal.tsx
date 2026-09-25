import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, Clock3, LoaderCircle, ShieldCheck, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../../lib/supabaseClient";
import type { Service } from "../../data/siteData";
import type { BookingSubmitState } from "../../hooks/useServiceBooking";

type BookingModalProps = {
  service: Service | null;
  submitted: boolean;
  submitState: BookingSubmitState;
  submitError: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type ServiceFeature = { id: number; service_id: number; title: string; active: boolean; sort_order: number };

function BookingModal({ service, submitted, submitState, submitError, onClose, onSubmit }: BookingModalProps) {
  const [features, setFeatures] = useState<ServiceFeature[]>([]);
  const [featuresLoading, setFeaturesLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", people: "", date: "", time: "", notes: "" });
  const [stepError, setStepError] = useState("");

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    if (!service) { setFeatures([]); return; }
    setStep(1); setStepError("");
    setForm({ name: "", phone: "", email: "", people: "", date: "", time: "", notes: "" });
    let mounted = true;
    const loadFeatures = async () => {
      setFeaturesLoading(true);
      const { data, error } = await supabase.from("service_features").select("id,service_id,title,active,sort_order").eq("service_id", service.id).eq("active", true).order("sort_order", { ascending: true });
      if (mounted) { setFeatures(error ? [] : ((data ?? []) as ServiceFeature[])); setFeaturesLoading(false); }
    };
    loadFeatures();
    return () => { mounted = false; };
  }, [service]);

  useEffect(() => {
    if (!service) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape" && submitState !== "submitting") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = oldOverflow; };
  }, [service, onClose, submitState]);

  if (!service) return null;

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const goNext = () => {
    if (!form.name.trim() || !/^05\d{8}$/.test(form.phone.replace(/\s/g, ""))) {
      setStepError("أدخل الاسم ورقم جوال سعودي صحيح بصيغة 05xxxxxxxx."); return;
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) { setStepError("تحقق من صيغة البريد الإلكتروني."); return; }
    setStepError(""); setStep(2);
  };

  const modalContent = (
    <div className="modal-backdrop booking-experience" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title" onMouseDown={(e) => { if (e.target === e.currentTarget && submitState !== "submitting") onClose(); }}>
      <div className="booking-modal booking-modal-v2">
        <button className="modal-close" onClick={onClose} disabled={submitState === "submitting"} aria-label="إغلاق نموذج طلب الخدمة" type="button"><X size={21} /></button>

        {!submitted ? (
          <>
            <div className="booking-progress" aria-label="خطوات طلب الخدمة">
              <div className={`booking-progress-item ${step >= 1 ? "active" : ""}`}><span>1</span><strong>بيانات التواصل</strong></div>
              <div className="booking-progress-line"><i style={{ width: step === 2 ? "100%" : "0%" }} /></div>
              <div className={`booking-progress-item ${step >= 2 ? "active" : ""}`}><span>2</span><strong>الموعد والتفاصيل</strong></div>
            </div>

            <div className="modal-header booking-v2-header">
              <span className="eyebrow">طلب خدمة</span>
              <h2 id="booking-modal-title">{service.title}</h2>
              <p>{step === 1 ? "أدخل بيانات التواصل وسنكمل معك تفاصيل الطلب في الخطوة التالية." : "اختر الموعد المناسب وأضف أي تفاصيل تساعدنا على خدمتك بشكل أفضل."}</p>
            </div>

            {step === 1 && !featuresLoading && features.length > 0 && (
              <div className="booking-service-features compact"><div className="booking-features-heading"><span className="booking-features-icon"><Check size={17} /></span><div><strong>ما تتضمنه الخدمة</strong><span>مزايا مختارة ضمن طلبك</span></div></div><ul>{features.slice(0, 4).map((feature) => <li key={feature.id}><span className="feature-check"><Check size={14} /></span><span>{feature.title}</span></li>)}</ul></div>
            )}

            <form onSubmit={onSubmit} dir="rtl" noValidate>
              {step === 1 ? (
                <div className="booking-step-panel">
                  <div className="form-grid">
                    <label>الاسم الكامل <span className="required-dot">*</span><input required name="name" value={form.name} onChange={update} type="text" placeholder="اكتب اسمك" autoComplete="name" /></label>
                    <label>رقم الجوال <span className="required-dot">*</span><input required name="phone" value={form.phone} onChange={update} type="tel" inputMode="tel" placeholder="05xxxxxxxx" autoComplete="tel" dir="ltr" /></label>
                    <label>البريد الإلكتروني <span className="optional-label">اختياري</span><input name="email" value={form.email} onChange={update} type="email" placeholder="example@email.com" autoComplete="email" dir="ltr" /></label>
                    <label>عدد الأشخاص <span className="optional-label">اختياري</span><input name="people" value={form.people} onChange={update} type="number" min="1" placeholder="مثال: 4" /></label>
                  </div>
                  {stepError && <div className="booking-inline-error" role="alert">{stepError}</div>}
                  <button className="submit-button" type="button" onClick={goNext}><span>متابعة إلى الموعد</span><ArrowLeft size={19} /></button>
                </div>
              ) : (
                <div className="booking-step-panel">
                  <input type="hidden" name="name" value={form.name} /><input type="hidden" name="phone" value={form.phone} /><input type="hidden" name="email" value={form.email} /><input type="hidden" name="people" value={form.people} />
                  <div className="booking-summary"><div><span>الخدمة</span><strong>{service.title}</strong></div><div><span>مقدم الطلب</span><strong>{form.name}</strong></div></div>
                  <div className="form-grid">
                    <label>التاريخ <span className="required-dot">*</span><div className="input-icon"><CalendarDays size={18} /><input required name="date" value={form.date} onChange={update} min={today} type="date" /></div></label>
                    <label>الوقت <span className="required-dot">*</span><div className="input-icon"><Clock3 size={18} /><input required name="time" value={form.time} onChange={update} type="time" /></div></label>
                  </div>
                  <label>ملاحظات إضافية <span className="optional-label">اختياري</span><textarea name="notes" value={form.notes} onChange={update} rows={4} placeholder="اكتب أي تفاصيل أو متطلبات..." /></label>
                  {submitError && <div className="booking-inline-error" role="alert">{submitError}</div>}
                  <div className="booking-actions"><button className="booking-back-button" type="button" disabled={submitState === "submitting"} onClick={() => setStep(1)}><ArrowRight size={18} /> رجوع</button><button className="submit-button" type="submit" disabled={submitState === "submitting"}>{submitState === "submitting" ? <><LoaderCircle className="booking-spinner" size={19} /><span>جاري إرسال الطلب...</span></> : <><span>تأكيد وإرسال الطلب</span><ArrowLeft size={19} /></>}</button></div>
                  <p className="booking-privacy"><ShieldCheck size={16} /> بياناتك تستخدم فقط للتواصل بشأن هذا الطلب.</p>
                </div>
              )}
            </form>
          </>
        ) : (
          <div className="success-state booking-success-v2" role="status" aria-live="polite"><div className="success-icon"><CheckCircle2 size={46} /></div><span className="success-kicker">تم استلام الطلب</span><h2>طلبك وصلنا بنجاح</h2><p>شكرًا {form.name || "لك"}. سيتواصل معك فريق إيثاركو لتأكيد الموعد والتفاصيل.</p><div className="success-summary"><span>{service.title}</span>{form.date && <strong>{form.date} · {form.time}</strong>}</div><button className="submit-button" onClick={onClose} type="button">العودة للموقع</button></div>
        )}
      </div>
    </div>
  );
  return createPortal(modalContent, document.body);
}
export default BookingModal;

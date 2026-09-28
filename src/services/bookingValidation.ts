export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function validateBookingContact(form: { name: string; phone: string; email: string; people: string }): string {
  if (!form.name.trim() || !/^05\d{8}$/.test(form.phone.replace(/\s/g, ""))) {
    return "أدخل الاسم ورقم جوال سعودي صحيح بصيغة 05xxxxxxxx.";
  }
  if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return "تحقق من صيغة البريد الإلكتروني.";
  if (form.people && (!Number.isSafeInteger(Number(form.people)) || Number(form.people) < 1)) return "عدد الأشخاص يجب أن يكون عددًا صحيحًا أكبر من صفر.";
  return "";
}

export function validateBookingDate(date: string, time: string, now = new Date()): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return "اختر تاريخ ووقت الموعد.";
  const requested = new Date(`${date}T${time}`);
  if (Number.isNaN(requested.getTime()) || localDate(requested) !== date || requested <= now) return "اختر موعدًا في المستقبل.";
  return "";
}

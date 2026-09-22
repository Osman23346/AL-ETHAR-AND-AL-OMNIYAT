
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  X
} from "lucide-react";

import type { Service } from "../data/siteData";

type BookingModalProps = {
  service: Service | null;
  submitted: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function BookingModal({
  service,
  submitted,
  onClose,
  onSubmit
}: BookingModalProps) {
  if (!service) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="booking-modal">

        <button
          className="modal-close"
          onClick={onClose}
          aria-label="إغلاق"
          type="button"
        >
          <X />
        </button>

        {!submitted ? (
          <>
            <div className="modal-header">

              <span className="eyebrow">
                طلب خدمة
              </span>

              <h2 id="booking-modal-title">
                {service.title}
              </h2>

              <p>
                املأ البيانات التالية وسنتواصل معك لتأكيد
                الطلب والموعد.
              </p>

            </div>

            <form
              onSubmit={onSubmit}
              dir="rtl"
            >

              <div className="form-grid">

                <label>
                  الاسم
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="اكتب اسمك"
                    autoComplete="name"
                  />
                </label>

                <label>
                  رقم الجوال
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="05xxxxxxxx"
                    autoComplete="tel"
                    dir="ltr"
                  />
                </label>

                <label>
                  البريد الإلكتروني
                  <input
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    autoComplete="email"
                    dir="ltr"
                  />
                </label>

                <label>
                  عدد الأشخاص
                  <input
                    name="people"
                    type="number"
                    min="1"
                    placeholder="مثال: 4"
                  />
                </label>

                <label>
                  التاريخ

                  <div className="input-icon">
                    <CalendarDays size={17} />

                    <input
                      required
                      name="date"
                      type="date"
                    />
                  </div>
                </label>

                <label>
                  الوقت

                  <div className="input-icon">
                    <Clock3 size={17} />

                    <input
                      required
                      name="time"
                      type="time"
                    />
                  </div>
                </label>

              </div>

              <label>
                ملاحظات إضافية

                <textarea
                  name="notes"
                  rows={4}
                  placeholder="اكتب أي تفاصيل أو متطلبات..."
                />
              </label>

              <button
                className="submit-button"
                type="submit"
              >
                إرسال طلب الخدمة
                <ArrowLeft size={18} />
              </button>

            </form>
          </>
        ) : (
          <div
            className="success-state"
            role="status"
            aria-live="polite"
          >

            <div className="success-icon">
              <CheckCircle2 size={42} />
            </div>

            <h2>
              تم إرسال طلبك بنجاح
            </h2>

            <p>
              شكرًا لك. تم استلام طلبك وسنتواصل معك قريبًا
              لتأكيد الموعد والتفاصيل.
            </p>

            <button
              className="submit-button"
              onClick={onClose}
              type="button"
            >
              إغلاق
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default BookingModal;

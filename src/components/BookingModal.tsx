import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  X
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import { createPortal } from "react-dom";

import { supabase } from "../lib/supabaseClient";
import type { Service } from "../data/siteData";

type BookingModalProps = {
  service: Service | null;
  submitted: boolean;
  onClose: () => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void;
};

type ServiceFeature = {
  id: number;
  service_id: number;
  title: string;
  active: boolean;
  sort_order: number;
};

function BookingModal({
  service,
  submitted,
  onClose,
  onSubmit
}: BookingModalProps) {
  const [features, setFeatures] = useState<
    ServiceFeature[]
  >([]);

  const [featuresLoading, setFeaturesLoading] =
    useState(false);

  useEffect(() => {
    if (!service) {
      setFeatures([]);
      return;
    }

    let mounted = true;

    const loadFeatures = async () => {
      setFeaturesLoading(true);

      const { data, error } = await supabase
        .from("service_features")
        .select(
          "id,service_id,title,active,sort_order"
        )
        .eq("service_id", service.id)
        .eq("active", true)
        .order("sort_order", {
          ascending: true
        });

      if (error) {
        console.error(
          "Supabase service features error:",
          error
        );

        if (mounted) {
          setFeatures([]);
          setFeaturesLoading(false);
        }

        return;
      }

      if (mounted) {
        setFeatures(
          (data ?? []) as ServiceFeature[]
        );

        setFeaturesLoading(false);
      }
    };

    loadFeatures();

    return () => {
      mounted = false;
    };
  }, [service]);

  useEffect(() => {
    if (!service) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [service, onClose]);

  if (!service) {
    return null;
  }

  const modalContent = (
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
          aria-label="إغلاق نموذج طلب الخدمة"
          type="button"
        >
          <X
            size={21}
            strokeWidth={1.9}
            aria-hidden="true"
          />
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
                {service.description}
              </p>

            </div>

            {featuresLoading && (
              <div
                className="service-features-loading"
                aria-live="polite"
              >
                جاري تحميل مزايا الخدمة...
              </div>
            )}

            {!featuresLoading &&
              features.length > 0 && (
                <div
                  className="booking-service-features"
                  aria-label={`مزايا ${service.title}`}
                >
                  <div className="booking-features-heading">

                    <span
                      className="booking-features-icon"
                      aria-hidden="true"
                    >
                      <Check
                        size={17}
                        strokeWidth={2.4}
                      />
                    </span>

                    <div>
                      <strong>
                        مزايا الخدمة
                      </strong>

                      <span>
                        تعرف على ما تحصل عليه مع هذه الخدمة
                      </span>
                    </div>

                  </div>

                  <ul>
                    {features.map(
                      (feature) => (
                        <li key={feature.id}>

                          <span
                            className="feature-check"
                            aria-hidden="true"
                          >
                            <Check
                              size={15}
                              strokeWidth={2.5}
                            />
                          </span>

                          <span>
                            {feature.title}
                          </span>

                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

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

                    <CalendarDays
                      size={18}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

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

                    <Clock3
                      size={18}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

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
                <span>
                  إرسال طلب الخدمة
                </span>

                <ArrowLeft
                  size={19}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </button>

            </form>
          </>
        ) : (
          <div
            className="success-state"
            role="status"
            aria-live="polite"
          >

            <div
              className="success-icon"
              aria-hidden="true"
            >
              <CheckCircle2
                size={44}
                strokeWidth={1.8}
              />
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

  return createPortal(
    modalContent,
    document.body
  );
}

export default BookingModal;

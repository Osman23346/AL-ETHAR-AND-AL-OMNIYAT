import { useCallback, useRef, useState } from "react";
import { validateBookingContact, validateBookingDate } from "../services/bookingValidation";
import { supabase } from "../lib/supabaseClient";
import type { Service } from "../data/siteData";

export type BookingSubmitState = "idle" | "submitting" | "success" | "error";

export function useServiceBooking() {
  const inFlight = useRef(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [submitState, setSubmitState] = useState<BookingSubmitState>("idle");
  const [submitError, setSubmitError] = useState("");

  const selectService = (service: Service) => {
    if (inFlight.current) return;
    setSelectedService(service);
    setSubmitState("idle");
    setSubmitError("");
  };

  const closeBooking = useCallback(() => {
    if (inFlight.current) return;
    setSelectedService(null);
    setSubmitState("idle");
    setSubmitError("");
  }, []);

  const submitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedService || inFlight.current) return;

    const formData = new FormData(event.currentTarget);
    const value = (key: string) => String(formData.get(key) ?? "").trim();
    const peopleValue = value("people");
    const validationError = validateBookingContact({ name: value("name"), phone: value("phone"), email: value("email"), people: peopleValue }) || validateBookingDate(value("date"), value("time"));
    if (validationError) {
      setSubmitError(validationError);
      setSubmitState("error");
      return;
    }
    inFlight.current = true;
    setSubmitState("submitting");
    setSubmitError("");

    try {
      const { error } = await supabase.from("service_requests").insert({
        name: value("name"),
        phone: value("phone").replace(/\s/g, ""),
        email: value("email") || null,
        service_name: selectedService.title,
        people: peopleValue ? Number(peopleValue) : null,
        requested_date: value("date") || null,
        requested_time: value("time") || null,
        notes: value("notes") || null,
      });

      if (error) {
        console.error("Supabase service request error:", error);
        setSubmitError("تعذر إرسال الطلب حاليًا. تحقق من اتصالك وحاول مرة أخرى.");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
    } catch {
      setSubmitError("تعذر إرسال الطلب حاليًا. تحقق من اتصالك وحاول مرة أخرى.");
      setSubmitState("error");
    } finally {
      inFlight.current = false;
    }
  };

  return {
    selectedService,
    submitted: submitState === "success",
    submitState,
    submitError,
    selectService,
    closeBooking,
    submitBooking,
  };
}

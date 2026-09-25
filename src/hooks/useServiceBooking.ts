import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Service } from "../data/siteData";

export type BookingSubmitState = "idle" | "submitting" | "success" | "error";

export function useServiceBooking() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [submitState, setSubmitState] = useState<BookingSubmitState>("idle");
  const [submitError, setSubmitError] = useState("");

  const selectService = (service: Service) => {
    setSelectedService(service);
    setSubmitState("idle");
    setSubmitError("");
  };

  const closeBooking = () => {
    setSelectedService(null);
    setSubmitState("idle");
    setSubmitError("");
  };

  const submitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedService || submitState === "submitting") return;

    setSubmitState("submitting");
    setSubmitError("");

    const formData = new FormData(event.currentTarget);
    const value = (key: string) => String(formData.get(key) ?? "").trim();
    const peopleValue = value("people");

    const { error } = await supabase.from("service_requests").insert({
      name: value("name"),
      phone: value("phone"),
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

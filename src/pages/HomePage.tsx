
import { useState } from "react";
import { MessageCircle } from "lucide-react";

import { supabase } from "../lib/supabaseClient";
import { siteContent } from "../data/content";

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import VisionMissionSection from "../components/VisionMissionSection";
import ValuesSection from "../components/ValuesSection";
import SpacesSection from "../components/SpacesSection";
import ServicesSection from "../components/ServicesSection";
import AudiencesSection from "../components/AudiencesSection";
import RelationshipSection from "../components/RelationshipSection";
import VideoSection from "../components/VideoSection";
import GallerySection from "../components/GallerySection";
import CTASection from "../components/CTASection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";

import type { Service } from "../data/siteData";

function HomePage() {
  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setSubmitted(false);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!selectedService) {
      return;
    }

    const formData = new FormData(e.currentTarget);

    const name = String(
      formData.get("name") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).trim();

    const emailValue = String(
      formData.get("email") ?? ""
    ).trim();

    const peopleValue = String(
      formData.get("people") ?? ""
    ).trim();

    const date = String(
      formData.get("date") ?? ""
    ).trim();

    const time = String(
      formData.get("time") ?? ""
    ).trim();

    const notes = String(
      formData.get("notes") ?? ""
    ).trim();

    const email = emailValue || null;

    const people = peopleValue
      ? Number(peopleValue)
      : null;

    const { error } = await supabase
      .from("service_requests")
      .insert({
        name,
        phone,
        email,
        service_name: selectedService.title,
        people,
        requested_date: date || null,
        requested_time: time || null,
        notes: notes || null
      });

    if (error) {
      console.error(
        "Supabase service request error:",
        error
      );

      window.alert(
        "تعذر إرسال الطلب حاليًا. يرجى المحاولة مرة أخرى."
      );

      return;
    }

    setSubmitted(true);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setSubmitted(false);
  };

  return (
    <div className="site">

      <Header />

      <main>
        <HeroSection />

        <AboutSection />

        <VisionMissionSection />

        <ValuesSection />

        <SpacesSection
          onSelectService={handleSelectService}
        />

        <ServicesSection
          onSelectService={handleSelectService}
        />

        <AudiencesSection />

        <RelationshipSection />

        <VideoSection />

        <GallerySection />

        <CTASection />

        <ContactSection />
      </main>

      <Footer />

      <BookingModal
        service={selectedService}
        submitted={submitted}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <a
        href={`https://wa.me/${siteContent.contact.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        aria-label="واتساب"
      >
        <MessageCircle size={25} />
      </a>

    </div>
  );
}

export default HomePage;

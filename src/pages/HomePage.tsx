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

      {/* Header */}
      <Header />

      <main>

        {/* Hero */}
        <HeroSection />

        {/* About */}
        <AboutSection />

        {/* Vision & Mission */}
        <VisionMissionSection />

        {/* Values */}
        <ValuesSection />

        {/* Spaces */}
        <SpacesSection
          onSelectService={handleSelectService}
        />

        {/* Services */}
        <ServicesSection
          onSelectService={handleSelectService}
        />

        {/* Audiences */}
        <AudiencesSection />

        {/* Relationship */}
        <RelationshipSection />

        {/* Video */}
        <VideoSection />

        {/* Gallery */}
        <GallerySection />

        {/* CTA */}
        <CTASection />

        {/* Contact */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        service={selectedService}
        submitted={submitted}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${siteContent.contact.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        aria-label="التواصل معنا عبر واتساب"
      >
        <MessageCircle
          size={25}
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </a>

    </div>
  );
}

export default HomePage;
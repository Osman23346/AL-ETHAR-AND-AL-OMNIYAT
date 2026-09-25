import {
  AboutSection,
  AudiencesSection,
  BookingModal,
  ContactSection,
  CTASection,
  FloatingWhatsApp,
  Footer,
  GallerySection,
  Header,
  HeroSection,
  RelationshipSection,
  ServicesSection,
  SpacesSection,
  ValuesSection,
  VideoSection,
  VisionMissionSection,
} from "../components";
import { useServiceBooking } from "../hooks/useServiceBooking";
import { useScrollReveal } from "../hooks/useScrollReveal";

function HomePage() {
  useScrollReveal();
  const {
    selectedService,
    submitted,
    submitState,
    submitError,
    selectService,
    closeBooking,
    submitBooking,
  } = useServiceBooking();

  return (
    <div className="site">
      <Header />

      <main>
        <HeroSection />
        <AboutSection />
        <VisionMissionSection />
        <ValuesSection />
        <SpacesSection onSelectService={selectService} />
        <ServicesSection onSelectService={selectService} />
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
        submitState={submitState}
        submitError={submitError}
        onClose={closeBooking}
        onSubmit={submitBooking}
      />

      <FloatingWhatsApp />
    </div>
  );
}

export default HomePage;

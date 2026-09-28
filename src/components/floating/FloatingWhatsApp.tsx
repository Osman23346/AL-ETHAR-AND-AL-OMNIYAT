import { MessageCircle } from "lucide-react";
import { useSiteContent } from "../../hooks/useSiteContent";

function FloatingWhatsApp() {
  const siteContent = useSiteContent();
  return (
    <a
      href={`https://wa.me/${siteContent.contact.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp"
      aria-label="التواصل معنا عبر واتساب"
    >
      <MessageCircle size={25} strokeWidth={1.9} aria-hidden="true" />
    </a>
  );
}

export default FloatingWhatsApp;

import { MessageCircle } from "lucide-react";
import { siteContent } from "../../data/content";

function FloatingWhatsApp() {
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

import {
  ArrowLeft,
  Mail,
  MapPin,
  MessageCircle,
  Phone
} from "lucide-react";

import { siteContent } from "../../data/content";

function ContactSection() {
  const { contact } = siteContent;

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">

        <div>
          <span className="eyebrow">
            {contact.eyebrow}
          </span>

          <h2>
            {contact.title}
            <span> {contact.highlight}</span>
          </h2>

          <p>
            {contact.description}
          </p>

          <div className="contact-list">

            <a href={`tel:${contact.phone}`}>
              <span
                className="contact-icon"
                aria-hidden="true"
              >
                <Phone
                  size={20}
                  strokeWidth={1.8}
                />
              </span>

              <span>
                <small>الهاتف</small>
                <strong>{contact.phone}</strong>
              </span>
            </a>

            <a href={`mailto:${contact.email}`}>
              <span
                className="contact-icon"
                aria-hidden="true"
              >
                <Mail
                  size={20}
                  strokeWidth={1.8}
                />
              </span>

              <span>
                <small>البريد الإلكتروني</small>
                <strong>{contact.email}</strong>
              </span>
            </a>

            <div>
              <span
                className="contact-icon"
                aria-hidden="true"
              >
                <MapPin
                  size={20}
                  strokeWidth={1.8}
                />
              </span>

              <span>
                <small>الموقع</small>
                <strong>{contact.address}</strong>
              </span>
            </div>

          </div>
        </div>

        <div className="contact-card" data-reveal>

          <div
            className="contact-card-icon"
            aria-hidden="true"
          >
            <MessageCircle
              size={27}
              strokeWidth={1.8}
            />
          </div>

          <h3>
            تواصل معنا عبر واتساب
          </h3>

          <p>
            أسرع طريقة للاستفسار عن الخدمات والحجز.
          </p>

          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-button"
          >
            <span>افتح واتساب</span>

            <ArrowLeft
              size={19}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </a>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;
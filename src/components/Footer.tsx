
import {
  Instagram,
  MessageCircle,
  Facebook
} from "lucide-react";

import { siteContent } from "../data/content";

function Footer() {
  const { brand, contact, footer } = siteContent;

  return (
    <footer className="footer">

      <div className="container footer-grid">

        {/* الهوية */}
        <div className="footer-brand">

          <div className="logo footer-logo">
            <img
              src="/logo-mark.svg.png"
              alt={brand.name}
              className="logo-mark-image"
            />

            <span>
              <strong>{brand.name}</strong>
              <small>{brand.subtitle}</small>
            </span>
          </div>

          <p>
            {footer.description}
          </p>

          <div className="socials">

            <a
              href="#"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook size={18} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} />
            </a>

            <a
              href="#"
              aria-label="X"
              target="_blank"
              rel="noreferrer"
            >
              <span className="social-x">X</span>
            </a>

            <a
              href="#"
              aria-label="TikTok"
              target="_blank"
              rel="noreferrer"
            >
              <span className="social-tiktok">♪</span>
            </a>

            <a
              href={`https://wa.me/${contact.whatsapp}`}
              aria-label="WhatsApp"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
            </a>

          </div>

        </div>

        {/* روابط سريعة */}
        <div>
          <h4>روابط سريعة</h4>

          <a href="#home">
            الرئيسية
          </a>

          <a href="#about">
            عن المكان
          </a>

          <a href="#spaces">
            المساحات
          </a>

          <a href="#services">
            الخدمات
          </a>

          <a href="#gallery">
            المعرض
          </a>

          <a href="#contact">
            تواصل معنا
          </a>
        </div>

        {/* معلومات الشركة */}
        <div>
          <h4>الشركة</h4>

          <a href="/about">
            من نحن
          </a>

          <a href="/terms">
            الشروط والأحكام
          </a>

          <a href="/privacy">
            سياسة الخصوصية
          </a>
        </div>

        {/* التواصل */}
        <div>
          <h4>تواصل معنا</h4>

          <a href={`tel:${contact.phone}`}>
            الهاتف
          </a>

          <a href={`mailto:${contact.email}`}>
            البريد الإلكتروني
          </a>

          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            واتساب
          </a>

          <span className="footer-address">
            {contact.address}
          </span>
        </div>

      </div>

      {/* حقوق الشركة */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">

          <span>
            © 2026 {brand.name} {brand.subtitle} — جميع الحقوق محفوظة.
          </span>

          <span className="footer-legal">
            <a href="/about">
              من نحن
            </a>

            <a href="/terms">
              الشروط والأحكام
            </a>

            <a href="/privacy">
              سياسة الخصوصية
            </a>
          </span>

        </div>
      </div>

    </footer>
  );
}

export default Footer;

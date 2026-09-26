import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
  Youtube
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import { siteContent } from "../../data/content";
import { supabase } from "../../lib/supabaseClient";

type SocialLink = {
  id: number;
  platform: string;
  url: string;
  active: boolean;
  sort_order: number;
};

function Footer() {
  const {
    brand,
    contact,
    footer
  } = siteContent;

  const [socialLinks, setSocialLinks] =
    useState<SocialLink[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadSocialLinks = async () => {
      const { data, error } = await supabase
        .from("site_social_links")
        .select(
          "id,platform,url,active,sort_order"
        )
        .eq("active", true)
        .order("sort_order", {
          ascending: true
        });

      if (error) {
        console.error(
          "Supabase social links error:",
          error
        );
        return;
      }

      if (mounted) {
        setSocialLinks(
          (data ?? []) as SocialLink[]
        );
      }
    };

    loadSocialLinks();

    return () => {
      mounted = false;
    };
  }, []);

  const getSocialUrl = (
    platform: string
  ) => {
    const socialLink = socialLinks.find(
      (item) =>
        item.platform === platform &&
        item.url.trim() !== ""
    );

    return socialLink?.url || "";
  };

  const facebookUrl =
    getSocialUrl("facebook");

  const instagramUrl =
    getSocialUrl("instagram");

  const xUrl =
    getSocialUrl("x");

  const tiktokUrl =
    getSocialUrl("tiktok");

  const linkedinUrl =
    getSocialUrl("linkedin");

  const youtubeUrl =
    getSocialUrl("youtube");

  const googleMapsUrl =
    getSocialUrl("google_maps");

  const handleSocialClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    if (!url) {
      event.preventDefault();
    }
  };

  return (
    <footer className="footer">

      <div className="container footer-grid">

        {/* الهوية */}
        <div className="footer-brand">

          <div className="logo footer-logo">
            <img
              src="/brand-logo.png"
              alt={brand.name}
              className="brand-logo-image"
            />
          </div>

          <p className="footer-description">
            <span>
              الإيثار والأمنيات — منصة متكاملة
            </span>{" "}
            <span>
              لمساحات الأعمال وحلول النمو.
            </span>
          </p>

          <div className="footer-company-name">
            {footer.companyName}
          </div>

          {/* منصات التواصل الاجتماعي */}
          <div className="socials">

            <a
              href={facebookUrl || "#"}
              aria-label="فيسبوك"
              target={
                facebookUrl
                  ? "_blank"
                  : undefined
              }
              rel={
                facebookUrl
                  ? "noreferrer"
                  : undefined
              }
              onClick={(event) => {
                handleSocialClick(
                  event,
                  facebookUrl
                );
              }}
            >
              <Facebook
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            <a
              href={instagramUrl || "#"}
              aria-label="إنستغرام"
              target={
                instagramUrl
                  ? "_blank"
                  : undefined
              }
              rel={
                instagramUrl
                  ? "noreferrer"
                  : undefined
              }
              onClick={(event) => {
                handleSocialClick(
                  event,
                  instagramUrl
                );
              }}
            >
              <Instagram
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            <a
              href={xUrl || "#"}
              aria-label="منصة إكس"
              target={
                xUrl
                  ? "_blank"
                  : undefined
              }
              rel={
                xUrl
                  ? "noreferrer"
                  : undefined
              }
              onClick={(event) => {
                handleSocialClick(
                  event,
                  xUrl
                );
              }}
            >
              <span
                className="social-x"
                aria-hidden="true"
              >
                X
              </span>
            </a>

            <a
              href={tiktokUrl || "#"}
              aria-label="تيك توك"
              target={
                tiktokUrl
                  ? "_blank"
                  : undefined
              }
              rel={
                tiktokUrl
                  ? "noreferrer"
                  : undefined
              }
              onClick={(event) => {
                handleSocialClick(
                  event,
                  tiktokUrl
                );
              }}
            >
              <span
                className="social-tiktok"
                aria-hidden="true"
              >
                ♪
              </span>
            </a>

            <a
              href={linkedinUrl || "#"}
              aria-label="لينكدإن"
              target={
                linkedinUrl
                  ? "_blank"
                  : undefined
              }
              rel={
                linkedinUrl
                  ? "noreferrer"
                  : undefined
              }
              onClick={(event) => {
                handleSocialClick(
                  event,
                  linkedinUrl
                );
              }}
            >
              <Linkedin
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            <a
              href={youtubeUrl || "#"}
              aria-label="يوتيوب"
              target={
                youtubeUrl
                  ? "_blank"
                  : undefined
              }
              rel={
                youtubeUrl
                  ? "noreferrer"
                  : undefined
              }
              onClick={(event) => {
                handleSocialClick(
                  event,
                  youtubeUrl
                );
              }}
            >
              <Youtube
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            <a
              href={googleMapsUrl || "#"}
              aria-label="خرائط Google"
              target={
                googleMapsUrl
                  ? "_blank"
                  : undefined
              }
              rel={
                googleMapsUrl
                  ? "noreferrer"
                  : undefined
              }
              onClick={(event) => {
                handleSocialClick(
                  event,
                  googleMapsUrl
                );
              }}
            >
              <MapPin
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            <a
              href={`https://wa.me/${contact.whatsapp}`}
              aria-label="واتساب"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

          </div>
        </div>

        {/* الروابط السريعة */}
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

        {/* الشركة */}
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

          <a
            href="/admin/login"
            style={{
              marginTop: "8px",
              fontWeight: 700
            }}
          >
            دخول الإدارة
          </a>
        </div>

        {/* معلومات التواصل */}
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

      {/* الحقوق */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">

          <span>
            © 2026{" "}
            {footer.companyName}
            {" "}— جميع الحقوق محفوظة.
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

            <a href="/admin/login">
              دخول الإدارة
            </a>

          </span>

        </div>
      </div>

    </footer>
  );
}

export default Footer;
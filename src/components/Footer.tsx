
import {
  Instagram,
  MessageCircle,
  Facebook,
  Linkedin,
  Youtube,
  MapPin
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import { supabase } from "../lib/supabaseClient";
import { siteContent } from "../data/content";

type SocialLink = {
  id: number;
  platform: string;
  url: string;
  active: boolean;
  sort_order: number;
};

function Footer() {
  const { brand, contact, footer } =
    siteContent;

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
    const item = socialLinks.find(
      (social) =>
        social.platform === platform &&
        social.url.trim() !== ""
    );

    return item?.url || "";
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
              src="/logo-mark.svg.png"
              alt={brand.name}
              className="logo-mark-image"
            />

            <span>
              <strong>
                {brand.name}
              </strong>

              <small>
                {brand.subtitle}
              </small>
            </span>

          </div>

          <p>
            {footer.description}
          </p>

          <div className="footer-company-name">
            {footer.companyName}
          </div>

          {/* التواصل الاجتماعي */}
          <div className="socials">

            {/* Facebook */}
            <a
              href={facebookUrl || "#"}
              aria-label="Facebook"
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
              onClick={(event) =>
                handleSocialClick(
                  event,
                  facebookUrl
                )
              }
            >
              <Facebook
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            {/* Instagram */}
            <a
              href={instagramUrl || "#"}
              aria-label="Instagram"
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
              onClick={(event) =>
                handleSocialClick(
                  event,
                  instagramUrl
                )
              }
            >
              <Instagram
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            {/* X */}
            <a
              href={xUrl || "#"}
              aria-label="X"
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
              onClick={(event) =>
                handleSocialClick(
                  event,
                  xUrl
                )
              }
            >
              <span
                className="social-x"
                aria-hidden="true"
              >
                X
              </span>
            </a>

            {/* TikTok */}
            <a
              href={tiktokUrl || "#"}
              aria-label="TikTok"
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
              onClick={(event) =>
                handleSocialClick(
                  event,
                  tiktokUrl
                )
              }
            >
              <span
                className="social-tiktok"
                aria-hidden="true"
              >
                ♪
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedinUrl || "#"}
              aria-label="LinkedIn"
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
              onClick={(event) =>
                handleSocialClick(
                  event,
                  linkedinUrl
                )
              }
            >
              <Linkedin
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            {/* YouTube */}
            <a
              href={youtubeUrl || "#"}
              aria-label="YouTube"
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
              onClick={(event) =>
                handleSocialClick(
                  event,
                  youtubeUrl
                )
              }
            >
              <Youtube
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            {/* Google Maps */}
            <a
              href={googleMapsUrl || "#"}
              aria-label="Google Maps"
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
              onClick={(event) =>
                handleSocialClick(
                  event,
                  googleMapsUrl
                )
              }
            >
              <MapPin
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              aria-label="WhatsApp"
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

        {/* روابط سريعة */}
        <div>

          <h4>
            روابط سريعة
          </h4>

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

          <h4>
            الشركة
          </h4>

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

        {/* التواصل */}
        <div>

          <h4>
            تواصل معنا
          </h4>

          <a
            href={`tel:${contact.phone}`}
          >
            الهاتف
          </a>

          <a
            href={`mailto:${contact.email}`}
          >
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

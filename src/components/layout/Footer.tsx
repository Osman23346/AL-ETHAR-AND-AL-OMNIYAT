
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

import { supabase } from "../../lib/supabaseClient";
import { siteContent } from "../../data/content";

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

        {/* ط§ظ„ظ‡ظˆظٹط© */}
        <div className="footer-brand">

          <div className="logo footer-logo">

            <img
              src="/brand-logo.png"
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

          <p className="footer-description">
  <span>ط¥ظٹط«ط§ط±ظƒظˆ â€” ظ…ظ†طµط© ظ…طھظƒط§ظ…ظ„ط©</span>{" "}
  <span>ظ„ظ…ط³ط§ط­ط§طھ ط§ظ„ط£ط¹ظ…ط§ظ„ ظˆط­ظ„ظˆظ„ ط§ظ„ظ†ظ…ظˆ.</span>
</p>

          <div className="footer-company-name">
            {footer.companyName}
          </div>

          {/* ط§ظ„طھظˆط§طµظ„ ط§ظ„ط§ط¬طھظ…ط§ط¹ظٹ */}
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
                â™ھ
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

        {/* ط±ظˆط§ط¨ط· ط³ط±ظٹط¹ط© */}
        <div>

          <h4>
            ط±ظˆط§ط¨ط· ط³ط±ظٹط¹ط©
          </h4>

          <a href="#home">
            ط§ظ„ط±ط¦ظٹط³ظٹط©
          </a>

          <a href="#about">
            ط¹ظ† ط§ظ„ظ…ظƒط§ظ†
          </a>

          <a href="#spaces">
            ط§ظ„ظ…ط³ط§ط­ط§طھ
          </a>

          <a href="#services">
            ط§ظ„ط®ط¯ظ…ط§طھ
          </a>

          <a href="#gallery">
            ط§ظ„ظ…ط¹ط±ط¶
          </a>

          <a href="#contact">
            طھظˆط§طµظ„ ظ…ط¹ظ†ط§
          </a>

        </div>

        {/* ط§ظ„ط´ط±ظƒط© */}
        <div>

          <h4>
            ط§ظ„ط´ط±ظƒط©
          </h4>

          <a href="/about">
            ظ…ظ† ظ†ط­ظ†
          </a>

          <a href="/terms">
            ط§ظ„ط´ط±ظˆط· ظˆط§ظ„ط£ط­ظƒط§ظ…
          </a>

          <a href="/privacy">
            ط³ظٹط§ط³ط© ط§ظ„ط®طµظˆطµظٹط©
          </a>

          <a
            href="/admin/login"
            style={{
              marginTop: "8px",
              fontWeight: 700
            }}
          >
            ط¯ط®ظˆظ„ ط§ظ„ط¥ط¯ط§ط±ط©
          </a>

        </div>

        {/* ط§ظ„طھظˆط§طµظ„ */}
        <div>

          <h4>
            طھظˆط§طµظ„ ظ…ط¹ظ†ط§
          </h4>

          <a
            href={`tel:${contact.phone}`}
          >
            ط§ظ„ظ‡ط§طھظپ
          </a>

          <a
            href={`mailto:${contact.email}`}
          >
            ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ
          </a>

          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            ظˆط§طھط³ط§ط¨
          </a>

          <span className="footer-address">
            {contact.address}
          </span>

        </div>

      </div>

      {/* ط­ظ‚ظˆظ‚ ط§ظ„ط´ط±ظƒط© */}
      <div className="footer-bottom">

        <div className="container footer-bottom-inner">

          <span>
            آ© 2026{" "}
            {footer.companyName}
            {" "}â€” ط¬ظ…ظٹط¹ ط§ظ„ط­ظ‚ظˆظ‚ ظ…ط­ظپظˆط¸ط©.
          </span>

          <span className="footer-legal">

            <a href="/about">
              ظ…ظ† ظ†ط­ظ†
            </a>

            <a href="/terms">
              ط§ظ„ط´ط±ظˆط· ظˆط§ظ„ط£ط­ظƒط§ظ…
            </a>

            <a href="/privacy">
              ط³ظٹط§ط³ط© ط§ظ„ط®طµظˆطµظٹط©
            </a>

            <a href="/admin/login">
              ط¯ط®ظˆظ„ ط§ظ„ط¥ط¯ط§ط±ط©
            </a>

          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;


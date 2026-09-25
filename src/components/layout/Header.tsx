import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Menu,
  X
} from "lucide-react";

import { siteContent } from "../../data/content";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { brand } = siteContent;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " header-scrolled" : ""}`}>
      <div className="container nav">

        {/* الهوية */}
        <a
          href="#home"
          className="logo"
          onClick={closeMenu}
          aria-label={`العودة إلى الصفحة الرئيسية - ${brand.name}`}
        >
          <img
            src="/logo-mark.svg.png"
            alt={brand.name}
            className="logo-mark-image"
          />

          <span className="logo-text">
            <strong>{brand.name}</strong>

            <small>
              {brand.subtitle}
            </small>
          </span>
        </a>

        {/* قائمة الجوال */}
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen
              ? "إغلاق القائمة"
              : "فتح القائمة"
          }
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          type="button"
        >
          {menuOpen ? (
            <X
              size={25}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          ) : (
            <Menu
              size={25}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          )}
        </button>

        {/* القائمة الرئيسية */}
        <nav
          id="main-navigation"
          className={
            menuOpen
              ? "nav-links open"
              : "nav-links"
          }
          aria-label="التنقل الرئيسي"
        >
          <a
            href="#home"
            onClick={closeMenu}
          >
            الرئيسية
          </a>

          <a
            href="#about"
            onClick={closeMenu}
          >
            عن المكان
          </a>

          <a
            href="#spaces"
            onClick={closeMenu}
          >
            المساحات
          </a>

          <a
            href="#services"
            onClick={closeMenu}
          >
            الخدمات
          </a>

          <a
            href="#gallery"
            onClick={closeMenu}
          >
            المعرض
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
          >
            تواصل معنا
          </a>
        </nav>

        {/* زر الحجز */}
        <a
          href="#services"
          className="header-button"
          onClick={closeMenu}
        >
          <span>احجز خدمتك</span>

          <ArrowLeft
            size={18}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </a>

      </div>
    </header>
  );
}

export default Header;
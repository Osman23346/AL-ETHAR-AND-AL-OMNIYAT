import { useState } from "react";
import {
  ArrowLeft,
  Menu,
  X
} from "lucide-react";

import { siteContent } from "../data/content";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { brand } = siteContent;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="container nav">

        <a
          href="#home"
          className="logo"
          onClick={closeMenu}
        >
          <img
            src="/logo-mark.svg.png"
            alt={brand.name}
            className="logo-mark-image"
          />

          <span className="logo-text">
            <strong>{brand.name}</strong>
            <small>{brand.subtitle}</small>
          </span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen
              ? "إغلاق القائمة"
              : "فتح القائمة"
          }
          type="button"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav
          className={
            menuOpen
              ? "nav-links open"
              : "nav-links"
          }
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

        <a
          href="#services"
          className="header-button"
        >
          احجز خدمتك
          <ArrowLeft size={17} />
        </a>

      </div>
    </header>
  );
}

export default Header;

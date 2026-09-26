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

        {/* ط§ظ„ظ‡ظˆظٹط© */}
        <a
          href="#home"
          className="logo"
          onClick={closeMenu}
          aria-label={`ط§ظ„ط¹ظˆط¯ط© ط¥ظ„ظ‰ ط§ظ„طµظپط­ط© ط§ظ„ط±ط¦ظٹط³ظٹط© - ${brand.name}`}
        >
          <img
            src="/brand-logo.png"
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

        {/* ظ‚ط§ط¦ظ…ط© ط§ظ„ط¬ظˆط§ظ„ */}
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen
              ? "ط¥ط؛ظ„ط§ظ‚ ط§ظ„ظ‚ط§ط¦ظ…ط©"
              : "ظپطھط­ ط§ظ„ظ‚ط§ط¦ظ…ط©"
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

        {/* ط§ظ„ظ‚ط§ط¦ظ…ط© ط§ظ„ط±ط¦ظٹط³ظٹط© */}
        <nav
          id="main-navigation"
          className={
            menuOpen
              ? "nav-links open"
              : "nav-links"
          }
          aria-label="ط§ظ„طھظ†ظ‚ظ„ ط§ظ„ط±ط¦ظٹط³ظٹ"
        >
          <a
            href="#home"
            onClick={closeMenu}
          >
            ط§ظ„ط±ط¦ظٹط³ظٹط©
          </a>

          <a
            href="#about"
            onClick={closeMenu}
          >
            ط¹ظ† ط§ظ„ظ…ظƒط§ظ†
          </a>

          <a
            href="#spaces"
            onClick={closeMenu}
          >
            ط§ظ„ظ…ط³ط§ط­ط§طھ
          </a>

          <a
            href="#services"
            onClick={closeMenu}
          >
            ط§ظ„ط®ط¯ظ…ط§طھ
          </a>

          <a
            href="#gallery"
            onClick={closeMenu}
          >
            ط§ظ„ظ…ط¹ط±ط¶
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
          >
            طھظˆط§طµظ„ ظ…ط¹ظ†ط§
          </a>
        </nav>

        {/* ط²ط± ط§ظ„ط­ط¬ط² */}
        <a
          href="#services"
          className="header-button"
          onClick={closeMenu}
        >
          <span>ط§ط­ط¬ط² ط®ط¯ظ…طھظƒ</span>

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

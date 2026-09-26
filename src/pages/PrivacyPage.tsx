import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  FileText,
  LockKeyhole,
  ShieldCheck
} from "lucide-react";

import { siteContent } from "../data/content";

function PrivacyPage() {
  const { brand, contact } = siteContent;

  return (
    <div className="legal-page">

      {/* Header */}
      <header className="inner-page-header">
        <div className="container inner-page-nav">

          <a
            href="/"
            className="logo"
            aria-label={`ط§ظ„ط¹ظˆط¯ط© ط¥ظ„ظ‰ ط§ظ„طµظپط­ط© ط§ظ„ط±ط¦ظٹط³ظٹط© - ${brand.name}`}
          >
            <img
              src="/brand-logo.png"
              alt={brand.name}
              className="logo-mark-image"
            />

            <span className="logo-text">
              <strong>{brand.name}</strong>
              <small>{brand.subtitle}</small>
            </span>
          </a>

          <a
            href="/"
            className="inner-page-back"
          >
            <span>ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©</span>

            <ArrowLeft
              size={17}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </a>

        </div>
      </header>

      <main>

        {/* Hero */}
        <section
          className="legal-hero privacy-hero"
          aria-labelledby="privacy-page-title"
        >
          <div className="container">

            <div
              className="legal-hero-icon"
              aria-hidden="true"
            >
              <LockKeyhole
                size={30}
                strokeWidth={1.8}
              />
            </div>

            <span className="section-eyebrow">
              ط­ظ…ط§ظٹط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ظˆط§ظ„ط®طµظˆطµظٹط©
            </span>

            <h1 id="privacy-page-title">
              ط³ظٹط§ط³ط©
              <br />
              <em>ط§ظ„ط®طµظˆطµظٹط©</em>
            </h1>

            <p>
              طھظˆط¶ط­ ظ‡ط°ظ‡ ط§ظ„ط³ظٹط§ط³ط© ظƒظٹظپظٹط© طھط¹ط§ظ…ظ„ {brand.name}
              ظ…ط¹ ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„طھظٹ ظٹطھظ… طھظ‚ط¯ظٹظ…ظ‡ط§ ظ…ظ† ط®ظ„ط§ظ„
              ط§ظ„ظ…ظˆظ‚ط¹ ظˆط·ظ„ط¨ط§طھ ط§ظ„ط®ط¯ظ…ط§طھ.
            </p>

          </div>
        </section>

        {/* Content */}
        <section className="legal-content-section">
          <div className="container legal-content">

            {/* ط§ظ„ظ…ظ‚ط¯ظ…ط© */}
            <div className="legal-intro">

              <ShieldCheck
                size={24}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <p>
                ظ†ط­ط±طµ ط¹ظ„ظ‰ ط§ظ„طھط¹ط§ظ…ظ„ ظ…ط¹ ط¨ظٹط§ظ†ط§طھ ط§ظ„ط¹ظ…ظ„ط§ط،
                ط¨ظ…ط³ط¤ظˆظ„ظٹط©طŒ ظˆط§ط³طھط®ط¯ط§ظ… ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„طھظٹ ظٹطھظ…
                طھظ‚ط¯ظٹظ…ظ‡ط§ ظ…ظ† ط®ظ„ط§ظ„ ط§ظ„ظ…ظˆظ‚ط¹ ظ„ظ„ط£ط؛ط±ط§ط¶ ط§ظ„ظ…ط±طھط¨ط·ط©
                ط¨ط§ظ„ط®ط¯ظ…ط§طھ ظˆط§ظ„طھظˆط§طµظ„ ظˆطھط­ط³ظٹظ† طھط¬ط±ط¨ط© ط§ظ„ظ…ط³طھط®ط¯ظ….
              </p>

            </div>

            {/* 01 */}
            <article className="legal-card">

              <span className="legal-number">
                01
              </span>

              <div
                className="legal-card-icon"
                aria-hidden="true"
              >
                <FileText
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <h2>
                ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„طھظٹ ظ†ط¬ظ…ط¹ظ‡ط§
              </h2>

              <p>
                ظ‚ط¯ ظٹطھظ… ط¬ظ…ط¹ ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„طھظٹ ظٹط®طھط§ط± ط§ظ„ظ…ط³طھط®ط¯ظ…
                طھظ‚ط¯ظٹظ…ظ‡ط§ ط¹ظ†ط¯ طھط¹ط¨ط¦ط© ظ†ظ…ظˆط°ط¬ ط·ظ„ط¨ ط®ط¯ظ…ط© ط£ظˆ
                ط§ظ„طھظˆط§طµظ„ ظ…ط¹ظ†ط§طŒ ظ…ط«ظ„ ط§ظ„ط§ط³ظ… ظˆط±ظ‚ظ… ط§ظ„ط¬ظˆط§ظ„
                ظˆط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ ظˆط§ظ„طھظپط§طµظٹظ„ ط§ظ„ظ…ط±طھط¨ط·ط©
                ط¨ط§ظ„ط·ظ„ط¨.
              </p>

            </article>

            {/* 02 */}
            <article className="legal-card">

              <span className="legal-number">
                02
              </span>

              <div
                className="legal-card-icon"
                aria-hidden="true"
              >
                <Eye
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <h2>
                ظƒظٹظپظٹط© ط§ط³طھط®ط¯ط§ظ… ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ
              </h2>

              <p>
                طھط³طھط®ط¯ظ… ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ظ…ظ‚ط¯ظ…ط© ظ„ظ„طھظˆط§طµظ„ ظ…ط¹
                ط§ظ„ط¹ظ…ظٹظ„طŒ ظˆظپظ‡ظ… ط§ط­طھظٹط§ط¬ظ‡طŒ ظˆظ…ط¹ط§ظ„ط¬ط© ط·ظ„ط¨ ط§ظ„ط®ط¯ظ…ط©طŒ
                ظˆطھط£ظƒظٹط¯ ط§ظ„ظ…ظˆط§ط¹ظٹط¯ ظˆط§ظ„طھظپط§طµظٹظ„ ط§ظ„ظ…طھط¹ظ„ظ‚ط©
                ط¨ط§ظ„ط®ط¯ظ…ط© ط§ظ„ظ…ط·ظ„ظˆط¨ط©.
              </p>

            </article>

            {/* 03 */}
            <article className="legal-card">

              <span className="legal-number">
                03
              </span>

              <div
                className="legal-card-icon"
                aria-hidden="true"
              >
                <LockKeyhole
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <h2>
                ط­ظ…ط§ظٹط© ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ
              </h2>

              <p>
                ظ†طھط®ط° ط§ظ„ط¥ط¬ط±ط§ط،ط§طھ ط§ظ„ظ…ظ†ط§ط³ط¨ط© ظ„ظ„ظ…ط³ط§ط¹ط¯ط© ظپظٹ ط­ظ…ط§ظٹط©
                ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„طھظٹ ظٹطھظ… ط¬ظ…ط¹ظ‡ط§ ظ…ظ† ط§ظ„ظˆطµظˆظ„ ط£ظˆ
                ط§ظ„ط§ط³طھط®ط¯ط§ظ… ط؛ظٹط± ط§ظ„ظ…طµط±ط­ ط¨ظ‡طŒ ظ…ط¹ ظ…ط±ط§ط¹ط§ط© ط£ظ†
                ظ†ظ‚ظ„ ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط¹ط¨ط± ط§ظ„ط¥ظ†طھط±ظ†طھ ظ„ط§ ظٹظ…ظƒظ† ط¶ظ…ط§ظ†
                ط£ظ…ط§ظ†ظ‡ ط¨ط´ظƒظ„ ظ…ط·ظ„ظ‚.
              </p>

            </article>

            {/* 04 */}
            <article className="legal-card">

              <span className="legal-number">
                04
              </span>

              <h2>
                ظ…ط´ط§ط±ظƒط© ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ
              </h2>

              <p>
                ظ„ط§ ظٹطھظ… ط¨ظٹط¹ ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط´ط®طµظٹط© ظ„ظ„ط¹ظ…ظ„ط§ط،.
                ظˆظ‚ط¯ ظٹطھظ… ظ…ط´ط§ط±ظƒط© ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط¹ظ†ط¯ ط§ظ„ط­ط§ط¬ط©
                ط§ظ„طھط´ط؛ظٹظ„ظٹط© ظ„طھظ‚ط¯ظٹظ… ط§ظ„ط®ط¯ظ…ط© ط£ظˆ ط¹ظ†ط¯ظ…ط§ ظٹظƒظˆظ†
                ط°ظ„ظƒ ظ…ط·ظ„ظˆط¨ظ‹ط§ ط¨ظ…ظˆط¬ط¨ ط§ظ„ط£ظ†ط¸ظ…ط© ط£ظˆ ط§ظ„ط¬ظ‡ط§طھ
                ط§ظ„ظ…ط®طھطµط©.
              </p>

            </article>

            {/* 05 */}
            <article className="legal-card">

              <span className="legal-number">
                05
              </span>

              <h2>
                ظ…ظ„ظپط§طھ طھط¹ط±ظٹظپ ط§ظ„ط§ط±طھط¨ط§ط·
              </h2>

              <p>
                ظ‚ط¯ ظٹط³طھط®ط¯ظ… ط§ظ„ظ…ظˆظ‚ط¹ طھظ‚ظ†ظٹط§طھ ط£ط³ط§ط³ظٹط© ظ„طھط­ط³ظٹظ†
                طھط¬ط±ط¨ط© ط§ظ„ظ…ط³طھط®ط¯ظ… ظˆطھط´ط؛ظٹظ„ ط¨ط¹ط¶ ظˆط¸ط§ط¦ظپ ط§ظ„ظ…ظˆظ‚ط¹.
                ظˆظٹظ…ظƒظ† ط£ظ† طھط®طھظ„ظپ ط§ظ„طھظ‚ظ†ظٹط§طھ ط§ظ„ظ…ط³طھط®ط¯ظ…ط© ظ…ط¹
                طھط·ظˆط± ط§ظ„ظ…ظˆظ‚ط¹ ظˆط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„ط±ظ‚ظ…ظٹط©.
              </p>

            </article>

            {/* 06 */}
            <article className="legal-card">

              <span className="legal-number">
                06
              </span>

              <h2>
                ط±ظˆط§ط¨ط· ط§ظ„ط¬ظ‡ط§طھ ط§ظ„ط®ط§ط±ط¬ظٹط©
              </h2>

              <p>
                ظ‚ط¯ ظٹط­طھظˆظٹ ط§ظ„ظ…ظˆظ‚ط¹ ط¹ظ„ظ‰ ط±ظˆط§ط¨ط· ظ„ط®ط¯ظ…ط§طھ ط£ظˆ
                ظ…ظ†طµط§طھ ط®ط§ط±ط¬ظٹط© ظ…ط«ظ„ ط´ط¨ظƒط§طھ ط§ظ„طھظˆط§طµظ„ ط§ظ„ط§ط¬طھظ…ط§ط¹ظٹ.
                طھط®ط¶ط¹ ظ‡ط°ظ‡ ط§ظ„ط¬ظ‡ط§طھ ظ„ط³ظٹط§ط³ط§طھ ط§ظ„ط®طµظˆطµظٹط© ط§ظ„ط®ط§طµط©
                ط¨ظ‡ط§طŒ ظˆظ„ط§ ظ†طھط­ظ…ظ„ ظ…ط³ط¤ظˆظ„ظٹط© ظ…ظ…ط§ط±ط³ط§طھ ط§ظ„ط®طµظˆطµظٹط©
                ط§ظ„ط®ط§طµط© ط¨ط§ظ„ظ…ظˆط§ظ‚ط¹ ط§ظ„ط®ط§ط±ط¬ظٹط©.
              </p>

            </article>

            {/* 07 */}
            <article className="legal-card">

              <span className="legal-number">
                07
              </span>

              <h2>
                ط­ظ‚ظˆظ‚ ط§ظ„ظ…ط³طھط®ط¯ظ…
              </h2>

              <p>
                ظٹظ…ظƒظ† ظ„ظ„ظ…ط³طھط®ط¯ظ… ط§ظ„طھظˆط§طµظ„ ظ…ط¹ظ†ط§ ظ„ظ„ط§ط³طھظپط³ط§ط± ط¹ظ†
                ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„طھظٹ ظ‚ط¯ظ…ظ‡ط§ ط£ظˆ ط·ظ„ط¨ طھطµط­ظٹط­ظ‡ط§ ط£ظˆ
                ط§ظ„ط§ط³طھظپط³ط§ط± ط¹ظ† ط·ط±ظٹظ‚ط© ط§ط³طھط®ط¯ط§ظ…ظ‡ط§طŒ ظˆط°ظ„ظƒ ظˆظپظ‚
                ط§ظ„ظ…طھط·ظ„ط¨ط§طھ ظˆط§ظ„ط¥ط¬ط±ط§ط،ط§طھ ط§ظ„ظ…ط¹ظ…ظˆظ„ ط¨ظ‡ط§.
              </p>

            </article>

            {/* 08 */}
            <article className="legal-card">

              <span className="legal-number">
                08
              </span>

              <h2>
                طھط­ط¯ظٹط« ط³ظٹط§ط³ط© ط§ظ„ط®طµظˆطµظٹط©
              </h2>

              <p>
                ظ‚ط¯ ظٹطھظ… طھط­ط¯ظٹط« ظ‡ط°ظ‡ ط§ظ„ط³ظٹط§ط³ط© ظ…ظ† ظˆظ‚طھ ظ„ط¢ط®ط±
                ظ„ظ…ظˆط§ظƒط¨ط© طھط·ظˆط± ط§ظ„ظ…ظˆظ‚ط¹ ظˆط§ظ„ط®ط¯ظ…ط§طھ ط£ظˆ ط£ظٹ
                ظ…طھط·ظ„ط¨ط§طھ طھظ†ط¸ظٹظ…ظٹط© ط¬ط¯ظٹط¯ط©. ط³ظٹطھظ… ظ†ط´ط± ط§ظ„ظ†ط³ط®ط©
                ط§ظ„ظ…ط­ط¯ط«ط© ظپظٹ ظ‡ط°ظ‡ ط§ظ„طµظپط­ط©.
              </p>

            </article>

            {/* 09 */}
            <article className="legal-card">

              <span className="legal-number">
                09
              </span>

              <h2>
                ط§ظ„طھظˆط§طµظ„ ظˆط§ظ„ط§ط³طھظپط³ط§ط±ط§طھ
              </h2>

              <p>
                ط¥ط°ط§ ظƒط§ظ† ظ„ط¯ظٹظƒ ط£ظٹ ط§ط³طھظپط³ط§ط± ظ…طھط¹ظ„ظ‚ ط¨ط§ظ„ط®طµظˆطµظٹط©
                ط£ظˆ ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ط´ط®طµظٹط©طŒ ظٹظ…ظƒظ†ظƒ ط§ظ„طھظˆط§طµظ„ ظ…ط¹ظ†ط§
                ظ…ظ† ط®ظ„ط§ظ„ ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ.
              </p>

              <a
                href={`mailto:${contact.email}`}
                className="legal-contact"
              >
                <span>{contact.email}</span>

                <ArrowLeft
                  size={16}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </a>

            </article>

            {/* ط¢ط®ط± طھط­ط¯ظٹط« */}
            <div
              className="legal-note"
              role="note"
            >
              <CheckCircle2
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <p>
                ط¢ط®ط± طھط­ط¯ظٹط« ظ„ظ‡ط°ظ‡ ط§ظ„طµظپط­ط©: 2026
              </p>

            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="inner-page-footer">

        <div className="container">

          <span>
            آ© 2026 {brand.name} {brand.subtitle}
          </span>

          <a href="/">
            ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©
          </a>

        </div>

      </footer>

    </div>
  );
}

export default PrivacyPage;

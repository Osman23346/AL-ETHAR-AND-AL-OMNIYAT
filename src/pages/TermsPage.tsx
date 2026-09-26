import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  ShieldCheck
} from "lucide-react";

import { siteContent } from "../data/content";

function TermsPage() {
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
          className="legal-hero"
          aria-labelledby="terms-page-title"
        >
          <div className="container">

            <div
              className="legal-hero-icon"
              aria-hidden="true"
            >
              <FileText
                size={30}
                strokeWidth={1.8}
              />
            </div>

            <span className="section-eyebrow">
              ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ظ‚ط§ظ†ظˆظ†ظٹط©
            </span>

            <h1 id="terms-page-title">
              ط§ظ„ط´ط±ظˆط·
              <br />
              <em>ظˆط§ظ„ط£ط­ظƒط§ظ…</em>
            </h1>

            <p>
              طھظˆط¶ط­ ظ‡ط°ظ‡ ط§ظ„ط´ط±ظˆط· ظˆط§ظ„ط£ط­ظƒط§ظ… ط§ظ„ظ‚ظˆط§ط¹ط¯ ط§ظ„ظ…ظ†ط¸ظ…ط©
              ظ„ط§ط³طھط®ط¯ط§ظ… ظ…ظˆظ‚ط¹ ظˆط®ط¯ظ…ط§طھ {brand.name}.
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
                ط¨ط§ط³طھط®ط¯ط§ظ…ظƒ ظ„ظ‡ط°ط§ ط§ظ„ظ…ظˆظ‚ط¹ ط£ظˆ ط·ظ„ط¨ظƒ ظ„ط£ظٹ ظ…ظ†
                ط®ط¯ظ…ط§طھظ†ط§طŒ ظپط¥ظ†ظƒ طھظ‚ط± ط¨ظ‚ط±ط§ط،ط© ظˆظپظ‡ظ… ظ‡ط°ظ‡ ط§ظ„ط´ط±ظˆط·
                ظˆط§ظ„ظ…ظˆط§ظپظ‚ط© ط¹ظ„ظٹظ‡ط§.
              </p>

            </div>

            {/* 01 */}
            <article className="legal-card">

              <span className="legal-number">
                01
              </span>

              <h2>
                ط§ظ„طھط¹ط±ظٹظپ ط¨ط§ظ„ط®ط¯ظ…ط©
              </h2>

              <p>
                ظٹظ‚ط¯ظ… {brand.name} ظ…ط¬ظ…ظˆط¹ط© ظ…ظ† ظ…ط³ط§ط­ط§طھ ط§ظ„ط£ط¹ظ…ط§ظ„
                ظˆط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„ظ…ط³ط§ظ†ط¯ط© ظˆط§ظ„ط­ظ„ظˆظ„ ط§ظ„ظ…ط±طھط¨ط·ط© ط¨ط¨ظٹط¦ط©
                ط§ظ„ط£ط¹ظ…ط§ظ„طŒ ظˆظپظ‚ ط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„ظ…طھط§ط­ط© ظپظٹ ط§ظ„ظ…ظˆظ‚ط¹
                ظˆط­ط³ط¨ ط·ط¨ظٹط¹ط© ظƒظ„ ط®ط¯ظ…ط© ظˆظ…طھط·ظ„ط¨ط§طھظ‡ط§.
              </p>

            </article>

            {/* 02 */}
            <article className="legal-card">

              <span className="legal-number">
                02
              </span>

              <h2>
                ط·ظ„ط¨ ط§ظ„ط®ط¯ظ…ط§طھ ظˆط§ظ„ط­ط¬ط²
              </h2>

              <p>
                ط¥ط±ط³ط§ظ„ ظ†ظ…ظˆط°ط¬ ط·ظ„ط¨ ط§ظ„ط®ط¯ظ…ط© ط£ظˆ ط§ظ„ط­ط¬ط² ط¹ط¨ط± ط§ظ„ظ…ظˆظ‚ط¹
                ظ„ط§ ظٹط¹ظ†ظٹ ط¥طھظ…ط§ظ… ط§ظ„ط­ط¬ط² ط£ظˆ طھط£ظƒظٹط¯ طھظ‚ط¯ظٹظ… ط§ظ„ط®ط¯ظ…ط©
                ط¨ط´ظƒظ„ ظ†ظ‡ط§ط¦ظٹطŒ ظˆط¥ظ†ظ…ط§ ظٹظ…ط«ظ„ ط·ظ„ط¨ظ‹ط§ ظ…ط¨ط¯ط¦ظٹظ‹ط§
                ظ„ظ„طھظˆط§طµظ„ ظ…ط¹ ط§ظ„ط¹ظ…ظٹظ„ ظˆظ…ط±ط§ط¬ط¹ط© ط§ظ„طھظپط§طµظٹظ„.
              </p>

              <p>
                ظٹطھظ… طھط£ظƒظٹط¯ ط§ظ„ط­ط¬ط² ط£ظˆ ط§ظ„ط®ط¯ظ…ط© ط¨ط¹ط¯ ط§ظ„طھظˆط§طµظ„ ظ…ط¹
                ط§ظ„ط¹ظ…ظٹظ„ ظˆط§ظ„ط§طھظپط§ظ‚ ط¹ظ„ظ‰ ط§ظ„طھظپط§طµظٹظ„ ظˆط§ظ„ظ…ظˆط¹ط¯
                ظˆط§ظ„ظ…طھط·ظ„ط¨ط§طھ ط°ط§طھ ط§ظ„طµظ„ط©.
              </p>

            </article>

            {/* 03 */}
            <article className="legal-card">

              <span className="legal-number">
                03
              </span>

              <h2>
                ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط¹ظ…ظٹظ„
              </h2>

              <p>
                ظٹظ„طھط²ظ… ط§ظ„ط¹ظ…ظٹظ„ ط¨طھظ‚ط¯ظٹظ… ظ…ط¹ظ„ظˆظ…ط§طھ طµط­ظٹط­ط© ظˆط¯ظ‚ظٹظ‚ط©
                ط¹ظ†ط¯ ط¥ط±ط³ط§ظ„ ط·ظ„ط¨ ط§ظ„ط®ط¯ظ…ط©طŒ ظˆظٹطھط­ظ…ظ„ ظ…ط³ط¤ظˆظ„ظٹط©
                طھط­ط¯ظٹط« ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„طھظٹ ظٹظ‚ط¯ظ…ظ‡ط§ ط¹ظ†ط¯ ط§ظ„ط­ط§ط¬ط©.
              </p>

            </article>

            {/* 04 */}
            <article className="legal-card">

              <span className="legal-number">
                04
              </span>

              <h2>
                ط§ط³طھط®ط¯ط§ظ… ط§ظ„ظ…ظˆظ‚ط¹
              </h2>

              <p>
                ظٹظ„طھط²ظ… ط§ظ„ظ…ط³طھط®ط¯ظ… ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ظ…ظˆظ‚ط¹ ط¨ط·ط±ظٹظ‚ط©
                ظ†ط¸ط§ظ…ظٹط© ظˆظ…ط´ط±ظˆط¹ط©طŒ ظˆط¹ط¯ظ… ط§ط³طھط®ط¯ط§ظ…ظ‡ ظ„ط£ظٹ ط؛ط±ط¶
                ظٹط®ط§ظ„ظپ ط§ظ„ط£ظ†ط¸ظ…ط© ط£ظˆ ظٹط¶ط± ط¨ط§ظ„ظ…ظˆظ‚ط¹ ط£ظˆ ط¨ط§ظ„ط®ط¯ظ…ط§طھ
                ط£ظˆ ط¨ط­ظ‚ظˆظ‚ ط§ظ„ط¢ط®ط±ظٹظ†.
              </p>

            </article>

            {/* 05 */}
            <article className="legal-card">

              <span className="legal-number">
                05
              </span>

              <h2>
                ط§ظ„ط£ط³ط¹ط§ط± ظˆط§ظ„ط¯ظپط¹
              </h2>

              <p>
                ظ‚ط¯ طھط®طھظ„ظپ ط£ط³ط¹ط§ط± ط§ظ„ط®ط¯ظ…ط§طھ ظˆط§ظ„ظ…ط³ط§ط­ط§طھ ظˆظپظ‚ ظ†ظˆط¹
                ط§ظ„ط®ط¯ظ…ط© ظˆط§ظ„ظ…ط¯ط© ظˆط§ظ„ظ…طھط·ظ„ط¨ط§طھ. ظˆظ„ط§ ظٹط¹طھط¨ط± ط£ظٹ
                ط³ط¹ط± ط£ظˆ ط¹ط±ط¶ ط¸ط§ظ‡ط± ظپظٹ ط§ظ„ظ…ظˆظ‚ط¹ ظ…ظ„ط²ظ…ظ‹ط§ ط¥ظ„ط§ ط¨ط¹ط¯
                طھط£ظƒظٹط¯ظ‡ ظ…ظ† ط§ظ„ط¬ظ‡ط© ط§ظ„ظ…ط®طھطµط©.
              </p>

            </article>

            {/* 06 */}
            <article className="legal-card">

              <span className="legal-number">
                06
              </span>

              <h2>
                ط§ظ„طھط¹ط¯ظٹظ„ط§طھ ط¹ظ„ظ‰ ط§ظ„ط®ط¯ظ…ط§طھ
              </h2>

              <p>
                ظٹط­ظ‚ ظ„ظ„ظ…ظ†ط´ط£ط© طھط­ط¯ظٹط« ط£ظˆ طھط¹ط¯ظٹظ„ ط£ظˆ ط¥ط¶ط§ظپط© ط£ظˆ
                ط¥ظٹظ‚ط§ظپ ط£ظٹ ظ…ظ† ط§ظ„ط®ط¯ظ…ط§طھ ط£ظˆ ط§ظ„ظ…ط³ط§ط­ط§طھ ظˆظپظ‚
                ط§ط­طھظٹط§ط¬ط§طھ ط§ظ„طھط´ط؛ظٹظ„طŒ ظ…ط¹ ط§ظ„ط­ط±طµ ط¹ظ„ظ‰ طھط­ط¯ظٹط«
                ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ظ…ظ†ط´ظˆط±ط© ظپظٹ ط§ظ„ظ…ظˆظ‚ط¹.
              </p>

            </article>

            {/* 07 */}
            <article className="legal-card">

              <span className="legal-number">
                07
              </span>

              <h2>
                ط§ظ„ظ…ظ„ظƒظٹط© ط§ظ„ظپظƒط±ظٹط©
              </h2>

              <p>
                ط¬ظ…ظٹط¹ ط§ظ„ظ…ط­طھظˆظٹط§طھ ط§ظ„ظ…ظˆط¬ظˆط¯ط© ظپظٹ ط§ظ„ظ…ظˆظ‚ط¹طŒ ط¨ظ…ط§
                ظپظٹ ط°ظ„ظƒ ط§ظ„ظ†طµظˆطµ ظˆط§ظ„طµظˆط± ظˆط§ظ„ط¹ظ†ط§طµط± ط§ظ„ط¨طµط±ظٹط©
                ظˆط§ظ„ظ‡ظˆظٹط© ظˆط§ظ„ط¹ظ„ط§ظ…ط§طھطŒ ظ…ظ…ظ„ظˆظƒط© ظ„ظ„ظ…ظ†ط´ط£ط© ط£ظˆ
                ظ…ط³طھط®ط¯ظ…ط© ط¨ظ…ظˆط¬ط¨ ط­ظ‚ظˆظ‚ ظ†ط¸ط§ظ…ظٹط©طŒ ظˆظ„ط§ ظٹط¬ظˆط²
                ط¥ط¹ط§ط¯ط© ط§ط³طھط®ط¯ط§ظ…ظ‡ط§ ط£ظˆ ظ†ط³ط®ظ‡ط§ ط¯ظˆظ† ط¥ط°ظ†.
              </p>

            </article>

            {/* 08 */}
            <article className="legal-card">

              <span className="legal-number">
                08
              </span>

              <h2>
                ط­ط¯ظˆط¯ ط§ظ„ظ…ط³ط¤ظˆظ„ظٹط©
              </h2>

              <p>
                ظ†ط¨ط°ظ„ ط¬ظ‡ظˆط¯ظ‹ط§ ظ…ط¹ظ‚ظˆظ„ط© ظ„ظ„ظ…ط­ط§ظپط¸ط© ط¹ظ„ظ‰ ط¯ظ‚ط©
                ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ظˆطھظˆظپط± ط§ظ„ظ…ظˆظ‚ط¹طŒ ط¥ظ„ط§ ط£ظ† ط¨ط¹ط¶
                ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط£ظˆ ط§ظ„ط®ط¯ظ…ط§طھ ظ‚ط¯ طھطھط؛ظٹط± ط¨ط­ط³ط¨
                ط¸ط±ظˆظپ ط§ظ„طھط´ط؛ظٹظ„ ظˆط§ظ„طھظˆظپط±.
              </p>

            </article>

            {/* 09 */}
            <article className="legal-card">

              <span className="legal-number">
                09
              </span>

              <h2>
                ط§ظ„طھظˆط§طµظ„
              </h2>

              <p>
                ظ„ظ„ط§ط³طھظپط³ط§ط±ط§طھ ط§ظ„ظ…طھط¹ظ„ظ‚ط© ط¨ظ‡ط°ظ‡ ط§ظ„ط´ط±ظˆط· ط£ظˆ
                ط¨ط§ظ„ط®ط¯ظ…ط§طھطŒ ظٹظ…ظƒظ† ط§ظ„طھظˆط§طµظ„ ظ…ط¹ظ†ط§ ظ…ظ† ط®ظ„ط§ظ„
                ط¨ظٹط§ظ†ط§طھ ط§ظ„ط§طھطµط§ظ„ ط§ظ„ظ…ظ†ط´ظˆط±ط© ظپظٹ ط§ظ„ظ…ظˆظ‚ط¹.
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

export default TermsPage;

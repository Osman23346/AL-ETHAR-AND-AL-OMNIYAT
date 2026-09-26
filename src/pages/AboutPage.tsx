import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Eye,
  Target,
  TrendingUp
} from "lucide-react";

import { siteContent } from "../data/content";

function AboutPage() {
  const {
    brand,
    about,
    values,
    relationship,
    contact
  } = siteContent;

  return (
    <div className="inner-page">

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
          className="inner-page-hero"
          aria-labelledby="about-page-title"
        >
          <div className="container">

            <span className="section-eyebrow">
              {about.eyebrow}
            </span>

            <h1 id="about-page-title">
              ط£ظƒط«ط± ظ…ظ† ظ…ط¬ط±ط¯
              <br />
              <em>ظ…ط³ط§ط­ط© ط¹ظ…ظ„</em>
            </h1>

            <p>
              {about.paragraphs[0]}
            </p>

          </div>
        </section>

        {/* About */}
        <section
          className="inner-about-section"
          aria-labelledby="story-title"
        >
          <div className="container inner-about-grid">

            <div className="inner-about-image">

              <img
                src={about.image}
                alt={about.imageTitle}
                loading="lazy"
                decoding="async"
              />

              <div className="inner-image-caption">

                <Building2
                  size={21}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {about.imageTitle}
                  </strong>

                  <span>
                    {about.imageSubtitle}
                  </span>
                </div>

              </div>

            </div>

            <div className="inner-about-content">

              <span className="section-eyebrow">
                ظ‚طµطھظ†ط§
              </span>

              <h2 id="story-title">
                ظ†ط¨ظ†ظٹ ط¨ظٹط¦ط© ط£ط¹ظ…ط§ظ„
                <br />
                <em>طھطھط¬ط§ظˆط² ظ…ظپظ‡ظˆظ… ط§ظ„ظ…ظƒطھط¨</em>
              </h2>

              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ))}

              <div
                className="inner-stats"
                aria-label="ط¥ط­طµط§ط¦ظٹط§طھ ط¹ظ† ط¥ظٹط«ط§ط±ظƒظˆ"
              >
                {about.stats.map((stat) => (
                  <div key={stat.label}>

                    <strong>
                      {stat.value}
                    </strong>

                    <span>
                      {stat.label}
                    </span>

                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* Vision & Mission */}
        <section
          className="inner-vision-section"
          aria-labelledby="vision-title"
        >
          <div className="container">

            <div className="section-heading">

              <span className="section-eyebrow">
                ط±ط¤ظٹطھظ†ط§ ظˆط±ط³ط§ظ„طھظ†ط§
              </span>

              <h2 id="vision-title">
                ظˆط¬ظ‡طھظ†ط§ ظˆط§ط¶ط­ط©
                <br />
                <em>ظˆظ†ظ…ظˆ ط£ط¹ظ…ط§ظ„ظƒ ظ‡ظˆ ط§ظ„ظ‡ط¯ظپ</em>
              </h2>

              <p>
                ظ†ط¹ظ…ظ„ ط¹ظ„ظ‰ ط¨ظ†ط§ط، ظ…ظ†ط¸ظˆظ…ط© ظ…طھظƒط§ظ…ظ„ط© طھط¬ط¹ظ„ ظ…ظ†
                ظ…ط³ط§ط­ط© ط§ظ„ط¹ظ…ظ„ ظ†ظ‚ط·ط© ط§ظ†ط·ظ„ط§ظ‚ ط­ظ‚ظٹظ‚ظٹط© ظ„ظ„ط£ط¹ظ…ط§ظ„.
              </p>

            </div>

            <div className="inner-vision-grid">

              <article className="inner-vision-card">

                <div
                  className="inner-card-icon"
                  aria-hidden="true"
                >
                  <Eye
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                <span>
                  ط±ط¤ظٹطھظ†ط§
                </span>

                <h3>
                  {about.vision.title}
                </h3>

                <p>
                  {about.vision.text}
                </p>

              </article>

              <article className="inner-vision-card featured">

                <div
                  className="inner-card-icon"
                  aria-hidden="true"
                >
                  <Target
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                <span>
                  ط±ط³ط§ظ„طھظ†ط§
                </span>

                <h3>
                  {about.mission.title}
                </h3>

                <p>
                  {about.mission.text}
                </p>

              </article>

            </div>

          </div>
        </section>

        {/* Values */}
        <section
          className="inner-values-section"
          aria-labelledby="values-title"
        >
          <div className="container">

            <div className="section-heading">

              <span className="section-eyebrow">
                ظ…ط§ ظ†ط¤ظ…ظ† ط¨ظ‡
              </span>

              <h2 id="values-title">
                ط®ظ…ط³ط© ظ…ط­ط§ظˆط±
                <br />
                <em>طھطµظ†ط¹ طھط¬ط±ط¨ط© ظ…طھظƒط§ظ…ظ„ط©</em>
              </h2>

              <p>
                ظ†ط±ط¨ط· ط¨ظٹظ† ط¹ظ†ط§طµط± ظ…ط®طھظ„ظپط© ظ„طھظ‚ط¯ظٹظ… طھط¬ط±ط¨ط© ط£ط¹ظ…ط§ظ„
                ط¹ظ…ظ„ظٹط© ظˆظ…ط±ظ†ط© ظˆظ‚ط§ط¨ظ„ط© ظ„ظ„ظ†ظ…ظˆ.
              </p>

            </div>

            <div className="inner-values-grid">

              {values.items.map((item, index) => (
                <article
                  key={item.title}
                  className="inner-value-card"
                >

                  <span className="inner-value-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div
                    className="inner-value-icon"
                    aria-hidden="true"
                  >
                    <TrendingUp
                      size={23}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </article>
              ))}

            </div>

          </div>
        </section>

        {/* Relationship */}
        <section
          className="inner-relationship-section"
          aria-labelledby="relationship-title"
        >
          <div className="container">

            <div className="inner-relationship-content">

              <span className="section-eyebrow">
                {relationship.eyebrow}
              </span>

              <h2 id="relationship-title">
                {relationship.title}
                <br />
                <em>{relationship.highlight}</em>
              </h2>

              <p>
                {relationship.description}
              </p>

            </div>

            <div className="inner-relationship-steps">

              {relationship.steps.map((step, index) => (
                <div
                  key={step}
                  className="inner-relationship-step"
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>
                    {step}
                  </strong>

                  {index < relationship.steps.length - 1 && (
                    <ArrowLeft
                      size={20}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  )}

                </div>
              ))}

            </div>

          </div>
        </section>

        {/* Contact CTA */}
        <section
          className="inner-contact-cta"
          aria-labelledby="about-cta-title"
        >
          <div className="container">

            <div>

              <span className="section-eyebrow">
                ط§ط¨ط¯ط£ ظ…ط¹ظ†ط§
              </span>

              <h2 id="about-cta-title">
                ظ‡ظ„ طھط¨ط­ط« ط¹ظ† ظ…ط³ط§ط­ط©
                <br />
                <em>طھط®ط¯ظ… ظ†ظ…ظˆ ط£ط¹ظ…ط§ظ„ظƒطں</em>
              </h2>

              <p>
                ظٹط³ط¹ط¯ظ†ط§ ظ…ط³ط§ط¹ط¯طھظƒ ظپظٹ ط§ط®طھظٹط§ط± ط§ظ„ظ…ط³ط§ط­ط© ط£ظˆ
                ط§ظ„ط®ط¯ظ…ط© ط§ظ„ظ…ظ†ط§ط³ط¨ط© ظ„ط§ط­طھظٹط§ط¬ظƒ.
              </p>

            </div>

            <div className="inner-contact-actions">

              <a
                href="/#services"
                className="inner-primary-button"
              >
                <span>ط§ط³طھظƒط´ظپ ط®ط¯ظ…ط§طھظ†ط§</span>

                <ArrowLeft
                  size={18}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </a>

              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inner-secondary-button"
              >
                <span>طھظˆط§طµظ„ ط¹ط¨ط± ظˆط§طھط³ط§ط¨</span>

                <CheckCircle2
                  size={18}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </a>

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

export default AboutPage;

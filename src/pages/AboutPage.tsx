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
            aria-label={`العودة إلى الصفحة الرئيسية - ${brand.name}`}
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

          <a
            href="/"
            className="inner-page-back"
          >
            <span>العودة للرئيسية</span>

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
              أكثر من مجرد
              <br />
              <em>مساحة عمل</em>
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
                قصتنا
              </span>

              <h2 id="story-title">
                نبني بيئة أعمال
                <br />
                <em>تتجاوز مفهوم المكتب</em>
              </h2>

              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ))}

              <div
                className="inner-stats"
                aria-label="إحصائيات عن إيثاركو"
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
                رؤيتنا ورسالتنا
              </span>

              <h2 id="vision-title">
                وجهتنا واضحة
                <br />
                <em>ونمو أعمالك هو الهدف</em>
              </h2>

              <p>
                نعمل على بناء منظومة متكاملة تجعل من
                مساحة العمل نقطة انطلاق حقيقية للأعمال.
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
                  رؤيتنا
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
                  رسالتنا
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
                ما نؤمن به
              </span>

              <h2 id="values-title">
                خمسة محاور
                <br />
                <em>تصنع تجربة متكاملة</em>
              </h2>

              <p>
                نربط بين عناصر مختلفة لتقديم تجربة أعمال
                عملية ومرنة وقابلة للنمو.
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
                ابدأ معنا
              </span>

              <h2 id="about-cta-title">
                هل تبحث عن مساحة
                <br />
                <em>تخدم نمو أعمالك؟</em>
              </h2>

              <p>
                يسعدنا مساعدتك في اختيار المساحة أو
                الخدمة المناسبة لاحتياجك.
              </p>

            </div>

            <div className="inner-contact-actions">

              <a
                href="/#services"
                className="inner-primary-button"
              >
                <span>استكشف خدماتنا</span>

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
                <span>تواصل عبر واتساب</span>

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
            © 2026 {brand.name} {brand.subtitle}
          </span>

          <a href="/">
            العودة للرئيسية
          </a>

        </div>

      </footer>

    </div>
  );
}

export default AboutPage;
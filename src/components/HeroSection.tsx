import {
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

import { siteContent } from "../data/content";

function HeroSection() {
  const { hero, brand } = siteContent;

  return (
    <section id="home" className="hero">
      <div
        className="hero-overlay"
        aria-hidden="true"
      />

      <div className="container hero-content">

        <div className="hero-badge">
          <span aria-hidden="true" />
          {hero.badge}
        </div>

        <div className="hero-brand">
          <strong>{brand.name}</strong>

          <span className="hero-brand-subtitle">
            {brand.subtitle}
          </span>
        </div>

        <h1>
          {hero.title}
          <br />
          <em>{hero.highlight}</em>
        </h1>

        <p>
          {hero.description}
        </p>

        <div className="hero-actions">
          <a
            href="#services"
            className="primary-button"
          >
            <span>اكتشف خدماتنا</span>

            <ArrowLeft
              size={20}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </a>

          <a
            href="#about"
            className="secondary-button"
          >
            تعرف علينا
          </a>
        </div>

        <div className="hero-features">
          {hero.features.map((feature) => (
            <div key={feature}>
              <CheckCircle2
                size={21}
                strokeWidth={1.9}
                aria-hidden="true"
              />

              <span>{feature}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
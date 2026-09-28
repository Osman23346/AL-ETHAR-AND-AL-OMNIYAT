import {
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { useSiteContent } from "../../hooks/useSiteContent";
import { Badge, Container, LinkButton } from "../ui";

function HeroSection() {
  const { hero, brand } = useSiteContent();

  return (
    <section id="home" className="hero">
      <div
        className="hero-overlay"
        aria-hidden="true"
      />

      <Container className="hero-content">

        <Badge className="hero-badge">
          <span aria-hidden="true" />
          {hero.badge}
        </Badge>

        <div className="hero-brand">
          <strong className="hero-slogan">
            {brand.slogan}
          </strong>
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
          <LinkButton
            href="#spaces"
            variant="primary"
            className="primary-button"
          >
            <span>{hero.primaryButton}</span>

            <ArrowLeft
              size={20}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </LinkButton>

          <LinkButton
            href="#contact"
            variant="secondary"
            className="secondary-button"
          >
            {hero.secondaryButton}
          </LinkButton>
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

      </Container>
    </section>
  );
}

export default HeroSection;
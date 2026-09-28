import { ArrowLeft } from "lucide-react";

import { useSiteContent } from "../../hooks/useSiteContent";

function CTASection() {
  const { cta } = useSiteContent();

  return (
    <section className="cta">
      <div className="container cta-inner">

        <div>
          <span className="eyebrow light">
            {cta.eyebrow}
          </span>

          <h2>
            {cta.title}
            <br />
            <span>{cta.highlight}</span>
          </h2>

          {cta.description && (
            <p>{cta.description}</p>
          )}
        </div>

        <a
          href="#services"
          className="cta-button"
        >
          <span>{cta.button}</span>

          <ArrowLeft
            size={20}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </a>

      </div>
    </section>
  );
}

export default CTASection;
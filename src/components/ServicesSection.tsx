import {
  Building2,
  Calculator,
  Scale,
  Megaphone,
  ClipboardList,
  BriefcaseBusiness
} from "lucide-react";

import { siteContent } from "../data/content";
import type { Service } from "../data/siteData";

type ServicesSectionProps = {
  onSelectService: (service: Service) => void;
};

const serviceIcons = [
  Building2,
  Calculator,
  Scale,
  Megaphone,
  ClipboardList,
  BriefcaseBusiness
];

function ServicesSection({
  onSelectService
}: ServicesSectionProps) {
  const { businessServices } = siteContent;

  return (
    <section id="services" className="services-section">
      <div className="container">

        <div className="section-heading">
          <span className="section-eyebrow">
            {businessServices.eyebrow}
          </span>

          <h2>
            {businessServices.title}
            <br />
            <em>{businessServices.highlight}</em>
          </h2>

          <p>{businessServices.description}</p>
        </div>

        <div className="services-grid">
          {businessServices.items.map((service, index) => {
            const Icon =
              serviceIcons[index] || BriefcaseBusiness;

            const selectableService: Service = {
              id: service.id,
              title: service.title,
              description: service.description,
              image:
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
            };

            return (
              <article
                key={service.id}
                className="service-card"
              >
                <div className="service-card-top">
                  <div className="service-icon">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  <span className="service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="service-card-content">
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <button
                    type="button"
                    className="service-request-button"
                    onClick={() =>
                      onSelectService(selectableService)
                    }
                  >
                    <span>اطلب الخدمة</span>
                    <span className="service-arrow">←</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;
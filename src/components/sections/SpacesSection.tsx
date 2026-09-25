import {
  ArrowLeft,
  Building2,
  Users,
  BriefcaseBusiness,
  Presentation,
  CalendarDays
} from "lucide-react";

import { siteContent } from "../../data/content";
import { Container, SectionHeader } from "../ui";
import type { Service } from "../../data/siteData";

type SpacesSectionProps = {
  onSelectService: (service: Service) => void;
};

const spaceIcons = [
  Building2,
  Users,
  BriefcaseBusiness,
  Presentation,
  CalendarDays
];

function SpacesSection({
  onSelectService
}: SpacesSectionProps) {
  const { spaces } = siteContent;

  return (
    <section id="spaces" className="spaces-section">
      <Container>
        <SectionHeader
          eyebrow={spaces.eyebrow}
          title={spaces.title}
          highlight={spaces.highlight}
          description={spaces.description}
        />

        <div className="spaces-grid">
          {spaces.items.map((space, index) => {
            const Icon =
              spaceIcons[index] || Building2;

            const selectableService: Service = {
              id: space.id,
              title: space.title,
              description: space.description,
              image: space.image
            };

            return (
              <article
                key={space.id}
                className={`space-card space-card-${index + 1}`}
              >
                <img
                  src={space.image}
                  alt={space.title}
                  loading="lazy"
                />

                <div
                  className="space-card-overlay"
                  aria-hidden="true"
                />

                <div className="space-card-content">
                  <div
                    className="space-card-icon"
                    aria-hidden="true"
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.8}
                    />
                  </div>

                  <span className="space-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{space.title}</h3>

                  <p>{space.description}</p>

                  <button
                    type="button"
                    className="space-card-button"
                    onClick={() =>
                      onSelectService(selectableService)
                    }
                  >
                    <span>استفسر عن المساحة</span>

                    <ArrowLeft
                      size={18}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </Container>
    </section>
  );
}

export default SpacesSection;
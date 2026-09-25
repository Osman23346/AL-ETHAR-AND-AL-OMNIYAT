import {
  Rocket,
  Building2,
  BriefcaseBusiness,
  GitBranch,
  UserRound,
  Handshake
} from "lucide-react";

import { siteContent } from "../../data/content";
import { Card, Container, SectionHeader } from "../ui";

const audienceIcons = [
  Rocket,
  Building2,
  BriefcaseBusiness,
  GitBranch,
  UserRound,
  Handshake
];

function AudiencesSection() {
  const { audiences } = siteContent;

  return (
    <section className="audiences-section">
      <Container>
        <SectionHeader
          eyebrow={audiences.eyebrow}
          title={audiences.title}
          highlight={audiences.highlight}
        />

        <div className="audiences-grid">
          {audiences.items.map((item, index) => {
            const Icon =
              audienceIcons[index] || BriefcaseBusiness;

            return (
              <Card
                key={item.title}
                className="audience-card"
                interactive
              >
                <div className="audience-card-top">
                  <div
                    className="audience-icon"
                    aria-hidden="true"
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.8}
                    />
                  </div>

                  <span className="audience-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </Card>
            );
          })}
        </div>

      </Container>
    </section>
  );
}

export default AudiencesSection;
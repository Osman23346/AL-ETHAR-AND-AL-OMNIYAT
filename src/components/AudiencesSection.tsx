import {
  Rocket,
  Building2,
  BriefcaseBusiness,
  GitBranch,
  UserRound,
  Handshake
} from "lucide-react";

import { siteContent } from "../data/content";

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
      <div className="container">

        <div className="section-heading">
          <span className="section-eyebrow">
            {audiences.eyebrow}
          </span>

          <h2>
            {audiences.title}
            <br />
            <em>{audiences.highlight}</em>
          </h2>
        </div>

        <div className="audiences-grid">
          {audiences.items.map((item, index) => {
            const Icon =
              audienceIcons[index] || BriefcaseBusiness;

            return (
              <article
                key={item.title}
                className="audience-card"
              >
                <div className="audience-card-top">
                  <div className="audience-icon">
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                    />
                  </div>

                  <span className="audience-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default AudiencesSection;
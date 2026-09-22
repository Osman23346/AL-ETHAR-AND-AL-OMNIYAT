
import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  TrendingUp
} from "lucide-react";

import { siteContent } from "../data/content";

const stepIcons = [
  Building2,
  BriefcaseBusiness,
  TrendingUp
];

function RelationshipSection() {
  const { relationship } = siteContent;

  return (
    <section className="relationship-section">
      <div className="container">

        <div className="relationship-layout">

          <div className="relationship-intro">
            <span className="section-eyebrow">
              {relationship.eyebrow}
            </span>

            <h2>
              {relationship.title}
              <br />
              <em>{relationship.highlight}</em>
            </h2>

            <p>
              {relationship.description}
            </p>
          </div>

          <div className="relationship-steps">
            {relationship.steps.map((step, index) => {
              const Icon =
                stepIcons[index] || TrendingUp;

              return (
                <div
                  key={step}
                  className="relationship-step"
                >
                  <div className="relationship-step-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relationship-step-icon">
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="relationship-step-content">
                    <span>
                      {index === 0
                        ? "البداية"
                        : index === 1
                          ? "المرحلة التالية"
                          : "الهدف"}
                    </span>

                    <h3>{step}</h3>
                  </div>

                  {index < relationship.steps.length - 1 && (
                    <ArrowLeft
                      className="relationship-arrow"
                      size={22}
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

export default RelationshipSection;

import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  TrendingUp,
} from "lucide-react";

import { siteContent } from "../../data/content";

const stepIcons = [
  Building2,
  BriefcaseBusiness,
  TrendingUp,
];

const stepMeta = [
  {
    label: "البداية",
    description: "مساحة مهيأة للعمل والانطلاق بثقة.",
  },
  {
    label: "المرحلة التالية",
    description: "بيئة تدعم أعمالك وتفتح فرصًا للتعاون والتطور.",
  },
  {
    label: "الهدف",
    description: "منصة متكاملة تساعد أعمالك على النمو والاستدامة.",
  },
];

function RelationshipSection() {
  const { relationship } = siteContent;

  return (
    <section
      className="relationship-section"
      aria-labelledby="relationship-title"
    >
      <div className="container">
        <div className="relationship-layout">

          <div className="relationship-intro" data-reveal>
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

          <div
            className="relationship-steps"
            aria-label="مراحل العلاقة"
          >
            {relationship.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? TrendingUp;
              const meta = stepMeta[index] ?? stepMeta[2];

              return (
                <div
                  key={`${step}-${index}`}
                  className="relationship-step"
                  data-reveal
                >
                  <div className="relationship-step-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div
                    className="relationship-step-icon"
                    aria-hidden="true"
                  >
                    <Icon
                      size={27}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="relationship-step-content">
                    <span>{meta.label}</span>

                    <h3>{step}</h3>

                    <p className="relationship-step-description">
                      {meta.description}
                    </p>
                  </div>

                  {index < relationship.steps.length - 1 && (
                    <ArrowLeft
                      className="relationship-arrow"
                      size={23}
                      strokeWidth={1.8}
                      aria-hidden="true"
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
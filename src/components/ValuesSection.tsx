import {
  Building2,
  Headphones,
  Cpu,
  SlidersHorizontal,
  TrendingUp
} from "lucide-react";

import { siteContent } from "../data/content";

const valueIcons = [
  Building2,
  Headphones,
  Cpu,
  SlidersHorizontal,
  TrendingUp
];

function ValuesSection() {
  const { values } = siteContent;

  return (
    <section className="values-section">
      <div className="container">

        <div className="section-heading">
          <span className="section-eyebrow">
            {values.eyebrow}
          </span>

          <h2>
            {values.title}
            <br />
            <em>{values.highlight}</em>
          </h2>

          <p>{values.description}</p>
        </div>

        <div className="values-grid">
          {values.items.map((item, index) => {
            const Icon =
              valueIcons[index] || TrendingUp;

            return (
              <article
                key={item.title}
                className="value-card"
              >
                <div className="value-card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="value-icon" aria-hidden="true">
                  <Icon
                    size={27}
                    strokeWidth={1.8}
                  />
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

export default ValuesSection;
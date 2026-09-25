import {
  Building2,
  Headphones,
  Cpu,
  SlidersHorizontal,
  TrendingUp
} from "lucide-react";

import { siteContent } from "../../data/content";
import { Card, Container, SectionHeader } from "../ui";

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
      <Container>
        <SectionHeader
          eyebrow={values.eyebrow}
          title={values.title}
          highlight={values.highlight}
          description={values.description}
        />

        <div className="values-grid">
          {values.items.map((item, index) => {
            const Icon =
              valueIcons[index] || TrendingUp;

            return (
              <Card
                key={item.title}
                className="value-card"
                interactive
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
              </Card>
            );
          })}
        </div>

      </Container>
    </section>
  );
}

export default ValuesSection;
import {
  Eye,
  Target
} from "lucide-react";

import { siteContent } from "../../data/content";
import { Card, Container, SectionHeader } from "../ui";

function VisionMissionSection() {
  const { about } = siteContent;

  return (
    <section className="vision-mission-section">
      <Container>

        <SectionHeader
          eyebrow="رؤيتنا ورسالتنا"
          title="نحو بيئة أعمال"
          highlight="تصنع النمو"
          description="نعمل على بناء تجربة متكاملة تتجاوز مفهوم المساحة التقليدية، وتجمع بين البيئة المناسبة والخدمات والحلول التي تدعم رحلة العمل."
        />

        <div className="vision-mission-grid">

          <Card className="vision-mission-card" interactive>
            <div
              className="vision-mission-icon"
              aria-hidden="true"
            >
              <Eye
                size={29}
                strokeWidth={1.8}
              />
            </div>

            <div className="vision-mission-number">
              01
            </div>

            <span className="vision-mission-label">
              رؤيتنا
            </span>

            <h3>
              {about.vision.title}
            </h3>

            <p>
              {about.vision.text}
            </p>
          </Card>

          <Card className="vision-mission-card featured" interactive>
            <div
              className="vision-mission-icon"
              aria-hidden="true"
            >
              <Target
                size={29}
                strokeWidth={1.8}
              />
            </div>

            <div className="vision-mission-number">
              02
            </div>

            <span className="vision-mission-label">
              رسالتنا
            </span>

            <h3>
              {about.mission.title}
            </h3>

            <p>
              {about.mission.text}
            </p>
          </Card>

        </div>

      </Container>
    </section>
  );
}

export default VisionMissionSection;
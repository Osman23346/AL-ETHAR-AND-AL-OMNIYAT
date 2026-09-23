import {
  Eye,
  Target
} from "lucide-react";

import { siteContent } from "../data/content";

function VisionMissionSection() {
  const { about } = siteContent;

  return (
    <section className="vision-mission-section">
      <div className="container">

        <div className="section-heading">
          <span className="section-eyebrow">
            رؤيتنا ورسالتنا
          </span>

          <h2>
            نحو بيئة أعمال
            <br />
            <em>تصنع النمو</em>
          </h2>

          <p>
            نعمل على بناء تجربة متكاملة تتجاوز مفهوم المساحة التقليدية،
            وتجمع بين البيئة المناسبة والخدمات والحلول التي تدعم رحلة العمل.
          </p>
        </div>

        <div className="vision-mission-grid">

          <article className="vision-mission-card">
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
          </article>

          <article className="vision-mission-card featured">
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
          </article>

        </div>

      </div>
    </section>
  );
}

export default VisionMissionSection;
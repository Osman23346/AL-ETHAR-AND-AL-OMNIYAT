
import { siteContent } from "../data/content";

function AboutSection() {
  const { about } = siteContent;

  return (
    <section id="about" className="section about">
      <div className="container about-grid">

        <div className="section-image">
          <img
            src={about.image}
            alt={about.imageTitle}
          />

          <div className="image-card">
            <strong>{about.imageTitle}</strong>
            <span>{about.imageSubtitle}</span>
          </div>
        </div>

        <div className="section-content">

          <span className="eyebrow">
            {about.eyebrow}
          </span>

          <h2>
            {about.title}
            <span> {about.highlight}</span>
          </h2>

          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          ))}

          <div className="stats">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;

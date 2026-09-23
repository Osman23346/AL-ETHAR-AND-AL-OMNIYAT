import { siteContent } from "../data/content";

function AboutSection() {
  const { about } = siteContent;

  return (
    <section
      id="about"
      className="section about"
      aria-labelledby="about-title"
    >
      <div className="container about-grid">

        {/* الصورة */}
        <div className="section-image">

          <img
            src={about.image}
            alt={about.imageTitle}
            loading="lazy"
            decoding="async"
          />

          <div className="image-card">
            <strong>{about.imageTitle}</strong>

            <span>
              {about.imageSubtitle}
            </span>
          </div>

        </div>

        {/* المحتوى */}
        <div className="section-content">

          <span className="eyebrow">
            {about.eyebrow}
          </span>

          <h2 id="about-title">
            {about.title}
            <span> {about.highlight}</span>
          </h2>

          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          ))}

          {/* الإحصائيات */}
          <div
            className="stats"
            aria-label="معلومات عن إيثاركو"
          >
            {about.stats.map((stat) => (
              <div key={stat.label}>

                <strong>
                  {stat.value}
                </strong>

                <span>
                  {stat.label}
                </span>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;
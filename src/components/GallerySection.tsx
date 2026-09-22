import { siteContent } from "../data/content";

function GallerySection() {
  const { gallery } = siteContent;

  return (
    <section id="gallery" className="section gallery">

      <div className="container">

        <div className="section-heading center">

          <span className="eyebrow">
            {gallery.eyebrow}
          </span>

          <h2>
            {gallery.title}
            <span> {gallery.highlight}</span>
          </h2>

          <p>
            {gallery.description}
          </p>

        </div>

        <div className="gallery-grid">

          {gallery.images.map((image, index) => (
            <div
              className={`gallery-item gallery-${index + 1}`}
              key={image}
            >
              <img
                src={image}
                alt={`صورة ${index + 1}`}
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default GallerySection;
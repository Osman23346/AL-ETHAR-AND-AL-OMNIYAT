
import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabaseClient";
import { siteContent } from "../../data/content";
import { Container, SectionHeader } from "../ui";

type GalleryMedia = {
  id: string;
  title: string;
  type: "image" | "video";
  url: string;
  created_at: string;
};

function GallerySection() {
  const { gallery } = siteContent;

  const [images, setImages] = useState<string[]>(
    gallery.images
  );

  useEffect(() => {
    let mounted = true;

    const loadGalleryImages = async () => {
      const { data, error } = await supabase
        .from("site_media")
        .select(
          "id,title,type,url,created_at"
        )
        .eq("type", "image")
        .order("created_at", {
          ascending: true
        });

      if (error) {
        console.error(
          "Supabase gallery media error:",
          error
        );

        return;
      }

      if (
        mounted &&
        data &&
        data.length > 0
      ) {
        const media =
          data as GalleryMedia[];

        setImages(
          media
            .map((item) => item.url)
            .filter(Boolean)
        );
      }
    };

    loadGalleryImages();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="gallery"
      className="section gallery"
    >
      <Container>

        <SectionHeader
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          highlight={gallery.highlight}
          description={gallery.description}
          align="center"
        />

        <div className="gallery-grid">

          {images.map((image, index) => (
            <div
              className={`gallery-item gallery-${index + 1}`}
              data-reveal
              key={`${image}-${index}`}
            >
              <img
                src={image}
                alt={`صورة من إيثاركو ${index + 1}`}
                loading={
                  index === 0
                    ? "eager"
                    : "lazy"
                }
                decoding="async"
              />
            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}

export default GallerySection;

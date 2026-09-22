
import { Play } from "lucide-react";

import { siteContent } from "../data/content";

function VideoSection() {
  const { video } = siteContent;

  return (
    <section className="video-section">

      <div className="video-image">
        <img
          src={video.image}
          alt="فيديو تعريفي عن الإيثار والأمنيات"
        />

        <div className="video-overlay" />

        <button
          className="play-button"
          aria-label="تشغيل الفيديو"
          type="button"
        >
          <Play
            fill="currentColor"
            size={28}
          />
        </button>

        <div className="video-text">
          <span>{video.eyebrow}</span>

          <h2>{video.title}</h2>

          {video.description && (
            <p>{video.description}</p>
          )}
        </div>

      </div>

    </section>
  );
}

export default VideoSection;

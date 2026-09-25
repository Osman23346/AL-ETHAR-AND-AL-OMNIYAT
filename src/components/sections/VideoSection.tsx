
import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

import { supabase } from "../../lib/supabaseClient";
import { siteContent } from "../../data/content";

type VideoMedia = {
  id: string;
  title: string;
  type: "image" | "video";
  url: string;
  created_at: string;
};

function VideoSection() {
  const { video } = siteContent;

  const [videoUrl, setVideoUrl] =
    useState<string | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    const loadVideo = async () => {
      const { data, error } = await supabase
        .from("site_media")
        .select(
          "id,title,type,url,created_at"
        )
        .eq("type", "video")
        .order("created_at", {
          ascending: false
        })
        .limit(1);

      if (error) {
        console.error(
          "Supabase video media error:",
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
          data[0] as VideoMedia;

        if (media.url) {
          setVideoUrl(media.url);
        }
      }
    };

    loadVideo();

    return () => {
      mounted = false;
    };
  }, []);

  const handlePlay = () => {
    if (!videoUrl) {
      return;
    }

    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <section className="video-section">
        <div className="video-image">

          <img
            src={video.image}
            alt="فيديو تعريفي عن إيثاركو"
            loading="lazy"
            decoding="async"
          />

          <div
            className="video-overlay"
            aria-hidden="true"
          />

          <button
            className="play-button"
            aria-label={
              videoUrl
                ? "تشغيل الفيديو التعريفي"
                : "الفيديو غير متوفر حاليًا"
            }
            type="button"
            onClick={handlePlay}
            disabled={!videoUrl}
          >
            <Play
              fill="currentColor"
              size={30}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>

          <div className="video-text">
            <span>
              {video.eyebrow}
            </span>

            <h2>
              {video.title}
            </h2>

            {video.description && (
              <p>
                {video.description}
              </p>
            )}
          </div>

        </div>
      </section>

      {isPlaying && videoUrl && (
        <div
          className="video-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="الفيديو التعريفي"
          onClick={handleClose}
        >
          <div
            className="video-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="video-modal-close"
              onClick={handleClose}
              aria-label="إغلاق الفيديو"
            >
              <X
                size={22}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>

            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
            >
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoSection;

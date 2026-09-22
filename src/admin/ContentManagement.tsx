import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";

import { getSiteContent, saveSiteContent, resetSiteContent } from "../services/contentService";
import { siteContent } from "../data/content";

function ContentManagement() {
  const [content, setContent] = useState(getSiteContent);
  const [saved, setSaved] = useState(false);

  const updateHero = (
    field: keyof typeof siteContent.hero,
    value: string
  ) => {
    setContent((current) => ({
      ...current,
      hero: {
        ...current.hero,
        [field]: value
      }
    }));

    setSaved(false);
  };

  const updateAbout = (
    field: "eyebrow" | "title" | "highlight" | "image" | "imageTitle" | "imageSubtitle",
    value: string
  ) => {
    setContent((current) => ({
      ...current,
      about: {
        ...current.about,
        [field]: value
      }
    }));

    setSaved(false);
  };

  const updateServices = (
    field: "eyebrow" | "title" | "highlight" | "description",
    value: string
  ) => {
    setContent((current) => ({
      ...current,
      services: {
        ...current.services,
        [field]: value
      }
    }));

    setSaved(false);
  };

  const handleSave = () => {
    saveSiteContent(content);
    setSaved(true);
  };

  const handleReset = () => {
    resetSiteContent();
    setContent(siteContent);
    setSaved(false);
  };

  return (
    <div className="admin-content-page">

      <div className="admin-page-header">
        <div>
          <h1>إدارة محتوى الموقع</h1>
          <p>
            تعديل النصوص الأساسية الظاهرة في الموقع.
          </p>
        </div>

        <div className="admin-header-actions">

          <button
            className="admin-secondary-button"
            onClick={handleReset}
          >
            <RotateCcw size={17} />
            إعادة الافتراضي
          </button>

          <button
            className="admin-primary-button"
            onClick={handleSave}
          >
            <Save size={17} />
            حفظ التغييرات
          </button>

        </div>
      </div>

      {saved && (
        <div className="admin-success-message">
          تم حفظ التغييرات بنجاح
        </div>
      )}

      {/* Hero */}

      <section className="content-editor-card">

        <div className="content-editor-header">
          <div>
            <span>01</span>
            <div>
              <h2>القسم الرئيسي</h2>
              <p>المحتوى الظاهر في بداية الصفحة</p>
            </div>
          </div>
        </div>

        <div className="content-form-grid">

          <label>
            الشارة
            <input
              value={content.hero.badge}
              onChange={(e) =>
                updateHero("badge", e.target.value)
              }
            />
          </label>

          <label>
            العنوان الرئيسي
            <input
              value={content.hero.title}
              onChange={(e) =>
                updateHero("title", e.target.value)
              }
            />
          </label>

          <label>
            العنوان المميز
            <input
              value={content.hero.highlight}
              onChange={(e) =>
                updateHero("highlight", e.target.value)
              }
            />
          </label>

          <label className="full-width">
            الوصف
            <textarea
              rows={4}
              value={content.hero.description}
              onChange={(e) =>
                updateHero("description", e.target.value)
              }
            />
          </label>

        </div>

      </section>

      {/* About */}

      <section className="content-editor-card">

        <div className="content-editor-header">
          <div>
            <span>02</span>
            <div>
              <h2>عن المكان</h2>
              <p>معلومات تعريفية عن مساحة الأعمال</p>
            </div>
          </div>
        </div>

        <div className="content-form-grid">

          <label>
            العنوان الصغير
            <input
              value={content.about.eyebrow}
              onChange={(e) =>
                updateAbout("eyebrow", e.target.value)
              }
            />
          </label>

          <label>
            العنوان
            <input
              value={content.about.title}
              onChange={(e) =>
                updateAbout("title", e.target.value)
              }
            />
          </label>

          <label>
            العنوان المميز
            <input
              value={content.about.highlight}
              onChange={(e) =>
                updateAbout("highlight", e.target.value)
              }
            />
          </label>

          <label>
            عنوان الصورة
            <input
              value={content.about.imageTitle}
              onChange={(e) =>
                updateAbout("imageTitle", e.target.value)
              }
            />
          </label>

          <label>
            وصف الصورة
            <input
              value={content.about.imageSubtitle}
              onChange={(e) =>
                updateAbout("imageSubtitle", e.target.value)
              }
            />
          </label>

          <label>
            رابط الصورة
            <input
              value={content.about.image}
              onChange={(e) =>
                updateAbout("image", e.target.value)
              }
            />
          </label>

        </div>

      </section>

      {/* Services */}

      <section className="content-editor-card">

        <div className="content-editor-header">
          <div>
            <span>03</span>
            <div>
              <h2>الخدمات</h2>
              <p>عنوان ووصف قسم الخدمات</p>
            </div>
          </div>
        </div>

        <div className="content-form-grid">

          <label>
            العنوان الصغير
            <input
              value={content.services.eyebrow}
              onChange={(e) =>
                updateServices("eyebrow", e.target.value)
              }
            />
          </label>

          <label>
            العنوان
            <input
              value={content.services.title}
              onChange={(e) =>
                updateServices("title", e.target.value)
              }
            />
          </label>

          <label>
            العنوان المميز
            <input
              value={content.services.highlight}
              onChange={(e) =>
                updateServices("highlight", e.target.value)
              }
            />
          </label>

          <label className="full-width">
            الوصف
            <textarea
              rows={4}
              value={content.services.description}
              onChange={(e) =>
                updateServices(
                  "description",
                  e.target.value
                )
              }
            />
          </label>

        </div>

      </section>

    </div>
  );
}

export default ContentManagement;
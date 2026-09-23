
import { useState } from "react";
import {
  Save,
  RotateCcw,
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  CheckCircle2,
  Image as ImageIcon,
  Type,
  AlignRight,
} from "lucide-react";

import {
  getSiteContent,
  saveSiteContent,
  resetSiteContent,
} from "../services/contentService";

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
        [field]: value,
      },
    }));

    setSaved(false);
  };

  const updateAbout = (
    field:
      | "eyebrow"
      | "title"
      | "highlight"
      | "image"
      | "imageTitle"
      | "imageSubtitle",
    value: string
  ) => {
    setContent((current) => ({
      ...current,
      about: {
        ...current.about,
        [field]: value,
      },
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
        [field]: value,
      },
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

      <div className="content-management-topbar">
        <div className="content-management-title">

          <div className="content-management-icon">
            <LayoutDashboard size={22} />
          </div>

          <div>
            <div className="content-management-eyebrow">
              إدارة الموقع
            </div>

            <h1>إدارة محتوى الموقع</h1>

            <p>
              تحكم في النصوص والمحتوى الأساسي الظاهر للزوار.
            </p>
          </div>

        </div>

        <div className="content-management-actions">

          <button
            type="button"
            className="admin-secondary-button content-reset-button"
            onClick={handleReset}
          >
            <RotateCcw size={17} />
            <span>إعادة الافتراضي</span>
          </button>

          <button
            type="button"
            className="admin-primary-button content-save-button"
            onClick={handleSave}
          >
            <Save size={17} />
            <span>حفظ التغييرات</span>
          </button>

        </div>
      </div>

      {saved && (
        <div className="content-saved-alert">
          <CheckCircle2 size={19} />

          <div>
            <strong>تم حفظ التغييرات</strong>
            <span>تم تحديث محتوى الموقع بنجاح.</span>
          </div>
        </div>
      )}

      {/* القسم الرئيسي */}

      <section className="content-editor-card">

        <div className="content-editor-header">

          <div className="content-section-title">

            <div className="content-section-number">
              01
            </div>

            <div className="content-section-icon">
              <LayoutDashboard size={20} />
            </div>

            <div>
              <h2>القسم الرئيسي</h2>
              <p>
                المحتوى الذي يظهر للزائر في بداية الصفحة.
              </p>
            </div>

          </div>

          <span className="content-section-status">
            <span />
            نشط
          </span>

        </div>

        <div className="content-editor-divider" />

        <div className="content-form-grid">

          <label className="content-field">

            <span className="content-field-label">
              <Type size={15} />
              الشارة
            </span>

            <input
              value={content.hero.badge}
              onChange={(e) =>
                updateHero("badge", e.target.value)
              }
              placeholder="مثال: مساحة أعمالك"
            />

            <small>
              النص الصغير أعلى العنوان الرئيسي.
            </small>

          </label>

          <label className="content-field">

            <span className="content-field-label">
              <Type size={15} />
              العنوان الرئيسي
            </span>

            <input
              value={content.hero.title}
              onChange={(e) =>
                updateHero("title", e.target.value)
              }
              placeholder="العنوان الرئيسي"
            />

          </label>

          <label className="content-field">

            <span className="content-field-label">
              <Type size={15} />
              العنوان المميز
            </span>

            <input
              value={content.hero.highlight}
              onChange={(e) =>
                updateHero("highlight", e.target.value)
              }
              placeholder="الكلمة أو العبارة المميزة"
            />

            <small>
              تظهر بتنسيق مميز داخل القسم الرئيسي.
            </small>

          </label>

          <label className="content-field content-field-full">

            <span className="content-field-label">
              <AlignRight size={15} />
              الوصف
            </span>

            <textarea
              rows={5}
              value={content.hero.description}
              onChange={(e) =>
                updateHero("description", e.target.value)
              }
              placeholder="اكتب وصفًا مختصرًا للمشروع..."
            />

            <small>
              يفضل أن يكون الوصف مختصرًا وواضحًا للزائر.
            </small>

          </label>

        </div>
      </section>

      {/* عن المكان */}

      <section className="content-editor-card">

        <div className="content-editor-header">

          <div className="content-section-title">

            <div className="content-section-number">
              02
            </div>

            <div className="content-section-icon">
              <Building2 size={20} />
            </div>

            <div>
              <h2>عن المكان</h2>
              <p>
                المعلومات التعريفية التي تشرح فكرة المكان وهويته.
              </p>
            </div>

          </div>

          <span className="content-section-status">
            <span />
            نشط
          </span>

        </div>

        <div className="content-editor-divider" />

        <div className="content-form-grid">

          <label className="content-field">

            <span className="content-field-label">
              <Type size={15} />
              العنوان الصغير
            </span>

            <input
              value={content.about.eyebrow}
              onChange={(e) =>
                updateAbout("eyebrow", e.target.value)
              }
              placeholder="العنوان الصغير"
            />

          </label>

          <label className="content-field">

            <span className="content-field-label">
              <Type size={15} />
              العنوان
            </span>

            <input
              value={content.about.title}
              onChange={(e) =>
                updateAbout("title", e.target.value)
              }
              placeholder="عنوان القسم"
            />

          </label>

          <label className="content-field">

            <span className="content-field-label">
              <Type size={15} />
              العنوان المميز
            </span>

            <input
              value={content.about.highlight}
              onChange={(e) =>
                updateAbout("highlight", e.target.value)
              }
              placeholder="العنوان المميز"
            />

          </label>

          <label className="content-field">

            <span className="content-field-label">
              <ImageIcon size={15} />
              عنوان الصورة
            </span>

            <input
              value={content.about.imageTitle}
              onChange={(e) =>
                updateAbout("imageTitle", e.target.value)
              }
              placeholder="عنوان يظهر فوق الصورة"
            />

          </label>

          <label className="content-field">

            <span className="content-field-label">
              <AlignRight size={15} />
              وصف الصورة
            </span>

            <input
              value={content.about.imageSubtitle}
              onChange={(e) =>
                updateAbout("imageSubtitle", e.target.value)
              }
              placeholder="وصف مختصر للصورة"
            />

          </label>

          <label className="content-field">

            <span className="content-field-label">
              <ImageIcon size={15} />
              رابط الصورة
            </span>

            <input
              dir="ltr"
              value={content.about.image}
              onChange={(e) =>
                updateAbout("image", e.target.value)
              }
              placeholder="https://..."
            />

            <small>
              استخدم رابط الصورة المستخدم في القسم التعريفي.
            </small>

          </label>

        </div>
      </section>

      {/* الخدمات */}

      <section className="content-editor-card">

        <div className="content-editor-header">

          <div className="content-section-title">

            <div className="content-section-number">
              03
            </div>

            <div className="content-section-icon">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <h2>الخدمات</h2>
              <p>
                العناوين والنصوص التعريفية الخاصة بقسم الخدمات.
              </p>
            </div>

          </div>

          <span className="content-section-status">
            <span />
            نشط
          </span>

        </div>

        <div className="content-editor-divider" />

        <div className="content-form-grid">

          <label className="content-field">

            <span className="content-field-label">
              <Type size={15} />
              العنوان الصغير
            </span>

            <input
              value={content.services.eyebrow}
              onChange={(e) =>
                updateServices("eyebrow", e.target.value)
              }
              placeholder="العنوان الصغير"
            />

          </label>

          <label className="content-field">

            <span className="content-field-label">
              <Type size={15} />
              العنوان
            </span>

            <input
              value={content.services.title}
              onChange={(e) =>
                updateServices("title", e.target.value)
              }
              placeholder="عنوان قسم الخدمات"
            />

          </label>

          <label className="content-field">

            <span className="content-field-label">
              <Type size={15} />
              العنوان المميز
            </span>

            <input
              value={content.services.highlight}
              onChange={(e) =>
                updateServices("highlight", e.target.value)
              }
              placeholder="العنوان المميز"
            />

          </label>

          <label className="content-field content-field-full">

            <span className="content-field-label">
              <AlignRight size={15} />
              الوصف
            </span>

            <textarea
              rows={5}
              value={content.services.description}
              onChange={(e) =>
                updateServices(
                  "description",
                  e.target.value
                )
              }
              placeholder="اكتب وصفًا مختصرًا للخدمات..."
            />

          </label>

        </div>
      </section>

      {/* أزرار أسفل الصفحة */}

      <div className="content-management-footer">

        <div>
          <strong>هل انتهيت من التعديلات؟</strong>
          <span>
            احفظ التغييرات لتظهر على الموقع.
          </span>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={handleSave}
        >
          <Save size={17} />
          حفظ التغييرات
        </button>

      </div>

    </div>
  );
}

export default ContentManagement;


import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  FileText,
  LockKeyhole,
  ShieldCheck
} from "lucide-react";

import { siteContent } from "../data/content";

function PrivacyPage() {
  const { brand, contact } = siteContent;

  return (
    <div className="legal-page">

      {/* Header */}
      <header className="inner-page-header">
        <div className="container inner-page-nav">

          <a
            href="/"
            className="logo"
          >
            <img
              src="/logo-mark.svg.png"
              alt={brand.name}
              className="logo-mark-image"
            />

            <span className="logo-text">
              <strong>{brand.name}</strong>
              <small>{brand.subtitle}</small>
            </span>
          </a>

          <a
            href="/"
            className="inner-page-back"
          >
            العودة للرئيسية
            <ArrowLeft size={17} />
          </a>

        </div>
      </header>

      <main>

        {/* Hero */}
        <section className="legal-hero privacy-hero">
          <div className="container">

            <div className="legal-hero-icon">
              <LockKeyhole
                size={30}
                strokeWidth={1.8}
              />
            </div>

            <span className="section-eyebrow">
              حماية البيانات والخصوصية
            </span>

            <h1>
              سياسة
              <br />
              <em>الخصوصية</em>
            </h1>

            <p>
              توضح هذه السياسة كيفية تعامل {brand.name}
              مع المعلومات التي يتم تقديمها من خلال
              الموقع وطلبات الخدمات.
            </p>

          </div>
        </section>

        {/* Content */}
        <section className="legal-content-section">
          <div className="container legal-content">

            <div className="legal-intro">
              <ShieldCheck size={24} />

              <p>
                نحرص على التعامل مع بيانات العملاء
                بمسؤولية، واستخدام المعلومات التي يتم
                تقديمها من خلال الموقع للأغراض المرتبطة
                بالخدمات والتواصل وتحسين تجربة المستخدم.
              </p>
            </div>

            <article className="legal-card">

              <span className="legal-number">
                01
              </span>

              <div className="legal-card-icon">
                <FileText size={21} />
              </div>

              <h2>
                المعلومات التي نجمعها
              </h2>

              <p>
                قد يتم جمع المعلومات التي يختار المستخدم
                تقديمها عند تعبئة نموذج طلب خدمة أو
                التواصل معنا، مثل الاسم ورقم الجوال
                والبريد الإلكتروني والتفاصيل المرتبطة
                بالطلب.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                02
              </span>

              <div className="legal-card-icon">
                <Eye size={21} />
              </div>

              <h2>
                كيفية استخدام المعلومات
              </h2>

              <p>
                تستخدم المعلومات المقدمة للتواصل مع
                العميل، وفهم احتياجه، ومعالجة طلب الخدمة،
                وتأكيد المواعيد والتفاصيل المتعلقة
                بالخدمة المطلوبة.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                03
              </span>

              <div className="legal-card-icon">
                <LockKeyhole size={21} />
              </div>

              <h2>
                حماية المعلومات
              </h2>

              <p>
                نتخذ الإجراءات المناسبة للمساعدة في حماية
                المعلومات التي يتم جمعها من الوصول أو
                الاستخدام غير المصرح به، مع مراعاة أن
                نقل المعلومات عبر الإنترنت لا يمكن ضمان
                أمانه بشكل مطلق.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                04
              </span>

              <h2>
                مشاركة المعلومات
              </h2>

              <p>
                لا يتم بيع المعلومات الشخصية للعملاء.
                وقد يتم مشاركة المعلومات عند الحاجة
                التشغيلية لتقديم الخدمة أو عندما يكون
                ذلك مطلوبًا بموجب الأنظمة أو الجهات
                المختصة.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                05
              </span>

              <h2>
                ملفات تعريف الارتباط
              </h2>

              <p>
                قد يستخدم الموقع تقنيات أساسية لتحسين
                تجربة المستخدم وتشغيل بعض وظائف الموقع.
                ويمكن أن تختلف التقنيات المستخدمة مع
                تطور الموقع والخدمات الرقمية.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                06
              </span>

              <h2>
                روابط الجهات الخارجية
              </h2>

              <p>
                قد يحتوي الموقع على روابط لخدمات أو
                منصات خارجية مثل شبكات التواصل الاجتماعي.
                تخضع هذه الجهات لسياسات الخصوصية الخاصة
                بها، ولا نتحمل مسؤولية ممارسات الخصوصية
                الخاصة بالمواقع الخارجية.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                07
              </span>

              <h2>
                حقوق المستخدم
              </h2>

              <p>
                يمكن للمستخدم التواصل معنا للاستفسار عن
                البيانات التي قدمها أو طلب تصحيحها أو
                الاستفسار عن طريقة استخدامها، وذلك وفق
                المتطلبات والإجراءات المعمول بها.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                08
              </span>

              <h2>
                تحديث سياسة الخصوصية
              </h2>

              <p>
                قد يتم تحديث هذه السياسة من وقت لآخر
                لمواكبة تطور الموقع والخدمات أو أي
                متطلبات تنظيمية جديدة. سيتم نشر النسخة
                المحدثة في هذه الصفحة.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                09
              </span>

              <h2>
                التواصل والاستفسارات
              </h2>

              <p>
                إذا كان لديك أي استفسار متعلق بالخصوصية
                أو البيانات الشخصية، يمكنك التواصل معنا
                من خلال البريد الإلكتروني.
              </p>

              <a
                href={`mailto:${contact.email}`}
                className="legal-contact"
              >
                {contact.email}
                <ArrowLeft size={16} />
              </a>

            </article>

            <div className="legal-note">

              <CheckCircle2 size={20} />

              <p>
                آخر تحديث لهذه الصفحة: 2026
              </p>

            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="inner-page-footer">
        <div className="container">

          <span>
            © 2026 {brand.name} {brand.subtitle}
          </span>

          <a href="/">
            العودة للرئيسية
          </a>

        </div>
      </footer>

    </div>
  );
}

export default PrivacyPage;

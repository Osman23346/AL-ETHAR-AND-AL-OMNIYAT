
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  ShieldCheck
} from "lucide-react";

import { siteContent } from "../data/content";

function TermsPage() {
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
        <section className="legal-hero">
          <div className="container">

            <div className="legal-hero-icon">
              <FileText
                size={30}
                strokeWidth={1.8}
              />
            </div>

            <span className="section-eyebrow">
              المعلومات القانونية
            </span>

            <h1>
              الشروط
              <br />
              <em>والأحكام</em>
            </h1>

            <p>
              توضح هذه الشروط والأحكام القواعد المنظمة
              لاستخدام موقع وخدمات {brand.name}.
            </p>

          </div>
        </section>

        {/* Content */}
        <section className="legal-content-section">
          <div className="container legal-content">

            <div className="legal-intro">
              <ShieldCheck size={24} />

              <p>
                باستخدامك لهذا الموقع أو طلبك لأي من
                خدماتنا، فإنك تقر بقراءة وفهم هذه الشروط
                والموافقة عليها.
              </p>
            </div>

            <article className="legal-card">

              <span className="legal-number">
                01
              </span>

              <h2>
                التعريف بالخدمة
              </h2>

              <p>
                يقدم {brand.name} مجموعة من مساحات الأعمال
                والخدمات المساندة والحلول المرتبطة ببيئة
                الأعمال، وفق الخدمات المتاحة في الموقع
                وحسب طبيعة كل خدمة ومتطلباتها.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                02
              </span>

              <h2>
                طلب الخدمات والحجز
              </h2>

              <p>
                إرسال نموذج طلب الخدمة أو الحجز عبر الموقع
                لا يعني إتمام الحجز أو تأكيد تقديم الخدمة
                بشكل نهائي، وإنما يمثل طلبًا مبدئيًا
                للتواصل مع العميل ومراجعة التفاصيل.
              </p>

              <p>
                يتم تأكيد الحجز أو الخدمة بعد التواصل مع
                العميل والاتفاق على التفاصيل والموعد
                والمتطلبات ذات الصلة.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                03
              </span>

              <h2>
                معلومات العميل
              </h2>

              <p>
                يلتزم العميل بتقديم معلومات صحيحة ودقيقة
                عند إرسال طلب الخدمة، ويتحمل مسؤولية
                تحديث البيانات التي يقدمها عند الحاجة.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                04
              </span>

              <h2>
                استخدام الموقع
              </h2>

              <p>
                يلتزم المستخدم باستخدام الموقع بطريقة
                نظامية ومشروعة، وعدم استخدامه لأي غرض
                يخالف الأنظمة أو يضر بالموقع أو بالخدمات
                أو بحقوق الآخرين.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                05
              </span>

              <h2>
                الأسعار والدفع
              </h2>

              <p>
                قد تختلف أسعار الخدمات والمساحات وفق نوع
                الخدمة والمدة والمتطلبات. ولا يعتبر أي
                سعر أو عرض ظاهر في الموقع ملزمًا إلا بعد
                تأكيده من الجهة المختصة.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                06
              </span>

              <h2>
                التعديلات على الخدمات
              </h2>

              <p>
                يحق للمنشأة تحديث أو تعديل أو إضافة أو
                إيقاف أي من الخدمات أو المساحات وفق
                احتياجات التشغيل، مع الحرص على تحديث
                المعلومات المنشورة في الموقع.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                07
              </span>

              <h2>
                الملكية الفكرية
              </h2>

              <p>
                جميع المحتويات الموجودة في الموقع، بما
                في ذلك النصوص والصور والعناصر البصرية
                والهوية والعلامات، مملوكة للمنشأة أو
                مستخدمة بموجب حقوق نظامية، ولا يجوز
                إعادة استخدامها أو نسخها دون إذن.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                08
              </span>

              <h2>
                حدود المسؤولية
              </h2>

              <p>
                نبذل جهودًا معقولة للمحافظة على دقة
                المعلومات وتوفر الموقع، إلا أن بعض
                المعلومات أو الخدمات قد تتغير بحسب
                ظروف التشغيل والتوفر.
              </p>

            </article>

            <article className="legal-card">

              <span className="legal-number">
                09
              </span>

              <h2>
                التواصل
              </h2>

              <p>
                للاستفسارات المتعلقة بهذه الشروط أو
                بالخدمات، يمكن التواصل معنا من خلال
                بيانات الاتصال المنشورة في الموقع.
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

export default TermsPage;

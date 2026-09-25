# CSS Architecture

- `../theme.css` — المصدر المركزي للهوية: الألوان، الظلال، المقاسات، الحركة، وثيم لوحة الإدارة.
- `base.css` — reset والأساسيات والـ container.
- `header.css` / `hero.css` — أعلى الصفحة.
- `sections.css` — أقسام الصفحة الرئيسية المشتركة.
- `footer.css` — الفوتر.
- `booking-modal*.css` — نافذة الحجز وتحسيناتها.
- `floating-actions.css` — زر واتساب العائم.
- `pages.css` — الصفحات الداخلية والقانونية.
- `accessibility.css` — حالات focus وإتاحة الاستخدام.
- `responsive.css` — نقاط التوقف والاستجابة للشاشات.
- `premium-overrides.css` — طبقة التحسين البصري الأخيرة. لا تضع فيها متغيرات `:root`؛ المتغيرات مكانها `theme.css` فقط.

`../styles.css` هو manifest للاستيراد فقط. لا تضف قواعد تصميم مباشرة داخله.

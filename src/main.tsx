import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const AdminApp = lazy(() => import("./admin/AdminApp"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminResetPassword = lazy(() => import("./admin/AdminResetPassword"));
const AdminGuard = lazy(() => import("./admin/AdminGuard"));

const AboutPage = lazy(() => import("./pages/AboutPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));

import "./theme.css";
import "./styles.css";

function AppRouter() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  /*
   * ==============================
   * الإدارة
   * ==============================
   */

  // تسجيل دخول المدير
  if (path === "/admin/login") {
    return <AdminLogin />;
  }

  // إعادة تعيين كلمة المرور
  if (path === "/admin/reset-password") {
    return <AdminResetPassword />;
  }

  // جميع مسارات لوحة الإدارة محمية
  if (
    path === "/admin" ||
    path.startsWith("/admin/")
  ) {
    return (
      <AdminGuard>
        <AdminApp />
      </AdminGuard>
    );
  }

  /*
   * ==============================
   * الصفحات العامة
   * ==============================
   */

  if (path === "/about") {
    return <AboutPage />;
  }

  if (path === "/terms") {
    return <TermsPage />;
  }

  if (path === "/privacy") {
    return <PrivacyPage />;
  }

  /*
   * ==============================
   * الصفحة الرئيسية
   * ==============================
   */

  return <App />;
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <Suspense fallback={<p role="status" dir="rtl">جارٍ تحميل الصفحة...</p>}>
      <AppRouter />
    </Suspense>
  </React.StrictMode>
);

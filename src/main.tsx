import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const AdminApp = lazy(() => import("./admin/AdminApp"));
const MarketplaceAdmin = lazy(() => import("./admin/MarketplaceAdmin"));
const EmployeeRegistry = lazy(() => import("./admin/EmployeeRegistry"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminResetPassword = lazy(() => import("./admin/AdminResetPassword"));
const AdminGuard = lazy(() => import("./admin/AdminGuard"));

const AboutPage = lazy(() => import("./pages/AboutPage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const MarketplaceDetailPage = lazy(() => import("./pages/MarketplaceDetailPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));

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

  if (path === "/admin/employees") { return <AdminGuard><div dir="rtl" style={{padding:24,maxWidth:1100,margin:"auto"}}><a href="/admin">← لوحة إدارة الموقع</a><h1>الموظفون والأقسام</h1><EmployeeRegistry /></div></AdminGuard>; }

  if (path === "/admin/marketplace") {
    return <AdminGuard><MarketplaceAdmin /></AdminGuard>;
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

  if (path === "/marketplace") return <MarketplacePage />;
  if (path.startsWith("/marketplace/")) return <MarketplaceDetailPage slug={decodeURIComponent(path.slice("/marketplace/".length))} />;

  if (path === "/blog") return <BlogPage />;
  if (path.startsWith("/blog/")) return <BlogPage slug={decodeURIComponent(path.slice(6))} />;

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

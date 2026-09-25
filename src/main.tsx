import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import AdminApp from "./admin/AdminApp";
import AdminLogin from "./admin/AdminLogin";
import AdminResetPassword from "./admin/AdminResetPassword";
import AdminGuard from "./admin/AdminGuard";

import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

import "./theme.css";
import "./styles.css";

function AppRouter() {
  const path = window.location.pathname;

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
    <AppRouter />
  </React.StrictMode>
);
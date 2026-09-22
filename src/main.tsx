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

import "./styles.css";

function AppRouter() {
  const path = window.location.pathname;

  // صفحة تسجيل دخول المدير
  if (path === "/admin/login") {
    return <AdminLogin />;
  }

  // صفحة إعادة تعيين كلمة مرور المدير
  if (path === "/admin/reset-password") {
    return <AdminResetPassword />;
  }

  // حماية لوحة الإدارة
  if (path === "/admin" || path.startsWith("/admin/")) {
    return (
      <AdminGuard>
        <AdminApp />
      </AdminGuard>
    );
  }

  if (path === "/about") {
    return <AboutPage />;
  }

  if (path === "/terms") {
    return <TermsPage />;
  }

  if (path === "/privacy") {
    return <PrivacyPage />;
  }

  return <App />;
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
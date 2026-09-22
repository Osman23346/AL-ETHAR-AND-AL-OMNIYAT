import { FormEvent, useState } from "react";
import {
  ArrowRight,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import "./admin.css";

type Mode = "login" | "forgot";

export default function AdminLogin() {
  const [mode, setMode] = useState<Mode>("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      console.log("Supabase login result:", {
        user: data.user,
        error: loginError,
      });

      if (loginError) {
        console.error("Supabase login error:", loginError);
        setError(
          loginError.message ||
            "تعذر تسجيل الدخول. تحقق من البريد الإلكتروني وكلمة المرور."
        );
        return;
      }

      if (!data.user) {
        setError("تعذر العثور على حساب المستخدم.");
        return;
      }

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.user.id)
        .maybeSingle();

      console.log("Admin check result:", {
        admin,
        error: adminError,
      });

      if (adminError) {
        await supabase.auth.signOut();

        setError(
          `حدث خطأ أثناء التحقق من صلاحية المدير: ${adminError.message}`
        );
        return;
      }

      if (!admin) {
        await supabase.auth.signOut();

        setError(
          "تم تسجيل الدخول بنجاح، لكن هذا الحساب ليس لديه صلاحية دخول لوحة الإدارة."
        );
        return;
      }

      window.location.replace("/admin");
    } catch (err) {
      console.error("Unexpected login error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء تسجيل الدخول."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (event: FormEvent) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("أدخل البريد الإلكتروني أولًا.");
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: `${window.location.origin}/admin/reset-password`,
          }
        );

      if (resetError) {
        console.error("Password recovery error:", resetError);

        setError(
          resetError.message ||
            "تعذر إرسال رابط استعادة كلمة المرور."
        );

        return;
      }

      setSuccess(
        "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني. تحقق من البريد الوارد."
      );
    } catch (err) {
      console.error("Unexpected recovery error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء إرسال رابط الاستعادة."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-app"
      dir="rtl"
      style={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "36px",
          boxShadow: "0 20px 60px rgba(7, 27, 44, 0.12)",
          border: "1px solid #e7eeeb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 18px",
              borderRadius: "18px",
              background: "#071b2c",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldCheck size={30} />
          </div>

          <h1
            style={{
              margin: 0,
              color: "#071b2c",
              fontSize: "25px",
              fontWeight: 800,
            }}
          >
            {mode === "login"
              ? "لوحة الإدارة"
              : "استعادة كلمة المرور"}
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#718096",
              fontSize: "14px",
              lineHeight: 1.8,
            }}
          >
            {mode === "login"
              ? "تسجيل الدخول إلى لوحة إدارة الموقع"
              : "أدخل بريدك الإلكتروني لإرسال رابط استعادة كلمة المرور"}
          </p>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 700,
                  color: "#152733",
                }}
              >
                البريد الإلكتروني
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                disabled={loading}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px 14px",
                  border: "1px solid #d8e2de",
                  borderRadius: "10px",
                  outline: "none",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  direction: "ltr",
                  textAlign: "left",
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 700,
                  color: "#152733",
                }}
              >
                كلمة المرور
              </label>

              <div style={{ position: "relative" }}>
                <LockKeyhole
                  size={18}
                  style={{
                    position: "absolute",
                    left: "13px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#718096",
                    pointerEvents: "none",
                  }}
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={loading}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px 42px",
                    border: "1px solid #d8e2de",
                    borderRadius: "10px",
                    outline: "none",
                    fontFamily: "inherit",
                    fontSize: "15px",
                    direction: "ltr",
                    textAlign: "left",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                textAlign: "left",
                marginBottom: "18px",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setMode("forgot");
                  setError("");
                  setSuccess("");
                }}
                disabled={loading}
                style={{
                  border: 0,
                  background: "transparent",
                  color: "#159a73",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  padding: 0,
                }}
              >
                نسيت كلمة المرور؟
              </button>
            </div>

            {error && (
              <div
                style={{
                  marginBottom: "18px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "#fff1f1",
                  color: "#b42318",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  wordBreak: "break-word",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                border: 0,
                borderRadius: "10px",
                padding: "14px",
                background: loading ? "#7bb9a5" : "#159a73",
                color: "#ffffff",
                fontFamily: "inherit",
                fontSize: "16px",
                fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
              }}
            >
              <LogIn size={19} />
              {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 700,
                  color: "#152733",
                }}
              >
                البريد الإلكتروني
              </label>

              <div style={{ position: "relative" }}>
                <Mail
                  size={18}
                  style={{
                    position: "absolute",
                    left: "13px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#718096",
                    pointerEvents: "none",
                  }}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  disabled={loading}
                  autoFocus
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px 42px",
                    border: "1px solid #d8e2de",
                    borderRadius: "10px",
                    outline: "none",
                    fontFamily: "inherit",
                    fontSize: "15px",
                    direction: "ltr",
                    textAlign: "left",
                  }}
                />
              </div>
            </div>

            {error && (
              <div
                style={{
                  marginBottom: "18px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "#fff1f1",
                  color: "#b42318",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  wordBreak: "break-word",
                }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                style={{
                  marginBottom: "18px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "#ecfdf3",
                  color: "#067647",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                border: 0,
                borderRadius: "10px",
                padding: "14px",
                background: loading ? "#7bb9a5" : "#159a73",
                color: "#ffffff",
                fontFamily: "inherit",
                fontSize: "16px",
                fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
              }}
            >
              <Mail size={19} />
              {loading
                ? "جارٍ إرسال الرابط..."
                : "إرسال رابط الاستعادة"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "12px",
                border: "1px solid #d8e2de",
                borderRadius: "10px",
                padding: "13px",
                background: "#ffffff",
                color: "#071b2c",
                fontFamily: "inherit",
                fontSize: "14px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <ArrowRight size={18} />
              العودة لتسجيل الدخول
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
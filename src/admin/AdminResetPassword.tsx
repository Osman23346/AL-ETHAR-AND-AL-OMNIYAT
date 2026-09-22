import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole, Save, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import "./admin.css";

export default function AdminResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError(
          "رابط إعادة تعيين كلمة المرور غير صالح أو انتهت صلاحيته. اطلب رابطًا جديدًا."
        );
      }

      setChecking(false);
    };

    checkSession();
  }, []);

  const handleResetPassword = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    if (!password || !confirmPassword) {
      setError("يرجى إدخال كلمة المرور الجديدة وتأكيدها.");
      return;
    }

    if (password.length < 6) {
      setError("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        console.error("Password reset error:", updateError);
        setError(updateError.message);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        window.location.replace("/admin/login");
      }, 2000);
    } catch (err) {
      console.error("Unexpected password reset error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء تغيير كلمة المرور."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div
        dir="rtl"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f7f6",
          fontFamily: "Tajawal, sans-serif",
          color: "#071b2c",
          fontWeight: 700,
        }}
      >
        جارٍ التحقق من الرابط...
      </div>
    );
  }

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
            إعادة تعيين كلمة المرور
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#718096",
              fontSize: "14px",
              lineHeight: 1.8,
            }}
          >
            أنشئ كلمة مرور جديدة لحساب مدير الموقع
          </p>
        </div>

        {success ? (
          <div
            style={{
              padding: "16px",
              borderRadius: "10px",
              background: "#ecfdf3",
              color: "#067647",
              fontSize: "14px",
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            تم تغيير كلمة المرور بنجاح.
            <br />
            جارٍ تحويلك إلى صفحة تسجيل الدخول...
          </div>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 700,
                  color: "#152733",
                }}
              >
                كلمة المرور الجديدة
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
                  autoComplete="new-password"
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

            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 700,
                  color: "#152733",
                }}
              >
                تأكيد كلمة المرور
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
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
              disabled={loading || !!error}
              style={{
                width: "100%",
                border: 0,
                borderRadius: "10px",
                padding: "14px",
                background:
                  loading || error ? "#7bb9a5" : "#159a73",
                color: "#ffffff",
                fontFamily: "inherit",
                fontSize: "16px",
                fontWeight: 800,
                cursor:
                  loading || error ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
              }}
            >
              <Save size={19} />
              {loading
                ? "جارٍ حفظ كلمة المرور..."
                : "حفظ كلمة المرور الجديدة"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
import { ReactNode, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type AdminGuardProps = {
  children: ReactNode;
};

export default function AdminGuard({ children }: AdminGuardProps) {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        window.location.replace("/admin/login");
        return;
      }

      const { data: admin, error } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (error || !admin) {
        await supabase.auth.signOut();
        window.location.replace("/admin/login");
        return;
      }

      if (mounted) {
        setAuthorized(true);
        setChecking(false);
      }
    };

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, []);

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
          fontSize: "16px",
          fontWeight: 700,
        }}
      >
        جارٍ التحقق من صلاحية الدخول...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
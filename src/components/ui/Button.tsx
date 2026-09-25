import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

function Button({ children, variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={["ui-button", `ui-button--${variant}`, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </button>
  );
}

export default Button;

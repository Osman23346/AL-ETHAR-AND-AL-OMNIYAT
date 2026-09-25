import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

function LinkButton({ children, variant = "primary", className = "", ...props }: LinkButtonProps) {
  return (
    <a className={["ui-button", `ui-button--${variant}`, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </a>
  );
}

export default LinkButton;

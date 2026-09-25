import type { HTMLAttributes, ReactNode } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { children: ReactNode };

function Badge({ children, className = "", ...props }: BadgeProps) {
  return <span className={["ui-badge", className].filter(Boolean).join(" ")} {...props}>{children}</span>;
}

export default Badge;

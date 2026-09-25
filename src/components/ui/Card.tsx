import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "article" | "div" | "section";
  variant?: "default" | "glass" | "plain";
  interactive?: boolean;
};

function Card({ children, as: Tag = "article", variant = "default", interactive = false, className = "", ...props }: CardProps) {
  return (
    <Tag
      className={[
        "ui-card",
        `ui-card--${variant}`,
        interactive ? "ui-card--interactive" : "",
        className
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Card;

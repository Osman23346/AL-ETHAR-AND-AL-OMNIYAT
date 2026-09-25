import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  highlight?: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

function SectionHeader({ eyebrow, title, highlight, description, align = "start", className = "" }: SectionHeaderProps) {
  const classes = ["section-heading", align === "center" ? "center" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <h2>
        {title}
        {highlight ? <><br /><em>{highlight}</em></> : null}
      </h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export default SectionHeader;

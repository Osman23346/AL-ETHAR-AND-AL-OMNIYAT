import type { HTMLAttributes, ReactNode } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

function Container({ children, className = "", ...props }: ContainerProps) {
  return (
    <div className={["container", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export default Container;

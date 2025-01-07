import { ReactNode } from "react";
import classes from "./HamburgerMenu.module.css";

export const Content = ({
  children = null,
  className,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={[classes.filler, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};

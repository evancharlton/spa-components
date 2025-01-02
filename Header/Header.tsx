import { Link, useParams } from "react-router";
import { UpdateButton } from "../PwaContainer/UpdateButton";
import classes from "./Header.module.css";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  title: string;
  logo?: string;
  className?: string;
  children?: React.ReactNode;
};

const HEADER_BUTTONS_ID = "header-buttons";

export const Header = ({ title, logo, className, children }: Props) => {
  const { lang } = useParams();

  return (
    <div className={[classes.header, className].filter(Boolean).join(" ")}>
      <h1>
        <Link to={`/${lang || ""}`}>
          {logo ? <img src={logo} /> : null}
          {title}
        </Link>
      </h1>
      <div className={classes.buttons} id={HEADER_BUTTONS_ID}>
        <UpdateButton />
        {children}
      </div>
    </div>
  );
};

export const ButtonsPortal = ({ children }: { children: ReactNode }) => {
  const container = document.getElementById(HEADER_BUTTONS_ID);
  if (!container) {
    return null;
  }
  return createPortal(children, container);
};

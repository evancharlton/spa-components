import { Link } from "react-router";
import classes from "./LanguageSelector.module.css";

export const LanguageSelector = () => {
  return (
    <div className={classes.container}>
      <Link replace to="/nb">
        bokmål
      </Link>
      <Link replace to="/nn">
        nynorsk
      </Link>
    </div>
  );
};

import { IconType } from "react-icons";
import classes from "./HamburgerMenu.module.css";

type Props = {
  icon: IconType;
  text: string;
  className?: string;
  onClick: () => void;
};

export const Action = ({ icon: Icon, text, className, onClick }: Props) => {
  return (
    <button
      className={[classes.action, className].filter(Boolean).join(" ")}
      onClick={onClick}
    >
      <Icon /> {text}
    </button>
  );
};

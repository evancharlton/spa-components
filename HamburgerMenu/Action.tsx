import { IconType } from "react-icons";
import classes from "./HamburgerMenu.module.css";

type Props = {
  icon: IconType;
  text: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Action = ({
  icon: Icon,
  text,
  className,
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={[classes.action, className].filter(Boolean).join(" ")}
      onClick={onClick}
    >
      <Icon /> {text}
    </button>
  );
};

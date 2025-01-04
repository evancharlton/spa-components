import { MdOutlineOpenInNew } from "react-icons/md";
import classes from "./NaobLink.module.css";

export const NaobLink = ({
  children: word,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <a
      href={`https://naob.no/søk?q=${word}`}
      target={`_${word}`}
      rel="noreferrer"
      className={[classes.word, className].filter(Boolean).join(" ")}
    >
      {word}
      <MdOutlineOpenInNew />
    </a>
  );
};

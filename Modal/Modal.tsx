import { ReactNode, useRef, useEffect } from "react";
import classes from "./Modal.module.css";
import { MdClose } from "react-icons/md";
import "./Modal.css";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
  onClose: () => void;
  open: boolean;
};

export const Modal = ({ children, title, className, open, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={[classes.dialog, className].filter(Boolean).join(" ")}
    >
      <div className={classes.header}>
        <h2>{title}</h2>
        <button className={classes.close} onClick={onClose}>
          <MdClose />
        </button>
      </div>
      <div className={classes.content}>{children}</div>
    </dialog>
  );
};

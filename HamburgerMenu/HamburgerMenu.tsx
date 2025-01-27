import { useEffect, useRef } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import classes from "./HamburgerMenu.module.css";
import { createPortal } from "react-dom";
import { ButtonsPortal } from "../Header";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
};

export const HamburgerMenu = ({ children, open, onClose, onOpen }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const menu = (
    <dialog className={classes.hamburger} ref={dialogRef} onClose={onClose}>
      <div className={classes.header}>
        <button onClick={() => dialogRef.current?.close()}>
          <MdClose />
        </button>
      </div>
      {children}
    </dialog>
  );

  const portal = createPortal(menu, document.body);

  return (
    <>
      <ButtonsPortal>
        <button onClick={() => onOpen?.()} style={{ order: 100 }}>
          <MdMenu />
        </button>
      </ButtonsPortal>
      {portal}
    </>
  );
};

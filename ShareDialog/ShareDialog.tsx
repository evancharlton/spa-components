import { Modal } from "../Modal";
import classes from "./ShareDialog.module.css";
import { MdContentCopy, MdShare } from "react-icons/md";
import { ComponentProps, useEffect, useMemo, useState } from "react";

type CopyState = "waiting" | "error" | "copying" | "copied";

const COPY: Record<CopyState, { text: string; disabled: boolean }> = {
  waiting: { text: "kopier", disabled: false },
  error: { text: "kopier", disabled: true },
  copying: { text: "kopierer ...", disabled: true },
  copied: { text: "kopiert!", disabled: false },
} as const;

type ShareState = "waiting" | "error" | "unavailable" | "sharing" | "shared";

const SHARE: Record<ShareState, { text: string; disabled: boolean }> = {
  waiting: { text: "del", disabled: false },
  error: { text: "del", disabled: true },
  unavailable: { text: "del", disabled: true },
  sharing: { text: "deler ...", disabled: true },
  shared: { text: "delt!", disabled: false },
};

type Props = {
  url: string;
  shareText: string;
  dialogText?: React.ReactNode;
} & Omit<ComponentProps<typeof Modal>, "title" | "children">;

export const ShareDialog = ({
  url,
  dialogText,
  shareText,
  open,
  onClose,
}: Props) => {
  const [copyState, setCopyState] = useState<CopyState>("waiting");
  const [shareState, setShareState] = useState<ShareState>("waiting");

  const text = useMemo(() => {
    return [shareText, "", url].join("\n");
  }, [shareText, url]);

  useEffect(() => {
    setShareState(
      navigator.canShare?.({ text: text }) ? "waiting" : "unavailable"
    );
  }, [text]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Del spill"
      className={classes.dialog}
    >
      {dialogText ? dialogText : <p>Del dette puslespill med en venn:</p>}
      <code className={classes.url}>{url}</code>
      <div className={classes.buttons}>
        <button
          disabled={COPY[copyState].disabled}
          onClick={() => {
            setCopyState("copying");
            navigator.clipboard
              .writeText(text)
              .then(() => {
                setCopyState("copied");
              })
              .catch((e) => {
                console.warn(e);
                setCopyState("error");
              });
          }}
        >
          <MdContentCopy /> {COPY[copyState].text}
        </button>
        <button
          disabled={SHARE[shareState].disabled}
          onClick={() => {
            setShareState("sharing");
            navigator
              .share({ text })
              .then(() => {
                setShareState("shared");
              })
              .catch((e) => {
                console.warn(e);
                setShareState("error");
              });
          }}
        >
          <MdShare /> del
        </button>
      </div>
    </Modal>
  );
};

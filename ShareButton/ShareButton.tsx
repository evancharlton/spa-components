import { useState, useEffect, ReactNode } from "react";
import { MdContentCopy, MdShare } from "react-icons/md";
import classes from "./ShareButton.module.css";

type Props = {
  shareText: string;
  className?: string;
  children?: ReactNode;
  showText?: boolean;
};

type CopyState = "waiting" | "error" | "copying" | "copied";

const COPY: Record<
  CopyState,
  { text: string; disabled: boolean; className?: string }
> = {
  waiting: { text: "kopier", disabled: false },
  error: { text: "kopier", disabled: true, className: classes.error },
  copying: { text: "kopierer ...", disabled: true },
  copied: { text: "kopiert!", disabled: false, className: classes.done },
} as const;

type ShareState = "waiting" | "error" | "unavailable" | "sharing" | "shared";

const SHARE: Record<
  ShareState,
  { text: string; disabled: boolean; className?: string }
> = {
  waiting: { text: "del", disabled: false },
  error: { text: "del", disabled: true, className: classes.error },
  unavailable: { text: "del", disabled: true },
  sharing: { text: "deler ...", disabled: true },
  shared: { text: "delt!", disabled: false, className: classes.done },
};

export const ShareButton = ({
  shareText,
  className,
  children,
  showText = true,
}: Props) => {
  const [copyState, setCopyState] = useState<CopyState>("waiting");
  const [shareState, setShareState] = useState<ShareState>("waiting");

  useEffect(() => {
    setShareState(
      navigator.canShare?.({ text: shareText }) ? "waiting" : "unavailable"
    );
  }, [shareText]);

  const { disabled: shareDisabled, className: shareClassName } =
    SHARE[shareState];
  const { disabled: copyDisabled, className: copyClassName } = COPY[copyState];

  if (!shareDisabled) {
    return (
      <button
        className={className}
        data-type="share"
        disabled={SHARE[shareState].disabled}
        onClick={() => {
          setShareState("sharing");
          navigator
            .share({ text: shareText })
            .then(() => {
              setShareState("shared");
            })
            .catch((e) => {
              console.warn(e);
              setShareState("error");
            });
        }}
      >
        <MdShare className={shareClassName} /> {children}
      </button>
    );
  } else if (!copyDisabled) {
    return (
      <button
        className={className}
        data-type="copy"
        disabled={COPY[copyState].disabled}
        onClick={() => {
          setCopyState("copying");
          navigator.clipboard
            .writeText(shareText)
            .then(() => {
              setCopyState("copied");
            })
            .catch((e) => {
              console.warn(e);
              setCopyState("error");
            });
        }}
      >
        <MdContentCopy className={copyClassName} />{" "}
        {children ?? (showText ? COPY[copyState].text : "")}
      </button>
    );
  }

  return null;
};

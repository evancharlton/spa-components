import { createContext, useContext } from "react";
import { AppId } from "./PwaContainer";

export const PwaContext = createContext<
  | {
      updateNeeded: boolean;
      performUpdate: () => void;
      error: unknown | undefined;
      appId: AppId;
    }
  | undefined
>(undefined);

export const usePwa = () => {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error("usePwa() must be used inside of <PwaContainer>");
  }
  return context;
};

import { ReactNode, useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";
import { PwaContext } from "./context";

const WINDOW_RELOAD = () => {
  window.location.reload();
};

export type AppId =
  | "bokstavboks"
  | "ordle"
  | "ordlabyrint"
  | "spoke"
  | "stavehumle";

type Props = {
  appId: AppId;
  children: ReactNode;
};

export const PwaContainer = ({ children, appId }: Props) => {
  const [updateNeeded, setUpdateNeeded] = useState(false);
  const [performUpdate, setPerformUpdate] = useState<() => void>(
    () => WINDOW_RELOAD
  );
  const [error, setError] = useState<unknown | undefined>(undefined);

  useEffect(() => {
    const updateSW = registerSW({
      onRegisteredSW: () => {
        console.log("SW registered");
      },
      onRegisterError: (error) => {
        setError(error);
      },
      onNeedRefresh: () => {
        setUpdateNeeded(true);
      },
      onOfflineReady: () => {
        console.log("Offline ready");
      },
    });

    setPerformUpdate(() => () => {
      console.info("Reloading ...");
      updateSW(true);
    });
  }, []);

  return (
    <PwaContext.Provider
      value={{
        updateNeeded,
        performUpdate,
        error,
        appId,
      }}
    >
      {children}
    </PwaContext.Provider>
  );
};

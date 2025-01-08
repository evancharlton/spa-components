import { useEffect, useState } from "react";
import { usePwa } from "../PwaContainer";
import { useParams } from "react-router";

type Options<T> = {
  lang?: string;
  processor?: (response: Response) => Promise<T>;
  initial?: T;
};

export const useLanguageData = <T = unknown>(
  path: string,
  { lang: langOverride, processor, initial }: Options<T> = {},
) => {
  const [data, setData] = useState<T | undefined>(initial);
  const [state, setState] = useState<
    "pending" | "loading" | "loaded" | "error"
  >("pending");
  const [error, setError] = useState<Error>();

  const { appId } = usePwa();
  const { lang } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    setState("loading");
    fetch(`https://lister.evanc.no/${appId}/${langOverride ?? lang}/${path}`, {
      signal: controller.signal,
    })
      .then(processor ?? ((res) => res.json()))
      .then((res) => {
        setData(res);
        setState("loaded");
      })
      .catch((e) => {
        if (controller.signal.aborted) {
          return;
        }

        setError(e);
        setState("error");
      });

    return () => {
      controller.abort("unmounted");
    };
  }, [appId, lang, langOverride, path, processor]);

  return { data, state, error };
};

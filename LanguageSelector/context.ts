import { createContext, useContext } from "react";

export type Language = "nb" | "nn";

export const isLanguage = (v: string | undefined): v is Language => {
  return v === "nb" || v === "nn";
};

export const LanguageContext = createContext<
  { lang: Language; update: (lang: Language) => void } | undefined
>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "Must be rendered inside of <LanguageContext.Provider .. />!",
    );
  }
  return context;
};

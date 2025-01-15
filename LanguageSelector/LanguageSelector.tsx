import { Link, useNavigate, useParams } from "react-router";
import classes from "./LanguageSelector.module.css";
import { ReactNode, useCallback, useEffect } from "react";
import { usePwa } from "../PwaContainer";
import { isLanguage, Language, LanguageContext } from "./context";

const LANGUAGE_KEY = "lang";

export const LanguageSelector = () => {
  return (
    <div className={classes.container}>
      <Link replace to="/nb">
        bokmål
      </Link>
      <Link replace to="/nn">
        nynorsk
      </Link>
    </div>
  );
};

export const LanguageProvider = ({ children }: { children?: ReactNode }) => {
  const { appId } = usePwa();
  const key = `${appId}/${LANGUAGE_KEY}`;

  const updateLanguage = useCallback(
    (lang: Language) => {
      sessionStorage.setItem(key, lang);
    },
    [key],
  );

  const { lang: urlLang } = useParams();

  // Keep the stored language consistent with the language in the URL
  useEffect(() => {
    if (!urlLang) {
      return;
    }

    if (!isLanguage(urlLang)) {
      // TODO: Maybe throw?
      return;
    }

    updateLanguage(urlLang);
  }, [urlLang, updateLanguage]);

  // Auto-redirect the user to a saved language -- *if* and *only if* they don't
  // have a language set in the URL.
  const navigate = useNavigate();
  useEffect(() => {
    if (urlLang) {
      return;
    }

    const storedLang = sessionStorage.getItem(key);
    if (!storedLang) {
      return;
    }

    if (!isLanguage(storedLang)) {
      return;
    }

    if (storedLang !== urlLang) {
      navigate(`/${storedLang}`, { replace: true });
      return;
    }
  }, [key, urlLang, navigate]);

  if (!urlLang) {
    return <LanguageSelector />;
  }

  return (
    <LanguageContext.Provider
      key={urlLang}
      value={{ lang: urlLang as Language, update: updateLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

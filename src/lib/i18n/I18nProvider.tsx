"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import ruDict from "./dictionaries/ru.json";
import enDict from "./dictionaries/en.json";

type Locale = "ru" | "en";
type Dictionary = Record<string, string>;

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const dictionaries: Record<Locale, Dictionary> = {
  ru: ruDict,
  en: enDict,
};

const I18nContext = createContext<I18nContextType>({
  locale: "ru",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "ru" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string) => {
      return dictionaries[locale][key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

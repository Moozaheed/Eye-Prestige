"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { dictionaries, type Locale, type Dictionary } from "./dictionaries";

interface I18nContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "eye-prestige-locale";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bn");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && (saved === "en" || saved === "bn")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "bn" : "en");
  }, [locale, setLocale]);

  return (
    <I18nContext.Provider
      value={{ locale, t: dictionaries[locale], setLocale, toggleLocale }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

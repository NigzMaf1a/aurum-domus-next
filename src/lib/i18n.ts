// src/lib/i18n.ts
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

/* ------------------------------------------------------------------ */
/* 🔤 Locale registry                                                 */

export const locales = [
  'en', // English
  'sw', // Swahili
  'fr', // French
  'de', // German
  'pt', // Portuguese
  'es', // Spanish
  'it', // Italian
  'zh', // Mandarin Chinese
] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/* helper — “en-US” → “en” (falls back to default) */
const toShort = (lng: string): Locale =>
  (lng.split('-')[0] as Locale) in loaders ? (lng.split('-')[0] as Locale) : defaultLocale;

/* ------------------------------------------------------------------ */
/* 📦 Dynamic JSON loaders (inside src/locales)                        */

type Loader = () => Promise<{ default: Record<string, string> }>;
const loaders: Record<Locale, Loader> = {
  en: () => import('../locales/en/common.json'),
  sw: () => import('../locales/sw/common.json'),
  fr: () => import('../locales/fr/common.json'),
  de: () => import('../locales/de/common.json'),
  pt: () => import('../locales/pt/common.json'),
  es: () => import('../locales/es/common.json'),
  it: () => import('../locales/it/common.json'),
  zh: () => import('../locales/zh/common.json'),
};

async function loadBundle(lng: string) {
  const short = toShort(lng);
  const mod   = await loaders[short]();
  return mod.default;
}

/* ------------------------------------------------------------------ */
/* 🧠 i18next init (runs once per app boot)                            */

const defaultNS = 'common';

await i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLocale,
    defaultNS,
    debug: process.env.NODE_ENV === 'development',
    resources: {},
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initImmediate: false,
  });

/* ------------------------------------------------------------------ */
/* 🚀 Seed current language + notify React                            */

const bootLang = toShort(i18next.language);
i18next.addResources(bootLang, defaultNS, await loadBundle(bootLang));
await i18next.reloadResources([bootLang], [defaultNS]); // fires “loaded”

/* ------------------------------------------------------------------ */
/* 🌀 Hot‑swap bundles on language change                              */

i18next.on('languageChanged', async (lng) => {
  const short = toShort(lng);
  if (!i18next.hasResourceBundle(short, defaultNS)) {
    i18next.addResources(short, defaultNS, await loadBundle(short));
    await i18next.reloadResources([short], [defaultNS]);
  }
});

/* ------------------------------------------------------------------ */
/* 🏷️  Shorthand helper                                              */

export const t = (...args: Parameters<typeof i18next.t>) => i18next.t(...args);
export default i18next;

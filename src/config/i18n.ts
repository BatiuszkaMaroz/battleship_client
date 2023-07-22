import en from 'assets/locales/en.json';
import pl from 'assets/locales/pl.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'ns1';
export const resources = {
  en: {
    ns1: en,
  },
  pl: {
    ns1: pl,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: ['ns1'],
    defaultNS,
    resources,

    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

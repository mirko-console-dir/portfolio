import React, { createContext, useState, useContext } from "react";
import enTranslations from '../translations/en.json';
import itTranslations from '../translations/it.json';
import jpTranslations from '../translations/jp.json';
const translations = {
  en: enTranslations,
  it: itTranslations,
  jp: jpTranslations,
};

const LanguageContext = createContext();

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext must be used within a LanguageProvider");
  }
  return context;
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translate = (key) => {
    const keys = key.split('.');
    let translation = translations[language];
    for (const k of keys) {
      if (!translation || typeof translation !== 'object') {
        return key; // Key not found
      }
      translation = translation[k];
    }
    return String(translation) || key; // Return key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

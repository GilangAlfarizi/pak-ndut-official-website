import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("id");

  // ✅ fungsi untuk ganti bahasa dari dropdown
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // ✅ text translation
  const translations = {
    id: {
      menu: ["Beranda", "Karir", "Artikel", "Reservasi"],
      about: "Tentang Kami",
      contact: "Kontak",
    },

    en: {
      menu: ["Home", "Career", "Article", "Reservation"],
      about: "About Us",
      contact: "Contact",
    },
  };

  // ✅ list bahasa untuk dropdown
  const availableLanguages = [
    { code: "id", label: "Indonesia" },
    { code: "en", label: "English" },
  ];

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, translations, availableLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

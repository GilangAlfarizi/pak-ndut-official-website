import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("id");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  const translations = {
    id: {
      // Navbar
      menu: ["Beranda", "Karir", "Artikel", "Reservasi"],

    },

    en: {
      // Navbar
      menu: ["Home", "Career", "Article", "Reservation"],
},
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

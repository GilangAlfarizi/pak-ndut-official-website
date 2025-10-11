// src/pages/notfound/NotFound.jsx
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const NotFound = () => {
  const { language } = useLanguage();

    const translations = {
    en: {
      goHome: "Go Home",
      warning: "Oops! The page you're looking for doesn't exist.",
    },
    id: {
      goHome: "Kembali ke Beranda",
      warning: "Ups! Halaman yang Anda cari tidak ditemukan.",
    },
  };

  const t = translations[language];
  

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        {t.warning}
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-[#BA0202] text-white rounded-lg hover:bg-blue-700 transition"
      >
        {t.goHome}
      </Link>
    </div>
  );
};

export default NotFound;
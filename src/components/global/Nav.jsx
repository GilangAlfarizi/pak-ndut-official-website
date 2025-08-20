import React, { useEffect, useRef, useState } from "react";
import logo from "../../../public/images/logo.svg";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { language, toggleLanguage } = useLanguage(); // ✅ Ambil dari context

  const handleScroll = () => {
    setIsTransparent(window.scrollY <= 50);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuLabels = {
    id: ["Beranda", "Karir", "Artikel", "Reservasi"],
    en: ["Home", "Career", "Article", "Reservation"],
  };

  return (
    <nav
      className={`fixed top-0 w-full z-10 transition-all duration-400 ${
        isTransparent ? "bg-transparent" : "bg-white"
      }`}
    >
      <div
        className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
        ref={menuRef}
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-10" alt="Pakndut Logo" />
        </NavLink>

        {/* Menu + Toggle di kanan */}
        <div className="flex items-center space-x-4">
          {/* Menu */}
          <div
            className={`absolute top-16 left-0 w-full md:static md:block md:w-auto ${
              isOpen ? "block bg-black/60 text-white" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              {["/", "/career", "/article", "/reservation"].map((path, i) => {
                const label = menuLabels[language][i];
                return (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `block py-2 px-3 rounded-sm ${
                          isActive ? "font-bold" : ""
                        } ${
                          isOpen
                            ? "text-white"
                            : isTransparent
                            ? "text-white"
                            : "text-black"
                        } hover:text-[#FFCC29]`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Toggle Bahasa (custom switch) */}
          <button
            onClick={toggleLanguage}
            className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
              language === "id" ? "bg-gray-400" : "bg-[#FFCC29]"
            }`}
          >
            <span
              className={`absolute left-1 text-[10px] font-bold ${
                language === "id" ? "text-white" : "text-white/60"
              }`}
            >
              ID
            </span>
            <span
              className={`absolute right-1 text-[10px] font-bold ${
                language === "en" ? "text-white" : "text-white/60"
              }`}
            >
              EN
            </span>
            <span
              className={`absolute bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                language === "id" ? "translate-x-0 left-0.5" : "translate-x-6"
              }`}
            ></span>
          </button>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-5 h-5 transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-black"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

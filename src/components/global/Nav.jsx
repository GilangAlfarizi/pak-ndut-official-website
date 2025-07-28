import React, { useEffect, useRef, useState } from "react";
import logo from "../../../public/images/logo.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // 🔸 Ref untuk area menu

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsTransparent(false);
    } else {
      setIsTransparent(true);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    // Jika menu terbuka dan klik di luar area menu + burger
    if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside); // 🔸 Tambah listener

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside); // 🔸 Cleanup
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-10 transition-all duration-400 ${
        isTransparent ? "bg-transparent" : "bg-white"
      }`}
    >
      <div
        className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
        ref={menuRef} // 🔸 Set ref ke elemen utama menu
      >
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-10" alt="Pakndut Logo" />
        </NavLink>

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

        <div
          className={`w-full md:block md:w-auto ${
            isOpen ? "block bg-black/60 text-white" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {["/", "/career", "/article", "/reservation"].map((path, i) => {
              const label = ["Home", "Career", "Article", "Reservation"][i];
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
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import logo from "../../../public/images/logo.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsTransparent(false);
    } else {
      setIsTransparent(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-10 transition-all duration-400 ${
        isTransparent ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-10" alt="Pakndut Logo" />
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
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
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${isActive ? "font-bold" : ""} ${
                    isTransparent ? "text-white" : "text-black"
                  } hover:text-[#FFCC29]`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/career"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${isActive ? "font-bold" : ""} ${
                    isTransparent ? "text-white" : "text-black"
                  } hover:text-[#FFCC29]`
                }
              >
                Career
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/article"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${isActive ? "font-bold" : ""} ${
                    isTransparent ? "text-white" : "text-black"
                  } hover:text-[#FFCC29]`
                }
              >
                Article
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reservation"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${isActive ? "font-bold" : ""} ${
                    isTransparent ? "text-white" : "text-black"
                  } hover:text-[#FFCC29]`
                }
              >
                Reservation
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

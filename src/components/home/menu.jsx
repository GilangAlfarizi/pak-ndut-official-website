import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import "@fontsource/montserrat/700.css";
import { useLanguage } from "../../context/LanguageContext"; // tetap ambil bahasa saja

const SlidingMenu = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { language } = useLanguage(); // ambil bahasa dari context

  // Translasi langsung di sini
  const translations = {
    en: {
      title: "Our Menu",
    },
    id: {
      title: "Menu Kami",
    },
  };

  const handleClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="py-30 bg-gradient-to-b from-[#BA0202] via-[#FFCC29] to-[#BA0202] bg-[#BA0202]">
      <h2 className="text-center text-4xl text-white mb-10 font-bold">
        {translations[language].title}
      </h2>
      <Marquee pauseOnClick={isPaused} speed={90}>
        <div className="flex space-x-10" onClick={handleClick}>
          <img
            src="../../public/images/BebekAsamManis.png"
            alt="Menu Item 1"
            className="h-60 w-auto md:h-100"
          />
          <img
            src="../../public/images/BebekKremes.png"
            alt="Menu Item 2"
            className="h-60 w-auto md:h-100"
          />
          <img
            src="../../public/images/BebekLadaHitam.png"
            alt="Menu Item 3"
            className="h-60 w-auto md:h-100"
          />
          <img
            src="../../public/images/BebekOri.png"
            alt="Menu Item 4"
            className="h-60 w-auto md:h-100"
          />
          <img
            src="../../public/images/BebekRemuk.png"
            alt="Menu Item 5"
            className="h-60 w-auto md:h-100"
          />
          <img
            src="../../public/images/BebekSangan.png"
            alt="Menu Item 6"
            className="h-60 w-auto md:h-100"
          />
          <img
            src="../../public/images/BebekSerundeng.png"
            alt="Menu Item 7"
            className="h-60 w-auto md:h-100"
          />
        </div>
      </Marquee>
    </div>
  );
};

export default SlidingMenu;

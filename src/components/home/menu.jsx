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

  const menuItems = [
    {
      src: "https://ik.imagekit.io/5mtwtegkx/pak-ndut-images/BebekSangan.png?updatedAt=1756612623514",
      alt: "Menu Item 1",
    },
    {
      src: "https://ik.imagekit.io/5mtwtegkx/pak-ndut-images/BebekSerundeng.png?updatedAt=1756612623521",
      alt: "Menu Item 2",
    },
    {
      src: "https://ik.imagekit.io/5mtwtegkx/pak-ndut-images/BebekRemuk.png?updatedAt=1756612619597",
      alt: "Menu Item 3",
    },
    {
      src: "https://ik.imagekit.io/5mtwtegkx/pak-ndut-images/BebekOri.png?updatedAt=1756612615747",
      alt: "Menu Item 4",
    },
    {
      src: "https://ik.imagekit.io/5mtwtegkx/pak-ndut-images/BebekKremes.png?updatedAt=1756612613514",
      alt: "Menu Item 5",
    },
    {
      src: "https://ik.imagekit.io/5mtwtegkx/pak-ndut-images/BebekLadaHitam.png?updatedAt=1756612612028",
      alt: "Menu Item 6",
    },
    {
      src: "https://ik.imagekit.io/5mtwtegkx/pak-ndut-images/BebekAsamManis.png?updatedAt=1756612611500",
      alt: "Menu Item 7",
    },
  ];

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
          {menuItems.map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={item.alt}
              className="h-60 w-auto md:h-100"
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default SlidingMenu;

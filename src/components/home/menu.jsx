import React from 'react';
import Marquee from "react-fast-marquee";
import "@fontsource/montserrat/700.css";

const SlidingMenu = () => {
  return (
    <div className="py-30 bg-gradient-to-b from-[#BA0202] via-[#FFCC29] to-[#BA0202] bg-gray-100">
      <h2 className="text-center text-4xl text-white mb-10">Our Menu</h2>
      <Marquee>
        <div className="flex space-x-10">
          <img src="../../public/images/BebekAsamManis.png" alt="Menu Item 1" className="h-100 w-auto" />
          <img src="../../public/images/BebekKremes.png" alt="Menu Item 2" className="h-100 w-auto" />
          <img src="../../public/images/BebekLadaHitam.png" alt="Menu Item 3" className="h-100 w-auto" />
          <img src="../../public/images/BebekOri.png" alt="Menu Item 4" className="h-100 w-auto" />
          <img src="../../public/images/BebekRemuk.png" alt="Menu Item 5" className="h-100 w-auto" />
          <img src="../../public/images/BebekSangan.png" alt="Menu Item 6" className="h-100 w-auto" />
          <img src="../../public/images/BebekSerundeng.png" alt="Menu Item 7" className="h-100 w-auto" />
        </div>
      </Marquee>
    </div>
  );
};

export default SlidingMenu;

import React from "react";
import hero from "../../../public/images/hero.svg";


const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        className="absolute inset-0 object-cover w-full h-full brightness-30"
        src={hero}
        alt="Hero Image"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-2">
        <h1 className="text-6xl text-white font-black text-center">
          Classic Taste, Modern Twist.
        </h1>
        <h1 className="text-6xl text-white font-black text-center">
          Fried duck the Indonesian way.
        </h1>
        <button className="mt-4 px-10 py-4 bg-[#BA0202] text-white text-2xl font-bold rounded-[40px] hover:bg-red-600 transition duration-200">
          Whatsapp Franchise
        </button>
      </div>
    </div>
  );
};

export default Hero;
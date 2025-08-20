import React from "react";
import hero from "../../../public/images/HeroBackground.svg";
import Bebek from "../../../public/images/BebekEnak.png"; // contoh gambar tambahan
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <img
        className="absolute inset-0 object-cover w-full h-full brightness-30"
        src={hero}
        alt="Hero Image"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-2">
        {/* Gambar di atas teks */}
        <img
          src={Bebek}
          alt="Logo"
          className="w-32 md:w-48 mb-4" // atur ukuran sesuai kebutuhan
        />

        <h1 className="text-2xl md:text-6xl text-white font-black text-center">
          Classic Taste, Modern Twist
        </h1>
        <h1 className="text-2xl md:text-6xl text-white font-black text-center">
          The Indonesian Way Fried Duck
        </h1>

        <Link
          to="https://wa.me/+6281333072010"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mt-4 px-10 py-4 bg-[#BA0202] text-white text-l md:text-2xl font-semibold rounded-[40px] hover:bg-red-600 transition duration-200">
            Whatsapp Franchise
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

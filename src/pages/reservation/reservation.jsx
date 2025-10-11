import OutletCards from "../../components/global/OutletCards";
import { useEffect, useState } from "react";
import Navbar from "../../components/global/Nav";
import { useLanguage } from "../../context/LanguageContext";
import Footer from "../../components/global/Foot";

const Reservation = () => {
  const [OutletsData, SetOutletsData] = useState([]);
  const { language } = useLanguage();

  // Translasi
  const translations = {
    en: {
      bannerAlt: "Reservation Banner",
      bannerTitle: "Find Our Outlets",
      bannerSubtitle: "Easily book & contact the nearest outlet",
      noOutlet: "There are no outlets, an error may occurred",
    },
    id: {
      bannerAlt: "Banner Reservasi",
      bannerTitle: "Temukan Outlet Kami",
      bannerSubtitle: "Pesan & hubungi outlet terdekat dengan mudah",
      noOutlet: "Tidak ada outlet, mungkin terjadi kesalahan",
    },
  };

  const t = translations[language];

  useEffect(() => {
    fetch("https://pak-ndut-backend-production.up.railway.app/outlets")
      .then((res) => res.json())
      .then((json) => {
        SetOutletsData(json.data);
      })
      .catch((err) => console.error("Failed to fetch outlet data:", err));
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero / Banner */}
      <div className="relative w-full  bg-[#BA0202]">
        <img
          src="/images/ReservationBanner.jpg"
          alt={t.bannerAlt}
          className="w-full h-[300px] md:h-[400px] object-cover shadow-lg brightness-100 md:brightness-70 grayscale"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold">{t.bannerTitle}</h1>
          <p className="mt-3 text-lg">{t.bannerSubtitle}</p>
        </div>
      </div>

      {/* Outlet Cards */}
      {OutletsData.length > 0 ? (
        <div className="grid gap-8 bg-[#BA0202] p-4 py-10 xl:py-10 xl:px-40 justify-center grid-cols-1 md:grid-cols-2">
          <OutletCards items={OutletsData} />
        </div>
      ) : (
        <div className="h-80 items-center justify-center flex">
          <p className="text-center">{t.noOutlet}</p>
        </div>
      )}
    <Footer />
    </div>
  );
};

export default Reservation;

import { useEffect, useState } from "react";
import AccordionOutlet from "../global/AccordionOutlet";
import GIF from "../../../public/images/Pak_Ndut_Lokasi_Cabang_Outlet[1].gif";
import { useLanguage } from "../../context/LanguageContext"; // ambil bahasa

const Outlets = () => {
  const [accordionData, setAccordionData] = useState([]);
  const [outletCount, setOutletCount] = useState(0);
  const { language } = useLanguage(); // ambil pilihan bahasa

  // Translasi langsung di sini
  const translations = {
    en: {
      title: "Our Outlets",
      outletLabel: "Outlets",
      cityLabel: "Cities",
    },
    id: {
      title: "Outlet Kami",
      outletLabel: "Outlet",
      cityLabel: "Kota",
    },
  };

  useEffect(() => {
    fetch("/data/outlets.json")
      .then((res) => res.json())
      .then((rawData) => {
        const groupedData = [];

        rawData.data.forEach((item) => {
          const existingProvince = groupedData.find(
            (entry) => entry.province === item.province
          );

          const outlet = {
            id: item.id,
            name: item.name,
            address: item.address,
            province: item.province,
            open_hours: item.open_hours,
            map_url: item.map_url,
            phone: item.phone,
          };

          if (existingProvince) {
            existingProvince.outlets.push(outlet);
          } else {
            groupedData.push({
              id: groupedData.length + 1,
              province: item.province,
              outlets: [outlet],
            });
          }
        });

        setAccordionData(groupedData);
        setOutletCount(rawData.data.length); 
      })
      .catch((err) => console.error("Failed to fetch outlet data:", err));
  }, []);

  return (
    <div className="bg-[#BA0202] p-4 md:p-12 2xl:p-20 2xl:px-83 xl:px-32 lg:px-28 w-[100v]">
      <div className="bg-white rounded-4xl py-8">
        <div className="p-4 xl:p-20 ">
          <h2 className="text-4xl font-black text-center text-[#BA0202]">
            {translations[language].title}
          </h2>
          <img src={GIF} alt="GIF" className="rounded-4xl mt-8" />
        </div>
        <div className="flex bg-[#FFCC29] h-40 xl:h-60 p-8 justify-center">
          <div className="w-240 flex">
            <div className="flex w-full h-full justify-center items-center">
              <div className="text-center text-[#BA0202]">
                <h4 className="text-6xl xl:text-8xl font-bold">{outletCount}</h4>
                <p className="font-bold">{translations[language].outletLabel}</p>
              </div>
            </div>
            <div className="flex w-full h-full justify-center items-center">
              <div className="text-center text-[#BA0202]">
                <h4 className="text-6xl xl:text-8xl font-bold">12</h4>
                <p className="font-bold">{translations[language].cityLabel}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 xl:p-20">
          <AccordionOutlet items={accordionData} />
        </div>
      </div>
    </div>
  );
};

export default Outlets;

import { useLanguage } from "../../context/LanguageContext"; // ambil bahasa
import GIF from "../../../public/images/KriteriaLokasi.gif";

const Criteria = () => {
  const { language } = useLanguage(); // ambil pilihan bahasa

  // Translasi langsung di sini
  const translations = {
    en: {
      title: "Location Criteria",
      p1: `The franchise partnership for Bebek & Ayam Goreng Pak Ndut lasts for 5 years 
           and can be extended. This partnership operates under a royalty fee system, 
           and during the 5-year period, our team will assist the investor with operations. 
           The royalty fee is 5% of the sales of raw materials (duck and chicken) and/or 
           seasonings supplied from the central office.`,
      p2: `During the Grand Opening, the central office will also provide support in the 
           form of raw materials (duck & chicken). In addition, we will provide the assistance 
           of expert staff before and after the Grand Opening, within a period specified by us. 
           The attached Franchise Package does not include exhaust system, gas installation, 
           stainless equipment, and furniture set.`,
    },
    id: {
      title: "Kriteria Lokasi",
      p1: `Kemitraan waralaba Bebek & Ayam Goreng Pak Ndut berlangsung selama 5 tahun 
           dan dapat diperpanjang. Kemitraan ini dijalankan dengan sistem biaya royalti, 
           dan selama periode 5 tahun tim kami akan membantu investor dalam operasional. 
           Biaya royalti sebesar 5% dari penjualan bahan baku (bebek dan ayam) dan/atau 
           bumbu yang dipasok dari kantor pusat.`,
      p2: `Pada saat Grand Opening, kantor pusat juga akan memberikan dukungan berupa 
           bahan baku (bebek & ayam). Selain itu, kami juga akan menyediakan bantuan staf ahli 
           sebelum dan sesudah Grand Opening dalam jangka waktu yang telah ditentukan. 
           Paket Franchise yang terlampir tidak termasuk sistem exhaust, instalasi gas, 
           peralatan stainless, dan set furniture.`,
    },
  };

  return (
    <div className="flex bg-[#BA0202] justify-center">
      <div className="flex lg:w-[40vw] justify-center p-4 md:p-12">
        <div className="gap-8">
          {/* Title */}
          <div className="flex justify-center">
            <h2 className="text-4xl font-black text-center text-[#FFCC29]">
              {translations[language].title}
            </h2>
          </div>

          {/* GIF */}
          <div className="my-8">
            <img src={GIF} alt="GIF" className="rounded-4xl" />
          </div>

          {/* Content */}
          <div className="text-white space-y-4">
            <p>{translations[language].p1}</p>
            <p>{translations[language].p2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Criteria;

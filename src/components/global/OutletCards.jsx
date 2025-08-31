import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // import framer motion
import { useLanguage } from "../../context/LanguageContext"; // ambil bahasa

const OutletCards = ({ items }) => {
  const { language } = useLanguage(); // akses bahasa

  // translasi
  const translations = {
    en: {
      noImage: "No image available",
      contact: "Contact Us",
    },
    id: {
      noImage: "Gambar tidak tersedia",
      contact: "Hubungi Kami",
    },
  };

  return (
    <>
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 40 }} // mulai transparan & turun
          animate={{ opacity: 1, y: 0 }} // animasi muncul
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.03 }} // efek hover smooth
          className="bg-white shadow-md rounded-4xl hover:shadow-2xl hover:border-gray-200 transition duration-300 2xl:flex"
        >
          {item.image ? (
         
              <img
                src={item.image}
                alt={item.name}
                className="flex w-full 2xl:h-100 aspect-video 2xl:aspect-[20/19] bg-gray-100 rounded-4xl items-center justify-center object-cover"
              />
     
          ) : (
            <div className="flex w-full 2xl:h-100 aspect-video 2xl:aspect-[20/19] bg-gray-100 rounded-4xl items-center justify-center">
              {translations[language].noImage}
            </div>
          )}

          <div className="p-5 items-center flex w-full">
            <div className="w-full">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>{item.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 w-100%">
                <Link
                  to={`https://wa.me/${item.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <button className="text-white bg-[#BA0202] hover:bg-red-600 transition duration-300 mt-4 py-2 px-10 rounded-full font-semibold w-full 2xl:w-auto">
                    {translations[language].contact}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default OutletCards;

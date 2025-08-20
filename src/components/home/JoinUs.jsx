import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext"; // ambil bahasa

const JoinUs = () => {
  const { language } = useLanguage(); // ambil pilihan bahasa

  // Translasi langsung di sini
  const translations = {
    en: {
      title: "Join Our Family.",
      description: "Fill in our form and join Bebek Pak Ndut's Family.",
      button: "Apply or Inquire",
    },
    id: {
      title: "Bergabunglah dengan Keluarga Kami.",
      description: "Isi formulir kami dan bergabunglah dengan Keluarga Bebek Pak Ndut.",
      button: "Daftar atau Tanyakan",
    },
  };

  return (
    <div className="flex justify-center h-180 items-center">
      <div className="grid gap-4 text-center">
        <div>
          <h2 className="text-4xl font-black text-center text-[#BA0202]">
            {translations[language].title}
          </h2>
        </div>
        <div>
          <p>{translations[language].description}</p>
        </div>
        <div>
          <Link
            to="https://wa.me/+6282265687777"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="mt-4 px-10 py-4 bg-[#BA0202] text-white text-2xl font-semibold rounded-[40px] hover:bg-red-600 transition duration-200">
              {translations[language].button}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;

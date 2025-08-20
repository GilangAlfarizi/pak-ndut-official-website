import Logo from "../../../public/images/logo.svg";
import { useLanguage } from "../../context/LanguageContext"; // ambil bahasa

const Footer = () => {
  const { language } = useLanguage(); // ambil pilihan bahasa

  // Translasi langsung di sini
  const translations = {
    en: {
      about: "About",
      opportunities: "Opportunities",
      profile: "Our Profile",
      visionMission: "Vision & Mission",
      article: "Article",
      franchise: "Franchise",
      careers: "Careers",
      join: "Join Us",
    },
    id: {
      about: "Tentang Kami",
      opportunities: "Peluang",
      profile: "Profil Kami",
      visionMission: "Visi & Misi",
      article: "Artikel",
      franchise: "Franchise",
      careers: "Karier",
      join: "Bergabung",
    },
  };

  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="gap-8 px-4 py-6 lg:py-8 justify-between lg:flex">
          <div className="place-content-center py-8">
            <div className="flex justify-center">
              <img src={Logo} alt="Logo" />
            </div>
          </div>
          <div className="grid gap-8 grid-cols-2 text-center lg:text-left">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                {translations[language].about}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a href="#" className="hover:underline">
                    {translations[language].profile}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {translations[language].visionMission}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {translations[language].article}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                {translations[language].opportunities}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a href="#" className="hover:underline">
                    {translations[language].franchise}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {translations[language].careers}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {translations[language].join}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

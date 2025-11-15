import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext"; // ambil bahasa

const ArticleCard = () => {
  const [latestArticle, setLatestArticle] = useState(null);
  const navigate = useNavigate();
  const { language } = useLanguage(); // ambil pilihan bahasa

  // Translasi langsung
  const translations = {
    en: {
      loading: "Loading...",
      readPost: "Read Post",
      noImage: "No image available",
    },
    id: {
      loading: "Memuat...",
      readPost: "Baca Selengkapnya",
      noImage: "Gambar tidak tersedia",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
        const data = await res.json();
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          setLatestArticle(data.data[0]); // Ambil artikel paling atas
        }
      } catch (err) {
        console.error("Failed to fetch article data:", err);
      }
    };

    fetchData();
  }, []);

  if (!latestArticle)
    return (
      <div className="text-center py-10 text-white">
        {/* {translations[language].loading} */}
      </div>
    );

  return (
    <div className="bg-[#BA0202] p-6 md:p-20 w-full h-full flex flex-col-reverse md:flex-row xl:px-60">
      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-center items-start">
        <h2 className="text-white text-2xl font-bold">{latestArticle.title}</h2>
        <p className="text-white mt-2">
          {" "}
          <div dangerouslySetInnerHTML={{ __html: latestArticle.content }} />
        </p>
        <p className="text-white mt-4">{latestArticle.date}</p>
        <button
          className="bg-white text-[#BA0202] hover:bg-gray-200 transition duration-300 mt-4 py-2 px-10 rounded-full font-semibold"
          onClick={() => navigate(`/article/${latestArticle.id}`)}
        >
          {translations[language].readPost}
        </button>
      </div>

      {/* Image Section */}
      <div className="flex-1">
        {latestArticle.image ? (
          <img
            src={latestArticle.image}
            alt="Article Illustration"
            className="bg-white w-full h-auto md:h-80 md:w-135 object-cover rounded-2xl md:rounded-3x mt-15 md:mt-0 shadow-2xl shadow-red-950 mb-5 md:mb-0"
          />
        ) : (
          <div className="w-92 h-55 md:h-80 md:w-135 bg-gray-200 flex items-center justify-center rounded-2xl mt-15 md:mt-0 shadow-2xl shadow-red-950 mb-5 md:mb-0">
            <p className="text-gray-600 text-base sm:text-lg md:text-xl font-semibold text-center px-4">
              {translations[language].noImage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;

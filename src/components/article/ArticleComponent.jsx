import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../../context/LanguageContext"; // ambil bahasa

const getShortContent = (text) => {
  return text.length > 85 ? text.substring(0, 85) + "..." : text;
};

const ArticleComponent = () => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();
  const { language } = useLanguage(); // ambil pilihan bahasa

  // Translasi
  const translations = {
    en: {
      title: "Latest Articles",
      readMore: "Read more",
      loadMore: "Load More",
      noImage: "No image available",
    },
    id: {
      title: "Artikel Terbaru",
      readMore: "Baca selengkapnya",
      loadMore: "Muat Lebih Banyak",
      noImage: "Gambar tidak tersedia",
    },
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
        const data = await response.json();
        setArticles(data.data);
      } catch (error) {
        console.error("Failed to load articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleClick = (id) => {
    navigate(`/article/${id}`);
  };

  return articles.length === 0 ? (
    <div className="px-6 py-10 max-w-7xl mx-auto text-center text-gray-500">
      No articles has been published yet
    </div>
  ) : (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">{translations[language].title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.slice(0, visibleCount).map((article) => (
          <div
            key={article.id}
            className="flex flex-col group cursor-pointer"
            onClick={() => handleClick(article.id)}
          >
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md hover:shadow-xl transition-all duration-300"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md hover:shadow-xl">
                {translations[language].noImage}
              </div>
            )}
            <h2 className="mt-4 font-semibold text-black transition-colors duration-300 group-hover:text-[#FFCC29]">
              {article.title}
            </h2>
            <p className="text-sm text-gray-600">{article.date}</p>
            <p className="text-sm text-gray-700 mt-2">
              {getShortContent(article.content)}
            </p>
            <p className="text-sm text-[#FFCC29] mt-1 font-medium flex items-center gap-1 transition-all duration-300">
              {translations[language].readMore}
              <span className="transition-transform duration-300 group-hover:translate-x-1">›</span>
            </p>
          </div>
        ))}
      </div>

      {visibleCount < articles.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-[#FFCC29] text-white font-normal px-6 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300"
          >
            {translations[language].loadMore}
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleComponent;

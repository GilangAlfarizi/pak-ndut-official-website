import React, { useEffect, useState } from 'react';

const ArticleCard = () => {
  const [latestArticle, setLatestArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/articles.json');
        const data = await res.json();
        if (data && data.length > 0) {
          setLatestArticle(data[0]); // Ambil artikel paling atas
        }
      } catch (err) {
        console.error("Failed to fetch article data:", err);
      }
    };

    fetchData();
  }, []);

  if (!latestArticle) return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <div className="bg-[#BA0202] p-6 md:p-20 w-full h-full flex flex-col-reverse md:flex-row items-center">
      <div className="flex-1 mt-4 md:mt-0 flex flex-col justify-center items-start ml-0 md:ml-64 mr-0 md:mr-7">
        <h2 className="text-white text-2xl font-bold">{latestArticle.title}</h2>
        <p className="text-white mt-2">{latestArticle.content}</p>
        <p className="text-white mt-4">{latestArticle.date}</p>
        <button className="bg-white text-[#BA0202] hover:bg-gray-200 transition duration-300 mt-4 py-2 px-10 rounded-full font-semibold">
          Read Post
        </button>
      </div>
      <div className="flex-1 mr-1 md:mr-25">
        <img 
          src="/images/hero.svg" 
          alt="Article Illustration"
          className="bg-white w-full h-auto md:h-80 md:w-135 object-cover rounded-2xl md:rounded-3x mt-15 md:mt-0 shadow-2xl shadow-red-950 mb-5 md:mb-0"
        />
      </div>
    </div>
  );
};

export default ArticleCard;

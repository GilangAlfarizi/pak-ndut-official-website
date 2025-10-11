import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch('https://pak-ndut-backend-production.up.railway.app/articles');
        const data = await res.json();
        const found = data.data.find((item) => item.id === parseInt(id));
        setArticle(found);
      } catch (err) {
        console.error('Failed to fetch article:', err);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 mt-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Bisa juga diganti ke: () => navigate('/article')
        className="text-sm text-[#BA0202] hover:underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{article.date}</p>

      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg mb-8">
          No image available
        </div>
      )}

      <div className="space-y-6 text-justify text-gray-800 leading-relaxed">
        <p>{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleDetail;

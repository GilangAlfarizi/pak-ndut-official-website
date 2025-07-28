import React from 'react';

const articles = [
  { title: "Article One", date: "July 27, 2025" },
  { title: "Article Two", date: "July 26, 2025" },
  { title: "Article Three", date: "July 25, 2025" },
  { title: "Article Four", date: "July 24, 2025" },
  { title: "Article Five", date: "July 23, 2025" },
  { title: "Article Six", date: "July 22, 2025" },
];

const ArticleComponent = () => {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Latest Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div key={index} className="flex flex-col">
            <div className="w-full h-40 bg-gray-200 rounded-md"></div>
            <h2 className="mt-4 font-semibold text-black">{article.title}</h2>
            <p className="text-sm text-gray-600">{article.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleComponent;

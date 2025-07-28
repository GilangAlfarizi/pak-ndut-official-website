import React, { useState } from 'react';

const articles = [
  {
    title: "Article One",
    date: "July 27, 2025",
    content:
      "This is the content preview of Article One. It gives a brief idea of what the full article is about. The text is just a placeholder to show layout.",
  },
  {
    title: "Article Two",
    date: "July 26, 2025",
    content:
      "Article Two discusses key aspects of user experience in modern web applications. It highlights the importance of intuitive design.",
  },
  {
    title: "Article Three",
    date: "July 25, 2025",
    content:
      "In this article, we explore how AI is changing the way we interact with digital tools.",
  },
  {
    title: "Article Four",
    date: "July 24, 2025",
    content:
      "This article focuses on tips for optimizing React performance in large-scale applications.",
  },
  {
    title: "Article Five",
    date: "July 23, 2025",
    content:
      "Learn the basics of Tailwind CSS and how utility-first design can speed up development Learn the basics of Tailwind CSS and how utility-first design can speed up development.",
  },
  {
    title: "Article Six",
    date: "July 22, 2025",
    content:
      "A beginner-friendly guide to understanding state management in React using hooks A beginner-friendly guide to understanding state management in React using hooks.",
  },
  {
    title: "Article Seven",
    date: "July 21, 2025",
    content: "This article explores the latest trends in mobile-first design.",
  },
  {
    title: "Article Eight",
    date: "July 20, 2025",
    content: "How to implement dark mode using Tailwind and React hooks.",
  },
  {
    title: "Article Nine",
    date: "July 19, 2025",
    content: "Understanding responsive grid systems with Tailwind CSS.",
  },
  {
    title: "Article Ten",
    date: "July 18, 2025",
    content: "Integrating external APIs in React projects effectively.",
  },
  {
    title: "Article Eleven",
    date: "July 17, 2025",
    content: "A case study on improving web accessibility in apps.",
  },
  {
    title: "Article Twelve",
    date: "July 16, 2025",
    content: "Optimizing images and assets for faster web loading times.",
  },
   {
    title: "Article Seven",
    date: "July 21, 2025",
    content: "This article explores the latest trends in mobile-first design.",
  },
  {
    title: "Article Eight",
    date: "July 20, 2025",
    content: "How to implement dark mode using Tailwind and React hooks.",
  },
  {
    title: "Article Nine",
    date: "July 19, 2025",
    content: "Understanding responsive grid systems with Tailwind CSS.",
  },
  {
    title: "Article Ten",
    date: "July 18, 2025",
    content: "Integrating external APIs in React projects effectively.",
  },
  {
    title: "Article Eleven",
    date: "July 17, 2025",
    content: "A case study on improving web accessibility in apps.",
  },
  {
    title: "Article Twelve",
    date: "July 16, 2025",
    content: "Optimizing images and assets for faster web loading times.",
  },
];

const getShortContent = (text) => {
  return text.length > 85 ? text.substring(0, 85) + "..." : text;
};

const ArticleComponent = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Latest Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.slice(0, visibleCount).map((article, index) => (
          <div key={index} className="flex flex-col group cursor-pointer">
            <div className="w-full h-50 bg-gray-200 rounded-md hover:shadow-xl"></div>
            <h2 className="mt-4 font-semibold text-black transition-colors duration-300 group-hover:text-[#FFCC29]">
              {article.title}
            </h2>
            <p className="text-sm text-gray-600">{article.date}</p>
            <p className="text-sm text-gray-700 mt-2">
              {getShortContent(article.content)}
            </p>
            <p className="text-sm text-[#FFCC29] mt-1 font-medium flex items-center gap-1 transition-all duration-300">
              Read more
              <span className="transition-transform duration-300 group-hover:translate-x-1">›</span>
            </p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < articles.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-[#FFCC29] text-white font-normal px-6 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleComponent;

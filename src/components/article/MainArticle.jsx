import React from 'react';

const ArticleCard = () => {
  return (
    <div className="bg-[#BA0202] p-6 md:p-20 w-full h-full flex flex-col-reverse md:flex-row items-center">
      <div className="flex-1 mt-4 md:mt-0 flex flex-col justify-center items-start ml-0 md:ml-60 mr-0 md:mr-10">
        <h2 className="text-white text-2xl font-bold">Article title</h2>
        <p className="text-white mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-white mt-4">9 July 2025</p>
        <button className="bg-white text-[#BA0202] hover:bg-gray-200 transition duration-200 mt-4 py-2 px-10 rounded-full font-semibold">
          Read Post
        </button>
      </div>
      <div className="flex-1">
        <img 
          src="../../../public/images/hero.svg" 
          alt="Article Illustration"
          className="bg-white w-full h-auto md:h-80 md:w-135 object-cover rounded-3xl mt-15 md:mt-0 shadow-2xl shadow-red-950 mb-5 md:mb-0"
        />
      </div>
    </div>
  );
};

export default ArticleCard;

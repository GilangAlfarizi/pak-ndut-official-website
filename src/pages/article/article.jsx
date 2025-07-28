import React from "react";
import Navbar from "../../components/global/Nav";
import ArticleCard from "../../components/article/MainArticle";
import ArticleComponent from "../../components/article/ArticleComponent";

const Article = () => {
    return (
    <>
     <div>
        <Navbar />
        <ArticleCard />
        <ArticleComponent />
      </div>
    </>
  );
};

export default Article;
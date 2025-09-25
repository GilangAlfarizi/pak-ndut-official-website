import React from "react";
import Navbar from "../../components/global/Nav";
import ArticleCard from "../../components/article/MainArticle";
import ArticleComponent from "../../components/article/ArticleComponent";
import Footer from "../../components/global/Foot";

const Article = () => {
  return (
    <>
      <div>
        <Navbar />
        <ArticleCard />
        <ArticleComponent />
        <Footer />
      </div>
    </>
  );
};

export default Article;

import React from "react";
import Navbar from "../../components/global/Nav";
import ArticleDetail from "../../components/article/ArticleDetail";
import Footer from "../../components/global/Foot";

const ArticleDetails = () => {
    return (
    <>
     <div>
        <Navbar />
        <ArticleDetail />
        <Footer />
      </div>
    </>
  );
};

export default ArticleDetails;
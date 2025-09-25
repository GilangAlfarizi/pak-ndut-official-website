import React from "react";
import Navbar from "../../components/global/Nav";
import JobList from "../../components/career/JobList";
import Footer from "../../components/global/Foot";

const Career = () => {
  return (
    <>
      <div>
        <Navbar />
        <JobList />
        <Footer />
      </div>
    </>
  );
};

export default Career;

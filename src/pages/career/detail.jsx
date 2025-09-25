import React from "react";
import Navbar from "../../components/global/Nav";
import JobDetail from "../../components/career/JobDetail";
import Footer from "../../components/global/Foot";

const CareerDetail = () => {
  return (
    <>
      <div>
        <Navbar />
        <JobDetail />
        <Footer />
      </div>
    </>
  );
};

export default CareerDetail;

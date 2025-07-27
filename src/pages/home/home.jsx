import React from "react";
import Navbar from "../../components/global/Nav";
import About from "../../components/home/AboutUs";
import Hero from "../../components/home/hero";
const LandingPage = () => {
  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <p>Hello Pak Ndut anjay</p>
        <About />
      </div>
    </>
  );
};

export default LandingPage;

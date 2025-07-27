import React from "react";
import Navbar from "../../components/global/Nav";
import About from "../../components/home/AboutUs";
import Hero from "../../components/home/hero";
import SlidingMenu from "../../components/home/menu";
const LandingPage = () => {
  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <About />
        <SlidingMenu />
      </div>
    </>
  );
};

export default LandingPage;

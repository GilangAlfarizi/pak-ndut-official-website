import React from "react";
import Navbar from "../../components/global/Nav";
import About from "../../components/home/AboutUs";
import Hero from "../../components/home/hero";
import SlidingMenu from "../../components/home/menu";
import Outlets from "../../components/home/Outlets";
import Criteria from "../../components/home/Criteria";
import JoinUs from "../../components/home/JoinUs";
const LandingPage = () => {
  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <About />
        <SlidingMenu />
        <Outlets />
        <Criteria />
        <JoinUs />
      </div>
    </>
  );
};

export default LandingPage;

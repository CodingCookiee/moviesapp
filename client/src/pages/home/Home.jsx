import React, { useState } from "react";
import Featured from "../../components/Featured/Featured";
import Hero from "../../components/Hero/Hero";


const Home = () => {
  return (
    <div className="home min-h-screen">
      <Hero />
      <Featured />
    </div>
  );
};

export default Home;

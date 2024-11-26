import React, { useState } from "react";
import Hero from "../../components/hero/Hero";
import Featured from "../../components/Featured/Featured";

const Home = () => { 
  
  return (
    <div className="home min-h-screen">
      <Hero />
      <Featured />
    </div>
  );
};

export default Home;

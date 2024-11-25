// src/pages/Home.js
import React from "react";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/trustedBy";
import Slide from "../../components/slides/Slides";
import { cards, projects } from "../../data.js";
import CatCard from "../../components/cateogryCard/categoryCard";
import Features from "../../components/features/Features";
import ProjectCard from "../../components/projectCard/ProjectCardTemp.jsx";

const Home = () => {
  return (
    <div className="home">
      <Featured />
    </div>
  );
};

export default Home;

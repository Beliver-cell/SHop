import React from "react";
import Hero from "../components/Hero";
import Latescollection from "../components/Latescollection";
import Bestseller from "../components/Bestseller";
import Policy from "../components/Policy";
import NewsLetter from "../components/NewsLetter";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div>
      <Hero />
      <Latescollection />
      <Bestseller />
      <Policy />
      <NewsLetter />
    </div>
  );
};

export default Home;

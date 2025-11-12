import React from "react";
import Hero from "../components/Hero";
import SpecialOffer from "../components/SpecialOffer";
import ProductsSection from "../components/ProductsSection";

const HomePage = () => (
  <main className="bg-[#fefcf8]">
    <Hero />
    <SpecialOffer />
    <ProductsSection />
  </main>
);

export default HomePage;

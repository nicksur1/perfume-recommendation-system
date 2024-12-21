import React from "react";
import Header from "./components/Header";
import PerfumeList from "./components/PerfumeList";
import Recommendations from "./components/Recommendations";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Perfume List */}
      <section id="perfume-list">
        <h2>All Perfumes</h2>
        <PerfumeList />
      </section>

      {/* Recommendations */}
      <section id="recommendation-form">
        <h2>Find Your Perfect Perfume</h2>
        <Recommendations />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

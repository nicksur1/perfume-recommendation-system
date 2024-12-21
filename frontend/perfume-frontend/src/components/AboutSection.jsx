import React from "react";
import "./styles/AboutSection.css";

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <h2>About the Perfume Recommendation System</h2>
        <p>
          Our Perfume Recommendation System helps you find the perfect fragrance
          based on your preferences. Whether you're looking for a sweet floral
          scent for a special occasion or a woody niche fragrance for daily
          wear, we've got you covered.
        </p>
        <p>
          Simply enter your preferences, and we'll recommend the best options
          from our carefully curated database of perfumes.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;

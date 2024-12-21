import React from "react";
import "./styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Perfume Recommendation System</h1>
      <nav>
        <ul>
          <li><a href="#top-perfumes">Top Perfumes</a></li>
          <li><a href="#recommendation-form">Find Your Perfume</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

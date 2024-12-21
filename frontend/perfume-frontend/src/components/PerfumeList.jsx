import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/PerfumeList.css"; // Add your CSS file for styling

const PerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perfumesPerPage = 8; // Number of perfumes to display per page

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/perfumes");
        setPerfumes(response.data);
      } catch (error) {
        console.error("Error fetching perfumes:", error.message);
      }
    };

    fetchPerfumes();
  }, []);

  // Pagination logic
  const indexOfLastPerfume = currentPage * perfumesPerPage;
  const indexOfFirstPerfume = indexOfLastPerfume - perfumesPerPage;
  const currentPerfumes = perfumes.slice(indexOfFirstPerfume, indexOfLastPerfume);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="perfume-list">
      <h2>All Perfumes</h2>
      <div className="perfume-grid">
        {currentPerfumes.map((perfume) => (
          <div key={perfume.id} className="perfume-card">
            <img
              src={`https://via.placeholder.com/150?text=${perfume.name}`}
              alt={perfume.name}
              className="perfume-image"
            />
            <h3>{perfume.name}</h3>
            <p>Brand: {perfume.brand}</p>
            <p>Price: ${perfume.price}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(Math.ceil(perfumes.length / perfumesPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? "active" : ""}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerfumeList;

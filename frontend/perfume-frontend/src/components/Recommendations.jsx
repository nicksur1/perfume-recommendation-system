import React, { useState } from "react";
import axios from "axios";

const Recommendations = () => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    notes: "",
    scentProfile: "",
    longevity: "",
    sillage: "",
    genderPreference: "",
    occasion: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/recommendations", {
        params: filters,
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Find Your Perfect Perfume</h1>
      <div>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes (e.g., woody, floral)"
          value={filters.notes}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="scentProfile"
          placeholder="Scent Profile"
          value={filters.scentProfile}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="longevity"
          placeholder="Longevity (e.g., 8 hours)"
          value={filters.longevity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="sillage"
          placeholder="Sillage (e.g., strong, moderate)"
          value={filters.sillage}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="genderPreference"
          placeholder="Gender Preference (e.g., male, female, unisex)"
          value={filters.genderPreference}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="occasion"
          placeholder="Occasion (e.g., formal, casual)"
          value={filters.occasion}
          onChange={handleInputChange}
        />
        <button onClick={fetchRecommendations}>Get Recommendations</button>
      </div>
      <div>
        {loading ? (
          <p>Loading recommendations...</p>
        ) : (
          <ul>
            {recommendations.map((perfume) => (
              <li key={perfume.id}>
                <h3>{perfume.name}</h3>
                <p>Brand: {perfume.brand}</p>
                <p>Price: ${perfume.price}</p>
                <p>Notes: {perfume.notes}</p>
                <p>Scent Profile: {perfume.scent_profile}</p>
                <p>Longevity: {perfume.longevity}</p>
                <p>Sillage: {perfume.sillage}</p>
                <p>Gender Preference: {perfume.gender_preference}</p>
                <p>Occasion: {perfume.occasion}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recommendations;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PerfumeList() {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/perfumes')
      .then(response => {
        setPerfumes(response.data);
      })
      .catch(error => {
        console.error('Error fetching perfumes:', error);
      });
  }, []);

  return (
    <div>
      <h2>Perfume List</h2>
      <ul>
        {perfumes.map(perfume => (
          <li key={perfume.id}>
            {perfume.name} by {perfume.brand} - ${perfume.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PerfumeList;

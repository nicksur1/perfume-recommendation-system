const express = require("express");
const router = express.Router();
const pool = require("../db");

// Recommendation endpoint
router.get("/", async (req, res) => {
  try {
    // Extract query parameters from the request
    const {
      minPrice,
      maxPrice,
      notes,
      scentProfile,
      longevity,
      sillage,
      genderPreference,
      occasion,
    } = req.query;

    // Build the SQL query dynamically based on provided filters
    let query = "SELECT * FROM perfumes WHERE 1=1";
    let values = [];

    if (minPrice) {
      query += " AND price >= $1";
      values.push(minPrice);
    }

    if (maxPrice) {
      query += ` AND price <= $${values.length + 1}`;
      values.push(maxPrice);
    }

    if (notes) {
      query += ` AND notes ILIKE $${values.length + 1}`;
      values.push(`%${notes}%`);
    }

    if (scentProfile) {
      query += ` AND scent_profile ILIKE $${values.length + 1}`;
      values.push(`%${scentProfile}%`);
    }

    if (longevity) {
      query += ` AND longevity ILIKE $${values.length + 1}`;
      values.push(`%${longevity}%`);
    }

    if (sillage) {
      query += ` AND sillage ILIKE $${values.length + 1}`;
      values.push(`%${sillage}%`);
    }

    if (genderPreference) {
      query += ` AND gender_preference ILIKE $${values.length + 1}`;
      values.push(`%${genderPreference}%`);
    }

    if (occasion) {
      query += ` AND occasion ILIKE $${values.length + 1}`;
      values.push(`%${occasion}%`);
    }

    // Execute the query
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    res.status(500).json({
      message: "Failed to fetch recommendations",
      error: error.message,
    });
  }
});

module.exports = router;

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

    // Initialize query and values
    let query = "SELECT * FROM perfumes WHERE 1=1";
    const values = [];

    // Helper function to add conditions dynamically
    const addCondition = (column, operator, value) => {
      query += ` AND ${column} ${operator} $${values.length + 1}`;
      values.push(value);
    };

    // Add conditions based on provided filters
    if (minPrice) addCondition("price", ">=", minPrice);
    if (maxPrice) addCondition("price", "<=", maxPrice);
    if (notes) addCondition("notes", "ILIKE", `%${notes}%`);
    if (scentProfile) addCondition("scent_profile", "ILIKE", `%${scentProfile}%`);
    if (longevity) addCondition("longevity", "ILIKE", `%${longevity}%`);
    if (sillage) addCondition("sillage", "ILIKE", `%${sillage}%`);
    if (genderPreference) addCondition("gender_preference", "ILIKE", `%${genderPreference}%`);
    if (occasion) addCondition("occasion", "ILIKE", `%${occasion}%`);

    // Execute the query
    console.log("Generated Query:", query, "Values:", values); // For debugging
    const result = await pool.query(query, values);

    // Send the response
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

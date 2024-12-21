const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection pool

/**
 * GET /perfumes
 * Fetch all perfumes from the database.
 */
router.get("/", async (req, res) => {
  try {
    console.log("Fetching perfumes from the database...");
    const result = await pool.query("SELECT * FROM perfumes");
    console.log("Query successful. Rows fetched:", result.rows.length);
    res.json(result.rows); // Send the perfumes as JSON
  } catch (err) {
    console.error("Error fetching perfumes:", err.message);
    res.status(500).json({ error: "Failed to fetch perfumes" });
  }
});

/**
 * POST /perfumes
 * Add a new perfume to the database.
 */
router.post("/", async (req, res) => {
  const { name, brand, price, longevity, sillage, gender_preference, occasion } = req.body;

  try {
    console.log("Inserting a new perfume into the database...");
    const result = await pool.query(
      "INSERT INTO perfumes (name, brand, price, longevity, sillage, gender_preference, occasion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, brand, price, longevity, sillage, gender_preference, occasion]
    );
    console.log("New perfume inserted successfully:", result.rows[0]);
    res.status(201).json(result.rows[0]); // Send the created perfume as JSON
  } catch (err) {
    console.error("Error adding perfume:", err.message);
    res.status(500).json({ error: "Failed to add perfume" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Get all perfumes
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM perfumes");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching perfumes:", err.message); // Log error details
        res.status(500).send("Internal Server Error");
    }
});

// Add a new perfume
router.post("/", async (req, res) => {
    const { name, brand, price, longevity, sillage, gender_preference, occasion } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO perfumes (name, brand, price, longevity, sillage, gender_preference, occasion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, brand, price, longevity, sillage, gender_preference, occasion]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;

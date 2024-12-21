const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const perfumesRoutes = require(path.join(__dirname, "routes", "perfumes"));
const recommendationsRoutes = require("./routes/recommendations");
const pool = require("./db"); // Adjust path if db.js is in a different folder

dotenv.config(); // Load environment variables

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Perfume API",
        version: "1.0.0",
        endpoints: {
            perfumes: "/perfumes",
            testDB: "/test-db",
        },
    });
});

// Connect to routes after app is defined
app.use("/perfumes", perfumesRoutes);
app.use("/recommendations", recommendationsRoutes);

// Test Database Connection
app.get("/test-db", async (req, res) => {
    console.log("Received request to /test-db");
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Database query result:", result);
        res.json({
            message: "Database connected successfully!",
            serverTime: result.rows[0].now,
        });
    } catch (error) {
        console.error("Error in /test-db route:", error); // Log detailed error
        res.status(500).json({
            message: "Failed to connect to the database",
            error: error.message,
        });
    }
});

console.log("DATABASE_URLSERVERJS:", process.env.DATABASE_URL);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
console.log("Current directory:", __dirname);
console.log("Perfumes routes loaded successfully.");

// Import required modules
const { Pool } = require("pg"); // PostgreSQL client for connecting to and querying the database
const fs = require("fs"); // File system module for reading files
const csvParser = require("csv-parser"); // Module to parse CSV files
require("dotenv").config(); // Loads environment variables from a .env file

// Create a database connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Connection string from your environment variables
});

// Main function to handle importing perfumes from the CSV file
async function importPerfumes() {
    try {
        const perfumes = []; // Initialize an empty array to hold the perfume data

        // Read the CSV file
        fs.createReadStream("large_perfume_dataset.csv") // Stream the CSV file from the project directory
            .pipe(csvParser()) // Parse the CSV data row by row
            .on("data", (row) => {
                // For each row in the CSV file, add it to the perfumes array
                perfumes.push(row);
            })
            .on("end", async () => {
                // This callback is executed when the entire CSV file has been processed
                console.log("CSV file successfully processed."); // Log success message

                // Insert each perfume into the database
                for (const perfume of perfumes) {
                    // Extract data for each perfume
                    const { name, brand, price, longevity, sillage, gender_preference, occasion } = perfume;

                    // Execute the SQL INSERT query for each perfume
                    await pool.query(
                        "INSERT INTO perfumes (name, brand, price, longevity, sillage, gender_preference, occasion) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                        [
                            name, // Perfume name
                            brand, // Perfume brand
                            parseFloat(price), // Convert price to a float (important since CSV data is string by default)
                            longevity, // Longevity attribute
                            sillage, // Sillage attribute
                            gender_preference, // Gender preference (e.g., Male, Female, Unisex)
                            occasion, // Occasion (e.g., Casual, Formal, etc.)
                        ]
                    );
                }

                // Log a success message after all rows are inserted
                console.log("Perfumes imported successfully!");

                // Close the database connection pool
                pool.end();
            });
    } catch (err) {
        // Catch any errors during the process
        console.error("Error importing perfumes:", err);

        // Ensure the database connection pool is closed in case of errors
        pool.end();
    }
}

// Call the main function to start the import process
importPerfumes();

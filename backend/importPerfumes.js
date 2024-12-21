const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const csv = require('csv-parser');

// Database configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:uhaveebola321@localhost:5432/perfumedb",
});

async function insertPerfume(perfume) {
    const query = `
        INSERT INTO perfumes (name, brand, price, notes, scent_profile, longevity, sillage, gender_preference, occasion)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const values = [
        perfume.name,
        perfume.brand,
        perfume.price,
        perfume.notes,
        perfume.scent_profile,
        perfume.longevity,
        perfume.sillage,
        perfume.gender_preference,
        perfume.occasion
    ];
    await pool.query(query, values);
}

async function importCSV(filePath) {
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log('CSV file successfully processed.');
            for (const perfume of results) {
                try {
                    await insertPerfume(perfume);
                    console.log(`Inserted: ${perfume.name}`);
                } catch (err) {
                    console.error(`Error inserting ${perfume.name}:`, err.message);
                }
            }
            console.log('All data imported.');
            process.exit(0);
        });
}

const filePath = path.join(__dirname, 'data', 'perfumes.csv');// Replace with your actual CSV file path
importCSV(filePath);

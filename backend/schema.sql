CREATE TABLE perfumes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2),
    longevity VARCHAR(50),
    sillage VARCHAR(50),
    gender_preference VARCHAR(50),
    occasion VARCHAR(100)
);


#! /usr/bin/env node
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const createTableQuery = `
DROP TABLE IF EXISTS pokemons;
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS types;

CREATE TABLE IF NOT EXISTS trainers (
  id SERIAL PRIMARY KEY,
  trainer_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS types (
  id SERIAL PRIMARY KEY,
  type_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS pokemons (

  id SERIAL PRIMARY KEY,
  pokemon_name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  trainer_id INT REFERENCES trainers(id) ON DELETE CASCADE,
  type_id INT REFERENCES types(id) ON DELETE CASCADE,
  CONSTRAINT unique_pokemon_per_trainer UNIQUE (pokemon_name, trainer_id)

);
`;

const insertDataQuery = `
INSERT INTO trainers (trainer_name) VALUES
('Ash'),
('Misty'),
('Brock'),
('Gary Oak') ON CONFLICT (trainer_name) DO NOTHING;

INSERT INTO types (type_name) VALUES 
('Fire'),
('Water'),
('Electric'),
('Grass'),
('Poison') ON CONFLICT (type_name) DO NOTHING;

INSERT INTO pokemons (pokemon_name, description, image_path, trainer_id, type_id) VALUES 

  ('Pikachu', 'An Electric-type Pokémon known for its adorable looks.', '/assets/pikachu.png', 1, 3),
  ('Charmander', 'A Fire-type Pokémon with a small flame on its tail.', '/assets/charmander.jpg', 4, 1),
  ('Bulbasaur', 'A Grass/Poison-type Pokémon with a bulb on its back.', '/assets/bulbasaur.png', 3, 4),
  ('Squirtle', 'A Water-type Pokémon with a hard shell.', '/assets/Squirtle.png', 2, 2) ON CONFLICT (pokemon_name, trainer_id) DO NOTHING;
`;

async function populateDB() {
  try {
    await pool.connect();
    await pool.query(createTableQuery);
    console.log("Tables created (if not exists).");

    await pool.query(insertDataQuery);

    pool.end();
  } catch (err) {
    console.error("Error populating database:", err);
    pool.end();
  }
}

populateDB();
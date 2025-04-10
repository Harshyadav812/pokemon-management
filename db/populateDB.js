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
  trainer_name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  image_path VARCHAR(255) NOT NULL
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
INSERT INTO trainers (trainer_name, description, image_path) VALUES
('Ash', 'A determined and passionate young trainer from Pallet Town, always chasing his dream to become a Pokémon Master with his loyal Pikachu by his side.', '/assets/trainer-img/ash.jpg'),
('Misty', 'A fiery, water-type specialist and Cerulean City Gym Leader, known for her spunky attitude and love for aquatic Pokémon like Staryu and Psyduck.', '/assets/trainer-img/misty.png'),
('Brock', 'A rock-solid Pewter City Gym Leader and aspiring Pokémon Breeder, offering wisdom and support with his trusty Onix and a knack for cooking.', '/assets/trainer-img/brock.png'),
('Gary Oak', 'A confident and competitive rival from Pallet Town, driving his journey with a sleek car and standout Pokémon like Blastoise.', '/assets/trainer-img/gary.png')
ON CONFLICT (trainer_name) DO NOTHING;

INSERT INTO types (type_name) VALUES 
('Fire'),
('Water'),
('Electric'),
('Grass'),
('Poison') 
ON CONFLICT (type_name) DO NOTHING;

INSERT INTO pokemons (pokemon_name, description, image_path, trainer_id, type_id) VALUES 

  ('Pikachu', 'An Electric-type Pokémon known for its adorable looks.', '/assets/pokemon-img/pikachu.png', 1, 3),
  ('Charmander', 'A Fire-type Pokémon with a small flame on its tail.', '/assets/pokemon-img/charmander.jpg', 4, 1),
  ('Bulbasaur', 'A Grass/Poison-type Pokémon with a bulb on its back.', '/assets/pokemon-img/bulbasaur.png', 3, 4),
  ('Squirtle', 'A Water-type Pokémon with a hard shell.', '/assets/pokemon-img/Squirtle.png', 2, 2), 
  ('Pikachu', 'An Electric-type Pokémon known for its adorable looks.', '/assets/pokemon-img/pikachu.png', 2, 3),
  ('Vulpix', 'Something something', '/assets/pokemon-img/vulpix.png', 4, 1)
  ON CONFLICT (pokemon_name, trainer_id) DO NOTHING;
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
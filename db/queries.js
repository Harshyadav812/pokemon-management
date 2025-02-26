const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function getAllPokemons() {
  try {
    const res = await pool.query("SELECT * FROM pokemons ORDER BY id;")
    return res.rows;
  }
  catch (err) {
    console.error("Error fetching pokemons: ", err);
    throw err;
  }
}

async function getPokemonById(id) {
  const query = "SELECT * FROM pokemons WHERE pokemon_id = $1;"
  try {
    const res = await pool.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    console.error("Error fetching pokemon by Id: ", err);
    throw err;
  }
}

async function getAllTrainers() {
  const query = "SELECT * FROM trainers ORDER By trainer_id;"
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error("Error fetching trainers: ", err);
    throw err;
  }
}

async function getTrainerById(id) {
  const query = "SELECT * FROM trainers WHERE trainer_id = $1";
  try {
    const res = await pool.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    console.error("Error fetching trainer by ID: ", err);
    throw err;
  }
}

async function getAllTypes() {
  const query = "SELECT * FROM types ORDER BY type_id";
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error("Error fetching types: ", err);
    throw err;
  }
}

async function getTypeById(id) {
  const query = "SELECT * FROM types WHERE type_id = $1";
  try {
    const res = await pool.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    console.error("Error fetching type by ID: ", err);
    throw err;
  }
}

module.exports = { getAllPokemons, getPokemonById, getAllTrainers, getTrainerById, getAllTypes, getTypeById };
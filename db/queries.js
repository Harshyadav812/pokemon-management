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
  const query = `SELECT pokemons.*, types.type_name AS type_name, trainers.trainer_name
  FROM pokemons
  JOIN types ON pokemons.type_id = types.id
  JOIN trainers ON pokemons.trainer_id = trainers.id
  WHERE pokemons.id = $1`
  try {
    const res = await pool.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    console.error("Error fetching pokemon by Id: ", err);
    throw err;
  }
}

async function getAllTrainers() {
  const query = "SELECT * FROM trainers ORDER By id;"
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error("Error fetching trainers: ", err);
    throw err;
  }
}

async function getTrainerById(id) {
  const query = `SELECT pokemons.pokemon_name, pokemons.image_path AS pokemon_image, trainers.id, trainers.trainer_name, trainers.description, trainers.image_path AS trainer_image  
  FROM trainers
  JOIN pokemons ON trainers.id = pokemons.trainer_id
  WHERE trainers.id = $1`;
  try {
    const res = await pool.query(query, [id]);
    return res.rows;
  } catch (err) {
    console.error("Error fetching trainer by ID: ", err);
    throw err;
  }
}

async function getAllTypes() {
  const query = "SELECT * FROM types ORDER BY id";
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error("Error fetching types: ", err);
    throw err;
  }
}

async function getPokemonsByType(type_id) {
  const query = `SELECT DISTINCT ON (pokemons.pokemon_name)
  pokemons.id,
  pokemons.pokemon_name, pokemons.image_path,
  types.type_name
  FROM pokemons
  JOIN types ON types.id = pokemons.type_id
  WHERE pokemons.type_id = $1`;
  try {
    const res = await pool.query(query, [type_id]);
    return res.rows;
  } catch (err) {
    console.error("Error fetching type by ID: ", err);
    throw err;
  }
}

async function addPokemon(pokemon_name, description, image_path, trainer_name, type_name) {
  try {
    const trainerQuery = "SELECT id FROM trainers WHERE trainer_name = $1";
    const trainerRes = await pool.query(trainerQuery, [trainer_name])
    if (trainerRes.rows.length === 0) throw new Error("Trainer not found!")
    const trainer_id = trainerRes.rows[0].id;

    const typeQuery = "SELECT id FROM types WHERE type_name = $1";
    const typeRes = await pool.query(typeQuery, [type_name]);
    if (typeRes.rows.length === 0) throw new Error("Type not found!");
    const type_id = typeRes.rows[0].id;

    const insertQuery = `INSERT INTO pokemons (pokemon_name, description, image_path, trainer_id, type_id) 
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`;
    const res = await pool.query(insertQuery, [pokemon_name, description, image_path, trainer_id, type_id]);
    return res.rows[0];
  } catch (err) {
    console.error("Error adding Pokemon: ", err);
    throw err;
  }
}

async function deletePokemonById(id) {
  const deleteQuery = "DELETE FROM pokemons WHERE id = $1";
  await pool.query(deleteQuery, [id]);
}

async function deleteTrainerById(id) {
  const deleteTrianerQuery = "DELETE FROM trainers WHERE id = $1";
  await pool.query(deleteTrianerQuery, [id]);

}

module.exports = { getAllPokemons, getPokemonById, getAllTrainers, getTrainerById, getAllTypes, getPokemonsByType, addPokemon, deletePokemonById, deleteTrainerById };
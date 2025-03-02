const db = require("../db/queries");

async function getAllTypes(req, res) {
  const types = await db.getAllTypes();
  res.render("pokemonTypes", {
    title: "Types of Pokemon",
    types
  })
}

async function getPokemonsByType(req, res) {
  const type_id = req.params.id;
  const pokemons = await db.getPokemonsByType(type_id)
  res.render("pokemonPage", {
    title: `Types`,
    pokemons
  })
}

module.exports = { getAllTypes, getPokemonsByType };
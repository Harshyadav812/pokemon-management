const db = require("../db/queries");

async function getAllPokemons(req, res) {
  const pokemons = await db.getAllPokemons();
  res.render("pokemonPage", {
    title: "Pokemons",
    pokemons
  })
};

// async function getPokemonById(req, res) {
//   const id = req.params.id;
//   const pokemon = await db.getPokemonById(id);
//   res.render("searchedPokemon", {
//     title: `${pokemon}`,
//     //about the pokemon
//   })
// }

module.exports = { getAllPokemons }
// getPokemonById

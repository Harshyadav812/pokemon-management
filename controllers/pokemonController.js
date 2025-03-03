const db = require("../db/queries");

async function getAllPokemons(req, res) {
  const pokemons = await db.getAllPokemons();
  res.render("pokemonPage", {
    title: "Pokemons",
    pokemons
  })
};

async function getPokemonById(req, res) {
  const id = req.params.id;
  const pokemon = await db.getPokemonById(id);
  res.render("pokemonDetail", {
    title: `${pokemon.pokemon_name}`,
    pokemon
  })
}

async function pokemonCreateGet(req, res) {
  const types = await db.getAllTypes();
  const trainers = await db.getAllTrainers();
  res.render("addPokemonForm", {
    types,
    trainers
  })
}

async function pokemonCreatePost(req, res) {
  const { pokemon_name, description, trainer_name, type_name } = req.body;
  const image_file = req.file;

  if (!image_file) {
    return res.status(400).send("No image file uploaded or invalid file type.");
  }

  const image_path = `/assets/pokemon-img/${image_file.filename}`

  try {
    await db.addPokemon(pokemon_name, description, image_path, trainer_name, type_name);
    res.redirect('/pokemons');
  } catch (err) {
    res.status(500).send("Error adding pokemon: " + err.message);
  }

}

async function deletePokemonById(req, res) {
  const id = req.params.id;
  await db.deletePokemonById(id);
  res.redirect('/pokemons')
}

module.exports = { getAllPokemons, getPokemonById, pokemonCreateGet, pokemonCreatePost, deletePokemonById }
// getPokemonById

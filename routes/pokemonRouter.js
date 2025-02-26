const { Router } = require("express");
const pokemonController = require("../controllers/pokemonController")
const pokemonRouter = Router();

pokemonRouter.get("/", pokemonController.getAllPokemons);
// pokemonRouter.get("/create", pokemonController.pokemonCreateGet)
// pokemonRouter.post("/create", pokemonController.pokemonCreatePost);
// pokemonRouter.get("/:id", pokemonController.getPokemonById)
// pokemonRouter.get("/:id/update", pokemonController.pokemonUpdateGet)

module.exports = pokemonRouter;
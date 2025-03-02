const { Router } = require("express");
const typesRouter = Router();
const typesController = require("../controllers/typesController")

typesRouter.get("/", typesController.getAllTypes);
typesRouter.get("/:id", typesController.getPokemonsByType)
// typesRouter.get("/create", typesController.typesCreateGet);
// typesRouter.post("/create", typesController.typesCreatePost);


module.exports = typesRouter;
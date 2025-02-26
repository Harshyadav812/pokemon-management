const { Router } = require("express");
const typesController = require("../controllers/typesController")
const typesRouter = Router();

typesRouter.get("/", typesController.getAllTypes);
// typesRouter.get("/create", typesController.typesCreateGet);
// typesRouter.post("/create", typesController.typesCreatePost);
typesRouter.get("/:id", typesController.getTypeById)


module.exports = typesRouter;
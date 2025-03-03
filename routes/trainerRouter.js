const { Router } = require("express");
const trainerController = require("../controllers/trainerController")
const trainerRouter = Router();

trainerRouter.get("/", trainerController.getAllTrainers);
trainerRouter.get("/:id", trainerController.getTrainerById);
trainerRouter.get("/:id/delete", trainerController.deleteTrainerById);

module.exports = trainerRouter;
const db = require("../db/queries");

async function getAllTrainers(req, res) {
  const trainers = await db.getAllTrainers();
  res.render("trainers", {
    title: "Trainers",
    trainers
  })
}

async function getTrainerById(req, res) {
  const id = req.params.id;
  const trainer = await db.getTrainerById(id);
  res.render("trainer", {
    title: "Trainer",
    trainer
  })
}

module.exports = { getAllTrainers, getTrainerById }
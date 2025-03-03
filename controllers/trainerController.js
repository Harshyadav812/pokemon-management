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
  const trainerData = await db.getTrainerById(id);
  res.render("trainerDetails", {
    title: `${trainerData[0].trainer_name}`,
    trainerData
  })
}

async function deleteTrainerById(req, res) {
  const id = req.params.id;
  await db.deleteTrainerById(id);
  res.redirect("/trainers")
}

module.exports = { getAllTrainers, getTrainerById, deleteTrainerById }
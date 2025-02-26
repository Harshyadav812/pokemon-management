const db = require("../db/queries");

async function getAllTypes(req, res) {
  const types = await db.getAllTypes();
  res.render("types", {
    title: "Types of Pokemon",
    types
  })
}

async function getTypeById(re, req) {
  const id = req.params.id;
  const type = db.getTypeById(id)
  res.render("type")
}

module.exports = { getAllTypes, getTypeById };
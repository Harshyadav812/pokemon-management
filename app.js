const express = require("express");
const app = express();
const path = require('node:path'); //imports Node's built-in path module, which helps handle file and directory paths 
const homeRouter = require("./routes/homeRouter");
const pokemonRouter = require("./routes/pokemonRouter");
const trainerRouter = require("./routes/trainerRouter");
const typesRouter = require("./routes/typesRouter");

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views")); //This configures where Express will look for view template files
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
//this midlleware allows us to excess form data in req.body

app.use('/', homeRouter);
app.use("/pokemons", pokemonRouter);
app.use("/trainers", trainerRouter);
app.use("/types", typesRouter)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
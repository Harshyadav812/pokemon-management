const { Router } = require("express");
const pokemonController = require("../controllers/pokemonController")
const pokemonRouter = Router();
const multer = require('multer');
const path = require("node:path")


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/pokemon-img');
  },
  filename: (req, file, cb) => {
    const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniquesuffix}${ext}`)
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.png' || ext === '.webp') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .png and .webp files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
})

pokemonRouter.get("/", pokemonController.getAllPokemons);
pokemonRouter.get("/create", pokemonController.pokemonCreateGet)
pokemonRouter.post("/create", upload.single('image_file'), pokemonController.pokemonCreatePost);
pokemonRouter.get("/:id", pokemonController.getPokemonById)
pokemonRouter.get("/:id/delete", pokemonController.deletePokemonById)
// pokemonRouter.get("/:id/update", pokemonController.pokemonUpdateGet)

module.exports = pokemonRouter;
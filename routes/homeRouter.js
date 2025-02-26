const { Router } = require("express")
const homeContoller = require("../controllers/homeController")
const homeRouter = Router()

homeRouter.get("/", homeContoller.getHomepage);


module.exports = homeRouter;
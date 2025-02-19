const express = require("express");
const app = express();
const path = require('node:path'); //imports Node's built-in path module, which helps handle file and directory paths 

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views")); //This configures where Express will look for view template files
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
//this midlleware allows us to excess form data in req.body

app.use('/', indexRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
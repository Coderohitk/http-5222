//IMPORT REQUIRED MODULES
const express = require("express");
const path = require("path"); //contains methods to help with path concatenation

//SET UP EXPRESS APP
const app = express(); //express() is a function to initialize an Express app
const port = process.env.PORT || "8080";

//SET UP TEMPLATE ENGINE
app.set("views", path.join(__dirname, "templates")); //set "views" to use the <app_directory>/templates folder to store template files
app.set("view engine", "pug");//set Express to use Pug as the template (view) engine

//SET UP FOLDER FOR STATIC FILES (CSS, client-side JS)
app.use(express.static(path.join(__dirname, "public")));

//TEST APP PATH
app.get("/", (request, response) => {
  //response.status(200).send("Test");
  response.render("index", { title: "Home" });
});
app.get("/about", (request, response) => {
  response.render("about", { title: "About" });
});
//SET UP SERVER LISTENING
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
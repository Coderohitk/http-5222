const express=require("express");
const path = require("path");

const app =express();

const port =process.env.PORt || "8080";
app.set("views",path.join(__dirname,"templates"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname,"public")));
app.get("/",(request, response)=>{
// response.status(200).send("Test");
response.render("index",{title: "Home"});
});

app.listen(port,()=>{
console.log(
`listing at http://localhost:${port}`)
});
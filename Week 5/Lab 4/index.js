const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./models/movies");

const app = express();
const port = process.env.PORT || "8888";

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // To handle form data
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 🏠 Home Page - Show All Movies
app.get("/", async (req, res) => {
  let moviesList = await db.getMovies();
  res.render("index", { movies: moviesList });
});

//  Add Movie Page (Form)
app.get("/add", (req, res) => {
  res.render("add");
});

// Add Movie (POST Request)
app.post("/add", async (req, res) => {
  const { title, year, rating } = req.body;
  await db.addMovie(title, year, rating);
  res.redirect("/");
});

// Edit Movie Page (Form)
app.get("/edit/:id", async (req, res) => {
  const movie = await db.getMovieById(req.params.id);
  res.render("edit", { movie });
});

// Update Movie (POST Request)
app.post("/edit/:id", async (req, res) => {
  const { title, year, rating } = req.body;
  await db.updateMovie(req.params.id, title, year, rating);
  res.redirect("/");
});

//  Delete Movie
app.get("/delete/:id", async (req, res) => {
  await db.deleteMovie(req.params.id);
  res.redirect("/");
});
app.get("/update-rating", (req, res) => res.render("update-rating"));
app.post("/update-rating", async (req, res) => {
  await db.updateMovieRating(req.body.title, req.body.rating);
  res.redirect("/");
});

// Delete Movies by Rating
app.get("/delete-by-rating", (req, res) => res.render("delete-by-rating"));
app.post("/delete-by-rating", async (req, res) => {
  await db.deleteMoviesByRating(req.body.rating);
  res.redirect("/");
});

// Start Server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

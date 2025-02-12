const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String
});

const Movie = mongoose.model("Movie", movieSchema);

async function connect() {
  await mongoose.connect(dbUrl);

  // Check if movies collection is empty, then insert sample data
  const count = await Movie.countDocuments();
  if (count === 0) {
    await Movie.insertMany([
      { title: "Inception", year: 2010, rating: "PG" },
      { title: "Interstellar", year: 2014, rating: "PG-13" },
      { title: "The Dark Knight", year: 2008, rating: "PG-13" }
    ]);
    console.log("Sample movies inserted!");
  }
}

async function getMovies() {
  await connect();
  return await Movie.find({});
}

async function getMovieById(id) {
  await connect();
  return await Movie.findById(id);
}

async function addMovie(title, year, rating) {
  await connect();
  const movie = new Movie({ title, year, rating });
  await movie.save();
}

async function updateMovie(id, title, year, rating) {
  await connect();
  await Movie.findByIdAndUpdate(id, { title, year, rating });
}

async function deleteMovie(id) {
  await connect();
  await Movie.findByIdAndDelete(id);
}
async function updateMovieRating(title, rating) {
  await Movie.findOneAndUpdate({ title }, { rating });
}

async function deleteMoviesByRating(rating) {
  await Movie.deleteMany({ rating });
}

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  updateMovieRating,
  deleteMoviesByRating
};

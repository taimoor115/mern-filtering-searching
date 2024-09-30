import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: [String], required: true },
  rating: { type: Number, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;

import Movie from "../model/movie.model.js";
import data from "../data.json" assert { type: "json" };

export const getMovies = async (req, res) => {
  try {
    const page = Math.max(0, parseInt(req.query.page) - 1) || 0; // Default to page 0
    const limit = Math.max(1, parseInt(req.query.limit)) || 5; // Default to 5
    const search = req.query.search || "";
    const sortParam = req.query.sort
      ? req.query.sort.split(",")
      : ["year", "asc"]; // Default sorting by year ascending
    const genreParam = req.query.genre || "All"; // Default genre

    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];

    const genreFilter =
      genreParam === "All" ? genreOptions : genreParam.split(",");

    // Determine sorting field and order
    const sortField = sortParam[0];
    const sortOrder = sortParam[1] === "desc" ? -1 : 1;

    // Build the aggregation pipeline
    const pipeline = [
      {
        // Match based on search and genre
        $match: {
          name: { $regex: search, $options: "i" },
          genre: { $in: genreFilter },
        },
      },
      {
        // Sort the results by the specified field and order
        $sort: { [sortField]: sortOrder },
      },
      {
        // Paginate the results
        $skip: page * limit,
      },
      {
        // Limit the number of results
        $limit: limit,
      },
    ];

    // Execute the aggregation
    const movies = await Movie.aggregate(pipeline);

    // Count the total number of documents that match the criteria
    const total = await Movie.countDocuments({
      genre: { $in: [...genreParam] },
      name: { $regex: search, $options: "i" },
    });

    // Send the response
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function to insert movies into the database
const insertMovies = async () => {
  try {
    const docs = await Movie.insertMany(data);
    console.log("Movies inserted:", docs);
  } catch (err) {
    console.error("Error inserting movies:", err);
  }
};

insertMovies();

/*import Movie from "../model/movie.model.js";
import data from "../data.json" assert { type: "json" };

export const getMovies = async (req, res) => {
  try {
    const page = Math.max(0, parseInt(req.query.page) - 1) || 0;
    const limit = Math.max(1, parseInt(req.query.limit)) || 5;
    const search = req.query.search || "";
    const sortParam = req.query.sort || "rating"; // Default sorting field
    const sortOrder = req.query.order || "asc"; // Default sort order
    const genreParam = req.query.genre || "All"; // Default genre

    const genreOptions = [
      "Action", "Romance", "Fantasy", "Drama", "Crime",
      "Adventure", "Thriller", "Sci-fi", "Music", "Family"
    ];

    const genreFilter = genreParam === "All" 
      ? genreOptions 
      : genreParam.split(",");

    // Prepare sorting object with support for descending order
    const sortBy = { [sortParam]: sortOrder === "desc" ? "desc" : "asc" };

    const movies = await Movie.find({
      name: { $regex: search, $options: "i" },
      genre: { $in: genreFilter }
    })
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Movie.countDocuments({
      name: { $regex: search, $options: "i" },
      genre: { $in: genreFilter }
    });

    res.status(200).json({
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to insert movies into the database
const insertMovies = async () => {
  try {
    const docs = await Movie.insertMany(data);
    console.log("Movies inserted:", docs);
  } catch (err) {
    console.error("Error inserting movies:", err);
  }
};

insertMovies();
*/

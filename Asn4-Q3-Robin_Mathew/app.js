const express = require("express");
const mongoose = require("mongoose");
const { param, body, validationResult } = require("express-validator");
const path = require("path");
const database = require("./config/database");
const bodyParser = require("body-parser"); // pull information from HTML POST (express4)
const exphbs = require("express-handlebars");
const Movie = require("./models/movie");

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

mongoose.connect(database.url);

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      // rating,
    },
  })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

app.get("/data/search/id", (req, res) => {
  res.render("moviesearchid", {
    title: "Search Movie",
  });
});

app.post(
  "/data/search/id",
  body("movieId").notEmpty().isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("error", {
        title: "Invalid Movie ID",
        message: `Invalid movie ID, please enter a valid number`,
      });
      return;
    }
    const id = req.body.movieId;

    const movie = await Movie.find({ Movie_ID: id }).lean();
    if (movie === undefined || movie.length == 0) {
      res.render("error", {
        title: "No Movie Found",
        message: `No movie found with this Movie ID`,
      });
      return;
    } else {
      res.render("searchIdResult", {
        movie: movie[0],
      });
    }
  }
);

app.get("/data/movie/insert", (req, res) => {
  res.render("insertMovie", {
    title: "Insert Movie",
  });
});

app.post(
  "/data/movie/insert",
  body("Movie_ID").notEmpty().isNumeric().escape(),
  body("Title").notEmpty().isString().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("error", {
        title: "Invalid Movie Data",
        message: `Invalid movie data, please enter a valid data`,
      });
      return;
    }
    const checkMovie = await Movie.find({ Movie_ID: req.body.Movie_ID });
    if (checkMovie.length > 0) {
      res.render("error", {
        title: "Movie Already Exists",
        message: `Movie with ID ${req.body.Movie_ID} already exists`,
      });
      return;
    }
    const movie = new Movie(req.body);
    await movie.save();
    const movieSaved = await Movie.find({ Movie_ID: req.body.Movie_ID }).lean();
    res.render("insertedMovie", {
      movie: movieSaved[0],
    });
  }
);

app.get("/data/movie/update", (req, res) => {
  res.render("updateMovie", {
    title: "Update Movie",
  });
});

app.post(
  "/data/movie/update",
  body("Movie_ID").notEmpty().isNumeric().escape(),
  body("Title").isString().escape(),
  body("Released").isString().escape(),
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).render("error", {
        title: "Invalid Movie Data",
        message: `Invalid movie data, please enter a valid data`,
      });
      return;
    }
    const id = req.body.Movie_ID;
    const updateInfo = {};
    if (req.body.Title) {
      updateInfo["Title"] = req.body.Title;
    }
    if (req.body.Year) {
      updateInfo["Year"] = req.body.Year;
    }
    if (req.body.Released) {
      updateInfo["Released"] = req.body.Released;
    }
    const updatedMovie = await Movie.findOneAndUpdate(
      { Movie_ID: id },
      updateInfo,
      {
        new: true,
      }
    ).lean();
    if (!updatedMovie) {
      res.render("error", {
        title: "No Movie Found",
        message: `No movie found with this Movie ID`,
      });
      return;
    }
    res.render("updatedMovie", {
      movie: updatedMovie,
    });
  }
);

app.get("/data/movie/delete", (req, res) => {
  res.render("moviedeleteid", {
    title: "Delete Movie",
  });
});

app.post(
  "/data/movie/delete",
  body("movieId").notEmpty().isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("error", {
        title: "Invalid Movie ID",
        message: `Invalid movie ID, please enter a valid number`,
      });
      return;
    }
    const id = req.body.movieId;

    const movie = await Movie.findOneAndDelete({ Movie_ID: id }).lean();
    if (movie === null || movie.length == 0) {
      res.render("error", {
        title: "No Movie Found",
        message: `No movie found with this Movie ID`,
      });
      return;
    } else {
      res.render("data", {
        title: "Movie Deleted",
        message: `Movie with ID ${id} has been deleted`,
      });
    }
  }
);

//get all movie data from db
app.get("/api/movies", async function (req, res) {
  try {
    // use mongoose to get all todos in the database
    const movies = await Movie.find({});
    res.json(movies); // return all movies in JSON format
  } catch (error) {
    // if there is an error retrieving, send the error otherwise send data
    res.status(500).send(err);
  }
});

// get a movie with ID
app.get(
  "/api/movies/:movie_id",
  param("movie_id").isNumeric().escape(),
  async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send("Invalid movie ID");
      }
      const id = req.params.movie_id;
      const movie = await Movie.find({ Movie_ID: id });
      if (!movie) {
        return res.status(404).send("Movie not found");
      }
      res.json(movie);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// get a movie with ID
app.get("/api/movies/title/:movie_title", async function (req, res) {
  try {
    const movie_title = req.params.movie_title;
    const movie = await Movie.find({ Title: movie_title });
    if (!movie) {
      return res.status(404).send("Movie not found");
    }
    res.json(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create movie and send back all movie after creation
app.post(
  "/api/movies",
  body("Movie_ID").notEmpty().isNumeric().escape(),
  body("Title").notEmpty().isString().escape(),
  async function (req, res) {
    // create mongose method to create a new record into collection
    console.log(req.body);
    try {
      if (!movie) {
        return res.status(404).send("Data must have Movie_ID and Title");
      }
      const movie = new Movie(req.body);
      await movie.save();
      const movies = await Movie.find({ Movie_ID: req.body.Movie_ID });
      res.json(movies); // return movie in JSON format
    } catch (error) {
      res.send(error);
    }
  }
);

// update movie and send back movie after creation
app.put(
  "/api/movies/:movie_id",
  param("movie_id").notEmpty().isNumeric().escape(),
  body("Title").isString().escape(),
  body("Released").isString().escape(),
  async function (req, res) {
    // create mongoose method to update an existing record into collection
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send("Invalid movie ID or invalid movie data");
      }
      const id = req.params.movie_id;
      const updateInfo = {};
      if (req.body.Title) {
        updateInfo["Title"] = req.body.Title;
      }
      if (req.body.Released) {
        updateInfo["Released"] = req.body.Released;
      }
      const updatedMovie = await Movie.findOneAndUpdate(
        { Movie_ID: id },
        updateInfo,
        {
          new: true,
        }
      );
      if (!updatedMovie) {
        return res.status(404).send("Movie not found");
      }
      res.send(
        `Success! Movie updated - ${updatedMovie.Title}, Released - ${updatedMovie.Released}`
      );
    } catch (error) {
      throw error;
    }
  }
);

// delete a movie by id
app.delete(
  "/api/movies/:movie_id",
  param("movie_id").notEmpty().isNumeric().escape(),
  async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send("Invalid movie ID");
      }
      const id = req.params.movie_id;
      const deletedMovie = await Movie.findOneAndDelete({ Movie_ID: id });
      if (!deletedMovie) {
        return res.status(404).send("Movie not found");
      }
      res.send("Success! Movie has been Deleted.");
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

app.listen(port);
console.log("App listening on port : " + port);

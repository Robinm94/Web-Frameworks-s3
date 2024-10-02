/******************************************************************************
 ***
 * ITE5315 – Assignment 1
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Robin Mathew   Student ID: N01625856   Date: 2024-09-29
 *
 *
 ********************************************************************************/

// Import express
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

//made video on youtube explaining and demostrating
// Use url decoding for request body
app.use(express.urlencoded({ extended: true }));

// file path for the json file which is common in each request
const filePath = path.join(__dirname, "movieData.json");

// home page
app.get("/", (req, res) => {
  res.send("Name: Robin Mathew, Student ID: N01625856");
});

// load data page
app.get("/data", (req, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(content.toString());
    res.send("JSON data is loaded and ready!");
  });
});

// search movie by index
app.get("/data/movie/:index", (req, res) => {
  const index = Number(req.params.index);
  if (isNaN(index) || index < 0 || index > 249) {
    res
      .status(400)
      .send("Error 400: Invalid index number. Enter number between 0 and 249");
    return;
  }
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(err);
      return;
    }
    const data = JSON.parse(content);
    res.send(
      `Movie ID: ${data[index].Movie_ID}, Movie Title: ${data[index].Title}`
    );
  });
});

// search movie by movie id
app.get("/data/search/id", (req, res) => {
  res.send(`<form method="POST"action="/data/search/id">
    <input type="text" name="movieId" placeholder="Enter Movie ID">
    <input type="submit" value="Search">
    </form>`);
});

// response for search movie by movie id
app.post("/data/search/id", (req, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(err);
      return;
    }
    const data = JSON.parse(content);
    const found = data.find(
      (elem) => elem.Movie_ID.toString() == req.body.movieId
    );
    if (found === undefined) {
      res.send("No movie found with this Movie ID");
      return;
    } else {
      res.send(`Movie Info: ${JSON.stringify(found)}`);
    }
  });
});

// search movies based on if it contains the text in their title
app.get("/data/search/title", (req, res) => {
  res.send(`<form method="POST"action="/data/search/title">
    <input type="text" name="movieTitle" placeholder="Enter Movie Title To Search">
    <input type="submit" value="Search">
    </form>`);
});

// response to search movies based on if it contains the text in their title
app.post("/data/search/title", (req, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(err);
      return;
    }
    const data = JSON.parse(content);
    const found = data.filter((elem) =>
      elem.Title.includes(req.body.movieTitle)
    );
    if (found.length == 0) {
      res.send(
        `No movie found with "${req.body.movieTitle}" in the Movie Title`
      );
      return;
    } else {
      let output = `Found ${found.length} 
      ${found.length === 1 ? "movie" : "movies"}
      with "${req.body.movieTitle}" in the Movie Title <br><br>`;
      for (const movie of found) {
        output =
          output +
          `Movie ID: ${movie.Movie_ID}<br>
          Title: ${movie.Title}<br>
          Year: ${movie.Year}<br>
          Released: ${movie.Released}<br>
          Runtime:${movie.Runtime}<br>
          <br><br>`;
      }
      res.send(output);
    }
  });
});

// all other error pages
app.all("*", (req, res) => res.status(404).send("Error 404: Page not found"));

//Listen to port 5500
app.listen(5500, () => console.log(`Server start on port 5500`));

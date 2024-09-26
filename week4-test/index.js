var express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Name: Robin Mathew, N01625856");
});
app.get("/cars/details", (req, res) => {
  res.send(JSON.stringify([101, 201, 301, 401]));
});
app.get("/random", (req, res) => {
  res.send(Math.random().toString());
});

app.post("/posting", (req, res) => {
  console.log("Enter the post method");
  res.send("done");
});

app.get("/cars/:name", (req, res) => {
  res.send(req.params.name);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

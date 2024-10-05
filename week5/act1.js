var express = require("express");
var app = express();
var PORT = 3000;
// This middleware will not allow the
// request to go beyond it
app.use(function (req, res, next) {
  console.log("Middleware called");
  next();
});

app.use(express.static("public"));

// Requests will never reach this route
app.get("/user", function (req, res) {
  console.log("/user request called");
  res.send(req.url);
});
app.get(
  "/b",
  (req, res, next) => {
    console.log("Response is sent by the next function");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);

// Function that acts as middleware for request handler
const hello_1 = function (req, res, next) {
  console.log("Hello 1");
  next();
};
// Function that acts as middleware for request handler
// Code after next() is run after next function completes
const hello_2 = function (req, res, next) {
  console.log("Hello 2");
  next();
  console.log("Hello 2 after response sent");
};
// Multiple callback functions for route requires using next
app.get(
  "/c",
  [hello_1, hello_2],
  (req, res, next) => {
    console.log("Response is sent by the next function");
    next();
    console.log("Printed after response sent");
  },
  (req, res) => {
    console.log("Hello from C!");
    res.send("Hello from C!");
  }
);

app.use((req, res, next) => {
  res.status(404).send("Can't find");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
// create four routes
// root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
  // res.send("Hello from Root!");
});
// node route
app.get("/node", (req, res) => {
  var one = 1;
  var two = 2;
  // Swap values
  var [one, two] = [two, one];
  console.log(`One: ${one}, Two: ${two}`);
  res.send("Success");
  // res.send("Hello from /node!");
});
// sum route
app.get("/sum", (req, res) => {
  nums = [1, 2, 3, 4];
  sum = 0;
  // Arrow function to add numbers together
  nums.forEach((num) => {
    console.log(num);
    sum += num;
  });
  console.log(sum);
  res.send(JSON.stringify(sum));
  // res.send("Hello from /sum!");
});

app.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});

app.get("/api/emps", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/emps/:id", (req, res) => {
  res.send(req.params.id);
});
app.get("/api/posts/:month/:day", (req, res) => {
  res.send(req.params.month+ req.params.day);
});
app.get("/api/posts/", (req, res) => {
  res.send(req.query);
});
// root route
app.get("*", (req, res) => {
  res.send("Hello from error!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

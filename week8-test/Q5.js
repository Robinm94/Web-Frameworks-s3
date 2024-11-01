const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/main.html"));
});

app.post("/ageCheck", body("age").isNumeric(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const age = parseInt(req.body.age);
  const newAge = age + 25;
  let message = "";
  if (newAge > 69) {
    message = "You are older than 69";
  } else if (newAge < 6) {
    message = "You are younger than 6";
  } else {
    message = "You now " + newAge + " years old";
  }
  res.send(message);
});

app.listen(5000);

// import express module
const express = require("express");
//import body, check, validationResult from express-validator
const { body, check, validationResult } = require("express-validator");
//create express app
const app = express();
//set the express app to use urlencoded
app.use(express.json());

//define a post route for /checkuser
app.post(
  "/checkuser",
  // middleware to check if the email is valid
  body("email").isEmail(),
  // middleware to check if the password is at least 5 characters long
  body("userID").isLength({ min: 5 }),
  // request handler
  (req, res) => {
    //validation results
    const errors = validationResult(req);
    //if there are errors, send the error array
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    //send the request body if no error
    res.send(req.body);
  }
);

//start the server on port 5500
app.listen(5500);

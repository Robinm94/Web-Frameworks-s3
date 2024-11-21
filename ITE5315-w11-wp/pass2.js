require("dotenv").config();
const pass = process.env.PASS;
const bcrypt = require("bcryptjs");
bcrypt.compare("Robin Mathew", pass).then((result) => {
  //   result === true
  console.log(result);
  if (result) {
    console.log("Password is correct.");
  } else {
    console.log("Password is incorrect.");
  }
});

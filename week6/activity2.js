const express = require("express");

const { body, check, validationResult } = require("express-validator");
const app = express();

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/newcomment",
  body("email").isEmail().normalizeEmail(),
  body("text").not().isEmpty().trim().escape(),

  (req, res) => {
    // Handle the request somehow
    console.log(req.body);
    res.send("done");
  }
);

app.post(
  "/user",
  // username must be an email
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("password").isLength({ min: 5 }),
  body("date-of-birth").isISO8601().toDate(),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    res.send(req.body);
  }
);

app.post(
  "/comment",
  async (req, res, next) => {
    await check("email").isEmail().run(req);
    await check("password").isLength({ min: 6 }).run(req);
    await check("date-of-birth").isISO8601().toDate().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    next();
  },

  (req, res) => {
    // Handle the request somehow
    console.log(req.body);
    res.send("done");
  }
);

app.listen(3000);

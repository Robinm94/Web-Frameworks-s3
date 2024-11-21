const express = require("express");
const app = express();
const path = require("path");
const HTTP_PORT = process.env.PORT || 3000;
const session = require("express-session");

app.use(
  session({
    secret: "spooky secret",
    cookie: { maxAge: 40000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.post("/login", (req, res) => {
  console.log(req.session);

  const { username, password } = req.body;

  if (username && password) {
    if (req.session.authenticated) {
      res.json(req.session);
    } else {
      if (password === "123") {
        req.session.authenticated = true;
        req.session.user = {
          username,
          password,
        };

        res.json(req.session);
      } else {
        res.status(403).json({ msg: "bad credentials" });
      }
    }
  } else res.status(403).json({ msg: "bad credentials" });
});

// setup http server to listen on HTTP_PORT

app.listen(HTTP_PORT, () => {
  console.log("Express http server listening on: " + HTTP_PORT);
});

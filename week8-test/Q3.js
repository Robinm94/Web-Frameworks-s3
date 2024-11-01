const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      highlight: function (student, options) {
        if (student.gpa) return "";
        else return options.fn(this);
      },
    },
  })
);
app.set("view engine", ".hbs");
const someData = [
  {
    studId: 1,
    name: "name1",
    program: "CPAN",
    gpa: 3.9,
  },

  {
    studId: 2,
    name: "name2",
    program: "ITS",
    gpa: 3.1,
  },

  {
    studId: 3,
    name: "name3",
    program: "CPAN",
    gpa: 3.3,
  },

  {
    studId: 4,
    name: "name4",
    program: "ESDV",
    gpa: 4.0,
  },

  {
    studId: 5,
    name: "name5",
    program: "CPAN",
    gpa: 3.4,
  },

  {
    studId: 6,
    name: "name6",
    program: "ITS",
    gpa: "",
  },

  {
    studId: 7,
    name: "name7",
    program: "ITS",
    gpa: 3.5,
  },

  {
    studId: 8,
    name: "name8",
    program: "ESDV",
    gpa: 3.6,
  },

  {
    studId: 9,
    name: "name9",
    program: "CPAN",
    gpa: 3.3,
  },

  {
    studId: 10,
    name: "name10",
    program: "ESDV",
    gpa: "",
  },
];
app.get("/getData", function (req, res) {
  res.json(someData);
});

app.get("/viewData", function (req, res) {
  res.render("viewData", {
    data: someData,
    layout: false,
  });
});

app.get("/viewDataHighlight", function (req, res) {
  res.render("viewDataHighlight", {
    data: someData,
    layout: false,
  });
});

app.listen(3000);

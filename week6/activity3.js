const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
const someData = [
  {
    name: "John",
    age: 23,
    occupation: "developer",
    company: "Scotiabank",
  },
  {
    name: "Jane",
    age: 21,
    occupation: "developer",
    company: "CIBC bank",
  },
];
app.get("/getData", function (req, res) {
  res.json(someData);
});

app.get("/viewData", function (req, res) {
  res.render("viewData", {
    data: someData,
    layout: false, // do not use the default Layout (main.hbs)
  });
  // var htmlString =
  //   "<!doctype html>" +
  //   "<html>" +
  //   "<head>" +
  //   "<title>" +
  //   "View Data" +
  //   "</title>" +
  //   "</head>" +
  //   "<body>" +
  //   "<table border='1'>" +
  //   "<tr>" +
  //   "<th>" +
  //   "Name" +
  //   "</th>" +
  //   "<th>" +
  //   "Age" +
  //   "</th>" +
  //   "<th>" +
  //   "Occupation" +
  //   "</th>" +
  //   "<th>" +
  //   "Company" +
  //   "</th>" +
  //   "</tr>" +
  //   "<tr>" +
  //   "<td>" +
  //   someData.name +
  //   "</td>" +
  //   "<td>" +
  //   someData.age +
  //   "</td>" +
  //   "<td>" +
  //   someData.occupation +
  //   "</td>" +
  //   "<td>" +
  //   someData.company +
  //   "</td>" +
  //   "</tr>" +
  //   "</table>" +
  //   "</body>" +
  //   "</html>";

  // res.send(htmlString);
});

app.listen(3000);

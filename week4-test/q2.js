const fs = require("fs");
const path = require("path");
fs.appendFile(
  path.join(__dirname, "wp", "foo"),

  ":New content:",

  function (err) {
    if (err) throw err;

    console.log("File appended");
  }
);

  const fs = require("fs");
  fs.readFile("./week2/MOCK_DATA.json", function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data.toString());
  });
console.log("Program Ended");
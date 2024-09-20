const http = require("http");

const path = require("path");

const fs = require("fs");

const server = http.createServer((request, response) => {
  console.log(request.url);
  console.log(__dirname);
  let filePath = path.join(
      __dirname,
      "public",
      request.url === "/" ? "index.html" : request.url
    );
  console.log(filePath);

  // Route that returns sum of numbers

  if (request.url == "/sum") {
    response.writeHead(200, { "Content-Type": "application/json" });

    // array of numbers

    nums = [1, 2, 3, 4];

    sum = 0;

    // Arrow function to add numbers together

    nums.forEach((num) => {
      console.log(num);

      sum += num;
    });

    console.log(sum);

    response.end(JSON.stringify(sum));
    return;

    // Route to show other node features
  } else if (request.url == "/node") {
    response.writeHead(200, { "Content-Type": "application/json" });

    var one = 1;

    var two = 2;

    // Swap values

    var [one, two] = [two, one];

    console.log(`One: ${one}, Two: ${two}`);

    response.end("Success");
    return;
  }

  fs.readFile(filePath, (err, content) => {
    console.log(err);
    if (err) {
      response.writeHead(404, { "Content-Type": "text/html" });

      if (err.code == "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            response.end(content, "utf8");
          }
        );
      } else {
        response.end(`Error: ${err.code}`);
      }
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });

      response.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

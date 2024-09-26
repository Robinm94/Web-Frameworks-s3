const http = require('http')
const server = http.createServer((req, res) => {
   if (req.url === '/') {
     res.write("Name: Robin Mathew, N01625856");
     res.end();
  }
   if (req.url === '/cars/details') {
     res.write(JSON.stringify([101, 201, 301,401]));
     res.end();
  }
  if (req.url==='/random') {
    res.write(Math.random().toString());
    res.end();
  }
});

server.listen(8000);
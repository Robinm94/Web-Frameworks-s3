const fs = require("fs");
const http = require("http");

function makeTable(data) {
  let table = `<table border="1">
    <tr>
        <th>Row no</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone</th>
    <tr>`;
  for (const contact of JSON.parse(data)) {
    table = table.concat(`
        <tr>
           <th>${contact.row_no}</th>
            <th>${contact.first_name}</th>
            <th>${contact.last_name}</th>
            <th>${contact.email}</th>
            <th>${contact.phone}</th> 
        </tr>
        `)
  }
  table = table.concat(`</table>`)
  return table;
}

let myDataAsync = "";
fs.readFile("./week2/MOCK_DATA_act2.json", function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
 myDataAsync = data;
});
let myData = fs.readFileSync("./week2/MOCK_DATA_act2.json");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/phonebook") {
    res.write(makeTable(myDataAsync));
    res.end();
  }
  if (req.url === "/phonebooksync") {
    res.write(makeTable(myData));
    res.end();
  }
});

server.listen(3000);
console.log("Listening to on port 3000");

require("dotenv").config();

const hostname = process.env.HOST;
const database = process.env.DATABASE;
const port = process.env.PORT;
console.log(hostname);
console.log(database);
console.log(port);

const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const port = 5000;
// Connection URL
const url = "mongodb://127.0.0.1:27017";
//Initialize the connection
const client = new MongoClient(url);
// Database Name
const dbName = "ite5315";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("documents");
  console.log("Connected");
}

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.get("/insert", async (req, res) => {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("documents");
  console.log("Connected");
  // Insert Records
  const insertResult = await collection.insertOne({ b: 10 });
  console.log("Inserted documents =>", insertResult);
  res.send("insert is ready");
});

app.get("/show", async (req, res) => {
  // Use connect method to connect to the server
  client.connect();
  findResult = await client.db(dbName).collection("documents").findOne({});
  console.log("Found documents =>", findResult);
  res.send("show is ready");
});

app.get("/display", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("documents");
  const cursor = collection.find({ a: 3 });
  while (await cursor.hasNext()) {
    console.log(await cursor.next());
  }

  res.send("display is ready");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

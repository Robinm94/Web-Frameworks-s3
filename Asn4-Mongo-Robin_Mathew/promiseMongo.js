const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

function findAll() {
  MongoClient.connect(url, {
    useNewUrlParser: true,
  })
    .then((client) => {
      if (!client) return;
      try {
        console.log("1");
        const db = client.db("Company");
        console.log("2");
        let collection = db.collection("customers");
        console.log("3");
        let cursor = collection.find({}).limit(10);
        console.log("4");
        const stream = cursor.stream();
        stream.on("data", (doc) => console.log(doc));
        stream.on("end", () => {
          console.log("5");
          client.close();
        });
        stream.on("error", (err) => {
          console.log("error", err);
          client.close();
        });
      } catch (err) {
        console.log(err);
        client.close();
      }
    })
    .catch((err) => {
      console.log("s2");
      console.log(err);
    });
}
setTimeout(() => {
  findAll();
  console.log("iter");
}, 5000);

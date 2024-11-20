const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

MongoClient.connect(url)
  .then(function (db) {
    var dbo = db.db("ite5315");
    dbo
      .collection("documents")
      .findOne({})
      .then(function (result) {
        console.log(result);
        db.close();
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

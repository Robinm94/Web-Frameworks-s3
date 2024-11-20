let MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

(async () => {
  let client = await MongoClient.connect(url).catch((err) => {
    console.log(err);
  });
  if (!client) return;
  try {
    const db = client.db("ite5315");
    const res = await db.collection("documents").findOne();
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
})().catch((err) => console.error(err));

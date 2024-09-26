const express = require("express");
const app = express();
/**DecodeFormURLEncodeddata*/
app.use(express.urlencoded({ extended: true }));
/**Showpagewithaform*/
app.get("/", (req, res, next) => {
  res.send(`<form method="POST"action="/">
  <input type="text" name="username" placeholder="username">
  <input type="submit">
  </form>`);
});
/**ProcessPOSTrequest*/
app.post("/", function (req, res) {
  res.send(JSON.stringify(req.body));
});
/**Runtheapp*/
app.listen(3000);

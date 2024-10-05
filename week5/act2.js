const express = require("express");
const app = express();
/**Require multer*/
const multer = require("multer");
/**Show pagewithaformwithaspecificenctype*/
app.get("/", (req, res, next) => {
  res.send(`<form method="POST"action="/"enctype="multipart/form-data">
<input type="text" name="username" placeholder="username">
<input type="submit">
</form>`);
});
/**ProcessPOSTrequestwithamutter'smiddleware*/
app.post("/", multer().none(), function (req, res, next) {
  res.send(JSON.stringify(req.body));
});
/**Runtheapp*/
app.listen(3000);

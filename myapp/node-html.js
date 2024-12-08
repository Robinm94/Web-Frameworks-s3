// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
// Endpoint to return a simple message
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Node.js endpoint!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

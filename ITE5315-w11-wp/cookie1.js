// Import required modules
const express = require("express");
const cookieParser = require("cookie-parser");

// Create an Express application
const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Define a route to set a cookie
app.get("/set-cookie", (req, res) => {
  // Set a cookie named 'username' with value 'john_doe'
  res.cookie("username", "john_doe", { maxAge: 900000, httpOnly: true });
  res.send("Cookie has been set");
});
// Define a route to read the cookie

app.get("/read-cookie", (req, res) => {
  // Read the value of the 'username' cookie
  const username = req.cookies.username;

  // Check if the cookie exists
  if (username) {
    res.send(`Hello ${username}!`);
  } else {
    res.send("Cookie not found");
  }
});

// Start the Express server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

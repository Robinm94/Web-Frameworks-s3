const bcrypt = require("bcryptjs");
// Encrypt the plain text: "myPassword123"
bcrypt
  .hash("Robin Mathew", 10)
  .then((hash) => {
    // Hash the password using a Salt that was generated using 10 rounds
    console.log(hash);
    // TODO: Store the resulting "hash" value in the DB
  })
  .catch((err) => {
    console.log(err); // Show any errors that occurred during the process
  });

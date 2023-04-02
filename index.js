require("dotenv").config();
const { app, port } = require("./src/server");
const mongoose = require("./src/database");

// Syncing all the models at once.
app.listen(port, () => {
  console.log("Port connected", port);
});

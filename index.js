require("dotenv").config();
const { app, port } = require("./src/server");
const mongoose = require("./src/database");
const { getTemperaments } = require("./src/Controllers/TemperamentController");
// Syncing all the models at once.
app.listen(port, () => {
  getTemperaments();
  console.log("Port connected", port);
});

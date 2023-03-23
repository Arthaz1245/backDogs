const express = require("express");
const routes = require("./routes/index");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

module.exports = {
  app,
  port,
};
//ddd
//er3rr3

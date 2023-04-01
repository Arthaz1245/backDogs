const express = require("express");
const router = express.Router();

const dogs = require("./DogRoutes");
const temperaments = require("./TemperamentRoute");
const users = require("./UserRoutes");
router.use("/breeds", dogs);
router.use("/temperaments", temperaments);
router.use("/users", users);

module.exports = router;

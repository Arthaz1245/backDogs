const express = require("express");
const router = express.Router();
const { register } = require("../controllers/registerController");
const {
  signing,
  addFavoritesBreed,
} = require("../controllers/LoginController");
router.post("/register", register);
router.post("/login", signing);
router.put("/add-favorites", addFavoritesBreed);
module.exports = router;

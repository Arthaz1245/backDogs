const express = require("express");
const router = express.Router();
const { register } = require("../controllers/registerController");
const {
  signing,
  addFavoritesBreed,
  removeFavoriteBreed,
} = require("../controllers/LoginController");
router.post("/register", register);
router.post("/login", signing);
router.put("/add-favorites", addFavoritesBreed);
router.put("/remove-favorites", removeFavoriteBreed);
module.exports = router;

const express = require("express");
const router = express.Router();
const { register } = require("../controllers/registerController");
const { signing } = require("../controllers/LoginController");
router.post("/register", register);
router.post("/login", signing);
module.exports = router;

const express = require("express");
const router = express.Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require("./DogRoutes");
const temperaments = require("./TemperamentRoute");
router.use("/breeds", dogs);
router.use("/temperaments", temperaments);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

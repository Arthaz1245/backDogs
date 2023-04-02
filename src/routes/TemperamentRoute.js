const { Router } = require("express");
const router = Router();
const Temperament = require("../models/Temperament");
const { getTemperaments } = require("../controllers/TemperamentController");

router.get("/", async (req, res) => {
  try {
    await getTemperaments();
    const allTemperaments = await Temperament.find();
    res.status(200).send(allTemperaments);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

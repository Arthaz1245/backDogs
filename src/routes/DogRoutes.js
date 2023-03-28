const express = require("express");
const router = express.Router();

const {
  getAllBreeds,
  postBreed,
  deleteBreed,
  updateBreed,
  getBreedById,
  searchBreed,
} = require("../controllers/DogController");
router.get("/", async (req, res) => {
  const { name } = req.query;
  let allBreed = await getAllBreeds();

  if (name) {
    let breedName = allBreed.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    breedName
      ? res.status(200).send(breedName)
      : res.status(404).send("Breed not found");
  } else {
    res.status(200).send(allBreed);
  }
});
router.get("/filterCreated", async (req, res) => {
  const { created } = req.query;
  let allBreeds = await getAllBreeds();
  if (created === "create") {
    copy = allBreeds.filter((b) => b.createdInDB);

    if (copy.length > 0) {
      res.status(200).send(copy);
    } else {
      res.status(400).send([]);
    }
  } else if (created === "api") {
    let copy = allBreeds.filter((b) => !b.createdInDB);
    res.status(200).send(copy);
  } else {
    res.status(200).send(allBreeds);
  }
});
router.get("/filterTemperament", async (req, res) => {
  const { temperament } = req.query;
  let allBreeds = await getAllBreeds();
  if (temperament) {
    let tempName = allBreeds.filter((b) => {
      if (typeof b.temperaments === "string")
        return b.temperaments.includes(temperament);
      if (Array.isArray(b.temperaments)) {
        let temps = b.temperaments.map((e) => (e.name ? e.name : e));
        return temps.includes(temperament);
      }
    });
    tempName
      ? res.status(200).send(tempName)
      : res.status(404).send("Breed not found");
  } else {
    res.status(200).send(allBreeds);
  }
});
router.get("/:id", getBreedById);
router.get("/search", searchBreed);
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedBreed = await updateBreed(id, data);
    res.status(200).json(updatedBreed);
  } catch (error) {
    res.status(500).send("Error to update the breed", error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBreed = await deleteBreed(id);
    res.status(200).json(deletedBreed);
  } catch (error) {
    res.status(500).send("Error to delete breed");
  }
});
router.post("/", postBreed);
module.exports = router;

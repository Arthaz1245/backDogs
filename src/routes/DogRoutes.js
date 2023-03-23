const express = require("express");
const router = express.Router();
const {
  getAllBreeds,
  postBreed,
  deleteBreed,
  updateBreed,
  getBreedById,
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

router.get("/:id", getBreedById);
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

const Dog = require("../models/Breed");
//const Temperament = require("../models/Temperament");
const axios = require("axios");
const { API_KEY } = process.env;
const getApiInfo = async () => {
  try {
    const apiurl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?apiKey=${API_KEY}`
    );
    const BreedsApiInfo = apiurl.data.map((e) => {
      let weight = e.weight.metric.split("-");
      let height = e.height.metric.split("-");
      let life_span = e.life_span.split("-");
      let min_height = parseInt(height[0]);
      let max_height = parseInt(height[1]);
      let min_weight = parseInt(weight[0]);
      let max_weight = parseInt(weight[1]);
      let min_lifespan = parseInt(life_span[0]);
      let max_lifespan = parseInt(life_span[1]);
      return {
        id: e.id,
        name: e.name,
        min_height: min_height,
        max_height: max_height,
        min_weight: min_weight,
        max_weight: max_weight,
        min_lifespan: min_lifespan,
        max_lifespan: max_lifespan,
        image: e.image.url,
        temperaments: e.temperament
          ? e.temperament.split(", ").map((t) => {
              return {
                name: t,
              };
            })
          : "Not Temperament",
      };
    });

    return BreedsApiInfo;
  } catch (error) {
    console.log(error);
  }
};
const getDbInfo = async () => {
  try {
    const dbInfo = await Dog.find();
    return dbInfo;
  } catch (error) {
    console.log(error);
  }
};

const getAllBreeds = async (req, res) => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};
const getBreedById = async (req, res) => {
  const { id } = req.params;
  const totalInfo = await getAllBreeds();
  try {
    if (id) {
      let breedId = totalInfo.find(
        (b) => b.id === Number(id) || b.id === String(id)
      );
      breedId
        ? res.status(200).send(breedId)
        : res.status(404).send("Breed not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteBreed = async (id) => {
  try {
    const deletedBreed = await Dog.findByIdAndDelete(id);
    return deletedBreed;
  } catch (error) {
    console.log(error);
  }
};
const searchBreed = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Names parameter is missing" });
    }
    const dog = Dog.find({ name: { $in: q } });
    return res.json(dog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateBreed = async (id, data) => {
  const updatedBreed = await Dog.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedBreed;
};

const postBreed = async (req, res) => {
  try {
    const {
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      min_lifespan,
      max_lifespan,
      image,
      temperaments,
    } = req.body;
    const allBreeds = await getAllBreeds();
    const isBreed = allBreeds.find(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    );
    if (!isBreed) {
      const newBreed = new Dog({
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        min_lifespan,
        max_lifespan,
        image,
        temperaments,
      });

      const breedCreated = await newBreed.save();
      res.status(200).json(breedCreated);
    } else {
      res.status(404).send("Error to update the name already exist");
    }
  } catch (error) {
    res.status(500).send(error, "Error to update");
  }
};
module.exports = {
  getAllBreeds,
  postBreed,
  deleteBreed,
  updateBreed,
  getBreedById,

  searchBreed,
};

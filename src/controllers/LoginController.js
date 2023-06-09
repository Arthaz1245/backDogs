const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../models/User");

const { getAllBreeds } = require("./DogController");
const genAuthToken = require("../../utils/genAuthToken");

const signing = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(3).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password..");
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or password..");
  const token = genAuthToken(user);
  res.send(token);
};
const addFavoritesBreed = async (req, res) => {
  const { userId, breed } = req.body;
  const breedId = breed.id ? breed.id : breed._id;
  const breedsDatabase = await getAllBreeds();
  if (breedId) {
    let breedExist = breedsDatabase.find(
      (b) => b.id === Number(breedId) || b.id === String(breedId)
    );

    const user = await User.findById(userId);

    if (!breedExist) {
      return res.status(400).send("Invalid breed. It doesn't exist");
    }
    const included = user.favorites.filter(
      (b) => b.id === Number(breedId) || b.id === String(breedId)
    );
    console.log(included.length);
    if (!included.length) {
      await user.updateOne({ $push: { favorites: breed } });
      console.log(user.favorites);
      res.status(200).json("Add to favorites");
    } else {
      return res.status(400).send("Invalid already added");
    }
  } else {
    return res.status(400).send("Invalid there is not an id");
  }
};
const removeFavoriteBreed = async (req, res) => {
  const { userId, breed } = req.body;
  const breedId = breed.id ? breed.id : breed._id;
  const breedsDatabase = await getAllBreeds();

  if (breedId) {
    let breedExist = breedsDatabase.find(
      (b) => b.id === Number(breedId) || b.id === String(breedId)
    );

    const user = await User.findById(userId);

    if (!breedExist) {
      return res.status(400).send("Invalid breed. It doesn't exist");
    }
    const included = user.favorites.filter(
      (b) => b.id === Number(breedId) || b.id === String(breedId)
    );
    console.log(included.length);
    if (included.length) {
      await user.updateOne({ $pull: { favorites: breed } });
      res.status(200).json("Remove from favorites");
    } else {
      return res.status(400).send("Invalid already remove");
    }
  } else {
    return res.status(400).send("Invalid there is not an id");
  }
};
const getFavoritesByUser = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  const userFavorite = user.favorites;
  return res.status(200).json(userFavorite);
};
module.exports = {
  signing,
  addFavoritesBreed,
  removeFavoriteBreed,
  getFavoritesByUser,
};

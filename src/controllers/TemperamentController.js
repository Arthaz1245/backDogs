const Temperament = require("../models/temperament"); // Assuming you have a "temperament.js" model in a "models" folder
const axios = require("axios");
const { API_KEY } = process.env;

const getTemperaments = async () => {
  try {
    const apiData = await axios.get(
      `https://api.thedogapi.com/v1/breeds?apiKey=${API_KEY}`
    );

    const apiTemperament = apiData.data.map((el) => el.temperament);
    const temperamentsEach = apiTemperament
      .map((t) => (t === undefined ? [] : t.split(", ")))
      .join()
      .split(",")
      .filter((el) => el !== "");

    temperamentsEach.forEach(async (el) => {
      try {
        await Temperament.findOneAndUpdate(
          { name: el },
          { name: el },
          { upsert: true }
        );
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTemperaments,
};

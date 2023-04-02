const Temperament = require("../models/Temperament"); // Assuming you have a "temperament.js" model in a "models" folder
const axios = require("axios");
const { API_KEY } = process.env;

const getTemperaments = async () => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?apiKey=${API_KEY}`
    );
    const breeds = response.data;
    const temperaments = new Set();

    breeds.forEach((breed) => {
      const breedTemperaments = breed.temperament?.split(", ");
      if (breedTemperaments) {
        breedTemperaments.forEach((temp) => temperaments.add(temp.trim()));
      }
    });

    const promises = [];

    for (let temp of temperaments) {
      const existingTemp = await Temperament.findOne({ name: temp });
      if (!existingTemp) {
        const newTemp = new Temperament({ name: temp });
        promises.push(newTemp.save());
      }
    }

    await Promise.all(promises);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

module.exports = {
  getTemperaments,
};

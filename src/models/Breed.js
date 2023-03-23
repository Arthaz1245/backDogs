const mongoose = require("mongoose");

// Exportamos una funcion que define el modelo

const breedSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    min_height: {
      type: Number,
      required: true,
    },
    max_height: {
      type: Number,
      required: true,
    },
    min_weight: {
      type: Number,
      required: true,
    },
    max_weight: {
      type: Number,
      required: true,
    },
    min_lifespan: {
      type: Number,
    },
    max_lifespan: {
      type: Number,
    },
    image: {
      type: String,
    },
    temperaments: [
      {
        type: String,
        default: [],
        enum: [],
      },
    ],
    createdInDB: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { versionKey: false }
);
const Breed = mongoose.model("Breed", breedSchema);
module.exports = Breed;

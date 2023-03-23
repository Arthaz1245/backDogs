const mongoose = require("mongoose");

const temperamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false }
);

const Temperament = mongoose.model("Temperament", temperamentSchema);

module.exports = Temperament;

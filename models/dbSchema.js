const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    resourceType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false }
);

const attackSchema = mongoose.Schema(
  {
    attackType: {
      type: String,
      required: true,
    },
    attackNum: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false }
);

const defenseSchema = mongoose.Schema(
  {
    defenseType: {
      type: String,
      required: true,
    },
    defenseNum: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false }
);

const levelSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      required: true,
    },
    attack: [attackSchema],
    defense: [defenseSchema],
    costToBuild: [resourceSchema],
    upkeepCost: [resourceSchema],
  },
  { _id: false }
);

const UnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "Infantry",
      "Armored",
      "Support",
      "Helicopters",
      "Fighters",
      "Heavies",
      "Naval",
      "Submarines",
    ],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  doctrine: {
    type: String,
    required: true,
    enum: ["Eastern", "Western", "European"],
  },
  levels: [levelSchema],
});

const Unit = mongoose.model("Unit", UnitSchema);
module.exports = Unit;

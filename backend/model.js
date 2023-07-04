var mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  count: Number,
  url: String,
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;

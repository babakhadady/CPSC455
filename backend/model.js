var mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  count: Number,
  url: String,
  SKU: String,
});

const Card = mongoose.model("Card", cardSchema, "Cards");

module.exports = Card;

var express = require("express");
var router = express.Router();

const Card = require("../model");

let cards = [
  {
    name: "Bike",
    description: "a nice bike",
    price: "100",
    count: 1,
    url: "https://cdn.shopify.com/s/files/1/0541/0154/1047/products/0711964_b_1200x1200.jpg?v=1614971567",
  },
  {
    name: "Candy",
    description: "a delicious treat",
    price: "3",
    count: 1,
    url: "https://assets.shop.loblaws.ca/products/21210265/b1/en/front/21210265_front_a01_@2.png",
  },
  {
    name: "Dog",
    description: "a good boy",
    price: "10",
    count: 1,
    url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
  },
];

/* GET cards. */
router.get("/", async function (req, res) {
  const cards = await Card.find({});
  res.status(200);
  res.send(cards);
});

/* GET card */
router.get("/:card", async function (req, res) {
  const card = await Card.findOne({ name: req.params.card });
  res.status(200);
  return res.send(card);
});

/* POST a card */
router.post("/", async function (req, res) {
  let card = new Card(req.body);
  card["SKU"] = makeSKU();
  await card.save();
  res.status(201);
  return res.send(card);
});

/* DELETE a card */
router.delete("/:card", async function (req, res) {
  await Card.deleteOne({ name: req.params.card });
  res.status(204);
  res.send();
});

/* PATCH increment a card*/
router.patch("/add/:card", async function (req, res) {
  await Card.updateOne({ name: req.params.card }, { $inc: { count: 1 } });
  const card = await Card.findOne({ name: req.params.card });
  res.status(200);
  res.send(card);
});

/* PATCH decrement a card*/
router.patch("/remove/:card", async function (req, res) {
  await Card.updateOne({ name: req.params.card }, { $inc: { count: -1 } });
  const card = await Card.findOne({ name: req.params.card });
  res.status(200);
  res.send(card);
});

function makeSKU() {
  let SKU = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 8; i++) {
    SKU += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return SKU;
}

module.exports = router;

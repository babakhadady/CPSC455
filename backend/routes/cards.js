var express = require("express");
var router = express.Router();

const Card = require("../model");

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

/* GET total count */
router.get("/count/all", async function (req, res) {
  console.log("RAN");
  let count = await Card.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: "$count" },
      },
    },
  ]);

  res.status(200);
  res.send(count);
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

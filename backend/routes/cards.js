var express = require("express");
var router = express.Router();
const { v4: uuid } = require("uuid");

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

let cardsUUID = [
  {
    name: "Bike",
    uuid: uuid(),
  },
  {
    name: "Candy",
    uuid: uuid(),
  },
  {
    name: "Dog",
    uuid: uuid(),
  },
];

/* GET cards. */
router.get("/", function (req, res) {
  res.status(200);
  res.send(cards);
});

/* GET card */
router.get("/:card", function (req, res) {
  let card = cardsUUID.find((card) => {
    return card.name === req.params.card;
  });

  res.status(200);
  return res.send(card);
});

/* POST a card */
router.post("/", function (req, res) {
  let card = req.body;
  cards.push(card);
  cardsUUID.push({ name: card.name, uuid: uuid() });
  res.status(201);
  return res.send(card);
});

/* DELETE a card */
router.delete("/:card", function (req, res) {
  let name = req.params.card;

  cards = cards.filter((card) => {
    return card.name !== name;
  });

  cardsUUID = cardsUUID.filter((card) => {
    return card.name !== name;
  });

  res.status(204);
  res.send();
});

/* PATCH increment a card*/
router.patch("/add/:card", function (req, res) {
  let name = req.params.card;
  let card = cards.find((card) => {
    return card.name === name;
  });

  card.count++;
  res.status(200);
  res.send(card);
});

/* PATCH decrement a card*/
router.patch("/remove/:card", function (req, res) {
  let name = req.params.card;
  let card = cards.find((card) => {
    return card.name === name;
  });

  card.count--;
  res.status(200);
  res.send(card);
});

module.exports = router;

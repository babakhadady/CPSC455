import app from "../app";
const request = require("supertest");
var mongoose = require("mongoose");

require("dotenv").config();

beforeAll(async () => {
  await databaseConnection();
});

afterAll(async () => {
  await closeDatabaseConnection();
});

afterEach(async () => {
  await clearDatabase();
});

describe("card tests", () => {
  describe("add card tests", () => {
    test("should respond with status 200", async () => {
      const response = await postCard({
        name: "Dogg",
        description: "a good Dog",
        price: "10",
        count: 1,
        url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
      });
      expect(response.statusCode).toBe(201);
    });

    test("should add card correctly", async () => {
      const response = await postCard({
        name: "Dogg",
        description: "a good Dog",
        price: "10",
        count: 1,
        url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
      });

      expect(response.body.name).toBe("Dogg");
      expect(response.body.description).toBe("a good Dog");
      expect(response.body.url).toBe(
        "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g"
      );
    });
  });

  describe("get cards tests", () => {
    test("should respond with status 200", async () => {
      const response = await getCards();
      expect(response.statusCode).toBe(200);
    });

    test("should contain no cards", async () => {
      const response = await getCards();
      expect(response.body).toStrictEqual([]);
    });

    test("should add only one card", async () => {
      const response = await postCard({
        name: "Dogg",
        description: "a good Dog",
        price: "10",
        count: 1,
        url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
      }).then(() => {
        return getCards();
      });

      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe("Dogg");
      expect(response.body[0].description).toBe("a good Dog");
      expect(response.body[0].url).toBe(
        "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g"
      );
    });
  });

  describe("delete cards tests", () => {
    test("should properly delete card", async () => {
      const response = await postCard({
        name: "Dogg",
        description: "a good Dog",
        price: "10",
        count: 1,
        url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
      })
        .then(() => {
          return deleteCard("Dogg");
        })
        .then(() => {
          return getCards();
        });

      expect(response.body.length).toBe(0);
    });

    test("should delete correct cards", async () => {
      const response = await postCard({
        name: "Dogg",
        description: "a good Dog",
        price: "10",
        count: 1,
        url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
      })
        .then(() => {
          return postCard({
            name: "Dodo",
            description: "hmm",
            price: "5",
            count: 1,
            url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
          });
        })
        .then(() => {
          return deleteCard("Dogg");
        })
        .then(() => {
          return getCards();
        });

      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe("Dodo");
      expect(response.body[0].description).toBe("hmm");
      expect(response.body[0].url).toBe(
        "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g"
      );
    });
  });
  describe("increment card tests", () => {
    test("should properly increment a card", async () => {
      const response = await postCard({
        name: "Dogg",
        description: "a good Dog",
        price: "10",
        count: 1,
        url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
      }).then(() => {
        return request(app).patch("/cards/add/Dogg");
      });

      expect(response.body.name).toBe("Dogg");
      expect(response.body.count).toBe(2);
      expect(response.body.description).toBe("a good Dog");
      expect(response.body.price).toBe(10);
    });
  });
});

async function deleteCard(name) {
  return request(app).delete("/cards/" + name);
}
async function postCard(card) {
  return request(app).post("/cards").send(card);
}

async function getCard(name) {
  return request(app).get("/cards/" + name);
}

async function getCards() {
  return request(app).get("/cards");
}

async function databaseConnection() {
  let client = await mongoose.connect(`${process.env.MONGODB_URI}`);
}

async function closeDatabaseConnection() {
  await mongoose.connection.close();
}

async function clearDatabase() {
  await request(app).delete("/cards/cards/all");
}

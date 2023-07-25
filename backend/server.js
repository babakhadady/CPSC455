var mongoose = require("mongoose");
var app = require("./app")
require("dotenv").config();
const PORT = process.env.PORT || 3001;

connect();

async function connect() {
  try {
    let client = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Successful Connection");

    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  } catch (e) {
    console.log("Connection Failed");
    console.log(e);
  }
}

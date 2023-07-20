var createError = require("http-errors");
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var cardsRouter = require("./routes/cards");
var app = express();

const PORT = process.env.PORT || 3001;
require("dotenv").config();

connect();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/cards", cardsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

async function connect() {
  try {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });

    console.log(process.env.MONGODB_URI);
    client = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successful Connection");
  } catch (e) {
    console.log("Connection Failed");
    console.log(e);
  }
}

module.exports = app;

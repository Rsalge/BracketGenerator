const api = require("./api");
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config({ path: "../env.env" });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/build")));
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Accept",
    "Authorization",
    "Origin",
    "jwt"
  );
  next();
});

app.use(
  session({
    secret: "tourney",
    store: new MongoStore({ mongooseConnection: db }),
    resave: false,
    saveUninitialized: false
  })
);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});
// routes calls to the server/api endpoint
app.use("/api", api);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Running on ", port);
});

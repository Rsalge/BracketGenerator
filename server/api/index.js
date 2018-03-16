const router = require("express").Router();
const path = require("path");
const Player = require("../../db/index.js");
require("dotenv").config({ path: "../../env.env" });

router.get("/hello", (req, res) => {
  res.send("<div>Hello</div>");
});

router.post("/addPlayer", (req, res) => {
  Player.findOne({ name: req.data }, (err, player) => {
    if (player) {
      console.log("player found", player);
    } else {
      console.log("no player found");
    }
  });
  res.send("Player added");
});

module.exports = router;

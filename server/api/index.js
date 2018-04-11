const router = require("express").Router();
const path = require("path");
const Player = require("../../db/index.js");
require("dotenv").config({ path: "../../env.env" });

router.get("/allPlayers", (req, res) => {
  Player.find({}, (err, allPlayers) => {
    if (err) {
      res.send(err);
    }
    if (allPlayers) {
      console.log("FOUND ALL PLAYERS: ", allPlayers);
      res.send(allPlayers);
    } else {
      console.log("no players found");
    }
  });
});

router.post("/addPlayer", (req, res) => {
  let name = req.body.name;
  console.log("Player info: ", name);
  Player.findOne({ name: name }, (err, player) => {
    if (!player) {
      let newPlayer = new Player();
      newPlayer.name = name;
      newPlayer.save(err => {
        if (err) {
          console.log("New player creation error: ", err);
        } else {
          console.log("New player saved", newPlayer);
        }
      });
    } else {
      console.log("player found");
    }
  });
  res.send("Player added");
});

module.exports = router;

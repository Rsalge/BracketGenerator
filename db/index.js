const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  games: {
    wins: {
      type: Number
    },
    totalCount: {
      type: Number
    }
  },

  ability: {
    type: String
  },

  doNotPair: {
    type: Array
  },

  team: {
    type: Array
  }
});

const Player = mongoose.model("player", PlayerSchema);

Player.getAllPlayers = () => {
  return Player.find({}, "name")
    .exec()
    .then(Player => Player)
    .catch(err => err);
};

Player.addPlayer = () => {};
// Player.getPlayerPlaylists = spotifyPlayerId =>
//   Player.find(
//     { spotifyId: spotifyPlayerId },
//     {
//       "playlists.playlistName": 1,
//       "playlists.spotifyPlaylistID": 1,
//       "playlists.spotifyPlaylistURI": 1
//     }
//   ).exec();

// Player.getAPlaylist = (spotifyPlayerId, playlistName) =>
//   Player.find(
//     {
//       spotifyId: spotifyPlayerId
//     },
//     {
//       playlists: { $elemMatch: { playlistName: playlistName } }
//     }
//   );

// Player.populateAPlaylist = PlayerArray =>
//   Player.find(
//     { spotifyId: { $in: PlayerArray } },
//     { spotifyId: 1, currentMySong: 1, mySongPlayername: 1 }
//   );

// Player.createPlaylist = (spotifyPlayerId, newPlaylist) =>
//   Player.update(
//     { spotifyId: spotifyPlayerId },
//     {
//       $push: {
//         playlists: newPlaylist
//       }
//     }
//   );

// Player.getCurrentSong = spotifyId =>
//   Player.find({ spotifyId })
//     .select("currentMySong")
//     .exec()
//     .then(res => res)
//     .catch(err => err);

// Player.getFollowing = spotifyId => {
//   return Player.find({ spotifyId })
//     .select("following")
//     .exec()
//     .then(res => res)
//     .catch(err => err);
// };

// Player.removeFollow = (currentPlayerSpotifyId, removeSpotifyId) => {
//   return Player.update(
//     {
//       spotifyId: currentPlayerSpotifyId
//     },
//     {
//       $pull: { following: { spotifyId: removeSpotifyId } }
//     }
//   ).exec();
// };

// Player.deletePlaylist = (currentPlayerSpotifyId, playlistName) => {
//   return Player.update(
//     {
//       spotifyId: currentPlayerSpotifyId
//     },
//     {
//       $pull: { playlists: { playlistName: playlistName } }
//     }
//   ).exec();
// };

// Player.populateFollowing = following => {
//   const followingIds = following.map(follow => {
//     // eslint-disable-line
//     return follow.spotifyId;
//   });
//   return Player.find({ spotifyId: { $in: followingIds } })
//     .select("spotifyId mySongPlayername currentMySong")
//     .exec();
// };

// Player.addToFollowing = (currentPlayerId, idToAdd) =>
//   Player.findOneAndUpdate(
//     { spotifyId: currentPlayerId },
//     { $push: { following: { spotifyId: idToAdd } } }
//   )
//     .exec()
//     .then(res => res)
//     .catch(err => err);

// Player.changeCurrentSong = (spotifyId, mySong) => {
//   return Player.update(
//     { spotifyId: spotifyId },
//     {
//       $set: {
//         currentMySong: mySong
//       }
//     }
//   )
//     .exec()
//     .then(res => {
//       return res;
//     })
//     .catch(err => {
//       console.log("error is ", err);
//       return err;
//     });
// };

// Player.getPlayer = spotifyId => {
//   return Player.findOne({ spotifyId: spotifyId })
//     .exec()
//     .then(Player => {
//       return Player;
//     })
//     .catch(err => err);
// };

// Player.updatePlaylist = (spotifyId, originalName, newPlaylist) => {
//   return Player.update(
//     { spotifyId: spotifyId, "playlists.playlistName": originalName },
//     {
//       $set: {
//         "playlists.$": newPlaylist
//       }
//     }
//   )
//     .exec()
//     .then(res => {
//       return res;
//     })
//     .catch(err => {
//       console.log("error is ", err);
//       return err;
//     });
// };

// Player.search = query =>
//   Player.find({}, "mySongPlayername spotifyId")
//     .exec()
//     .then(Players => Players)
//     .catch(err => err);

module.exports = Player;

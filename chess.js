let https = require("https");
let { EventEmitter } = require("events");

let emitter = new EventEmitter();
let currentPlayers = [];

exports.emitter = emitter;

function getLatestGames() {
  https
    .request(
      {
        host: "lichess.org",
        path: "/tv/feed",
      },
      (res) => {
        res.on("data", (chunk) => {
          try {
            let data = JSON.parse(chunk.toString());

            if (data.d.players) {
              currentPlayers = data.d.players;
            }

            emitter.emit("update", {
              fen: data.d.fen,
              players: currentPlayers,
            });
          } catch (e) {
            console.error(e);
          }
        });
        res.on("end", (chunk) => {
          console.error(`Restarting at ${new Date()}`);
          getLatestGames();
        });
      }
    )
    .end();
}

getLatestGames();

let blessed = require("blessed");
let telnet = require("telnet2");
let { emitter } = require("./chess.js");

function boxOfFen(fen, parent) {
  let container = blessed.box({
    parent,
    width: 8,
    height: 8,
  });

  let board = fen.split("/").map((line) =>
    line
      .replace(/\d/g, (n) => Array.from({ length: parseInt(n) + 1 }).join(" "))
      .replace(/K/g, "♔")
      .replace(/Q/g, "♕")
      .replace(/R/g, "♖")
      .replace(/B/g, "♗")
      .replace(/N/g, "♘")
      .replace(/P/g, "♙")
      .replace(/k/g, "♚")
      .replace(/q/g, "♛")
      .replace(/r/g, "♜")
      .replace(/b/g, "♝")
      .replace(/n/g, "♞")
      .replace(/p/g, "♟")
  );

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      blessed.box({
        parent: container,
        width: 2,
        height: 1,
        top: i,
        left: 2 * j,
        style: {
          bg:
            i % 2 === 0
              ? j % 2 === 0
                ? "white"
                : "yellow"
              : j % 2 === 0
              ? "yellow"
              : "white",
          fg: "black",
        },
        content: board[i][j],
      });
    }
  }

  return container;
}

telnet({ tty: true }, function (client) {
  client.on("term", function (terminal) {
    screen.terminal = terminal;
    screen.render();
  });

  client.on("size", function (width, height) {
    client.columns = width;
    client.rows = height;
    client.emit("resize");
  });

  var screen = blessed.screen({
    smartCSR: true,
    input: client,
    output: client,
    terminal: "xterm-256color",
    fullUnicode: true,
  });

  function onMove({ fen, players }) {
    let container = blessed.box({
      parent: screen,
      width: "100%",
    });

    let board = blessed.box({
      parent: container,
      left: "50%-18",
      top: "50%-4",
    });

    boxOfFen(fen.split(" ")[0], board);

    blessed.box({
      parent: container,
      left: "50%+2",
      top: "center",
      height: 2,
      tags: true,
      content: [
        `• {#d59020-fg}${
          players[0].user.title ? players[0].user.title + " " : ""
        }{/}${players[0].user.name} {#d1e4f6-fg}${players[0].rating}{/}`,
        `◦ {#d59020-fg}${
          players[1].user.title ? players[1].user.title + " " : ""
        }{/}${players[1].user.name} {#d1e4f6-fg}${players[1].rating}{/}`,
      ].join("\n"),
    });

    screen.data.main = container;
    screen.render();
  }

  client.on("close", function () {
    if (!screen.destroyed) {
      screen.destroy();
    }
    emitter.off("update", onMove);
  });

  // TODO: get the latest `update` on start so we don't need
  // to wait for a move
  emitter.on("update", onMove);

  screen.key(["C-c", "q"], function (ch, key) {
    screen.destroy();
  });

  screen.on("destroy", function () {
    if (client.writable) {
      client.destroy();
    }
    emitter.off("update", onMove);
  });
}).listen(23);

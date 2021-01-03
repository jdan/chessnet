## chessnet

[Lichess](https://lichess.org) games over telnet.

![chess](https://user-images.githubusercontent.com/287268/103469453-25560f80-4d33-11eb-99ca-dbb747986afc.gif)

### try it out

```
telnet chess.jordanscales.com
```

### running your own

```sh
PORT=1234 node main.js
# in another terminal: telnet localhost 1234
```

As-is this service streams the current "tv" game using the [Lichess API](https://lichess.org/api#operation/tvFeed), but you are welcome to fork and modify it to stream whichever games you'd like!

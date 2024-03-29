## chessnet

[Lichess](https://lichess.org) games over telnet (and http!)

![chess](https://user-images.githubusercontent.com/287268/103469453-25560f80-4d33-11eb-99ca-dbb747986afc.gif

### running your own

```sh
TELNET_PORT=1234 HTTP_PORT=1235 node main.js
# in another terminal: telnet localhost 1234, curl localhost:1235
```

Alternatively, you can run `npm start` which will run on the default port (23) and use [forever](https://www.npmjs.com/package/forever) because my code crashes a lot.

As-is this service streams the current "tv" game using the [Lichess API](https://lichess.org/api#operation/tvFeed), but you are welcome to fork and modify it to stream whichever games you'd like!

## chessnet

[Lichess](https://lichess.org) games over telnet.

### running your own

```
docker run -d -p 23:23 jdan/chessnet:latest
# in your terminal: telnet localhost 23
# feel free to change the port (i.e. `-p 1234:23` then telnet to port 1234)
```

As-is this service streams the current "tv" game using the [Lichess API](https://lichess.org/api#operation/tvFeed), but you are welcome to fork and modify it to stream whichever games you'd like!

const express = require("express");
const app = express();

const server = require("https").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);
// routes
app.get("/", (req, res) => {
  res.send("running routes testinnnnnnnnnnnnnnng");
});

io.on("connection", (socket) => {
  console.log("use connected");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);

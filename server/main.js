var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = [
  {
    id: 1,
    text: "Hola soy un mensaje",
    author: "First Bot",
  },
];

app.use(express.static("public"));

app.get("/hello", function (req, res) {
  res.status(200).send("Hello World!!");
});

io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");
  socket.emit("messages", messages);

  socket.on("new-message", function (data) {
    messages.push(data);

    io.sockets.emit("messages", messages);
  });
});

const SERVER_PORT = 8080

server.listen(SERVER_PORT, function () {
  console.log(`Servidor corriendo en http://localhost:${SERVER_PORT}`);
});
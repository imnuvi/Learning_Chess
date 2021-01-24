
const http = require('http');
const express = require('express');
const socketIo = require('socket-io');

const app = express();

const port = process.env.PORT || 4001;
const index = require("./routes/index")

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

// const listener = app.listen(3000);

let interval;
io.on("connection",(socket) => {
  console.log("new clinet connected");
  if (interval ){
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on("disconnect", () => {
    console.log("client disconnected");
    clearInterval(inteval);
  })
})


console.log("hello there");

const getApiAndEmit = (socket) => {
 const response = new Date();
 socket.emit("FromApi",response);
};

server.listen(port, () => console.log(`listening on port ${port}`));

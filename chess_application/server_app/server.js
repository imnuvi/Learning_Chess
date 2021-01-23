
const http = require('http');
const express = require('express');
const socketIo = require('socket-io');

const app = express();

const port = process.env.PORT || 4001;
const index = require(./routes/index)

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

// const listener = app.listen(3000);

const getApiAndEmit = "Todo";
console.log("hello there")

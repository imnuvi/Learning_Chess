
const express = require('express');
const socketIo = require('socket-io');

const app = express();
const listener = app.listen(3000);

console.log("hello there")

require("dotenv/config");

const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: "*",
  },
});
console.log("Listening on port: " + process.env.PORT);
let calledNumbers = [];

// Initializes Socket IO
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  // When the page initially loads, send server data.
  socket.on("homepage-request-numbers", () => {
    io.emit("get-numbers-homepage", calledNumbers);
  });

  socket.on("controls-request-numbers", () => {
    io.emit("get-numbers-controls", calledNumbers);
  });

  // This handles numbers being sent
  socket.on("request-send-number", (number) => {
    let newList = calledNumbers;
    newList.push(number);
    calledNumbers = newList;
    console.log(calledNumbers);
    io.emit("send-number", number);
    socket.broadcast.emit("update-numbers", calledNumbers);
  });
  // This handles numbers being removed
  socket.on("request-remove", (number) => {
    let newList = calledNumbers;
    const index = newList.indexOf(number);
    newList.splice(index, 1);
    calledNumbers = newList;
    console.log(calledNumbers);
    socket.broadcast.emit("update-numbers", calledNumbers);
    io.emit("remove-number", number);
  });
  // This handles board clears
  socket.on("request-clear", () => {
    calledNumbers = [];
    socket.broadcast.emit("update-numbers", calledNumbers);
    io.emit("clear-board");
  });
  // This handles bingo calls
  socket.on("request-call-bingo", () => {
    io.emit("call-bingo");
  });
});

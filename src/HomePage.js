import { io } from "socket.io-client";
import CardList from "./CardList/CardList";

const HomePage = () => {
  let numberList = [];
  let socket = "";
  socket = io(process.env.REACT_APP_PRODUCTION_SERVER_IP);



  socket.on("connect", () => {
    console.log(`You connected with id: ${socket.id}`);
    // Requests Bingo data from server on page load
    socket.emit("homepage-request-numbers");
  });

  // Catches bingo data from server and updates, this is only on initial page load
  socket.on("get-numbers-homepage", (array) => {
    console.log("Initializing board state...");
    numberList.forEach((num) => {
      if ((num >= 16 && num <= 30) || (num >= 46 && num <= 60))
        document.getElementById(num.toString()).style.background =
          "rgb(45, 212, 191)";
      else document.getElementById(num.toString()).style.background = "#007079";
    });
    array.forEach((number) => {
      document.getElementById(number).style.backgroundColor = "#72253d";
    });
    numberList = array;
  });

  // Receives number from server and calls the number
  socket.on("send-number", (number) => {
    console.log(`Setting number: ${number}`);
    if (numberList.includes(number)) {
      document.getElementById(number).style.backgroundColor = "#72253d";
      return console.log("Number called twice");
    }
    let letter = "";
    if (number >= 1 && number <= 15) letter = "B";
    if (number >= 16 && number <= 30) letter = "I";
    if (number >= 31 && number <= 45) letter = "N";
    if (number >= 46 && number <= 60) letter = "G";
    if (number >= 61 && number <= 75) letter = "O";

    let newList = numberList;
    newList.push(number);

    document.getElementById(number).style.backgroundColor = "#72253d";
    document.getElementById("fadingDiv").classList.remove("fading-div");
    setTimeout(() => {
      document.getElementById(
        "fadingDivChild"
      ).textContent = `${letter}-${number}`;
      document.getElementById("fadingDivChild").style.fontSize = "60vh";
      document.getElementById("fadingDiv").classList.add("fading-div");
    }, 400);
  });

  // Gets undo number from server and removes number
  socket.on("remove-number", (number) => {
    console.log(`Removing: ${number}`);
    document.getElementById("fadingDiv").classList.remove("fading-div");
    if ((number >= 16 && number <= 30) || (number >= 46 && number <= 60))
      document.getElementById(number.toString()).style.background =
        "rgb(45, 212, 191)";
    else
      document.getElementById(number.toString()).style.background = "#007079";
    let newList = numberList;
    const index = newList.indexOf(number);
    newList.splice(index, 1);
    numberList = newList;
  });

  // Gets bingo calls from server and calls bingo
  socket.on("call-bingo", () => {
    console.log("Bingo called");
    document.getElementById("fadingDiv").classList.remove("fading-div");
    setTimeout(() => {
      document.getElementById("fadingDivChild").textContent = "BINGO";
      document.getElementById("fadingDivChild").style.fontSize = "40vh";
      document.getElementById("fadingDiv").classList.add("fading-div");
    }, 1000);
  });

  // Gets board clear from server and clears board
  socket.on("clear-board", () => {
    console.log("Clearing board");
    document.getElementById("fadingDiv").classList.remove("fading-div");

    numberList.forEach((num) => {
      if ((num >= 16 && num <= 30) || (num >= 46 && num <= 60))
        document.getElementById(num.toString()).style.background =
          "rgb(45, 212, 191)";
      else document.getElementById(num.toString()).style.background = "#007079";
    });
    numberList = [];
  });

  return (
    <>
    <div className="h-full w-full overflow-hidden">

      <div
        id="fadingDiv"
        className="absolute table opacity-0 w-full h-full bg-jcaqua text-white over"
        >
        <div
          id="fadingDivChild"
          className="table-cell text-[40vh] align-middle text-center"
          ></div>
      </div>
      <div className="flex h-full w-full justify-center  items-center p-[2px]">
        <div className="flex flex-col items-center justify-center h-full bg-black w-[93%]">
          <CardList />
        </div>
      </div>
          </div>
    </>
  );
};

export default HomePage;

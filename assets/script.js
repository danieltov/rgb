// TODO:
// Convert to jQuery
// organize better
// allow user to set numSquares?

console.log("CONNECTED!");

// The Variables

var numSquares = 6;
var colors = [];
var pickedColor;
var h1 = document.querySelector("h1");
var colorDisplay = document.getElementById("colorDisplay");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var messageDisplay = document.querySelector("#message");
createSquares();
var squares = document.querySelectorAll(".square");

// Initialize game
init();

// The Functions

function init() {
  setResetButton();
  setModeButtons();
  setSquares();
  reset();
}

function setResetButton() {
  resetButton.addEventListener("click", function() {
    reset();
  });
}

function generateRandomColors(num) {
  // make an array
  var arr = [];
  // repeat num times
  for (var i = 0; i < num; i++) {
    // get random color and push into array
    arr.push(randomColor());
  }
  // return that array
  return arr;
}

function randomColor() {
  // pick a "red" from 0 - 255
  var r = Math.floor(Math.random() * 256);
  // pick a "green" from 0 - 255
  var g = Math.floor(Math.random() * 256);
  // pick a "blue" from 0 - 255
  var b = Math.floor(Math.random() * 256);
  // return + synthesize vars into single string "rgb(r, g, b)"
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function changeColors(color) {
  // loop through all squares
  for (var i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  // pick a random whole number
  var random = Math.floor(Math.random() * colors.length);
  // return number in color array
  return colors[random];
}

function setModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  }
}

function createSquares() {
  // initialize loop
  const cont = document.querySelector("#container");
  const html = '<div class="square"></div>';
  let str = "";

  for (let i = 0; i < numSquares; i++) {
    // create string with <div class="square"></div> * numSquares
    str += html;
  }

  return (cont.innerHTML = str);
}

function setSquares() {
  for (var i = 0; i < squares.length; i++) {
    // add click listeners
    squares[i].addEventListener("click", function() {
      // grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      // compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(pickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again!";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again!";
      }
    });
  }
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match pickedColor
  colorDisplay.textContent = pickedColor;
  // change h1 background back to default and remove message
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}

/**
 * @typedef {Object} Cell
 * @property {boolean} isAlive
 * @property {number} color
 */

const unitLength = 20;
const strokeColor = 50;
const keyboardCursor = {
  isKeyboard: false,
  isPressedAlive: false,
  direction: undefined,
  x: 0,
  y: 0,
};
const keyboardMapping = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

let columns;
let rows;
let isGameStart = false;

/** @type {Cell[][]} */
let currentBoard;
/** @type {Cell[][]} */
let nextBoard;

document.querySelector("#btnStart").addEventListener("click", (e) => {
  isGameStart = !isGameStart;
  e.target.innerText = isGameStart ? "Stop" : "Start";
});

document.querySelector("#btnReset").addEventListener("click", (e) => {
  initGame();
});

// You can set different color here
const CELL_COLOR_MAP = Object.freeze({
  ALIVE: 155,
  DIE: 255,
  ALONE: 200,
  OVER_POP: 188,
});

const createCell = (alive = false) => ({
  isAlive: alive,
  color: alive ? CELL_COLOR_MAP.ALIVE : CELL_COLOR_MAP.DIE,
});

function initGame() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = createCell();
      nextBoard[i][j] = createCell();
    }
  }
}

function updateUI() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      fill(currentBoard[i][j].color);
      stroke(strokeColor);
      rect(i * unitLength, j * unitLength, unitLength, unitLength);
    }
  }

  if (keyboardCursor.isKeyboard) {
    fill("green");
    circle(
      keyboardCursor.x * unitLength + unitLength / 2,
      keyboardCursor.y * unitLength + unitLength / 2,
      unitLength,
      unitLength
    );
  }
}

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;
      for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {
          if (i === 0 && j === 0) {
            // the cell itself is not its own neighbor
            continue;
          }
          // The modulo operator is crucial for wrapping on the edge
          if (
            currentBoard[(x + i + columns) % columns][(y + j + rows) % rows]
              .isAlive
          ) {
            neighbors++;
          }
        }
      }

      // Rules of Life
      if (currentBoard[x][y].isAlive && neighbors < 2) {
        // Die of Loneliness
        nextBoard[x][y].isAlive = false;
        nextBoard[x][y].color = CELL_COLOR_MAP.DIE;
      } else if (currentBoard[x][y].isAlive && neighbors > 3) {
        // Die of Overpopulation
        nextBoard[x][y].isAlive = false;
        nextBoard[x][y].color = CELL_COLOR_MAP.DIE;
      } else if (!currentBoard[x][y].isAlive && neighbors === 3) {
        // New life due to Reproduction
        nextBoard[x][y].isAlive = true;
        nextBoard[x][y].color = CELL_COLOR_MAP.ALIVE;
      } else {
        nextBoard[x][y] = { ...currentBoard[x][y] };
        if (nextBoard[x][y].isAlive) {
          nextBoard[x][y].color = Math.floor(nextBoard[x][y].color * 0.5);
        }
      }
    }
  }

  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

function setup() {
  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(windowWidth, windowHeight - 100);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }

  frameRate(10);

  // Now both currentBoard and nextBoard are array of array of undefined values.
  initGame(); // Set the initial values of the currentBoard and nextBoard
  updateUI();
}

function updateKeyboard() {
  if (!keyboardCursor.isKeyboard) {
    return;
  }

  switch (keyboardCursor.direction) {
    case "up":
      keyboardCursor.y = (keyboardCursor.y - 1 + rows) % rows;
      break;
    case "down":
      keyboardCursor.y = (keyboardCursor.y + 1 + rows) % rows;
      break;
    case "left":
      keyboardCursor.x = (keyboardCursor.x - 1 + columns) % columns;
      break;
    case "right":
      keyboardCursor.x = (keyboardCursor.x + 1 + columns) % columns;
      break;
  }

  if (keyboardCursor.isPressedAlive) {
    currentBoard[keyboardCursor.x][keyboardCursor.y].isAlive = true;
    currentBoard[keyboardCursor.x][keyboardCursor.y].color =
      CELL_COLOR_MAP.ALIVE;
  }
}

function draw() {
  background(255);

  if (isGameStart) {
    generate();
  }

  updateKeyboard();
  updateUI();
}

/**
 * When mouse is dragged
 */
function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }

  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  currentBoard[x][y].isAlive = true;
  currentBoard[x][y].color = CELL_COLOR_MAP.ALIVE;

  fill(currentBoard[x][y].color);
  stroke(strokeColor);
  rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
  noLoop();
  mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
  loop();
}

function keyPressed() {
  if (key === "Enter") {
    if (keyboardCursor.isKeyboard) {
      keyboardCursor.direction = undefined;
      keyboardCursor.x = 0;
      keyboardCursor.y = 0;
    }
    keyboardCursor.isKeyboard = !keyboardCursor.isKeyboard;
    return;
  }

  if (!keyboardCursor.isKeyboard) {
    return;
  }

  if (key === "p") {
    keyboardCursor.isPressedAlive = true;
    return;
  }
  if (keyboardMapping[key]) {
    keyboardCursor.direction = keyboardMapping[key];
  }
}

function keyReleased() {
  if (!keyboardCursor.isKeyboard) {
    return;
  }

  if (keyboardMapping[key] === keyboardCursor.direction) {
    keyboardCursor.direction = undefined;
  }
  if (key === "p") {
    keyboardCursor.isPressedAlive = false;
  }
}

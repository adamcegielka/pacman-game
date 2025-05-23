const board = ["pink", "blue", "green", "red", "purple", "orange"];
const myBoard = [];
const tempBoard = [
  1,1,1,1,1,1,1,1,1,1,
  1,2,3,2,2,2,2,2,2,1,
  1,2,1,1,1,1,1,1,2,1,
  1,2,2,2,2,2,2,2,2,1,
  1,2,1,1,1,1,1,1,2,1,
  1,2,2,2,2,2,2,2,2,1,
  1,2,1,1,1,1,1,1,2,1,
  1,2,2,2,2,2,2,2,2,1,
  1,2,2,2,2,2,2,2,2,1,
  1,1,1,1,1,1,1,1,1,1
];

const keyz = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false,
};
const ghosts = [];
const g = {
  x: "",
  y: "",
  h: 100,
  size: 10,
  ghosts: 6,
  inplay: false,
};
const player = {
  pos: 32,
  speed: 4,
  cool: 0,
  pause: false,
};

document.addEventListener("DOMContentLoaded", () => {
  g.grid = document.querySelector(".grid"); ///gameBoard
  g.pacman = document.querySelector(".pacman"); ///pacman
  g.eye = document.querySelector(".eye");
  g.mouth = document.querySelector(".mouth");
  g.ghost = document.querySelector(".ghost");
  g.ghost.style.display = "none";
  g.pacman.style.display = "none";
  createGame(); //create game board
  //console.log(g);
});

document.addEventListener("keydown", (e) => {
  console.log(e.code); // Key presses
  if (e.code in keyz) {
    keyz[e.code] = true;
  }
  if (!g.inplay && !player.pause) {
    g.pacman.style.display = "block";
    player.play = requestAnimationFrame(move);
    g.inplay = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code in keyz) {
    keyz[e.code] = false;
  }
});

function createGhost() {
  let newGhost = g.ghost.cloneNode(true);
  newGhost.pos = 11 + ghosts.length;
  newGhost.style.display = "block";
  newGhost.style.backgroundColor = board[ghosts.length];
  newGhost.namer = board[ghosts.length] + "y";
  ghosts.push(newGhost);
  console.log(newGhost);
}

function move() {
  if (g.inplay) {
    player.cool--; //player cooldown slowdown
    if (player.cool < 0) {
      //console.log(ghosts);
      //placing movement of ghosts
      ghosts.forEach((ghost) => {
        myBoard[ghost.pos].append(ghost);
      });
      //Keyboard events movement of player
      let tempPos = player.pos; //current pos
      if (keyz.ArrowRight) {
        player.pos += 1;
      } else if (keyz.ArrowLeft) {
        player.pos -= 1;
      } else if (keyz.ArrowUp) {
        player.pos -= g.size;
      } else if (keyz.ArrowDown) {
        player.pos += g.size;
      }
      let newPlace = myBoard[player.pos]; //future position
      if (newPlace.t == 1) {
        console.log("wall");
        player.pos = tempPos;
      }
      if (newPlace.t == 2) {
        console.log("dot");
        myBoard[player.pos].innerHTML = "";
        newPlace.t = 0;
      }
      player.cool = player.speed; // set cooloff

      console.log(newPlace.t);
    }
    myBoard[player.pos].append(g.pacman);
    player.play = requestAnimationFrame(move);
  }
}

function createGame() {
  for (let i = 0; i < g.ghosts; i++) {
    createGhost();
  }
  tempBoard.forEach((cell) => {
    //console.log(cell);
    createSquare(cell);
  });

  for (let i = 0; i < g.size; i++) {
    g.x += ` ${g.h}px `; //cell grid height
  }
  g.grid.style.gridTemplateColumns = g.x;
  g.grid.style.gridTemplateRows = g.x;
}

function createSquare(val) {
  const div = document.createElement("div");
  div.classList.add("box");
  if (val == 1) {
    div.classList.add("wall");
  } //add wall to element
  if (val == 2) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    div.append(dot);
  } //add dot
  if (val == 3) {
    const dot = document.createElement("div");
    dot.classList.add("superdot");
    div.append(dot);
  } //add superdot
  g.grid.append(div);
  myBoard.push(div);
  div.t = val; // element type of content
  div.idVal = myBoard.length;
  div.addEventListener("click", (e) => {
    console.dir(div);
  });
}

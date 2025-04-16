const board = ['pink', 'blue', 'green', 'red', 'purple', 'orange'];
const myBoard = [];
const ghosts = ['ghost1', 'ghost2', 'ghost3', 'ghost4', 'ghost5'];
const g = {
    x:'', y:'',h:100, size:25, ghosts: 5, inplay:false
}
const player = {
    pos:20, speed:4, cool:0, pause:false
}

document.addEventListener('DOMContentLoaded', () => {
    g.grid = document.querySelector('.grid'); // gameBoard
    g.pacman = document.querySelector('.pacman'); // pacman
    g.eye = document.querySelector('.eye'); // eye
    g.mouth = document.querySelector('.mouth'); // mouth
    g.ghost = document.querySelector('.ghost'); // ghost
    g.ghosts.style.display = 'none'; // hide ghosts

    console.log(g);
})
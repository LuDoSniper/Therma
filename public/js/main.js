import { WIDTH, HEIGHT } from "./config.js";
import { renderMap } from "./renderer.js";
import { createGrid, nextGeneration, setCell } from "./simulation.js";

const canvas = document.getElementById("simulation");
const ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

let grid = createGrid();
setCell(grid, 64, 36, 100);
renderMap(ctx, grid)
let gen = 0;
let running = false;

const step = () => {
    grid = nextGeneration(grid);
    gen++;
    renderMap(ctx, grid);
    updateGenerationDisplay();
}
const updateGenerationDisplay = () => {
    document.getElementById("generation").textContent = gen;
}

document.getElementById("playButton").addEventListener('click', () => {
    running = true;
});
document.getElementById("pauseButton").addEventListener('click', () => {
    running = false;
});
document.getElementById("resetButton").addEventListener('click', () => {
    grid = createGrid();
    gen = 0;
    renderMap(ctx, grid)
    updateGenerationDisplay();
});

const tick = setInterval(() => {
    if (running) step();
}, 150);

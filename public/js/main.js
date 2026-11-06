import { WIDTH, HEIGHT } from "./config.js";
import { renderMap } from "./renderer.js";
import { createGrid, createSources, nextGeneration, setSource, spawnRandomSource } from "./simulation.js";

const canvas = document.getElementById("simulation");
const ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

let grid = createGrid();
let sources = createSources();
let gen = 0;
let running = false;

setSource(sources, 64, 36, 180);
renderMap(ctx, grid)

const step = () => {
    spawnRandomSource(sources);

    grid = nextGeneration(grid, sources);
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
    sources = createSources();
    gen = 0;

    renderMap(ctx, grid)
    updateGenerationDisplay();
});

const tick = setInterval(() => {
    if (running) step();
}, 50);

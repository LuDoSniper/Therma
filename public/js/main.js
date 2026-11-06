import { WIDTH, HEIGHT } from "./config.js";
import { renderMap } from "./renderer.js";
import { createGrid, setCell } from "./simulation.js";

const canvas = document.getElementById("simulation");
const ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

const grid = createGrid();
setCell(grid, 64, 36, 100);
renderMap(ctx, grid);

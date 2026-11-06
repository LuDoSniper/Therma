import { WIDTH, HEIGHT, DIFFUSION, AMBIENT_TEMP, COOLING, MAX_TEMP, MIN_TEMP } from "./config.js";

export const createGrid = () => {
    return new Float32Array(WIDTH * HEIGHT);
};

export const createSources = () => {
    return new Uint16Array(WIDTH * HEIGHT);
};

export const getCell = (grid, x, y) => {
    return grid[y * WIDTH + x];
};

export const getSource = (sources, x, y) => {
    return sources[y * WIDTH + x];
};

export const setCell = (grid, x, y, value) => {
    grid[y * WIDTH + x] = value;
};

export const getNeighbors = (grid, x, y) => {
    const cell = getCell(grid, x, y);

    let neighbors = [];
    // Top
    neighbors.push(y > 0 ? grid[(y - 1) * WIDTH + x] : cell);
    // Right
    neighbors.push(x < WIDTH - 1 ? grid[y * WIDTH + (x + 1)] : cell);
    // Bottom
    neighbors.push(y < HEIGHT - 1 ? grid[(y + 1) * WIDTH + x] : cell);
    // Left
    neighbors.push(x > 0 ? grid[y * WIDTH + (x - 1)] : cell);

    return neighbors;
};

export const computeCell = (grid, sources, x, y) => {
    let t = getCell(grid, x, y);
    let d = getSource(sources, x, y)
    const ns = getNeighbors(grid, x, y);

    if (d > 0) {
        t = MAX_TEMP;
        d--;
        return;
    }

    // Diffusion
    t = t + DIFFUSION * (ns[0] + ns[1] + ns[2] + ns[3] - 4 * t);

    // Cooling
    t = t - COOLING * (t - AMBIENT_TEMP);

    return Math.max(MIN_TEMP, Math.min(MAX_TEMP, t));
};

export const nextGeneration = (grid, sources) => {
    let newGrid = createGrid();
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            setCell(newGrid, x, y, computeCell(grid, sources, x, y));
        }
    }
    return newGrid;
}

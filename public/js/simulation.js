import { WIDTH, HEIGHT, DIFFUSION, AMBIENT_TEMP, COOLING, MAX_TEMP, MIN_TEMP, MAX_RADIUS, MIN_RADIUS } from "./config.js";

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

export const setSource = (sources, x, y, duration) => {
    sources[y * WIDTH + x] = duration;
}

export const decrementSource = (sources, x, y) => {
    sources[y * WIDTH + x]--;
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
        decrementSource(sources, x, y);
        return t;
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

export const spawnRandomSource = (sources) => {
    if (Math.random() < 0.03) {
        const x = Math.floor(Math.random() * WIDTH);
        const y = Math.floor(Math.random() * HEIGHT);
        const radius = Math.floor(Math.random() * (MAX_RADIUS - MIN_RADIUS + 1)) + MIN_RADIUS;

        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                if (dx * dx + dy * dy <= radius * radius) {
                    const nx = x + dx;
                    const ny = y + dy;

                    if (nx >= 0 && nx < WIDTH && ny >= 0 && ny < HEIGHT) setSource(sources, nx, ny, 180);
                }
            }
        }
    }
};

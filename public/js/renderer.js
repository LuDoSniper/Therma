import { HEIGHT, MAX_TEMP, MIN_TEMP, WIDTH } from "./config.js";
import { getCell } from "./simulation.js";

export const renderMap = (ctx, grid) => {
    let image = ctx.createImageData(WIDTH, HEIGHT);

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const t = getCell(grid, x, y);
            const index = (y * WIDTH + x) * 4;

            // image.data[index] = 255 * (t / MAX_TEMP)         // R
            // image.data[index + 1] = MIN_TEMP                 // G
            // image.data[index + 2] = 255 * (1 - t / MAX_TEMP) // B
            // image.data[index + 3] = 255                      // O
            const color = getColor(t);
            image.data[index] = color[0]     // R
            image.data[index + 1] = color[1] // G
            image.data[index + 2] = color[2] // B
            image.data[index + 3] = 255      // O
        }
    }
    ctx.putImageData(image, 0, 0);
};

const palette = [
    [0, [21, 44, 137]],
    [20, [25, 138, 250]],
    [40, [50, 214, 233]],
    [60, [248, 222, 85]],
    [80, [255, 142, 44]],
    [100, [240, 57, 57]]
];

const lerp = (a, b, t) => a + (b - a) * t;

export const getColor = (temperature) => {
    console.log("DEBUG: " + temperature);
    if (temperature < MIN_TEMP || temperature > MAX_TEMP) return;
    if (temperature === MIN_TEMP) return palette[0][1];
    if (temperature === MAX_TEMP) return palette[5][1];

    let i = 0;
    while (i < palette.length && temperature < palette[i][0]) {
        i++;
    }

    const t = (temperature - palette[i][0]) / (palette[i + 1][0] - palette[i][0]);
    const colorA = palette[i][1];
    const colorB = palette[i + 1][1];

    return colorA.map((value, index) => lerp(value, colorB[index], t));
};

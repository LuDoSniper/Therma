import { HEIGHT, WIDTH } from "./config.js";
import { getCell } from "./simulation.js";

export const renderMap = (ctx, grid) => {
    let image = ctx.createImageData(WIDTH, HEIGHT);

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const t = getCell(grid, x, y);
            const index = (y * WIDTH + x) * 4;

            image.data[index] = 255 * (t / 100)         // R
            image.data[index + 1] = 0                   // G
            image.data[index + 2] = 255 * (1 - t / 100) // B
            image.data[index + 3] = 255                 // O
        }
    }
    ctx.putImageData(image, 0, 0);
};

import { HEIGHT, MAX_TEMP, MIN_TEMP, WIDTH } from "./config.js";
import { getCell } from "./simulation.js";

export const renderMap = (ctx, grid) => {
    let image = ctx.createImageData(WIDTH, HEIGHT);

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const t = getCell(grid, x, y);
            const index = (y * WIDTH + x) * 4;

            image.data[index] = 255 * (t / MAX_TEMP)         // R
            image.data[index + 1] = MIN_TEMP                 // G
            image.data[index + 2] = 255 * (1 - t / MAX_TEMP) // B
            image.data[index + 3] = 255                      // O
        }
    }
    ctx.putImageData(image, 0, 0);
};

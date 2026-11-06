import { Router } from "express";
import { fileURLToPath } from "node:url";

export const router = Router();

router.get("/", (_, res) => {
    res.sendFile(fileURLToPath(new URL("../../../public/index.html", import.meta.url)));
});

router.get("/style.css", (_, res) => {
    res.sendFile(fileURLToPath(new URL("../../../public/style.css", import.meta.url)));
});

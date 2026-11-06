import express from "express";
import { fileURLToPath } from "node:url";

export const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(
    fileURLToPath(new URL("../../public/", import.meta.url))
));

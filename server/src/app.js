import express from "express";
import { router } from "./routes/site.routes.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/", router);

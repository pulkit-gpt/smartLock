import express from "express";
import data_routes from "./data_routes.js";
import app_routes from "./app_routes.js";

const router = express.Router();

router.use("/data", data_routes);
router.use("/app", app_routes);

export default router;

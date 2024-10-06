import express from "express";
import data_routes from "./data_routes.js";
const router = express.Router();
router.use("/data", data_routes);

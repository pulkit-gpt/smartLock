import express from "express";
const router = express.Router();
import {
  get_data,
  create_data,
  update_data,
  remove_data,
  validate_data,
} from "../controllers/data_controller.js";

router.get("/get_data", (req, res) => {
  console.log("get_data");
  console.log(req.body);
  res = get_data(req, res);
});

router.post("/create_data", (req, res) => {
  console.log("create_data");
  console.log(req.body);

  var data = validate_data(req.body, req.body.schema, res);

  res = create_data(data.data, req.body.table, res);
});

router.post("/update_data", (req, res) => {
  console.log("update_data");
  console.log(req);

  res = update_data(req, res);
});

router.post("/remove_data", (req, res) => {
  console.log("remove_data");
  console.log(req.body);
  res = remove_data(req, res);
});

export default router;

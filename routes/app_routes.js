import express from "express";
const router = express.Router();

import {
  add_user,
  remove_user_auth,
  timed_user,
  open_door,
} from "../controllers/app_controllers.js";

router.post("/add_new_user", (req, res) => {
  console.log("add_user");
  console.log(req.body);
  add_user(req, res);
});

router.post("/record_new_user", (req, res) => {
  console.log("add_user from esp");
});

router.post("/remove_user_auth", (req, res) => {
  console.log("remove_user");
  console.log(req.body);
  remove_user_auth(req, res);
});

router.post("/timed_user", (req, res) => {
  console.log("timed_user");
  console.log(req.body);
  timed_user(req, res);
});

router.post("/open_door", (req, res) => {
  console.log("open_door");
  console.log(req.body);
  //open_door(req, res);
});

export default router;

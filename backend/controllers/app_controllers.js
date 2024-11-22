import {
  get_data,
  create_data,
  update_data,
  remove_data,
} from "./data_controller.js";

import { open_door as openDoor, credSend } from "./esp_controller.js";

import { client, topicPub } from "./mqtt_controller.js";

const generateNumericPin = (length = 6) => {
  const max = Math.pow(10, length) - 1;
  const min = Math.pow(10, length - 1);
  const pin = Math.floor(Math.random() * (max - min + 1)) + min;
  return pin.toString();
};

export const add_user = async (req, res) => {
  console.log("in add_user");
  const data = {
    uuid: req.body.pin,
    issued_to: req.body.name,
    issued_at: new Date().toISOString(),
    access: true,
    type: "Pin",
    schemaNumber: 1,
  };
  const table = "auth_users";
  await create_data(data, table, res);
  console.log("out add_user");
  credSend();
};

export const remove_user_auth = async (req, res) => {
  console.log("in remove_user");
  await update_data(
    { body: { uuid: req.body.uuid, table: "auth_users", access: "False" } },
    res
  );
  console.log("out remove_user");
};

export const timed_user = async (req, res) => {
  var pin = req.body.pin;
  console.log("in timed_user");
  const red = {
    uuid: pin,
    table: "auth_users",
    issued_to: "timed_user",
    issued_at: new Date().toISOString(),
    type: "Pin",
    access: true,
    schemaNumber: 1,
  };
  const table = "auth_users";
  await create_data(red, table, res);
  credSend();
  //set time out of 10 minutes to update access to false
  setTimeout(() => {
    const red = {
      body: {
        table: "auth_users",
        uuid: pin,
      },
    };
    console.log("in timeout");
    remove_data(red);
    setTimeout(() => {
      credSend();
    }, 1000);
  }, 60000); //10 minutes
  console.log("out timed_user");
};

export const open_door = async (req, res) => {
  console.log("in open_door");
  //write esp code
  openDoor();
};

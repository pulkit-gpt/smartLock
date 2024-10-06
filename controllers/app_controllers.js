import {
  get_data,
  create_data,
  update_data,
  remove_data,
} from "./data_controller";

const generateNumericPin = (length = 6) => {
  const max = Math.pow(10, length) - 1;
  const min = Math.pow(10, length - 1);
  const pin = Math.floor(Math.random() * (max - min + 1)) + min;
  return pin.toString();
};

export const add_user = async (req, res) => {
  console.log("in add_user");
  await create_data(req, res);
  console.log("out add_user");
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
  var pin = generateNumericPin();
  console.log("in timed_user");
  red = {
    body: {
      uuid: pin,
      table: "auth_users",
      issued_to: req.body.issued_to,
      type: "Pin",
      access: "True",
    },
  };
  await create_data(red, res);
  //set time out of 10 minutes to update access to false
  setTimeout(() => {
    red = {
      body: {
        table: "auth_users",
        uuid: pin,
        access: "False",
      },
    };
    update_data(red, res);
  }, 600000 /* 10 min */);
  console.log("out timed_user");
};

export const open_door = async (req, res) => {
  console.log("in open_door");
  //write esp code
};

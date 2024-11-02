import { create_data, get_all_data } from "./data_controller.js";
import { client } from "./mqtt_controller.js";
export async function credSend() {
  console.log("Sending creds");
  const req = {}; // Add any necessary properties to the req object
  const res = {
    status: (statusCode) => ({
      json: (data) => {
        return data;
      },
    }),
  };
  const data = await get_all_data(req, res);

  const creds = data.map((item) => item.uuid);

  const dataToSend = {
    why: "creds",
    data: { uuid: creds },
  };
  client.publish("smartLock/esp", JSON.stringify(dataToSend));

  // should containt the WHY == CREDS in the publish message
}

export function logging(data) {
  console.log("in Logging()");
  create_data(data, "access_logs");
  // should containt the WHY == LOG in the publish message
}

export function open_door() {
  console.log("Opening door");
  // should containt the WHY == OPEN in the publish message
}

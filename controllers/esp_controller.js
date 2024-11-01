import { create_data } from "./data_controller.js";

export function credSend() {
  console.log("Sending creds");
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
